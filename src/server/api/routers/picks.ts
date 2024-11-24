import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const picksRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                listId: z.number().min(1),
                data: z.record(z.any()),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            return ctx.db.picks.create({
                data: {
                    data: input.data,
                    list: { connect: { id: input.listId } },
                },
            });
        }),

    getPicks: protectedProcedure
        .input(z.object({ listId: z.number().min(1) }))
        .query(async ({ ctx, input }) => {
            return ctx.db.picks.findFirst({
                where: { listId: input.listId },
            });
        }),
});
