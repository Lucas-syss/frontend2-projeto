import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
      <Link to="/" className="flex items-center gap-3">
        <span className="text-3xl font-black tracking-[-0.08em] uppercase text-primary">
          STONESAINTS™
        </span>
      </Link>

      <div className="flex items-center gap-8">
        {["COLLECTION", "ABOUT"].map((link) => (
          <a
            key={link}
            href={`/#${link.toLowerCase()}`}
            className="relative text-xs tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            {link}
          </a>
        ))}
        <Link
          to="/archive"
          className="relative text-xs tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          ARCHIVE
        </Link>
        <a
          href="#"
          className="relative text-xs tracking-[0.3em] uppercase text-primary after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          CART
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
