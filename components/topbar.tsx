"use client";

import * as React from "react";
import { I } from "@/lib/icons";

type Crumb = { label: string; href?: string };

export function Topbar({ crumbs = [], right }: { crumbs?: Crumb[]; right?: React.ReactNode }) {
  return (
    <div className="pb-topbar">
      <div className="row" style={{ gap: 8 }}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <I.Chevron size={12} stroke="var(--ink-4)" />}
            <span style={{ fontSize: 13, color: i === crumbs.length - 1 ? "var(--ink)" : "var(--ink-3)" }}>
              {c.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="grow row" style={{ justifyContent: "center", maxWidth: 420, margin: "0 auto" }}>
        <div
          className="row"
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-2)",
            padding: "0 10px",
            height: 32,
            width: "100%",
            gap: 8,
          }}
        >
          <I.Search size={14} stroke="var(--ink-3)" />
          <input
            placeholder="Search clients, transactions, slips…"
            style={{
              border: 0, outline: "none", background: "transparent",
              fontSize: 12.5, color: "var(--ink-2)", flex: 1,
            }}
          />
          <span className="pb-kbd">⌘K</span>
        </div>
      </div>

      <div className="row right" style={{ gap: 8 }}>
        {right}
        <button className="pb-btn ghost sm" aria-label="Notifications">
          <I.Bell size={14} />
        </button>
      </div>
    </div>
  );
}
