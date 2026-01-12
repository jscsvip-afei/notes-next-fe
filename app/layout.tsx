import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

export const metadata: Metadata = {
  title: "Next云笔记",
  description: "A simple note taking app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <div className="flex flex-col h-screen w-full bg-base-100">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 h-full overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
