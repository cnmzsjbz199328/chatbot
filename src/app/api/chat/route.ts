export const runtime = 'nodejs';

import { cohere } from '@ai-sdk/cohere';
import { streamText, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';

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
        const systemPrompt = `You are the intelligent assistant for ${targetUsername}. A visitor wants to learn more about ${targetUsername}.

Answer the question based on the following document excerpts retrieved from the knowledge base:

${relevantChunks}

User question: ${queryText}

Please note:
1. Respond in a friendly and professional tone, as if you are this person's assistant.
2. Focus on the content from the knowledge base; do not repeat personal profile or project information.
3. If the requested information is not available in the knowledge base, honestly state "This information is not currently provided."
4. Proactively recommend related knowledge points to the visitor if appropriate.
5. Keep your answers concise and relevant.
6. Answer in the language used by the questioner.`;

        const finalPayload = {
            model: cohere('command-r-08-2024'),
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
