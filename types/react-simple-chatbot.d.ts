// src/types/react-simple-chatbot.d.ts
declare module "react-simple-chatbot" {
  import { ComponentType } from "react";

  interface Step {
    id: string;
    message?: string;
    user?: boolean;
    trigger?: string;
    options?: { value: string; label: string; trigger: string }[];
    end?: boolean;
  }

  interface ChatBotProps {
    steps: Step[];
    [key: string]: any;
  }

  const ChatBot: ComponentType<ChatBotProps>;

  export default ChatBot;
}
