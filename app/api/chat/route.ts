// pages/api/chat.ts
import { Message } from "@/features/gpt/hooks/useChat";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



export const POST = async (req: NextRequest) => {
  const { messages }: { messages: Message[] } = await req.json();

  console.log("messages", messages);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: messages
  });

  console.log(response.text); 
  return NextResponse.json({
    reply: response.text,
  });
};
