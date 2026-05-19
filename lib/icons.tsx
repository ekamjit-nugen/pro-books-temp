// Minimal line icons — 16x16 default, 1.5 stroke.
import * as React from "react";

type Props = {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
} & React.SVGProps<SVGSVGElement>;

const make = (paths: string[]) =>
  function Icon({ size = 16, stroke = "currentColor", strokeWidth = 1.5, ...rest }: Props) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        {paths.map((d, i) => <path key={i} d={d} />)}
      </svg>
    );
  };

export const I = {
  Inbox:    make(["M3 12l3-7h12l3 7", "M3 12v7h18v-7", "M3 12h5l2 3h4l2-3h5"]),
  Clients:  make(["M3 20a7 7 0 0 1 14 0", "M10 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8", "M16 11a3 3 0 1 0 0-6", "M21 20a5 5 0 0 0-5-5"]),
  Folder:   make(["M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"]),
  Tax:      make(["M9 3v18", "M15 3v18", "M3 9h18", "M3 15h18", "M7 7l2 2", "M17 17l-2-2"]),
  Audit:    make(["M4 4h12l4 4v12H4z", "M16 4v4h4", "M8 12h8", "M8 16h5"]),
  Settings: make(["M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.9l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"]),
  Billing:  make(["M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M3 10h18", "M7 15h3"]),
  Search:   make(["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"]),
  Plus:     make(["M12 5v14", "M5 12h14"]),
  Check:    make(["M5 12l5 5L20 7"]),
  X:        make(["M6 6l12 12", "M18 6L6 18"]),
  Chevron:  make(["M9 6l6 6-6 6"]),
  ChevDown: make(["M6 9l6 6 6-6"]),
  Arrow:    make(["M5 12h14", "M13 5l7 7-7 7"]),
  ArrowL:   make(["M19 12H5", "M11 19l-7-7 7-7"]),
  Flag:     make(["M4 4v17", "M4 5h12l-2 4 2 4H4"]),
  Bell:     make(["M6 10a6 6 0 0 1 12 0v4l2 3H4l2-3z", "M10 21a2 2 0 0 0 4 0"]),
  Lock:     make(["M5 11h14v10H5z", "M8 11V8a4 4 0 0 1 8 0v3"]),
  Upload:   make(["M12 4v12", "M7 9l5-5 5 5", "M5 20h14"]),
  Download: make(["M12 4v12", "M7 11l5 5 5-5", "M5 20h14"]),
  Doc:      make(["M6 3h9l4 4v14H6z", "M14 3v5h5"]),
  Excel:    make(["M6 3h9l4 4v14H6z", "M14 3v5h5", "M9 13l5 5", "M14 13l-5 5"]),
  PDF:      make(["M6 3h9l4 4v14H6z", "M14 3v5h5", "M9 13h2a1.5 1.5 0 0 1 0 3H9zM9 13v5", "M14 13v5h2", "M14 15h1.5"]),
  Zip:      make(["M6 3h9l4 4v14H6z", "M14 3v5h5", "M10 6h2v2h-2zM10 10h2v2h-2zM10 14h2v2h-2z"]),
  Mail:     make(["M3 6h18v12H3z", "M3 6l9 7 9-7"]),
  Link:     make(["M9 15a4 4 0 0 1 0-6l3-3a4 4 0 1 1 6 6l-1.5 1.5", "M15 9a4 4 0 0 1 0 6l-3 3a4 4 0 1 1-6-6l1.5-1.5"]),
  Phone:    make(["M5 4h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"]),
  Sparkle:  make(["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z","M19 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"]),
  Coffee:   make(["M5 8h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z","M17 10h2a2 2 0 0 1 0 4h-2","M8 3v2","M11 3v2","M14 3v2"]),
  Receipt:  make(["M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z","M9 8h6","M9 12h6","M9 16h4"]),
  Clock:    make(["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z","M12 7v5l3 2"]),
  Calendar: make(["M4 6h16v14H4z","M4 10h16","M8 4v4","M16 4v4"]),
  Filter:   make(["M3 5h18","M6 12h12","M10 19h4"]),
  More:     make(["M5 12h.01","M12 12h.01","M19 12h.01"]),
  Eye:      make(["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z","M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"]),
  Pencil:   make(["M4 20l4-1 11-11-3-3L5 16l-1 4z","M14 6l3 3"]),
  Bank:     make(["M3 10l9-6 9 6","M5 10v9","M19 10v9","M9 10v9","M15 10v9","M3 21h18"]),
  Shield:   make(["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z","M9 12l2 2 4-4"]),
  TrendUp:  make(["M3 17l6-6 4 4 8-8","M15 7h6v6"]),
  Building: make(["M4 21V5l8-2 8 2v16","M4 21h16","M9 9h2","M13 9h2","M9 13h2","M13 13h2","M9 17h6"]),
  Logout:   make(["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]),
  History:  make(["M3 12a9 9 0 1 0 3-6.7","M3 4v5h5","M12 8v5l3 2"]),
};
