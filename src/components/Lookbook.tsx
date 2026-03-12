"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Lookbook = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const yRight = useTransform(scrollYProgress, [0, 1], [-50, 250]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    return (
        <section id="lookbook" ref={containerRef} className="relative bg-black w-full min-h-screen py-32 overflow-hidden px-4 md:px-8 border-t border-white/10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[200px] rounded-full mix-blend-screen pointer-events-none opacity-50" />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="mb-32 flex flex-col md:flex-row items-center justify-between gap-12 relative">
                    <h2 className="text-[clamp(4rem,10vw,10rem)] font-display uppercase leading-[0.8] tracking-[-0.04em] text-white z-10 mix-blend-difference w-full">
                        THE <br /> ARCHIVES
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start relative">

                    <motion.div
                        style={{ y: yLeft }}
                        className="md:col-span-5 relative group mt-16 md:mt-0 z-10"
                    >
                        <div className="aspect-[4/5] bg-white/5 border border-white/10 overflow-hidden relative">
                            <motion.img
                                style={{ scale: scaleImage }}
                                src="/model1.webp"
                                alt="Look 01"
                                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">DISTRICT 9 — 01</span>
                            <p className="text-white/80 font-mono text-sm leading-relaxed max-w-sm">
                                Volume I. Exploring the void between organic decay and structural brutalism.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: yRight }}
                        className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 mt-32 md:mt-48 relative group z-20"
                    >
                        <div className="aspect-square md:aspect-[3/4] bg-white/5 border border-white/10 overflow-hidden relative shadow-2xl">
                            <motion.img
                                style={{ scale: scaleImage }}
                                src="/modal2.webp"
                                alt="Look 02"
                                className="w-full h-full object-cover filter grayscale transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>
                        <div className="mt-6 flex flex-col gap-2 text-right items-end">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">DISTRICT 9 — 02</span>
                            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-[-0.02em] text-white">
                                Shattered Saints
                            </h3>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Lookbook;
