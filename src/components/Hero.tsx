"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  if (!mounted) {
    return (
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-end">
        <HeroBackground />
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <HeroBackground />
      <motion.div
        className="relative z-10 w-full px-4 mix-blend-difference"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: y2, opacity }}
      >
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center mt-20">
          <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-display uppercase leading-[0.9] tracking-widest text-primary font-light">
            <motion.div variants={itemVariants}>THE FW26</motion.div>
            <motion.div variants={itemVariants}>
              COLLECTION
            </motion.div>
          </h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground max-w-lg mx-auto"
          >
            A new standard in modern luxury. Designed with intention.
          </motion.p>
          <motion.a
            href="#collection"
            variants={itemVariants}
            className="inline-block mt-12 px-12 py-4 border border-primary text-primary font-mono text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-primary hover:text-primary-foreground focus:outline-none"
          >
            DISCOVER NOW
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
