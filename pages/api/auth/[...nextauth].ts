import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_secret",
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER || "smtp://mock:mock@localhost:2525",
      from: process.env.EMAIL_FROM || "noreply@scenio.ai",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Add the user ID to the session object
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // Use a mock secret for local dev if not provided
  secret: process.env.NEXTAUTH_SECRET || "scenio_secret_dev_key_123",
};

export default NextAuth(authOptions);
