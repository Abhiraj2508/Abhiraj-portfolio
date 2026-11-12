"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  SKILLS_LIST,
  SKILL_CATEGORIES,
  type SkillCategory,
} from "@/data/portfolioData";

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
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");

  const filteredSkills =
    selectedCategory === "All"
      ? SKILLS_LIST
      : SKILLS_LIST.filter((s) => s.category === selectedCategory);

  const activeSkill =
    SKILLS_LIST.find((s) => s.name === selectedSkillName) ||
    filteredSkills[0] ||
    SKILLS_LIST[0];

  const ActiveSkillIcon = activeSkill.icon;

  const handleCategoryChange = (category: SkillCategory | "All") => {
    setSelectedCategory(category);
    const inCategory =
      category === "All"
        ? SKILLS_LIST
        : SKILLS_LIST.filter((s) => s.category === category);
    if (inCategory.length > 0 && !inCategory.some((s) => s.name === selectedSkillName)) {
      setSelectedSkillName(inCategory[0].name);
      onFocusCluster(inCategory[0].cluster);
    }
  };

  const handleSkillSelect = (skill: (typeof SKILLS_LIST)[number]) => {
    setSelectedSkillName(skill.name);
    onFocusCluster(skill.cluster);
  };

  return (
    <section id="tech-stack" className="section">
      <div className="section-head">
        <div className="eyebrow">02 / TECHNOLOGY ECOSYSTEM</div>
        <h2 className="section-title">Technical Skills &amp; Stack.</h2>
        <p className="section-sub">
          Categorized tools, technologies, and concepts with honest skill levels — developed through hands-on project implementations and computer science coursework.
        </p>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="skills-cat-tabs" role="tablist" aria-label="Technology Categories">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              className={`skills-cat-tab ${isActive ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
              <span className="skills-cat-count">
                {cat === "All"
                  ? SKILLS_LIST.length
                  : SKILLS_LIST.filter((s) => s.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="skills-grid-wrap">
        <div className="skills-cards-grid">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            const isSelected = selectedSkillName === skill.name;
            return (
              <div
                key={skill.name}
                tabIndex={0}
                role="button"
                aria-label={`Select skill ${skill.name}`}
                className={`skill-card ${isSelected ? "active" : ""}`}
                onClick={() => handleSkillSelect(skill)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSkillSelect(skill);
                  }
                }}
                data-node-label={skill.name}
              >
                <div className="skill-card-top">
                  <Icon className="skill-icon" aria-hidden="true" />
                  <span className="skill-cluster-tag">{skill.category}</span>
                </div>
                <div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-cat">{skill.level}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SKILL DETAIL PANEL */}
        <div className="skill-detail-panel" aria-live="polite">
          <div className="skill-detail-eyebrow">SELECTED TECHNOLOGY SPECIFICATION</div>
          <div className="skill-detail-icon-wrap">
            <ActiveSkillIcon size={32} aria-hidden="true" />
          </div>
          <div className="skill-detail-title">{activeSkill.name}</div>
          <div className="skill-detail-level">{activeSkill.level}</div>

          <div className="skill-detail-category-badge">
            Category: <span>{activeSkill.category}</span>
          </div>

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
