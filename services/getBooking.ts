import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const getBooking = async (bookingId: string) => {
  const t = await getTranslations("services");

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

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    throw new Error(t('bookingError'));
  }
};