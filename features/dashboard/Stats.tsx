import React, { FC } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { Booking } from "@prisma/client";

import Stat from "./Stat";
import { formatCurrency } from "@/utils/helpers";
import { useTranslations } from "next-intl";

interface StatsProps {
  bookings: Booking[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number;
  isLoading: boolean;
}

const Stats: FC<StatsProps> = ({
  bookings=[],
  confirmedStays=[],
  numDays=0,
  cabinCount=0,
  isLoading,
}) => {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  
  const t = useTranslations("features.dashboard.stats");
  const t2 = useTranslations("utils.helpers");

  return (
    <>
      <Stat
        title={t('bookings')}
        color="blue"
        icon={HiOutlineBriefcase}
        value={numBookings}
        isLoading={isLoading}
      />

      <Stat
        title={t('sales')}
        color="green"
        icon={HiOutlineBanknotes}
        value={formatCurrency(sales, t2)}
        isLoading={isLoading}
      />
      <Stat
        title={t('checkins')}
        color="indigo"
        icon={HiOutlineCalendarDays}
        value={checkins}
        isLoading={isLoading}
      />
      <Stat
        title={t('occupancyRate')}
        color="yellow"
        icon={HiOutlineChartBar}
        value={Math.round(occupation * 100) + "%"}
        isLoading={isLoading}
      />
    </>
  );
};

export default Stats;
