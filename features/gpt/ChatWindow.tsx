// components/Chat.tsx
"use client";

import React from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { useChat } from "@/features/gpt/hooks/useChat";
import ChatMessage from "@/components/ChatMessage";
import { useTranslations } from "next-intl";

const Chat = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const { messages, input, loading, setInput, handleSend, endRef } = useChat();
    const t = useTranslations("features.gpt");

    return (
        <div className="flex flex-col h-[430px] w-[540px] bg-white dark:bg-transparent p-4 rounded-lg">
            <h4 className="text-[24px] font-semibold leading-[1.4] mb-2 dark:text-gray-100">
                {t('title')}
            </h4>

            <div className="flex-1 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700 p-3 space-y-2 text-sm">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg} loading={loading} />
                ))}
                <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 mt-4">
                <input
                    className="flex-1 px-3 py-2 rounded-md text-sm text-gray-900 dark:text-white dark:bg-gray-800 border border-indigo-600"
                    placeholder={t('input.placeholder')}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={loading}
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className=" text-white p-2 rounded-md shadow disabled:opacity-50 border border-indigo-600"
                >
                    <HiPaperAirplane className="w-7 h-5 text-indigo-600" />
                </button>
            </div>
        </div>
    );
};

export default Chat;
