"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { ShoppingBag, User } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function TopNavBar() {
  const pathname = usePathname();
  const { setIsCartOpen, cartCount } = useCart();

  const links = [
    { name: "Shop", href: "/shop" },
    { name: "Journal", href: "/journal" },
    { name: "Community", href: "/x-society" },
    { name: "Us", href: "/us" },
  ];

  return (
    <nav className="bg-surface/60 backdrop-blur-xl fixed top-0 left-0 right-0 w-full z-50 border-b border-primary/10 shadow-[0_0_20px_rgba(153,51,255,0.06)] h-20 transition-all duration-300">
      <div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full">
        {/* Monogram Brand Mark */}
        <Link
          href="/"
          className="text-headline-md font-headline-md tracking-tighter text-on-surface uppercase hover:text-primary transition-colors cursor-pointer flex items-center gap-3 select-none"
        >
          <BrandLogo className="w-8 h-8" />
          <span className="font-display-xl font-bold tracking-widest text-xs sm:text-sm uppercase block pt-0.5 whitespace-nowrap">
            XTC LIFESTYLE
          </span>
        </Link>

        {/* Desktop Nav Actions */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-label-sm font-label-sm uppercase text-xs tracking-wider transition-all duration-300 relative py-1 hover:text-primary ${
                  isActive ? "text-primary font-bold border-b-2 border-primary pb-0.5" : "text-on-surface-variant font-medium"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Dynamic Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 text-primary hover:bg-primary/10 transition-all duration-300 rounded-full active:scale-95 relative"
            aria-label="Toggle Cargo Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary-container text-on-primary-container text-[9px] font-label-sm rounded-full flex items-center justify-center border border-black animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/x-society"
            className="p-2.5 text-primary hover:bg-primary/10 transition-all duration-300 rounded-full active:scale-95"
            aria-label="Operator Console Login"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
