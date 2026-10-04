import { useState } from "react";
import { motion } from "motion/react";
import { Bot, Sparkles } from "lucide-react";

function Navigation({ onNavClick }) {
  return (
    <ul className="nav-ul items-center">
      <li className="nav-li">
        <a className="nav-link" href="#home" onClick={onNavClick}>
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about" onClick={onNavClick}>
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#skills" onClick={onNavClick}>
          3D Skills
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work" onClick={onNavClick}>
          Projects
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact" onClick={onNavClick}>
          Contact
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 z-40 w-full backdrop-blur-xl bg-neutral-950/70 border-b border-white/5">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-3">
          <a
            href="/"
            className="text-xl font-bold transition-all text-neutral-200 hover:text-cyan-400 flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-sm font-mono shadow-md group-hover:scale-105 transition-transform">
              S
            </span>
            <span>Siddhartha Singh</span>
          </a>

          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex">
              <Navigation />
            </nav>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden p-1.5 rounded-lg bg-neutral-900 border border-white/10"
              aria-label="Toggle menu"
            >
              <img
                src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                className="w-5 h-5"
                alt="toggle"
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden bg-neutral-950/95 border-b border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="py-4">
            <Navigation onNavClick={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
