"use client";

import * as React from "react";
import { I } from "@/lib/icons";

const HISTORY = [
  { id: "ax-2026-04", at: "2026-05-01 03:00 UTC", who: "system",        range: "Apr 2026",     rows: 1284, hash: "e9c1a4f7b8d2c531a9e6b3d8" },
  { id: "ax-2026-q1", at: "2026-04-04 14:20 UTC", who: "Maya Chen",     range: "Q1 2026",      rows: 3940, hash: "8c1e4f2b9d7c531a4e8b3d1f" },
  { id: "ax-2026-03", at: "2026-04-01 03:00 UTC", who: "system",        range: "Mar 2026",     rows: 1206, hash: "b3c7e9f1a4d2c531e8a6b9d7" },
  { id: "ax-2025-fy", at: "2026-01-12 11:48 UTC", who: "Devon Eastlake",range: "TY 2025 full", rows:18420, hash: "c1d4e7a3b9f2c531a8e6b2d4" },
];

const FORMATS = [
  { id: "csv",     label: "CSV",        sub: "Spreadsheet-friendly · one event per row" },
  { id: "jsonl",   label: "NDJSON",     sub: "Newline-delimited JSON · ingest-ready" },
  { id: "parquet", label: "Parquet",    sub: "Columnar · large windows · DuckDB / Snowflake" },
];

export default function AuditExportPage() {
  const [range, setRange] = React.useState("This month");
  const [format, setFormat] = React.useState("csv");
  const [signed, setSigned] = React.useState(true);

  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Export the audit log</p>
        <h2 className="pb-h3" style={{ marginBottom: 6 }}>Tamper-evident archive for SOC 2 / CRA reviews</h2>
        <p className="pb-small" style={{ color: "var(--ink-2)", marginBottom: 18 }}>
          Each line in the audit log is hash-chained to the previous line. Exports include the
          full chain plus a manifest signed with the firm's KMS key.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <label className="col" style={{ gap: 6 }}>
            <span className="pb-label">Time range</span>
            <select
              className="pb-input"
              value={range}
              onChange={e => setRange(e.target.value)}
            >
              {["This month", "Last month", "This quarter", "Last quarter", "Year to date", "TY 2025 full", "Custom…"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>

          <label className="col" style={{ gap: 6 }}>
            <span className="pb-label">Recipient</span>
            <input className="pb-input" defaultValue="audit@eastlakecho.ca" />
          </label>
        </div>

        <p className="pb-label" style={{ marginBottom: 8 }}>Format</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
          {FORMATS.map(f => (
            <label key={f.id} className={`radio-row ${format === f.id ? "selected" : ""}`} style={{ flexDirection: "column", alignItems: "stretch", gap: 4 }}>
              <div className="row" style={{ gap: 10 }}>
                <input type="radio" name="fmt" checked={format === f.id} onChange={() => setFormat(f.id)} />
                <span style={{ fontSize: 13, color: "var(--ink)" }}>{f.label}</span>
              </div>
              <span className="pb-meta" style={{ marginLeft: 26 }}>{f.sub}</span>
            </label>
          ))}
        </div>

        <label
          className="row"
          style={{
            gap: 10, padding: 12,
            border: "1px solid var(--green-line)",
            background: "var(--green-soft)",
            borderRadius: "var(--r-2)",
            cursor: "pointer",
          }}
        >
          <input type="checkbox" checked={signed} onChange={() => setSigned(v => !v)} />
          <span style={{ fontSize: 13, color: "var(--ink)" }}>
            Include signed manifest <span className="mute">(adds <span className="pb-mono">manifest.json</span> + <span className="pb-mono">manifest.sig</span>)</span>
          </span>
        </label>

        <div className="row" style={{ marginTop: 18 }}>
          <span className="pb-meta">Estimated size: ~ 2.4 MB · 1,284 events · 6 clients touched</span>
          <button className="pb-btn primary right"><I.Download size={13} /> Generate export</button>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Scheduled exports</p>
        <div className="row" style={{ padding: 12, border: "1px solid var(--line)", borderRadius: "var(--r-2)", gap: 12 }}>
          <span
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--paper-2)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <I.Clock size={15} />
          </span>
          <div className="col grow" style={{ gap: 2 }}>
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>Monthly archive — 1st of each month, 03:00 UTC</span>
            <span className="pb-meta">CSV + signed manifest · delivered to <span className="pb-mono">audit@eastlakecho.ca</span></span>
          </div>
          <span className="pb-chip green"><I.Check size={11} /> Enabled</span>
          <button className="pb-btn sm">Edit</button>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Recent exports</p>
        <table className="pb-table">
          <thead>
            <tr>
              <th>Export ID</th>
              <th>Generated</th>
              <th>Range</th>
              <th>Initiated by</th>
              <th className="num">Events</th>
              <th>Manifest sha256</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {HISTORY.map(h => (
              <tr key={h.id} style={{ cursor: "default" }}>
                <td className="mono" style={{ color: "var(--ink)" }}>{h.id}</td>
                <td className="mono mute">{h.at}</td>
                <td className="mute">{h.range}</td>
                <td className="mute">{h.who}</td>
                <td className="num pb-mono">{h.rows.toLocaleString()}</td>
                <td className="mono mute" style={{ fontSize: 11 }}>{h.hash}…</td>
                <td><I.Download size={13} stroke="var(--ink-3)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
