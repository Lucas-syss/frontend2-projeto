"use client";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import GlitchText from "@/components/ui/GlitchText";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
    if (!product) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 pointer-events-none"
                    >
                        <div className="pointer-events-auto relative w-full max-w-5xl grid overflow-hidden border border-white/10 bg-black/90 md:grid-cols-2 shadow-2xl">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-50 p-2 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden bg-white/5">
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.7 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>

                            <div className="flex flex-col justify-between p-6 md:p-12">
                                <div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                        <h2 className="text-3xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                                            <GlitchText text={product.name} />
                                        </h2>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xl font-mono text-primary">{product.price}</span>
                                        <span className="text-xs uppercase tracking-widest text-white/40">In Stock</span>
                                    </div>

                                    <p className="mt-8 text-sm leading-relaxed text-white/60 font-mono">
                                        High-grade fabric engineered for urban decay. Features reinforced stitching, distressed detailing, and a silhouette designed for the end of times.
                                        Limited run. No reprints. ETERNAL.
                                    </p>

                                    <div className="mt-8 space-y-4">
                                        <div className="flex gap-4">
                                            {['S', 'M', 'L', 'XL'].map((size) => (
                                                <button key={size} className="h-10 w-10 border border-white/20 text-xs font-bold text-white hover:bg-white hover:text-black transition-colors">
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="group relative mt-8 w-full overflow-hidden bg-white px-8 py-4 text-black transition-transform active:scale-95">
                                    <span className="relative z-10 text-sm font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                                        Add to Cart
                                    </span>
                                    <div className="absolute inset-0 z-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                                </button>
                            </div>

                            <div className="pointer-events-none absolute inset-0 border border-white/5 mix-blend-overlay" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProductModal;
