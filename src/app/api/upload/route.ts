export const runtime = 'nodejs';

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { getIndex } from "@/lib/pinecone";
import { Md5 } from 'ts-md5';
// 替换本地pipeline为云端embedding服务
import { getCustomEmbedding } from "@/lib/custom-embedding";
import { insertFile } from "@/db";

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

// 使用云端embedding服务的处理函数
const processAndEmbedChunks = async (chunks: string[], fileId: number, sessionId: string) => {
    const PINECONE_UPSERT_BATCH_SIZE = 100;
    const allVectors: number[][] = [];

    console.log(`Starting cloud embedding process for ${chunks.length} chunks...`);

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

    // 3. Prepare records for Pinecone with file_id and session_id in metadata
    const records = chunks.map((c, i) => ({
        id: Md5.hashStr(c + sessionId), // 加入sessionId确保唯一性
        values: allVectors[i],
        metadata: { 
            text: c,
            file_id: fileId,
            session_id: sessionId // 添加session_id到元数据
        }
    }));

    // 4. Upsert records to Pinecone in batches
    const index = getIndex(); // 使用新的384维索引
    for (let i = 0; i < records.length; i += PINECONE_UPSERT_BATCH_SIZE) {
        const batch = records.slice(i, i + PINECONE_UPSERT_BATCH_SIZE);
        console.log(`Upserting batch of ${batch.length} records to Pinecone (384d)...`);
        await index.upsert(batch);
    }

    return { upsertedCount: records.length };
}


export async function POST(request: Request) {
    try {
        // 1. 获取session_id从请求头
        const sessionId = request.headers.get('X-Session-Id');
        if (!sessionId) {
            return NextResponse.json(
                { error: 'X-Session-Id header is required' }, 
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file');
        console.log('Received file:', file);
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 2. Insert the file record into the database with session_id
        const newFile = await insertFile(file.name, Md5.hashStr(file.name), sessionId);
        const fileId = newFile[0].id;
        console.log(`File record created in DB with ID: ${fileId}, Session: ${sessionId}`);

        const buffer = await file.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });

        const loader = new WebPDFLoader(blob, {});
        const docs = await loader.load();

        const splitDocs = await Promise.all(docs.map(doc => splitDoc(doc)));
        const allChunks = splitDocs.flat();

        console.log(`Successfully split PDF into ${allChunks.length} chunks.`);

        // 3. Pass the fileId and sessionId to the processing function
        const res = await processAndEmbedChunks(allChunks, fileId, sessionId);
        console.log("Upsert result:", res);

        return NextResponse.json({ 
            message: `File uploaded and processed successfully. ${res.upsertedCount} vectors upserted.`,
            fileId,
            sessionId 
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}


