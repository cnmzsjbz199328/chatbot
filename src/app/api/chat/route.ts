export const runtime = 'nodejs';

import { cohere } from '@ai-sdk/cohere';
import { streamText, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';
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

        // Build enhanced prompt
        const systemPrompt = `你是 ${targetUsername} 的智能助手。访客想了解关于 ${targetUsername} 的信息。

基于以下从知识库检索到的文档片段回答问题：

${relevantChunks}

用户问题: ${queryText}

请注意：
1. 用亲切、专业的语气回答，就像你是这个人的助手
2. 专注于知识库内容，不要重复个人简介或项目信息
3. 如果问题涉及的信息在知识库中没有提供，诚实地说明"这方面的信息暂时没有提供"
4. 可以主动推荐访客了解相关的知识点
5. 保持回答的简洁和有针对性
6. 用中文回答`;

        const finalPayload = {
            model: cohere('command-a-reasoning-08-2025'),
            messages: [{ role: 'system', content: systemPrompt }, ...convertToModelMessages(messages)],
            thinking: { "type": "disabled" } as any, // 添加禁用推理参数
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
