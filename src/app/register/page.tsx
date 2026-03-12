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
import { useCartStore } from "@/store/useCartStore";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const register = api.auth.register.useMutation({
        onSuccess: async () => {
            // Auto sign in after registration
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                setError("Registration successful, but sign-in failed. Try logging in.");
            } else {
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
                className: "bg-destructive border border-destructive/20 text-white font-mono rounded-none uppercase",
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
                        Create Account
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        Join StoneSaints
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="uppercase text-xs tracking-wider">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
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
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="uppercase text-xs tracking-wider">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
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
                        {loading ? "Creating..." : "Create Account"}
                    </Button>
                </form>

                <div className="text-center pt-4 border-t border-primary/20 flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Already have an account?</span>
                    <Link href="/login" className="text-xs text-primary hover:text-primary/70 transition-colors uppercase tracking-widest font-bold">
                        Sign In
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

export default Register;
