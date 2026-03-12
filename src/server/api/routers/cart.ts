import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const cartRouter = createTRPCRouter({
    getCart: protectedProcedure.query(async ({ ctx }) => {
        const cart = await ctx.db.cart.findUnique({
            where: { userId: ctx.session.user.id as string },
            include: { items: { orderBy: { createdAt: "asc" } } },
        });

        if (!cart) {
            const newCart = await ctx.db.cart.create({
                data: {
                    userId: ctx.session.user.id as string,
                },
            });
            return { ...newCart, items: [] };
        }

        return cart;
    }),

    addToCart: protectedProcedure
        .input(
            z.object({
                productId: z.string(),
                name: z.string(),
                size: z.string(),
                price: z.number(),
                image: z.string(),
                quantity: z.number().default(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            let cart = await ctx.db.cart.findUnique({
                where: { userId: ctx.session.user.id as string },
            });

            if (!cart) {
                cart = await ctx.db.cart.create({
                    data: { userId: ctx.session.user.id as string },
                });
            }

            const existingItem = await ctx.db.cartItem.findUnique({
                where: {
                    cartId_productId_size: {
                        cartId: cart.id,
                        productId: input.productId,
                        size: input.size,
                    },
                },
            });

            if (existingItem) {
                return ctx.db.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + input.quantity },
                });
            }

            return ctx.db.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: input.productId,
                    name: input.name,
                    size: input.size,
                    price: input.price,
                    image: input.image,
                    quantity: input.quantity,
                },
            });
        }),

    updateQuantity: protectedProcedure
        .input(
            z.object({
                itemId: z.string(),
                quantity: z.number().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.cartItem.update({
                where: { id: input.itemId },
                data: { quantity: input.quantity },
            });
        }),

    removeFromCart: protectedProcedure
        .input(z.object({ itemId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.cartItem.delete({
                where: { id: input.itemId },
            });
        }),

    syncCart: protectedProcedure
        .input(
            z.array(
                z.object({
                    productId: z.string(),
                    name: z.string(),
                    size: z.string(),
                    price: z.number(),
                    quantity: z.number(),
                    image: z.string(),
                })
            )
        )
        .mutation(async ({ ctx, input }) => {
            if (input.length === 0) return { success: true };

            let cart = await ctx.db.cart.findUnique({
                where: { userId: ctx.session.user.id },
            });

            if (!cart) {
                cart = await ctx.db.cart.create({
                    data: { userId: ctx.session.user.id as string },
                });
            }

            for (const item of input) {
                const existing = await ctx.db.cartItem.findUnique({
                    where: {
                        cartId_productId_size: {
                            cartId: cart.id,
                            productId: item.productId,
                            size: item.size,
                        },
                    },
                });

                if (existing) {
                    await ctx.db.cartItem.update({
                        where: { id: existing.id },
                        data: { quantity: existing.quantity + item.quantity },
                    });
                } else {
                    await ctx.db.cartItem.create({
                        data: {
                            cartId: cart.id,
                            productId: item.productId,
                            name: item.name,
                            size: item.size,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                        },
                    });
                }
            }

            return { success: true };
        }),
});
