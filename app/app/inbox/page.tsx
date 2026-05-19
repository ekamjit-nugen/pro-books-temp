"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/topbar";
import { FLAGS_INBOX, avatarBg } from "@/lib/data";
import { I } from "@/lib/icons";

const TABS = ["All", "Red", "Yellow", "HST mismatch", "Awaiting client", "Mine"];

const KIND_LABEL: Record<string, string> = {
  low_confidence: "Low confidence",
  hst_mismatch: "HST mismatch",
  slip_missing_field: "Slip field",
  intake_answer: "Intake answer",
};

export default function InboxPage() {
  const router = useRouter();
  const [tab, setTab] = React.useState("All");

  const filtered = FLAGS_INBOX.filter(f => {
    if (tab === "All") return true;
    if (tab === "Red") return f.color_flag === "red";
    if (tab === "Yellow") return f.color_flag === "amber";
    if (tab === "HST mismatch") return f.kind === "hst_mismatch";
    if (tab === "Awaiting client") return f.kind === "intake_answer" || f.kind === "low_confidence";
    if (tab === "Mine") return f.assignee === "MC";
    return true;
  });

  return (
    <>
      <Topbar
        crumbs={[{ label: "Inbox" }]}
        right={
          <>
            <button className="pb-btn sm"><I.Filter size={13} /> Filter</button>
            <button className="pb-btn primary sm"><I.Plus size={13} /> New period</button>
          </>
        }
      />

      <div style={{ padding: "24px 32px 40px", flex: 1 }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Cross-client triage</p>
            <h1 className="pb-h2">
              Things that need <em style={{ fontStyle: "italic", color: "var(--green)" }}>you</em>
              <span className="mute" style={{ fontFamily: "var(--font-sans)", fontSize: 14, marginLeft: 12 }}>
                — Mon, May 18 · 09:42 EDT
              </span>
            </h1>
          </div>
        </div>

        <div
          className="stat-strip"
          style={{ gridTemplateColumns: "repeat(5, 1fr)", marginBottom: 22 }}
        >
          <div className="stat-card">
            <div className="row" style={{ gap: 8 }}><span className="pb-dot red" /><span className="l">Red flags</span></div>
            <div className="v">9</div>
            <div className="pb-meta">across 5 clients</div>
          </div>
          <div className="stat-card">
            <div className="row" style={{ gap: 8 }}><span className="pb-dot amber" /><span className="l">Yellow flags</span></div>
            <div className="v">14</div>
            <div className="pb-meta">across 7 clients</div>
          </div>
          <div className="stat-card">
            <span className="l">HST mismatches</span>
            <div className="v">2</div>
            <div className="pb-meta">Δ &gt; $5.00</div>
          </div>
          <div className="stat-card">
            <span className="l">Awaiting client</span>
            <div className="v">6</div>
            <div className="pb-meta">3 nudged</div>
          </div>
          <div className="stat-card">
            <span className="l">Idle &gt; 48h</span>
            <div className="v">3</div>
            <div className="pb-meta">needs reassign</div>
          </div>
        </div>

        <div className="pb-card" style={{ overflow: "hidden" }}>
          <div className="pb-tabs" style={{ padding: "0 14px" }}>
            {TABS.map(t => (
              <button key={t} className={t === tab ? "active" : ""} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
            <div className="grow" />
          </div>

          <table className="pb-table">
            <thead>
              <tr>
                <th style={{ width: 32 }}></th>
                <th>Client</th>
                <th>Target</th>
                <th>Kind</th>
                <th>Note</th>
                <th>Age</th>
                <th>Assignee</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr
                  key={f.id}
                  className={f.color_flag === "red" ? "flagged-red" : "flagged-amber"}
                  onClick={() => router.push(`/app/clients/${f.slug}`)}
                >
                  <td>
                    <span className={`pb-dot ${f.color_flag === "red" ? "red" : "amber"}`} />
                  </td>
                  <td>
                    <div className="row" style={{ gap: 8 }}>
                      <span className="pb-avatar" style={{ background: avatarBg(f.color) }}>{f.initials}</span>
                      <span style={{ color: "var(--ink)" }}>{f.client}</span>
                    </div>
                  </td>
                  <td className="mono" style={{ color: "var(--ink)" }}>{f.target}</td>
                  <td>
                    <span className={`pb-chip ${f.color_flag === "red" ? "red" : "amber"}`}>
                      {KIND_LABEL[f.kind] ?? f.kind}
                    </span>
                  </td>
                  <td className="mute" style={{ maxWidth: 320 }}>{f.note}</td>
                  <td className="mono mute">{f.age}</td>
                  <td>
                    <span className="pb-avatar" style={{ background: "var(--paper-3)" }}>{f.assignee}</span>
                  </td>
                  <td><I.Chevron size={14} stroke="var(--ink-3)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
