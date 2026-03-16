"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";

export function CheckoutSuccessHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const clearLocalCart = useCartStore((state) => state.clearCart);
    const hasHandled = useRef(false);

    useEffect(() => {
        const success = searchParams.get("success");

        if (success === "true" && !hasHandled.current) {
            hasHandled.current = true; // Prevent double firing in StrictMode

            // Clear the zustand guest cart defensively
            clearLocalCart();

            // Show success toast
            toast.success("Payment successful!", {
                description: "Your order is being processed and will appear below shortly."
            });

            // Clean up the URL so the toast doesn't reappear on refresh
            router.replace("/archive", { scroll: false });
        }
    }, [searchParams, clearLocalCart, router]);

    return null;
}
