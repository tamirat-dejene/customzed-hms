import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Cabin } from "@prisma/client";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";

import { useCreateOrEditCabin } from "./hooks/useCreateOrEditCabin";
import { useTranslations } from "next-intl";

interface CreateCabinFormProps {
  cabin?: Cabin;
  onCloseModal?: () => void;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabin,
  onCloseModal,
}) => {
  const isEditSession = Boolean(cabin?.id);
  const { isWorking, createOrEditCabin } = useCreateOrEditCabin(isEditSession);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: cabin?.name || "",
      maxCapacity: cabin?.maxCapacity || null,
      regularPrice: cabin?.regularPrice || null,
      discount: cabin?.discount || null,
      description: cabin?.description || "",
      image: cabin?.image || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { description, discount, image, maxCapacity, name, regularPrice } =
      data;

    createOrEditCabin(
      {
        id: cabin?.id,
        description,
        discount,
        image: typeof image === "string" ? image : image[0],
        maxCapacity,
        name,
        regularPrice,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const t = useTranslations('home.cabins.addCabin.createCabinForm');

  return (
    <form
      className="w-[800px] text-[14px]"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label={t('formRow.cabinNameLabel')} error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: t('input.required'),
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.maxCapLabel')}
        error={errors?.maxCapacity?.message}
        id="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: t('input.maxCapError'),
            min: {
              value: 1,
              message: t('input.capMessage'),
            },
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.regPriceLabel')}
        error={errors?.regularPrice?.message}
        id="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: t('input.regPriceError'),
            min: {
              value: 1,
              message: t('input.regPriceMessage'),
            },
          })}
        />
      </FormRow>

      <FormRow label={t('formRow.discountLabel')} error={errors?.discount?.message} id="discount">
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: t('input.discountError'),
            validate: (value) =>
              (value || 0) <= (getValues().regularPrice || 0) ||
              t('input.discountMessage'),
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.descriptionLabel')}
        error={errors?.description?.message}
        id="description"
      >
        <textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: t('input.descError'),
          })}
          className="textarea outline-violet-700"
        />
      </FormRow>

      <FormRow label={t('formRow.cabinPhoto')} id="image" error={errors?.image?.message}>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="text-[14px]  image-input outline-violet-700 dark:text-gray-300"
          {...register("image", {
            required: isEditSession ? false : t('input.descError'),
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button
          variant="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {t('cancel')}
        </Button>
        <Button disabled={isWorking} type="submit" className="flex items-center gap-2">
          {isWorking && <SpinnerMini />}
          <span>{isEditSession ? t('editCabin') : t('createCabin')}</span>
        </Button>
      </FormRow>
    </form>
  );
};

export default CreateCabinForm;
