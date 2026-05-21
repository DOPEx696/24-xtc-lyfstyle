"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PreLoader({ onComplete }) {
  const [dots, setDots] = useState("");
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random properties on the client only to avoid SSR hydration mismatches
    const generatedStars = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? (Math.random() > 0.5 ? 3 : 2) : 1, // varied star sizes
      duration: 2 + Math.random() * 4, // varied twinkle durations
      driftX: (Math.random() - 0.5) * 40, // horizontal drift
      driftY: (Math.random() - 0.5) * 40, // vertical drift
    }));
    setStars(generatedStars);

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      {/* Real Cosmic Universe Background in Ultra HD */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cosmic_bg.png')" }}
        initial={{ scale: 1.25, opacity: 0, rotate: -2 }}
        animate={{
          scale: [1.25, 1.08, 1.25],
          rotate: [-2, 1, -2],
          opacity: 0.65,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient gradient overlay to blend corners and add deep space depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-0 pointer-events-none" />

      {/* Starry Universe Layer (Client-Only Random coordinates for perfect hydration) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.size > 1 ? "0 0 6px rgba(255, 255, 255, 0.8)" : "none",
            }}
            animate={{
              opacity: [0.1, 0.85, 0.1],
              scale: [0.8, 1.4, 0.8],
              x: [0, star.driftX],
              y: [0, star.driftY],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Brand Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cosmic Nebula Back-Glow Behind Monogram */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#9933ff]/30 to-[#dbb8ff]/30 blur-[70px] -z-10"
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Monogram SVG Mark */}
        <motion.svg
          width="125"
          height="125"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            filter: [
              "drop-shadow(0 0 6px rgba(153, 51, 255, 0.4))",
              "drop-shadow(0 0 28px rgba(153, 51, 255, 0.85))",
              "drop-shadow(0 0 6px rgba(153, 51, 255, 0.4))",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer circle frame */}
          <circle cx="60" cy="60" r="50" stroke="#dbb8ff" strokeWidth="2" strokeOpacity="0.3" />
          
          {/* Inner futuristic geometric cross bars */}
          <path d="M60 20V100" stroke="#9933ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 60H100" stroke="#9933ff" strokeWidth="3" strokeLinecap="round" />
          
          {/* XTC core geometry */}
          <path
            d="M38 38L82 82"
            stroke="#dbb8ff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path
            d="M82 38L38 82"
            stroke="#dbb8ff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          
          {/* Central orb */}
          <circle cx="60" cy="60" r="8" fill="#9933ff" />
          <circle cx="60" cy="60" r="14" stroke="#dbb8ff" strokeWidth="1.5" strokeDasharray="3 3" />
        </motion.svg>

        <div className="flex flex-col items-center mt-4">
          {/* Brand Name Title */}
          <motion.h1
            className="text-display-xl font-display-xl tracking-widest text-on-surface uppercase text-center font-bold text-3xl md:text-4xl text-white"
            animate={{ letterSpacing: ["0.2em", "0.35em", "0.2em"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            XTC LIFESTYLE
          </motion.h1>

          {/* Tagline reveals stylishly after 1 second */}
          <motion.p
            className="font-label-sm text-label-sm text-primary uppercase text-xs tracking-[0.3em] mt-3 font-semibold text-center select-none text-[#dbb8ff]"
            initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 1.0,
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            SYNCHRONIZING VOID{dots}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
