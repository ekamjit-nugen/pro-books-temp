"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { I } from "@/lib/icons";
import { FIRM } from "@/lib/data";

type NavItem = { href: string; label: string; icon: keyof typeof I; count?: number };

const PRIMARY: NavItem[] = [
  { href: "/app/inbox",     label: "Inbox",      icon: "Inbox",    count: 26 },
  { href: "/app/clients",   label: "Clients",    icon: "Clients",  count: 12 },
  { href: "/app/tax",       label: "Tax intake", icon: "Tax",      count: 4  },
  { href: "/app/documents", label: "Documents",  icon: "Folder" },
];

const SECONDARY: NavItem[] = [
  { href: "/app/audit",    label: "Audit log", icon: "Audit"    },
  { href: "/app/settings", label: "Settings",  icon: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <aside className="pb-sidebar">
      <Link href="/app/inbox" className="pb-logo" style={{ padding: "4px 10px 14px" }}>
        <span className="mark">P</span>
        <span>ProBooks</span>
      </Link>

      <div className="pb-pill" style={{ margin: "0 10px 14px", justifyContent: "flex-start" }}>
        <span className="pb-dot green" style={{ width: 6, height: 6, boxShadow: "none" }} />
        <span>{FIRM.name}</span>
      </div>

      {PRIMARY.map(item => {
        const Icon = I[item.icon];
        return (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>
            <Icon size={15} />
            <span>{item.label}</span>
            {item.count !== undefined && <span className="count">{item.count}</span>}
          </Link>
        );
      })}

      <div className="group-label">Admin</div>

      {SECONDARY.map(item => {
        const Icon = I[item.icon];
        return (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>
            <Icon size={15} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <div style={{ marginTop: "auto", padding: "12px 10px 0", borderTop: "1px solid var(--line)" }}>
        <div className="row" style={{ gap: 10 }}>
          <span className="pb-avatar" style={{ background: "oklch(88% 0.04 130)" }}>MC</span>
          <div className="col" style={{ gap: 0 }}>
            <span style={{ fontSize: 12, color: "var(--ink)" }}>Maya Chen, CPA</span>
            <span className="pb-meta">Partner · {FIRM.city}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
