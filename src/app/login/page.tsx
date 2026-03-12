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
                className: "bg-destructive border border-destructive/20 text-white font-mono rounded-none uppercase",
            });
        } else {
            // Success - sync local cart
            toast.success("SYSTEM ACCESS GRANTED", {
                description: `Welcome back.`,
                className: "bg-black border border-white/20 text-primary font-mono rounded-none uppercase",
            });

            if (localCart.items.length > 0) {
                await syncCart.mutateAsync(localCart.items);
                localCart.clearCart();
            }

            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/noise.png')] mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md space-y-8 border-2 border-primary p-8 md:p-12 relative bg-card/50 backdrop-blur-sm"
            >
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-black uppercase tracking-tighter">
                        Sign In
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        Welcome back
                    </p>
                </div>

                {/* Credentials form */}
                <form onSubmit={handleCredentials} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="uppercase text-xs tracking-wider">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="YOUR@EMAIL.COM"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="uppercase text-xs tracking-wider">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs font-mono uppercase tracking-wider">{error}</p>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-none uppercase tracking-[0.2em] font-bold text-lg hover:bg-primary/90 transition-all duration-300"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        variant="outline"
                        className="w-full h-12 rounded-none uppercase tracking-[0.2em] font-bold text-sm border-white/20 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-3 bg-transparent"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </Button>
                </div>

                <div className="text-center pt-4 border-t border-primary/20 flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">No account?</span>
                    <Link href="/register" className="text-xs text-primary hover:text-primary/70 transition-colors uppercase tracking-widest font-bold">
                        Create Account
                    </Link>
                </div>

                <div className="text-center">
                    <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                        ← Back to Home
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
