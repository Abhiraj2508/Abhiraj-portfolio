"use client";

import React from "react";

export default function ProfileSection() {
  return (
    <section id="profile" className="section">
      <div className="section-head">
        <div className="eyebrow">03 · Engineer Profile</div>
        <h2 className="section-title">Read from disk: abhiraj.json</h2>
      </div>
      <div className="profile-grid">
        <div className="profile-intro">
          <p>
            Abhiraj Pratap Singh is an <span className="accent">aspiring DevOps Engineer</span> focused on building automated, reliable and scalable deployment workflows.
          </p>
          <p>
            With a foundation in Computer Science and Engineering, he is passionate about <span className="accent">Linux administration, containerization, CI/CD automation and cloud technologies.</span>
          </p>
          <p>
            His hands-on project experience includes building a <span className="accent">Docker and Jenkins-based CI/CD pipeline, automating application builds, container deployment, smoke testing and Docker Hub image publishing.</span>
          </p>
          <p>
            Currently strengthening his knowledge of Kubernetes, AWS, infrastructure automation and monitoring to build production-ready DevOps solutions.
          </p>
          <div className="focus-tags">
            <span>CLOUD & DEVOPS</span>
            <span>CI/CD AUTOMATION</span>
            <span>DOCKER CONTAINERIZATION</span>
            <span>JENKINS PIPELINES</span>
            <span>LINUX ADMINISTRATION</span>
            <span>GIT & GITHUB</span>
            <span>KUBERNETES</span>
            <span>AWS FUNDAMENTALS</span>
          </div>
        </div>
        <div className="data-card">
          <div className="data-row">
            <span className="k">name</span>
            <span className="v">Abhiraj Pratap Singh</span>
          </div>
          <div className="data-row">
            <span className="k">role</span>
            <span className="v">Aspiring DevOps Engineer</span>
          </div>

          <div className="data-row">
            <span className="k">focus</span>
            <span className="v">DevOps · Cloud · Automation · CI/CD</span>
          </div>
          <div className="data-row">
            <span className="k">primary_stack</span>
            <span className="v">Docker, Jenkins, Kubernetes, AWS, Linux, Git</span>
          </div>
          <div className="data-row">
            <span className="k">version_control</span>
            <span className="v">Git, GitHub</span>
          </div>
          <div className="data-row">
            <span className="k">status</span>
            <span className="v" style={{ color: "var(--green)" }}>
              ● Open to Opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

