'use client';

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from 'ai'; // 导入正确的类型
import React, { useEffect } from "react";
import { Button } from "./ui/button";

const ChatContainer = () => {
    // 1. 使用正确的返回属性: messages, sendMessage
    const { messages, sendMessage } = useChat();

    const endRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 手动管理 input 状态和 loading 状态
    const [input, setInput] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // This function is called when the user submits the form (by clicking Send or pressing Enter).
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default browser action for form submission, which is to reload the page.
        event.preventDefault();

        // If the input is empty or just whitespace, do nothing.
        if (!input.trim()) return;

        setIsSubmitting(true);
        try {
            // Call the sendMessage function from the useChat hook.
            // It's CRITICAL to pass an object with 'role' and 'content'.
            await sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });

            // Clear the input field after the message has been sent.
            setInput("");
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
                <h2 className="text-lg font-semibold text-gray-800">Chat with your documents</h2>
                <p className="text-sm text-gray-500">Ask questions about your uploaded PDFs</p>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
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
                    messages.map(message => (
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
                    className='flex flex-row gap-3'
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