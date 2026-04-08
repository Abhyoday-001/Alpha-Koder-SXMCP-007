"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  AlertTriangle,
  DollarSign,
  Shield,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";

const timelineItems = [
  {
    time: "09:12 AM",
    title: "Patient report uploaded",
    description: "CT scan report for Patient #4821 uploaded via dashboard.",
    icon: Upload,
    accent: "accent-blue",
    agent: "System",
  },
  {
    time: "09:12 AM",
    title: "MCP context initialized",
    description: "Shared memory context created for multi-agent processing.",
    icon: Brain,
    accent: "accent-purple",
    agent: "MCP Core",
  },
  {
    time: "09:13 AM",
    title: "Diagnosis Agent analyzed data",
    description: "Identified Acute Appendicitis with 98.2% confidence. Flagged for surgical intervention.",
    icon: FileText,
    accent: "accent-blue",
    agent: "Diagnosis Agent",
  },
  {
    time: "09:13 AM",
    title: "Risk Agent detected anomaly",
    description: "Elevated CRP levels (142mg/L) suggest possible perforation risk. Priority escalated.",
    icon: AlertTriangle,
    accent: "accent-amber",
    agent: "Risk Assessment Agent",
  },
  {
    time: "09:14 AM",
    title: "Insurance coverage verified",
    description: "Policy #99283-X covers 85% of surgical costs. Pre-authorization initiated.",
    icon: Shield,
    accent: "accent-green",
    agent: "Financial Advisor Agent",
  },
  {
    time: "09:14 AM",
    title: "Cost estimate generated",
    description: "Total estimated cost: $5,000. Out-of-pocket: $800. NGO match found for gap funding.",
    icon: DollarSign,
    accent: "accent-cyan",
    agent: "Financial Advisor Agent",
  },
  {
    time: "09:15 AM",
    title: "Workflow execution complete",
    description: "All agents reached consensus. Insurance claim drafted and NGO outreach initiated.",
    icon: CheckCircle2,
    accent: "accent-green",
    agent: "MCP Orchestrator",
  },
];

export default function MCPMemoryPage() {
  return (
    <div className="animate-fade-in-up space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">MCP Memory</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          Shared context timeline across all agents. Every decision is logged and traceable.
        </p>
      </div>

      {/* Stats */}
      <div className="glass-card p-4 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-accent-purple" />
          <span className="font-semibold">7</span>
          <span className="text-muted">Context Events</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-accent-blue" />
          <span className="text-muted">Session Duration: <span className="text-foreground font-semibold">3m 12s</span></span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-accent-green" />
          <span className="text-muted">Status: <span className="text-accent-green font-semibold">Complete</span></span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-green opacity-30" />

        <div className="space-y-1">
          {timelineItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-4 group"
              >
                {/* Icon Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-xl bg-${item.accent}/10 border border-${item.accent}/20 flex items-center justify-center group-hover:bg-${item.accent}/20 transition-colors`}>
                    <Icon className={`h-4 w-4 text-${item.accent}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="glass-card p-4 group-hover:border-border-hover transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <span className="text-[10px] text-muted font-mono">{item.time}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                    <div className="mt-2">
                      <span className={`text-[10px] font-semibold rounded-full border border-${item.accent}/20 bg-${item.accent}/10 text-${item.accent} px-2 py-0.5`}>
                        {item.agent}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
