import React from "react";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import DashboardFilter from "@/features/dashboard/DashboardFilter";

import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations('home.dashboard')

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800 dark:text-gray-100 font-semibold text-[24px]">{t('title')}</h1>
        <DashboardFilter />
      </div>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
