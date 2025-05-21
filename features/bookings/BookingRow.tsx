import React, { FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { isToday, format } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { Booking } from "@prisma/client";

import Table from "@/components/Table";
import Menu from "@/components/Menu";
import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";

import { useCheckout } from "../check-in-out/hooks/useCheckout";
import { formatCurrency, formatDistanceFromNow, tDate } from "@/utils/helpers";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { useTranslations } from "next-intl";

export type ExtendedBooking = Booking & {
  guest: {
    fullName: string;
    email: string;
  };
  cabin: {
    name: string;
  };
};

interface BookingRowProps {
  booking: ExtendedBooking;
}

const BookingRow: FC<BookingRowProps> = ({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  },
}) => {
  const router = useRouter();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { locale } = useParams();

  const onDelete = (closeModal?: () => void) => {
    deleteBooking(bookingId, {
      onSettled: () => closeModal?.(),
    });
  };

  const t = useTranslations('features.booking.row');
  const t2 = useTranslations("utils.helpers");
  const t3 = useTranslations("months")
  const t4 = useTranslations("utils.constants");

  return (
    <Table.Row>
      <h4 className="text-[16px] font-semibold text-gray-600 dark:text-gray-300 font-sono">
        {cabinName}
      </h4>

      <div className="flex flex-col gap-1">
        <span className="font-medium dark:text-gray-300">{guestName}</span>
        <span className="text-gray-500  dark:text-gray-400 text-[12px]">
          {email}
        </span>
      </div>

      <div className="flex flex-col gap-1 dark:text-gray-300">
        <span className="font-medium ">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(String(startDate), t2)}{" "}
          &rarr; {numNights} {t('nightStay')}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-[12px]">
          {tDate(format(new Date(startDate), "MMM dd yyyy"), t3)} &mdash;{" "}
          {tDate(format(new Date(endDate), "MMM dd yyyy"), t3)}
        </span>
      </div>

      <span
        className={`w-fit uppercase text-[11px] font-semibold py-1 px-3 rounded-full ${status}`}
      >
        {t4(status.replace("-", "").toLowerCase())}
      </span>

      <span className="font-sano font-medium dark:text-gray-300">
        {formatCurrency(totalPrice, t2)}
      </span>

      <Modal>
        <Menu>
          <Menu.Toggle id={bookingId} />
          <Menu.List id={bookingId}>
            <Menu.Button
              icon={HiEye}
              onClick={() => router.push(`/${locale}/bookings/${bookingId}`)}
            >
              {t('seeDetails')}
            </Menu.Button>

            {status === "unconfirmed" && (
              <Menu.Button
                icon={HiArrowDownOnSquare}
                onClick={() => router.push(`bookings/check-in/${bookingId}`)}
              >
                {t('checkin')}
              </Menu.Button>
            )}

            {status === "checked-in" && (
              <Menu.Button
                icon={HiArrowUpOnSquare}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                {t('checkout')}
              </Menu.Button>
            )}

            <Modal.Open opens="delete">
              <Menu.Button icon={HiTrash}>{t('title')}</Menu.Button>
            </Modal.Open>
          </Menu.List>
        </Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={onDelete}
            isLoading={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
