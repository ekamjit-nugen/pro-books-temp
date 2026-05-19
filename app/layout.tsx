import "./globals.css";
import * as React from "react";
import type { Metadata } from "next";
import { Newsreader, Geist, JetBrains_Mono } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProBooks — Eastlake & Cho CPA",
  description: "The quiet workflow for Canadian CPA firms.",
};

// Restore the user's chosen palette before React hydrates so there's no FOUC.
const PALETTE_INIT = `(function(){try{var p=localStorage.getItem('pb_palette')||'D';document.documentElement.setAttribute('data-palette',p);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-palette="D"
      className={`${newsreader.variable} ${geist.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PALETTE_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
