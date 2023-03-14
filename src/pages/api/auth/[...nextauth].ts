import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitchProvider from 'next-auth/providers/twitch';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prismadb';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
    }),
    TwitchProvider({
      clientId: `${process.env.TWITCH_CLIENT_ID}`,
      clientSecret: `${process.env.TWITCH_CLIENT_SECRET}`,
    }),
  ],
};

export default NextAuth(authOptions);
