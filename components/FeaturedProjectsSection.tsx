"use client";

import React from "react";
import {
  Activity,
  Bell,
  Boxes,
  CheckCircle2,
  Container,
  ExternalLink,
  Layers,
  ShieldCheck,
  Ship,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";

interface FeaturedProjectsSectionProps {
  onFocusCluster: (cluster: "cloud" | "containers" | "cicd" | "monitor" | "network") => void;
}

export default function FeaturedProjectsSection({
  onFocusCluster,
}: FeaturedProjectsSectionProps) {
  return (
    <section id="systems" className="section">
      <div className="section-head">
        <div className="eyebrow">05 · Featured Projects</div>
        <h2 className="section-title">Featured Projects.</h2>
        <p className="section-sub">
          Production pipelines, automated infrastructure and active engineering work.
        </p>
      </div>

      <div className="projects-grid">
        {/* FEATURED PROJECT 01 */}
        <div
          className="project-feature-card"
          onClick={() => onFocusCluster("cicd")}
          data-node-label="CI/CD Pipeline"
        >
          <div className="project-card-header">
            <span className="project-card-num">PROJECT / 01</span>
            <span className="project-card-status">
              <span className="status-dot green" />
              COMPLETED
            </span>
          </div>

          <div className="project-banner-wrap">
            <img
              src="/ci-cd-project.png"
              alt="Automated CI/CD Pipeline preview"
              className="project-banner-img"
            />
          </div>

          <div className="project-feature-badges">
            <div className="f-badge">
              <Zap size={13} className="f-icon" />
              <span>Automated Build</span>
            </div>
            <div className="f-badge">
              <Boxes size={13} className="f-icon" />
              <span>Containerization</span>
            </div>
            <div className="f-badge">
              <Workflow size={13} className="f-icon" />
              <span>Continuous Deployment</span>
            </div>
            <div className="f-badge">
              <ShieldCheck size={13} className="f-icon" />
              <span>Reliable &amp; Scalable</span>
            </div>
          </div>

          <div className="project-sub">BUILD • TEST • DEPLOY</div>
          <h3 className="project-title">Automated CI/CD Pipeline</h3>
          <p className="project-desc">
            An automated pipeline using GitHub, Jenkins and Docker. It checks out source code, verifies the project,
            builds Docker images, deploys containers and performs smoke testing.
          </p>

          <div className="project-tech-tags">
            <span className="project-tech-tag">Docker</span>
            <span className="project-tech-tag">Jenkins</span>
            <span className="project-tech-tag">GitHub</span>
            <span className="project-tech-tag">CI/CD</span>
          </div>

          <ul className="project-checklist">
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Automated source code checkout</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Docker image build and deployment</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Pipeline smoke testing</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Docker Hub image push</span>
            </li>
          </ul>

          <a
            href="https://github.com/Abhiraj2508"
            target="_blank"
            rel="noopener noreferrer"
            className="project-repo-link"
            onClick={(e) => e.stopPropagation()}
          >
            Explore repository <ExternalLink size={15} />
          </a>
        </div>

        {/* FEATURED PROJECT 02 */}
        <div
          className="project-feature-card"
          onClick={() => onFocusCluster("monitor")}
          data-node-label="Kubernetes Monitoring"
        >
          <div className="project-card-header">
            <span className="project-card-num">PROJECT / 02</span>
            <span className="project-card-status">
              <span className="status-dot green" />
              COMPLETED
            </span>
          </div>

          <div className="project-banner-wrap">
            <img
              src="/kubernetes-monitoring.png"
              alt="Automated Kubernetes Deployment &amp; Monitoring Platform preview"
              className="project-banner-img"
            />
          </div>

          <div className="project-feature-badges">
            <div className="f-badge">
              <Layers size={13} className="f-icon" />
              <span>Container Orchestration</span>
            </div>
            <div className="f-badge">
              <Ship size={13} className="f-icon" />
              <span>Helm Deployments</span>
            </div>
            <div className="f-badge">
              <Activity size={13} className="f-icon" />
              <span>Real-Time Monitoring</span>
            </div>
            <div className="f-badge">
              <Bell size={13} className="f-icon" />
              <span>Automated Alerting</span>
            </div>
          </div>

          <div className="project-sub">KUBERNETES • HELM • MONITORING</div>
          <h3 className="project-title">Automated Kubernetes Deployment &amp; Monitoring Platform</h3>
          <p className="project-desc">
            Built a Kubernetes deployment and monitoring platform using Minikube, Helm, Prometheus, Grafana and
            Alertmanager. Deployed containerized applications, configured monitoring dashboards and alert rules,
            and tested Kubernetes self-healing through real container failure scenarios.
          </p>

          <div className="project-tech-tags">
            <span className="project-tech-tag">Kubernetes</span>
            <span className="project-tech-tag">Minikube</span>
            <span className="project-tech-tag">Docker</span>
            <span className="project-tech-tag">Helm</span>
            <span className="project-tech-tag">Prometheus</span>
            <span className="project-tech-tag">Grafana</span>
            <span className="project-tech-tag">Alertmanager</span>
          </div>

          <ul className="project-checklist">
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Kubernetes application deployment and replica management</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Helm chart installation, upgrades and rollback</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Custom Prometheus and Grafana monitoring</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Pod restart and unavailable replica alerting</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Tested Kubernetes self-healing behavior</span>
            </li>
          </ul>

          <a
            href="https://github.com/Abhiraj2508/Kubernetes-Monitoring-Platform"
            target="_blank"
            rel="noopener noreferrer"
            className="project-repo-link"
            onClick={(e) => e.stopPropagation()}
          >
            Explore Repository <ExternalLink size={15} />
          </a>
        </div>

        {/* FEATURED PROJECT 03 */}
        <div
          className="project-feature-card"
          onClick={() => onFocusCluster("cicd")}
          data-node-label="React CI/CD Pipeline"
        >
          <div className="project-card-header">
            <span className="project-card-num">PROJECT / 03</span>
            <span className="project-card-status">
              <span className="status-dot green" />
              SUCCESSFULLY IMPLEMENTED
            </span>
          </div>

          <div className="project-banner-wrap">
            <img
              src="/react-cicd-pipeline.png"
              alt="Automated CI/CD Pipeline for React Application preview"
              className="project-banner-img"
            />
          </div>

          <div className="project-feature-badges">
            <div className="f-badge">
              <Webhook size={13} className="f-icon" />
              <span>GitHub Webhooks</span>
            </div>
            <div className="f-badge">
              <Boxes size={13} className="f-icon" />
              <span>Vite &amp; React Build</span>
            </div>
            <div className="f-badge">
              <Container size={13} className="f-icon" />
              <span>Docker Hub Registry</span>
            </div>
            <div className="f-badge">
              <ShieldCheck size={13} className="f-icon" />
              <span>Automated Smoke Test</span>
            </div>
          </div>

          <div className="project-sub">REACT • JENKINS • DOCKER</div>
          <h3 className="project-title">Automated CI/CD Pipeline for React Application</h3>
          <p className="project-desc">
            Designed and implemented an automated CI/CD pipeline for a React application using Jenkins, GitHub
            Webhooks, Docker and Docker Hub. Configured automated source-code checkout, Docker image building,
            image publishing and container deployment with post-deployment smoke testing.
          </p>

          {/* Workflow Visualization */}
          <div className="card-pipeline-flow">
            <div className="flow-step">
              <span className="flow-num">01</span>
              <span className="flow-label">GitHub Push</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-step">
              <span className="flow-num">02</span>
              <span className="flow-label">Webhook</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-step">
              <span className="flow-num">03</span>
              <span className="flow-label">Vite Build</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-step">
              <span className="flow-num">04</span>
              <span className="flow-label">Docker Hub</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-step">
              <span className="flow-num">05</span>
              <span className="flow-label">Deploy :8086</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="flow-step">
              <span className="flow-num">06</span>
              <span className="flow-label">Smoke Test</span>
            </div>
          </div>

          <div className="project-tech-tags">
            <span className="project-tech-tag">React</span>
            <span className="project-tech-tag">Vite</span>
            <span className="project-tech-tag">Jenkins</span>
            <span className="project-tech-tag">Docker</span>
            <span className="project-tech-tag">Docker Hub</span>
            <span className="project-tech-tag">Nginx</span>
            <span className="project-tech-tag">GitHub Webhooks</span>
            <span className="project-tech-tag">CI/CD</span>
          </div>

          <ul className="project-checklist">
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Developer push triggers automated Jenkins build via GitHub Webhook</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Production React application build &amp; compilation with Vite</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Multi-stage Docker image creation, tagging and publishing to Docker Hub</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Automated container deployment (foodies-react-container on port 8086)</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="check-icon" />
              <span>Post-deployment automated smoke testing verifies application health</span>
            </li>
          </ul>

          <div className="project-actions-row">
            <a
              href="https://github.com/Abhiraj2508/Foodies-React-Web-App"
              target="_blank"
              rel="noopener noreferrer"
              className="project-repo-link"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub Repository <ExternalLink size={15} />
            </a>
            <a
              href="https://hub.docker.com/r/abhiraj25/foodies-react"
              target="_blank"
              rel="noopener noreferrer"
              className="project-repo-link docker-link"
              onClick={(e) => e.stopPropagation()}
            >
              Docker Hub <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
