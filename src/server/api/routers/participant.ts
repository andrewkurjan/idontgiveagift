import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const participantRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                firstName: z.string().min(1),
                email: z.string().email(),
                listId: z.number().min(1),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.participant.create({
                data: {
                    firstName: input.firstName,
                    email: input.email,
                    list: { connect: { id: input.listId } },
                },
            });
        }),
});
