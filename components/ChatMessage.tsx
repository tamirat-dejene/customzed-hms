// components/ChatMessage.tsx
import React, { useEffect, useState } from "react";
import { Message } from "@/features/gpt/hooks/useChat";
import { useDarkMode } from "@/context/DarkModeContext";
import MarkdownRenderer from "./MarkdownRederer";

interface Props {
    message: Message;
    loading: boolean;
}

const ChatMessage = ({ message, loading }: Props) => {
    const isUser = message.role === "user";
    const { isDarkMode } = useDarkMode();

    const userStyle = isDarkMode ? "bg-blue-900 text-right text-white" : "bg-blue-100 text-right text-black";
    const assistantStyle = isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black";

    // Typing effect for assistant
    const [displayedText, setDisplayedText] = useState(isUser ? message.parts[0].text : "");

    useEffect(() => {
        if (isUser) {
            setDisplayedText(message.parts[0].text);
            return;
        }
        let currentIndex = 0;
        setDisplayedText("");
        const fullText = message.parts[0].text;
        if (!fullText) return;
        const interval = setInterval(() => {
            currentIndex++;
            setDisplayedText(fullText.slice(0, currentIndex));
            if (currentIndex >= fullText.length) {
                clearInterval(interval);
            }
        }, 50); // Adjust speed as needed
        return () => clearInterval(interval);
    }, [message, isUser]);

    return (
        <div className={`p-2 rounded-lg whitespace-pre-wrap ${isUser ? userStyle : assistantStyle}`}>
            <MarkdownRenderer content={displayedText} />
        </div>
    );
};

export default ChatMessage;
