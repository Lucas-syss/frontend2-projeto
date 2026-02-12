import Navbar from "@/components/Navbar";
import HeroBackground from "@/components/HeroBackground";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

const orders = [
    { id: "ORD-9281", date: "2026-09-12", status: "PROCESSING", total: "€420", items: ["WRAITH HOODIE"] },
    { id: "ORD-8823", date: "2026-08-30", status: "DELIVERED", total: "€180", items: ["DECAY TEE"] },
    { id: "ORD-7712", date: "2026-05-15", status: "DELIVERED", total: "€680", items: ["TOMB JACKET"] },
    { id: "ORD-6691", date: "2026-01-22", status: "REFUNDED", total: "€290", items: ["RUIN VEST"] },
];

const OrderCard = ({ order, index }: { order: typeof orders[0]; index: number }) => {
    return (
        <div
            className="group relative bg-secondary/10 border border-white/5 p-6 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-colors duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="flex justify-between items-start">
                    <span className="text-xs font-mono tracking-widest text-white/50 group-hover:text-primary transition-colors">
                        {order.id}
                    </span>
                    <span className={`text-[10px] font-mono tracking-widest px-2 py-1 border ${order.status === 'PROCESSING' ? 'border-primary text-primary animate-pulse' :
                            order.status === 'REFUNDED' ? 'border-destructive text-destructive' :
                                'border-white/20 text-white/50'
                        }`}>
                        {order.status}
                    </span>
                </div>

                <div>
                    <div className="text-xl font-black uppercase text-white tracking-tighter mb-1 mix-blend-difference">
                        {order.items.join(", ")}
                    </div>
                    <div className="text-xs text-white/40 font-mono">
                        {order.date}
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-xs font-mono text-white/40">TOTAL</span>
                    <span className="text-lg font-bold text-white tracking-widest">{order.total}</span>
                </div>
            </div>
        </div>
    );
};

const Archive = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            <section className="relative h-[60vh] w-full overflow-hidden flex items-end">
                <HeroBackground />
                <div className="relative z-10 w-full px-8 pb-12 md:pb-20">
                    <h1 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-primary animate-flicker mix-blend-difference">
                        PERSONAL
                        <br />
                        <span className="ml-[5vw] text-primary/50">ARCHIVE</span>
                    </h1>
                </div>
            </section>

            <section className="relative px-8 py-24 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                            ORDER LOGS
                        </h2>
                        <span className="text-xs font-mono text-white/40">
                            Subject: USER_001
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map((order, i) => (
                            <OrderCard key={order.id} order={order} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 px-8 bg-charcoal">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-mono tracking-[0.5em] text-white/30 mb-8">
                        STATUS: ACTIVE
                    </p>
                    <p className="text-2xl md:text-4xl font-light leading-relaxed text-white/80 tracking-wide uppercase">
                        "In the <span className="text-white font-bold">void</span>, we find ourselves.
                        Your collection is not just material; it is a timestamp of your aesthetic evolution."
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Archive;
