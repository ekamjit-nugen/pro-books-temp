"use client";

import { I } from "@/lib/icons";

type Integration = {
  name: string;
  blurb: string;
  category: "Banking" | "Payroll" | "Productivity" | "Tax & CRA" | "Storage";
  status: "connected" | "available";
  meta?: string;
};

const INTEGRATIONS: Integration[] = [
  { name: "Plaid · Bank feeds",       blurb: "Pull transactions nightly from CIBC, RBC, TD, BMO, Scotiabank, EQ Bank.", category: "Banking",      status: "connected", meta: "8 of 12 clients linked" },
  { name: "Stripe · Card processing",  blurb: "Reconcile Stripe payouts with sales receipts automatically.",            category: "Banking",      status: "connected", meta: "2 clients linked" },
  { name: "Square Canada",             blurb: "POS sales + tip splits for café and retail clients.",                    category: "Banking",      status: "connected", meta: "1 client linked" },
  { name: "QuickBooks Online · Import",blurb: "One-time chart-of-accounts and historical txn import.",                  category: "Productivity", status: "available" },
  { name: "Xero · Import",             blurb: "Pull legacy ledgers from a Xero client file.",                           category: "Productivity", status: "available" },
  { name: "Wagepoint · Payroll",       blurb: "Sync payroll runs as wages_payroll journals.",                           category: "Payroll",      status: "available" },
  { name: "PayWorks · Payroll",        blurb: "Sync bi-weekly payroll → wages_payroll, source deductions.",             category: "Payroll",      status: "connected", meta: "1 client linked" },
  { name: "CRA · My Business Account", blurb: "File HST returns directly from the period-lock screen.",                 category: "Tax & CRA",    status: "available" },
  { name: "CRA Auto-fill My Return",   blurb: "Pre-populate T1 intake with CRA slip data.",                             category: "Tax & CRA",    status: "connected", meta: "1 T1 client" },
  { name: "DocuSign",                  blurb: "Send engagement letters and approvals for e-signature.",                 category: "Productivity", status: "connected", meta: "12 envelopes ytd" },
  { name: "Google Drive",              blurb: "Mirror locked-period Excel snapshots to a firm Drive folder.",           category: "Storage",      status: "available" },
  { name: "Dropbox",                   blurb: "Same as Drive, for firms standardized on Dropbox.",                      category: "Storage",      status: "available" },
];

function StatusChip({ s }: { s: Integration["status"] }) {
  if (s === "connected") return <span className="pb-chip green"><I.Check size={11} /> Connected</span>;
  return <span className="pb-chip">Available</span>;
}

export default function IntegrationsPage() {
  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Integrations</p>
        <h2 className="pb-h3" style={{ marginBottom: 6 }}>Banks, payroll, productivity</h2>
        <p className="pb-small" style={{ color: "var(--ink-2)" }}>
          Pull data in nightly, push data out on demand. All credentials are scoped per-client and stored
          encrypted with the firm KMS key.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {INTEGRATIONS.map(it => (
          <div key={it.name} className="pb-card" style={{ padding: 16 }}>
            <div className="row" style={{ gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
              <span
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "var(--paper-2)", border: "1px solid var(--line)",
                  color: "var(--ink-2)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-serif)", fontSize: 16,
                }}
              >
                {it.name.charAt(0)}
              </span>
              <div className="col grow" style={{ gap: 2 }}>
                <div className="row" style={{ gap: 8 }}>
                  <span style={{ fontSize: 13.5, color: "var(--ink)", fontWeight: 500 }}>{it.name}</span>
                  <span className="pb-meta">· {it.category}</span>
                </div>
                <span className="pb-meta">{it.blurb}</span>
              </div>
              <StatusChip s={it.status} />
            </div>
            <div className="row" style={{ borderTop: "1px solid var(--line)", paddingTop: 10, gap: 8 }}>
              <span className="pb-meta">{it.meta ?? "Not configured"}</span>
              <button className="pb-btn sm right">
                {it.status === "connected" ? "Manage" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
