"use client";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "WRAITH HOODIE",
        price: "€420",
        image: "/wraith-hoodie.webp",
    },
    {
        id: 2,
        name: "DECAY TEE",
        price: "€180",
        image: "/decay-tee.webp",
    },
    {
        id: 3,
        name: "TOMB JACKET",
        price: "€680",
        image: "/wraith-hoodie.webp",
    },
    {
        id: 4,
        name: "RUIN VEST",
        price: "€290",
        image: "/ruin-vest.webp",
    },
    {
        id: 5,
        name: "SAINT BRACELET",
        price: "€110",
        image: "/bound-bracelet.webp",
    },
    {
        id: 6,
        name: "RUGGED RINGS",
        price: "€50",
        image: "/rugged-rings.webp",
    },
];

const ProductItem = ({ product, index, onClick }: { product: typeof products[0], index: number, onClick: () => void }) => {
    return (
        <div
            className="group relative cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white font-mono uppercase tracking-[0.3em] text-xs border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                        VIEW ARTIFACT
                    </span>
                </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-2">
                <div className="flex w-full justify-between items-center text-xs font-mono text-white/50 uppercase tracking-[0.2em]">
                    <span>0{index + 1}</span>
                    <span>{product.price}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display uppercase text-white tracking-[-0.02em]">
                    {product.name}
                </h3>
            </div>
        </div>
    );
}

const ProductGrid = ({ title = "THE COLLECTION", subtitle = "Curated artifacts for the modern dystopia" }: { title?: string, subtitle?: string }) => {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

    return (
        <section id="collection" className="relative px-4 md:px-12 py-32 min-h-screen bg-black overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-12 gap-8">
                    <h2 className="text-[clamp(3rem,8vw,8rem)] font-display uppercase leading-[0.8] tracking-[-0.04em] text-white whitespace-pre-line">
                        {title.replace(' ', '\n')}
                    </h2>
                    <p className="md:block text-zinc-500 font-mono text-xs uppercase tracking-[0.5em] mb-2 max-w-xs md:text-right whitespace-pre-line">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12 lg:gap-x-24">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                        >
                            <ProductItem product={product} index={index} onClick={() => setSelectedProduct(product)} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
};

export default ProductGrid;