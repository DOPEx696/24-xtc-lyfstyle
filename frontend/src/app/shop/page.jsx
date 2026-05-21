"use client";
import React, { useState } from "react";
import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/lib/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Shop() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Papers", "Apparel", "Objects"];

  const products = [
    {
      id: "survival-deck-parava",
      name: "PARAVA Survival Deck",
      description: "6 organic ultra-thin rolling papers + filters. Created for extreme environments and tactical elegance.",
      price: 15,
      category: "Papers",
      subCategory: "PAPER / ESSENTIALS",
      badge: "New Arrival",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2Gu_werUnDWesqpJhC63l-NQY3Vo7xjUm2evBgZkWixwUWut6VYbN95Dn7OzMGIbagHDS0K9rkrR4fPdRs1ctP95ZJmsZEgFzr5IQFVDmo9Cd9llmzHFqBdKLOkHq3H613j_kO1tOFZYmKqksCLbivgz-cp2dodbJ0_S4iNEu3YgBdAWfo3PgMpp2hQj0EZthsA87X4ogzJFX6wTf5d1wG6r6byUncQOfMkPSslF0i1dq8ZlU-s4X2saNLat3PuAaIP5JukrlINwN",
    },
    {
      id: "basic-deck-xtc",
      name: "XTC Basic Deck",
      description: "33 premium natural papers with artistic tips. The baseline everyday standard for the cognitive operator.",
      price: 120,
      category: "Papers",
      subCategory: "COLLECTIBLE",
      badge: "Essential",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7_e4mP77bbyQkjaVICRu6mULiUG-T0XR5KGiQwj3yu0tJS6v3aUCon_D2cBfN3ANuxzoxDynBSkDtXtylJPV3x_PWoNqWsEABrhKkijc5z1oF3DfP_QPUTG0_a75ic5RmL2Vhgx3gNaF4ZNEbvgjRadejXXp2UYEldcsTTC1wlRVbt7tN8_BGR11o6sFKscuT4TJw7dHxKDdF9lwcJJK3clcWqm6p59y_EtpLdkz4gyLSUfIRLJOz5WdcE2Gus_PGO3zS_6NivypL",
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <PageTransition>
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow flex flex-col pt-32 px-margin-mobile md:px-margin-desktop gap-gutter max-w-7xl mx-auto w-full relative min-h-screen">
        {/* Glow decoration */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-container rounded-full opacity-10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-inverse-primary rounded-full opacity-5 blur-[150px] pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row gap-12 w-full">
          {/* Aside Sidebar */}
          <aside className="w-full lg:w-60 shrink-0">
            <div className="sticky top-32 glass-panel p-6 rounded-xl flex flex-col gap-6">
              <h3 className="font-label-sm text-xs text-primary border-b border-primary/10 pb-4 uppercase tracking-widest">
                Artifact Category
              </h3>
              <ul className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-3 w-full text-left font-body-md text-sm transition-colors py-1 hover:text-primary ${
                        selectedCategory === cat ? "text-primary font-bold" : "text-on-surface-variant"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? "bg-primary" : "bg-transparent"}`} />
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product canvas catalog */}
          <section className="flex-1 pb-32">
            <header className="mb-12 flex flex-col gap-3">
              <h1 className="font-display-xl text-3xl sm:text-5xl md:text-7xl text-on-surface uppercase font-black tracking-tight leading-[1.05]">
                LIFESTYLE <br />
                <span className="text-primary/80">ARTIFACTS</span>
              </h1>
              <p className="font-body-lg text-on-surface-variant text-sm md:text-base max-w-xl">
                Curated tactical utilities for the ascended mind. Sourced from organic materials, designed to absolute space-tech and brutalist standard.
              </p>
            </header>

            {filteredProducts.length === 0 ? (
              <div className="glass-panel p-16 text-center rounded-xl font-body-md text-on-surface-variant">
                No items detected in this filter coordinate. Check back soon.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Product 1: Featured PARAVA */}
                {filteredProducts.find((p) => p.id === "survival-deck-parava") && (
                  <div className="md:col-span-8 glass-panel rounded-xl overflow-hidden group transition-all duration-500 flex flex-col cursor-pointer">
                    <Link href="/shop/survival-deck-parava">
                      <div className="relative h-[300px] sm:h-[480px] w-full overflow-hidden bg-surface-container">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Gu_werUnDWesqpJhC63l-NQY3Vo7xjUm2evBgZkWixwUWut6VYbN95Dn7OzMGIbagHDS0K9rkrR4fPdRs1ctP95ZJmsZEgFzr5IQFVDmo9Cd9llmzHFqBdKLOkHq3H613j_kO1tOFZYmKqksCLbivgz-cp2dodbJ0_S4iNEu3YgBdAWfo3PgMpp2hQj0EZthsA87X4ogzJFX6wTf5d1wG6r6byUncQOfMkPSslF0i1dq8ZlU-s4X2saNLat3PuAaIP5JukrlINwN"
                          alt="PARAVA Survival Deck"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 mix-blend-luminosity"
                        />
                        <div className="absolute top-6 left-6 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-[2px] font-label-sm text-[10px] text-primary uppercase tracking-widest">
                          New Arrival
                        </div>
                      </div>
                    </Link>
                    <div className="p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-gradient-to-t from-surface-container-lowest to-transparent border-t border-primary/5">
                      <div>
                        <div className="font-label-sm text-xs text-on-surface-variant mb-1">
                          PAPER / ESSENTIALS
                        </div>
                        <Link href="/shop/survival-deck-parava">
                          <h2 className="font-headline-lg text-2xl uppercase font-bold text-on-surface hover:text-primary transition-colors">
                            PARAVA Survival Deck
                          </h2>
                        </Link>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 shrink-0">
                        <span className="font-headline-md text-xl text-primary font-bold">
                          ₹15
                        </span>
                        <button
                          onClick={() => addToCart(products[0], 1)}
                          className="bg-primary text-on-primary font-label-sm text-[10px] px-6 py-3 hover:brightness-110 shadow-[0_0_15px_rgba(153,51,255,0.4)] transition-all flex items-center gap-2 uppercase tracking-widest"
                        >
                          Acquire <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product 2: XTC Basic Deck */}
                {filteredProducts.find((p) => p.id === "basic-deck-xtc") && (
                  <div className="md:col-span-4 glass-panel rounded-xl overflow-hidden group transition-all duration-500 flex flex-col cursor-pointer mt-0 md:mt-24">
                    <Link href="/shop/basic-deck-xtc">
                      <div className="relative h-[250px] sm:h-[380px] w-full overflow-hidden bg-surface-container">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7_e4mP77bbyQkjaVICRu6mULiUG-T0XR5KGiQwj3yu0tJS6v3aUCon_D2cBfN3ANuxzoxDynBSkDtXtylJPV3x_PWoNqWsEABrhKkijc5z1oF3DfP_QPUTG0_a75ic5RmL2Vhgx3gNaF4ZNEbvgjRadejXXp2UYEldcsTTC1wlRVbt7tN8_BGR11o6sFKscuT4TJw7dHxKDdF9lwcJJK3clcWqm6p59y_EtpLdkz4gyLSUfIRLJOz5WdcE2Gus_PGO3zS_6NivypL"
                          alt="XTC Basic Deck"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 mix-blend-luminosity"
                        />
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col justify-between flex-1 bg-surface-container-lowest/50 border-t border-primary/5">
                      <div className="mb-6">
                        <div className="font-label-sm text-xs text-on-surface-variant mb-1">
                          COLLECTIBLE
                        </div>
                        <Link href="/shop/basic-deck-xtc">
                          <h2 className="font-headline-md text-lg uppercase font-bold text-on-surface hover:text-primary transition-colors">
                            XTC Basic Deck
                          </h2>
                        </Link>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-body-lg text-primary text-base font-bold">
                          ₹120
                        </span>
                        <button
                          onClick={() => addToCart(products[1], 1)}
                          className="border border-outline text-on-surface hover:text-primary hover:border-primary p-3 rounded-DEFAULT transition-all"
                          aria-label="Add XTC Basic Deck to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
}
