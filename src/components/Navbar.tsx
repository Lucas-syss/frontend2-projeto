"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { api } from "@/trpc/react";
import { Menu, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: sessionData } = useSession();

  // Fix 5: Fetch cart item count
  const { data: cartData } = api.cart.getCart.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });
  const cartCount =
    cartData?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass =
    "relative text-xs font-mono tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

  const navLinks = (
    <>
      {["COLLECTION", "LOOKBOOK"].map((link) => (
        <a
          key={link}
          href={`/#${link.toLowerCase()}`}
          className={linkClass}
          onClick={() => setMobileOpen(false)}
        >
          {link}
        </a>
      ))}
      <Link
        href="/archive"
        className={linkClass}
        onClick={() => setMobileOpen(false)}
      >
        ARCHIVE
      </Link>
      {sessionData?.user && (
        <Link
          href="/cart"
          className={`${linkClass} relative inline-flex items-center gap-1 pr-1`}
          onClick={() => setMobileOpen(false)}
        >
          CART
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-white text-black rounded-full leading-none">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
      )}
      {sessionData?.user ? (
        <button
          onClick={() => {
            signOut();
            setMobileOpen(false);
          }}
          className={linkClass}
        >
          LOGOUT
        </button>
      ) : (
        <Link
          href="/login"
          className={linkClass}
          onClick={() => setMobileOpen(false)}
        >
          SIGN IN
        </Link>
      )}
    </>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6 transition-all duration-500 ${scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent mix-blend-difference"
          }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl font-display uppercase tracking-[-0.04em] text-primary">
            STONESAINTS™
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">{navLinks}</div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Fix 6: Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-10"
          >
            <div className="flex flex-col items-center gap-8 text-2xl">
              {["COLLECTION", "LOOKBOOK"].map((link) => (
                <a
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  className="font-mono tracking-[0.3em] uppercase text-primary hover:text-primary/70 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Link
                href="/archive"
                className="font-mono tracking-[0.3em] uppercase text-primary hover:text-primary/70 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                ARCHIVE
              </Link>
              {sessionData?.user && (
                <Link
                  href="/cart"
                  className="relative font-mono tracking-[0.3em] uppercase text-primary hover:text-primary/70 transition-colors flex items-center gap-2 pr-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  CART
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-4 flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-white text-black rounded-full">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              )}
              {sessionData?.user ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="font-mono tracking-[0.3em] uppercase text-primary/60 hover:text-primary transition-colors"
                >
                  LOGOUT
                </button>
              ) : (
                <Link
                  href="/login"
                  className="font-mono tracking-[0.3em] uppercase text-primary hover:text-primary/70 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  SIGN IN
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
