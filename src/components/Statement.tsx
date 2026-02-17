import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Statement = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-24 md:py-48">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 w-full flex flex-col items-center justify-center gap-12 md:gap-24">

                <div className="w-full overflow-hidden">
                    <motion.h2
                        style={{ x: x1 }}
                        className="text-[15vw] leading-[0.8] font-black uppercase text-white whitespace-nowrap opacity-20 pointer-events-none select-none tracking-tighter"
                    >
                        IMPERFECTION IS TRUTH
                    </motion.h2>
                </div>

                <div className="max-w-4xl px-8 text-center relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20" />

                    <h3 className="text-lg md:text-2xl font-mono uppercase tracking-[0.2em] text-primary mb-8">
                        Manifesto_01
                    </h3>

                    <p className="text-2xl md:text-5xl font-bold leading-tight uppercase text-white mix-blend-difference">
                        Using <span className="text-white/40">chaos</span> as a medium.
                        <br />
                        We don't create for the <span className="italic">comfortable</span>.
                        <br />
                        We create for the <span className="line-through decoration-primary">broken</span>.
                    </p>

                    <p className="mt-12 text-sm md:text-base text-white/60 font-mono tracking-widest max-w-2xl mx-auto leading-relaxed">
                        In a world obsessed with polish, we worship the glitch.
                        Every thread is a rebellion against the pristine.
                        Wear your scars correctly.
                    </p>

                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20" />
                </div>

                <div className="w-full overflow-hidden">
                    <motion.h2
                        style={{ x: x2 }}
                        className="text-[15vw] leading-[0.8] font-black uppercase text-white whitespace-nowrap opacity-20 pointer-events-none select-none tracking-tighter text-right"
                    >
                        ORDER FROM CHAOS
                    </motion.h2>
                </div>
            </div>
        </section>
    );
};

export default Statement;