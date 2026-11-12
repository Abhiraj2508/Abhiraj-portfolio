"use client";

import React from "react";
import { Info, Play, RotateCcw } from "lucide-react";
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
  const isFinished = deployStepIndex >= DEPLOY_STEPS.length;

  return (
    <section id="pipeline" className="section">
      <div className="section-head">
        <div className="eyebrow">06 · Interactive Pipeline Simulator</div>
        <h2 className="section-title">Interactive CI/CD Pipeline Simulator.</h2>
        <p className="section-sub">
          Client-side visual demonstration of the automated delivery workflow used across my projects — from git push detection to container smoke testing.
        </p>
      </div>

      {/* SIMULATION NOTICE BANNER */}
      <div className="sim-disclaimer-banner" role="region" aria-label="Simulation Notice">
        <div className="sim-badge">
          <Info size={13} aria-hidden="true" />
          <span>INTERACTIVE SIMULATION</span>
        </div>
        <p className="sim-disclaimer-text">
          <strong>Notice:</strong> This is an interactive educational demonstration running in your browser. It illustrates the pipeline execution stages and does not trigger real Jenkins or Kubernetes production infrastructure.
        </p>
      </div>

      <div className="deploy-panel">
        <div className="deploy-top">
          <div className="deploy-pipeline-name">
            Pipeline: <span>Foodies-React / Automated Delivery Workflow (Simulation)</span>
          </div>
          <button
            className="btn primary deploy-trigger-btn"
            onClick={triggerDeploy}
            disabled={deploying}
            aria-label={
              deploying
                ? "Simulation in progress"
                : isFinished
                ? "Rerun pipeline simulation"
                : "Run pipeline simulation"
            }
          >
            {deploying ? (
              <>
                <span className="btn-spinner" />
                [ Simulating Pipeline... ]
              </>
            ) : isFinished ? (
              <>
                <RotateCcw size={14} />
                [ Rerun Simulation ]
              </>
            ) : (
              <>
                <Play size={14} />
                [ Run Pipeline Simulation ]
              </>
            )}
          </button>
        </div>

        <div id="deploy-steps" role="list" aria-label="Pipeline Stages">
          {DEPLOY_STEPS.map((step, idx) => {
            const isActive = deployStepIndex === idx;
            const isDone = deployStepIndex > idx;
            return (
              <div
                key={step}
                role="listitem"
                className={`dstep ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              >
                <span className="dnum">{`0${idx + 1}`}</span>
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
