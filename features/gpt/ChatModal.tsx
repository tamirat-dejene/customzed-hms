"use client";
import React from "react";
import Modal from "@/components/Modal";
import Chat from "./ChatWindow";
import { FiMessageSquare } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useChat } from "./hooks/useChat";

const ChatAgent = () => {
    const { status } = useSession();
    const t = useTranslations("features.gpt");
    if (status !== 'authenticated')
        return null

    return (
        <Modal>
            <Modal.Open opens="chat-gpt">
                <button
                    type="button"
                    aria-label="Chat with Assistant"
                    title="Chat with Assistant"
                    className="fixed bottom-6 right-10 z-50 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                >
                    <FiMessageSquare className="w-5 h-5" />
                    <span className="hidden sm:inline">{t('btnLabel')}</span>
                </button>
            </Modal.Open>

            <Modal.Window name="chat-gpt">
                <Chat onCloseModal={() => { }} />
            </Modal.Window>
        </Modal>
    );
};

export default ChatAgent;
