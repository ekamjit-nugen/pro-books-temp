"use client";

import { Topbar } from "@/components/topbar";
import { AUDIT_ENTRIES, type AuditKind } from "@/lib/data";
import { I } from "@/lib/icons";

const KIND_META: Record<AuditKind, { bg: string; ink: string; Icon: typeof I.Audit; label: string }> = {
  period: { bg: "var(--green-soft)", ink: "var(--green-ink)", Icon: I.Lock,   label: "Period"   },
  flag:   { bg: "var(--red-soft)",   ink: "var(--red)",       Icon: I.Flag,   label: "Flag"     },
  link:   { bg: "var(--blue-soft)",  ink: "var(--blue)",      Icon: I.Link,   label: "Link"     },
  system: { bg: "var(--paper-2)",    ink: "var(--ink-3)",     Icon: I.Sparkle,label: "System"   },
  tax:    { bg: "var(--amber-soft)", ink: "oklch(40% 0.12 75)", Icon: I.Tax,  label: "Tax"      },
  upload: { bg: "var(--leaf-soft)",  ink: "var(--leaf)",      Icon: I.Upload, label: "Upload"   },
};

export default function AuditPage() {
  // group by hour bucket
  const groups: Record<string, typeof AUDIT_ENTRIES> = {};
  AUDIT_ENTRIES.forEach(e => {
    const hour = e.at.split(":")[0] + ":00";
    if (!groups[hour]) groups[hour] = [];
    groups[hour].push(e);
  });

  return (
    <>
      <Topbar
        crumbs={[{ label: "Audit log" }]}
        right={
          <>
            <button className="pb-btn sm"><I.Filter size={13} /> Filter</button>
            <button className="pb-btn sm"><I.Download size={13} /> Export</button>
          </>
        }
      />

      <div style={{ padding: "24px 32px 40px", flex: 1, maxWidth: 920 }}>
        <div style={{ marginBottom: 22 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Today · Mon, May 18 2026</p>
          <h1 className="pb-h2">
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{AUDIT_ENTRIES.length}</span> events,{" "}
            <em style={{ fontStyle: "italic", color: "var(--green)" }}>tamper-evident</em>
          </h1>
        </div>

        <div className="pb-card" style={{ padding: 0, overflow: "hidden" }}>
          {Object.entries(groups).map(([hour, entries], gi) => (
            <div key={hour}>
              <div
                style={{
                  padding: "10px 18px",
                  background: "var(--paper-2)",
                  borderBottom: "1px solid var(--line)",
                  borderTop: gi === 0 ? 0 : "1px solid var(--line)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  letterSpacing: "0.06em",
                }}
              >
                {hour}
              </div>
              <div>
                {entries.map((e, i) => {
                  const meta = KIND_META[e.kind];
                  const Icon = meta.Icon;
                  return (
                    <div
                      key={i}
                      className="row"
                      style={{
                        padding: "12px 18px",
                        borderBottom: i === entries.length - 1 ? 0 : "1px solid var(--line)",
                        gap: 14,
                      }}
                    >
                      <span
                        className="pb-mono"
                        style={{ fontSize: 12, color: "var(--ink-2)", width: 48, textAlign: "right" }}
                      >
                        {e.at}
                      </span>
                      <span
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: meta.bg, color: meta.ink,
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <Icon size={13} stroke={meta.ink} />
                      </span>
                      <span style={{ fontSize: 13.5 }}>
                        <span style={{ color: "var(--ink)" }}>{e.who}</span>{" "}
                        <span className="mute">{e.what}</span>
                      </span>
                      <span className="pb-pill right">{e.target}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="pb-meta" style={{ textAlign: "center", marginTop: 18 }}>
          Events are hash-chained: each line's <span className="pb-mono">sha256</span> includes the previous line's hash.
        </p>
      </div>
    </>
  );
}
