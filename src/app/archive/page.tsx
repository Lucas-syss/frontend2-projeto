"use client";
import Navbar from "@/components/Navbar";
import HeroBackground from "@/components/HeroBackground";
import Footer from "@/components/Footer";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const statusStyle = (status: string) => {
    if (status === "PROCESSING") return "border-primary text-primary animate-pulse";
    if (status === "REFUNDED") return "border-destructive text-destructive";
    return "border-white/20 text-white/50";
};

const OrderCard = ({ order, index }: { order: any; index: number }) => (
    <div
        className="group relative bg-secondary/10 border border-white/5 p-6 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-colors duration-300"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
                <span className="text-xs font-mono tracking-widest text-white/50 group-hover:text-primary transition-colors">
                    {order.id.slice(0, 12).toUpperCase()}
                </span>
                <span className={`text-[10px] font-mono tracking-widest px-2 py-1 border ${statusStyle(order.status)}`}>
                    {order.status}
                </span>
            </div>
            <div>
                <div className="text-xl font-black uppercase text-white tracking-tighter mb-1 mix-blend-difference">
                    {order.items.map((i: any) => i.name).join(", ")}
                </div>
                <div className="text-xs text-white/40 font-mono">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-xs font-mono text-white/40">TOTAL</span>
                <span className="text-lg font-bold text-white tracking-widest">€{order.total.toFixed(2)}</span>
            </div>
        </div>
    </div>
);

const Archive = () => {
    const { data: sessionData } = useSession();
    const { data: orders, isLoading } = api.order.getOrders.useQuery(undefined, {
        enabled: !!sessionData?.user,
    });

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            <section className="relative h-[60vh] w-full overflow-hidden flex items-end">
                <HeroBackground />
                <div className="relative z-10 w-full px-8 pb-12 md:pb-20">
                    <h1 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-primary animate-flicker mix-blend-difference">
                        YOUR
                        <br />
                        <span className="ml-[5vw] text-primary/50">ORDERS</span>
                    </h1>
                </div>
            </section>

            <section className="relative px-8 py-24 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                            ORDER HISTORY
                        </h2>
                        {sessionData?.user && (
                            <span className="text-md font-mono text-white/40">
                                {sessionData.user.name ?? sessionData.user.email}
                            </span>
                        )}
                    </div>

                    {!sessionData?.user ? (
                        <div className="text-center py-24">
                            <p className="text-white/50 font-mono uppercase tracking-widest mb-6">Sign in to view your order history</p>
                            <Link href="/login" className="px-8 py-3 border border-white/20 text-xs font-mono uppercase tracking-[0.3em] text-white hover:border-white/60 transition-colors">
                                Sign In
                            </Link>
                        </div>
                    ) : isLoading ? (
                        <div className="text-white/50 font-mono uppercase tracking-widest">Loading orders...</div>
                    ) : orders && orders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.map((order, i) => (
                                <OrderCard key={order.id} order={order} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-white/50 font-mono uppercase tracking-widest mb-6">No orders yet</p>
                            <Link href="/#collection" className="px-8 py-3 border border-white/20 text-xs font-mono uppercase tracking-[0.3em] text-white hover:border-white/60 transition-colors">
                                Shop the Collection
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Archive;
