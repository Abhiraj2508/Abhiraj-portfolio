"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { SKILLS_LIST } from "@/data/portfolioData";

interface TechStackSectionProps {
  selectedSkillName: string;
  setSelectedSkillName: (name: string) => void;
  onFocusCluster: (cluster: "cloud" | "containers" | "cicd" | "monitor" | "network") => void;
}

export default function TechStackSection({
  selectedSkillName,
  setSelectedSkillName,
  onFocusCluster,
}: TechStackSectionProps) {
  const activeSkill = SKILLS_LIST.find((s) => s.name === selectedSkillName) || SKILLS_LIST[0];
  const ActiveSkillIcon = activeSkill.icon;

  return (
    <section id="tech-stack" className="section">
      <div className="section-head">
        <div className="eyebrow">02 / TECHNOLOGY ECOSYSTEM</div>
        <h2 className="section-title">My Tech Stack.</h2>
        <p className="section-sub">Tools and technologies I&apos;m learning and working with.</p>
      </div>

      <div className="skills-grid-wrap">
        <div className="skills-cards-grid">
          {SKILLS_LIST.map((skill) => {
            const Icon = skill.icon;
            const isSelected = selectedSkillName === skill.name;
            return (
              <div
                key={skill.name}
                className={`skill-card ${isSelected ? "active" : ""}`}
                onClick={() => {
                  setSelectedSkillName(skill.name);
                  if (skill.name === "Docker" || skill.name === "Kubernetes") {
                    onFocusCluster("containers");
                  } else if (skill.name === "AWS") {
                    onFocusCluster("cloud");
                  } else if (
                    skill.name === "Jenkins" ||
                    skill.name === "Git & GitHub" ||
                    skill.name === "CI/CD"
                  ) {
                    onFocusCluster("cicd");
                  } else if (skill.name === "Linux") {
                    onFocusCluster("network");
                  }
                }}
                data-node-label={skill.name}
              >
                <Icon className="skill-icon" />
                <div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-cat">{skill.category}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="skill-detail-panel">
          <div className="skill-detail-eyebrow">SELECTED TECHNOLOGY</div>
          <div className="skill-detail-icon-wrap">
            <ActiveSkillIcon size={30} />
          </div>
          <div className="skill-detail-title">{activeSkill.name}</div>
          <div className="skill-detail-level">{activeSkill.level}</div>
          <div className="skill-detail-roadmap">
            <CheckCircle2 size={16} style={{ color: "var(--purple-light)" }} />
            <span>{activeSkill.roadmap}</span>
          </div>
          <p className="skill-detail-desc">{activeSkill.description}</p>
        </div>
      </div>
    </section>
  );
}

