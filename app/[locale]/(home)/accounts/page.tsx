import React from "react";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";
import { getSession } from "@/services/getSession";
import { getTranslations } from "next-intl/server";

const Accounts = async () => {
  const session = await getSession();
  const t = await getTranslations('home.accounts')

  return (
    <>
      <h1 className="text-[24px] dark:text-gray-100 font-semibold text-gray-800">{t('title')}</h1>
      <div className="flex flex-col gap-4 ">
        <h3 className="text-[20px] font-medium text-gray-800 dark:text-gray-200">{t('subtitle_1')}</h3>
        <UpdateUserDataForm session={session} />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-[20px] font-medium text-gray-800 dark:text-gray-200">{t('subtitle_2')}</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
};

export default Accounts;
