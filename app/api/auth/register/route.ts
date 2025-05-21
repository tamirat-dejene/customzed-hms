import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const POST = async (req: NextRequest) => {
  const t = await getTranslations("api.auth.register");

  try {
    const token = await getToken({ req });

    if (!token) return new Response("Unauthorised", { status: 401 });

    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password)
      return new Response(t('error1'), { status: 404 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response(t('error2'), { status: 404 });
  }
};
