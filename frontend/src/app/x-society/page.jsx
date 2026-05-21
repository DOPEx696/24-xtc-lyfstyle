"use client";
import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { Shield, Eye, Zap, Star, ShieldAlert, Cpu, CheckCircle } from "lucide-react";

export default function XSociety() {
  const [operatorName, setOperatorName] = useState("");
  const [email, setEmail] = useState("");
  const [soundPreference, setSoundPreference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [energy, setEnergy] = useState(15000);
  const [xp, setXp] = useState(50);
  const [dbProfile, setDbProfile] = useState(null);

  const initialLogs = [
    { time: "04:12:09", msg: "Establishing secure SSL tunnel..." },
    { time: "04:12:10", msg: "Bypassing standard regional grids..." },
    { time: "04:12:12", msg: "Syncing node clusters to Bangalore mainframes..." },
    { time: "04:12:15", msg: "XTC Monogram identity handshake verified." },
  ];

  useEffect(() => {
    setLogs(initialLogs);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!operatorName || !email) return;

    setLogs((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString(), msg: `Synchronizing Operator [${operatorName.toUpperCase()}] to Aiven Cloud...` },
      { time: new Date().toLocaleTimeString(), msg: "Authenticating database handshake..." },
    ]);

    try {
      const res = await fetch("/api/operator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: operatorName }),
      });
      const data = await res.json();
      if (res.ok && data.profile) {
        setDbProfile(data.profile);
        setLogs((prev) => [
          ...prev,
          { time: new Date().toLocaleTimeString(), msg: `Access authorized. Profile matched successfully.` },
          { time: new Date().toLocaleTimeString(), msg: `Sync nodes: ${data.profile.loyaltyPoints} PTS registered.` },
        ]);
        setTimeout(() => {
          setSubmitted(true);
        }, 1200);
      } else {
        throw new Error(data.error || "Uplink validation rejected by grid.");
      }
    } catch (err) {
      setLogs((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: `Handshake failed: ${err.message}` },
      ]);
      alert("Database link failed. Please check Aiven active credentials or connection string.");
    }
  };

  const handleEarnEnergy = () => {
    setEnergy((prev) => prev + 1250);
    setXp((prev) => prev + 15);
    setLogs((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString(), msg: "Harvested 1,250 Cosmic Energy nodes successfully." },
    ]);
  };

  return (
    <PageTransition>
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full flex flex-col gap-24 relative min-h-screen">
        {/* Decorative ambiance lights */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-inverse-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* 1. Hero Title */}
        <section className="flex flex-col items-center justify-center text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-primary/20 bg-primary/5 mb-8">
            <Star className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-label-sm font-label-sm text-primary uppercase text-[10px] tracking-widest">
              Elite Syndicate Entry
            </span>
          </div>
          <h1 className="font-display-xl text-3xl sm:text-5xl md:text-7xl text-on-surface uppercase mb-6 drop-shadow-[0_0_35px_rgba(153,51,255,0.35)] font-black">
            Access the Void
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-sm sm:text-base md:text-lg mb-10">
            Initiate your uplink to the ascended network. Secure high-level operator clearance, intercept limited drops, and extract cosmic energy from every interaction.
          </p>
        </section>

        {/* 2. Interactive Console & Live Logs */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Join console form / operator badge */}
          <div className="glass-panel p-panel-padding rounded-xl relative overflow-hidden border border-primary/15">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="font-headline-md text-xl uppercase font-bold text-on-surface border-b border-primary/15 pb-4">
                  Operator Uplink Console
                </h3>

                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
                    Operator Handle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEO_OPERATOR"
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value)}
                    className="bg-surface-container/50 border border-primary/20 rounded-DEFAULT px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/40"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
                    Secure Email Link
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="operator@void.link"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-surface-container/50 border border-primary/20 rounded-DEFAULT px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/40"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
                    Acoustic Freq Selection
                  </label>
                  <select
                    value={soundPreference}
                    onChange={(e) => setSoundPreference(e.target.value)}
                    className="bg-surface-container/50 border border-primary/20 rounded-DEFAULT px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="">Select Spectrum</option>
                    <option value="techno">Deep Sub-Club Techno</option>
                    <option value="trance">Dark Progressive & Psytrance</option>
                    <option value="ambient">Cosmic Space Ambient</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-primary-container text-on-primary-container font-label-sm text-xs uppercase tracking-widest py-4 hover:brightness-110 shadow-[0_0_20px_rgba(153,51,255,0.45)] transition-all rounded-DEFAULT mt-2"
                >
                  Request Authentication
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-6 text-center py-6 items-center">
                <CheckCircle className="w-16 h-16 text-primary animate-bounce" />
                <h3 className="font-headline-md text-2xl uppercase font-bold text-on-surface">
                  Identity Authenticated
                </h3>
                <div className="bg-surface-container/80 p-4 rounded-lg border border-primary/25 w-full flex flex-col items-center gap-3">
                  <div className="text-[10px] font-label-sm text-primary uppercase tracking-widest">
                    Authorized Syndicate Operator
                  </div>
                  <div className="font-display-xl text-lg text-on-surface font-bold">
                    {operatorName.toUpperCase()}
                  </div>
                  <div className="text-xs text-on-surface-variant select-all font-label-sm bg-background/50 px-3 py-1.5 rounded border border-primary/10">
                    XTC_KEY_{operatorName.substring(0,4).toUpperCase()}_09X2B
                  </div>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-surface/55 p-3 rounded border border-primary/10">
                    <div className="text-[10px] font-label-sm text-on-surface-variant uppercase">Loyalty Balance</div>
                    <div className="text-lg font-bold text-primary">{dbProfile?.loyaltyPoints || 100} PTS</div>
                  </div>
                  <div className="bg-surface/55 p-3 rounded border border-primary/10">
                    <div className="text-[10px] font-label-sm text-on-surface-variant uppercase">Engraved Monogram</div>
                    <div className="text-lg font-bold text-primary">{dbProfile?.monogram || "NONE"}</div>
                  </div>
                </div>

                <button
                  onClick={handleEarnEnergy}
                  className="w-full border border-primary/30 hover:bg-primary/10 py-3 rounded text-[10px] uppercase font-label-sm tracking-wider text-primary mt-2 transition-all"
                >
                  Extract Ambient Cosmic Energy Nodes
                </button>
              </div>
            )}
          </div>

          {/* Secure Firewall Live Logs Terminal */}
          <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 font-label-sm text-xs bg-surface-container-lowest/80 border border-primary/10 h-[400px] overflow-hidden justify-between">
            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
              <span className="flex items-center gap-2 text-primary uppercase tracking-wider">
                <Cpu className="w-4 h-4 animate-spin" /> Live Node Log Link
              </span>
              <span className="text-[10px] text-on-surface-variant/40">Sector: BLR_MAIN_01</span>
            </div>

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 my-4 select-text">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-4 items-start text-on-surface-variant/80 hover:text-on-surface transition-colors">
                  <span className="text-primary font-bold">{log.time}</span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-primary/10 pt-3 text-[10px] text-on-surface-variant/40 flex justify-between">
              <span>Secure Shell Uplink</span>
              <span>All Logs Authenticated</span>
            </div>
          </div>
        </section>

        {/* 3. Protocols Membership Tiers */}
        <section className="flex flex-col gap-12 border-t border-primary/5 pt-20">
          <header className="flex flex-col gap-2">
            <h2 className="font-headline-lg text-2xl sm:text-4xl uppercase font-bold text-on-surface">
              The Protocols
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Classified access credentials for registered operators within our grid.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Protocol 01 */}
            <div className="glass-panel p-panel-padding rounded-xl flex flex-col gap-6 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(153,51,255,0.1)] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Eye className="w-16 h-16" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-xs text-primary uppercase tracking-widest">
                  Protocol 01
                </span>
                <h3 className="font-headline-md text-xl uppercase font-bold text-on-surface">
                  Initiate
                </h3>
              </div>
              <ul className="flex flex-col gap-3 text-body-md text-xs sm:text-sm text-on-surface-variant z-10 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Early standard drop access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Base energy multiplier (1.0x)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Access to public syndicate logs
                </li>
              </ul>
              <div className="pt-6 border-t border-primary/10">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Status: Open Coordinates
                </span>
              </div>
            </div>

            {/* Protocol 02 */}
            <div className="glass-panel p-panel-padding rounded-xl flex flex-col gap-6 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(153,51,255,0.1)] transition-all duration-500 group relative overflow-hidden border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Shield className="w-16 h-16" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-xs text-primary uppercase tracking-widest">
                  Protocol 02
                </span>
                <h3 className="font-headline-md text-xl uppercase font-bold text-on-surface">
                  Sentinel
                </h3>
              </div>
              <ul className="flex flex-col gap-3 text-body-md text-xs sm:text-sm text-on-surface-variant z-10 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Restricted archive drop keys
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Voting authority on artifact lines
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Sentinel private custom gear
                </li>
              </ul>
              <div className="pt-6 border-t border-primary/10">
                <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider font-bold">
                  Req: 50,000 Cosmic Energy Nodes
                </span>
              </div>
            </div>

            {/* Protocol 03 */}
            <div className="glass-panel p-panel-padding rounded-xl flex flex-col gap-6 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(153,51,255,0.2)] transition-all duration-500 group relative overflow-hidden border-primary/50">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none backdrop-blur-3xl" />
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                <Zap className="w-16 h-16 text-primary" />
              </div>
              <div className="flex flex-col gap-1 z-10">
                <span className="font-label-sm text-xs text-primary uppercase tracking-widest animate-pulse">
                  Protocol 03
                </span>
                <h3 className="font-headline-md text-xl uppercase font-bold text-on-surface">
                  Ascended
                </h3>
              </div>
              <ul className="flex flex-col gap-3 text-body-md text-xs sm:text-sm text-on-surface-variant z-10 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Absolute hidden archive clearance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Invitations to offline musical events
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Lifetime custom priority shipping
                </li>
              </ul>
              <div className="pt-6 border-t border-primary/10 z-10">
                <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider font-bold">
                  Req: Classified Invitation Code
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
