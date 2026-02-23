"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";

const AuthPortal = () => {
    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">

            <Link href="/login" className="group relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 bg-black overflow-hidden hover:bg-white/5 transition-colors duration-500">
                <div className="relative z-10 text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mix-blend-difference group-hover:scale-110 transition-transform duration-500">
                        <GlitchText text="ACCESS" />
                    </h2>
                    <p className="text-xs font-mono tracking-[0.5em] text-white/50 uppercase group-hover:text-primary transition-colors">
                        Existing Entity
                    </p>
                </div>

                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay" />
            </Link>


            <Link href="/register" className="group relative flex items-center justify-center bg-black overflow-hidden hover:bg-white/5 transition-colors duration-500">
                <div className="relative z-10 text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mix-blend-difference group-hover:scale-110 transition-transform duration-500">
                        <GlitchText text="INITIATE" />
                    </h2>
                    <p className="text-xs font-mono tracking-[0.5em] text-white/50 uppercase group-hover:text-primary transition-colors">
                        New Sequence
                    </p>
                </div>

                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay" />
            </Link>


            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[100px] bg-white/20 hidden md:block" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[1px] bg-white/20 md:hidden" />

                <div className="absolute top-8 left-8 text-xs font-mono text-white/30 uppercase tracking-widest">
                    Auth.Protocol_v2
                </div>

                <Link href="/" className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
                    Abort Protocol
                </Link>
            </div>
        </div>
    );
};

export default AuthPortal;
