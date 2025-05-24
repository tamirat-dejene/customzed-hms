import axios from "axios";
import { Message } from "@/features/gpt/hooks/useChat";
import { getCabins } from "./apiCabin";
import { getBookings } from "./apiBooking";
import { getTranslations } from "next-intl/server";

export const sendMessage = async (messages: Message[], t: ((arg0: string) => string )) => {

  const [cabins, bookings] = await Promise.all([
    getCabins(),
    getBookings({}).then((res) => res.bookings),
  ]);

  const context = {
    cabins,
    bookings,
  };

  try {
    const res = await axios.post("/api/chat", { messages, context });
    return res.data;
  } catch (error) {
    throw new Error(t("error"));
  }
};
