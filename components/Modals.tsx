"use client";

import React from "react";
import { SYSTEMS } from "@/data/portfolioData";

interface ModalsProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
}

export default function Modals({ activeModal, setActiveModal }: ModalsProps) {
  return (
    <>
      {/* System Project Modal */}
      {activeModal && activeModal !== "resume" && (
        <div className="modal-backdrop show" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              ×
            </button>
            {(() => {
              const sys = SYSTEMS.find((s) => s.id === activeModal);
              if (!sys) return null;
              return (
                <>
                  <div className="eyebrow">{sys.id}</div>
                  <h3>{sys.name}</h3>
                  <div className="pipeline-mini">
                    {sys.steps.map((st, i) => (
                      <div key={i} className="step">
                        {st}
                      </div>
                    ))}
                  </div>
                  <ul>
                    {sys.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="system-result">{sys.result}</div>
                  <div className="system-stack" style={{ marginTop: "18px" }}>
                    {sys.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Resume Viewer Modal */}
      {activeModal === "resume" && (
        <div className="modal-backdrop show" id="resume-modal" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-top">
              <h3>resume.pdf — Abhiraj Pratap Singh</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>
                ×
              </button>
            </div>
            <iframe src="/resume.pdf" title="Abhiraj Pratap Singh Resume" />
            <div className="resume-actions">
              <a className="btn primary" href="/resume.pdf" download="Abhiraj_Pratap_Singh_Resume.pdf">
                [ Download Resume ]
              </a>
              <a className="btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                [ Open in New Tab ]
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

