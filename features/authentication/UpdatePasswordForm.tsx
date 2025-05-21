"use client";
import React from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { signOut } from "next-auth/react";

import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import { useUpdateUser } from "./hooks/useUpdateUser";
import {SpinnerMini} from "@/components/Loader";
import { useMoveBack } from "@/hooks/useMoveBack";
import { useTranslations } from "next-intl";

const UpdatePasswordForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();
  const onBack = useMoveBack();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { password } = data;
    console.log(password)
    
    updateUser(
      {
        password,
      },
      {
        onSuccess: () => {
          reset();
          signOut();
        },
      }
    );
  };
  
  const t = useTranslations('home.accounts.updatePasswordForm');

  return (
    <form
      className="py-6 px-10 bg-white dark:bg-black  border border-gray-100 dark:border-gray-800 rounded-md text-[14px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label={t('formRow.newPassLabel')}
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: t('input.newPassError'),
            minLength: {
              value: 8,
              message: t('input.newPassMessage'),
            },
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.confirmLabel')}
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: t('input.confirmError'),
            validate: (value) =>
              getValues().password === value || t('input.confirmMessage'),
          })}
        />
      </FormRow>
      <FormRow hasButton className="mt-4">
        <Button type="reset"  disabled={isUpdating}  variant="secondary" onClick={onBack}>
          {t('cancel')}
        </Button>
        <Button type="submit" disabled={isUpdating} className="flex gap-2 ">
          {isUpdating && <SpinnerMini />}
          <span>{t('update')}</span>
        </Button>
      </FormRow>
    </form>
  );
};

export default UpdatePasswordForm;
