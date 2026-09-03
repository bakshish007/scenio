import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_secret",
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { host } = new URL(url);
        try {
          await resend.emails.send({
            from: provider.from as string,
            to: identifier,
            subject: `Sign in to ${host}`,
            html: `<body style="background: #f9f9f9; padding: 20px; font-family: sans-serif;">
                     <div style="max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; text-align: center;">
                       <h2>Sign in to Scenio.AI</h2>
                       <p style="color: #555; margin-bottom: 30px;">Click the button below to securely sign in to your account.</p>
                       <a href="${url}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Sign In Now</a>
                       <p style="margin-top: 30px; font-size: 12px; color: #999;">If you didn't request this email, you can safely ignore it.</p>
                     </div>
                   </body>`,
          });
        } catch (error) {
          throw new Error("Failed to send verification email with Resend");
        }
      },
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
