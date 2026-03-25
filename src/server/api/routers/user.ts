import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: ctx.session.user.id as string },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                password: false,
                accounts: {
                    select: { provider: true },
                },
            },
        });
        if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

        return {
            ...user,
            hasPassword: !!(await ctx.db.user.findUnique({
                where: { id: ctx.session.user.id as string },
                select: { password: true },
            }))?.password,
            providers: user.accounts.map((a) => a.provider),
        };
    }),

    updateProfile: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1).max(100),
                email: z.string().email(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            
            if (input.email) {
                const existing = await ctx.db.user.findFirst({
                    where: {
                        email: input.email,
                        NOT: { id: ctx.session.user.id as string },
                    },
                });
                if (existing) {
                    throw new TRPCError({ code: "CONFLICT", message: "Email already in use." });
                }
            }

            return ctx.db.user.update({
                where: { id: ctx.session.user.id as string },
                data: {
                    name: input.name,
                    email: input.email,
                },
                select: { id: true, name: true, email: true },
            });
        }),

    updatePassword: protectedProcedure
        .input(
            z.object({
                currentPassword: z.string().min(1),
                newPassword: z.string().min(8),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: ctx.session.user.id as string },
                select: { password: true },
            });

            if (!user?.password) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "This account uses a social provider. Password cannot be changed.",
                });
            }

            const valid = await bcrypt.compare(input.currentPassword, user.password);
            if (!valid) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect." });
            }

            const hashed = await bcrypt.hash(input.newPassword, 12);
            await ctx.db.user.update({
                where: { id: ctx.session.user.id as string },
                data: { password: hashed },
            });

            return { success: true };
        }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id as string;

        const [orderCount, totalSpent, user] = await Promise.all([
            ctx.db.order.count({ where: { userId } }),
            ctx.db.order.aggregate({ where: { userId }, _sum: { total: true } }),
            ctx.db.user.findUnique({ where: { id: userId }, select: { createdAt: true } }),
        ]);

        return {
            totalOrders: orderCount,
            totalSpent: totalSpent._sum.total ?? 0,
            memberSince: user?.createdAt ?? new Date(),
        };
    }),
});
