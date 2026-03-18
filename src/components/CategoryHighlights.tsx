import Link from 'next/link';

const CategoryHighlights = () => {
    return (
        <section className="py-24 px-4 md:px-8 max-w-[2000px] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <Link href="/mens" className="group relative block aspect-[4/5] md:aspect-square overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-[url('/model1.webp')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <h3 className="text-white text-4xl md:text-6xl font-display uppercase tracking-widest">
                            Men&apos;s
                        </h3>
                        <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/60 border border-white/20 px-4 py-2 group-hover:border-white/50 group-hover:text-white transition-all duration-500">
                            Shop Now
                        </span>
                    </div>
                </Link>
                <Link href="/womens" className="group relative block aspect-[4/5] md:aspect-square overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-[url('/modal2.webp')] grayscale bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <h3 className="text-white text-4xl md:text-6xl font-display uppercase tracking-widest">
                            Women&apos;s
                        </h3>
                        <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/60 border border-white/20 px-4 py-2 group-hover:border-white/50 group-hover:text-white transition-all duration-500">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default CategoryHighlights;
