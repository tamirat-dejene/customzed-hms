import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
import { NextRequest } from "next/server";

export default withAuth(
  async (req: NextRequest) => intlMiddleware(req), {
    callbacks: {
      authorized: ({ token }: { token?: unknown }) => !!token,
    },
    pages: {
      signIn: `/en/login`,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/(en|am|or)/dashboard",
    "/(en|am|or)/dashboard",
    "/(en|am|or)/cabins",
    "/(en|am|or)/settings",
    "/(en|am|or)/bookings",
    "/(en|am|or)/users",
    "/(en|am|or)/accounts",
  ],
};
