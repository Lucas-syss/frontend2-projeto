import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const headersList = await headers();
        const signature = headersList.get("Stripe-Signature") as string;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webhookSecret
            );
        } catch (err: any) {
            console.error(`Webhook Error: ${err.message}`);
            return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
        }

        const session = event.data.object as Stripe.Checkout.Session;

        if (event.type === "checkout.session.completed") {
            const userId = session.client_reference_id;

            if (!userId) {
                console.error("No user ID found in session");
                return new NextResponse("No user ID", { status: 400 });
            }

            // Execute DB transaction
            await db.$transaction(async (tx) => {
                const cart = await tx.cart.findUnique({
                    where: { userId },
                    include: { items: true },
                });

                if (!cart || cart.items.length === 0) {
                    throw new Error("Cart not found or empty");
                }

                const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

                // Create the processing order
                await tx.order.create({
                    data: {
                        userId,
                        total,
                        status: "PROCESSING",
                        items: {
                            create: cart.items.map((item) => ({
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

                // Clear out the cart
                await tx.cartItem.deleteMany({
                    where: { cartId: cart.id },
                });
            });
        }

        return new NextResponse("OK", { status: 200 });
    } catch (error: any) {
        console.error("Stripe Webhook Error:", error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
