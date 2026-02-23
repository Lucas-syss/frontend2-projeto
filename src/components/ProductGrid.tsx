"use client";
import { useState } from "react";
import ProductModal from "./ProductModal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
        image: "/decay-tee.webp",
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
            className="group relative cursor-pointer px-2"
            onClick={onClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-mono uppercase tracking-widest text-xs border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors bg-black/40 backdrop-blur-sm">
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
        </div>
    );
}

const ProductGrid = () => {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

    return (
        <section id="collection" className="relative px-4 md:px-12 py-24 min-h-screen bg-black overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="mb-12 flex items-end justify-between">
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white mix-blend-difference tracking-tighter">
                        The Collection
                    </h2>
                    <p className="hidden md:block text-zinc-500 font-mono text-xs uppercase tracking-[0.5em] mb-2">
                        Scroll to explore
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {products.map((product, index) => (
                            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <ProductItem
                                    product={product}
                                    index={index}
                                    onClick={() => setSelectedProduct(product)}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="hidden md:block">
                        <CarouselPrevious className="border-white/20 bg-black/50 text-white hover:bg-white hover:text-black transition-colors" />
                        <CarouselNext className="border-white/20 bg-black/50 text-white hover:bg-white hover:text-black transition-colors" />
                    </div>
                </Carousel>
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