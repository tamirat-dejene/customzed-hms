import { db } from "@/lib/db";
import { getToday } from "@/utils/helpers";
import { getTranslations } from "next-intl/server";

export const GET = async (req: Request) => {
  const t = await getTranslations("api.booking.todayActivity");
  
  try {
    const bookings = await db.booking.findMany({
      where: {
        OR: [
          {
            AND: {
              status: {
                equals: "unconfirmed",
              },
              startDate: { gte: getToday(), lt: getToday({ end: true }) },
            },
          },
          {
            AND: {
              status: {
                equals: "checked-in",
              },
              endDate: { gte: getToday(), lt: getToday({ end: true }) },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        guest: {
          select: {
            fullName: true,
            nationality: true,
            country: true,
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
