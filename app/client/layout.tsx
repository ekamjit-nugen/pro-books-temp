import * as React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <div className="mobile-shell">{children}</div>;
}
