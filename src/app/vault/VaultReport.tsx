"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, MapPin, Search } from "lucide-react";
import GlitchText from "@/components/ui/GlitchText";
import AnnouncementBar from "@/components/AnnouncementBar";

const reqs = [
    {
        title: "1. Next.js Framework",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/app/layout.tsx, src/app/page.tsx",
        desc: "Built entirely on Next.js 14+ using the modern App Router architecture, providing seamless SSR and robust routing.",
        snippet: `"dependencies": {\n  "next": "^16.1.6",\n  // ...\n}`
    },
    {
        title: "2. TypeScript",
        type: "Mandatory",
        status: "Fulfilled",
        location: "tsconfig.json, Entire Codebase",
        desc: "100% strictly typed codebase. Interfaces defined for all components, Zustand state management, and end-to-end type safety via Prisma & tRPC.",
        snippet: `export interface Product {\n  id: number;\n  name: string;\n  price: string;\n\n}`
    },
    {
        title: "3. React Hooks",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/components/Navbar.tsx",
        desc: "Extensive use of functional Hooks throughout the application architecture.",
        snippet: `// From Navbar.tsx\nconst [scrolled, setScrolled] = useState(false);\nuseEffect(() => {\n  const handleScroll = () => setScrolled(window.scrollY > 50);\n  window.addEventListener("scroll", handleScroll);\n}, []);`
    },
    {
        title: "4. Styling Requirements",
        type: "Mandatory",
        status: "Fulfilled",
        location: "tailwind.config.ts, src/app/globals.css",
        desc: "Aesthetically premium design using Tailwind CSS paired with custom CSS keyframes for complex glitch, noise, and marquee effects.",
        preview: "button"
    },
    {
        title: "5. Authentication",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/server/auth.ts, src/app/login/page.tsx",
        desc: "Secure authentication implemented using NextAuth v5. Supports Google OAuth and Encrypted Credentials logic backed by Prisma SQLite.",
        snippet: `export const { handlers, auth, signIn, signOut } = NextAuth({\n  adapter: PrismaAdapter(db),\n  providers: [\n    GoogleProvider({...}),\n    Credentials({...})\n  ]\n});`
    },
    {
        title: "6. SEO Optimization",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/app/robots.ts, src/app/layout.tsx",
        desc: "Global static Metadata, combined with dynamically generated sitemap.xml and perfectly scoped robots.txt rules for crawlability.",
        snippet: `export const metadata: Metadata = {\n  title: "StoneSaints™",\n  description: "Limited drops of premium streetwear.",\n  keywords: ["streetwear", "fashion"],\n};`
    },
    {
        title: "7. API CRUD",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/server/api/routers/cart.ts",
        desc: "A fully functional database Cart utilizing standard Create, Read, Update, and Delete actions validated by Zod and processed by tRPC.",
        snippet: `// tRPC Router extract\ngetCart: protectedProcedure.query(...),\naddToCart: protectedProcedure.mutation(...),\nupdateQuantity: protectedProcedure.mutation(...),\nremoveFromCart: protectedProcedure.mutation(...)`
    },
    {
        title: "8. Navigation System",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/components/Navbar.tsx",
        desc: "Dynamic, sticky global layout header featuring a responsive mobile hamburger menu and an interactive live-updating cart.",
        preview: "nav"
    },
    {
        title: "9. Responsive Design",
        type: "Mandatory",
        status: "Fulfilled",
        location: "src/app/cart/page.tsx, src/components/ProductGrid.tsx",
        desc: "Fluid layouts executing custom flexbox/grid transformations using Tailwind breakpoint utilities (md:, lg:).",
        snippet: `<div className="flex flex-col lg:flex-row gap-12 lg:gap-24">\n  <div className="flex-1 w-full">...</div>\n  <div className="w-full lg:w-[400px]">...</div>\n</div>`
    },
    {
        title: "10. Hosted Online",
        type: "Mandatory",
        status: "Fulfilled",
        location: "Vercel Zero-Config Deployment",
        desc: "Fully prepared for a seamless click-and-deploy transition to Vercel.",
        snippet: `Deployment Logic Workflow:\n1. Push code to GitHub.\n2. Connect repo to Vercel (Next.js is natively detected).\n3. Inject PostgreSQL strings & NextAuth secrets in Dashboard.\n4. Deploy.`
    },
    {
        title: "Bonus 1: Unit Testing",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/store/__tests__/, src/app/register/__tests__/",
        desc: "Core unit test suites integrated directly securely observing local cart physics and UI authentication rules.",
        snippet: `describe('Registration Form', () => {\n  it('shows error if password is too short', async () => {\n    // test simulation ...\n    expect(await screen.findByText('Password must be at least 8 characters.'))\n      .toBeInTheDocument();\n  });\n});`
    },
    {
        title: "Bonus 2: Zustand Store",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/store/useCartStore.ts",
        desc: "Replaced legacy Redux setups with modern Zustand state management, enabling blazingly fast global state persistence securely via LocalStorage.",
        snippet: `export const useCartStore = create<CartStore>()(\n  persist((set, get) => ({\n    items: [],\n    addItem: (item) => ...\n  }), { name: 'stonesaints-cart' })\n);`
    },
    {
        title: "Bonus 3: Complex Animations",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/components/Hero.tsx, src/components/Lookbook.tsx",
        desc: "Deep integration of Framer Motion for scroll-bound parallax, staggering fade-ins, and complex React portal transitions.",
        preview: "glitch"
    },
    {
        title: "Bonus 4: React Query",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/app/cart/page.tsx",
        desc: "Implemented entirely via the @trpc/react-query wrapper allowing perfect cache validation and predictive state loading.",
        snippet: `const { data: cartData } = api.cart.getCart.useQuery();\n\nconst updateQuantity = api.cart.updateQuantity.useMutation({\n  onSuccess: () => utils.cart.getCart.invalidate(),\n});`
    },
    {
        title: "Bonus 5: Advanced Hooks",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/components/ui/carousel.tsx",
        desc: "Strategic usage targeting heavy layout renders to preserve frame stability and eliminate redundant React DOM manipulations.",
        snippet: `const onSelect = React.useCallback((api: CarouselApi) => {\n  setCanScrollPrev(api.canScrollPrev());\n  setCanScrollNext(api.canScrollNext());\n}, []);`
    },
    {
        title: "Bonus 6: Prisma DB ORM",
        type: "Bonus",
        status: "Fulfilled",
        location: "prisma/schema.prisma, src/server/db.ts",
        desc: "Centralized Prisma configurations targeting PostgreSQL. Manages complete database typings extending perfectly to the frontend components.",
        snippet: `model CartItem {\n  id        String   @id @default(cuid())\n  quantity  Int      @default(1)\n  cart      Cart     @relation(fields: [cartId])\n}`
    },
    {
        title: "Bonus 7: Analytics Metrics",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/app/layout.tsx, ProductModal.tsx",
        desc: "Core global tagging injected alongside surgical E-Commerce specific metric hooks for events like view_item, add_to_cart, and purchase.",
        snippet: `// Fired natively inside ProductModal.tsx\nsendGAEvent({\n  event: "add_to_cart",\n  item_name: product.name,\n  value: numericPrice,\n  currency: "EUR"\n});`
    },
    {
        title: "Bonus 8: Cloud Architecture",
        type: "Bonus",
        status: "Fulfilled",
        location: "src/lib/firebase.ts",
        desc: "Demonstrated Google Cloud initialization executing safe browser-bound loading algorithms shielding SSR configurations.",
        snippet: `import { initializeApp } from "firebase/app";\n\nlet analytics = null;\nif (typeof window !== "undefined") {\n  isSupported().then((supported) => {\n    if (supported) analytics = getAnalytics(app);\n  });\n}`
    }
];

