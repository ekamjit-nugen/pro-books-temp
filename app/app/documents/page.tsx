"use client";

import { Topbar } from "@/components/topbar";
import { I } from "@/lib/icons";

type DocItem = {
  filename: string;
  client: string;
  size: string;
  status: "extracted" | "queued";
  confidence: number;
  kind: "pdf" | "excel" | "zip";
};

const DOCS: DocItem[] = [
  { filename:"DeMelloPalheta-INV-04812.pdf", client:"Larchmont Roastery", size:"284 KB", status:"extracted", confidence:0.972, kind:"pdf"   },
  { filename:"Toronto-Hydro-Apr2026.pdf",    client:"Larchmont Roastery", size:"118 KB", status:"extracted", confidence:0.998, kind:"pdf"   },
  { filename:"T4-Stardust-Theatre.pdf",      client:"H. Okonkwo",         size:"94 KB",  status:"extracted", confidence:0.881, kind:"pdf"   },
  { filename:"ACK-Grainger-INV-2284.pdf",    client:"Trinity HVAC",       size:"412 KB", status:"extracted", confidence:0.964, kind:"pdf"   },
  { filename:"LibertyVillage-Lease-May.pdf", client:"Larchmont Roastery", size:"1.2 MB", status:"extracted", confidence:1.000, kind:"pdf"   },
  { filename:"Sysco-Toronto-DLY-0512.pdf",   client:"Larchmont Roastery", size:"206 KB", status:"extracted", confidence:0.994, kind:"pdf"   },
  { filename:"Q1-2026-bookkeeping.zip",      client:"Mistral Studio",     size:"3.4 MB", status:"queued",    confidence:0,     kind:"zip"   },
  { filename:"RRSP-receipts-bundle.pdf",     client:"H. Okonkwo",         size:"880 KB", status:"extracted", confidence:0.989, kind:"pdf"   },
  { filename:"PayWorks-May-Run.xlsx",        client:"Larchmont Roastery", size:"42 KB",  status:"extracted", confidence:1.000, kind:"excel" },
  { filename:"Allstate-Policy-2026.pdf",     client:"Larchmont Roastery", size:"640 KB", status:"extracted", confidence:0.999, kind:"pdf"   },
  { filename:"Bayview-Apr-recon.zip",        client:"Bayview Dental",     size:"2.1 MB", status:"queued",    confidence:0,     kind:"zip"   },
  { filename:"HenrySchein-INV-4855.pdf",     client:"Don Mills Vet",      size:"344 KB", status:"extracted", confidence:0.967, kind:"pdf"   },
];

function KindIcon({ kind }: { kind: DocItem["kind"] }) {
  if (kind === "pdf") return <I.PDF size={18} stroke="var(--red)" />;
  if (kind === "excel") return <I.Excel size={18} stroke="var(--green)" />;
  return <I.Zip size={18} stroke="var(--ink-3)" />;
}

export default function DocumentsPage() {
  return (
    <>
      <Topbar
        crumbs={[{ label: "Documents" }]}
        right={
          <>
            <button className="pb-btn sm"><I.Filter size={13} /> Filter</button>
            <button className="pb-btn primary sm"><I.Upload size={13} /> Upload</button>
          </>
        }
      />

      <div style={{ padding: "24px 32px 40px", flex: 1 }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Document pipeline</p>
            <h1 className="pb-h2">
              Extracted, <em style={{ fontStyle: "italic", color: "var(--green)" }}>indexed</em>, retained.
            </h1>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className="pb-chip">10 extracted</span>
            <span className="pb-chip amber">2 queued</span>
            <span className="pb-chip brand"><I.Shield size={11} /> 7-yr retention</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {DOCS.map(d => (
            <div key={d.filename} className="pb-card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="pb-placeholder" style={{ height: 96 }}>
                {d.kind === "pdf" ? "PDF · 2 pages · OCR" : d.kind === "excel" ? "XLSX · 3 sheets" : "ZIP · 14 files"}
              </div>

              <div className="row" style={{ gap: 10 }}>
                <KindIcon kind={d.kind} />
                <div className="col grow" style={{ gap: 0, minWidth: 0 }}>
                  <span className="pb-mono" style={{ fontSize: 12, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {d.filename}
                  </span>
                  <span className="pb-meta">{d.client} · {d.size}</span>
                </div>
              </div>

              <div className="row" style={{ gap: 8 }}>
                <span className={`pb-chip ${d.status === "queued" ? "amber" : "green"}`}>
                  <span className="dot" /> {d.status}
                </span>
                {d.confidence > 0 && (
                  <span
                    className="pb-pill"
                    style={{
                      color: d.confidence < 0.975 ? "var(--red)" : d.confidence < 0.985 ? "var(--amber)" : "var(--leaf)",
                    }}
                  >
                    {(d.confidence * 100).toFixed(1)}%
                  </span>
                )}
                <button className="pb-btn ghost sm right" aria-label="More"><I.More size={14} strokeWidth={2.5} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
