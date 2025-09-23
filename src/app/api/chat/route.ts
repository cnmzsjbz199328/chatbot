export const runtime = 'nodejs';

import { cohere } from '@ai-sdk/cohere';
import { streamText, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';
import { getAuthenticatedUser, unauthorizedResponse } from '@/lib/auth';

export const maxDuration = 30;

export async function POST(req: Request) {
    console.log('\n[CHAT API] ===================');
    console.log('[CHAT API] 收到个人作品集聊天请求');
    
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
          return unauthorizedResponse();
        }

        const { messages, targetUsername, userProfile, userProjects } = await req.json();
        
        console.log('[CHAT API] 目标用户:', targetUsername);
        console.log('[CHAT API] 用户资料:', userProfile ? '已提供' : '未提供');
        console.log('[CHAT API] 项目数量:', userProjects?.length || 0);

        const lastUserMessage = messages[messages.length - 1];
        if (!lastUserMessage || lastUserMessage.role !== 'user') {
            return NextResponse.json({ error: 'No user message found' }, { status: 400 });
        }
        
        const textPart = lastUserMessage.parts.find((part: { type: string; text?: string }) => part.type === 'text');
        const queryText = textPart?.text;

        if (!queryText) {
            return NextResponse.json({ error: 'No text content found in user message' }, { status: 400 });
        }

        console.log(`[CHAT API] 用户询问关于 ${targetUsername} 的问题: "${queryText}"`);

        // 构建上下文信息，基于目标用户的资料和项目
        const contextParts = [];
        
        if (userProfile) {
            const profileInfo = `姓名: ${userProfile.displayName || targetUsername}
个人简介: ${userProfile.bio || '暂无介绍'}
位置: ${userProfile.location || '未提供'}
联系方式: ${userProfile.email || ''}${userProfile.phone ? `, ${userProfile.phone}` : ''}
技能: ${userProfile.skills || '未提供'}
教育背景: ${userProfile.education || '未提供'}
工作经历: ${userProfile.experience || '未提供'}`;
            contextParts.push(profileInfo);
        }
        
        if (userProjects && userProjects.length > 0) {
            const projectsInfo = userProjects.map((project: { title: string; description?: string; tags?: string; projectUrl?: string; githubUrl?: string }) => 
                `项目: ${project.title}
描述: ${project.description || '无描述'}
技术栈: ${project.tags || '未指定'}
项目链接: ${project.projectUrl || '未提供'}
代码库: ${project.githubUrl || '未提供'}`
            ).join('\n\n');
            contextParts.push(`项目经验:\n${projectsInfo}`);
        }
        
        const context = contextParts.join('\n\n---\n\n');
        console.log("[CHAT API] 构建的上下文长度:", context.length);

        const systemPrompt = `你是 ${userProfile?.displayName || targetUsername} 的智能助手。访客想了解关于 ${userProfile?.displayName || targetUsername} 的信息。

请根据以下信息回答访客的问题：

${context}

请注意：
1. 用亲切、专业的语气回答，就像你是这个人的助手
2. 如果问题涉及的信息在上述资料中没有提供，诚实地说明"这方面的信息暂时没有提供"
3. 可以主动推荐访客了解相关的项目或技能
4. 保持回答的简洁和有针对性
5. 用中文回答`;

        const finalPayload = {
            model: cohere('command-r'),
            system: systemPrompt,
            messages: convertToModelMessages(messages),
        };

        console.log("[CHAT API] 发送给 AI 的系统提示长度:", systemPrompt.length);

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
