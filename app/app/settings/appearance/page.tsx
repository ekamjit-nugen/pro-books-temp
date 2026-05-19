"use client";

import { PaletteCards } from "@/components/palette-switch";
import { I } from "@/lib/icons";

export default function AppearancePage() {
  return (
    <>
      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Appearance</p>
        <h2 className="pb-h3" style={{ marginBottom: 6 }}>Palette</h2>
        <p className="pb-small" style={{ color: "var(--ink-2)", marginBottom: 18 }}>
          Pick the color direction for the whole app. Your choice applies instantly, persists across
          reloads, and follows you into both the accountant and the client portals.
        </p>

        <PaletteCards />

        <div
          className="row"
          style={{
            marginTop: 18, padding: "10px 14px",
            background: "var(--paper-2)", border: "1px solid var(--line)",
            borderRadius: "var(--r-2)", gap: 10,
          }}
        >
          <I.Sparkle size={14} stroke="var(--ink-3)" />
          <span className="pb-small" style={{ color: "var(--ink-2)" }}>
            Stored locally in your browser as <span className="pb-mono">pb_palette</span> · no server sync.
          </span>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Typography</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <div className="pb-card" style={{ padding: 16 }}>
            <span className="pb-label">Display</span>
            <p className="pb-serif" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 4 }}>
              The <em style={{ color: "var(--green)" }}>quiet</em> workflow
            </p>
            <span className="pb-meta">Newsreader · serif · variable</span>
          </div>
          <div className="pb-card" style={{ padding: 16 }}>
            <span className="pb-label">Body</span>
            <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 4, color: "var(--ink)" }}>
              Calm chrome, dense data tables. Built for accountants who prefer keyboard over mouse.
            </p>
            <span className="pb-meta">Geist · sans · 14 / 1.5</span>
          </div>
          <div className="pb-card" style={{ padding: 16 }}>
            <span className="pb-label">Numerics</span>
            <p className="pb-mono" style={{ fontSize: 18, marginTop: 4, color: "var(--ink)" }}>
              $11,200.00 · 81942 0871
            </p>
            <span className="pb-meta">JetBrains Mono · tabular figures</span>
          </div>
        </div>
      </div>

      <div className="pb-card" style={{ padding: 22 }}>
        <p className="pb-eyebrow" style={{ marginBottom: 14 }}>Density</p>
        <p className="pb-small" style={{ color: "var(--ink-2)", marginBottom: 14 }}>
          Choose how tightly tables and cards pack. Affects only this device.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[
            { id: "cozy",    label: "Cozy",    sub: "More whitespace · easier scanning" },
            { id: "default", label: "Default", sub: "Balanced · firm-recommended", selected: true },
            { id: "compact", label: "Compact", sub: "TaxDome-style · max rows on screen" },
          ].map(d => (
            <label key={d.id} className={`radio-row ${d.selected ? "selected" : ""}`} style={{ flexDirection: "column", alignItems: "stretch", gap: 4 }}>
              <div className="row" style={{ gap: 10 }}>
                <input type="radio" name="density" defaultChecked={d.selected} />
                <span style={{ fontSize: 13, color: "var(--ink)" }}>{d.label}</span>
              </div>
              <span className="pb-meta" style={{ marginLeft: 26 }}>{d.sub}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
