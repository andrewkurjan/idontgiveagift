import "@/styles/globals.css";

import { Montserrat, Hind } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
    weight: ["400", "700"],
});

const hind = Hind({
    subsets: ["latin"],
    variable: "--font-hind",
    display: "swap",
    weight: ["400", "500"],
});

export const metadata: Metadata = {
    title: "I Don't Give a Gift 💩",
    description:
        "Easily shuffle names for gift buying and email out who's buying for who.",
    icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${hind.variable} text-white`}
        >
            <head>
                <meta name="theme-color" content="#138a72" />
            </head>
            <body>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
