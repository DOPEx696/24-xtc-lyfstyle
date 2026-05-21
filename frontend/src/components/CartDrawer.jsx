"use client";
import React, { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { X, ShoppingBag, Plus, Minus, CreditCard, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState(null); // 'details' | 'success' | null
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    monogram: "",
    payment: "cod", // 'cod' or 'razorpay'
  });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (formData.payment === "cod") {
      setCheckoutStep("success");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Dynamic Script Loader
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failure to initialize secure Razorpay gateway. Check network state.");
        setIsLoading(false);
        return;
      }

      // 2. Contact Next.js checkout route
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          email: formData.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Uplink validation rejected by server.");
      }

      // 3. Initiate native Razorpay modal
      const options = {
        key: data.keyId || "rzp_test_PLACEHOLDER_KEY",
        amount: data.amount,
        currency: data.currency,
        name: "XTC LIFESTYLE",
        description: "Tactile EDC Slow-Burn Accoutrements",
        order_id: data.orderId,
        handler: async function (response) {
          setIsLoading(true);
          try {
            // 4. Send transaction token logs to verification server
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: formData.email,
                monogram: formData.monogram || null,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Checkout verification transaction failed.");
            }

            if (verifyData.success) {
              setCheckoutStep("success");
            }
          } catch (err) {
            console.error("Payment verification failure:", err);
            alert("Cryptographic signature match failed. Verify Aiven active keys.");
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#9933ff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error("Razorpay workflow failure:", err);
      alert(err.message || "Checkout pipeline dropped. Verify active database server connectivity.");
    } finally {
      setIsLoading(false);
    }
  };

  const finalizeOrder = () => {
    clearCart();
    setCheckoutStep(null);
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsCartOpen(false);
              setCheckoutStep(null);
            }}
          />

          {/* Drawer body */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-surface-container-lowest border-l border-primary/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[101] flex flex-col pointer-events-auto text-on-surface"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center h-20 px-8 border-b border-primary/10 bg-surface/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="text-headline-md font-headline-md text-lg uppercase tracking-wider">
                  Artifact Cargo
                </span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep(null);
                }}
                className="p-2 hover:bg-primary/10 rounded-DEFAULT text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable list / Checkout forms */}
            <div className="flex-grow overflow-y-auto px-8 py-6 no-scrollbar">
              {checkoutStep === null && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-4">
                      <ShoppingBag className="w-12 h-12 text-on-surface-variant/40 stroke-[1]" />
                      <p className="font-body-md text-on-surface-variant">
                        Cargo bay empty. Siphon energy from our shop first.
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="bg-primary/10 border border-primary/30 text-primary text-label-sm font-label-sm px-6 py-3 uppercase tracking-widest hover:bg-primary/20 transition-all rounded-DEFAULT mt-2"
                      >
                        Acquire Artifacts
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="glass-panel p-4 rounded-xl flex gap-4 border border-primary/5 hover:border-primary/20"
                        >
                          <div className="w-20 h-20 bg-surface/50 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-primary/5">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-xs text-primary font-label-sm">XTC</div>
                            )}
                          </div>
                          <div className="flex-grow flex flex-col">
                            <span className="font-label-sm text-xs text-primary mb-1 uppercase tracking-wider">
                              {item.category || "Artifact"}
                            </span>
                            <span className="font-headline-md text-sm text-on-surface mb-1">
                              {item.name}
                            </span>
                            <span className="font-body-md text-xs text-on-surface-variant mb-3">
                              ₹{item.price} each
                            </span>
                            <div className="flex justify-between items-center mt-auto">
                              <div className="flex items-center gap-2 border border-primary/10 rounded-DEFAULT bg-surface/30 px-1 py-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:text-primary transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-label-sm text-xs px-2 min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:text-primary transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-error hover:underline"
                              >
                                Eject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "details" && (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5">
                  <span className="font-label-sm text-xs text-primary uppercase tracking-[0.2em] mb-2 block">
                    Securing Authentication Uplink
                  </span>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-label-sm text-on-surface-variant uppercase">Operator Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-surface/50 border border-primary/20 rounded-DEFAULT p-3 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-label-sm text-on-surface-variant uppercase">Email Channel</label>
                    <input
                      type="email"
                      required
                      placeholder="operator@void.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-surface/50 border border-primary/20 rounded-DEFAULT p-3 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-label-sm text-on-surface-variant uppercase">Mobile Contact</label>
                    <input
                      type="tel"
                      required
                      placeholder="10 digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-surface/50 border border-primary/20 rounded-DEFAULT p-3 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-label-sm text-on-surface-variant uppercase">Delivery Sector (Address)</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Sector grid coordinates, block, city, pin code"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="bg-surface/50 border border-primary/20 rounded-DEFAULT p-3 focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  {/* Optional Monogram Customization */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-label-sm text-on-surface-variant uppercase">Engraved Monogram</label>
                      <span className="text-[9px] text-primary uppercase tracking-wider">3 chars max</span>
                    </div>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="XTC"
                      value={formData.monogram}
                      onChange={(e) => setFormData({ ...formData, monogram: e.target.value.toUpperCase() })}
                      className="bg-surface/50 border border-primary/20 rounded-DEFAULT p-3 focus:outline-none focus:border-primary text-sm tracking-widest font-bold uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-xs font-label-sm text-on-surface-variant uppercase">Payment Protocol</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, payment: "cod" })}
                        className={`p-4 border rounded-DEFAULT flex flex-col gap-2 transition-all ${
                          formData.payment === "cod"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-primary/15 hover:border-primary/40 bg-surface/30"
                        }`}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="text-xs font-label-sm uppercase tracking-wider">COD (Delhi/Blr)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, payment: "razorpay" })}
                        className={`p-4 border rounded-DEFAULT flex flex-col gap-2 transition-all ${
                          formData.payment === "razorpay"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-primary/15 hover:border-primary/40 bg-surface/30"
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span className="text-xs font-label-sm uppercase tracking-wider">Razorpay Gateway</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-container text-on-primary-container p-4 font-label-sm uppercase tracking-widest text-sm hover:brightness-110 shadow-[0_0_20px_rgba(153,51,255,0.4)] transition-all rounded-DEFAULT mt-4 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
                        CONNECTING_UPLINK...
                      </>
                    ) : (
                      "Confirm Uplink Order"
                    )}
                  </button>
                </form>
              )}

              {checkoutStep === "success" && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary text-xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-lg uppercase tracking-wide mb-2 text-on-surface">
                      AUTHENTICATED
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant max-w-xs mx-auto">
                      Order logs successfully registered in our cosmic archive database. Sector delivery updates pending.
                    </p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl text-left w-full text-xs font-label-sm flex flex-col gap-2 border-primary/10">
                    <div><span className="text-on-surface-variant">OPERATOR:</span> {formData.name}</div>
                    <div><span className="text-on-surface-variant">UPLINK EMAIL:</span> {formData.email}</div>
                    <div><span className="text-on-surface-variant">METHOD:</span> {formData.payment === "cod" ? "COD" : "Online via Razorpay (Simulated)"}</div>
                    <div><span className="text-on-surface-variant">CARGO TOTAL:</span> ₹{cartTotal}</div>
                  </div>
                  <button
                    onClick={finalizeOrder}
                    className="w-full bg-primary/10 border border-primary/30 text-primary p-4 font-label-sm uppercase tracking-widest text-xs hover:bg-primary/20 transition-all rounded-DEFAULT mt-2"
                  >
                    Return to Navigation
                  </button>
                </div>
              )}
            </div>

            {/* Footer calculations */}
            {cartItems.length > 0 && checkoutStep === null && (
              <div className="p-8 border-t border-primary/10 bg-surface/85 backdrop-blur-md flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="font-label-sm text-sm uppercase text-on-surface-variant">Cargo Surcharge</span>
                  <span className="font-headline-md text-xl text-primary">₹{cartTotal}</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCheckoutStep("details")}
                    className="flex-grow bg-primary-container text-on-primary-container p-4 font-label-sm uppercase tracking-widest text-sm hover:brightness-110 shadow-[0_0_20px_rgba(153,51,255,0.4)] transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    Uplink Clearance <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
