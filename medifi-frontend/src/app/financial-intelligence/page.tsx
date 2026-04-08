"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Shield, Lightbulb, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";

/* ── Financial Metrics ─────────────────────── */
const metrics = [
  {
    label: "Estimated Treatment Cost",
    value: "$5,000",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
    accent: "accent-blue",
  },
  {
    label: "Insurance Coverage",
    value: "$4,200",
    change: "85%",
    trend: "up",
    icon: Shield,
    accent: "accent-green",
  },
  {
    label: "Out-of-Pocket",
    value: "$800",
    change: "-15%",
    trend: "down",
    icon: PieChart,
    accent: "accent-amber",
  },
  {
    label: "Potential Savings",
    value: "$1,350",
    change: "NGO match",
    trend: "up",
    icon: TrendingUp,
    accent: "accent-purple",
  },
];

/* ── Cost Breakdown ────────────────────────── */
const costBreakdown = [
  { category: "Surgery & Procedure", amount: 2800, pct: 56 },
  { category: "Anesthesia", amount: 600, pct: 12 },
  { category: "Hospital Stay (2 days)", amount: 900, pct: 18 },
  { category: "Lab Work & Diagnostics", amount: 400, pct: 8 },
  { category: "Medications", amount: 300, pct: 6 },
];

const barColors = [
  "bg-accent-blue",
  "bg-accent-purple",
  "bg-accent-cyan",
  "bg-accent-amber",
  "bg-accent-green",
];

/* ── Recommendations ───────────────────────── */
const recommendations = [
  {
    title: "Apply for HealthFirst NGO Assistance",
    description: "Your case qualifies for gap funding covering up to $800. Auto-drafted application is ready for submission.",
    impact: "Save $800",
    priority: "High",
  },
  {
    title: "Switch to Generic Medications",
    description: "Generic alternatives are available for 3 prescribed medications with equivalent efficacy.",
    impact: "Save $150/mo",
    priority: "Medium",
  },
  {
    title: "Pre-authorize Follow-up Tests",
    description: "Pre-authorise the post-op blood panel and imaging to avoid out-of-network charges.",
    impact: "Save $400",
    priority: "Medium",
  },
  {
    title: "Enroll in Hospital Payment Plan",
    description: "0% interest installment plan available for the remaining co-pay over 6 months.",
    impact: "0% Interest",
    priority: "Low",
  },
];

function priorityColor(p: string) {
  switch (p) {
    case "High":
      return "bg-accent-rose/10 text-accent-rose border-accent-rose/20";
    case "Medium":
      return "bg-accent-amber/10 text-accent-amber border-accent-amber/20";
    case "Low":
      return "bg-accent-green/10 text-accent-green border-accent-green/20";
    default:
      return "bg-card text-muted border-border";
  }
}

export default function FinancialIntelligencePage() {
  return (
    <div className="animate-fade-in-up space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">Financial Intelligence</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          AI-generated financial insights, cost estimates, and savings recommendations.
        </p>
      </div>

      {/* ── Metric Cards ───────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`h-9 w-9 rounded-xl bg-${m.accent}/10 flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 text-${m.accent}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${m.trend === "up" ? "text-accent-green" : "text-accent-rose"}`}>
                  {m.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {m.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">{m.value}</p>
                <p className="text-xs text-muted mt-0.5">{m.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ── Cost Breakdown ─────────────────── */}
        <div className="lg:col-span-2 glass-card p-6 space-y-5">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <PieChart className="h-4 w-4 text-accent-blue" />
            Cost Breakdown
          </h3>

          {/* Visual Bar Chart */}
          <div className="flex gap-1 h-4 rounded-full overflow-hidden">
            {costBreakdown.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`${barColors[i]} rounded-sm`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {costBreakdown.map((item, i) => (
              <div key={item.category} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-sm ${barColors[i]}`} />
                  <span className="text-muted">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${item.amount.toLocaleString()}</span>
                  <span className="text-muted w-8 text-right">{item.pct}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-sm">
            <span className="font-semibold">Total</span>
            <span className="font-bold">$5,000</span>
          </div>
        </div>

        {/* ── Savings Recommendations ────────── */}
        <div className="lg:col-span-3 glass-card p-6 space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent-amber" />
            Savings Recommendations
          </h3>

          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-xl border border-border bg-white/[0.02] p-4 hover:bg-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{rec.title}</h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{rec.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-[10px] font-semibold rounded-full border px-2 py-0.5 ${priorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span className="text-xs font-bold text-accent-green">{rec.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Coverage Waterfall ──────────────── */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-sm mb-5">Coverage Waterfall</h3>
        <div className="flex items-end gap-3 h-40">
          {[
            { label: "Total Cost", value: 5000, accent: "bg-accent-blue" },
            { label: "Insurance", value: 4200, accent: "bg-accent-green" },
            { label: "NGO Fund", value: 550, accent: "bg-accent-purple" },
            { label: "Your Cost", value: 250, accent: "bg-accent-amber" },
          ].map((bar, i) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold">${bar.value.toLocaleString()}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(bar.value / 5000) * 100}%` }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                className={`w-full rounded-xl ${bar.accent} min-h-[8px]`}
              />
              <span className="text-[10px] text-muted text-center">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
