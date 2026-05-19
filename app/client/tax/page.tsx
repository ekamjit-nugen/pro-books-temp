"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { I } from "@/lib/icons";

const OPTIONS = [
  { id: "yes",   label: "Yes — I have all 6 deposit receipts",  sub: "Spousal RRSP excluded as instructed." },
  { id: "part",  label: "Mostly — I'm missing one or two",      sub: "We'll request from TD on your behalf." },
  { id: "no",    label: "No contributions in this window",      sub: "We'll mark $0 and move on." },
];

export default function ClientTaxIntakePage() {
  const router = useRouter();
  const [picked, setPicked] = React.useState("yes");
  const [amount, setAmount] = React.useState("11,200");

  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 8 }}>
          <Link href="/client" style={{ color: "var(--ink-2)" }}>
            <I.ArrowL size={18} />
          </Link>
          <span className="grow" style={{ fontSize: 13, color: "var(--ink-2)", textAlign: "center" }}>
            T1 intake · Q5 of 10
          </span>
          <I.X size={18} stroke="var(--ink-3)" />
        </div>

        {/* progress dots */}
        <div className="row" style={{ gap: 6, justifyContent: "center" }}>
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              style={{
                width: 18, height: 4, borderRadius: 100,
                background: i < 4 ? "var(--green)" : i === 4 ? "var(--amber)" : "var(--paper-3)",
              }}
            />
          ))}
        </div>
      </header>

      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <p className="pb-eyebrow" style={{ marginBottom: 6 }}>RRSP contributions</p>
          <h1 className="pb-serif" style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: "-0.015em" }}>
            Did you make RRSP contributions in <em style={{ color: "var(--green)" }}>2025</em>, plus the first 60 days of <em style={{ color: "var(--green)" }}>2026</em>?
          </h1>
          <p className="pb-small" style={{ color: "var(--ink-2)", marginTop: 8 }}>
            We'll deduct this off your 2025 taxable income, subject to your RRSP room.
          </p>
        </div>

        <div className="col" style={{ gap: 8 }}>
          {OPTIONS.map(o => (
            <label
              key={o.id}
              className={`radio-row ${picked === o.id ? "selected" : ""}`}
              style={{ flexDirection: "column", alignItems: "stretch", gap: 4 }}
            >
              <div className="row" style={{ gap: 10 }}>
                <input
                  type="radio"
                  name="rrsp"
                  checked={picked === o.id}
                  onChange={() => setPicked(o.id)}
                />
                <span style={{ fontSize: 14, color: "var(--ink)" }}>{o.label}</span>
              </div>
              <span className="pb-meta" style={{ marginLeft: 26 }}>{o.sub}</span>
            </label>
          ))}
        </div>

        <div
          className="row"
          style={{
            padding: "10px 14px",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-2)",
            background: "var(--card)",
            gap: 10,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--ink-3)" }}>$</span>
          <input
            inputMode="decimal"
            className="pb-input"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{
              border: 0,
              padding: 0,
              fontFamily: "var(--font-mono)",
              fontSize: 22,
              height: "auto",
              background: "transparent",
            }}
          />
          <span className="pb-meta">CAD · total combined</span>
        </div>

        {/* attached receipt card */}
        <div
          className="row"
          style={{
            padding: 12,
            border: "1px solid var(--green-line)",
            background: "var(--green-soft)",
            borderRadius: "var(--r-2)",
            gap: 10,
          }}
        >
          <I.PDF size={18} stroke="var(--green-ink)" />
          <div className="col grow" style={{ gap: 2 }}>
            <span className="pb-mono" style={{ fontSize: 12, color: "var(--ink)" }}>
              RRSP-receipts-bundle.pdf
            </span>
            <span className="pb-meta">880 KB · 6 deposits attached</span>
          </div>
          <I.Check size={14} stroke="var(--green-ink)" />
        </div>

        <button
          className="pb-btn primary lg full center"
          onClick={() => router.push("/client/done")}
        >
          Save & next <I.Arrow size={14} />
        </button>

        <button className="pb-btn ghost center" style={{ width: "100%" }}>
          I'll come back to this
        </button>
      </div>
    </>
  );
}
