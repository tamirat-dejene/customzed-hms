import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

interface IParams {
  settingsId?: string;
}

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  const t = await getTranslations("api.settings");

  const { settingsId } = params;
  try {
    const data = await req.json();
    const setting = await db.settings.update({
      where: {
        id: settingsId,
      },
      data,
    });

    return new Response(JSON.stringify(setting));
  } catch (error) {
    return new Response(t('updateError'), { status: 500 });
  }
};
