import React from "react";

import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";
import { useTranslations } from "next-intl";

const Bookings = () => {
  const t = useTranslations('home.bookings')
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] dark:text-gray-100 font-semibold">{t('title')}</h1>
        <BookingTableOperations />
      </div>

      <BookingTable />
    </>
  );
};

export default Bookings;
