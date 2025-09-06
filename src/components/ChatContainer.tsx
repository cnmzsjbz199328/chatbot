'use client';

import type { UIMessage } from 'ai'; // 导入正确的类型
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { sessionManager } from '@/lib/session-manager';

const ChatContainer = () => {
    // 手动管理消息状态以支持会话
    const [localMessages, setLocalMessages] = React.useState<UIMessage[]>([]);
    const [input, setInput] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Initialize session on component mount
    useEffect(() => {
        sessionManager.getSessionId(); // This will create session if not exists
        
        // 监听会话变更
        const handleSessionChange = () => {
            setLocalMessages([]); // 清空消息历史
        };
        
        sessionManager.addSessionChangeListener(handleSessionChange);
        
        return () => {
            sessionManager.removeSessionChangeListener(handleSessionChange);
        };
    }, []);

    // 清除对话历史的函数
    const clearConversation = () => {
        setLocalMessages([]);
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
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Id': sessionManager.getSessionId(),
                },
                body: JSON.stringify({
                    messages: [...localMessages, userMessage]
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
                            
                            // 处理文本增量
                            if (data.type === 'text-delta' && data.delta) {
                                const currentTextPart = assistantMessage.parts[0];
                                if (currentTextPart.type === 'text') {
                                    assistantMessage = {
                                        ...assistantMessage,
                                        parts: [{ type: 'text', text: currentTextPart.text + data.delta }]
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
        <div className="h-full w-full flex flex-col bg-white">
            {/* 聊天头部 */}
            <div className="border-b border-gray-200 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Chat with your documents</h2>
                        <p className="text-sm text-gray-500">Ask questions about your uploaded PDFs</p>
                    </div>
                    <Button
                        onClick={clearConversation}
                        className="text-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md"
                    >
                        Clear Chat
                    </Button>
                </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {localMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                💬
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">Start a conversation</p>
                                <p className="text-gray-500 text-sm">Upload a PDF and ask questions about it</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    localMessages.map(message => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[80%] lg:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed
                                ${message.role === 'user' 
                                    ? 'bg-blue-500 text-white rounded-br-md' 
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                                }
                            `}>
                                {renderMessageContent(message)}
                            </div>
                        </div>
                    ))
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
            <div className="border-t border-gray-200 bg-white p-4">
                <form
                    className='flex flex-row items-center gap-3'
                    onSubmit={handleFormSubmit}
                >
                    <input
                        className='flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500'
                        name="prompt"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your documents..."
                        disabled={isSubmitting}
                    />

                    <Button 
                        type="submit" 
                        disabled={isSubmitting || !input.trim()}
                        className={`
                            px-6 py-3 rounded-xl font-medium transition-all duration-200
                            ${isSubmitting || !input.trim()
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
                            }
                        `}
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Send'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatContainer;