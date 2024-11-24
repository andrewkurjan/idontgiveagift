import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import AppWrapper from "./_components/app-wrapper";

export default async function Home() {
    const session = await auth();

    if (session?.user) void api.list.getLatest.prefetch();

    return (
        <HydrateClient>
            <AppWrapper session={session} />
        </HydrateClient>
    );
}
