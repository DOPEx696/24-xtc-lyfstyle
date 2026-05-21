"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Send, Check } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-primary/5 py-16 relative w-full overflow-hidden mt-auto">
      {/* Glow aura background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* About Section */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-6 h-6" />
            <span className="font-display-xl text-lg font-bold tracking-widest text-on-surface uppercase select-none">
              XTC LIFESTYLE
            </span>
          </div>
          <p className="font-body-md text-sm text-on-surface-variant max-w-sm">
            Enjoy deeply. Move consciously. Synthesizing underground aesthetics, curated club music culture, and elevated visual artifacts.
          </p>
          <span className="font-label-sm text-[11px] text-on-surface-variant/40 uppercase tracking-widest mt-2 block">
            © 2026 XTC LIFESTYLE. BEYOND THE VOID.
          </span>
        </div>

        {/* Directory links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] font-bold">
            Sector Channels
          </h4>
          <div className="flex flex-col gap-3">
            <Link href="/shop" className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">
              Artifact Catalog
            </Link>
            <Link href="/journal" className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">
              Culture Journal
            </Link>
            <Link href="/x-society" className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">
              Loyalty Circles
            </Link>
            <Link href="/us" className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">
              Core Philosophy
            </Link>
          </div>
        </div>

        {/* Newsletter Uplink */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] font-bold">
            VOID TRANSMISSIONS
          </h4>
          <p className="font-body-md text-xs text-on-surface-variant">
            Uplink your electronic mailing terminal to receive covert drop announcements, nightlife updates, and private circle logs.
          </p>
          <form onSubmit={handleSubscribe} className="flex border border-primary/20 rounded-DEFAULT overflow-hidden bg-surface-container mt-2">
            <input
              type="email"
              required
              placeholder="operator@void.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-xs p-3 focus:outline-none flex-grow placeholder:text-on-surface-variant/40"
            />
            <button
              type="submit"
              className="bg-primary/10 hover:bg-primary/20 text-primary border-l border-primary/20 px-4 transition-all duration-300 active:scale-95 flex items-center justify-center shrink-0"
              aria-label="Subscribe"
            >
              {subscribed ? <Check className="w-4 h-4 text-primary" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
