import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("INITIALIZING...");

    const loadingTexts = [
        "LOADING ASSETS...",
        "ESTABLISHING CONNECTION...",
        "DECRYPTING DATA...",
        "RENDERING WORLD...",
        "WELCOME."
    ];

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("preloaderShown");
        if (hasLoaded) {
            setLoading(false);
            return;
        }

        const totalDuration = 2000;
        const intervalTime = 30;
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 30) setText(loadingTexts[0]);
            else if (newProgress < 50) setText(loadingTexts[1]);
            else if (newProgress < 70) setText(loadingTexts[2]);
            else if (newProgress < 90) setText(loadingTexts[3]);
            else setText(loadingTexts[4]);

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
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white px-4"
                >
                    <div className="w-full max-w-sm space-y-4">
                        <motion.div
                            className="flex justify-between text-xs font-mono uppercase tracking-widest text-white/50"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <span>SYS.BOOT.v2.0</span>
                            <span>{Math.floor(progress)}%</span>
                        </motion.div>

                        <div className="h-1 w-full bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="font-mono text-sm uppercase tracking-widest text-center">
                            {text}
                        </div>
                    </div>

                    <div className="absolute inset-0 z-[-1] opacity-[0.03] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute inset-0 z-[-2] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
