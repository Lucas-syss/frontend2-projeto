import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const orderRouter = createTRPCRouter({
    getOrders: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.order.findMany({
            where: { userId: ctx.session.user.id as string },
            include: { items: true },
            orderBy: { createdAt: "desc" },
        });
    }),
});
