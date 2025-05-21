import { parse } from "url";
import { db } from "@/lib/db";
import { getToday } from "@/utils/helpers";
import { getTranslations } from "next-intl/server";

export const GET = async (req: Request) => {
  const query = parse(req.url, true).query;
  const t = await getTranslations("api.booking.recentStays");

  const { startDate } = query;

  try {
    const bookings = await db.booking.findMany({
      where: {
        AND: [
          {
            startDate: {
              gte: new Date(String(startDate)),
            },
          },
          {
            startDate: {
              lte: getToday({ end: true }),
            },
          },
        ],
      },
      include: {
        guest: {
          select: {
            fullName: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response(t('fetchError'), { status: 500 });
  }
};
