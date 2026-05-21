"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, ArrowDown } from "lucide-react";
import PreLoader from "@/components/PreLoader";
import PageTransition from "@/components/PageTransition";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/lib/CartContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Check if preloader has already run in this session
    const hasLoaded = sessionStorage.getItem("xtc_loaded");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("xtc_loaded", "true");
    setLoading(false);
  };

  const products = [
    {
      id: "survival-deck-parava",
      name: "PARAVA Survival Deck",
      description: "6 ultra-thin translucent organic papers + tips. High level tactical EDC.",
      price: 15,
      category: "EDC / TACTICAL",
      badge: "Spec-Ops",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZHXTZfmMmjmWopt028oboz8FecJ1mRseRC9EZf-vVhPKoqK64B1ZpogEWlmZdOx2KQzjeaxcEwTd9EfNKs4t1JJa8QI4QZ4QTu9JT8U2-7SA482b37Njsr8EbKR5yT6slTCGUXg_jM1_q3Llyn-5-3eOOFf7afS1E8i9rHcu_5mfvT6qcatRuaT5YzJv1gc1Tn6k2Kjh6SzOAJ6fSPexQ-EaDMkmtfpMkJ5UyFdad-BaG5Nv21egNskixiBcye3iqRmMWsQGTDrUq",
    },
    {
      id: "basic-deck-xtc",
      name: "XTC Basic Deck",
      description: "33 ultra-premium artistic tip papers. The baseline core syndicate standard.",
      price: 120,
      category: "EDC / CORE",
      badge: "Essential",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2fnVlgyGg6AE274RaDlgdjFhczMo6eHwWHijL8YKrxYM1S5ugVTWP60ztQBZlNB73sRLEQLQEKSc33pdJmmpWS1_aZ1bbRmPRyVltVMwbB-zkaye00T5GU9z1EhqkeyFr9hZqS-5MZmcbPusi9suLsB4Osgvyv8oF4mHYrUtW77zVG4CBcXuivyPZxnKldCaNcW65EM3lzbXjImyS6mKk1mocDcUUf3Iag4xUVYGM5coOGkLM7uANEx6eQnqNxLMWSzbrt4u5WpsJ",
    },
  ];

  if (loading) {
    return <PreLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <PageTransition>
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow flex flex-col relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden">
          {/* Cosmic background with overlay */}
          <div className="absolute inset-0 z-0 select-none">
            <img
              alt="Cosmic background"
              className="w-full h-full object-cover opacity-35 mix-blend-screen"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAArQ1WA8MH62yX715Hn2JSvvr0uOyaY7k1Hu_q91aR21UilT38CtSfWcV4ZUiy00FTaeYeEvH0FSWk8_9_ObEmer0maUn5-t6UCMp5fn_BgNsikko6D2c7BeTe3Ln1os6eeDuqecVOO_57arxbAJ49BNCh_MFNxigBawkVZHWxK3RmheZ0rnSr7P3zalnlc9eBsOclpqxghg5HuIa5TMqNaoEyZPvJAmGANZXZbpm4xwRamhEX1dOv8lvUeJM_QJxP16WB3AQjk5RJ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Glowing Atmosphere Orb */}
          <div className="atmosphere-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
            <span className="font-label-sm text-[10px] text-primary uppercase tracking-[0.4em] mb-4 border border-primary/20 px-3 py-1 rounded-sm bg-primary/5">
              EST. 2024 • COGNITIVE SYNCHRONY
            </span>
            <h1 className="text-display-xl font-display-xl tracking-tighter text-on-surface uppercase mb-6 drop-shadow-[0_0_40px_rgba(153,51,255,0.45)] text-4xl sm:text-6xl md:text-8xl font-black">
              ENTER YOUR <br className="hidden sm:block" /> HIGHER STATE
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 text-sm md:text-lg">
              Beyond the physical. A synthesis of underground luxury and high-tech exploration for the culturally elevated.
            </p>
            <Link
              href="/shop"
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-DEFAULT font-label-sm uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_30px_rgba(153,51,255,0.6)] transition-all duration-300 border border-transparent text-xs"
            >
              Begin the Journey
            </Link>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-5 h-5 text-primary/50" />
          </div>
        </section>

        {/* Brand Philosophy Section */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop relative">
          <div className="atmosphere-orb w-[400px] h-[400px] top-0 right-0 opacity-50" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 flex flex-col gap-6">
              <h2 className="text-headline-lg font-headline-lg text-on-surface text-3xl md:text-5xl uppercase font-bold tracking-tight">
                THE SYNTHESIS OF <br /> FORM & VOID
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant text-sm md:text-base">
                We design artifacts for the modern operator. Each piece is meticulously crafted to bridge the gap between stark, brutalist utility and transcendent aesthetic experiences.
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant text-sm md:text-base">
                Our materials are sourced from the fringes of contemporary manufacturing, engineered to withstand both the urban sprawl and the cosmic expanse.
              </p>
              <Link
                href="/us"
                className="inline-flex items-center gap-2 text-primary text-label-sm font-label-sm uppercase tracking-widest hover:text-primary-fixed transition-colors group text-xs mt-4"
              >
                Explore Our Philosophy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 md:order-2 glass-panel p-2 rounded-xl relative overflow-hidden group">
              <img
                alt="Abstract architectural form"
                className="w-full h-[300px] sm:h-[450px] object-cover rounded-lg mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASJ0ONPKfZ-Qkpr4qgC148kiOd4tMJQOMS8OrYqu2nVJHU95lnv1uyLwu5U3KWGTdsHGHqIEV1I3aaxVu5KLOeHTuArDgLHoDd-n433kEz9D3YIBw-5kLQngZxSKxOVxySot9ozat6NlhYOhR3QRTjmrQDW645fUKu_NQcrqfMfIsuVg7egy2bwWeNPrHXzSqgRHQeef55FmJW5vNJ6wlEOHljZuYrKi4I_v3JzABRUY_MVZPuqbj05F0QUSgH_xw1Dp20K0McyEKX"
              />
            </div>
          </div>
        </section>

        {/* Featured Collection Section */}
        <section className="py-32 bg-surface-container-low/30 relative border-t border-primary/5">
          <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-end mb-16">
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-[10px] text-primary uppercase tracking-[0.3em]">
                  Syndicate Inventory
                </span>
                <h2 className="text-headline-lg font-headline-lg text-on-surface text-3xl md:text-5xl uppercase font-bold">
                  Featured Artifacts
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden md:inline-block text-label-sm font-label-sm text-on-surface-variant hover:text-primary uppercase tracking-widest border-b border-primary/30 pb-1 text-xs"
              >
                View Full Arsenal
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="glass-panel p-6 rounded-xl flex flex-col group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-DEFAULT text-[10px] font-label-sm uppercase tracking-widest border border-primary/10">
                      {product.badge}
                    </span>
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-full h-64 sm:h-80 bg-surface/50 rounded-lg mb-8 overflow-hidden relative">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      src={product.image}
                    />
                  </div>
                  <div className="mt-auto">
                    <div className="text-label-sm font-label-sm text-primary mb-2 text-xs">
                      {product.category}
                    </div>
                    <h3 className="text-headline-md font-headline-md text-on-surface mb-2 text-xl md:text-2xl">
                      {product.name}
                    </h3>
                    <p className="text-body-md text-sm text-on-surface-variant/80 mb-6 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-primary/5">
                      <span className="text-body-lg font-body-lg text-on-surface-variant text-base md:text-lg">
                        ₹{product.price}
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-label-sm uppercase tracking-wider px-4 py-2 hover:bg-primary/25 rounded-DEFAULT transition-all"
                        >
                          Acquire
                        </button>
                        <Link href={`/shop/${product.id}`} className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community / Loyalty Circle Teaser */}
        <section className="py-40 relative overflow-hidden border-y border-primary/5">
          <div className="absolute inset-0 z-0">
            <img
              alt="Community Void"
              className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnsnWoCE_YunKMnoBrWtibZtEelQ8UJdkySrLCad5bru3h9woklSbIoZGvULlIFBOWvD7kiKjb36dcvGz7DUOdElH5Fcp8I14XNMzDmfv4pxFwqeLr_BhCFrLsmdWaKpSSuSoJ2F8dm3FXzi871e9m7QAkVp48dr1G0FsdIH2poWiPx5Pl1ryTNIo-kJ9h92pZ6YHhZ-8ylESw-ygmwudTq2AyWfZ3kX3u4Oh02Ta8U9Bf4IBzRjatCwAxB0XBtFqaSAJ-OQdN3zIo"
            />
          </div>
          <div className="atmosphere-orb w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25" />
          <div className="relative z-10 max-w-4xl mx-auto text-center px-margin-mobile md:px-margin-desktop flex flex-col items-center">
            <div className="text-label-sm font-label-sm text-primary uppercase tracking-widest mb-6 text-xs">
              Insider Syndicate
            </div>
            <h2 className="text-display-xl font-display-xl text-on-surface text-4xl sm:text-6xl md:text-7xl mb-8 uppercase font-bold tracking-tighter">
              ACCESS THE VOID
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto text-sm md:text-base">
              Join an ascended network of operators. Secure early access to restricted drops, participate in covert events, and define the future timeline. The first 99 operators secure lifetime high-tier clearance.
            </p>
            <Link
              href="/x-society"
              className="glass-panel text-on-surface px-10 py-4 rounded-DEFAULT border border-on-surface/20 text-label-sm font-label-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 text-xs"
            >
              Request Authentication
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
