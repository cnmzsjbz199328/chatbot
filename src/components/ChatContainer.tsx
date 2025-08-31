'use client';

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from 'ai'; // 导入正确的类型
import React from "react";
import { Button } from "./ui/button";

const ChatContainer = () => {
    // 1. 使用正确的返回属性: messages, sendMessage, status
    const { messages, sendMessage, status } = useChat();

    // 手动管理 input 状态 (这部分是正确的)
    const [input, setInput] = React.useState("");

    // This function is called when the user submits the form (by clicking Send or pressing Enter).
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default browser action for form submission, which is to reload the page.
        event.preventDefault();

        // If the input is empty or just whitespace, do nothing.
        if (!input.trim()) return;

        // Call the sendMessage function from the useChat hook.
        // It's CRITICAL to pass an object with 'role' and 'content'.
        sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });

        // Clear the input field after the message has been sent.
        setInput("");
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
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map(message => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg text-sm ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                            }`}>
                            {renderMessageContent(message)}
                        </div>
                    </div>
                ))}
            </div>

            {/* input */}
            <form
                className='flex flex-row gap-2 p-2 border-t'
                onSubmit={handleFormSubmit}
            >
                <input
                    className='flex-1 p-2 border rounded-lg'
                    name="prompt"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    // 4. 使用 status 来判断加载状态
                    disabled={status !== 'ready'}
                />

                <Button type="submit" disabled={status !== 'ready'}>Send</Button>
            </form>
        </div>
    );
};

export default ChatContainer;