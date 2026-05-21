"use client";
import React, { useState } from "react";
import { getOptimizedImage } from "@/lib/cloudinary";

/**
 * High-performance BrandLogo Component
 * Loads from Cloudinary (public ID: "xtc_logo") with optimized properties,
 * and gracefully falls back to the customized geometric space-tech SVG when the asset is missing.
 */
export default function BrandLogo({ className = "w-8 h-8", style = {} }) {
  const [hasError, setHasError] = useState(false);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlhcdvoqo";

  // Optimized Cloudinary image URL
  const logoUrl = getOptimizedImage("xtc_logo", { width: 120, height: 120, quality: 95 });

  if (hasError || !cloudName) {
    // Beautiful space-tech fallback geometric SVG monogram
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} text-primary drop-shadow-[0_0_12px_rgba(153,51,255,0.6)]`}
        style={style}
      >
        {/* Outer space-tech hex/octagon structure */}
        <path
          d="M100 15 L175 58 L175 142 L100 185 L25 142 L25 58 Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeOpacity="0.8"
        />
        {/* Core intertwining geometric XTC lines */}
        <path
          d="M60 65 L140 135 M140 65 L60 135"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M100 45 L100 155"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="4 4"
          strokeOpacity="0.5"
        />
        {/* Center glowing micro-element */}
        <circle cx="100" cy="100" r="10" fill="currentColor" />
      </svg>
    );
  }

  return (
    <img
      src={logoUrl}
      alt="XTC Logo"
      className={`${className} object-contain transition-all duration-300 hover:scale-105`}
      style={{
        filter: "drop-shadow(0 0 8px rgba(153, 51, 255, 0.45))",
        ...style
      }}
      onError={() => setHasError(true)}
    />
  );
}
