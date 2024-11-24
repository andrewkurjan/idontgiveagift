"use client";

import { api } from "@/trpc/react";
import type { Assignments } from "@/types";
import type { Session } from "next-auth";
import { List } from "./list";
import { Nav } from "./nav";
import { Participants } from "./participants";
import { Picks } from "./picks";
import SendEmail from "./send-email";

export default function AppWrapper({ session }: { session: Session | null }) {
    const { data: latestList, isLoading: isListLoading } =
        api.list.getLatest.useQuery(undefined, {
            enabled: !!session?.user,
        });

    const { data: latestPicks, isLoading: isPicksLoading } =
        api.picks.getPicks.useQuery(
            {
                listId: latestList?.id ?? 1,
            },
            {
                enabled: !!latestList?.id,
            },
        );

    const isLoading = isListLoading || isPicksLoading;
    const savedAssignments = latestPicks?.data as Assignments;

    if (isLoading)
        return (
            <main
                className="bg-lightGrey flex min-h-screen animate-rotateGradient flex-col items-center justify-center"
                style={{
                    backgroundImage:
                        "linear-gradient(45deg, #F4D03F 0%, #16A085 50%, #173f2c 100%)",
                    backgroundSize: "200% 200%",
                }}
            ></main>
        );

    return (
        <>
            <main
                className="bg-lightGrey flex min-h-screen animate-rotateGradient flex-col items-center justify-center"
                style={{
                    backgroundImage:
                        "linear-gradient(45deg, #F4D03F 0%, #16A085 50%, #173f2c 100%)",
                    backgroundSize: "200% 200%",
                }}
            >
                <Nav session={session} />
                {session && (
                    <div className="z-10 w-80 rounded-lg border border-solid border-white/30 bg-white/25 p-5 drop-shadow-lg backdrop-blur-3xl">
                        <List latestList={latestList} />
                        {latestList && !latestList.submitted && (
                            <Participants listId={latestList.id} />
                        )}
                        {latestList && <Picks picks={savedAssignments} />}
                        {latestList?.submitted && (
                            <SendEmail
                                picks={savedAssignments}
                                session={session}
                            />
                        )}
                    </div>
                )}
                {!session && (
                    <>
                        <h1 className="font-montserrat text-9xl font-bold leading-tight">
                            I Don&apos;t Give a Gift
                        </h1>
                    </>
                )}
            </main>
        </>
    );
}
