"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { Clock, User, ArrowRight, BookOpen, Music, Shield, Play, Pause, Disc } from "lucide-react";

export default function Journal() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [playingId, setPlayingId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);

  useEffect(() => {
    return () => {
      stopCalibration();
    };
  }, []);

  const stopCalibration = () => {
    setPlayingId(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    synthNodesRef.current.forEach((n) => {
      try {
        n.stop();
      } catch (e) {}
    });
    synthNodesRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const startCalibration = (id) => {
    stopCalibration();
    setPlayingId(id);
    setTimeLeft(30);

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    let secondsElapsed = 0;
    
    // Web Audio Synthesizer Sequencer step loops
    let step = 0;
    const playSynthStep = () => {
      if (!ctx || ctx.state === "suspended") {
        ctx.resume();
      }
      const time = ctx.currentTime;

      // Local Synthesizer Oscillators
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (id === "soundscapes-of-the-void") {
        osc.type = "sine";
        // Deep progressive bass sequence on C minor scale (C1, Eb1, G1)
        const chord = [32.70, 38.89, 48.99][step % 3]; 
        osc.frequency.setValueAtTime(chord, time);
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);
        osc.start(time);
        osc.stop(time + 0.85);
        synthNodesRef.current.push(osc);
      } else if (id === "synthetic-sublime") {
        osc.type = "triangle";
        // Atmospheric higher frequency drone note sweeps
        const scale = [220.00, 293.66, 329.63][step % 3]; // A3, D4, E4
        osc.frequency.setValueAtTime(scale, time);
        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        osc.start(time);
        osc.stop(time + 0.6);
        synthNodesRef.current.push(osc);
      }

      step++;
    };

    playSynthStep();
    const loopInterval = setInterval(playSynthStep, 600);

    timerRef.current = setInterval(() => {
      secondsElapsed += 1;
      const remaining = 30 - secondsElapsed;
      if (remaining <= 0) {
        clearInterval(loopInterval);
        stopCalibration();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
  };

  const tabs = ["All", "Behind the Scenes", "Sound Design", "Philosophy"];

  const articles = [
    {
      id: "crafting-parava-deck",
      title: "Crafting the Parava Deck",
      excerpt: "An exploration of the material science, slow-burn organic hemp fibers, and sacred brutalist geometry that defines our flagship EDC tactical artifact.",
      category: "Behind the Scenes",
      readTime: "12 MIN READ",
      author: "ARCHITECT_01",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3vyuYQp0v58j88fxPYjZDermCpIMbLVzkN8PjWLgdqc2fV1g4p21dpM-aYy2wRfVOOmVjC8ruv7sM2OhzYQYG-h-02E-hoNFy-PkBHLnq_Z19APc5daiyyFPby6-hULnRA99pmYvkmxFCsFMyXUz4yRdSfHu7WtxAy6WzVuTcLOyA0wrhGNXaNr7BhKs2bHtpbdes_ArPrFEQF0KOr1Z-8MdFRA_R5LZ0X2PFj5BITrboVcAcNP_IQzm_Dh3VyUeEz4N8wi0ZF_ce",
      icon: <BookOpen className="w-4 h-4 text-primary" />,
    },
    {
      id: "soundscapes-of-the-void",
      title: "Soundscapes of the Void",
      excerpt: "How we calibrated deep sub-club techno and dark progressive frequencies to optimize cognitive alignment inside the syndicate's immersion chambers.",
      category: "Sound Design",
      readTime: "8 MIN READ",
      author: "SOUND_OP_09",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASJ0ONPKfZ-Qkpr4qgC148kiOd4tMJQOMS8OrYqu2nVJHU95lnv1uyLwu5U3KWGTdsHGHqIEV1I3aaxVu5KLOeHTuArDgLHoDd-n433kEz9D3YIBw-5kLQngZxSKxOVxySot9ozat6NlhYOhR3QRTjmrQDW645fUKu_NQcrqfMfIsuVg7egy2bwWeNPrHXzSqgRHQeef55FmJW5vNJ6wlEOHljZuYrKi4I_v3JzABRUY_MVZPuqbj05F0QUSgH_xw1Dp20K0McyEKX",
      icon: <Music className="w-4 h-4 text-primary" />,
    },
    {
      id: "synthetic-sublime",
      title: "The Synthetic Sublime",
      excerpt: "Living at the crossroads of intense underground nightlife and complete physical mindfulness. Defining the true mandate of the XTC Monogram.",
      category: "Philosophy",
      readTime: "15 MIN READ",
      author: "DIRECTOR_X",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnsnWoCE_YunKMnoBrWtibZtEelQ8UJdkySrLCad5bru3h9woklSbIoZGvULlIFBOWvD7kiKjb36dcvGz7DUOdElH5Fcp8I14XNMzDmfv4pxFwqeLr_BhCFrLsmdWaKpSSuSoJ2F8dm3FXzi871e9m7QAkVp48dr1G0FsdIH2poWiPx5Pl1ryTNIo-kJ9h92pZ6YHhZ-8ylESw-ygmwudTq2AyWfZ3kX3u4Oh02Ta8U9Bf4IBzRjatCwAxB0XBtFqaSAJ-OQdN3zIo",
      icon: <Shield className="w-4 h-4 text-primary" />,
    },
  ];

  const filteredArticles =
    selectedTab === "All"
      ? articles
      : articles.filter((art) => art.category === selectedTab);

  return (
    <PageTransition>
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full flex flex-col gap-16 relative min-h-screen">
        {/* Glow decoration backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Hero Section */}
        <header className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
          <span className="font-label-sm text-xs text-primary uppercase tracking-[0.3em] block">
            HIGHER STATE JOURNAL
          </span>
          <h1 className="font-display-xl text-3xl sm:text-5xl md:text-7xl text-on-surface uppercase font-black tracking-tight leading-[1.05]">
            The Void Log
          </h1>
          <p className="font-body-lg text-on-surface-variant text-sm md:text-base opacity-95">
            Exclusive transmissions from the syndicate. Insights, production iterations, and the philosophy behind our cognitive constructs.
          </p>
        </header>

        {/* Category Tabs Selector */}
        <div className="flex flex-wrap justify-center gap-3 border-b border-primary/10 pb-6 w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`font-label-sm text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 rounded-DEFAULT transition-all border ${
                selectedTab === tab
                  ? "bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(153,51,255,0.4)]"
                  : "border-primary/20 hover:border-primary text-on-surface-variant bg-surface/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Log Grid */}
        <section className="w-full">
          {filteredArticles.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-xl font-body-md text-on-surface-variant">
              No entries logged in this specific category yet. Transmission pending.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Featured Article - Grid left (8 cols) */}
              {filteredArticles.find((art) => art.id === "crafting-parava-deck") && (
                <article className="lg:col-span-8 glass-panel rounded-xl overflow-hidden group cursor-pointer relative hover:border-primary/30 transition-all duration-500 flex flex-col h-full">
                  <div className="h-64 sm:h-[420px] w-full bg-surface-container-high relative overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vyuYQp0v58j88fxPYjZDermCpIMbLVzkN8PjWLgdqc2fV1g4p21dpM-aYy2wRfVOOmVjC8ruv7sM2OhzYQYG-h-02E-hoNFy-PkBHLnq_Z19APc5daiyyFPby6-hULnRA99pmYvkmxFCsFMyXUz4yRdSfHu7WtxAy6WzVuTcLOyA0wrhGNXaNr7BhKs2bHtpbdes_ArPrFEQF0KOr1Z-8MdFRA_R5LZ0X2PFj5BITrboVcAcNP_IQzm_Dh3VyUeEz4N8wi0ZF_ce"
                      alt="Crafting the Parava Deck"
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-primary/20 text-primary font-label-sm text-[10px] px-3 py-1 rounded border border-primary/25 backdrop-blur-md uppercase tracking-wider">
                        BEHIND THE SCENES
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col gap-4 mt-auto">
                    <h2 className="font-headline-lg text-xl sm:text-3xl uppercase font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      Crafting the Parava Deck
                    </h2>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed line-clamp-2 max-w-2xl">
                      An exploration of the material science, organic unbleached hemp fibers, and sacred brutalist geometry that defines our flagship EDC tactical artifact.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 font-label-sm text-[10px] text-on-surface-variant opacity-75 border-t border-primary/5 pt-4 mt-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> 12 MIN READ
                      </span>
                      <span>// ARCHITECT_01</span>
                    </div>
                  </div>
                </article>
              )}

              {/* Secondary Articles - Grid right (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-8 h-full justify-between">
                {filteredArticles
                  .filter((art) => art.id !== "crafting-parava-deck")
                  .map((art) => (
                    <article
                      key={art.id}
                      className="glass-panel rounded-xl p-6 flex flex-col group hover:border-primary/30 transition-all duration-500 cursor-pointer relative overflow-hidden flex-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest">
                          {art.category}
                        </span>
                        <div className="p-2 bg-primary/10 rounded-DEFAULT border border-primary/20">
                          {art.icon}
                        </div>
                      </div>
                      <h3 className="font-headline-md text-lg uppercase font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                        {art.title}
                      </h3>
                      <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                        {art.excerpt}
                      </p>

                      {/* Synthesizer Preview Controller for Soundscape / Philosophy articles */}
                      {(art.id === "soundscapes-of-the-void" || art.id === "synthetic-sublime") && (
                        <div className="mb-6 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (playingId === art.id) {
                                stopCalibration();
                              } else {
                                startCalibration(art.id);
                              }
                            }}
                            className={`w-full flex items-center justify-center gap-2 font-label-sm text-[9px] sm:text-[10px] uppercase tracking-wider py-2 px-3 rounded border transition-all ${
                              playingId === art.id
                                ? "bg-primary text-on-primary border-primary shadow-[0_0_12px_rgba(153,51,255,0.45)]"
                                : "bg-primary/10 border-primary/20 hover:border-primary/50 text-primary"
                            }`}
                          >
                            {playingId === art.id ? (
                              <>
                                <Pause className="w-3 h-3 animate-pulse" />
                                HALT_CALIBRATION ({timeLeft}s)
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3" />
                                CALIBRATE_SOUNDSCAPE
                              </>
                            )}
                          </button>
                          
                          {/* CSS animated micro visualizer */}
                          {playingId === art.id && (
                            <div className="flex items-center justify-center gap-1 mt-3 h-3">
                              <span className="w-0.5 bg-primary rounded animate-pulse" style={{ height: '8px' }} />
                              <span className="w-0.5 bg-primary rounded animate-pulse" style={{ height: '12px', animationDelay: '0.1s' }} />
                              <span className="w-0.5 bg-primary rounded animate-pulse" style={{ height: '6px', animationDelay: '0.2s' }} />
                              <span className="w-0.5 bg-primary rounded animate-pulse" style={{ height: '10px', animationDelay: '0.3s' }} />
                              <span className="w-0.5 bg-primary rounded animate-pulse" style={{ height: '4px', animationDelay: '0.15s' }} />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between border-t border-primary/10 pt-4">
                        <span className="font-label-sm text-[10px] text-on-surface-variant opacity-75">
                          {art.readTime}
                        </span>
                        <span className="text-primary group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
