export const runtime = 'nodejs';

import { cohere } from '@ai-sdk/cohere';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { getIndex, getIndexForUser, getPineconeFilter } from '@/lib/pinecone';
import { NextResponse } from 'next/server';
// 替换本地pipeline为云端embedding服务
import { getEmbedding } from '@/lib/custom-embedding';
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // 1. 验证用户认证（新）
        const user = await getAuthenticatedUser();
        
        // 2. 获取session_id（兼容模式）
        const sessionId = req.headers.get('X-Session-Id');
        
        // 3. 如果有用户认证，优先使用用户ID；否则回退到session模式
        if (!user && !sessionId) {
            return NextResponse.json(
                { error: 'Authentication required or X-Session-Id header must be provided' }, 
                { status: 401 }
            );
        }

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

        const identifier = user ? `user: ${user.id}` : `session: ${sessionId}`;
        console.log(`\n[RAG Flow] 1. Received user query: "${queryText}" for ${identifier}`);

        // 使用云端embedding服务
        const queryVector = await getEmbedding(queryText);
        console.log("[RAG Flow] 2. Query embedded into vector (first 5 dims):", queryVector.slice(0, 5));

        // 3. 向量查询 - 支持用户和session双模式
        const useNamespace = process.env.PINECONE_USE_NAMESPACE === 'true' && user;
        let queryResult;
        
        if (useNamespace && user) {
            // 使用namespace隔离（推荐）
            const userIndex = getIndexForUser(user.id);
            queryResult = await userIndex.query({
                topK: 3,
                vector: queryVector,
                includeMetadata: true,
            });
            console.log(`[RAG Flow] 3. Pinecone namespace query for user ${user.id}, ${queryResult.matches.length} matches`);
        } else {
            // 使用filter隔离（兼容模式）
            const index = getIndex();
            queryResult = await index.query({
                topK: 3,
                vector: queryVector,
                includeMetadata: true,
                filter: getPineconeFilter(user?.id, sessionId || undefined),
            });
            console.log(`[RAG Flow] 3. Pinecone filter query for ${identifier}, ${queryResult.matches.length} matches`);
        }

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
