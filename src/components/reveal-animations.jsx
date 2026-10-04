import React from "react";
import { motion } from "motion/react";

export const BlurIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}) => {
  return (
    <motion.div
      initial={{ filter: "blur(12px)", opacity: 0, y: 15 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const BoxReveal = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  boxColor = "bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500",
}) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        whileInView={{ left: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay, ease: "easeInOut" }}
        className={`absolute inset-y-0 left-0 right-0 z-20 pointer-events-none opacity-80 ${boxColor}`}
      />
    </div>
  );
};
