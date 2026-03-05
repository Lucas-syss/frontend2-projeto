import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { stripe } from "@/lib/stripe";

export const stripeRouter = createTRPCRouter({
    createCheckoutSession: publicProcedure
    .input(
    z.object({
        items: z.array(
            z.object({
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
        })
        ),
    })
        )
    .mutation(async ({ input }) => {
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: input.items.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/archive`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return { url: session.url };
    }),
});