import { useEffect, useRef, useState } from "react";
import wraithHoodie from "@/assets/wraith-hoodie.png";
import decayTee from "@/assets/decay-tee.png";

const products = [
    {
        id: 1,
        name: "WRAITH HOODIE",
        price: "€420",
        span: "col-span-1 row-span-2",
        image: wraithHoodie
    },
    {
        id: 2,
        name: "DECAY TEE",
        price: "€180",
        span: "col-span-1 row-span-2",
        image: decayTee
    },
    {
        id: 3,
        name: "TOMB JACKET",
        price: "€680",
        span: "col-span-1 row-span-2",
        image: wraithHoodie
    },
    {
        id: 4,
        name: "RUIN VEST",
        price: "€290",
        span: "col-span-1 row-span-2",
        image: decayTee
    },
    {
        id: 5,
        name: "SAINT CREWNECK",
        price: "€320",
        span: "col-span-1 row-span-2",
        image: wraithHoodie
    },
    {
        id: 6,
        name: "PEDRO",
        price: "€320",
        span: "col-span-1 row-span-2",
        image: decayTee
    },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${product.span} group relative overflow-hidden bg-secondary/10 border border-white/5 data-[visible=true]:animate-in data-[visible=true]:fade-in-0 data-[visible=true]:slide-in-from-bottom-4 duration-700`}
            data-visible={visible}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            </div>

            <div className="relative z-20 flex flex-col justify-between h-full p-6">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[10px] font-mono tracking-widest text-white/60 bg-black/50 px-2 py-1 backdrop-blur-sm">
                        {String(product.id).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-white/60 bg-black/50 px-2 py-1 backdrop-blur-sm">
                        stock: [ok]
                    </span>
                </div>

                <div className="mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <h3 className="text-xl font-black tracking-tighter text-white uppercase mix-blend-difference">
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2 border-t border-white/20 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        <p className="text-sm font-medium tracking-widest text-white">
                            {product.price}
                        </p>
                        <button className="text-[10px] uppercase tracking-widest hover:text-white/70 transition-colors">
                            View Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductGrid = () => {
    return (
        <section id="collection" className="relative px-8 py-24">
            <p className="text-muted-foreground text-xs font-mono mb-8 opacity-40">
                {`<!-- collection grid -->`}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px] md:auto-rows-[280px]">
                {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;