import React from "react";
import UpdateSettingForm from "@/features/settings/UpdateSettingForm";
import { getSettings } from "@/services/getSettings";
import { getTranslations } from "next-intl/server";

const Settings = async () => {
  const settings = await getSettings();

  const t = await getTranslations('home.settings')

  return <div className="flex flex-col gap-4">
     <h1 className="text-[24px] dark:text-gray-100 font-semibold">
      {t('title')}
     </h1>
     <UpdateSettingForm settings={settings}/>
  </div>;
};

export default Settings;
