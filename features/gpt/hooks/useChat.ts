import { sendMessage } from "@/services/apiChat";
import { useState, useRef, useEffect } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(newMessages);
      const data = await res.json();

      const reply: Message = { role: "assistant", content: data.reply };
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
  };
}
