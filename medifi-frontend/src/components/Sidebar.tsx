"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Cpu,
  TrendingUp,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patient-reports", label: "Patient Reports", icon: FileText },
  { href: "/agent-swarm", label: "Agent Swarm", icon: Cpu },
  { href: "/financial-intelligence", label: "Financial Intelligence", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border bg-[#09090b] overflow-hidden"
    >
      {/* ── Logo ───────────────────────────── */}
      <div className="flex items-center gap-3 px-5 pt-7 pb-8">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple">
          <Zap className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold tracking-tight gradient-text"
          >
            MediFi
          </motion.span>
        )}
      </div>

      {/* ── Menu Label ─────────────────────── */}
      {!collapsed && (
        <div className="px-5 pb-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
            Navigation
          </span>
        </div>
      )}

      {/* ── Nav Items ──────────────────────── */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "text-white bg-white/[0.08]"
                    : "text-muted hover:text-foreground hover:bg-white/[0.04]"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-white/[0.08] border border-border-hover"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={`relative z-10 h-[18px] w-[18px] shrink-0 ${active ? "text-accent-blue" : ""}`} />
              {!collapsed && (
                <span className="relative z-10 truncate">{item.label}</span>
              )}
              {active && !collapsed && (
                <div className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-accent-blue pulse-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── System Status ──────────────────── */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <div className="h-2 w-2 rounded-full bg-accent-green pulse-dot" />
            <span>System Online</span>
          </div>
          <div className="mt-1.5 text-[10px] text-muted/60">
            5 agents connected · 12ms latency
          </div>
        </div>
      )}

      {/* ── Collapse Toggle ────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-4 flex h-9 items-center justify-center rounded-xl border border-border text-muted hover:text-foreground hover:bg-card transition-colors"
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </motion.aside>
  );
}
