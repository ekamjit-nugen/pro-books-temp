"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/topbar";
import { CLIENTS, avatarBg } from "@/lib/data";
import { I } from "@/lib/icons";

const SERVICE_LABEL: Record<string, string> = {
  bookkeeping: "Bookkeeping",
  tax: "Tax · T1",
  both: "Both",
};

export default function ClientsPage() {
  const router = useRouter();

  return (
    <>
      <Topbar
        crumbs={[{ label: "Clients" }]}
        right={
          <>
            <button className="pb-btn sm"><I.Filter size={13} /> Filter</button>
            <button className="pb-btn primary sm"><I.Plus size={13} /> Add client</button>
          </>
        }
      />

      <div style={{ padding: "24px 32px 40px", flex: 1 }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Roster</p>
            <h1 className="pb-h2">
              <span style={{ fontVariantNumeric: "tabular-nums" }}>12</span> clients{" "}
              <em style={{ fontStyle: "italic", color: "var(--green)" }}>in motion</em>
            </h1>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className="pb-chip">8 bookkeeping</span>
            <span className="pb-chip">4 tax · T1</span>
            <span className="pb-chip brand">3 close this week</span>
          </div>
        </div>

        <div className="pb-card" style={{ overflow: "hidden" }}>
          <table className="pb-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Contact</th>
                <th>Period</th>
                <th style={{ width: 180 }}>Progress</th>
                <th>Flags</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {CLIENTS.map(c => (
                <tr key={c.id} onClick={() => router.push(`/app/clients/${c.slug}`)}>
                  <td>
                    <div className="row" style={{ gap: 10 }}>
                      <span className="pb-avatar" style={{ background: avatarBg(c.color) }}>{c.initials}</span>
                      <div className="col" style={{ gap: 0 }}>
                        <span style={{ color: "var(--ink)" }}>{c.name}</span>
                        <span className="pb-meta">id: {c.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`pb-chip ${c.service === "tax" ? "amber" : c.service === "bookkeeping" ? "green" : "brand"}`}>
                      {SERVICE_LABEL[c.service]}
                    </span>
                  </td>
                  <td className="mute">{c.contact}</td>
                  <td className="mono mute">{c.period}</td>
                  <td>
                    <div className="row" style={{ gap: 8 }}>
                      <div className="pb-progress" style={{ width: 110 }}>
                        <div style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="pb-mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 28 }}>{c.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      {c.flags_red > 0 && (
                        <span className="pb-chip red">
                          <span className="dot" /> {c.flags_red}
                        </span>
                      )}
                      {c.flags_amber > 0 && (
                        <span className="pb-chip amber">
                          <span className="dot" /> {c.flags_amber}
                        </span>
                      )}
                      {c.flags_red === 0 && c.flags_amber === 0 && (
                        <span className="pb-chip green"><span className="dot" /> clear</span>
                      )}
                    </div>
                  </td>
                  <td><I.Chevron size={14} stroke="var(--ink-3)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
