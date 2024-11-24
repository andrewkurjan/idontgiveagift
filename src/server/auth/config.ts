import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";

import { db } from "@/server/db";
import SendGrid from "next-auth/providers/sendgrid";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authConfig = {
    providers: [
        DiscordProvider,
        GitHub,
        SendGrid({
            from: "no-reply@idontgiveagift.com"
        })
    ],
    adapter: PrismaAdapter(db),
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
} satisfies NextAuthConfig;
