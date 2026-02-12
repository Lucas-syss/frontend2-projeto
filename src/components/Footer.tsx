const Footer = () => {
    return (
        <footer className="border-t border-border px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h2 className="text-2xl font-black tracking-[-0.06em] uppercase text-primary mb-4">
                        STONESAINTS
                    </h2>
                    <p className="text-xs text-muted-foreground tracking-wide leading-relaxed">
                        Underground luxury for the ungovernable.
                        <br />
                        Est. 2026 — Nowhere.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    {["COLLECTION", "ABOUT", "CONTACT"].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </div>
                <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        JOIN THE CONGREGATION
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            className="flex-1 bg-transparent border border-border px-4 py-3 text-xs tracking-[0.2em] text-primary placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
                        />
                        <button className="border border-border border-l-0 px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                            →
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-16 flex items-center justify-between border-t border-border pt-6">
                <p className="text-xs text-muted-foreground/40 font-mono">
                    © 2026 STONESAINTS. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-6">
                    {["IG", "TW", "TK"].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="text-xs tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                        >
                            {social}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;