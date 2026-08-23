import { motion as Motion } from "framer-motion";
import React from "react";

export default function Loader() {
  const letters = ["H", "o", "m", "e", "y"];

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-primary flex items-center justify-center z-9999"
    >
      {/* Homey */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-1">
          {letters.map((letter, i) => (
            <Motion.span
              key={letter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0.5, 1], y: [20, 0, 10, 0] }}
              transition={{
                duration: 1.2,
                delay: i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white text-4xl font-nav tracking-widest"
            >
              {letter}
            </Motion.span>
          ))}
        </div>
      </div>
    </Motion.div>
  );
}
