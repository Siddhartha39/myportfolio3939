import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const ScrollDownIcon = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShow(false);
      } else {
        setShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
            Scroll Down
          </span>
          <div className="w-5 h-9 p-1 border-2 rounded-full border-neutral-400/60 flex justify-center">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollDownIcon;
