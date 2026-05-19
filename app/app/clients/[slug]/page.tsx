"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { Topbar } from "@/components/topbar";
import {
  getClientBySlug, LARCHMONT_TXNS, avatarBg, SHEETS, fmtMoney,
  type Txn,
} from "@/lib/data";
import { I } from "@/lib/icons";

const CAT_LABEL: Record<string, string> = {
  revenue: "Revenue", cogs: "COGS", rent: "Rent", utilities: "Utilities",
  telecommunications: "Telecom", office_supplies: "Office", software_subscriptions: "Software",
  professional_services: "Pro. services", insurance: "Insurance", vehicle_travel: "Vehicle / travel",
  meals_entertainment: "Meals", wages_payroll: "Wages", bank_merchant_fees: "Fees",
  owner_distribution: "Owner draw",
};

const RESOLVE_CATEGORIES = [
  { id: "cogs", label: "COGS — coffee beans" },
  { id: "office_supplies", label: "Office supplies" },
  { id: "meals_entertainment", label: "Meals & entertainment" },
  { id: "owner_distribution", label: "Owner — not deductible" },
];

export default function ClientWorkspacePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const client = getClientBySlug(params.slug) ?? getClientBySlug("larchmont")!;

  const [txns, setTxns] = React.useState<Txn[]>(LARCHMONT_TXNS);
  const [openFlagId, setOpenFlagId] = React.useState<string | null>(null);
  const [approveOpen, setApproveOpen] = React.useState(false);
  const [period, setPeriod] = React.useState<"Apr" | "May" | "Jun">("May");

  const flaggedTxns = txns.filter(t => t.flag !== null);
  const totalRevenue = 38420.50;
  const totalExpenses = txns.filter(t => t.category !== "revenue").reduce((s, t) => s + t.amount, 0);
  const netPretax = totalRevenue - totalExpenses;
  const hstCollected = txns.reduce((s, t) => s + t.hst, 0);

  const openTxn = txns.find(t => t.id === openFlagId);

  const resolveFlag = (id: string) => {
    setTxns(prev => prev.map(t => t.id === id ? { ...t, flag: null } : t));
    setOpenFlagId(null);
  };

  return (
    <>
      <Topbar
        crumbs={[
          { label: "Clients", href: "/app/clients" },
          { label: client.name },
        ]}
        right={
          <>
            <button className="pb-btn sm"><I.Mail size={13} /> Message Hana</button>
            <button className="pb-btn primary sm" onClick={() => setApproveOpen(true)}>
              <I.Lock size={13} /> Approve period
            </button>
          </>
        }
      />

      <div style={{ padding: "24px 32px 40px", flex: 1 }}>
        {/* header */}
        <div className="row" style={{ gap: 16, marginBottom: 22 }}>
          <span className="pb-avatar xl" style={{ background: avatarBg(client.color) }}>{client.initials}</span>
          <div className="col" style={{ gap: 4 }}>
            <p className="pb-eyebrow">Bookkeeping · monthly</p>
            <h1 className="pb-h2">{client.name}</h1>
            <div className="row" style={{ gap: 10, color: "var(--ink-3)", fontSize: 13 }}>
              <span>Contact: <span style={{ color: "var(--ink)" }}>{client.contact}</span></span>
              <span>·</span>
              <span>Liberty Village, Toronto</span>
              <span>·</span>
              <span className="pb-mono" style={{ fontSize: 12 }}>HST 81942 0871 RT0001</span>
            </div>
          </div>

          <div className="row right" style={{ gap: 4 }}>
            {(["Apr", "May", "Jun"] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="pb-btn sm"
                style={{
                  background: p === period ? "var(--green)" : undefined,
                  color: p === period ? "oklch(96% 0.02 85)" : undefined,
                  borderColor: p === period ? "var(--green-ink)" : undefined,
                }}
              >
                {p === "Apr" && <I.Check size={11} />} {p} 2026
              </button>
            ))}
          </div>
        </div>

        {/* stat strip */}
        <div className="stat-strip" style={{ gridTemplateColumns: "repeat(6, 1fr)", marginBottom: 22 }}>
          <div className="stat-card">
            <span className="l">Revenue</span>
            <div className="v pb-num">${fmtMoney(totalRevenue)}</div>
            <div className="pb-meta">vs Apr · <span style={{ color: "var(--leaf)" }}>+4.2%</span></div>
          </div>
          <div className="stat-card">
            <span className="l">Expenses</span>
            <div className="v pb-num">${fmtMoney(totalExpenses)}</div>
            <div className="pb-meta">15 txns categorized</div>
          </div>
          <div className="stat-card">
            <span className="l">Net pre-tax</span>
            <div className="v pb-num">${fmtMoney(netPretax)}</div>
            <div className="pb-meta">margin 25.6%</div>
          </div>
          <div className="stat-card">
            <span className="l">HST collected</span>
            <div className="v pb-num">${fmtMoney(hstCollected)}</div>
            <div className="pb-meta">file Jun 30</div>
          </div>
          <div className="stat-card">
            <span className="l">Transactions</span>
            <div className="v">{txns.length}</div>
            <div className="pb-meta">147 YTD</div>
          </div>
          <div className="stat-card">
            <span className="l">Flags open</span>
            <div className="v" style={{ color: flaggedTxns.length ? "var(--red)" : "var(--leaf)" }}>{flaggedTxns.length}</div>
            <div className="pb-meta">{flaggedTxns.filter(t => t.flag === "red").length} red · {flaggedTxns.filter(t => t.flag === "amber").length} amber</div>
          </div>
        </div>

        {/* two-pane */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 18 }}>
          <div className="pb-card" style={{ overflow: "hidden" }}>
            <div className="row" style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
              <span className="pb-eyebrow">Transactions · May 2026</span>
              <div className="grow" />
              <span className="pb-meta">15 rows · sorted by date</span>
            </div>
            <table className="pb-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Vendor</th>
                  <th>Memo</th>
                  <th>Category</th>
                  <th className="num">Amount</th>
                  <th className="num">HST</th>
                  <th className="num">Conf.</th>
                </tr>
              </thead>
              <tbody>
                {txns.map(t => (
                  <tr
                    key={t.id}
                    className={t.flag === "red" ? "flagged-red" : t.flag === "amber" ? "flagged-amber" : ""}
                    onClick={() => t.flag && setOpenFlagId(t.id)}
                  >
                    <td>
                      {t.flag === "red" && <span className="pb-dot red" />}
                      {t.flag === "amber" && <span className="pb-dot amber" />}
                    </td>
                    <td className="mono mute">{t.date.slice(5)}</td>
                    <td style={{ color: "var(--ink)" }}>{t.vendor}</td>
                    <td className="mute" style={{ maxWidth: 220 }}>{t.memo}</td>
                    <td><span className="pb-chip">{CAT_LABEL[t.category] ?? t.category}</span></td>
                    <td className="num pb-mono" style={{ fontSize: 12.5, color: "var(--ink)" }}>${fmtMoney(t.amount)}</td>
                    <td className="num mono mute">${fmtMoney(t.hst)}</td>
                    <td className="num mono" style={{ color: t.confidence < 0.975 ? "var(--red)" : t.confidence < 0.985 ? "var(--amber)" : "var(--leaf)" }}>
                      {(t.confidence * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="col" style={{ gap: 12 }}>
            <div className="pb-card" style={{ padding: 14 }}>
              <p className="pb-eyebrow" style={{ marginBottom: 12 }}>Flag rail · click to resolve</p>
              <div className="col" style={{ gap: 8 }}>
                {flaggedTxns.length === 0 && (
                  <div className="row" style={{ gap: 8, color: "var(--leaf)", fontSize: 13 }}>
                    <I.Check size={14} /> All flags resolved
                  </div>
                )}
                {flaggedTxns.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setOpenFlagId(t.id)}
                    style={{
                      textAlign: "left",
                      background: t.flag === "red" ? "var(--red-soft)" : "var(--amber-soft)",
                      border: `1px solid ${t.flag === "red" ? "var(--red-line)" : "var(--amber-line)"}`,
                      borderRadius: "var(--r-2)",
                      padding: "10px 12px",
                      cursor: "pointer",
                    }}
                  >
                    <div className="row" style={{ gap: 8 }}>
                      <span className={`pb-dot ${t.flag === "red" ? "red" : "amber"}`} />
                      <span style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500 }}>{t.vendor}</span>
                      <span className="right pb-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>${fmtMoney(t.amount)}</span>
                    </div>
                    <div className="pb-meta" style={{ marginTop: 2 }}>{t.memo}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pb-card" style={{ padding: 14 }}>
              <p className="pb-eyebrow" style={{ marginBottom: 8 }}>Period checklist</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
                <li className="row" style={{ gap: 8, padding: "4px 0" }}>
                  <I.Check size={13} stroke="var(--leaf)" /> Bank reconciled
                </li>
                <li className="row" style={{ gap: 8, padding: "4px 0" }}>
                  <I.Check size={13} stroke="var(--leaf)" /> Credit card reconciled
                </li>
                <li className="row" style={{ gap: 8, padding: "4px 0", color: flaggedTxns.length ? "var(--red)" : undefined }}>
                  {flaggedTxns.length === 0 ? <I.Check size={13} stroke="var(--leaf)" /> : <I.Flag size={13} stroke="var(--red)" />}
                  Flags resolved <span className="right mute pb-mono" style={{ fontSize: 11 }}>{flaggedTxns.length} open</span>
                </li>
                <li className="row" style={{ gap: 8, padding: "4px 0" }}>
                  <I.Check size={13} stroke="var(--leaf)" /> HST schedule generated
                </li>
                <li className="row" style={{ gap: 8, padding: "4px 0" }}>
                  <I.Check size={13} stroke="var(--leaf)" /> P&L delivered to client
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Resolve flag side sheet */}
      {openTxn && (
        <>
          <div className="pb-sheet-bg" onClick={() => setOpenFlagId(null)} />
          <aside className="pb-sheet">
            <div className="row" style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              <div className="col" style={{ gap: 2 }}>
                <span className="pb-eyebrow">Resolve flag</span>
                <span className="pb-serif" style={{ fontSize: 18 }}>{openTxn.vendor}</span>
              </div>
              <button className="pb-btn ghost sm right" onClick={() => setOpenFlagId(null)}>
                <I.X size={14} />
              </button>
            </div>

            <div style={{ padding: 18, overflowY: "auto", flex: 1 }}>
              <div className="pb-placeholder" style={{ height: 220, marginBottom: 14 }}>
                receipt-{openTxn.id}.pdf · 2 pages · OCR
              </div>

              <div className="row" style={{ gap: 16, marginBottom: 18 }}>
                <div className="col" style={{ gap: 2 }}>
                  <span className="pb-label">Amount</span>
                  <span className="pb-mono" style={{ fontSize: 16 }}>${fmtMoney(openTxn.amount)}</span>
                </div>
                <div className="col" style={{ gap: 2 }}>
                  <span className="pb-label">HST</span>
                  <span className="pb-mono" style={{ fontSize: 16 }}>${fmtMoney(openTxn.hst)}</span>
                </div>
                <div className="col" style={{ gap: 2 }}>
                  <span className="pb-label">Conf.</span>
                  <span className="pb-mono" style={{ fontSize: 16, color: "var(--red)" }}>
                    {(openTxn.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <p className="pb-label" style={{ marginBottom: 10 }}>Re-categorize as</p>
              <div className="col" style={{ gap: 8, marginBottom: 18 }}>
                {RESOLVE_CATEGORIES.map((c, i) => (
                  <label
                    key={c.id}
                    className={`radio-row ${i === 0 ? "selected" : ""}`}
                  >
                    <input type="radio" name="cat" defaultChecked={i === 0} />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>

              <label className="col" style={{ gap: 6, marginBottom: 14 }}>
                <span className="pb-label">Note to record</span>
                <textarea
                  className="pb-input pb-textarea"
                  defaultValue="Verified with vendor: 24kg espresso blend for café. Standard COGS."
                />
              </label>

              <label className="row" style={{ gap: 8, fontSize: 12.5, color: "var(--ink-2)" }}>
                <input type="checkbox" /> Apply this categorization to all future <em>{openTxn.vendor}</em> receipts
              </label>
            </div>

            <div className="row" style={{ padding: 16, borderTop: "1px solid var(--line)", gap: 8 }}>
              <button className="pb-btn" onClick={() => setOpenFlagId(null)}>Cancel</button>
              <button className="pb-btn ghost"><I.Mail size={13} /> Ask Hana</button>
              <button className="pb-btn primary right" onClick={() => resolveFlag(openTxn.id)}>
                <I.Check size={13} /> Resolve flag
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Approve period modal */}
      {approveOpen && (
        <div className="pb-modal-bg" onClick={() => setApproveOpen(false)}>
          <div className="pb-modal" onClick={e => e.stopPropagation()}>
            <div className="row" style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)" }}>
              <div className="col" style={{ gap: 2 }}>
                <span className="pb-eyebrow">Approve & lock</span>
                <span className="pb-serif" style={{ fontSize: 20 }}>
                  {client.name} · May 2026
                </span>
              </div>
              <button className="pb-btn ghost sm right" onClick={() => setApproveOpen(false)}>
                <I.X size={14} />
              </button>
            </div>

            <div style={{ padding: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, overflowY: "auto" }}>
              <div>
                <p className="pb-label" style={{ marginBottom: 12 }}>Pre-flight checklist</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
                  {[
                    "Bank statement matches GL to the penny",
                    "All HST entries reconcile to schedule",
                    "Zero unresolved red flags",
                    "Owner draw & contributions tagged",
                    "P&L variance vs Apr explained",
                  ].map((line, i) => (
                    <li key={i} className="row" style={{ gap: 8, padding: "6px 0" }}>
                      <I.Check size={14} stroke={i === 2 && flaggedTxns.length ? "var(--red)" : "var(--leaf)"} />
                      <span style={{ color: i === 2 && flaggedTxns.length ? "var(--red)" : "var(--ink)" }}>{line}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: 18,
                    padding: 12,
                    background: "var(--green-soft)",
                    border: "1px solid var(--green-line)",
                    borderRadius: "var(--r-2)",
                  }}
                >
                  <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                    <I.Lock size={13} stroke="var(--green-ink)" />
                    <span style={{ fontSize: 12.5, color: "var(--green-ink)", fontWeight: 500 }}>
                      Period will be locked
                    </span>
                  </div>
                  <p className="pb-small" style={{ color: "var(--ink-2)" }}>
                    A SHA-256 hash of the Excel snapshot is recorded to the audit log. Any future
                    edit requires a partner override and re-approval.
                  </p>
                </div>
              </div>

              <div>
                <p className="pb-label" style={{ marginBottom: 12 }}>Excel snapshot · 6 sheets</p>
                <div className="col" style={{ gap: 6 }}>
                  {SHEETS.map(s => (
                    <div
                      key={s.name}
                      className="row"
                      style={{
                        padding: "10px 12px",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-2)",
                        background: "var(--paper-2)",
                        gap: 10,
                      }}
                    >
                      <I.Excel size={14} stroke="var(--green)" />
                      <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{s.name}</span>
                      <span className="right pb-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                        {s.rows} rows
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row" style={{ padding: "14px 22px", borderTop: "1px solid var(--line)", gap: 8 }}>
              <span className="pb-meta">
                Approved by <span style={{ color: "var(--ink)" }}>Maya Chen, CPA</span> · 09:42 EDT
              </span>
              <button className="pb-btn right" onClick={() => setApproveOpen(false)}>Cancel</button>
              <button
                className="pb-btn primary"
                onClick={() => router.push(`/app/clients/${client.slug}/done`)}
              >
                <I.Lock size={13} /> Approve & lock period
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
