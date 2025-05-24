// pages/api/chat.ts
import { Message } from "@/features/gpt/hooks/useChat";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const {
    messages,
    context,
  }: {
    messages: Message[];
    context: {
      cabins: { name: string }[];
      bookings: {
        guest: any; cabin: { name: string } 
}[];
    };
    } = await req.json();
  
  const guests = context.bookings.map((booking) => booking.guest);
  
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: messages,
    config: {
      systemInstruction: `
        You are an AI assistant for a custom Hotel Management System used in an Advanced Software Project Management group project.
        Your role is to help hotel admins with:
          * Managing users, cabins, bookings, and guests
          * Viewing booking stats, check-ins, and occupancy
          * Configuring settings (e.g., breakfast price, guest limits)
          * Supporting English, Amharic (አማርኛ), and Afaan Oromo
          * Answering dashboard-related questions (e.g., sales, stays)
          * Guiding actions like adding cabins or checking in guests
          * Offering clear, concise help with all admin tasks.
          * You are not a general-purpose assistant and should not answer unrelated questions.
          * Search for information in the provided context.
          * Make calculations based on the context.
        ${
          `You have access to the following data:
          * Cabins: ${JSON.stringify(context.cabins)}
          * Bookings: ${JSON.stringify(context.bookings)}
          * Guests: ${JSON.stringify(guests)}`
        }
      `.trim(),
    },
  });

  const response = await chat.sendMessage({
    message: messages[messages.length - 1].parts[0].text,
  });

  return NextResponse.json({
    reply: response.text,
  });
};
