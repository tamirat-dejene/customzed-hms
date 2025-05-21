import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

interface IParams {
  cabinId?: string;
}

export const DELETE = async (
  _req: Request,
  { params }: { params: IParams }
) => {
  const { cabinId } = params;
  const t = await getTranslations("api.cabins.cabin");
  try {
    const cabin = await db.cabin.delete({
      where: {
        id: cabinId,
      },
    });

    return new Response(JSON.stringify(cabin));
  } catch (error) {
    console.log(error)
    return new Response(t('deleteError'), { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  const { cabinId } = params;
  try {
    const { description, discount, image, maxCapacity, name, regularPrice } =
      await req.json();

    if (!description || !image || !maxCapacity || !name || !regularPrice)
      return new Response("please provide us all data", { status: 400 });

    const cabin = await db.cabin.update({
      where: {
        id: cabinId,
      },
      data: {
        description,
        discount,
        image,
        maxCapacity,
        name,
        regularPrice,
      },
    });

    return new Response(JSON.stringify(cabin));
  } catch (error) {
    return new Response("Failed to edit cabin", { status: 500 });
  }
};
