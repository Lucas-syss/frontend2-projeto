import angelLight from "@/assets/angel-light.png";

const Statement = () => {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black py-32">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity grayscale"
                    style={{ backgroundImage: `url(${angelLight})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                <div className="mb-8 overflow-hidden">
                    <p className="text-xs font-mono tracking-[0.5em] text-white/50 animate-fade-down animate-duration-[2000ms]">
                        EST. 2026 — GLOBAL UNDERGROUND
                    </p>
                </div>

                <div className="relative w-full">
                    <h2 className="text-[clamp(3.5rem,10vw,12rem)] font-black leading-[0.85] tracking-tighter text-white mix-blend-difference">
                        <span className="block animate-fade-right animate-duration-1000 animate-delay-100 hover:text-white/90 transition-colors">
                            WE DON'T
                        </span>
                        <span className="block text-white/20 ml-[15vw] animate-fade-left animate-duration-1000 animate-delay-300">
                            DESIGN
                        </span>
                        <span className="block text-right mr-[5vw] animate-fade-right animate-duration-1000 animate-delay-500">
                            FOR THE
                        </span>
                        <div className="relative inline-block animate-fade-up animate-duration-1000 animate-delay-700">
                            <span className="relative z-10 text-white">COMFORTABLE</span>
                            <div className="absolute -bottom-2 left-0 right-0 h-[0.1em] bg-white transform origin-left scale-x-0 animate-expand animate-delay-[1500ms] animate-fill-forwards" />
                        </div>
                    </h2>
                </div>

                <div className="mt-16 md:mt-24 max-w-2xl text-left self-end mr-[10%] border-l border-white/20 pl-6 md:pl-8 animate-fade-up animate-delay-1000">
                    <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 tracking-wide">
                        StoneSaints exists at the intersection of <span className="font-bold text-white">ruin</span> and refinement.
                        Each piece is a monument to what was never meant to last —
                        built from the rubble of convention, draped in controlled decay.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-px w-12 bg-white/50" />
                        <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                            No Compromise
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statement;