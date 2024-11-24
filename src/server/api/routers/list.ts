import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import type { LatestList } from "@/types";

export const listRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.list.create({
                data: {
                    listName: input.name,
                    createdBy: { connect: { id: ctx.session.user.id } },
                    submitted: false,
                },
            });
        }),

    getLatest: protectedProcedure.query(async ({ ctx }) => {
        const post = await ctx.db.list.findFirst({
            orderBy: { createdAt: "desc" },
            where: { createdBy: { id: ctx.session.user.id } },
        });

        return post as LatestList ?? null;
    }),

    delete: protectedProcedure
        .input(z.object({ id: z.number().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.list.delete({
                where: {
                    id: input.id,
                },
            });
        }),

    setSubmitted: protectedProcedure
        .input(z.object({ listId: z.number().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.list.update({
                data: { submitted: true },
                where: { id: input.listId },
            });
        }),
});
