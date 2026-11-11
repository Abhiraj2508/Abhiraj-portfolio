"use client";

import React from "react";

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  openConsole: () => void;
}

export default function Navbar({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  openConsole,
}: NavbarProps) {
  return (
    <>
      {/* TOP NAVIGATION */}
      <nav id="nav">
        <div className="logo">
          <img
            src="/avatar.jpg"
            alt="Abhiraj Pratap Singh"
            className="logo-avatar"
          />
          <span className="dot" /> ABHIRAJ.OS
        </div>
        <button id="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          MENU
        </button>
        <ul id="nav-list" className={mobileMenuOpen ? "open" : ""}>
          <li>
            <a
              href="#hero"
              className={`nlink ${activeSection === "hero" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              System
            </a>
          </li>
          <li>
            <a
              href="#terminal-section"
              className={`nlink nlink-term ${activeSection === "terminal-section" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Terminal
            </a>
          </li>
          <li>
            <a
              href="#tech-stack"
              className={`nlink ${activeSection === "tech-stack" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Stack
            </a>
          </li>
          <li>
            <a
              href="#systems"
              className={`nlink ${activeSection === "systems" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#pipeline"
              className={`nlink ${activeSection === "pipeline" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pipeline
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nlink ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="status">● SYSTEM ONLINE</div>
      </nav>

      {/* FLOATING CONSOLE LAUNCHER */}
      <button
        id="console-launcher"
        className="show"
        onClick={openConsole}
        data-node-label="CONSOLE"
      >
        <span className="blip" /> Open Console <span className="kbd">`</span>
      </button>
    </>
  );
}

