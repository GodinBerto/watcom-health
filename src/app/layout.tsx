/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Watcom IV Academy",
  description: "Online clinic-led training and certification for health and beauty professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
