"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

const cartItems = [
    {
        id: "ITEM-001",
        name: "WRAITH HOODIE",
        size: "L",
        price: 420,
        quantity: 1,
        image: "/wraith-hoodie.webp",
    },
    {
        id: "ITEM-002",
        name: "DECAY TEE",
        size: "M",
        price: 180,
        quantity: 2,
        image: "/decay-tee.webp",
    },
];

const Cart = () => {
    return (
        <div className="min-h-screen bg-black w-full pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">

                {/* Left Column: Cart Items */}
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-4 mb-12">
                        <Link href="/" className="text-white/50 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                            MANIFEST
                        </h1>
                        <span className="text-white/30 font-mono text-xs uppercase tracking-[0.2em] ml-auto">
                            3 ITEMS
                        </span>
                    </div>

                    <div className="flex flex-col gap-8">
                        {cartItems.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={item.id}
                                className="flex gap-6 border border-white/10 bg-white/5 p-4 relative group"
                            >
                                {/* Item Image */}
                                <div className="w-24 h-32 md:w-32 md:h-40 bg-black/50 overflow-hidden border border-white/5 shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale opacity-80" />
                                </div>

                                {/* Item Details */}
                                <div className="flex flex-col flex-1 py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-mono text-white/50 mb-1">{item.id}</p>
                                            <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white">{item.name}</h3>
                                            <p className="text-white/50 text-xs font-mono uppercase mt-2">SIZE: {item.size}</p>
                                        </div>
                                        <button className="text-white/30 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mt-auto flex justify-between items-end">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 border border-white/20 px-3 py-1 bg-black/50">
                                            <button className="text-white/50 hover:text-white transition-colors">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="font-mono text-sm">{item.quantity}</span>
                                            <button className="text-white/50 hover:text-white transition-colors">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <p className="text-primary font-mono text-lg font-bold">€{item.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="sticky top-32 border border-white/10 bg-white/5 p-8">
                        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-white mb-8 border-b border-white/10 pb-4">
                            ORDER SUMMARY
                        </h2>

                        <div className="flex flex-col gap-4 font-mono text-sm text-white/70 mb-8">
                            <div className="flex justify-between">
                                <span>SUBTOTAL</span>
                                <span>€780.00</span>
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
                            <span className="text-2xl font-bold font-mono text-primary">€780.00</span>
                        </div>

                        <button className="w-full group relative overflow-hidden bg-white px-8 py-5 text-black transition-transform active:scale-95 flex items-center justify-between">
                            <span className="relative z-10 text-sm font-black uppercase tracking-[0.3em] group-hover:text-black transition-colors">
                                SECURE CHECKOUT
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

// Extracted ArrowRight icon to avoid importing an entirely new library just for an icon if not strictly necessary, 
// though lucide-react is used above, in case lucide goes missing
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" {...props}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    )
}

export default Cart;
