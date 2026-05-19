"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { I } from "@/lib/icons";
import { FIRM } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("maya.chen@eastlakecho.ca");
  const [password, setPassword] = React.useState("••••••••••");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login/mfa");
  };

  return (
    <main style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", minHeight: "100vh" }}>
      {/* left — editorial */}
      <section
        style={{
          background: "var(--paper-2)",
          borderRight: "1px solid var(--line)",
          padding: "56px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div className="pb-logo">
          <span className="mark">P</span>
          <span>ProBooks</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 540 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 18 }}>For Canadian CPA firms</p>
          <h1 className="pb-h1" style={{ fontSize: 56, lineHeight: 1.02, marginBottom: 22 }}>
            The <em style={{ fontStyle: "italic", color: "var(--green)" }}>quiet</em> workflow
            <br />between you and the books.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 460 }}>
            Cross-client triage, period lock with audit trail, and a client portal
            your owners will actually use. Built around CRA's <span className="pb-mono" style={{ fontSize: 14 }}>HST 81942 0871 RT0001</span>-shaped reality, not generic SaaS.
          </p>
        </div>

        <div className="row" style={{ gap: 48, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <div className="col" style={{ gap: 2 }}>
            <div className="pb-serif" style={{ fontSize: 28, lineHeight: 1 }}>147</div>
            <div className="pb-meta">monthly txns · this client</div>
          </div>
          <div className="col" style={{ gap: 2 }}>
            <div className="pb-serif" style={{ fontSize: 28, lineHeight: 1 }}>4.2<span className="mute"> min</span></div>
            <div className="pb-meta">avg flag resolution</div>
          </div>
          <div className="col" style={{ gap: 2 }}>
            <div className="pb-serif" style={{ fontSize: 28, lineHeight: 1 }}>SOC 2</div>
            <div className="pb-meta">Type II · audited 2026</div>
          </div>
        </div>
      </section>

      {/* right — sign-in card */}
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div className="pb-card" style={{ width: "100%", maxWidth: 380, padding: 32 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 6 }}>{FIRM.name}</p>
          <h2 className="pb-h2" style={{ marginBottom: 28 }}>Sign in</h2>

          <form onSubmit={submit} className="col" style={{ gap: 14 }}>
            <label className="col" style={{ gap: 6 }}>
              <span className="pb-label">Email</span>
              <input
                type="email"
                className="pb-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
            </label>

            <label className="col" style={{ gap: 6 }}>
              <span className="pb-label">Password</span>
              <input
                type="password"
                className="pb-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>

            <div className="row" style={{ justifyContent: "space-between", marginTop: 4 }}>
              <label className="row" style={{ gap: 8, fontSize: 12.5, color: "var(--ink-2)" }}>
                <input type="checkbox" defaultChecked /> Remember this device
              </label>
              <a href="#" className="linkish" style={{ fontSize: 12.5 }}>Forgot?</a>
            </div>

            <button type="submit" className="pb-btn primary lg full center" style={{ marginTop: 12 }}>
              Continue <I.Arrow size={14} />
            </button>

            <div className="row" style={{ justifyContent: "center", color: "var(--ink-3)", fontSize: 12, gap: 6, marginTop: 10 }}>
              <I.Shield size={12} />
              Protected by 6-digit MFA on next step
            </div>
          </form>
        </div>
      </section>

      <p style={{ position: "fixed", bottom: 16, left: 24, fontSize: 11, color: "var(--ink-4)" }}>
        © 2026 ProBooks · <Link href="/p/larchmont-may-2026-magic-link" className="linkish">Client portal demo →</Link>
      </p>
    </main>
  );
}
