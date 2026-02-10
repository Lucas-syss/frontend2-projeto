import angelLight from "@/assets/angel-light.png";

const Statement = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
                style={{ backgroundImage: `url(${angelLight})` }}
            />
            <div className="absolute inset-0 bg-background/70" />

            <div className="relative z-10 w-full px-8 py-24">
                <p className="text-muted-foreground text-xs font-mono mb-12 opacity-40">
                    {`<manifesto>`}
                </p>

                <div className="max-w-5xl">
                    <p className="text-[clamp(2rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-primary/10">
                        WE DON'T DESIGN
                    </p>
                    <p className="text-[clamp(2rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-primary/30 ml-[5vw]">
                        FOR THE
                    </p>
                    <p className="text-[clamp(2rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-primary ml-[2vw]">
                        COMFORTABLE
                    </p>
                </div>

                <p className="mt-16 max-w-md text-sm leading-relaxed text-muted-foreground tracking-wide">
                    StoneSaints exists at the intersection of ruin and refinement.
                    Each piece is a monument to what was never meant to last —
                    built from the rubble of convention, draped in controlled decay.
                </p>

                <p className="text-muted-foreground text-xs font-mono mt-12 opacity-40">
                    {`</manifesto>`}
                </p>
            </div>
        </section>
    );
};

export default Statement;