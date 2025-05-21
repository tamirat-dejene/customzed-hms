import React from "react";

import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import { discountFilterOptions, sortByOptions } from "@/utils/constants";
import { useTranslations } from "next-intl";

const CabinTableOperation = () => {
  const t = useTranslations('utils.constants');
  const disc = discountFilterOptions(t)
  const srt = sortByOptions(t)
  
  return (
    <div className="flex items-center gap-4">
      <Filter options={disc} filterField="discount"/>
      <SortBy options={srt} />
    </div>
  );
};

export default CabinTableOperation;
