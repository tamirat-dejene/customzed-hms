import React from "react";

import CabinTable from "@/features/cabins/CabinTable";
import AddCabin from "@/features/cabins/AddCabin";
import CabinTableOperation from "@/features/cabins/CabinTableOperation";
import { useTranslations } from "next-intl";

const Cabins = () => {
  const t = useTranslations('home.cabins');

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] dark:text-gray-100 font-semibold">{t('title')}</h1>
        <CabinTableOperation />
      </div>

      <div className="flex flex-col gap-4">
        <CabinTable />
        <AddCabin />
      </div>
    </>
  );
};

export default Cabins;
