"use client";
import { useTranslations } from "next-intl";
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => { },
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev: boolean) => !prev);
  };

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const t = useTranslations("context.global");

  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error(t('error'));
  return context;
};
