"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { I } from "@/lib/icons";

export default function MagicLinkPage() {
  const router = useRouter();

  React.useEffect(() => {
    const t = setTimeout(() => router.push("/client"), 800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="mobile-shell">
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div className="pb-logo">
          <span className="mark">P</span>
          <span>ProBooks</span>
        </div>

        <div className="col" style={{ alignItems: "center", gap: 6 }}>
          <span
            className="pb-mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Signing you in…
          </span>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 22, textAlign: "center", lineHeight: 1.3 }}>
            Welcome, <em style={{ color: "var(--green)" }}>Hana</em>.
          </p>
        </div>

        <div className="pb-progress" style={{ width: 180 }}>
          <div style={{ width: "70%" }} />
        </div>

        <p className="pb-small" style={{ color: "var(--ink-3)", textAlign: "center", maxWidth: 280 }}>
          Verifying magic-link · single-use HMAC token · expires in 14 minutes.
        </p>

        <div className="row" style={{ gap: 6, color: "var(--ink-3)", fontSize: 11 }}>
          <I.Shield size={11} /> Eastlake & Cho CPA · Toronto
        </div>
      </div>
    </main>
  );
}
