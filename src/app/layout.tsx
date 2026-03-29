import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liquid Glass Input Framework",
  description: "A next-generation SaaS UI Input Framework with Liquid Glass aesthetic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
