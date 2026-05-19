"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Topbar } from "@/components/topbar";
import { getClientBySlug, SHEETS } from "@/lib/data";
import { I } from "@/lib/icons";

const HASH = "e9c1a4f7b8d2c531a9e6b3d8f2a1c4e9b7d2a8c1";

export default function DonePage() {
  const params = useParams<{ slug: string }>();
  const client = getClientBySlug(params.slug) ?? getClientBySlug("larchmont")!;

  return (
    <>
      <Topbar
        crumbs={[
          { label: "Clients", href: "/app/clients" },
          { label: client.name },
          { label: "May 2026 · locked" },
        ]}
      />

      <div style={{ padding: "48px 32px", flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 640, width: "100%" }}>
          <div className="row" style={{ gap: 14, marginBottom: 18 }}>
            <span
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--green-soft)", border: "1px solid var(--green-line)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <I.Check size={20} stroke="var(--green-ink)" />
            </span>
            <div className="col" style={{ gap: 2 }}>
              <p className="pb-eyebrow">May 2026 is sealed</p>
              <h1 className="pb-h2">
                Period <em style={{ fontStyle: "italic", color: "var(--green)" }}>locked</em>.
              </h1>
            </div>
          </div>

          <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 24 }}>
            The snapshot is signed and written to the audit trail. {client.contact} has been emailed
            a copy of the P&L and HST schedule.
          </p>

          <div className="pb-card" style={{ padding: 20, marginBottom: 18 }}>
            <p className="pb-eyebrow" style={{ marginBottom: 12 }}>Snapshot · {client.name} · May 2026</p>

            <div className="row" style={{ gap: 12, marginBottom: 14 }}>
              <I.Excel size={20} stroke="var(--green)" />
              <div className="col" style={{ gap: 2 }}>
                <span style={{ fontSize: 14, color: "var(--ink)" }}>
                  larchmont_may2026_snapshot.xlsx
                </span>
                <span className="pb-meta">6 sheets · 293 rows · 184 KB</span>
              </div>
              <button className="pb-btn sm right"><I.Download size={13} /> Download</button>
            </div>

            <div
              style={{
                padding: "10px 12px",
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-2)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-2)",
                wordBreak: "break-all",
              }}
            >
              <span className="mute">sha256:</span> {HASH}
            </div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
              <p className="pb-label" style={{ marginBottom: 8 }}>Contents</p>
              <div className="col" style={{ gap: 6 }}>
                {SHEETS.map(s => (
                  <div key={s.name} className="row" style={{ gap: 8, fontSize: 12.5 }}>
                    <I.Check size={12} stroke="var(--ink-3)" />
                    <span>{s.name}</span>
                    <span className="right pb-mono mute" style={{ fontSize: 11 }}>{s.rows} rows</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row" style={{ gap: 8 }}>
            <Link href={`/app/clients/${client.slug}`} className="pb-btn">
              <I.ArrowL size={13} /> Back to workspace
            </Link>
            <Link href="/app/inbox" className="pb-btn primary">
              Next: Inbox <I.Arrow size={13} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
