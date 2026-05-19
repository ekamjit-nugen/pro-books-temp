"use client";

import Link from "next/link";
import { I } from "@/lib/icons";

const REMAINING = [
  { id: "t6",  vendor: "Greg's Auto Detail",       amount: 185.00 },
  { id: "t12", vendor: "The Coffee Equipment Co.", amount: 314.50 },
];

export default function FlagDonePage() {
  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 8 }}>
          <Link href="/client/bookkeeping" style={{ color: "var(--ink-2)" }}>
            <I.ArrowL size={18} />
          </Link>
          <span className="grow" style={{ fontSize: 13, color: "var(--ink-2)", textAlign: "center" }}>
            Sent
          </span>
          <span style={{ width: 18 }} />
        </div>
      </header>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="col" style={{ alignItems: "center", gap: 12, marginTop: 14 }}>
          <span
            style={{
              width: 56, height: 56, borderRadius: 16,
              background: "var(--green-soft)",
              border: "1px solid var(--green-line)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <I.Check size={26} stroke="var(--green-ink)" />
          </span>
          <h1 className="pb-h2" style={{ fontSize: 22, textAlign: "center" }}>
            Sent to <em style={{ fontStyle: "italic", color: "var(--green)" }}>Maya</em>
          </h1>
          <p className="pb-small" style={{ textAlign: "center", color: "var(--ink-2)", maxWidth: 280 }}>
            She'll see this in her inbox right away. You don't need to do anything else for this one.
          </p>
        </div>

        <div className="pb-card" style={{ padding: 16 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 10 }}>2 receipts left for you</p>
          <div className="col" style={{ gap: 10 }}>
            {REMAINING.map(r => (
              <Link
                key={r.id}
                href={`/client/bookkeeping/flag/${r.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-2)",
                  background: "var(--card)",
                }}
              >
                <I.Receipt size={14} stroke="var(--ink-3)" />
                <span style={{ fontSize: 13, color: "var(--ink)" }}>{r.vendor}</span>
                <span className="right pb-mono mute" style={{ fontSize: 12 }}>
                  ${r.amount.toFixed(2)}
                </span>
                <I.Chevron size={13} stroke="var(--ink-3)" />
              </Link>
            ))}
          </div>
        </div>

        <Link
          href={`/client/bookkeeping/flag/${REMAINING[0].id}`}
          className="pb-btn primary lg full center"
        >
          Continue · 2 more <I.Arrow size={14} />
        </Link>

        <Link href="/client" className="pb-btn ghost center" style={{ width: "100%" }}>
          Back to home
        </Link>
      </div>
    </>
  );
}
