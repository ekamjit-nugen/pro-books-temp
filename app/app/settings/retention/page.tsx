"use client";

import { I } from "@/lib/icons";

const POLICIES = [
  { kind: "Source PDFs · receipts/invoices",     years: 7,  basis: "CRA T2 standard" },
  { kind: "Bank statements & reconciliations",    years: 7,  basis: "CRA T2 standard" },
  { kind: "T1 personal returns + supporting",     years: 6,  basis: "CRA T1 standard (6yr after filing)" },
  { kind: "Locked period snapshots (Excel)",      years: 10, basis: "Firm policy · partner extended" },
  { kind: "Audit log",                            years: 10, basis: "Firm policy · partner extended" },
  { kind: "Client messages & flags",              years: 7,  basis: "CRA T2 standard" },
  { kind: "Magic-link request logs",              years: 1,  basis: "Privacy-by-default (PIPEDA)" },
];

export default function RetentionPage() {
  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Retention policy</p>
        <h2 className="pb-h3" style={{ marginBottom: 6 }}>What we keep, for how long, and why</h2>
        <p className="pb-small" style={{ color: "var(--ink-2)", marginBottom: 18 }}>
          Files past their retention window are purged on the 1st of each month and the purge is
          written to the audit log. Restore window: 30 days.
        </p>

        <table className="pb-table">
          <thead>
            <tr><th>Data class</th><th className="num">Retain</th><th>Legal / firm basis</th><th></th></tr>
          </thead>
          <tbody>
            {POLICIES.map(p => (
              <tr key={p.kind} style={{ cursor: "default" }}>
                <td style={{ color: "var(--ink)" }}>{p.kind}</td>
                <td className="num pb-mono">{p.years} {p.years === 1 ? "year" : "years"}</td>
                <td className="mute">{p.basis}</td>
                <td><span className="linkish" style={{ fontSize: 12 }}>Edit</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="row"
          style={{
            marginTop: 18, padding: "10px 14px",
            background: "var(--paper-2)", border: "1px solid var(--line)",
            borderRadius: "var(--r-2)", gap: 10,
          }}
        >
          <I.History size={14} stroke="var(--ink-3)" />
          <span className="pb-small" style={{ color: "var(--ink-2)" }}>
            Last scheduled purge: <span className="pb-mono">2026-05-01 03:00 UTC</span> · 124 files purged · 0 errors
          </span>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Encryption · KMS</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">At-rest encryption</span>
            <div className="row" style={{ gap: 6 }}>
              <I.Lock size={13} stroke="var(--leaf)" />
              <span style={{ fontSize: 13.5, color: "var(--ink)" }}>AES-256-GCM</span>
            </div>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">In-transit encryption</span>
            <div className="row" style={{ gap: 6 }}>
              <I.Lock size={13} stroke="var(--leaf)" />
              <span style={{ fontSize: 13.5, color: "var(--ink)" }}>TLS 1.3 · HSTS 1 year</span>
            </div>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">Key region</span>
            <span className="pb-mono" style={{ fontSize: 13, color: "var(--ink)" }}>ca-central-1 (Montréal)</span>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="pb-label">Key rotation</span>
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>Annual · automatic</span>
          </div>
        </div>

        <div
          className="row"
          style={{
            marginTop: 16, padding: 14,
            background: "var(--paper-2)", border: "1px solid var(--line)",
            borderRadius: "var(--r-2)", gap: 12,
          }}
        >
          <I.Shield size={16} stroke="var(--green)" />
          <div className="col grow" style={{ gap: 2 }}>
            <span style={{ fontSize: 13, color: "var(--ink)" }}>Current key</span>
            <span className="pb-mono" style={{ fontSize: 11.5, color: "var(--ink-2)", wordBreak: "break-all" }}>
              arn:aws:kms:ca-central-1:248812:key/8e3a-1d44-9f78-2a17-cce4b8d22f01
            </span>
          </div>
          <button className="pb-btn sm">Rotate now</button>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Customer-managed keys (BYOK)</p>
        <p className="pb-small" style={{ color: "var(--ink-2)", marginBottom: 14 }}>
          Bring your own AWS KMS key. ProBooks uses it for envelope encryption of every document
          and snapshot; revoking it makes data unreadable within the next rotation cycle.
        </p>
        <div className="row" style={{ gap: 8 }}>
          <button className="pb-btn">Connect AWS account</button>
          <span className="pb-meta">Not configured · using firm-managed key</span>
        </div>
      </div>
    </>
  );
}
