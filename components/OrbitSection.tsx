"use client";

import React from "react";
import { ORBITS, TECH_INFO } from "@/data/portfolioData";

interface OrbitSectionProps {
  selectedTech: string;
  setSelectedTech: (name: string) => void;
}

export default function OrbitSection({
  selectedTech,
  setSelectedTech,
}: OrbitSectionProps) {
  return (
    <section id="stack" className="section">
      <div className="section-head">
        <div className="eyebrow">04 · Orbital Architecture</div>
        <h2 className="section-title">Orbit around DevOps Engineering</h2>
        <p className="section-sub">
          Every tool orbits the same core discipline. Click one to see what it&apos;s used for, where it sits in the
          pipeline, and which live systems depend on it.
        </p>
      </div>
      <div id="stack-wrap">
        <div id="orbit-canvas">
          <svg viewBox="0 0 440 440">
            {ORBITS.map((o, idx) => (
              <circle
                key={idx}
                className="orbit-ring"
                cx={220}
                cy={220}
                r={o.r * 0.62}
              />
            ))}
            <circle className="orbit-core" cx={220} cy={220} r={30} />
            <text
              x={220}
              y={218}
              textAnchor="middle"
              fill="var(--purple-light)"
              fontFamily="var(--font-mono)"
              fontSize={8}
              letterSpacing={1}
            >
              DEVOPS
            </text>
            <text
              x={220}
              y={229}
              textAnchor="middle"
              fill="var(--purple-light)"
              fontFamily="var(--font-mono)"
              fontSize={8}
              letterSpacing={1}
            >
              ENGINEERING
            </text>

            {ORBITS.map((o, oi) => {
              const radius = o.r * 0.62;
              return o.items.map((name, i) => {
                const angle = (i / o.items.length) * Math.PI * 2 + oi * 0.5;
                const x = 220 + radius * Math.cos(angle);
                const y = 220 + radius * Math.sin(angle);
                const isSelected = selectedTech === name;
                return (
                  <g
                    key={name}
                    className={`orbit-node ${isSelected ? "active" : ""}`}
                    transform={`translate(${x},${y})`}
                    onClick={() => setSelectedTech(name)}
                    data-node-label={name}
                  >
                    <circle r={22} />
                    <text textAnchor="middle" dy={4}>
                      {name.length > 9 ? name.slice(0, 8) + "…" : name}
                    </text>
                  </g>
                );
              });
            })}
          </svg>
        </div>
        <div id="stack-info">
          {TECH_INFO[selectedTech] ? (
            <div>
              <h3>{selectedTech}</h3>
              <div className="field">
                <div className="label">What I use it for</div>
                <div className="val">{TECH_INFO[selectedTech].use}</div>
              </div>
              <div className="field">
                <div className="label">Where it fits in the pipeline</div>
                <div className="val">{TECH_INFO[selectedTech].fit}</div>
              </div>
              <div className="field">
                <div className="label">Related technologies</div>
                <div className="val">{TECH_INFO[selectedTech].related}</div>
              </div>
              <div className="field">
                <div className="label">Live systems using it</div>
                <div className="val">{TECH_INFO[selectedTech].projects}</div>
              </div>
            </div>
          ) : (
            <div className="empty">
              Select a technology from the orbit to inspect it — try{" "}
              <b style={{ color: "var(--purple-light)" }}>Kubernetes</b> or{" "}
              <b style={{ color: "var(--purple-light)" }}>Docker</b>.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

