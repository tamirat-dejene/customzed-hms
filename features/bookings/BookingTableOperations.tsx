import React from "react";
import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import {
  status,
  bookingSortByOptions as sortByOptions,
} from "@/utils/constants";
import { useTranslations } from "next-intl";

const BookingTableOperations = () => {
  const t = useTranslations('utils.constants');
  const stat = status(t)
  const opts = sortByOptions(t)
  return (
    <div className="flex items-center gap-4">
      <Filter filterField="status" options={stat} />

      <SortBy options={opts} />
    </div>
  );
};

export default BookingTableOperations;
