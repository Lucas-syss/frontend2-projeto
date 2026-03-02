"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("preloaderShown");
        if (hasLoaded) {
            setLoading(false);
            return;
        }

        const totalDuration = 2500;
        const intervalTime = 30;
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);

            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(interval);
                setTimeout(() => {
                    setLoading(false);
                    sessionStorage.setItem("preloaderShown", "true");
                }, 500);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white px-4"
                >
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

                    <div className="flex flex-col items-center w-full max-w-4xl px-4 z-10">
                        <motion.h1
                            className="text-[clamp(4rem,20vw,20rem)] font-display uppercase leading-none tracking-[-0.05em]"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {Math.floor(progress)}%
                        </motion.h1>

                        <div className="w-full mt-4 flex items-center gap-4">
                            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 shrink-0">
                                SYS.BOOT.v2.0
                            </span>
                            <div className="h-[2px] bg-zinc-800 w-full relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-white"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 shrink-0 flex gap-2">
                                <span className="animate-pulse">●</span> LOADING
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
