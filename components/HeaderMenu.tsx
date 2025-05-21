"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";

import Logout from "@/features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import dynamic from "next/dynamic";
import Modal from "./Modal";
import Chat from "@/features/gpt/ChatWindow";
import ChatAgent from "@/features/gpt/ChatModal";

const HeaderMenu = () => {
  const router = useRouter();
  const { locale } = useParams();

  const LanguageSelector = dynamic(() => import('@/features/language/Language'), {
    ssr: false,
  });

  return (
    <ul className="flex gap-1 items-center">
      <li>
        <button
          type="button"
          className="p-[6px] rounded-md duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => router.push(`/${locale}/accounts`)}
        >
          <HiOutlineUser className="w-5 h-5 text-indigo-600" />
        </button>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <LanguageSelector />
      </li>
    </ul>
  );
};

export default HeaderMenu;
