// components/ChatMessage.tsx
import React from "react";
import { Message } from "@/features/gpt/hooks/useChat";
import { useDarkMode } from "@/context/DarkModeContext";

interface Props {
    message: Message;
}

const ChatMessage = ({ message }: Props) => {
    const isUser = message.role === "user";
    const { isDarkMode } = useDarkMode();

    const userStyle = isDarkMode ? "bg-blue-900 text-right text-white" : "bg-blue-100 text-right text-black";
    const assistantStyle = isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black";

    return (
        <div
            className={`p-2 rounded-lg whitespace-pre-wrap ${isUser ? userStyle : assistantStyle
                }`}
        >
            {message.content}
        </div>
    );
};

export default ChatMessage;
