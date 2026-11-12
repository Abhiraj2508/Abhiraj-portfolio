"use client";

import React from "react";

export default function ProfileSection() {
  return (
    <section id="profile" className="section">
      <div className="section-head">
        <div className="eyebrow">03 · About Candidate</div>
        <h2 className="section-title">Read from disk: abhiraj.json</h2>
        <p className="section-sub">
          Fresher with practical hands-on project experience in DevOps workflows and modern web development.
        </p>
      </div>
      <div className="profile-grid">
        <div className="profile-intro">
          <p>
            Hello! I am <span className="accent">Abhiraj Pratap Singh</span>, an aspiring <span className="accent">DevOps Engineer &amp; Web Developer</span> with a completed <span className="accent">B.Tech in Computer Science and Engineering</span>.
          </p>
          <p>
            As an entry-level candidate, I focus on practical implementation. I have built hands-on projects automating software delivery with <span className="accent">Docker, Jenkins, Linux administration, and Git version control</span>, including automated build testing, container packaging, and Docker Hub releases.
          </p>
          <p>
            I have practical hands-on experience exploring <span className="accent">Kubernetes fundamentals &amp; Minikube</span> and cluster monitoring with <span className="accent">Prometheus &amp; Grafana</span> to observe application health and container self-healing.
          </p>
          <p>
            On the development side, I build responsive, component-driven web interfaces using <span className="accent">JavaScript, React, HTML, and CSS</span>, backed by academic and project foundations in <span className="accent">Java</span> programming and <span className="accent">SQL</span> database querying.
          </p>
          <p>
            I am actively looking for <span className="accent">entry-level DevOps Engineer, Junior Cloud Engineer, or Full-Stack Web Developer</span> opportunities and internships where I can contribute to automated workflows and learn from experienced teams.
          </p>
          <div className="focus-tags">
            <span>B.TECH CSE (COMPLETED)</span>
            <span>DOCKER</span>
            <span>JENKINS CI/CD</span>
            <span>LINUX</span>
            <span>GIT &amp; GITHUB</span>
            <span>KUBERNETES FUNDAMENTALS</span>
            <span>JAVASCRIPT</span>
            <span>REACT</span>
            <span>SQL</span>
            <span>JAVA</span>
            <span>AWS FUNDAMENTALS</span>
          </div>
        </div>
        <div className="data-card">
          <div className="data-row">
            <span className="k">name</span>
            <span className="v">Abhiraj Pratap Singh</span>
          </div>
          <div className="data-row">
            <span className="k">education</span>
            <span className="v">B.Tech CSE (Completed)</span>
          </div>
          <div className="data-row">
            <span className="k">experience_level</span>
            <span className="v">Fresher · Hands-on Projects</span>
          </div>
          <div className="data-row">
            <span className="k">target_roles</span>
            <span className="v">DevOps Engineer · Web Developer</span>
          </div>
          <div className="data-row">
            <span className="k">devops_tools</span>
            <span className="v">Docker, Jenkins, Linux, Git, Kubernetes</span>
          </div>
          <div className="data-row">
            <span className="k">dev_stack</span>
            <span className="v">JavaScript, React, Java, SQL, HTML/CSS</span>
          </div>
          <div className="data-row">
            <span className="k">availability</span>
            <span className="v" style={{ color: "var(--green)" }}>
              ● Open for Entry-Level &amp; Internships
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

