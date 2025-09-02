import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { pc } from "@/lib/pinecone";
import { Md5 } from 'ts-md5';
// Import our new, robust pipeline getter function
import { getEmbeddingPipeline } from "@/lib/pipeline";

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

// The main processing function now uses the new pipeline getter
const processAndEmbedChunks = async (chunks: string[]) => {
    const EMBEDDING_BATCH_SIZE = 6;
    const PINECONE_UPSERT_BATCH_SIZE = 100;
    const allVectors: number[][] = [];

    // 1. Get the embedding model instance (will be cached after the first run)
    console.log(`Requesting embedding model...`);
    const embedder = await getEmbeddingPipeline((p) => {
        // This callback will show progress only on the very first download
        console.log(`Model loading progress: ${p.progress?.toFixed(2)}%`);
    });
    console.log(`Model is ready. Starting embedding process for ${chunks.length} chunks...`);

    // 2. Generate embeddings in batches
    for (let i = 0; i < chunks.length; i += EMBEDDING_BATCH_SIZE) {
        const batch = chunks.slice(i, i + EMBEDDING_BATCH_SIZE);
        console.log(`Embedding batch ${Math.floor(i / EMBEDDING_BATCH_SIZE) + 1}...`);
        
        const embeddings = await embedder(batch, { pooling: 'mean', normalize: true });
        allVectors.push(...embeddings.tolist());
    }

    console.log(`Embedding process finished. Total vectors created: ${allVectors.length}`);
    if (allVectors.length !== chunks.length) {
        throw new Error("Mismatch between number of chunks and number of embeddings.");
    }

    // 3. Prepare records for Pinecone
    const records = chunks.map((c, i) => ({
        id: Md5.hashStr(c),
        values: allVectors[i],
        metadata: { text: c }
    }));

    // 4. Upsert records to Pinecone in batches
    for (let i = 0; i < records.length; i += PINECONE_UPSERT_BATCH_SIZE) {
        const batch = records.slice(i, i + PINECONE_UPSERT_BATCH_SIZE);
        console.log(`Upserting batch of ${batch.length} records to Pinecone...`);
        await pc.index('chatbot').upsert(batch);
    }
    
    return { upsertedCount: records.length };
}


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        console.log('Received file:', file);
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });

        const loader = new WebPDFLoader(blob, {});
        const docs = await loader.load();

        const splitDocs = await Promise.all(docs.map(doc => splitDoc(doc)));
        const allChunks = splitDocs.flat();

        console.log(`Successfully split PDF into ${allChunks.length} chunks.`);

        const res = await processAndEmbedChunks(allChunks);
        console.log("Upsert result:", res);

        return NextResponse.json({ message: `File uploaded and processed successfully. ${res.upsertedCount} vectors upserted.` });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}