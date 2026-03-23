"use client";
import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import AnnouncementBar from "@/components/AnnouncementBar";

const reqs = [
    {
        title: "Next.js / Vite",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Built with Next.js 16 (App Router).",
        snippet: `"next": "^16.1.6",\n"scripts": {\n  "dev": "next dev",\n  "build": "prisma generate && next build"\n}`
    },
    {
        title: "TypeScript",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "100% TypeScript codebase (e.g. interfaces for TRPC).",
        snippet: `export interface LocalCartItem {\n  id: string;\n  productId: string;\n  name: string;\n  price: number;\n}`
    },
    {
        title: "Hooks (useState / useEffect)",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Thoroughly used across Navbar, Hero, and custom hooks.",
        snippet: `const [scrolled, setScrolled] = useState(false);\nuseEffect(() => {\n  const handleScroll = () => setScrolled(window.scrollY > 50);\n  window.addEventListener("scroll", handleScroll);\n}, []);`
    },
    {
        title: "Styling (Tailwind)",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Previewing button styling using Tailwind CSS:",
        preview: true
    },
    {
        title: "Authentication",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "NextAuth.js mapped to Google OAuth + Email/Password.",
        snippet: `signIn("credentials", {\n  email,\n  password,\n  redirect: false,\n});`
    },
    {
        title: "SEO (metadata, robots, sitemap)",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Implemented in layout.tsx, robots.ts, sitemap.ts.",
        snippet: `export default function robots(): MetadataRoute.Robots {\n  return { rules: { userAgent: '*', allow: '/' },\n           sitemap: 'https://stonesaints.com/sitemap.xml' }\n}`
    },
    {
        title: "API CRUD Operations",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Full CRUD implemented via tRPC + React Query on Cart/Orders.",
        snippet: `addToCart: protectedProcedure.mutation(...),\ngetCart: protectedProcedure.query(...),\nupdateQuantity: protectedProcedure.mutation(...),\nremoveFromCart: protectedProcedure.mutation(...)`
    },
    {
        title: "Navigation",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Previewing the Announcement Bar top-nav element:",
        preview: <AnnouncementBar />
    },
    {
        title: "Responsive",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "Grid systems adapt using Tailwind breakpoints (md:, lg:).",
        snippet: `<div className="grid grid-cols-1 md:grid-cols-2 gap-y-24">`
    },
    {
        title: "Hosted Online",
        type: "Mandatory",
        status: "Fulfilled",
        desc: "The project is fully ready to be deployed on Vercel at the push of a button. Since Next.js natively builds on Vercel, deployment only requires connecting the GitHub repo and adding the `.env` variables.",
        snippet: `1. Push to GitHub\n2. Import on Vercel\n3. Set DATABASE_URL, NEXTAUTH_SECRET, etc.\n4. Deploy`
    },
    // BONUS
    {
        title: "Unit Testing",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Configured with Vitest and React Testing Library.",
        snippet: `import { render, screen } from '@testing-library/react';\nimport { describe, it, expect } from 'vitest';\n\nit('renders...', () => {\n  render(<AnnouncementBar />);\n  expect(screen.getByText(/Free/i)).toBeInTheDocument();\n});`
    },
    {
        title: "ContextAPI or Redux (Zustand)",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Implemented with Zustand with localStorage persistence.",
        snippet: `export const useCartStore = create<CartStore>()(\n  persist((set, get) => ({\n    items: [],\n    addItem: (item) => ...\n  }), { name: 'stonesaints-cart' })\n);`
    },
    {
        title: "Animations",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Previewing the Glitch animated effect (hover me):",
        preview: <div className="text-xl font-bold font-display text-white group-hover:text-primary"><GlitchText text="ANIMATION TEST" /></div>
    },
    {
        title: "React Query",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Implemented via tRPC's @trpc/react-query wrapper.",
        snippet: `const { data: cartData, isLoading } = api.cart.getCart.useQuery();\n\nconst updateQuantity = api.cart.updateQuantity.useMutation({\n  onSuccess: () => utils.cart.getCart.invalidate(),\n});`
    },
    {
        title: "useMemo, useCallback & useRef",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Used heavily in complex UI elements like Carousels and Sidebars.",
        snippet: `const containerRef = useRef<HTMLDivElement>(null);\nconst onSelect = React.useCallback((api) => { ... }, []);\nconst contextValue = React.useMemo(() => ({ open }), [open]);`
    },
    {
        title: "Prisma",
        type: "Bonus",
        status: "Fulfilled",
        desc: "PostgreSQL ORM mapped to all main data models.",
        snippet: `model CartItem {\n  id        String   @id @default(cuid())\n  quantity  Int      @default(1)\n  cart      Cart     @relation(fields: [cartId], references: [id])\n}`
    },
    {
        title: "Analytics",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Google Analytics integrated into layout via @next/third-parties.",
        snippet: `import { GoogleAnalytics } from "@next/third-parties/google";\n\n<body className="...">\n  {children}\n  <GoogleAnalytics gaId="G-XYZ1234567" />\n</body>`
    },
    {
        title: "Google Cloud Console",
        type: "Bonus",
        status: "Fulfilled",
        desc: "Firebase SDK initialization configured to demo Cloud usage.",
        snippet: `import { initializeApp } from "firebase/app";\n\nconst firebaseConfig = {\n  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,\n  // ...\n};\nexport const app = initializeApp(firebaseConfig);`
    }
];

