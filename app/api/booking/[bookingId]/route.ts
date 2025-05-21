import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

interface IParams {
  bookingId?: string;
}

export const GET = async (_req: Request, { params }: { params: IParams }) => {
  const t = await getTranslations("api.booking");

  const { bookingId } = params;
  try {
    const booking = await db.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        guest: {
          select: {
            fullName: true,
            email: true,
            country: true,
            nationalID: true,
            nationality: true,
          },
        },
        cabin: {
          select: {
            name: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(booking));
  } catch (error) {
    return new Response(t('fetchError'), { status: 500 });
  }
};


export const DELETE = async (
  _req: Request,
  { params }: { params: IParams }
) => {
  const { bookingId } = params;
  const t = await getTranslations("home.api.booking");
  try {
    const booking = await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return new Response(JSON.stringify(booking));
  } catch (error) {
    return new Response(t('deleteError'), { status: 500 });
  }
};