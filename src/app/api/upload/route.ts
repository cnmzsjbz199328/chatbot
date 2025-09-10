export const runtime = 'nodejs';

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { getIndex, getIndexForUser } from "@/lib/pinecone";
import { Md5 } from 'ts-md5';
// 替换本地pipeline为云端embedding服务
import { getCustomEmbedding } from "@/lib/custom-embedding";
import { insertFile } from "@/db";
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';

// splitDoc function remains the same
const splitDoc = async (doc: Document) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 400,
        chunkOverlap: 50,
    });
    const texts = await textSplitter.splitText(doc.pageContent);
    return texts;
}

// The Singleton class is no longer needed and has been removed.

// 使用云端embedding服务的处理函数 - 支持用户和session双模式
const processAndEmbedChunks = async (chunks: string[], fileId: number, userId?: string, sessionId?: string) => {
    const PINECONE_UPSERT_BATCH_SIZE = 100;
    const allVectors: number[][] = [];

    const identifier = userId ? `user: ${userId}` : `session: ${sessionId}`;
    console.log(`Starting cloud embedding process for ${chunks.length} chunks for ${identifier}...`);

    // 使用云端embedding服务的批量API（性能更好）
    try {
        // 直接使用批量API处理所有文档块
        console.log(`Processing all ${chunks.length} chunks in one batch...`);
        
        const embeddings = await getCustomEmbedding(chunks);
        allVectors.push(...embeddings);
    } catch (error) {
        console.error('Cloud embedding service failed:', error);
        throw new Error(`Embedding service error: ${error}`);
    }

    console.log(`Embedding process finished. Total vectors created: ${allVectors.length}`);
    if (allVectors.length !== chunks.length) {
        throw new Error("Mismatch between number of chunks and number of embeddings.");
    }

    // 3. Prepare records for Pinecone with metadata
    const uniqueId = userId || sessionId || 'unknown';
    const records = chunks.map((c, i) => {
        const metadata: Record<string, string | number> = { 
            text: c,
            file_id: fileId,
        };
        
        // 添加用户或session标识
        if (userId) {
            metadata.user_id = userId;
        }
        if (sessionId) {
            metadata.session_id = sessionId;
        }
        
        return {
            id: Md5.hashStr(c + uniqueId + fileId), // 确保唯一性
            values: allVectors[i],
            metadata
        };
    });

    // 4. 根据配置选择上传策略
    const useNamespace = process.env.PINECONE_USE_NAMESPACE === 'true' && userId;
    
    if (useNamespace && userId) {
        // 使用namespace隔离
        const userIndex = getIndexForUser(userId);
        for (let i = 0; i < records.length; i += PINECONE_UPSERT_BATCH_SIZE) {
            const batch = records.slice(i, i + PINECONE_UPSERT_BATCH_SIZE);
            console.log(`Upserting batch of ${batch.length} records to user namespace ${userId}...`);
            await userIndex.upsert(batch);
        }
    } else {
        // 使用metadata过滤
        const index = getIndex();
        for (let i = 0; i < records.length; i += PINECONE_UPSERT_BATCH_SIZE) {
            const batch = records.slice(i, i + PINECONE_UPSERT_BATCH_SIZE);
            console.log(`Upserting batch of ${batch.length} records to main index with metadata...`);
            await index.upsert(batch);
        }
    }

    return { upsertedCount: records.length };
}


export async function POST(request: Request) {
    try {
        // 1. 验证用户认证（新）
        const user = await getAuthenticatedUser();
        
        // 2. 获取session_id（兼容模式）
        const sessionId = request.headers.get('X-Session-Id');
        
        // 3. 如果有用户认证，优先使用用户ID；否则回退到session模式
        if (!user && !sessionId) {
            return unauthorizedResponse();
        }

        const formData = await request.formData();
        const file = formData.get('file');
        console.log('Received file:', file);
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 2. Insert the file record into the database
        const newFile = await insertFile(file.name, Md5.hashStr(file.name), sessionId || undefined, user?.id);
        const fileId = newFile[0].id;
        
        const identifier = user ? `User: ${user.id}` : `Session: ${sessionId}`;
        console.log(`File record created in DB with ID: ${fileId}, ${identifier}`);

        const buffer = await file.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });

        const loader = new WebPDFLoader(blob, {});
        const docs = await loader.load();

        const splitDocs = await Promise.all(docs.map(doc => splitDoc(doc)));
        const allChunks = splitDocs.flat();

        console.log(`Successfully split PDF into ${allChunks.length} chunks.`);

        // 3. Process and embed chunks with user/session support
        const res = await processAndEmbedChunks(allChunks, fileId, user?.id, sessionId || undefined);
        console.log("Upsert result:", res);

        return NextResponse.json({ 
            message: `File uploaded and processed successfully. ${res.upsertedCount} vectors upserted.`,
            fileId,
            userId: user?.id,
            sessionId 
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}