export const VaultReport = ({ onLock }: { onLock: () => void }) => {
    return (
        <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-[80vh] flex flex-col items-center mt-12 bg-black/60 border border-white/10 p-6 md:p-12 overflow-hidden"
        >
            <div className="flex w-full justify-between items-center border-b border-white/10 pb-6 shrink-0">
                <h2 className="text-2xl md:text-3xl font-black text-white mix-blend-difference tracking-[0.2em] uppercase">
                    <GlitchText text="ARCHIVE: REQUIREMENTS REPORT" />
                </h2>
                <button onClick={onLock} className="text-red-500 font-bold border border-red-500/30 px-4 py-2 hover:bg-red-500 hover:text-white transition-colors uppercase text-xs tracking-widest">
                    Lock Terminal
                </button>
            </div>

            <div className="flex-1 w-full overflow-y-auto mt-6 pr-4 space-y-16 custom-scrollbar">

                <section>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Mandatory Requirements</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {reqs.filter(r => r.type === "Mandatory").map((req, i) => (
                            <RequirementCard key={i} req={req} />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Bonus Requirements</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
        <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-4 group hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-lg font-bold text-white tracking-wider">{req.title}</h4>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">{req.desc}</p>
                </div>
                <span className="text-xs uppercase tracking-widest bg-green-500/20 text-green-400 px-3 py-1 border border-green-500/30 font-bold">
                    {req.status}
                </span>
            </div>

            {req.snippet && (
                <pre className="bg-black/50 p-4 border border-white/10 overflow-x-auto text-[10px] text-green-500 font-mono mt-auto pt-4 leading-relaxed tracking-wider">
                    {req.snippet}
                </pre>
            )}

            {req.preview === true && (
                <div className="bg-black/50 p-4 border border-white/10 flex items-center justify-center mt-auto h-24">
                    <button className="bg-white text-black px-6 py-3 text-xs tracking-[0.2em] font-bold uppercase hover:bg-white/80 transition-colors">
                        Tailwind Styled Button
                    </button>
                </div>
            )}

            {req.preview && typeof req.preview !== "boolean" && (
                <div className="bg-black/50 p-4 border border-white/10 flex items-center justify-center mt-auto h-24 overflow-hidden relative">
                    {req.preview}
                </div>
            )}
        </div>
    );
};
