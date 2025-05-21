import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const GET = async () => {
  const t = await getTranslations("api.settings");

  try {
    const settings = await db.settings.findFirst();
    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response(t('fetchError'), { status: 500 });
  }
};
