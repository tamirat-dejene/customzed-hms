import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const getSettings = async () => {
  const t = await getTranslations("services");

  try {
    const settings = await db.settings.findFirst();
    console.log("Settings:", settings);
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    throw new Error(t('settingsError'));
  }
};
