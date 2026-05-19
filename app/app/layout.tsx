import * as React from "react";
import { Sidebar } from "@/components/sidebar";

export default function AccountantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <Sidebar />
      <div className="page-content">{children}</div>
    </div>
  );
}
