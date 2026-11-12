"use client";

import React from "react";
import {
  Activity,
  AlertCircle,
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
        <h2 className="section-title">Production &amp; DevOps Projects.</h2>
        <p className="section-sub">
          Hands-on engineering projects showcasing automated container orchestration, continuous integration pipelines, and proactive observability.
        </p>
      </div>

      <div className="projects-grid">
        {/* =========================================================================
            FEATURED PROJECT 01: Automated Kubernetes Deployment & Monitoring Platform
            ========================================================================= */}
        <article
          className="project-feature-card"
          onClick={() => onFocusCluster("monitor")}
          data-node-label="Kubernetes Monitoring"
        >
          <div className="project-card-header">
            <span className="project-card-num">PROJECT / 01</span>
            <span className="project-card-status">
              <span className="status-dot green" />
              COMPLETED &amp; VERIFIED
            </span>
          </div>

          <div className="project-banner-wrap">
            <img
              src="/kubernetes-monitoring.png"
              alt="Automated Kubernetes Deployment and Monitoring Platform Grafana Dashboard preview"
              className="project-banner-img"
              loading="lazy"
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

          <div className="project-sub">KUBERNETES • HELM • PROMETHEUS • GRAFANA</div>
          <h3 className="project-title">Automated Kubernetes Deployment &amp; Monitoring Platform</h3>

          {/* PROJECT OVERVIEW */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Project Overview</h4>
            <p className="project-desc">
              Built a resilient container orchestration and monitoring environment on Minikube. Deployed multi-replica
              microservice workloads, packaged application manifests using custom Helm charts, and configured full-stack
              cluster observability using Prometheus and Grafana with automated alert rules for pod restarts and failure scenarios.
            </p>
          </div>

          {/* PROBLEM SOLVED */}
          <div className="project-problem-box">
            <div className="project-problem-title">
              <AlertCircle size={14} />
              Problem Solved
            </div>
            <p className="project-problem-text">
              Containerized workloads running without centralized observability or orchestration suffer from undetected
              downtime, blind resource saturation, and slow manual diagnosis. This platform solved that by establishing automated
              telemetry scraping, visual metric dashboards, and proactive alerting paired with verified Kubernetes self-healing pod recovery.
            </p>
          </div>

          {/* TECH STACK */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Technology Stack</h4>
            <div className="project-tech-tags">
              <span className="project-tech-tag">Docker</span>
              <span className="project-tech-tag">Kubernetes</span>
              <span className="project-tech-tag">Minikube</span>
              <span className="project-tech-tag">Helm</span>
              <span className="project-tech-tag">Prometheus</span>
              <span className="project-tech-tag">Grafana</span>
              <span className="project-tech-tag">Alertmanager</span>
            </div>
          </div>

          {/* KEY IMPLEMENTATION DETAILS */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Key Implementation Details</h4>
            <ul className="project-checklist">
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Managed local Kubernetes cluster with Minikube and deployed containerized services with multi-replica deployments.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Packaged and deployed applications using custom Helm charts with upgrade and rollback support.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Configured kube-prometheus-stack for automated cluster and container time-series metrics collection.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Built custom Grafana observability dashboards tracking CPU, memory utilization, and container health.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Configured Alertmanager rules for pod restarts and verified Kubernetes self-healing through simulated pod failures.</span>
              </li>
            </ul>
          </div>

          {/* ACTIONS */}
          <div className="project-actions-row">
            <a
              href="https://github.com/Abhiraj2508/Kubernetes-Monitoring-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="project-repo-link"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub Repository <ExternalLink size={15} />
            </a>
          </div>
        </article>

        {/* =========================================================================
            FEATURED PROJECT 02: Automated CI/CD Pipeline for React Application
            ========================================================================= */}
        <article
          className="project-feature-card"
          onClick={() => onFocusCluster("cicd")}
          data-node-label="React CI/CD Pipeline"
        >
          <div className="project-card-header">
            <span className="project-card-num">PROJECT / 02</span>
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
              loading="lazy"
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
              <span>Smoke Test Verified</span>
            </div>
          </div>

          <div className="project-sub">REACT • JENKINS • DOCKER • NGINX • CI/CD</div>
          <h3 className="project-title">Automated CI/CD Pipeline for React Application</h3>

          {/* PROJECT OVERVIEW */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Project Overview</h4>
            <p className="project-desc">
              Designed and implemented an automated CI/CD pipeline for a React application using Jenkins, GitHub Webhooks,
              Docker, and Docker Hub. Configured automated source-code checkout, Docker image building, publishing to Docker Hub,
              container deployment, and post-deployment smoke testing.
            </p>
          </div>

          {/* PROBLEM SOLVED */}
          <div className="project-problem-box">
            <div className="project-problem-title">
              <AlertCircle size={14} />
              Problem Solved
            </div>
            <p className="project-problem-text">
              Manual build steps, inconsistent dependencies, and unverified hand-deployments introduce human errors, port conflicts,
              and slow release cycles. This pipeline provides zero-touch continuous deployment where any push automatically produces an
              optimized container, publishes to Docker Hub, and runs automated health checks.
            </p>
          </div>

          {/* WORKFLOW VISUALIZATION */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Automated Pipeline Workflow</h4>
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
          </div>

          {/* TECH STACK */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Technology Stack</h4>
            <div className="project-tech-tags">
              <span className="project-tech-tag">React</span>
              <span className="project-tech-tag">Vite</span>
              <span className="project-tech-tag">Jenkins</span>
              <span className="project-tech-tag">GitHub Webhooks</span>
              <span className="project-tech-tag">Docker</span>
              <span className="project-tech-tag">Docker Hub</span>
              <span className="project-tech-tag">Nginx</span>
              <span className="project-tech-tag">Git</span>
              <span className="project-tech-tag">CI/CD</span>
            </div>
          </div>

          {/* KEY IMPLEMENTATION DETAILS */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Key Implementation Details</h4>
            <ul className="project-checklist">
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Configured GitHub Webhook to automatically trigger Jenkins pipeline on every developer push event.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Automated source-code checkout and project validation inside isolated Jenkins runners.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Compiled production React application assets using Vite and packaged with Nginx into lightweight Docker images.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Tagged and published Docker images automatically to the public Docker Hub registry.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Automated container deployment (foodies-react-container on port 8086) with automated smoke testing.</span>
              </li>
            </ul>
          </div>

          {/* ACTIONS */}
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
              Docker Hub Image <ExternalLink size={15} />
            </a>
          </div>
        </article>

        {/* =========================================================================
            FEATURED PROJECT 03: Automated CI/CD Pipeline (Foodie)
            ========================================================================= */}
        <article
          className="project-feature-card"
          onClick={() => onFocusCluster("cicd")}
          data-node-label="CI/CD Pipeline"
        >
          <div className="project-card-header">
            <span className="project-card-num">PROJECT / 03</span>
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
              loading="lazy"
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
              <span>Smoke Test Verified</span>
            </div>
          </div>

          <div className="project-sub">DOCKER • JENKINS • GITHUB • CI/CD</div>
          <h3 className="project-title">Automated CI/CD Pipeline</h3>

          {/* PROJECT OVERVIEW */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Project Overview</h4>
            <p className="project-desc">
              Engineered an automated CI/CD pipeline using GitHub, Jenkins, and Docker to streamline application delivery.
              Configured automated git checkout, automated build execution, Docker image containerization, container deployment,
              and post-deployment smoke testing.
            </p>
          </div>

          {/* PROBLEM SOLVED */}
          <div className="project-problem-box">
            <div className="project-problem-title">
              <AlertCircle size={14} />
              Problem Solved
            </div>
            <p className="project-problem-text">
              Manual build and deployment procedures are repetitive, prone to environmental configuration drift, and lack
              systematic post-deploy validation. This project automated the software delivery steps into a repeatable pipeline with
              automated verification.
            </p>
          </div>

          {/* TECH STACK */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Technology Stack</h4>
            <div className="project-tech-tags">
              <span className="project-tech-tag">Docker</span>
              <span className="project-tech-tag">Jenkins</span>
              <span className="project-tech-tag">GitHub</span>
              <span className="project-tech-tag">Linux</span>
              <span className="project-tech-tag">Shell Scripting</span>
              <span className="project-tech-tag">CI/CD</span>
            </div>
          </div>

          {/* KEY IMPLEMENTATION DETAILS */}
          <div className="project-section-block">
            <h4 className="project-section-heading">Key Implementation Details</h4>
            <ul className="project-checklist">
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Automated source code checkout triggered by GitHub commits and branch updates.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Automated application build, verification, and testing inside isolated runners.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Docker container image packaging, optimization, and local container deployment.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Automated post-deployment smoke testing script verifying container health.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="check-icon" />
                <span>Artifact publishing and image management with Docker Hub registry.</span>
              </li>
            </ul>
          </div>

          {/* ACTIONS */}
          <div className="project-actions-row">
            <a
              href="https://github.com/Vanshu006/Foodie"
              target="_blank"
              rel="noopener noreferrer"
              className="project-repo-link"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub Repository <ExternalLink size={15} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
