"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen flex flex-col relative w-full">
        {/* Slanted shutter entrance overlay */}
        <motion.div
          className="fixed inset-y-0 left-0 w-full bg-black z-[999] pointer-events-none origin-left"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            skewX: "-5deg",
            transformOrigin: "left",
          }}
        />

        {/* Dynamic neon accent line sweeping across */}
        <motion.div
          className="fixed inset-y-0 left-0 w-[4px] bg-primary z-[1000] pointer-events-none"
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          exit={{ left: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Content reveal wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex-grow flex flex-col w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
