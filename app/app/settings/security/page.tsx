"use client";

import * as React from "react";
import { I } from "@/lib/icons";

type Toggle = { name: string; sub: string; on: boolean; icon: keyof typeof I };

const TOGGLES: Toggle[] = [
  { name: "Enforce MFA for all users",     sub: "TOTP authenticator required at sign-in",            on: true,  icon: "Shield"  },
  { name: "Session timeout",                sub: "Idle 30 min · absolute 12h",                        on: true,  icon: "Clock"   },
  { name: "Client portal — magic-link SSO", sub: "Single-use HMAC-signed token · 14-min expiry",     on: true,  icon: "Link"    },
  { name: "Document watermarking",          sub: "Every preview stamps user + IP + UTC",              on: true,  icon: "Eye"     },
  { name: "Audit log webhook",              sub: "Stream events to Datadog / Splunk",                 on: false, icon: "Bell"    },
  { name: "IP allowlist",                   sub: "Restrict to firm-issued static IPs",                on: false, icon: "Lock"    },
];

const SESSIONS = [
  { who: "Maya Chen, CPA",   device: "MacBook Pro · Safari 18",        ip: "76.10.155.218 · Toronto",   when: "active now"          },
  { who: "Maya Chen, CPA",   device: "iPhone 15 · ProBooks iOS 1.4.2", ip: "10.0.0.34 · LTE",           when: "12 min ago"          },
  { who: "Devon Eastlake",   device: "Mac mini · Chrome 142",          ip: "76.10.155.218 · Toronto",   when: "yesterday · 6:20pm"  },
  { who: "Priya Shah",       device: "ThinkPad · Firefox 138",         ip: "207.61.4.92 · Mississauga", when: "today · 08:14"       },
];

export default function SecurityPage() {
  const [toggles, setToggles] = React.useState(TOGGLES);
  const flip = (i: number) => setToggles(prev => prev.map((t, idx) => idx === i ? { ...t, on: !t.on } : t));

  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Sign-in & session policy</p>
        <h2 className="pb-h3" style={{ marginBottom: 16 }}>Defaults for every user</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {toggles.map((t, i) => {
            const Icon = I[t.icon];
            return (
              <div key={t.name} className="pb-card" style={{ padding: 14 }}>
                <div className="row" style={{ gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 32, height: 32, borderRadius: "var(--r-2)",
                      background: "var(--paper-2)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Icon size={15} />
                  </span>
                  <div className="col grow" style={{ gap: 2 }}>
                    <span style={{ fontSize: 13.5, color: "var(--ink)", fontWeight: 500 }}>{t.name}</span>
                    <span className="pb-meta">{t.sub}</span>
                  </div>
                  <button
                    onClick={() => flip(i)}
                    aria-label={`Toggle ${t.name}`}
                    style={{
                      width: 36, height: 20, borderRadius: 100,
                      background: t.on ? "var(--green)" : "var(--paper-3)",
                      position: "relative", flexShrink: 0,
                      transition: "background .12s",
                      border: 0, cursor: "pointer", padding: 0,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute", top: 2, left: t.on ? 18 : 2,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "var(--card)",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
                        transition: "left .12s",
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <div className="row" style={{ marginBottom: 14 }}>
          <p className="pb-eyebrow">Active sessions · 4</p>
          <button className="pb-btn sm danger right">Revoke all but this</button>
        </div>
        <table className="pb-table">
          <thead>
            <tr><th>User</th><th>Device</th><th>IP</th><th>Last seen</th><th></th></tr>
          </thead>
          <tbody>
            {SESSIONS.map((s, i) => (
              <tr key={i} style={{ cursor: "default" }}>
                <td style={{ color: "var(--ink)" }}>{s.who}</td>
                <td className="mute">{s.device}</td>
                <td className="mono mute">{s.ip}</td>
                <td className="mute">{s.when}</td>
                <td><span className="linkish" style={{ fontSize: 12 }}>Revoke</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
