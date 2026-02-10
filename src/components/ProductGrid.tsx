import { useEffect, useRef, useState } from "react";

const products = [
    {
        id: 1,
        name: "WRAITH HOODIE",
        price: "€420",
        span: "col-span-1 row-span-2",
        image: "wraith-hoodie.png"
    },
    {
        id: 2,
        name: "DECAY TEE",
        price: "€180",
        span: "col-span-1 row-span-2",
        image: "decay-tee.png"
    },
    {
        id: 3,
        name: "TOMB JACKET",
        price: "€680",
        span: "col-span-1 row-span-2",
        image: "wraith-hoodie.png"
    },
    {
        id: 4,
        name: "RUIN VEST",
        price: "€290",
        span: "col-span-1 row-span-2",
        image: "decay-tee.png"
    },
    {
        id: 5,
        name: "SAINT CREWNECK",
        price: "€320",
        span: "col-span-1 row-span-2",
        image: "wraith-hoodie.png"
    },
    {
        id: 6,
        name: "PEDRO",
        price: "€320",
        span: "col-span-1 row-span-2",
        image: "decay-tee.png"
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
            className={`${product.span} glitch-hover group relative overflow-hidden border border-border bg-secondary/30 backdrop-blur-md ${visible ? "animate-fade-up" : "opacity-0"
                }`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <img
                src={`src/assets/${product.image}`}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-fit transition-transform duration-700"
            />            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full min-h-[200px] p-5">
                <p className="text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {`<product id="${product.id}" />`}
                </p>
                <h3 className="text-sm tracking-[0.25em] uppercase text-primary font-bold mt-auto drop-shadow-md">
                    {product.name}
                </h3>
                <p className="text-xs tracking-[0.2em] text-white/80 mt-1 drop-shadow-md">
                    {product.price}
                </p>
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