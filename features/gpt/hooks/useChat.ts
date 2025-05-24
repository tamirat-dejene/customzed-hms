import { sendMessage } from "@/services/apiChat";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

export interface Content {
  text: string;
}
export interface Message {
  role: "user" | "model";
  parts: Content[];
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("features.gpt")

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(newMessages, t);
      const reply: Message = { role: "model", parts: [{ text: data.reply }] };
  
      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
    
  };

  return {
    messages,
    input,
    loading,
    setInput,
    handleSend,
    endRef,
    setMessages
  };
}
