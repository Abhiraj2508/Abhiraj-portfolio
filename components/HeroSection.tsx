"use client";

import React from "react";

interface HeroSectionProps {
  heroCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  setActiveModal: (modal: string | null) => void;
}

export default function HeroSection({
  heroCanvasRef,
  setActiveModal,
}: HeroSectionProps) {
  return (
    <section id="hero">
      <div id="hero-overlay">
        <div className="eyebrow">DevOps Engineer · Cloud · Automation · Infrastructure</div>
        <h1 id="hero-name">
          <span>ABHIRAJ </span>
          <span className="last">PRATAP SINGH</span>
        </h1>
        <div id="hero-role">DevOps Engineer</div>
        <p id="hero-tag">
          Engineering automated, scalable and observable infrastructure — across AWS, containers, CI/CD and Linux.
        </p>
        <div id="hero-cta">
          <a href="#terminal-section" className="btn primary">
            [ Open Terminal ]
          </a>
          <button className="btn" onClick={() => setActiveModal("resume")}>
            [ Resume ]
          </button>
        </div>
      </div>

      <div id="hero-canvas-wrap">
        <canvas id="hero-canvas" ref={heroCanvasRef} />
        <div className="node-tooltip" id="node-tooltip" />
      </div>

      <div id="hero-hint">
        Click a node to travel there · or drive it from the <b>Terminal</b> below
      </div>
      <div id="hero-scroll">
        Scroll<div className="line" />
      </div>
    </section>
  );
}

