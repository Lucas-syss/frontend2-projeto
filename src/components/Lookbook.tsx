"use client";
import { motion } from "framer-motion";

const Lookbook = () => {
    return (
        <section id="lookbook"  className="relative bg-black w-full min-h-screen py-24 md:py-32 overflow-hidden px-4 md:px-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mix-blend-difference tracking-tighter leading-none mb-6">
                            Editorial <br /> Archives
                        </h2>
                        <p className="text-white/50 font-mono text-xs leading-relaxed uppercase tracking-widest">
                            Volume I. Exploring the void between organic decay and structural brutalism. Shot on location in District 9.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:col-span-8 md:row-span-2 relative group overflow-hidden bg-white/5 border border-white/10"
                    >
                        <img
                            src="/model1.webp"
                            alt="Lookbook Image 1"
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase bg-white text-black px-4 py-2">
                                LOOK // 01
                            </span>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 relative group overflow-hidden bg-white/5 border border-white/10"
                    >
                        <img
                            src="/modal2.webp"
                            alt="Lookbook Image 2"
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase bg-white text-black px-4 py-2">
                                LOOK // 02
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 relative group overflow-hidden bg-white/5 border border-white/10"
                    >
                        <img
                            src="/model3.webp"
                            alt="Lookbook Image 3"
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase bg-white text-black px-4 py-2">
                                LOOK // 03
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:col-span-12 relative group overflow-hidden bg-white/5 border border-white/10"
                    >
                        <img
                            src="/look4.webp"
                            alt="Lookbook Image 4"
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-105 object-[50%_30%]"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase bg-white text-black px-4 py-2">
                                CAMPAIGN // EXT
                            </span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Lookbook;
