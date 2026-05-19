"use client";

import Link from "next/link";
import { I } from "@/lib/icons";

export default function ClientPickerPage() {
  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 14 }}>
          <span
            className="pb-avatar"
            style={{ background: "oklch(88% 0.04 130)", width: 30, height: 30 }}
          >
            HP
          </span>
          <div className="col" style={{ gap: 0 }}>
            <span style={{ fontSize: 13, color: "var(--ink)" }}>Hana Park</span>
            <span className="pb-meta">Larchmont Roastery Ltd.</span>
          </div>
          <div className="grow" />
          <I.Bell size={16} stroke="var(--ink-3)" />
        </div>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Mon, May 18</p>
        <h1 className="pb-h2" style={{ fontSize: 26 }}>
          What needs <em style={{ fontStyle: "italic", color: "var(--green)" }}>you</em> today?
        </h1>
      </header>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <Link
          href="/client/bookkeeping"
          style={{
            display: "block",
            padding: 18,
            border: "1px solid var(--green-line)",
            background: "var(--green-soft)",
            borderRadius: "var(--r-3)",
            color: "var(--ink)",
          }}
        >
          <div className="row" style={{ marginBottom: 12 }}>
            <span
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: "var(--green)", color: "oklch(96% 0.02 85)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <I.Coffee size={18} />
            </span>
            <span className="pb-chip red right">
              <span className="dot" /> 3 red · 2 amber
            </span>
          </div>

          <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Bookkeeping · May 2026</p>
          <h2 className="pb-h3" style={{ fontSize: 20, marginBottom: 4 }}>
            Maya needs you to clear <em style={{ color: "var(--green-ink)" }}>5</em> receipts
          </h2>
          <p className="pb-small" style={{ color: "var(--ink-2)" }}>
            Mostly category questions. ~2 minutes total. Close-out target: Fri May 22.
          </p>

          <div className="row" style={{ gap: 6, marginTop: 14 }}>
            <div className="pb-progress" style={{ flex: 1 }}>
              <div style={{ width: "72%" }} />
            </div>
            <span className="pb-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>72%</span>
          </div>
        </Link>

        <Link
          href="/client/tax"
          style={{
            display: "block",
            padding: 18,
            border: "1px solid var(--amber-line)",
            background: "var(--amber-soft)",
            borderRadius: "var(--r-3)",
            color: "var(--ink)",
          }}
        >
          <div className="row" style={{ marginBottom: 12 }}>
            <span
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: "var(--amber)", color: "oklch(100% 0 0)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <I.Tax size={18} />
            </span>
            <span className="pb-chip amber right">2 questions left</span>
          </div>

          <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Tax · T1 · TY2025</p>
          <h2 className="pb-h3" style={{ fontSize: 20, marginBottom: 4 }}>
            Finish your <em style={{ color: "oklch(40% 0.12 75)" }}>intake</em>
          </h2>
          <p className="pb-small" style={{ color: "var(--ink-2)" }}>
            8 of 10 done. RRSP receipts and foreign-property check.
          </p>

          <div className="row" style={{ gap: 6, marginTop: 14 }}>
            <div className="pb-progress" style={{ flex: 1 }}>
              <div style={{ width: "80%", background: "var(--amber)" }} />
            </div>
            <span className="pb-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>80%</span>
          </div>
        </Link>

        <div
          style={{
            marginTop: 8,
            padding: "14px 16px",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-3)",
            background: "var(--card)",
          }}
        >
          <div className="row" style={{ gap: 10 }}>
            <I.Sparkle size={14} stroke="var(--green)" />
            <span style={{ fontSize: 12.5, color: "var(--ink)" }}>
              Maya last replied <span className="mute">2h ago</span>
            </span>
          </div>
          <p className="pb-small" style={{ marginTop: 6, color: "var(--ink-2)" }}>
            "Got the new HST number — adjusted Q1 to match. Will message before locking May."
          </p>
        </div>
      </div>
    </>
  );
}
