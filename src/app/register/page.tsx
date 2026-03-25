"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import GlitchText from "@/components/ui/GlitchText";
import { ArrowLeft, UserPlus } from "lucide-react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const register = api.auth.register.useMutation({
        onSuccess: async () => {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                setError("Registration successful, but sign-in failed. Try logging in.");
            } else {
                toast.success("ACCOUNT CREATED", {
                    className: "bg-black border border-green-500/50 text-green-400 font-mono rounded-none uppercase tracking-widest",
                });
                window.location.href = "/";
            }
        },
        onError: (err) => {
            setError(err.message || "Registration failed.");
            setLoading(false);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Passwords do not match.");
            toast.error("VALIDATION FAILED", {
                description: "PASSWORDS DO NOT MATCH",
                className: "bg-destructive border border-destructive/20 text-white font-mono rounded-none uppercase tracking-widest",
            });
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setLoading(true);
        register.mutate({ name, email, password });
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
                            <GlitchText text="CREATE ACCOUNT" />
                        </h1>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest flex items-center gap-2">
                            Join StoneSaints
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <Label htmlFor="name" className="uppercase text-[10px] tracking-[0.2em] text-zinc-400">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="border-white/10 bg-black focus:border-primary rounded-none h-14 text-sm font-mono tracking-widest text-white transition-colors"
                            />
                        </div>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="space-y-3">
                                <Label htmlFor="confirm-password" className="uppercase text-[10px] tracking-[0.2em] text-zinc-400">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                    className="border-white/10 bg-black focus:border-primary rounded-none h-14 text-sm font-mono tracking-widest text-white transition-colors"
                                />
                            </div>
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
                            {loading ? "CREATING..." : "CREATE ACCOUNT"}
                        </Button>
                    </form>

                    <div className="text-center mt-10 pt-6 border-t border-white/10">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] block mb-2">Already have an account?</span>
                        <Link href="/login" className="text-xs text-primary hover:text-white transition-colors uppercase tracking-[0.2em] font-bold inline-block border-b border-primary hover:border-white pb-1">
                            SIGN IN
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
