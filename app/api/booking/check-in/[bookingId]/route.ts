import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

interface IParams {
  bookingId?: string;
}

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  const t = await getTranslations("api.booking.checkIn");

  const { bookingId } = params;
  try {
    const data = await req.json();
    const booking = await db.booking.update({
      where: {
        id: bookingId,
      },
      data,
      select: {
        cabin: {
          select: {
            name: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(booking));
  } catch (error:any) {
    console.log(error.message)
    return new Response(t('updateError'), { status: 500 });
  }
};
