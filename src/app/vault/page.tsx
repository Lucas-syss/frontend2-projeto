"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";

const Vault = () => {
    const [passcode, setPasscode] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode.toUpperCase() === "ETERNAL") {
            setUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setPasscode("");
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-mono">

            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#f00_1px,transparent_1px),linear-gradient(to_bottom,#f00_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl p-8">
                <AnimatePresence mode="wait">
                    {!unlocked ? (
                        <motion.div
                            key="locked"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8 text-center"
                        >
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-6xl font-black text-red-600 tracking-tighter animate-pulse">
                                    <GlitchText text="RESTRICTED AREA" />
                                </h1>
                                <p className="text-red-600/50 text-xs uppercase tracking-[0.5em]">
                                    Secure Connection Required
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="relative max-w-sm mx-auto">
                                <input
                                    type="text"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    placeholder="ENTER PASSCODE"
                                    className="w-full bg-black border-b-2 border-red-600/30 py-4 text-center text-2xl text-red-600 placeholder:text-red-900 focus:outline-none focus:border-red-600 transition-colors uppercase tracking-widest"
                                    autoFocus
                                />
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute -bottom-8 left-0 right-0 text-red-500 text-xs uppercase tracking-widest font-bold"
                                    >
                                        Access Denied
                                    </motion.p>
                                )}
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unlocked"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-12"
                        >
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white mix-blend-difference">
                                    <GlitchText text="WELCOME TO THE VOID" />
                                </h2>
                                <p className="text-white/60 max-w-lg mx-auto leading-relaxed">
                                    You have accessed the internal archives.
                                    Here lies the discarded, the forgotten, and the future.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group">
                                    <span className="text-white/30 text-xs uppercase tracking-widest group-hover:text-white transition-colors">Asset_01.zip</span>
                                </div>
                                <div className="aspect-square bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group">
                                    <span className="text-white/30 text-xs uppercase tracking-widest group-hover:text-white transition-colors">Schematics.pdf</span>
                                </div>
                            </div>

                            <button onClick={() => setUnlocked(false)} className="text-red-600 text-xs uppercase tracking-widest hover:text-red-500">
                                [ Lock Terminal ]
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Vault;
