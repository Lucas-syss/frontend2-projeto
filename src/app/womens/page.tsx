"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import { allProducts, categoryLabels, type Product } from "@/data/products";
import { motion } from "framer-motion";

const womensProducts = allProducts.filter(
    (p) => p.gender === "womens" || p.gender === "unisex"
);

const availableCategories = Array.from(
    new Set(womensProducts.map((p) => p.category))
);

const WomensPage = () => {
    const [activeFilter, setActiveFilter] = useState<Product["category"] | "all">("all");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filtered =
        activeFilter === "all"
            ? womensProducts
            : womensProducts.filter((p) => p.category === activeFilter);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-8 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
                        Women&apos;s
                    </h1>
                    <p className="text-sm font-mono text-white/40 mt-3 tracking-widest uppercase">
                        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                    </p>
                </div>
            </section>

            <section className="px-4 md:px-8 py-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Filter Sidebar */}
                    <nav className="md:w-56 flex-shrink-0">
                        <div className="md:sticky md:top-24 space-y-1">
                            <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">
                                Filter by Category
                            </p>
                            <button
                                onClick={() => setActiveFilter("all")}
                                className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 w-full text-left border-l-2 ${activeFilter === "all"
                                        ? "border-primary text-primary bg-white/5"
                                        : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
                                    }`}
                            >
                                All Items
                            </button>
                            {availableCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 w-full text-left border-l-2 ${activeFilter === cat
                                            ? "border-primary text-primary bg-white/5"
                                            : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
                                        }`}
                                >
                                    {categoryLabels[cat]}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Product Grid */}
                    <main className="flex-1 min-w-0">
                        {filtered.length === 0 ? (
                            <div className="text-center py-24">
                                <p className="text-white/40 font-mono uppercase tracking-widest text-sm">
                                    No products in this category
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.05,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        <div
                                            className="group relative cursor-pointer"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                    <span className="text-white font-mono uppercase tracking-[0.3em] text-xs border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                                                        Quick View
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-col items-start gap-1">
                                                <h3 className="text-lg font-display uppercase text-white tracking-[-0.02em]">
                                                    {product.name}
                                                </h3>
                                                <span className="text-sm font-mono text-white/50">
                                                    {product.price}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </section>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            <Footer />
        </div>
    );
};

export default WomensPage;
