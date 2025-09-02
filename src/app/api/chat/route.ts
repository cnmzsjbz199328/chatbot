import { cohere } from '@ai-sdk/cohere';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { pc } from '@/lib/pinecone';
import { NextResponse } from 'next/server';
import { getEmbeddingPipeline } from '@/lib/pipeline';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();

        const lastUserMessage = messages[messages.length - 1];
        if (!lastUserMessage || lastUserMessage.role !== 'user') {
            return NextResponse.json({ error: 'No user message found' }, { status: 400 });
        }
        
        const textPart = lastUserMessage.parts.find(part => part.type === 'text');
        const queryText = textPart?.text;

        if (!queryText) {
            return NextResponse.json({ error: 'No text content found in user message' }, { status: 400 });
        }

        console.log(`\n[RAG Flow] 1. Received user query: "${queryText}"`);

        const extractor = await getEmbeddingPipeline();
        const queryEmbedding = await extractor(queryText, { pooling: 'mean', normalize: true });
        const queryVector = Array.from(queryEmbedding.data);
        console.log("[RAG Flow] 2. Query embedded into vector (first 5 dims):", queryVector.slice(0, 5));

        const index = pc.index('chatbot');
        const queryResult = await index.query({
            topK: 3,
            vector: queryVector,
            includeMetadata: true,
        });
        console.log("[RAG Flow] 3. Pinecone returned matches:", queryResult.matches.length);

        const context = queryResult.matches
            .map(match => match.metadata?.text)
            .filter(text => text)
            .join('\n---\n');
        console.log("[RAG Flow] 4. Constructed context from matches.");

        const systemPrompt = `You are a helpful assistant. Please answer the user's question based on the following context. If the context does not contain the answer, say that you don't know.\n\nContext:\n${context}`;

        const finalPayload = {
            model: cohere('command-r'),
            system: systemPrompt,
            messages: convertToModelMessages(messages),
        };

        // --- THE DECISIVE LOG --- 
        console.log("[RAG Flow] 5. FINAL PAYLOAD TO AI:", JSON.stringify(finalPayload, null, 2));

        const result = await streamText(finalPayload);

        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.error('[Chat API Error]', error);
        if (error instanceof Error) {
            console.error(error.message);
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
