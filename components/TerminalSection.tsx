"use client";

import React from "react";

export interface TerminalItem {
  cmd?: string;
  text: string;
  cls?: string;
}

interface TerminalSectionProps {
  isConsoleFlashing: boolean;
  termScrollRef: React.RefObject<HTMLDivElement | null>;
  termInputRef: React.RefObject<HTMLInputElement | null>;
  termHistory: TerminalItem[];
  termCwd: string;
  termInput: string;
  setTermInput: (val: string) => void;
  cmdHistory: string[];
  cmdHistoryIdx: number;
  setCmdHistoryIdx: (idx: number | ((prev: number) => number)) => void;
  handleTermSubmit: (e: React.FormEvent) => void;
}

export default function TerminalSection({
  isConsoleFlashing,
  termScrollRef,
  termInputRef,
  termHistory,
  termCwd,
  termInput,
  setTermInput,
  cmdHistory,
  cmdHistoryIdx,
  setCmdHistoryIdx,
  handleTermSubmit,
}: TerminalSectionProps) {
  return (
    <section id="terminal-section" className="section">
      <div className="section-head">
        <div className="eyebrow">01 · System Shell</div>
        <h2 className="section-title">The whole site, as a shell</h2>
        <p className="section-sub">
          Type <b style={{ color: "var(--purple-light)" }}>help</b> to see every command. Try{" "}
          <b style={{ color: "var(--purple-light)" }}>neofetch</b>,{" "}
          <b style={{ color: "var(--purple-light)" }}>ls</b>, or{" "}
          <b style={{ color: "var(--purple-light)" }}>kubectl get pods</b> — commands here also drive the 3D world up
          top.
        </p>
      </div>
      <div id="term-window" className={isConsoleFlashing ? "flash" : ""}>
        <div id="term-titlebar">
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
          <span className="path">abhiraj@devops: ~</span>
        </div>
        <div id="terminal" ref={termScrollRef} onClick={() => termInputRef.current?.focus()}>
          {termHistory.map((item, idx) => (
            <div key={idx} className={`tline ${item.cls || ""}`}>
              {item.text}
            </div>
          ))}
        </div>
        <form id="term-input-row" onSubmit={handleTermSubmit}>
          <span id="term-prompt-lbl">
            abhiraj@devops:<span style={{ color: "var(--term-dir)" }}>{termCwd}</span>$
          </span>
          <input
            id="term-input"
            ref={termInputRef}
            value={termInput}
            onChange={(e) => setTermInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                if (cmdHistoryIdx > 0) {
                  const nextIdx = cmdHistoryIdx - 1;
                  setCmdHistoryIdx(nextIdx);
                  setTermInput(cmdHistory[nextIdx] || "");
                }
                e.preventDefault();
              } else if (e.key === "ArrowDown") {
                if (cmdHistoryIdx < cmdHistory.length - 1) {
                  const nextIdx = cmdHistoryIdx + 1;
                  setCmdHistoryIdx(nextIdx);
                  setTermInput(cmdHistory[nextIdx] || "");
                } else {
                  setCmdHistoryIdx(cmdHistory.length);
                  setTermInput("");
                }
                e.preventDefault();
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
        <div className="term-hint">
          try: <b>help</b> · <b>neofetch</b> · <b>ls</b> · <b>cat resume.pdf</b> · <b>man devops</b> ·{" "}
          <b>sudo hire abhiraj</b>
        </div>
      </div>
    </section>
  );
}