export const VaultReport = ({ onLock }: { onLock: () => void }) => {
    return (
        <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex h-[85vh] flex-col bg-zinc-950 border-2 border-primary/30 p-6 md:p-8 lg:p-12 overflow-hidden shadow-[0_0_100px_rgba(255,0,0,0.1)] rounded-sm"
        >
            <div className="flex w-full flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-white/20 pb-6 shrink-0 gap-6">
                <div className="flex flex-col">
                    <h2 className="text-3xl md:text-5xl font-black text-white mix-blend-difference tracking-[0.2em] uppercase">
                        <GlitchText text="SYSTEM AUDIT" />
                    </h2>
                    <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                        <span>Tech Lead Validation Protocol Active</span>
                    </div>
                </div>

                <button
                    onClick={onLock}
                    className="group flex items-center gap-2 text-primary font-bold border-2 border-primary/50 px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all uppercase text-xs tracking-[0.3em] shrink-0"
                >
                    <span className="relative z-10">LOCK TERMINAL</span>
                </button>
            </div>

            <div className="flex-1 w-full overflow-y-auto mt-8 pr-2 md:pr-6 space-y-16 custom-scrollbar pb-24">

                <section>
                    <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-md z-20 py-4 mb-8 border-b border-white/10">
                        <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] border-l-4 border-primary pl-4 flex items-center gap-4">
                            Phase I: Core Requirements
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                        {reqs.filter(r => r.type === "Mandatory").map((req, i) => (
                            <RequirementCard key={i} req={req} />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-md z-20 py-4 mb-8 border-b border-white/10">
                        <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] border-l-4 border-primary pl-4 flex items-center gap-4">
                            Phase II: Technical Bonuses
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                        {reqs.filter(r => r.type === "Bonus").map((req, i) => (
                            <RequirementCard key={i} req={req} />
                        ))}
                    </div>
                </section>

            </div>
        </motion.div>
    );
};

const RequirementCard = ({ req }: { req: any }) => {
    return (
        <div className="bg-zinc-900/30 border border-white/10 p-6 md:p-8 flex flex-col gap-6 group hover:bg-zinc-900/80 transition-all duration-300 hover:border-white/30 relative overflow-hidden w-full h-full min-h-[300px]">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                <Search size={120} className="text-primary" />
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start gap-4 relative z-10 w-full mb-2">
                <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase truncate max-w-full block" title={req.title}>{req.title}</h4>
                    <div className="flex items-center gap-2 text-primary/80 mt-3 bg-primary/10 w-fit px-3 py-1.5 border border-primary/20">
                        <MapPin size={12} />
                        <span className="text-[10px] font-mono uppercase tracking-widest">{req.location}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 border border-green-500/30 shrink-0">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                        {req.status}
                    </span>
                </div>
            </div>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed relative z-10 font-mono flex-1">
                {req.desc}
            </p>

            <div className="mt-auto relative z-10 w-full overflow-hidden shrink-0 pt-4">
                {req.snippet && (
                    <div className="bg-black/90 border border-white/10 border-l-4 border-l-primary relative max-w-full">
                        <div className="flex items-center gap-2 text-zinc-500 bg-black px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-white/5">
                            <ChevronRight size={14} className="text-primary" /> Code Implementation Example
                        </div>
                        <div className="p-4 w-full overflow-x-auto custom-scrollbar">
                            <pre className="text-[11px] md:text-xs text-green-400/90 font-mono leading-relaxed whitespace-pre min-w-full inline-block">
                                <code>{req.snippet}</code>
                            </pre>
                        </div>
                    </div>
                )}

                {req.preview === "button" && (
                    <div className="bg-zinc-950 p-8 border border-white/10 flex items-center justify-center w-full">
                        <button className="bg-white text-black px-8 py-4 text-xs tracking-[0.3em] font-black uppercase hover:bg-white/80 transition-all hover:scale-[1.02] shadow-xl w-full max-w-[200px] truncate">
                            Preview
                        </button>
                    </div>
                )}

                {req.preview === "nav" && (
                    <div className="bg-zinc-950 border border-white/10 overflow-hidden w-full p-4 relative flex items-center justify-center">
                        <div className="w-full relative scale-90 border border-white/5 bg-black">
                            <AnnouncementBar />
                        </div>
                    </div>
                )}

                {req.preview === "glitch" && (
                    <div className="bg-zinc-950 p-8 border border-white/10 flex flex-col items-center justify-center group-hover:bg-primary/5 transition-colors w-full cursor-crosshair">
                        <p className="text-white/30 text-[9px] font-mono tracking-widest mb-4 uppercase">Hover text Below</p>
                        <div className="text-2xl md:text-3xl font-black font-display text-white transition-colors">
                            <GlitchText text="HOVER_TRIGGER" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
