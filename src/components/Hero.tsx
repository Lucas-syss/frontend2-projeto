import angelDark from "@/assets/angel-dark.png";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end">
      <HeroBackground />
      <div className="relative z-10 w-full px-8 pb-16 md:pb-24">
        <div className="relative">
          <h1 className="text-[clamp(3rem,12vw,12rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-primary animate-flicker mix-blend-difference">
            FALL
            <br />
            <span className="ml-[10vw]">FROM</span>
            <br />
            <span className="ml-[3vw] text-primary/30">GRACE</span>
          </h1>
          <p className="absolute bottom-4 right-8 text-xs tracking-[0.5em] uppercase text-muted-foreground md:text-sm">
            FW26 — LIMITED DROP
          </p>
        </div>
        <a
          href="#collection"
          className="inline-block mt-10 px-8 py-3 border border-primary text-primary text-xs tracking-[0.3em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          EXPLORE COLLECTION
        </a>
      </div>
    </section>
  );
};

export default Hero;
