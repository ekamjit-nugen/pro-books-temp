"use client";

import { I } from "@/lib/icons";
import { FIRM } from "@/lib/data";

export default function FirmProfilePage() {
  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Firm profile</p>

        <div className="row" style={{ gap: 16, marginBottom: 20 }}>
          <span
            style={{
              width: 72, height: 72, borderRadius: 14,
              background: "var(--green)", color: "oklch(96% 0.02 85)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-serif)", fontSize: 30, fontStyle: "italic",
            }}
          >
            E&amp;C
          </span>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-serif" style={{ fontSize: 24 }}>{FIRM.name}</span>
            <span className="pb-meta">{FIRM.tagline} · {FIRM.city}</span>
          </div>
          <button className="pb-btn right"><I.Pencil size={13} /> Edit</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {[
            { label: "Legal name",         value: "Eastlake & Cho Chartered Professional Accountants Inc." },
            { label: "Operating name",     value: "Eastlake & Cho CPA" },
            { label: "CRA business number",value: "129488462RT0001", mono: true },
            { label: "GST/HST account",    value: "129488462RT0002", mono: true },
            { label: "Default year-end",   value: "Dec 31" },
            { label: "Default currency",   value: "CAD ($)" },
            { label: "Time zone",          value: "America/Toronto (EDT, UTC−4)" },
            { label: "Fiscal calendar",    value: "Gregorian, Mon-start weeks" },
          ].map(f => (
            <div key={f.label} className="col" style={{ gap: 4 }}>
              <span className="pb-label">{f.label}</span>
              <span className={f.mono ? "pb-mono" : ""} style={{ fontSize: 13.5, color: "var(--ink)" }}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Mailing address</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">Street</span>
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>Suite 814 · 250 The Esplanade</span>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">City / Province</span>
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>Toronto, ON M5A 1J2</span>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">Phone</span>
            <span className="pb-mono" style={{ fontSize: 13.5, color: "var(--ink)" }}>+1 (416) 555 0184</span>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">Reply-to email</span>
            <span className="pb-mono" style={{ fontSize: 13.5, color: "var(--ink)" }}>hello@eastlakecho.ca</span>
          </div>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Engagement defaults</p>
        <p className="pb-small" style={{ color: "var(--ink-2)", marginBottom: 14 }}>
          Used as fallback when a new client is onboarded. Override per-client from the workspace.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { l: "Bookkeeping close target", v: "5 business days after period end" },
            { l: "HST filing cadence",       v: "Quarterly · CRA standard" },
            { l: "Document retention",       v: "7 years · CRA T2 standard" },
            { l: "Client portal locale",     v: "en-CA · fr-CA fallback" },
            { l: "T1 intake template",       v: "Default · 10 questions" },
            { l: "Period approval policy",   v: "Partner sign-off required" },
          ].map(f => (
            <div key={f.l} className="col" style={{ gap: 4 }}>
              <span className="pb-label">{f.l}</span>
              <span style={{ fontSize: 13, color: "var(--ink)" }}>{f.v}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
