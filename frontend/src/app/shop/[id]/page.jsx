"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/lib/CartContext";
import { ShoppingBag, ArrowLeft, Heart, Check, Flame, Package, Sparkles } from "lucide-react";

export default function ProductDetailPage({ params: paramsPromise }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (paramsPromise && typeof paramsPromise.then === "function") {
      paramsPromise.then((res) => setProductId(res.id));
    } else if (paramsPromise) {
      setProductId(paramsPromise.id);
    }
  }, [paramsPromise]);

  const productDatabase = {
    "survival-deck-parava": {
      id: "survival-deck-parava",
      name: "PARAVA Survival Deck",
      price: 15,
      category: "Papers",
      subCategory: "PAPER / ESSENTIALS",
      badge: "In Stock / Ready for Transit",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2Gu_werUnDWesqpJhC63l-NQY3Vo7xjUm2evBgZkWixwUWut6VYbN95Dn7OzMGIbagHDS0K9rkrR4fPdRs1ctP95ZJmsZEgFzr5IQFVDmo9Cd9llmzHFqBdKLOkHq3H613j_kO1tOFZYmKqksCLbivgz-cp2dodbJ0_S4iNEu3YgBdAWfo3PgMpp2hQj0EZthsA87X4ogzJFX6wTf5d1wG6r6byUncQOfMkPSslF0i1dq8ZlU-s4X2saNLat3PuAaIP5JukrlINwN",
      description: "6 organic ultra-thin rolling papers + filters. Created for extreme environments and tactical elegance.",
      specs: [
        { label: "Material", val: "Ultra-thin, slow-burning organic unbleached hemp", icon: <Flame className="w-4 h-4" /> },
        { label: "Quantity", val: "6 papers + 6 premium organic filters", icon: <Package className="w-4 h-4" /> },
        { label: "Packaging", val: "Weatherproof tactical outer card sleeve", icon: <Sparkles className="w-4 h-4" /> },
      ],
      story: "Refined in Bangalore, engineered for the wilderness. The Parava Survival Deck is a high-spec tactical artifact designed to operate at maximum efficiency under any environmental grid parameters.",
    },
    "basic-deck-xtc": {
      id: "basic-deck-xtc",
      name: "XTC Basic Deck",
      price: 120,
      category: "Papers",
      subCategory: "COLLECTIBLE",
      badge: "In Stock / Ready for Transit",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7_e4mP77bbyQkjaVICRu6mULiUG-T0XR5KGiQwj3yu0tJS6v3aUCon_D2cBfN3ANuxzoxDynBSkDtXtylJPV3x_PWoNqWsEABrhKkijc5z1oF3DfP_QPUTG0_a75ic5RmL2Vhgx3gNaF4ZNEbvgjRadejXXp2UYEldcsTTC1wlRVbt7tN8_BGR11o6sFKscuT4TJw7dHxKDdF9lwcJJK3clcWqm6p59y_EtpLdkz4gyLSUfIRLJOz5WdcE2Gus_PGO3zS_6NivypL",
      description: "33 rolling papers + artistic tip. A conscious lifestyle artifact engineered for an elevated experience. Precision-crafted for those who seek the void.",
      specs: [
        { label: "Material", val: "Ultra-thin slow-burning unbleached plant fibers", icon: <Flame className="w-4 h-4" /> },
        { label: "Quantity", val: "33 papers + 33 curated designer filter tips", icon: <Package className="w-4 h-4" /> },
        { label: "Closure", val: "Premium geometric card box with magnetic seal closure", icon: <Sparkles className="w-4 h-4" /> },
      ],
      story: "Every element of the Basic Deck is designed to resonate with higher frequencies. It is not merely a utility, but an artifact of transition. Crafted in the shadows, refined for the void, it invites you to pause, calibrate, and ascend.",
    },
  };

  const product = productId ? productDatabase[productId] : null;

  if (!productId) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center font-label-sm text-xs uppercase tracking-widest">
        Syncing Sector Data...
      </div>
    );
  }

  if (!product) {
    return (
      <PageTransition>
        <TopNavBar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-6">
          <h2 className="font-headline-lg text-2xl uppercase text-error">Artifact Missing</h2>
          <p className="font-body-md text-on-surface-variant max-w-sm">
            We cannot identify this product coordinate in the central repository database files.
          </p>
          <Link href="/shop" className="text-primary hover:underline font-label-sm uppercase tracking-widest text-xs">
            Return to shop sector
          </Link>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow pt-20 relative">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] glow-bg opacity-45 pointer-events-none -z-10 blur-[100px]" />

        {/* Hero Section Split Layout */}
        <section className="min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row relative z-10 max-w-7xl mx-auto items-center">
          {/* Left: Product Images */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
            <Link
              href="/shop"
              className="self-start mb-6 inline-flex items-center gap-2 font-label-sm text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Catalog
            </Link>
            <div className="relative w-full max-w-md aspect-square glass-panel rounded-xl flex items-center justify-center group overflow-hidden border border-primary/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-4/5 h-4/5 object-cover transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_0_30px_rgba(153,51,255,0.35)] mix-blend-luminosity rounded-lg"
              />
            </div>
          </div>

          {/* Right: Specs & Cart controls */}
          <div className="w-full lg:w-1/2 p-8 flex items-center">
            <div className="max-w-xl w-full flex flex-col gap-5">
              <div className="self-start glass-panel px-3 py-1 rounded-sm border border-primary/20 bg-primary/5 text-primary text-[10px] font-label-sm uppercase tracking-wider">
                {product.badge}
              </div>

              <h1 className="font-display-xl text-3xl sm:text-5xl uppercase font-black tracking-tight text-on-surface leading-none">
                {product.name}
              </h1>

              <p className="font-headline-md text-xl text-primary font-bold">
                ₹{product.price}
              </p>

              <p className="font-body-md text-on-surface-variant leading-relaxed opacity-90 text-sm">
                {product.description}
              </p>

              {/* Specifications List */}
              <ul className="flex flex-col gap-4 border-l border-primary/20 pl-4 py-2 mt-2">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-on-surface-variant">
                    <span className="p-1 rounded bg-primary/10 text-primary shrink-0">
                      {spec.icon}
                    </span>
                    <div>
                      <span className="font-label-sm uppercase text-on-surface text-[10px] tracking-wider block">
                        {spec.label}
                      </span>
                      <span className="font-body-md opacity-90">{spec.val}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Actions & Quantity selectors */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <div className="flex items-center justify-between border border-primary/20 rounded-DEFAULT bg-surface/30 px-3 py-2 shrink-0 sm:w-32">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 hover:text-primary transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="font-label-sm text-sm px-4 min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 hover:text-primary transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="bg-primary-container text-on-primary-container px-8 py-4 rounded-DEFAULT font-label-sm text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_rgba(153,51,255,0.4)] flex-grow flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Initiate Acquisition
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`glass-panel p-4 rounded-DEFAULT border text-label-sm font-label-sm transition-all duration-300 flex items-center justify-center shrink-0 ${
                    isSaved ? "text-primary border-primary bg-primary/10" : "text-on-surface-variant border-primary/20"
                  }`}
                  aria-label="Save to Archive"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? "fill-primary" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Parallax Detail */}
        <section className="relative min-h-[500px] flex items-center justify-center py-20 px-8 overflow-hidden border-t border-primary/10">
          <div
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSlP0wkn7BMd2jds2iCm3DbQq7xta9Znj1tCXOnLbHqZScmDsNiJQ7tIGLh_XMTq-AZ4fyftt2P_yyHlq3_fyh867XFhUK7FQB_Nd6KDjOPhDHsCQJrbiYzVIg8xgXHNcuOeX3nS_OLqwqChAcCLIvt7CelXdlHf1gNO6oBM5fHE6AxljuEhPtYDTHY5xayCuywsIxj4au3O5zWk3R7H7It9rNY8fNtEUNqoA-OLnWS6w28rLkGG9z_cWmMD9NeC6xwpOzrd4vRY_V')",
            }}
          />
          <div className="relative z-10 glass-panel p-8 md:p-16 max-w-3xl rounded-xl text-center flex flex-col items-center border border-primary/5">
            <span className="p-3 bg-primary/10 rounded-full text-primary border border-primary/20 mb-6">
              <Check className="w-5 h-5" />
            </span>
            <h2 className="font-headline-lg text-2xl uppercase tracking-wider text-on-surface mb-6">
              Channel the Energy
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
              {product.story}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
