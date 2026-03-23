"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { api } from "@/trpc/react";
import { sendGAEvent } from "@next/third-parties/google";

export function CheckoutSuccessHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const clearLocalCart = useCartStore((state) => state.clearCart);
    const hasHandled = useRef(false);

    // TRPC Utils
    const utils = api.useUtils();

    // Verify payment mutation
    const verifyPayment = api.stripe.verifyPayment.useMutation({
        onSuccess: () => {
            // Invalidate to refresh the cart and orders instantly
            utils.cart.getCart.invalidate();
            utils.order.getOrders.invalidate();

            toast.success("Payment successful!", {
                description: "Your order has been confirmed and processed."
            });
            router.replace("/archive", { scroll: false });
        },
        onError: () => {
            // Keep it silent if it fails (webhook might still catch it), but clean URL
            router.replace("/archive", { scroll: false });
        }
    });

    useEffect(() => {
        const success = searchParams.get("success");
        const sessionId = searchParams.get("session_id");

        if (success === "true" && !hasHandled.current) {
            hasHandled.current = true; // Prevent double firing in StrictMode

            // Clear the zustand guest cart defensively
            clearLocalCart();

            sendGAEvent({ event: "purchase", transaction_id: sessionId || "GUEST_TX" });

            if (sessionId) {
                // Verify payment on the backend to create order and clear database cart synchronously
                verifyPayment.mutate({ sessionId });
            } else {
                toast.success("Payment successful!", {
                    description: "Your order is being processed and will appear below shortly."
                });
                router.replace("/archive", { scroll: false });
            }
        }
    }, [searchParams, clearLocalCart, router, verifyPayment]);

    return null;
}
