"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { I } from "@/lib/icons";

export default function MfaPage() {
  const router = useRouter();
  const [digits, setDigits] = React.useState<string[]>(["", "", "", "", "", ""]);
  const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

  const set = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  React.useEffect(() => {
    if (digits.every(d => d !== "")) {
      const t = setTimeout(() => router.push("/app/inbox"), 700);
      return () => clearTimeout(t);
    }
  }, [digits, router]);

  return (
    <main style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 32 }}>
      <div className="pb-card" style={{ width: "100%", maxWidth: 440, padding: 40 }}>
        <div className="pb-logo" style={{ justifyContent: "center", marginBottom: 24 }}>
          <span className="mark">P</span>
          <span>ProBooks</span>
        </div>

        <p className="pb-eyebrow" style={{ textAlign: "center", marginBottom: 6 }}>Two-step verification</p>
        <h2 className="pb-h2" style={{ textAlign: "center", marginBottom: 8 }}>Enter the 6-digit code</h2>
        <p className="pb-small" style={{ textAlign: "center", color: "var(--ink-3)", marginBottom: 28 }}>
          We sent a code to your authenticator app for{" "}
          <span style={{ color: "var(--ink)" }}>maya.chen@eastlakecho.ca</span>
        </p>

        <div className="row" style={{ justifyContent: "center", gap: 8 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputs.current[i] = el; }}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => set(i, e.target.value)}
              onKeyDown={e => onKey(i, e)}
              autoFocus={i === 0}
              style={{
                width: 48, height: 56,
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 22,
                border: "1px solid var(--line-2)",
                borderRadius: "var(--r-2)",
                background: "var(--card)",
                color: "var(--ink)",
                outlineColor: "var(--green)",
              }}
            />
          ))}
        </div>

        <p className="pb-meta" style={{ textAlign: "center", marginTop: 22 }}>
          Code expires in <span className="pb-mono">04:38</span> · <a href="#" className="linkish">Resend</a>
        </p>

        <div
          className="row"
          style={{
            justifyContent: "center",
            gap: 6,
            marginTop: 24,
            paddingTop: 18,
            borderTop: "1px solid var(--line)",
            color: "var(--ink-3)",
            fontSize: 12,
          }}
        >
          <I.Shield size={12} />
          AES-256 + KMS · key <span className="pb-mono" style={{ fontSize: 11 }}>arn:aws:kms:ca-central-1:…</span>
        </div>
      </div>
    </main>
  );
}
