"use client";

import { STAFF, avatarBg } from "@/lib/data";
import { I } from "@/lib/icons";

const LAST_SEEN = ["09:42 today", "Sun 6:20pm", "08:14 today", "Fri 4:55pm"];
const ROLE_TINT: Record<string, "brand" | "green" | "blue" | "amber"> = {
  Partner: "brand", Senior: "blue", Staff: "green",
};

export default function UsersPage() {
  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <div className="row" style={{ marginBottom: 16 }}>
          <div>
            <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Users & roles · 4 active · 1 invite pending</p>
            <h2 className="pb-h3">Who can access ProBooks</h2>
          </div>
          <button className="pb-btn primary right"><I.Plus size={13} /> Invite user</button>
        </div>

        <table className="pb-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>MFA</th>
              <th>Last seen</th>
              <th>Client access</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {STAFF.map((u, i) => (
              <tr key={u.id} style={{ cursor: "default" }}>
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <span className="pb-avatar" style={{ background: avatarBg(u.avatar) }}>{u.initials}</span>
                    <div className="col" style={{ gap: 0 }}>
                      <span style={{ color: "var(--ink)" }}>{u.name}</span>
                      <span className="pb-meta">{u.id}@eastlakecho.ca</span>
                    </div>
                  </div>
                </td>
                <td><span className={`pb-chip ${ROLE_TINT[u.role] ?? ""}`}>{u.role}</span></td>
                <td><span className="pb-chip green"><I.Check size={11} /> TOTP</span></td>
                <td className="mute">{LAST_SEEN[i]}</td>
                <td className="mute">{i === 0 ? "All 12 clients" : i === 1 ? "All 12 clients" : i === 2 ? "8 clients" : "5 clients"}</td>
                <td><I.More size={14} strokeWidth={2.5} stroke="var(--ink-3)" /></td>
              </tr>
            ))}
            <tr style={{ cursor: "default", opacity: 0.85 }}>
              <td>
                <div className="row" style={{ gap: 10 }}>
                  <span className="pb-avatar" style={{ background: "var(--paper-3)" }}>RM</span>
                  <div className="col" style={{ gap: 0 }}>
                    <span style={{ color: "var(--ink)" }}>Rashid Mensah</span>
                    <span className="pb-meta">invited Fri · expires in 3 days</span>
                  </div>
                </div>
              </td>
              <td><span className="pb-chip">Staff</span></td>
              <td><span className="pb-chip amber"><span className="dot" /> Pending</span></td>
              <td className="mute">—</td>
              <td className="mute">—</td>
              <td><I.More size={14} strokeWidth={2.5} stroke="var(--ink-3)" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Role permissions</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { name: "Partner", desc: "Full access: approve periods, override locks, manage users, export audit.",       count: "2 users", color: "brand" },
            { name: "Senior",  desc: "Resolve flags, message clients, run reports. Cannot lock or override.",            count: "1 user",  color: "blue" },
            { name: "Staff",   desc: "Triage flags, prepare submissions. Cannot send to client without senior review.", count: "1 user",  color: "green" },
          ].map(r => (
            <div key={r.name} className="pb-card" style={{ padding: 14 }}>
              <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                <span className={`pb-chip ${r.color}`}>{r.name}</span>
                <span className="pb-meta right">{r.count}</span>
              </div>
              <p className="pb-small" style={{ color: "var(--ink-2)" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
