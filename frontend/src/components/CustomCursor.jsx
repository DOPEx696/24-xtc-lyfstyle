"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      if (isHidden) setIsHidden(false);

      // Trigger particle burst on mouse move
      if (canvasRef.current) {
        addParticles(e.clientX, e.clientY, 1);
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Smooth spring tracking for trail dot
    let trailX = -100;
    let trailY = -100;
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const animateTrail = () => {
      trailX = lerp(trailX, lastMousePosRef.current.x, 0.15);
      trailY = lerp(trailY, lastMousePosRef.current.y, 0.15);
      setTrail({ x: trailX, y: trailY });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    animateTrail();

    // Listeners for hover elements
    const updateHoverState = () => {
      const hoverElements = document.querySelectorAll(
        "a, button, [role='button'], .cursor-pointer, input, select, textarea"
      );

      const onEnter = () => setIsHovered(true);
      const onLeave = () => setIsHovered(false);

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      return () => {
        hoverElements.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initial check and periodically update triggers for dynamically added elements
    const hoverCleanup = updateHoverState();
    const interval = setInterval(updateHoverState, 1500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(requestRef.current);
      hoverCleanup();
      clearInterval(interval);
    };
  }, [isHidden]);

  // Canvas-based digital fluid particle trail
  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame;

    const updateAndDrawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.size *= 0.96;

        if (p.life <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          // Purple/violet aesthetic fading particles
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(153, 51, 255, ${p.life})`;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(updateAndDrawParticles);
    };

    updateAndDrawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [isClient]);

  const addParticles = (x, y, count) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        life: 0.8,
      });
    }
  };

  if (!isClient) return null;

  return (
    <>
      {/* Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        style={{ opacity: isHidden ? 0 : 0.65, transition: "opacity 0.3s ease" }}
      />

      {/* Main Core Hover Dot */}
      <div
        className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/20 backdrop-blur-[1px] mix-blend-difference hidden md:block"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovered ? "42px" : "18px",
          height: isHovered ? "42px" : "18px",
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 1.25 : 1})`,
          boxShadow: isHovered ? "0 0 15px rgba(153, 51, 255, 0.6)" : "none",
          opacity: isHidden ? 0 : 1,
          transition: "width 0.3s cubic-bezier(0.19, 1, 0.22, 1), height 0.3s cubic-bezier(0.19, 1, 0.22, 1), transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s ease, background 0.2s ease",
        }}
      />

      {/* Core Center dot */}
      <div
        className="fixed pointer-events-none z-50 w-1.5 h-1.5 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHidden ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}
