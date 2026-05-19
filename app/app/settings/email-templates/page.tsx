"use client";

import * as React from "react";
import { I } from "@/lib/icons";

type Template = {
  id: string;
  name: string;
  trigger: string;
  subject: string;
  body: string;
  lastEdited: string;
};

const TEMPLATES: Template[] = [
  {
    id: "magic-link",
    name: "Client magic link",
    trigger: "Sent when a client is invited or re-invited to the portal",
    subject: "Hana — your May bookkeeping is ready to review",
    body:
`Hi {{client.first_name}},

Your {{period}} bookkeeping is ready for your eyes. We have {{flags_open}} items where a quick yes/no from you helps us close the month.

Click below — the link is single-use and expires in 14 minutes.

{{magic_link}}

— Maya Chen, CPA
Eastlake & Cho · Toronto`,
    lastEdited: "Apr 22 · Maya Chen",
  },
  {
    id: "flag-reminder",
    name: "Flag reminder",
    trigger: "Auto-nudge after 48h with no client response",
    subject: "Quick favour — 2 questions before we close May",
    body:
`Hi {{client.first_name}},

Just a friendly nudge — we still need your answer on {{flag_count}} receipts so we can lock May's books.

It'll take ~90 seconds. {{magic_link}}

Thanks!
— {{firm.name}}`,
    lastEdited: "Mar 14 · Devon Eastlake",
  },
  {
    id: "period-locked",
    name: "Period approved",
    trigger: "Fires when a partner locks a period",
    subject: "{{period}} is closed — your reports are attached",
    body:
`Hi {{client.first_name}},

{{period}} is sealed. The signed P&L, HST schedule, and source-document index are attached.
A SHA-256 hash of the snapshot is recorded in the audit log for your records.

— Maya Chen, CPA`,
    lastEdited: "Feb 03 · Maya Chen",
  },
  {
    id: "t1-intake-complete",
    name: "T1 intake complete",
    trigger: "Client finished all 10 intake questions",
    subject: "Got it — we'll have your T1 draft within 5 business days",
    body:
`Hi {{client.first_name}},

Thanks for finishing the intake. Priya will draft your T1 and we'll send a review link before we file with CRA.

— {{firm.name}}`,
    lastEdited: "Jan 28 · Priya Shah",
  },
  {
    id: "doc-request",
    name: "Document request",
    trigger: "Sent from the workspace when a doc is missing",
    subject: "Could you send us {{doc_name}}?",
    body:
`Hi {{client.first_name}},

We're missing {{doc_name}} for {{period}}. You can drop it here:

{{upload_link}}

Even a phone photo of the receipt works.

— {{sender.first_name}}`,
    lastEdited: "Apr 05 · Jordan Nakamura",
  },
];

export default function EmailTemplatesPage() {
  const [activeId, setActiveId] = React.useState<string>(TEMPLATES[0].id);
  const active = TEMPLATES.find(t => t.id === activeId)!;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 18, alignItems: "start" }}>
      <aside className="pb-card" style={{ padding: 8, height: "fit-content" }}>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "10px 12px", border: 0,
              borderRadius: "var(--r-2)",
              background: t.id === activeId ? "var(--paper-2)" : "transparent",
              cursor: "pointer", marginBottom: 4,
            }}
          >
            <div style={{ fontSize: 13, color: "var(--ink)", marginBottom: 2 }}>{t.name}</div>
            <div className="pb-meta" style={{ fontSize: 11.5 }}>{t.trigger}</div>
          </button>
        ))}
      </aside>

      <div className="col" style={{ gap: 14, minWidth: 0 }}>
        <div className="pb-card" style={{ padding: 22 }}>
          <div className="row" style={{ marginBottom: 14 }}>
            <div className="col" style={{ gap: 2 }}>
              <p className="pb-eyebrow">Email template</p>
              <h2 className="pb-h3">{active.name}</h2>
            </div>
            <div className="row right" style={{ gap: 8 }}>
              <button className="pb-btn sm"><I.Eye size={13} /> Preview</button>
              <button className="pb-btn primary sm"><I.Check size={13} /> Save</button>
            </div>
          </div>

          <div className="col" style={{ gap: 12 }}>
            <label className="col" style={{ gap: 6 }}>
              <span className="pb-label">Subject</span>
              <input className="pb-input" defaultValue={active.subject} />
            </label>

            <label className="col" style={{ gap: 6 }}>
              <span className="pb-label">Body</span>
              <textarea
                className="pb-input pb-textarea"
                style={{ minHeight: 280, fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.6 }}
                defaultValue={active.body}
              />
            </label>

            <div className="row" style={{ gap: 8 }}>
              <span className="pb-meta">Last edited: {active.lastEdited}</span>
              <span className="right pb-pill"><I.Sparkle size={11} /> Sent via Postmark</span>
            </div>
          </div>
        </div>

        <div className="pb-card" style={{ padding: 18 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 10 }}>Available variables</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {[
              "{{client.first_name}}", "{{client.full_name}}", "{{firm.name}}", "{{sender.first_name}}",
              "{{period}}", "{{magic_link}}", "{{flag_count}}", "{{flags_open}}",
              "{{doc_name}}", "{{upload_link}}", "{{snapshot_hash}}", "{{intake_progress}}",
            ].map(v => (
              <span key={v} className="pb-pill" style={{ justifyContent: "center" }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
