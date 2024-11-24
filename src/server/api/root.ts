import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { listRouter } from "./routers/list";
import { participantRouter } from "./routers/participant";
import { picksRouter } from "./routers/picks";

export const appRouter = createTRPCRouter({
    list: listRouter,
    participant: participantRouter,
    picks: picksRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
