import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "react-redux-history-next",
  description: "Next.js demo app",
  icons: [
    {
      rel: "icon",
      url: "/favicon.webp",
    },
  ],
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
