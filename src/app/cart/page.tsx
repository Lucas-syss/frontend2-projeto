"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";



const Cart = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const utils = api.useUtils();

    const { data: cartData, isLoading } = api.cart.getCart.useQuery(undefined, {
        enabled: !!sessionData?.user
    });

    const updateQuantity = api.cart.updateQuantity.useMutation({
        onSuccess: () => utils.cart.getCart.invalidate(),
    });

    const removeFromCart = api.cart.removeFromCart.useMutation({
        onSuccess: () => utils.cart.getCart.invalidate(),
    });

    const localCart = useCartStore();

    const cartItems = sessionData?.user ? (cartData?.items || []) : localCart.items;

    const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    const estTotal = subtotal;


    const checkout = api.stripe.createCheckoutSession.useMutation();

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        sendGAEvent({ event: "begin_checkout", value: estTotal, currency: "EUR" });

        if (!sessionData?.user) {
            router.push("/login?redirect=/cart");
            return;
        }

        const res = await checkout.mutateAsync({
            items: cartItems,
        });

        window.location.href = res.url!;
    };

    if (isLoading && sessionData?.user) {
        return <div className="min-h-screen bg-black w-full pt-32 pb-24 px-4 flex justify-center text-white"><Loader2 className="w-6 h-6 animate-spin text-white/50" /></div>;
    }

    return (
        <div className="min-h-screen bg-black w-full pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">


                <div className="flex-1 w-full">
                    <div className="flex items-center gap-4 mb-12">
                        <Link href="/" className="text-white/50 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                            YOUR CART
                        </h1>
                        <span className="text-white/30 font-mono text-xs uppercase tracking-[0.2em] ml-auto">
                            {cartItems.length} ITEMS
                        </span>
                    </div>

                    <div className="flex flex-col gap-8">
                        {cartItems.length === 0 ? (
                            <p className="text-white/50 font-mono uppercase">Your cart is empty.</p>
                        ) : cartItems.map((item: any, index: number) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={item.id}
                                className="flex gap-6 border border-white/10 bg-white/5 p-4 relative group"
                            >

                                <div className="w-24 h-32 md:w-32 md:h-40 bg-black/50 overflow-hidden border border-white/5 shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale opacity-80" />
                                </div>


                                <div className="flex flex-col flex-1 py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-mono text-white/50 mb-1">{item.productId}</p>
                                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white">{item.name}</h3>
                                            <p className="text-white/50 text-xs font-mono uppercase mt-2">SIZE: {item.size}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                sendGAEvent({ event: "remove_from_cart", item_name: item.name });
                                                if (sessionData?.user) {
                                                    removeFromCart.mutate({ itemId: item.id });
                                                } else {
                                                    localCart.removeItem(item.id);
                                                }
                                            }}
                                            className="text-white/30 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mt-auto flex justify-between items-end">
                                        <div className="flex items-center gap-4 border border-white/20 px-3 py-1 bg-black/50">
                                            <button
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        if (sessionData?.user) {
                                                            updateQuantity.mutate({ itemId: item.id, quantity: item.quantity - 1 })
                                                        } else {
                                                            localCart.updateQuantity(item.id, item.quantity - 1);
                                                        }
                                                    }
                                                }}
                                                className="text-white/50 hover:text-white transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="font-mono text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => {
                                                    if (sessionData?.user) {
                                                        updateQuantity.mutate({ itemId: item.id, quantity: item.quantity + 1 });
                                                    } else {
                                                        localCart.updateQuantity(item.id, item.quantity + 1);
                                                    }
                                                }}
                                                className="text-white/50 hover:text-white transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <p className="text-primary font-mono text-lg font-bold">€{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="sticky top-32 border border-white/10 bg-white/5 p-8">
                        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-white mb-8 border-b border-white/10 pb-4">
                            ORDER SUMMARY
                        </h2>

                        <div className="flex flex-col gap-4 font-mono text-sm text-white/70 mb-8">
                            <div className="flex justify-between">
                                <span>SUBTOTAL</span>
                                <span>€{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>SHIPPING</span>
                                <span className="text-white/40">CALCULATED AT CHECKOUT</span>
                            </div>
                            <div className="flex justify-between">
                                <span>TAXES</span>
                                <span className="text-white/40">CALCULATED AT CHECKOUT</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                            <span className="text-sm font-bold uppercase tracking-widest text-white">EST. TOTAL</span>
                            <span className="text-2xl font-bold font-mono text-primary">€{estTotal.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0 || checkout.isPending}
                            className="w-full group relative overflow-hidden bg-white px-8 py-5 text-black transition-transform active:scale-95 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            <span className="relative z-10 text-sm font-black uppercase tracking-[0.3em] group-hover:text-black transition-colors flex items-center gap-2">
                                {checkout.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                                {!sessionData?.user && cartItems.length > 0 ? "SIGN IN TO CHECKOUT" : "SECURE CHECKOUT"}
                            </span>
                            <ArrowRight className="w-5 h-5 relative z-10" />
                            <div className="absolute inset-0 z-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                        </button>

                        <div className="mt-6 flex flex-col gap-2 text-center text-[10px] font-mono tracking-widest text-white/30 uppercase">
                            <p>SECURE ENCRYPTED TRANSACTION // 256-BIT</p>
                            <p className="flex justify-center gap-4 mt-2">
                                <span>VISA</span>
                                <span>MC</span>
                                <span>AMEX</span>
                                <span>PAYPAL</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" {...props}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    )
}



export default Cart;
