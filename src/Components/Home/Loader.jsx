import { motion as Motion } from "framer-motion";
import React from "react";

export default function Loader() {
  
  return (
    <Motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-primary flex items-center justify-center z-9999"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <Motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl font-nav tracking-widest"
        >
          Logo
        </Motion.h1>

        {/* Dots Animation */}
        <div>
          <div className="flex gap-3">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-4 h-4 bg-white/80 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </Motion.div>
  );
}