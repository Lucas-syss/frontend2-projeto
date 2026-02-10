const Marquee = () => {
    const text = "STONESAINTS™ // FW26 // LIMITED DROP // UNDERGROUND LUXURY // NO SAINTS IN STONE // ";

    return (
        <div className="w-full border-y border-border py-4 overflow-hidden bg-background/80 backdrop-blur-sm">
            <div className="flex animate-marquee whitespace-nowrap">
                {Array.from({ length: 4 }).map((_, i) => (
                    <span
                        key={i}
                        className="text-sm tracking-[0.4em] uppercase text-muted-foreground font-mono mx-0"
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;