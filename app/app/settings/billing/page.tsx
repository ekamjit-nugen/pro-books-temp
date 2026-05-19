"use client";

import { I } from "@/lib/icons";

const INVOICES = [
  { id: "PB-2026-05", date: "2026-05-01", total: 384.00, hst: 49.92, status: "paid"   as const, period: "May 2026" },
  { id: "PB-2026-04", date: "2026-04-01", total: 384.00, hst: 49.92, status: "paid"   as const, period: "Apr 2026" },
  { id: "PB-2026-03", date: "2026-03-01", total: 320.00, hst: 41.60, status: "paid"   as const, period: "Mar 2026" },
  { id: "PB-2026-02", date: "2026-02-01", total: 320.00, hst: 41.60, status: "paid"   as const, period: "Feb 2026" },
  { id: "PB-2026-01", date: "2026-01-01", total: 320.00, hst: 41.60, status: "paid"   as const, period: "Jan 2026" },
  { id: "PB-2025-12", date: "2025-12-01", total: 320.00, hst: 41.60, status: "paid"   as const, period: "Dec 2025" },
];

const STATUS_CHIP: Record<typeof INVOICES[number]["status"], { tint: string; label: string }> = {
  paid: { tint: "green", label: "Paid" },
};

export default function BillingPage() {
  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <div className="row" style={{ alignItems: "flex-start", gap: 18 }}>
          <div className="col" style={{ gap: 4 }}>
            <p className="pb-eyebrow">Current plan</p>
            <h2 className="pb-h2" style={{ fontSize: 26 }}>
              Firm · <em style={{ fontStyle: "italic", color: "var(--green)" }}>Practice</em>
            </h2>
            <p className="pb-small" style={{ color: "var(--ink-2)", maxWidth: 460 }}>
              Up to 20 active clients, unlimited periods, T1 intake builder, audit retention 10 years,
              SOC 2 Type II reports on demand.
            </p>
          </div>

          <div className="col right" style={{ alignItems: "flex-end", gap: 6 }}>
            <div className="row" style={{ gap: 6, alignItems: "baseline" }}>
              <span className="pb-serif" style={{ fontSize: 38, letterSpacing: "-0.02em" }}>$384</span>
              <span className="pb-meta">CAD / month + HST</span>
            </div>
            <span className="pb-meta">Renews <span className="pb-mono">2026-06-01</span></span>
            <button className="pb-btn sm">Change plan</button>
          </div>
        </div>

        <div
          className="row"
          style={{
            marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)",
            gap: 28,
          }}
        >
          <div className="col" style={{ gap: 2 }}>
            <span className="pb-label">Active clients</span>
            <span className="pb-serif" style={{ fontSize: 20 }}>12 / 20</span>
          </div>
          <div className="col" style={{ gap: 2 }}>
            <span className="pb-label">Staff seats</span>
            <span className="pb-serif" style={{ fontSize: 20 }}>4 / unlimited</span>
          </div>
          <div className="col" style={{ gap: 2 }}>
            <span className="pb-label">Storage used</span>
            <span className="pb-serif" style={{ fontSize: 20 }}>3.4 GB / 50 GB</span>
          </div>
          <div className="col" style={{ gap: 2 }}>
            <span className="pb-label">CRA submissions</span>
            <span className="pb-serif" style={{ fontSize: 20 }}>9 ytd</span>
          </div>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Payment method</p>
        <div className="row" style={{ gap: 14 }}>
          <span
            style={{
              width: 48, height: 32, borderRadius: 6,
              background: "var(--ink)", color: "oklch(96% 0.02 85)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, letterSpacing: "-0.02em",
            }}
          >
            visa
          </span>
          <div className="col" style={{ gap: 2 }}>
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>Visa · ending <span className="pb-mono">4128</span></span>
            <span className="pb-meta">Maya Chen · exp <span className="pb-mono">08/28</span></span>
          </div>
          <div className="row right" style={{ gap: 8 }}>
            <button className="pb-btn sm"><I.Pencil size={13} /> Update card</button>
            <button className="pb-btn sm">Switch to PAD</button>
          </div>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <div className="row" style={{ marginBottom: 14 }}>
          <p className="pb-eyebrow">Invoices · last 6 months</p>
          <button className="pb-btn sm right"><I.Download size={13} /> Export CSV</button>
        </div>
        <table className="pb-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Period</th>
              <th className="num">Subtotal</th>
              <th className="num">HST</th>
              <th className="num">Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map(inv => (
              <tr key={inv.id} style={{ cursor: "default" }}>
                <td className="mono" style={{ color: "var(--ink)" }}>{inv.id}</td>
                <td className="mono mute">{inv.date}</td>
                <td className="mute">{inv.period}</td>
                <td className="num pb-mono">${(inv.total - inv.hst).toFixed(2)}</td>
                <td className="num pb-mono mute">${inv.hst.toFixed(2)}</td>
                <td className="num pb-mono" style={{ color: "var(--ink)" }}>${inv.total.toFixed(2)}</td>
                <td><span className={`pb-chip ${STATUS_CHIP[inv.status].tint}`}>{STATUS_CHIP[inv.status].label}</span></td>
                <td><I.Download size={13} stroke="var(--ink-3)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
