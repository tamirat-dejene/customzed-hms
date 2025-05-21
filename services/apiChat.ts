import axios from "axios";
import { Message } from "@/features/gpt/hooks/useChat";

export const sendMessage = async (messages: Message[]) => {
    console.log(messages)
  try {
    const { data } = await axios.post("/api/chat", { messages });
    return data;
  } catch (error) {
    throw new Error("failed to send the message");
  }
};
