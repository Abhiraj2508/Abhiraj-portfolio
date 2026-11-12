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
        <div className="hero-status-pill">
          <span className="status-dot green" />
          <span>OPEN TO WORK · ENTRY-LEVEL &amp; INTERNSHIPS</span>
        </div>
        <h1 id="hero-name">
          <span>ABHIRAJ </span>
          <span className="last">PRATAP SINGH</span>
        </h1>
        <div id="hero-role">Aspiring DevOps Engineer | Web Developer</div>
        <p id="hero-tag">
          Building automated CI/CD pipelines, containerized applications and reliable deployment workflows.
        </p>
        <div id="hero-cta">
          <a href="#systems" className="btn primary">
            [ View Projects ]
          </a>
          <a
            href="/resume.pdf"
            download="Abhiraj_Pratap_Singh_Resume.pdf"
            className="btn"
          >
            [ Download Resume ]
          </a>
          <a href="#contact" className="btn">
            [ Contact Me ]
          </a>
          <a href="#terminal-section" className="btn btn-terminal">
            [ Open Terminal ]
          </a>
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

