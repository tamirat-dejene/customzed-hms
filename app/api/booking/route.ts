import { db } from "@/lib/db";
import { parse } from "url";
import { PAGE_SIZE } from "@/utils/config";
import { getTranslations } from "next-intl/server";

export const GET = async (req: Request) => {
  const query = parse(req.url, true).query;
  const t = await getTranslations("api.booking");
 
  const { status, sortBy, page } = query;

  let where: any = {};
  let orderBy: any = {};
  let skip;

  if (status && status !== "all") {
    where.status = status;
  }

  if (sortBy) {
    const [field, direction] = String(sortBy).split("-");
    orderBy[field] = direction;
  }

  if (page) {
    skip = (+page - 1) * PAGE_SIZE;
  }

  try {
    const bookings = await db.booking.findMany({
      where,
      orderBy,
      skip,
      take: PAGE_SIZE,
      select: {
        id: true,
        createdAt: true,
        startDate: true,
        endDate: true,
        numGuests: true,
        numNights: true,
        status: true,
        totalPrice: true,
        cabin: {
          select: {
            name: true,
          },
        },
        guest: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
      
    });

    const count = await db.booking.count({
      where,
      orderBy,
    });


    return new Response(JSON.stringify({bookings, count}), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response(t('fetchError'), { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const t = await getTranslations("api.booking");

  try {

    const body = await req.json();
    const {
      fullName,
      email,
      checkInDate,
      numberOfGuests,
      numberOfDays,
      hasBreakfast,
      observations,
      cabinId,
      amount,
    } = body;

    const guest = await db.guest.create({
      data: {
        fullName: fullName,
        email: email,
        nationality: "Ethiopia",
        nationalID: "4534593454",
        country: "https://flagcdn.com/et.svg",
      },
    });

    const checkIn = new Date(checkInDate);
    const eDate = new Date(
      checkIn.getTime() + numberOfDays * 24 * 60 * 60 * 1000
    );

    const newBooking = await db.booking.create({
      data: {
        startDate: new Date(checkInDate),
        numGuests: Number(numberOfGuests),
        numNights: Number(numberOfDays),
        status: "unconfirmed",

        endDate: eDate,
        totalPrice: amount,
        cabinPrice: amount - (hasBreakfast ? 15 * numberOfDays : 0),
        extrasPrice: hasBreakfast ? 15 : 0,
        hasBreakfast: hasBreakfast,
        isPaid: false,
        observations: observations,
        guest: { connect: { id: guest.id } },
        cabin: { connect: { id: cabinId } },
      },
    });
    console.log("New Booking Created:", newBooking);

    return new Response(JSON.stringify(newBooking), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(t("createError"), { status: 500 });
  }
};

