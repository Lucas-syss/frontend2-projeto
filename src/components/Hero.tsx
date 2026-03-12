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

  // Fix 4: Skip animation delay if it has already played in this session
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("heroAnimated");
    if (hasAnimated) {
      setSkipAnimation(true);
    } else {
      sessionStorage.setItem("heroAnimated", "true");
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: skipAnimation ? 0 : 3.5,
      },
    },
  };

  const itemVariants = {
    hidden: skipAnimation ? { y: 0, opacity: 1, scale: 1 } : { y: 100, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: skipAnimation
        ? { duration: 0 }
        : { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-end">
      <HeroBackground />
      <motion.div
        className="relative z-10 w-full px-8 pb-16 md:pb-24 mix-blend-difference"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: y2, opacity }}
      >
        <div className="relative">
          <h1 className="text-[clamp(4rem,14vw,14rem)] font-display uppercase leading-[0.8] tracking-[-0.04em] text-primary">
            <motion.div variants={itemVariants} className="glitch-hover" data-text="FALL">FALL</motion.div>
            <motion.div variants={itemVariants} className="ml-[10vw] glitch-hover" data-text="FROM">
              FROM
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="ml-[3vw] text-primary/30 glitch-hover"
              data-text="GRACE"
            >
              GRACE
            </motion.div>
          </h1>
          <motion.p
            variants={itemVariants}
            className="absolute bottom-4 right-8 font-mono text-xs tracking-[0.5em] uppercase text-muted-foreground md:text-sm"
          >
            FW26 — LIMITED DROP
          </motion.p>
        </div>
        <motion.a
          href="#collection"
          variants={itemVariants}
          className="inline-block mt-10 px-10 py-4 border border-primary font-mono text-primary text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:scale-105"
        >
          EXPLORE COLLECTION
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
