"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Topbar } from "@/components/topbar";

const SECTIONS = [
  { href: "/app/settings/firm",            label: "Firm profile"     },
  { href: "/app/settings/users",           label: "Users & roles"    },
  { href: "/app/settings/security",        label: "Security"         },
  { href: "/app/settings/retention",       label: "Retention & KMS"  },
  { href: "/app/settings/integrations",    label: "Integrations"     },
  { href: "/app/settings/billing",         label: "Billing"          },
  { href: "/app/settings/email-templates", label: "Email templates"  },
  { href: "/app/settings/audit-export",    label: "Audit export"     },
  { href: "/app/settings/appearance",      label: "Appearance"       },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = SECTIONS.find(s => pathname?.startsWith(s.href));

  return (
    <>
      <Topbar
        crumbs={[
          { label: "Settings", href: "/app/settings" },
          { label: current?.label ?? "" },
        ]}
      />

      <div style={{ padding: "24px 32px 40px", flex: 1 }}>
        <div style={{ marginBottom: 22 }}>
          <p className="pb-eyebrow" style={{ marginBottom: 4 }}>Eastlake & Cho CPA</p>
          <h1 className="pb-h2">
            Firm <em style={{ fontStyle: "italic", color: "var(--green)" }}>settings</em>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 22, alignItems: "start" }}>
          <aside className="pb-card" style={{ padding: 8 }}>
            {SECTIONS.map(s => {
              const active = pathname?.startsWith(s.href);
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  style={{
                    display: "block",
                    padding: "8px 10px",
                    borderRadius: "var(--r-2)",
                    fontSize: 13,
                    color: active ? "var(--ink)" : "var(--ink-3)",
                    backgroundColor: active ? "var(--paper-2)" : "transparent",
                    border: active ? "1px solid var(--line)" : "1px solid transparent",
                  }}
                >
                  {s.label}
                </Link>
              );
            })}
          </aside>

          <div className="col" style={{ gap: 18, minWidth: 0 }}>{children}</div>
        </div>
      </div>
    </>
  );
}
