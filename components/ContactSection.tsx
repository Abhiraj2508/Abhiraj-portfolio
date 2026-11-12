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
            Open to entry-level <strong>DevOps Engineer</strong> and <strong>Web Developer</strong> opportunities,
            graduate engineering roles, and internships. Ready to contribute hands-on skills in CI/CD automation,
            containerization, and modern web applications.
          </p>
          <div className="contact-left-actions">
            <a
              href="mailto:abhirajpratap250802@gmail.com"
              className="contact-cta-btn"
              aria-label="Send an email to Abhiraj Pratap Singh"
            >
              <span>Email Directly</span>
              <ArrowUpRight size={18} />
            </a>
            <a
              href="/resume.pdf"
              download="Abhiraj_Pratap_Singh_Resume.pdf"
              className="btn resume-direct-btn"
              aria-label="Download Abhiraj Pratap Singh's Resume PDF"
            >
              <Download size={16} />
              <span>[ Download Resume ]</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 INTERACTIVE CONTACT CARDS */}
        <div className="contact-cards-stack">
          {/* EMAIL */}
          <a
            href="mailto:abhirajpratap250802@gmail.com"
            className="contact-card-item"
            data-node-label="Email"
            aria-label="Email abhirajpratap250802@gmail.com"
          >
            <div className="contact-card-icon">
              <Mail size={22} aria-hidden="true" />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">EMAIL ADDRESS</span>
              <span className="contact-card-value">abhirajpratap250802@gmail.com</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" aria-hidden="true" />
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/Abhiraj2508"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-item"
            data-node-label="GitHub"
            aria-label="Visit GitHub profile of Abhiraj Pratap Singh"
          >
            <div className="contact-card-icon">
              <GitBranch size={22} aria-hidden="true" />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">GITHUB PROFILE</span>
              <span className="contact-card-value">github.com/Abhiraj2508</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" aria-hidden="true" />
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/abhiraj2508/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-item"
            data-node-label="LinkedIn"
            aria-label="Connect on LinkedIn with Abhiraj Pratap Singh"
          >
            <div className="contact-card-icon">
              <ExternalLink size={22} aria-hidden="true" />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">LINKEDIN NETWORK</span>
              <span className="contact-card-value">linkedin.com/in/abhiraj2508/</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" aria-hidden="true" />
          </a>

          {/* RESUME */}
          <a
            href="/resume.pdf"
            download="Abhiraj_Pratap_Singh_Resume.pdf"
            className="contact-card-item"
            data-node-label="Resume"
            aria-label="Download Resume PDF"
            onClick={(e) => {
              // Also open modal on desktop preview if desired, or let download proceed
            }}
          >
            <div className="contact-card-icon">
              <Download size={22} aria-hidden="true" />
            </div>
            <div className="contact-card-info">
              <span className="contact-card-label">CURRICULUM VITAE</span>
              <span className="contact-card-value">Download Resume (PDF)</span>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
