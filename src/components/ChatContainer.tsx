'use client';

import type { UIMessage } from 'ai'; // 导入正确的类型
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { UserProjectModel, UserProfileModel } from '@/db/schema';

interface ChatContainerProps {
    targetUsername: string;
    userProfile: UserProfileModel | null;
}

const ChatContainer = ({ targetUsername, userProfile }: ChatContainerProps) => {
    // 手动管理消息状态以支持会话
    const [localMessages, setLocalMessages] = React.useState<UIMessage[]>([]);
    const [input, setInput] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    

    // Initialize component
    useEffect(() => {
        // 显示欢迎消息，基于目标用户
        const welcomeMessage: UIMessage = {
            id: 'welcome',
            role: 'assistant',
            parts: [{ 
                type: 'text', 
                text: `你好！我是 ${userProfile?.displayName || targetUsername} 的智能助手。你可以询问关于 ${userProfile?.displayName || targetUsername} 的项目经验、技能背景或任何其他信息。我会基于他/她的作品集来回答你的问题。` 
            }]
        };
        setLocalMessages([welcomeMessage]);
    }, [targetUsername, userProfile]);

    // 清除对话历史的函数
    const clearConversation = async () => {
        // 重新显示欢迎消息
        const welcomeMessage: UIMessage = {
            id: 'welcome-' + Date.now(),
            role: 'assistant',
            parts: [{ 
                type: 'text', 
                text: `你好！我是 ${userProfile?.displayName || targetUsername} 的智能助手。你可以询问关于 ${userProfile?.displayName || targetUsername} 的项目经验、技能背景或任何其他信息。我会基于他/她的作品集来回答你的问题。` 
            }]
        };
        setLocalMessages([welcomeMessage]);
    };

    const endRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [localMessages]);

    // 手动发送消息到 API
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!input.trim()) return;

        // 添加用户消息到本地状态
        const userMessage: UIMessage = {
            id: Date.now().toString(),
            role: 'user',
            parts: [{ type: 'text', text: input }]
        };
        
        setLocalMessages(prev => [...prev, userMessage]);
        setIsSubmitting(true);
        
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'X-Target-Username': targetUsername, // 告诉 API 这是关于哪个用户的查询
            };
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    messages: [...localMessages, userMessage],
                    targetUsername: targetUsername
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            // 处理流式响应
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            
            if (!reader) {
                throw new Error('No reader available');
            }

            let assistantMessage: UIMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                parts: [{ type: 'text', text: '' }]
            };
            let hasContent = false;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const jsonStr = line.slice(6).trim(); // 移除 'data: ' 前缀并清除空白
                            if (jsonStr === '[DONE]') break;
                            
                            const data = JSON.parse(jsonStr);
                            
                            let deltaText = '';
                            
                            // 处理文本增量
                            if (data.type === 'text-delta' && data.delta) {
                                deltaText = data.delta;
                            }
                            // 处理 content-delta with thinking
                            else if (data.type === 'content-delta' && data.delta?.message?.content) {
                                const content = data.delta.message.content;
                                deltaText = content.text || content.thinking || '';
                            }
                            
                            if (deltaText) {
                                const currentTextPart = assistantMessage.parts[0];
                                if (currentTextPart.type === 'text') {
                                    const newText = currentTextPart.text + deltaText;
                                    assistantMessage = {
                                        ...assistantMessage,
                                        parts: [{ type: 'text', text: newText }]
                                    };
                                    
                                    if (!hasContent) {
                                        // 第一次接收到内容时才添加消息
                                        hasContent = true;
                                        setLocalMessages(prev => [...prev, assistantMessage]);
                                    } else {
                                        // 更新现有消息
                                        setLocalMessages(prev => {
                                            const newMessages = [...prev];
                                            newMessages[newMessages.length - 1] = assistantMessage;
                                            return newMessages;
                                        });
                                    }
                                }
                            } else {
                                console.warn('Unhandled or empty delta:', data.type, data);
                            }
                        } catch (parseError) {
                            console.warn('Failed to parse streaming data:', line, parseError);
                            continue;
                        }
                    }
                }
            }

            // 如果没有收到任何内容，添加一个默认回应
            if (!hasContent) {
                assistantMessage = {
                    ...assistantMessage,
                    parts: [{ type: 'text', text: '抱歉，我无法处理您的请求。请稍后再试。' }]
                };
                setLocalMessages(prev => [...prev, assistantMessage]);
            }

            setInput("");
        } catch (error) {
            console.error('Error sending message:', error);
            // 移除失败的消息
            setLocalMessages(prev => prev.slice(0, -1));
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderMessageContent = (message: UIMessage) => {
        // 3. 遍历 message.parts 来渲染内容
        return message.parts.map((part, index) => {
            if (part.type === 'text') {
                // 将文本中的换行符渲染为 <br>
                return (
                    <span key={index}>
                        {part.text.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </span>
                );
            }
            // 这里可以添加对其他 part 类型的处理, 例如 'tool-call'
            return null;
        });
    };

    return (
    <div className="h-full w-full flex flex-col">
            {/* 聊天头部 */}
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <Button
                        onClick={clearConversation}
                        className="text-xs px-2 py-1 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md transition-colors"
                    >
                        clean
                    </Button>
                </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 flex flex-col mb-4 overflow-y-auto">
                {localMessages.length === 0 ? (
                    <div className="text-center">
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto space-y-3">
                        {localMessages.map(message => (
                            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                                    max-w-[85%] p-3 rounded-lg text-sm leading-relaxed
                                    ${message.role === 'user' 
                                        ? 'bg-[var(--primary-color)] text-white' 
                                        : 'bg-gray-700/50 text-gray-100 border border-gray-600'
                                    }
                                `}>
                                    {renderMessageContent(message)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* 加载指示器 */}
                {isSubmitting && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={endRef} />
            </div>

            {/* 输入区域 */}
            <div className="space-y-3 mt-auto">
                <form
                    className='flex gap-3'
                    onSubmit={handleFormSubmit}
                >
                    <div className="relative flex-1">
                        <input
                            className='w-full rounded-md border-gray-600 bg-gray-700/50 py-2 pl-10 pr-4 text-white focus:border-primary-500 focus:ring-primary-500 placeholder-gray-400'
                            name="prompt"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="询问我的项目..."
                            disabled={isSubmitting}
                            type="text"
                        />
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isSubmitting || !input.trim()}
                        className={`
                            px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shrink-0
                            ${isSubmitting || !input.trim()
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-[var(--primary-color)] hover:bg-opacity-80 text-white'
                            }
                        `}
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                        ) : (
                            '发送'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatContainer;
