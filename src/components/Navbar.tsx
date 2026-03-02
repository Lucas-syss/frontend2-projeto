"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-md border-b border-white/10" : "bg-transparent mix-blend-difference"}`}
    >
      <Link href="/" className="flex items-center gap-3">
        <span className="text-3xl font-display uppercase tracking-[-0.04em] text-primary">
          STONESAINTS™
        </span>
      </Link>

      <div className="flex items-center gap-8">
        {["COLLECTION", "LOOKBOOK"].map((link) => (
          <a
            key={link}
            href={`/#${link.toLowerCase()}`}
            className="relative text-xs font-mono tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            {link}
          </a>
        ))}
        <Link
          href="/archive"
          className="relative text-xs font-mono tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          ARCHIVE
        </Link>
        <Link
          href="/cart"
          className="relative text-xs font-mono tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          CART
        </Link>
        <Link
          href="/auth"
          className="relative text-xs font-mono tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          AUTHENTICATE
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
