"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { api } from "@/trpc/react";
import GlitchText from "@/components/ui/GlitchText";
import { ArrowLeft, KeyRound } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const localCart = useCartStore();
    const syncCart = api.cart.syncCart.useMutation();

    const handleCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password.");
            setLoading(false);
            toast.error("ACCESS DENIED", {
                description: "INVALID CREDENTIALS",
                className: "bg-destructive border border-destructive/20 text-white font-mono rounded-none uppercase tracking-widest",
            });
        } else {
            toast.success("SIGN IN SUCCESSFUL", {
                description: `Welcome back.`,
                className: "bg-black border border-green-500/50 text-green-400 font-mono rounded-none uppercase tracking-widest",
            });

            if (localCart.items.length > 0) {
                await syncCart.mutateAsync(localCart.items);
                localCart.clearCart();
            }

            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 relative overflow-hidden font-mono">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg relative z-10"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white uppercase tracking-[0.2em] text-[10px] mb-8 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="bg-zinc-950 border border-primary/30 p-8 md:p-12 shadow-[0_0_80px_rgba(255,0,0,0.1)] relative overflow-hidden">
                    {}
                    <div className="absolute top-0 left-0 w-2 h-2 bg-primary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-primary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary"></div>

                    <div className="space-y-4 mb-10 border-b border-white/10 pb-8">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white">
                            <GlitchText text="SIGN IN" />
                        </h1>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest flex items-center gap-2">
                            Welcome back
                        </p>
                    </div>

                    <form onSubmit={handleCredentials} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="uppercase text-[10px] tracking-[0.2em] text-zinc-400">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="YOUR@EMAIL.COM"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-white/10 bg-black focus:border-primary rounded-none h-14 text-sm font-mono tracking-widest text-white transition-colors"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" className="uppercase text-[10px] tracking-[0.2em] text-zinc-400">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-white/10 bg-black focus:border-primary rounded-none h-14 text-sm font-mono tracking-widest text-white transition-colors"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-950/30 border border-red-500/30 p-3 flex items-center gap-2 text-red-400">
                                <span className="w-1 h-1 bg-red-500 animate-pulse"></span>
                                <p className="text-[10px] font-mono uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-none uppercase tracking-[0.3em] font-bold text-sm bg-primary text-primary-foreground hover:bg-white hover:text-black transition-all duration-300 mt-4"
                        >
                            {loading ? "SIGNING IN..." : "SIGN IN"}
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">or</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <Button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        variant="outline"
                        className="w-full h-14 rounded-none uppercase tracking-[0.2em] font-bold text-xs border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 bg-black text-white"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="text-center mt-10 pt-6 border-t border-white/10">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] block mb-2">No account?</span>
                        <Link href="/register" className="text-xs text-primary hover:text-white transition-colors uppercase tracking-[0.2em] font-bold inline-block border-b border-primary hover:border-white pb-1">
                            Create Account
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
