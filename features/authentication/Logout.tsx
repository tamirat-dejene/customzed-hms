"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { SpinnerMini } from "@/components/Loader";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { locale } = useParams();
  const route = useRouter()

  const logout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    route.push(`/${locale}/login`)
  };

  return (
    <button
      type="button"
      className="border-none p-[6px] rounded-md dark:hover:bg-gray-800 duration-200 hover:bg-gray-100 "
      disabled={isLoading}
      onClick={logout}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="w-5 h-5 text-indigo-600" />
      ) : (
        <SpinnerMini className="dark:text-gray-400" />
      )}
    </button>
  );
};

export default Logout;
