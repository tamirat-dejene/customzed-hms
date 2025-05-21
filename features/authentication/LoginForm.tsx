"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Input from "@/components/Input";
import {SpinnerMini} from "@/components/Loader";
import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "demo@gmail.com",
      password: "supersecretpassword",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } : { locale: 'en' | 'am' | 'or' } = useParams();

  const callbackUrl = searchParams.get("callbackUrl") || `/${locale}/dashboard`; 

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.error) {
        toast.error(callback.error);
        return;
      }

      if (callback?.ok) {
        toast.success("Logged in successful");
        router.push(callbackUrl);
      }
    });
  };

  const t = useTranslations('auth.loginForm');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-[14px] py-[22px] px-8 bg-white dark:bg-black border dark:border-gray-800 border-gray-100 dark:b order-gray-800 rounded-md"
    >
      <FormRow
        label={t('formRow.emailLabel')}
        isVertical
        id="email"
        error={errors.email?.message}
      >
        <Input
          type="email"
          id="email"
          autoComplete="username"
          disabled={isLoading}
          className="w-full"
          {...register("email", {
            required: t('input.required'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('input.emailError'),
            },
          })}
        />
      </FormRow>

      <FormRow
        label={t('formRow.passwLabel')}
        isVertical
        id="password"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          className="w-full"
          {...register("password", {
            required: t('input.required'),
          })}
        />
      </FormRow>
      
      <FormRow isVertical>
        <Button type="submit" disabled={isLoading} className="w-full cursor-pointer disabled:cursor-default flex items-center justify-center gap-2">
          {isLoading && <SpinnerMini />}
          <span>{t('login')}</span>
        </Button>
      </FormRow>
    </form>
  );
};

export default LoginForm;
