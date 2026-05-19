"use client";

import { Topbar } from "@/components/topbar";
import { TAX_INTAKE, SLIPS, avatarBg } from "@/lib/data";
import { I } from "@/lib/icons";

const STATUS_BG: Record<string, { bg: string; ink: string; line: string }> = {
  accepted: { bg: "var(--leaf-soft)",  ink: "var(--leaf)",  line: "var(--leaf-line)"  },
  flagged:  { bg: "var(--amber-soft)", ink: "oklch(40% 0.12 75)", line: "var(--amber-line)" },
  pending:  { bg: "var(--paper-2)",    ink: "var(--ink-3)", line: "var(--line)"       },
};

export default function TaxIntakePage() {
  return (
    <>
      <Topbar
        crumbs={[
          { label: "Tax intake", href: "/app/tax" },
          { label: "H. Okonkwo · TY2025" },
        ]}
        right={
          <>
            <button className="pb-btn sm"><I.Mail size={13} /> Email client</button>
            <button className="pb-btn primary sm"><I.Lock size={13} /> Lock intake</button>
          </>
        }
      />

      <div style={{ padding: "24px 32px 40px", flex: 1 }}>
        <div className="row" style={{ gap: 16, marginBottom: 22 }}>
          <span className="pb-avatar xl" style={{ background: avatarBg("slate") }}>HO</span>
          <div className="col" style={{ gap: 4 }}>
            <p className="pb-eyebrow">Personal · T1 · Tax year 2025</p>
            <h1 className="pb-h2">Hannah Okonkwo</h1>
            <div className="row" style={{ gap: 10, color: "var(--ink-3)", fontSize: 13 }}>
              <span>SIN <span className="pb-mono">***-***-218</span></span>
              <span>·</span>
              <span>Toronto, ON · M6K 1R3</span>
              <span>·</span>
              <span className="row" style={{ gap: 4 }}>
                <I.Lock size={11} stroke="var(--ink-3)" /> Frozen Jan 8 · CRA-Connect linked
              </span>
            </div>
          </div>

          <div className="row right" style={{ gap: 28 }}>
            <div className="col" style={{ gap: 2 }}>
              <span className="pb-label">Intake</span>
              <span className="pb-serif" style={{ fontSize: 24 }}>8<span className="mute">/10</span></span>
            </div>
            <div className="col" style={{ gap: 2 }}>
              <span className="pb-label">Slips</span>
              <span className="pb-serif" style={{ fontSize: 24 }}>6<span className="mute">/6</span></span>
            </div>
            <div className="col" style={{ gap: 2 }}>
              <span className="pb-label">Flags</span>
              <span className="pb-serif" style={{ fontSize: 24, color: "var(--red)" }}>2</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18 }}>
          <div className="pb-card" style={{ padding: 18 }}>
            <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Intake responses</p>
            <div className="col" style={{ gap: 10 }}>
              {TAX_INTAKE.map((q, i) => {
                const status = STATUS_BG[q.status];
                return (
                  <div
                    key={q.id}
                    className="row"
                    style={{
                      gap: 12,
                      padding: 12,
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-2)",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: status.bg, color: status.ink,
                        border: `1px solid ${status.line}`,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-mono)", fontSize: 11, flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col grow" style={{ gap: 4 }}>
                      <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{q.q}</span>
                      <span style={{ fontSize: 13.5, color: "var(--ink)" }}>{q.a}</span>
                      {q.doc && (
                        <span className="row" style={{ gap: 6, fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>
                          <I.Doc size={11} /> {q.doc}
                        </span>
                      )}
                    </div>
                    <span
                      className="pb-chip"
                      style={{
                        background: status.bg, color: status.ink, borderColor: status.line,
                        textTransform: "capitalize",
                      }}
                    >
                      {q.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="pb-card" style={{ padding: 18, height: "fit-content" }}>
            <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Tax slips · 6</p>
            <div className="col" style={{ gap: 10 }}>
              {SLIPS.map(s => (
                <div
                  key={s.id}
                  style={{
                    padding: 12,
                    border: `1px solid ${s.flag === "red" ? "var(--red-line)" : s.flag === "amber" ? "var(--amber-line)" : "var(--line)"}`,
                    background: s.flag === "red" ? "var(--red-soft)" : s.flag === "amber" ? "var(--amber-soft)" : "var(--card)",
                    borderRadius: "var(--r-2)",
                  }}
                >
                  <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                    <span className="pb-chip">{s.kind}</span>
                    <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{s.issuer}</span>
                    {s.flag && (
                      <span className={`pb-chip ${s.flag === "red" ? "red" : "amber"} right`}>
                        <span className="dot" /> flag
                      </span>
                    )}
                  </div>
                  <div className="pb-mono mute" style={{ fontSize: 11.5 }}>{s.amount}</div>
                  {s.reason && (
                    <div className="pb-meta" style={{ marginTop: 6 }}>{s.reason}</div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
