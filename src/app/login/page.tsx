"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Login = () => {
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
                        Access Protocol
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        Enter credentials to proceed
                    </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="uppercase text-xs tracking-wider">
                            Identifier
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="USER@DOMAIN.COM"
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="uppercase text-xs tracking-wider"
                        >
                            Passcode
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 rounded-none uppercase tracking-[0.2em] font-bold text-lg hover:bg-primary/90 transition-all duration-300"
                    >
                        Authenticate
                    </Button>
                </form>

                <div className="text-center pt-4">
                    <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                        Return to Surface
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
