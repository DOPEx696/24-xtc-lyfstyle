"use client";
import React from "react";
import { motion } from "framer-motion";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { ArrowDown, HelpCircle, Eye, ShieldCheck, Zap } from "lucide-react";

export default function AboutUs() {
  const sections = [
    {
      id: "conscious-enjoyment",
      tag: "CORE 01",
      title: "Mindful Enjoyment",
      text: "XTC Lifestyle bridges the gap between raw exploration and acute mindfulness. We believe in living deeply, seeking profound experiences in underground arts, nightlife, and design, while maintaining complete self-awareness, personal responsibility, and respect.",
      icon: <Eye className="w-8 h-8 text-primary" />,
    },
    {
      id: "underground-aesthetics",
      tag: "CORE 02",
      title: "Design As A Catalyst",
      text: "Our artifacts are engineered at the intersection of stark industrial brutalism and space-age minimalism. Every contour, font weight, and spacing interval is structured to evoke a sense of high-fidelity precision, challenging standard mass-market consumer grids.",
      icon: <Zap className="w-8 h-8 text-primary" />,
    },
    {
      id: "the-syndicate",
      tag: "CORE 03",
      title: "Elevated Circles",
      text: "X-SOCIETY is a community of operators striving for cognitive excellence. Beyond physical drops, we unify underground music listeners (techno, dark progressive, psytrance), artists, and fashion advocates who respect their bodies, minds, and community grids.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <PageTransition>
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow flex flex-col pt-32 relative overflow-hidden">
        {/* Glow backdrop decor */}
        <div className="atmosphere-orb w-[600px] h-[600px] -top-20 left-0 opacity-40" />
        <div className="atmosphere-orb w-[500px] h-[500px] bottom-40 right-0 opacity-30" />

        {/* Hero philosophical statement */}
        <section className="px-margin-mobile md:px-margin-desktop py-20 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          <motion.span
            className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR MANIFESTO
          </motion.span>
          <motion.h1
            className="font-display-xl text-3xl sm:text-5xl md:text-7xl uppercase font-black text-on-surface mb-8 leading-[1.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ENJOY DEEPLY.<br />MOVE CONSCIOUSLY.
          </motion.h1>
          <motion.p
            className="font-body-lg text-on-surface-variant max-w-2xl text-sm sm:text-base md:text-lg mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            We operate in the middle ground of modern youth culture. We chase intense experiences and appreciate raw aesthetic grit, but stay self-aware, emotionally intelligent, and deeply connected.
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="border border-primary/20 rounded-full p-2.5 bg-primary/5 cursor-pointer"
          >
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </section>

        {/* Core Pillars */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 max-w-7xl mx-auto w-full flex flex-col gap-24">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="font-label-sm text-xs text-primary uppercase tracking-widest">
              Protocol Mandates
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl md:text-5xl uppercase font-bold text-on-surface">
              Core Principles of XTC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((sect, idx) => (
              <motion.div
                key={sect.id}
                className="glass-panel p-panel-padding rounded-xl flex flex-col gap-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="absolute top-0 right-0 p-6 text-on-surface-variant/10 font-display-xl font-black text-6xl select-none">
                  {idx + 1}
                </div>
                <div className="p-3 w-fit rounded-lg bg-primary/10 border border-primary/20">
                  {sect.icon}
                </div>
                <div>
                  <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider block mb-1">
                    {sect.tag}
                  </span>
                  <h3 className="font-headline-md text-xl uppercase font-bold text-on-surface mb-4">
                    {sect.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {sect.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tactical philosophy detail */}
        <section className="px-margin-mobile md:px-margin-desktop py-32 bg-surface-container-lowest relative border-t border-primary/5 w-full">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="glass-panel p-2 rounded-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASJ0ONPKfZ-Qkpr4qgC148kiOd4tMJQOMS8OrYqu2nVJHU95lnv1uyLwu5U3KWGTdsHGHqIEV1I3aaxVu5KLOeHTuArDgLHoDd-n433kEz9D3YIBw-5kLQngZxSKxOVxySot9ozat6NlhYOhR3QRTjmrQDW645fUKu_NQcrqfMfIsuVg7egy2bwWeNPrHXzSqgRHQeef55FmJW5vNJ6wlEOHljZuYrKi4I_v3JzABRUY_MVZPuqbj05F0QUSgH_xw1Dp20K0McyEKX"
                alt="Conscious design"
                className="w-full h-80 object-cover rounded-lg mix-blend-luminosity opacity-80"
              />
            </div>
            <div className="flex flex-col gap-6">
              <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em]">
                Synthesizing Club Culture & Mind
              </span>
              <h3 className="font-headline-lg text-2xl md:text-4xl uppercase font-bold text-on-surface">
                Enjoy Deeply, Care Consciously
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                We organize private musical circles, create high-spec accessories, and publish writing on deep techno rhythms, fashion subcultures, and mindful health. We reject the standard corporate push toward excessive consumption and cheap thrills. 
              </p>
              <p className="font-body-md text-sm text-on-surface-variant">
                Everything bearing the XTC Monogram stands as an invitation to move at your own frequency. Breathe in the sound, admire the stark geometry, and live life aligned to your higher potential.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
