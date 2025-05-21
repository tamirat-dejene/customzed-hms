"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SpinnerMini } from "@/components/Loader";
import { useRegister } from "./hooks/useRegister";
import { useTranslations } from "next-intl";

const RegisterForm = () => {
  const { registerUser, isLoading } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, password, fullName } = data;
    registerUser({ email, password, fullName }, {
      onSuccess: () => reset()
    });
  };

  const t = useTranslations('home.users.registerForm')

  return (
    <form
      className="text-[14px] py-[24px] px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label={t('formRow.fullNameLabel')}
        error={errors?.fullName?.message}
        id="fullName"
      >
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: t('input.fullNameError') })}
        />
      </FormRow>

      <FormRow label={t('formRow.emailLabel')} error={errors?.email?.message} id="email">
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: t('input.emailError'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('input.emailMessage'),
            },
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.passwordLabel')}
        error={errors?.password?.message}
        id="password"
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: t('input.passwordError'),
            minLength: {
              value: 8,
              message: t('input.passwordMessage'),
            },
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.repeatPasswordLabel')}
        error={errors?.passwordConfirm?.message}
        id="passwordConfirm"
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: t('input.repeatPasswordError'),
            validate: (value) =>
              value === getValues().password || t('input.repeatPasswordMessage'),
          })}
        />
      </FormRow>

      <FormRow hasButton>
        <Button
          variant="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => reset()}
        >
          {t('cancel')}
        </Button>
        <Button type="submit" disabled={isLoading} className="flex gap-2 items-center">
          {isLoading && <SpinnerMini />}
          {t('createUser')}
        </Button>
      </FormRow>
    </form>
  );
};

export default RegisterForm;
