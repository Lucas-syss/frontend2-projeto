"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { api } from "@/trpc/react";

export function CartSync() {
    const { data: session } = useSession();
    const localCart = useCartStore((state) => state.items);
    const clearLocalCart = useCartStore((state) => state.clearCart);
    const utils = api.useUtils();

    const isSyncing = useRef(false);

    const syncCartMutation = api.cart.syncCart.useMutation({
        onSuccess: () => {
            clearLocalCart();
            utils.cart.getCart.invalidate();
            isSyncing.current = false;
        },
        onError: () => {
            isSyncing.current = false;
        }
    });

    useEffect(() => {
        if (session?.user && localCart.length > 0 && !isSyncing.current) {
            isSyncing.current = true;
            syncCartMutation.mutate(
                localCart.map((item) => ({
                    productId: item.productId,
                    name: item.name,
                    size: item.size,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                }))
            );
        }
    }, [session?.user, localCart.length, syncCartMutation, localCart]);

    return null; 
}
