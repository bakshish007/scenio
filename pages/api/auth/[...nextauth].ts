import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.password) {
          throw new Error("Please log in with the provider you originally used (e.g. Google)");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email address before logging in");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      }
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
