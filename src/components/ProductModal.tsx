"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, Loader2 } from "lucide-react";
import GlitchText from "@/components/ui/GlitchText";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { data: sessionData } = useSession();
    const router = useRouter();

    const utils = api.useUtils();
    const addToCart = api.cart.addToCart.useMutation({
        onSuccess: () => {
            utils.cart.getCart.invalidate();
            onClose(); // Optional: close modal on success, or show a toast
        }
    });

    if (!product) return null;

    const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

    const handleAddToCart = () => {
        if (!sessionData?.user) {
            router.push("/login"); // fallback to login if not authenticated
            return;
        }

        if (!selectedSize) {
            alert("Please select a size first.");
            return;
        }

        addToCart.mutate({
            productId: `PROD-${product.id}`,
            name: product.name,
            size: selectedSize,
            price: numericPrice,
            image: product.image,
            quantity: 1,
        });
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-12 pointer-events-none"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="pointer-events-auto relative w-full h-full md:h-auto max-h-[100vh] max-w-7xl grid overflow-hidden bg-black border-none md:border md:border-white/20 md:grid-cols-2 shadow-2xl"
                        >
                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 z-50 p-2 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 bg-black/50 backdrop-blur-md mix-blend-difference"
                            >
                                <X size={32} />
                            </button>

                            <div className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden bg-white/5 order-2 md:order-1 border-t md:border-t-0 md:border-r border-white/20">
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover scale-105 hover:scale-110 transition-transform duration-[2000ms]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 pointer-events-none" />
                            </div>

                            <div className="flex flex-col justify-between p-8 md:p-16 order-1 md:order-2 overflow-y-auto">
                                <div>
                                    <div className="flex flex-col items-start border-b border-white/20 pb-8">
                                        <h2 className="text-4xl md:text-7xl font-display uppercase leading-[0.85] tracking-[-0.04em] text-white">
                                            <GlitchText text={product.name} />
                                        </h2>
                                        <div className="mt-8 flex items-center justify-between w-full">
                                            <span className="text-2xl font-mono text-white/80">{product.price}</span>
                                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 border border-white/20 px-3 py-1">In Stock</span>
                                        </div>
                                    </div>

                                    <p className="mt-8 text-sm leading-relaxed text-white/60 font-mono max-w-md">
                                        High-grade fabric engineered for urban decay. Features reinforced stitching, distressed detailing, and a silhouette designed for the end of times.
                                        Limited run. No reprints. <span className="text-white">ETERNAL.</span>
                                    </p>

                                    <div className="mt-12 space-y-4">
                                        <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Select Size</p>
                                        <div className="flex gap-4">
                                            {['S', 'M', 'L', 'XL'].map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`h-12 w-12 border font-display text-lg transition-colors ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:bg-white/10'}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={addToCart.isPending}
                                    className="group relative mt-16 w-full overflow-hidden bg-white px-8 py-6 text-black transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 text-sm font-display uppercase tracking-[0.2em] group-hover:text-black transition-colors flex items-center justify-center gap-2">
                                        {addToCart.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                        {addToCart.isPending ? "Adding..." : `Add to Cart — ${product.price}`}
                                    </span>
                                    <div className="absolute inset-0 z-0 bg-zinc-300 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProductModal;
