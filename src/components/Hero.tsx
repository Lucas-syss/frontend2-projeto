"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 3.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end">
      <HeroBackground />
      <motion.div
        className="relative z-10 w-full px-8 pb-16 md:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          <h1 className="text-[clamp(3rem,12vw,12rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-primary mix-blend-difference">
            <motion.div variants={itemVariants}>FALL</motion.div>
            <motion.div variants={itemVariants} className="ml-[10vw]">
              FROM
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="ml-[3vw] text-primary/30"
            >
              GRACE
            </motion.div>
          </h1>
          <motion.p
            variants={itemVariants}
            className="absolute bottom-4 right-8 text-xs tracking-[0.5em] uppercase text-muted-foreground md:text-sm"
          >
            FW26 — LIMITED DROP
          </motion.p>
        </div>
        <motion.a
          href="#collection"
          variants={itemVariants}
          className="inline-block mt-10 px-8 py-3 border border-primary text-primary text-xs tracking-[0.3em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          EXPLORE COLLECTION
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
