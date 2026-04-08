import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediFi — AI Healthcare Finance Platform",
  description:
    "MCP-powered platform orchestrating AI agents for medical analysis & financial planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Sidebar />
        {/* Main content area — offset by sidebar width */}
        <div className="pl-[260px] min-h-screen flex flex-col transition-all duration-300">
          <TopNav />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
