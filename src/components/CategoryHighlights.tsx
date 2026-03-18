import Link from 'next/link';

const CategoryHighlights = () => {
    return (
        <section className="py-24 px-4 md:px-8 max-w-[2000px] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <Link href="#mens" className="group relative block aspect-[4/5] md:aspect-square overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="overflow-hidden">
                            <h3 className="text-white text-3xl md:text-5xl font-display uppercase tracking-widest translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                Shop Men&apos;s
                            </h3>
                        </div>
                    </div>
                </Link>
                <Link href="#womens" className="group relative block aspect-[4/5] md:aspect-square overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="overflow-hidden">
                            <h3 className="text-white text-3xl md:text-5xl font-display uppercase tracking-widest translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                Shop Women&apos;s
                            </h3>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default CategoryHighlights;
