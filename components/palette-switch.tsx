"use client";

import * as React from "react";

type Swatch = { name: string; sub: string; bg: string; ink: string; accent: string };

export const SWATCHES: Record<string, Swatch> = {
  A: { name: "Editorial Cream", sub: "Cream paper + deep forest. Calm, editorial.",            bg: "oklch(96.5% 0.008 85)",  ink: "oklch(22% 0.012 85)",  accent: "oklch(35% 0.055 155)" },
  B: { name: "Bone & Oxblood",  sub: "Bone paper + oxblood. Confident, professional.",         bg: "oklch(97% 0.006 60)",    ink: "oklch(20% 0.020 30)",  accent: "oklch(38% 0.13 25)"   },
  C: { name: "Ink & Electric",  sub: "Near-white + cool ink + indigo. Fintech-modern.",        bg: "oklch(98% 0.002 250)",   ink: "oklch(18% 0.020 250)", accent: "oklch(48% 0.20 255)"  },
  D: { name: "Sage Neutral",    sub: "Off-white + charcoal teal. Quiet SaaS.",                 bg: "oklch(97% 0.004 145)",   ink: "oklch(22% 0.012 195)", accent: "oklch(40% 0.045 195)" },
};

export function usePalette(): [string, (k: string) => void] {
  const [active, setActive] = React.useState<string>("D");

  React.useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("pb_palette")) || "D";
    setActive(saved);
    document.documentElement.setAttribute("data-palette", saved);
  }, []);

  const pick = React.useCallback((key: string) => {
    setActive(key);
    document.documentElement.setAttribute("data-palette", key);
    try { localStorage.setItem("pb_palette", key); } catch {}
  }, []);

  return [active, pick];
}

export function PaletteCards() {
  const [active, pick] = usePalette();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
      {Object.entries(SWATCHES).map(([key, s]) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            onClick={() => pick(key)}
            className="pb-card"
            style={{
              textAlign: "left",
              padding: 14,
              cursor: "pointer",
              borderColor: isActive ? "var(--green)" : "var(--line)",
              boxShadow: isActive ? "0 0 0 3px var(--green-soft)" : "none",
              transition: "border-color .12s, box-shadow .12s",
              fontFamily: "inherit",
            }}
          >
            <div className="row" style={{ gap: 10, marginBottom: 10 }}>
              <span
                style={{
                  width: 36, height: 36, borderRadius: "var(--r-2)",
                  background: `conic-gradient(from 210deg, ${s.bg} 0 40%, ${s.ink} 40% 70%, ${s.accent} 70% 100%)`,
                  border: "1px solid var(--line)",
                  flexShrink: 0,
                }}
              />
              <div className="col grow" style={{ gap: 2 }}>
                <span style={{ fontSize: 13.5, color: "var(--ink)", fontWeight: 500 }}>
                  <span className="pb-mono" style={{ fontSize: 11, color: "var(--ink-3)", marginRight: 6 }}>{key}</span>
                  {s.name}
                </span>
                <span className="pb-meta">{s.sub}</span>
              </div>
              {isActive && <span className="pb-chip brand">Active</span>}
            </div>

            <div className="row" style={{ gap: 6 }}>
              <span style={{ flex: 1, height: 28, borderRadius: "var(--r-2)", background: s.bg, border: "1px solid var(--line)" }} />
              <span style={{ flex: 1, height: 28, borderRadius: "var(--r-2)", background: s.ink }} />
              <span style={{ flex: 1, height: 28, borderRadius: "var(--r-2)", background: s.accent }} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
