"use client";
import React, { FC } from "react";
import { useParams, useRouter } from "next/navigation";

import BookingDataBox from "./BookingDataBox";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import ConfirmDelete from "@/components/ConfirmDelete";

import { useMoveBack } from "@/hooks/useMoveBack";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { ExtendedBooking } from "./BookingRow";
import { useTranslations } from "next-intl";

interface BookingDetailProps {
  booking: ExtendedBooking;
}

const BookingDetail: FC<BookingDetailProps> = ({ booking }) => {
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const router = useRouter();
  const { locale } = useParams();

  const {
    status,
    cabin: { name },
    id,
  } = booking;

  const t = useTranslations('home.bookings.bookingDetail');

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-[24px] font-semibold dark:text-gray-300">
            {t('title')}{name}
          </h1>
          <span
            className={`w-fit uppercase text-[11px] font-semibold py-1 px-3 rounded-full ${status}`}
          >
            {status.replace("-", " ")}
          </span>
        </div>

        <button
          className="text-indigo-600 text-[14px] font-medium text-center transition-all duration-300 bg-none rounded-md hover:text-indigo-700 active:text-indigo-700"
          onClick={moveBack}
        >
          &larr; {t('back')}
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex gap-3 justify-end">
        {status === "unconfirmed" && (
          <Button onClick={() => router.push(`/${locale}/bookings/check-in/${id}`)}>
            {t('checkin')}
          </Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(id)}>
            <span>{t('checkout')}</span>
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variant="danger">{t('delete')}</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={(closeModal) => {
                deleteBooking(id, {
                  onSettled: () => {
                    closeModal?.();
                    router.back();
                  },
                });
              }}
              disabled={isDeleting}
              isLoading={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variant="secondary" onClick={moveBack}>
          {t('back')}
        </Button>
      </div>
    </>
  );
};

export default BookingDetail;
