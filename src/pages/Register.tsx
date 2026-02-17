import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import { Link } from "react-router-dom";

const Register = () => {
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
                        <GlitchText text="INITIATE PROTOCOL" />
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        New Entity Registration
                    </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <Label htmlFor="alias" className="uppercase text-xs tracking-wider">
                            Alias
                        </Label>
                        <Input
                            id="alias"
                            type="text"
                            placeholder="CALLSIGN"
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="uppercase text-xs tracking-wider">
                            Communication Link
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
                    <div className="space-y-2">
                        <Label
                            htmlFor="confirm-password"
                            className="uppercase text-xs tracking-wider"
                        >
                            Confirm Passcode
                        </Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="border-primary/50 bg-transparent focus:border-primary rounded-none h-12 text-lg"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 rounded-none uppercase tracking-[0.2em] font-bold text-lg hover:bg-primary/90 transition-all duration-300"
                    >
                        Register Entity
                    </Button>
                </form>

                <div className="text-center pt-4 flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Already Authorized?</span>
                    <Link to="/login" className="text-xs text-primary hover:text-primary transition-colors uppercase tracking-widest font-bold">
                        Access Protocol Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
