import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                email: z.string().email(),
                password: z.string().min(8),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.db.user.findUnique({
                where: { email: input.email },
            });
            if (existing) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "This email is invalid.",
                });
            }
            const hashed = await bcrypt.hash(input.password, 12);
            return ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashed,
                },
            });
        }),
});
