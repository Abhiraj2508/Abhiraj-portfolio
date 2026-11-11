"use client";

import React from "react";
import { NET_NODES, NET_CONN_INFO } from "@/data/portfolioData";

interface NetworkMapSectionProps {
  netInfo: string;
  setNetInfo: (info: string) => void;
}

export default function NetworkMapSection({
  netInfo,
  setNetInfo,
}: NetworkMapSectionProps) {
  return (
    <section id="network" className="section">
      <div className="section-head">
        <div className="eyebrow">07 · Network Map</div>
        <h2 className="section-title">Request lifecycle</h2>
        <p className="section-sub">Click any connection to inspect protocol, port and response.</p>
      </div>
      <div className="netmap">
        {NET_NODES.map((n, i) => (
          <React.Fragment key={n}>
            <div className="net-node">
              <div className="box">{n}</div>
            </div>
            {i < NET_NODES.length - 1 && (
              <div
                className="net-conn"
                onClick={() => {
                  const info = NET_CONN_INFO[i];
                  setNetInfo(
                    `${info.proto} · port ${info.port} — request: ${info.request} → response: ${info.response} [${info.status}]`
                  );
                }}
                data-node-label={NET_CONN_INFO[i].proto}
              >
                <span className="packet" style={{ animationDelay: `${i * 0.3}s` }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div id="net-info">
        <b>{netInfo}</b>
      </div>
    </section>
  );
}

