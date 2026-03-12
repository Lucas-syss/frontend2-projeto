import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stripe } from "@/lib/stripe";

export const stripeRouter = createTRPCRouter({
    createCheckoutSession: protectedProcedure
        .input(
            z.object({
                items: z.array(
                    z.object({
                        productId: z.string(),
                        name: z.string(),
                        size: z.string(),
                        price: z.number(),
                        quantity: z.number(),
                        image: z.string(),
                    })
                ),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // First, calculate total
            const total = input.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            // Create Order
            await ctx.db.order.create({
                data: {
                    userId: ctx.session.user.id as string,
                    total: total,
                    status: "PROCESSING",
                    items: {
                        create: input.items.map((item) => ({
                            productId: item.productId,
                            name: item.name,
                            size: item.size,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                        })),
                    },
                },
            });

            // Clear User's Cart
            const cart = await ctx.db.cart.findUnique({
                where: { userId: ctx.session.user.id as string },
            });

            if (cart) {
                await ctx.db.cartItem.deleteMany({
                    where: { cartId: cart.id },
                });
            }

            // Create Stripe Session
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: input.items.map((item) => ({
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity,
                })),
                success_url: `${process.env.NEXT_PUBLIC_APP_URL}/archive`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            });

            return { url: session.url };
        }),
});