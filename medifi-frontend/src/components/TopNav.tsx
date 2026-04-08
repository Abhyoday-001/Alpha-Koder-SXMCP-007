"use client";

import { Bell, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
      {/* ── Search ─────────────────────── */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search patients, agents, reports..."
            className="h-9 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-mono text-muted">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* ── Right Section ──────────────── */}
      <div className="flex items-center gap-4">
        {/* AI Status */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden sm:flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-purple" />
          <span className="text-xs font-medium text-accent-purple">AI Active</span>
        </motion.div>

        {/* Notifications */}
        <button className="relative h-9 w-9 flex items-center justify-center rounded-xl border border-border bg-card text-muted hover:text-foreground hover:bg-card-hover transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-rose text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-xs font-bold text-white">
            RS
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-none">Rahul Sharma</p>
            <p className="text-xs text-muted mt-0.5">Patient</p>
          </div>
        </div>
      </div>
    </header>
  );
}
