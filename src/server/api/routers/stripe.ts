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

            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                client_reference_id: ctx.session.user.id as string,
                metadata: {
                    userId: ctx.session.user.id as string
                },
                line_items: input.items.map((item) => {
                    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
                    const imageUrl = item.image.startsWith("http")
                        ? item.image
                        : `${baseUrl}${item.image.startsWith("/") ? "" : "/"}${item.image}`;

                    return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: item.name,
                                images: [imageUrl]
                            },
                            unit_amount: Math.round(item.price * 100),
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? ""}/archive?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? ""}/cart?canceled=true`,
            });

            return { url: session.url };
        }),
});