"use client";

import React from "react";
import { DEPLOY_STEPS } from "@/data/portfolioData";

interface PipelineSimulatorSectionProps {
  deploying: boolean;
  deployStepIndex: number;
  triggerDeploy: () => void;
}

export default function PipelineSimulatorSection({
  deploying,
  deployStepIndex,
  triggerDeploy,
}: PipelineSimulatorSectionProps) {
  return (
    <section id="pipeline" className="section">
      <div className="section-head">
        <div className="eyebrow">06 · Deployment Control</div>
        <h2 className="section-title">Trigger a deployment</h2>
        <p className="section-sub">
          This simulates the exact pipeline shape used in his DevOps project — Jenkins, automated testing,
          Docker, Kubernetes.
        </p>
      </div>
      <div className="deploy-panel">
        <div className="deploy-top">
          <div style={{ fontSize: "12px", color: "var(--muted)" }}>
            Pipeline: <span style={{ color: "var(--text)" }}>Foodie Application / CI-CD</span>
          </div>
          <button className="btn primary" onClick={triggerDeploy} disabled={deploying}>
            {deploying ? "[ Deploying... ]" : deployStepIndex >= DEPLOY_STEPS.length ? "[ Redeploy ]" : "[ Deploy ]"}
          </button>
        </div>
        <div id="deploy-steps">
          {DEPLOY_STEPS.map((step, idx) => {
            const isActive = deployStepIndex === idx;
            const isDone = deployStepIndex > idx;
            return (
              <div
                key={step}
                className={`dstep ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              >
                <span className="dname">{step}</span>
                <span className="dstatus">
                  {isActive ? "running" : isDone ? (idx === DEPLOY_STEPS.length - 1 ? "success" : "done") : "pending"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

