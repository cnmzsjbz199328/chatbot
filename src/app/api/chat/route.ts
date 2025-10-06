export const runtime = 'nodejs';

import { streamText, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';

import { getAIConfig } from '@/lib/ai-config';
import { getEmbedding } from '@/lib/custom-embedding';
import { getIndex } from '@/lib/pinecone';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 30;

export async function POST(req: Request) {
    console.log('\n[CHAT API] ===================');
    console.log('[CHAT API] 收到个人作品集聊天请求');
    
    try {
        const { messages, targetUsername } = await req.json();
        
        console.log('[CHAT API] 目标用户:', targetUsername);

        const lastUserMessage = messages[messages.length - 1];
        if (!lastUserMessage || lastUserMessage.role !== 'user') {
            return NextResponse.json({ error: 'No user message found' }, { status: 400 });
        }
        
        const textPart = lastUserMessage.parts.find((part: { type: string; text?: string }) => part.type === 'text');
        const queryText = textPart?.text;

        console.log(`[RAG] User query: "${queryText}"`);

        // Get target user ID from Supabase
        const supabase = await createClient();
        const { data: targetUser, error: userError } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('username', targetUsername)
          .single();

        if (userError || !targetUser) {
          console.error(`[RAG] Target user not found for username: ${targetUsername}`, userError);
          return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
        }

        const targetUserId = targetUser.id;
        console.log(`[RAG] Target user ID: ${targetUserId}`);

        // Generate query embedding
        const queryEmbedding = await getEmbedding(queryText);

        // Retrieve from main index with user filter
        console.log('[RAG] Querying Pinecone...');
        const index = getIndex();
        const queryResult = await index.query({
          vector: queryEmbedding,
          topK: 5,
          includeMetadata: true,
          filter: {
            user_id: { '$eq': targetUserId }
          }
        });
        console.log(`[RAG] Pinecone query returned ${queryResult.matches.length} matches.`);

        // Extract relevant chunks
        const relevantChunks = queryResult.matches
          .map((match) => match.metadata?.text || '')
          .join('\n\n');
        console.log(`[RAG] Total length of relevant chunks: ${relevantChunks.length}`);

        // Check if there's any relevant knowledge
        const hasKnowledge = relevantChunks.trim().length > 0 && queryResult.matches.length > 0;
        console.log(`[RAG] Has relevant knowledge: ${hasKnowledge}`);

        // Build enhanced prompt with strict constraints
        const systemPrompt = hasKnowledge 
          ? `You are the intelligent assistant for ${targetUsername}. A visitor wants to learn more about ${targetUsername}.

Answer the question based ONLY on the following document excerpts retrieved from the knowledge base:

${relevantChunks}

User question: ${queryText}

CRITICAL RULES:
1. ONLY use information from the knowledge base above. DO NOT use general knowledge or make assumptions.
2. If the answer is not in the knowledge base, you MUST say: "抱歉，我的知识库中暂时没有关于这个问题的信息。"
3. DO NOT fabricate, guess, or invent any information about ${targetUsername}.
4. Respond in a friendly and professional tone.
5. Keep your answers concise and relevant.
6. Answer in the same language as the question.`
          : `You are the intelligent assistant for ${targetUsername}. A visitor asked: "${queryText}"

IMPORTANT: The knowledge base for ${targetUsername} is currently empty or does not contain information related to this question.

You MUST respond with:
"抱歉，我的知识库中暂时没有关于这个问题的信息。${targetUsername} 可能还没有上传相关的知识文档，或者这个问题超出了我目前掌握的信息范围。"

DO NOT make up any information. DO NOT use general knowledge to answer.`;

        const aiConfig = getAIConfig();
        const finalPayload = {
            model: aiConfig.chat,
            system: systemPrompt,
            messages: convertToModelMessages(messages),
        };

        console.log("[RAG] Calling Cohere with system prompt length:", systemPrompt.length);

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
