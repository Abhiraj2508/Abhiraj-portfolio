"use client";

import React from "react";
import { ArrowUpRight, Download, ExternalLink, GitBranch, Mail } from "lucide-react";

interface ContactSectionProps {
  setActiveModal: (modal: string | null) => void;
}

export default function ContactSection({ setActiveModal }: ContactSectionProps) {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-container">
        {/* LEFT COLUMN: HEADLINE & CTA */}
        <div className="contact-left">
          <div className="eyebrow contact-eyebrow">08 / ESTABLISH CONNECTION</div>
          <h2 className="contact-main-title">
            Let&apos;s build<br />
            <span className="contact-title-accent">something reliable.</span>
          </h2>
          <p className="contact-main-desc">
            I&apos;m open to entry-level opportunities, internships and learning-focused teams in DevOps and cloud engineering.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abhirajpratap250802@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-cta-btn"
          >
            <span>Start a conversation</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* RIGHT COLUMN: 4 INTERACTIVE CONTACT CARDS */}
        <div className="contact-cards-stack">
          {/* EMAIL */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abhirajpratap250802@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-item"
            data-node-label="Email"
          >
            <div className="contact-card-icon">
              <Mail size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">EMAIL</span>
              <span className="contact-card-value">abhirajpratap250802@gmail.com</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/Abhiraj2508"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-item"
            data-node-label="GitHub"
          >
            <div className="contact-card-icon">
              <GitBranch size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">GITHUB</span>
              <span className="contact-card-value">github.com/Abhiraj2508</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/abhiraj2508/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-item"
            data-node-label="LinkedIn"
          >
            <div className="contact-card-icon">
              <ExternalLink size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">LINKEDIN</span>
              <span className="contact-card-value">Connect professionally</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {/* RESUME */}
          <div
            className="contact-card-item"
            onClick={() => setActiveModal("resume")}
            data-node-label="Resume"
          >
            <div className="contact-card-icon">
              <Download size={22} />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">RESUME</span>
              <span className="contact-card-value">Download PDF</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}

