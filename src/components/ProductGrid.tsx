import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductModal from "./ProductModal";

const products = [
    {
        id: 1,
        name: "WRAITH HOODIE",
        price: "€420",
        image: "public/wraith-hoodie.webp",
        offset: 0,
        speed: 0.05
    },
    {
        id: 2,
        name: "DECAY TEE",
        price: "€180",
        image: "public/decay-tee.webp",
        offset: 100,
        speed: 0.1
    },
    {
        id: 3,
        name: "TOMB JACKET",
        price: "€680",
        image: "public/tomb-jacket.webp",
        offset: -50,
        speed: 0.02
    },
    {
        id: 4,
        name: "RUIN VEST",
        price: "€290",
        image: "public/ruin-vest.webp",
        offset: 80,
        speed: 0.08
    },
    {
        id: 5,
        name: "SAINT BRACELET",
        price: "€110",
        image: "public/bound-bracelet.webp",
        offset: 0,
        speed: 0.06
    },
    {
        id: 5,
        name: "RUGGED RINGS",
        price: "€50",
        image: "public/rugged-rings.webp",
        offset: 120,
        speed: 0.12
    },
];

const ProductItem = ({ product, index, onClick }: { product: typeof products[0], index: number, onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, product.speed * 400]);

    return (
        <motion.div
            ref={ref}
            style={{ y, marginTop: product.offset }}
            className="group relative cursor-pointer mb-24 md:mb-48"
            onClick={onClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-mono uppercase tracking-widest text-xs border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
                        Inspect
                    </span>
                </div>
            </div>

            <div className="mt-4 flex flex-col items-start gap-1">
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                    0{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white mix-blend-difference">
                    {product.name}
                </h3>
                <span className="text-sm font-mono text-primary">
                    {product.price}
                </span>
            </div>
        </motion.div>
    );
}

const ProductGrid = () => {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

    return (
        <section id="collection" className="relative px-4 md:px-8 py-24 min-h-screen bg-black overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] opacity-50" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-white/20 rounded-full animate-spin-slow duration-[30s]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                <div className="flex flex-col">
                    {products.filter((_, i) => i % 3 === 0).map((product, i) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            index={i * 3}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>

                <div className="flex flex-col pt-24 md:pt-48">
                    {products.filter((_, i) => i % 3 === 1).map((product, i) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            index={i * 3 + 1}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>

                <div className="flex flex-col pt-0 md:pt-24">
                    {products.filter((_, i) => i % 3 === 2).map((product, i) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            index={i * 3 + 2}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
            </div>

            <div className="text-center py-24">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.5em]">
                    End of Collection
                </p>
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