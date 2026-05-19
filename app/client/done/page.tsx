"use client";

import Link from "next/link";
import { I } from "@/lib/icons";

export default function ClientDonePage() {
  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 8 }}>
          <span style={{ width: 18 }} />
          <span className="grow" style={{ fontSize: 13, color: "var(--ink-2)", textAlign: "center" }}>
            All caught up
          </span>
          <span style={{ width: 18 }} />
        </div>
      </header>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="col" style={{ alignItems: "center", gap: 14, marginTop: 12 }}>
          <span
            style={{
              width: 64, height: 64, borderRadius: 18,
              background: "var(--green-soft)",
              border: "1px solid var(--green-line)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <I.Check size={30} stroke="var(--green-ink)" />
          </span>
          <h1 className="pb-h2" style={{ fontSize: 24, textAlign: "center", lineHeight: 1.2 }}>
            Thanks, <em style={{ fontStyle: "italic", color: "var(--green)" }}>Hana</em> —
            <br />Maya can finish May close.
          </h1>
          <p className="pb-small" style={{ textAlign: "center", color: "var(--ink-2)", maxWidth: 300 }}>
            Your replies and uploads are signed and on her desk. You'll get a notification when
            May is approved and the snapshot is ready to download.
          </p>
        </div>

        <div className="pb-card" style={{ padding: 16, marginTop: 4 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 12 }}>What you finished today</p>
          <div className="col" style={{ gap: 10, fontSize: 13 }}>
            <div className="row" style={{ gap: 10 }}>
              <I.Check size={13} stroke="var(--leaf)" />
              <span>Categorized 3 receipts</span>
              <span className="right pb-meta">~ 90 sec</span>
            </div>
            <div className="row" style={{ gap: 10 }}>
              <I.Check size={13} stroke="var(--leaf)" />
              <span>Uploaded 4 May documents</span>
              <span className="right pb-meta">~ 60 sec</span>
            </div>
            <div className="row" style={{ gap: 10 }}>
              <I.Check size={13} stroke="var(--leaf)" />
              <span>Answered Q5 · RRSP — $11,200</span>
              <span className="right pb-meta">~ 20 sec</span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 14,
            background: "var(--green-soft)",
            border: "1px solid var(--green-line)",
            borderRadius: "var(--r-2)",
          }}
        >
          <div className="row" style={{ gap: 8, marginBottom: 4 }}>
            <span
              className="pb-avatar"
              style={{ background: "oklch(88% 0.04 130)", width: 24, height: 24, fontSize: 10 }}
            >
              MC
            </span>
            <span style={{ fontSize: 12.5, color: "var(--green-ink)", fontWeight: 500 }}>
              Maya Chen, CPA
            </span>
            <span className="pb-meta right">just now</span>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
            Got it, Hana — I'll get May locked by Friday. Talk soon. ☕
          </p>
        </div>

        <Link href="/client" className="pb-btn primary lg full center">
          Back to home <I.Arrow size={14} />
        </Link>

        <p className="pb-meta" style={{ textAlign: "center" }}>
          You can close this tab. We'll email you when there's something new.
        </p>
      </div>
    </>
  );
}
