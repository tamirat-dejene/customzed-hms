"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

import Menu from "@/components/Menu";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import BookingRow, { ExtendedBooking } from "./BookingRow";

import { useBookings } from "./hooks/useBookings";
import { usePrevious } from "@/hooks/usePrevious";
import { useTranslations } from "next-intl";

const BookingTable = () => {
  const params = useSearchParams();
  const query = queryString.parse(params.toString());
  const { bookings, isLoading, count } = useBookings(query);
  const previousCount = usePrevious(count);

  const t = useTranslations('features.booking.table');

  return (
    <Menu>
      <Table
        className="bg-white dark:bg-black w-full"
        columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"
      >
        <Table.Header>
          <h4 role="rowHeader">{t('cabin')}</h4>
          <h4 role="rowHeader">{t('guest')}</h4>
          <h4 role="rowHeader">{t('dates')}</h4>
          <h4 role="rowHeader">{t('status')}</h4>
          <h4 role="rowHeader">{t('amount')}</h4>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking: ExtendedBooking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
          isLoading={isLoading}
          emptyMessage={t('empty')}
        />

        <Table.Footer>
          <Pagination count={count || previousCount || 0} isLoading={isLoading}/>
        </Table.Footer>
      </Table>
    </Menu>
  );
};

export default BookingTable;
