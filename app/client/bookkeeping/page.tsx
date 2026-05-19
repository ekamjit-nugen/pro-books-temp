"use client";

import Link from "next/link";
import { I } from "@/lib/icons";
import { PAST_REPORTS } from "@/lib/data";

const RECEIPTS = [
  { id: "t5",  vendor: "De Mello Palheta",       amount: 928.00, kind: "category" as const },
  { id: "t6",  vendor: "Greg's Auto Detail",     amount: 185.00, kind: "personal" as const },
  { id: "t12", vendor: "The Coffee Equipment Co.", amount: 314.50, kind: "category" as const },
];

const REVIEW = [
  { id: "t8",  vendor: "Indigo Books",  amount: 82.40,  note: "Reading material — for café?" },
  { id: "t14", vendor: "Tim Hortons #2841", amount: 27.65, note: "Staff meeting · expense?" },
];

export default function BookkeepingHomePage() {
  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 14 }}>
          <Link href="/client" style={{ color: "var(--ink-2)" }}>
            <I.ArrowL size={18} />
          </Link>
          <span className="grow" style={{ fontSize: 13, color: "var(--ink-2)", textAlign: "center" }}>
            Bookkeeping
          </span>
          <I.More size={16} stroke="var(--ink-3)" strokeWidth={2.5} />
        </div>

        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>May 2026 · close target Fri 22</p>
        <h1 className="pb-h2" style={{ fontSize: 24 }}>
          <em style={{ fontStyle: "italic", color: "var(--green)" }}>72%</em> ready to close
        </h1>
        <div className="row" style={{ gap: 8, marginTop: 12 }}>
          <div className="pb-progress tall" style={{ flex: 1 }}>
            <div style={{ width: "72%" }} />
          </div>
        </div>
        <p className="pb-small" style={{ color: "var(--ink-3)", marginTop: 8 }}>
          Maya is waiting on you for 5 items. ~2 min.
        </p>
      </header>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Action cards */}
        <Link
          href={`/client/bookkeeping/flag/${RECEIPTS[0].id}`}
          style={{
            display: "block",
            padding: 16,
            border: "1px solid var(--red-line)",
            background: "var(--red-soft)",
            borderRadius: "var(--r-3)",
            color: "var(--ink)",
          }}
        >
          <div className="row" style={{ marginBottom: 6 }}>
            <span className="pb-dot red" />
            <span className="pb-label" style={{ color: "var(--red)" }}>3 receipts to confirm</span>
          </div>
          <p style={{ fontSize: 14.5, color: "var(--ink)", marginBottom: 4 }}>
            We're not sure how to categorize these.
          </p>
          <div className="col" style={{ gap: 4, marginTop: 8 }}>
            {RECEIPTS.map(r => (
              <div key={r.id} className="row" style={{ gap: 8, fontSize: 12.5 }}>
                <I.Receipt size={12} stroke="var(--ink-3)" />
                <span>{r.vendor}</span>
                <span className="right pb-mono mute">${r.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: 12, color: "var(--red)" }}>
            <span style={{ fontSize: 12.5 }}>Start →</span>
          </div>
        </Link>

        <div
          style={{
            padding: 16,
            border: "1px solid var(--amber-line)",
            background: "var(--amber-soft)",
            borderRadius: "var(--r-3)",
            color: "var(--ink)",
          }}
        >
          <div className="row" style={{ marginBottom: 6 }}>
            <span className="pb-dot amber" />
            <span className="pb-label" style={{ color: "oklch(40% 0.12 75)" }}>2 transactions to review</span>
          </div>
          <div className="col" style={{ gap: 4, marginTop: 6 }}>
            {REVIEW.map(r => (
              <div key={r.id} className="row" style={{ gap: 8, fontSize: 12.5 }}>
                <I.Receipt size={12} stroke="var(--ink-3)" />
                <span>{r.vendor}</span>
                <span className="right pb-mono mute">${r.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload dropzone */}
        <Link
          href="/client/bookkeeping/upload"
          style={{
            display: "block",
            padding: 22,
            border: "2px dashed var(--line-strong)",
            borderRadius: "var(--r-3)",
            textAlign: "center",
            color: "var(--ink-2)",
            background: "var(--paper-2)",
          }}
        >
          <I.Upload size={20} />
          <p style={{ fontSize: 14, color: "var(--ink)", marginTop: 8, marginBottom: 2 }}>
            Drag receipts here, or tap to add
          </p>
          <p className="pb-meta">PDF, JPG, HEIC · or forward email to receipts@eastlakecho.ca</p>
        </Link>

        {/* Past reports */}
        <div className="pb-card" style={{ padding: 16, marginTop: 4 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 12 }}>Past closed periods</p>
          <div className="col" style={{ gap: 12 }}>
            {PAST_REPORTS.map(r => (
              <div key={r.period} className="row" style={{ gap: 10, alignItems: "flex-start" }}>
                <I.Excel size={16} stroke="var(--green)" />
                <div className="col grow" style={{ gap: 2 }}>
                  <span style={{ fontSize: 13, color: "var(--ink)" }}>{r.period}</span>
                  <span className="pb-mono" style={{ fontSize: 10.5, color: "var(--ink-3)", wordBreak: "break-all" }}>
                    sha256: {r.hash.slice(0, 16)}…
                  </span>
                  <span className="pb-meta">Locked by {r.approved}</span>
                </div>
                <I.Download size={14} stroke="var(--ink-3)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
