"use client";

import * as React from "react";
import Link from "next/link";
import { I } from "@/lib/icons";

type Item = { name: string; size: string; progress: number; kind: "pdf" | "jpg" };

const INITIAL: Item[] = [
  { name: "IMG_4521.heic",                  size: "2.4 MB", progress: 100, kind: "jpg" },
  { name: "Sysco-DLY-0518.pdf",             size: "188 KB", progress: 100, kind: "pdf" },
  { name: "TimHortons-staffmeeting.heic",   size: "1.1 MB", progress: 64,  kind: "jpg" },
  { name: "LibertyVillage-receipt.pdf",     size: "256 KB", progress: 18,  kind: "pdf" },
];

export default function UploadPage() {
  const [items, setItems] = React.useState<Item[]>(INITIAL);

  React.useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => prev.map(it => it.progress < 100
        ? { ...it, progress: Math.min(100, it.progress + Math.ceil(Math.random() * 18)) }
        : it
      ));
    }, 450);
    return () => clearInterval(t);
  }, []);

  const allDone = items.every(i => i.progress === 100);

  return (
    <>
      <header className="client-header">
        <div className="row" style={{ marginBottom: 8 }}>
          <Link href="/client/bookkeeping" style={{ color: "var(--ink-2)" }}>
            <I.ArrowL size={18} />
          </Link>
          <span className="grow" style={{ fontSize: 13, color: "var(--ink-2)", textAlign: "center" }}>
            Upload receipts
          </span>
          <span style={{ width: 18 }} />
        </div>
        <p className="pb-eyebrow" style={{ marginBottom: 4 }}>May 2026</p>
        <h1 className="pb-h2" style={{ fontSize: 22 }}>
          {allDone ? (
            <>All <em style={{ fontStyle: "italic", color: "var(--green)" }}>4</em> uploaded.</>
          ) : (
            <>Uploading <em style={{ fontStyle: "italic", color: "var(--green)" }}>{items.filter(i => i.progress < 100).length}</em>…</>
          )}
        </h1>
      </header>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            padding: 28,
            border: "2px dashed var(--line-strong)",
            borderRadius: "var(--r-3)",
            textAlign: "center",
            color: "var(--ink-2)",
            background: "var(--paper-2)",
          }}
        >
          <I.Upload size={26} />
          <p style={{ fontSize: 14.5, color: "var(--ink)", marginTop: 10 }}>
            Drag more files here, or tap to add
          </p>
          <p className="pb-meta" style={{ marginTop: 4 }}>
            PDF · JPG · HEIC up to 25 MB each
          </p>
        </div>

        <div className="col" style={{ gap: 10 }}>
          {items.map((it, i) => (
            <div key={i} className="pb-card" style={{ padding: 12 }}>
              <div className="row" style={{ gap: 10 }}>
                {it.kind === "pdf"
                  ? <I.PDF size={16} stroke="var(--red)" />
                  : <I.Doc size={16} stroke="var(--ink-3)" />}
                <div className="col grow" style={{ gap: 2, minWidth: 0 }}>
                  <span
                    className="pb-mono"
                    style={{ fontSize: 12, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {it.name}
                  </span>
                  <span className="pb-meta">{it.size}</span>
                </div>
                {it.progress === 100 ? (
                  <span className="pb-chip green"><I.Check size={11} /> done</span>
                ) : (
                  <span className="pb-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{it.progress}%</span>
                )}
              </div>
              <div className="pb-progress" style={{ marginTop: 8 }}>
                <div style={{ width: `${it.progress}%`, background: it.progress === 100 ? "var(--leaf)" : "var(--green)" }} />
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/client/tax"
          className="pb-btn primary lg full center"
          aria-disabled={!allDone}
          style={{ pointerEvents: allDone ? "auto" : "none", opacity: allDone ? 1 : 0.5 }}
        >
          Continue · 1 question left <I.Arrow size={14} />
        </Link>

        <p className="pb-meta" style={{ textAlign: "center" }}>
          Files are encrypted at rest with your firm's KMS key.
        </p>
      </div>
    </>
  );
}
