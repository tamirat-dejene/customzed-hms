"use client";
import React from "react";
import { Settings } from "@prisma/client";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";

import { useUpdateSettings } from "./useUpdateSettings";
import { useTranslations } from "next-intl";

interface UpdateSettingFormProps{
  settings: Settings
}

const UpdateSettingForm: React.FC<UpdateSettingFormProps> = ({settings}) => {
  const { updateSettings, isUpdating } = useUpdateSettings();

  const {
    breakfastPrice,
    maxBookingLength,
    id,
    maxGuestsPerBooking,
    minBookingLength,
  }: Settings = settings || {};

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ id, [field]: Number(value) });
  };

  const t = useTranslations('home.settings.updateSettingsForm')

  return (
    <form className="py-6 px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md text-[14px]">
      <FormRow label={t('formRow.minNightsLabel')}>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label={t('formRow.maxNightsLabel')}>
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label={t('formRow.maxGuestsBookingLabel')}>
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label={t('formRow.breakfastPriceLabel')}>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </form>
  );
};

export default UpdateSettingForm;
