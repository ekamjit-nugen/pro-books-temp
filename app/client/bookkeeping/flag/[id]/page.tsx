"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { LARCHMONT_TXNS, fmtMoney } from "@/lib/data";
import { I } from "@/lib/icons";

const OPTIONS = [
  { id: "cogs",  label: "Business · COGS", sub: "Coffee beans for café — standard inventory." },
  { id: "personal", label: "Personal", sub: "Not deductible — I'll remove from the books." },
  { id: "other", label: "Other — I'll explain below", sub: "Free-text note for Maya." },
];

export default function FlagResponsePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const txn = LARCHMONT_TXNS.find(t => t.id === params.id) ?? LARCHMONT_TXNS[4];

  const [picked, setPicked] = React.useState("cogs");
  const [note, setNote] = React.useState("");

  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 8 }}>
          <Link href="/client/bookkeeping" style={{ color: "var(--ink-2)" }}>
            <I.ArrowL size={18} />
          </Link>
          <span className="grow" style={{ fontSize: 13, color: "var(--ink-2)", textAlign: "center" }}>
            Receipt · 1 of 3
          </span>
          <I.X size={18} stroke="var(--ink-3)" />
        </div>
      </header>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Receipt preview */}
        <div className="pb-placeholder" style={{ height: 220 }}>
          receipt-{txn.id}.pdf · 2 pages · scanned May {txn.date.slice(-2)}
        </div>

        {/* Trio */}
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            padding: "12px 14px",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-2)",
            background: "var(--card)",
          }}
        >
          <div className="col" style={{ gap: 2 }}>
            <span className="pb-label">Vendor</span>
            <span style={{ fontSize: 13.5, color: "var(--ink)" }}>{txn.vendor}</span>
          </div>
          <div className="col" style={{ gap: 2, alignItems: "flex-end" }}>
            <span className="pb-label">Amount</span>
            <span className="pb-mono" style={{ fontSize: 15 }}>${fmtMoney(txn.amount)}</span>
          </div>
          <div className="col" style={{ gap: 2, alignItems: "flex-end" }}>
            <span className="pb-label">HST</span>
            <span className="pb-mono" style={{ fontSize: 15 }}>${fmtMoney(txn.hst)}</span>
          </div>
        </div>

        {/* Maya's note */}
        <div
          style={{
            padding: 14,
            background: "var(--green-soft)",
            border: "1px solid var(--green-line)",
            borderRadius: "var(--r-2)",
          }}
        >
          <div className="row" style={{ gap: 8, marginBottom: 6 }}>
            <span
              className="pb-avatar"
              style={{ background: "oklch(88% 0.04 130)", width: 24, height: 24, fontSize: 10 }}
            >
              MC
            </span>
            <span style={{ fontSize: 12.5, color: "var(--green-ink)", fontWeight: 500 }}>
              Maya Chen, CPA
            </span>
            <span className="pb-meta right">2h ago</span>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
            Hey Hana — this looks like espresso for the café, but the receipt OCR'd partially.
            Is this coffee inventory, or something else? <em>One tap below works.</em>
          </p>
        </div>

        {/* Options */}
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
                  name="opt"
                  checked={picked === o.id}
                  onChange={() => setPicked(o.id)}
                />
                <span style={{ fontSize: 13.5, color: "var(--ink)" }}>{o.label}</span>
              </div>
              <span className="pb-meta" style={{ marginLeft: 26 }}>{o.sub}</span>
            </label>
          ))}
        </div>

        <textarea
          className="pb-input pb-textarea"
          placeholder="Add a quick note for Maya (optional)…"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <button
          className="pb-btn primary lg full center"
          onClick={() => router.push("/client/bookkeeping/flag/done")}
        >
          Send to Maya <I.Arrow size={14} />
        </button>

        <p className="pb-meta" style={{ textAlign: "center" }}>
          Your answer goes straight to her flag queue. No reply needed.
        </p>
      </div>
    </>
  );
}
