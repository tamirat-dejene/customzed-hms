import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: {
          label: "password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const t = await getTranslations("lib");

        if (!credentials?.email || !credentials?.password) {
          throw new Error(t('error'));
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw new Error(t('error'));

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) throw new Error(t('error'));

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session, user }) {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = String(token.image || token.picture);
      }

      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
