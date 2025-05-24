import React, { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { useUrl } from "@/hooks/useUrl";
import { PAGE_SIZE } from "@/utils/config";
import { useTranslations } from "next-intl";
import Button from "./Button";
import Modal from "./Modal";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import CreateBookingForm from "@/features/bookings/CreateBookingForm";

interface PaginationProps {
  count: number;
  isLoading?: boolean;
}

const Pagination: FC<PaginationProps> = ({ count = 0, isLoading }) => {
  const { getValue, addQueryToUrl } = useUrl();
  const t = useTranslations('features.booking.table.pagination');

  const currentPage = !getValue("page") ? 1 : Number(getValue("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (pageCount <= 1) return null;

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    addQueryToUrl({ page: next });
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    addQueryToUrl({ page: prev });
  };

  const buttonStyle = `border-none rounded-md font-medium text-[13.5px] flex items-center justify-between gap-1 py-[4px] px-2 bg-indigo-50 dark:bg-black dark:text-indigo-50 active:text-indigo-50 text-[inherit] pagination-btn disabled:cursor-not-allowed`;


  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[14px] ml-2">
        {t('showing')}{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        {t('to')}{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        {t('of')}<span className="font-semibold">{count}</span> {t('results')}
      </p>

      <div className="flex gap-[6px]">
        <button
          className={buttonStyle}
          onClick={prevPage}
          disabled={currentPage === 1 || isLoading}
        >
          <HiChevronLeft className="h-[16px] w-[16px]" /> <span>{t('prev')}</span>
        </button>

        <button
          className={buttonStyle}
          onClick={nextPage}
          disabled={currentPage === pageCount || isLoading}
        >
          <span>{t('next')}</span>
          <HiChevronRight className="h-[16px] w-[16px]" />
        </button>

        <Modal>
          <Modal.Open opens="newBook">
            <Button className="ml-2 p-0.5">
              Book New
            </Button>
          </Modal.Open>

          <Modal.Window name="newBook">
            <CreateBookingForm />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default Pagination;


