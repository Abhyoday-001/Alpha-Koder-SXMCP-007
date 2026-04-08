"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, Zap, Brain, TrendingUp, Shield, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const agents = [
  {
    name: "Diagnosis Agent",
    description: "Analyzes patient symptoms and medical history to identify conditions.",
    task: "Analyzing CT scan report for Patient ID #4821",
    status: "Active" as const,
    icon: Brain,
    accent: "accent-blue",
    metrics: { accuracy: "98.2%", processed: "1,247" },
  },
  {
    name: "Risk Assessment Agent",
    description: "Evaluates patient risk factors and generates probability scores.",
    task: "Scoring cardiovascular risk for Patient ID #3092",
    status: "Processing" as const,
    icon: Activity,
    accent: "accent-amber",
    metrics: { accuracy: "96.7%", processed: "892" },
  },
  {
    name: "Treatment Planning Agent",
    description: "Suggests treatment plans based on diagnosis and insurance.",
    task: "Generating post-operative recovery plan",
    status: "Active" as const,
    icon: Shield,
    accent: "accent-green",
    metrics: { accuracy: "94.5%", processed: "634" },
  },
  {
    name: "Financial Advisor Agent",
    description: "Calculates costs, finds coverage, and recommends savings.",
    task: "Estimating out-of-pocket for appendectomy",
    status: "Idle" as const,
    icon: TrendingUp,
    accent: "accent-purple",
    metrics: { accuracy: "99.1%", processed: "2,103" },
  },
];

function statusColor(s: string) {
  switch (s) {
    case "Active":
      return "bg-accent-green text-accent-green";
    case "Processing":
      return "bg-accent-amber text-accent-amber";
    case "Idle":
      return "bg-muted text-muted";
    default:
      return "bg-muted text-muted";
  }
}

export default function AgentSwarmPage() {
  const [ticks, setTicks] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTicks((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="animate-fade-in-up space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">Agent Swarm</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          Monitor and manage your fleet of AI agents orchestrated via MCP.
        </p>
      </div>

      {/* Summary Bar */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-accent-blue" />
          <span className="font-semibold">4</span>
          <span className="text-muted">Agents Deployed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent-green pulse-dot" />
          <span className="font-semibold">2</span>
          <span className="text-muted">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <Loader2 className="h-3.5 w-3.5 text-accent-amber animate-spin" />
          <span className="font-semibold">1</span>
          <span className="text-muted">Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-muted" />
          <span className="font-semibold">1</span>
          <span className="text-muted">Idle</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Zap className="h-4 w-4 text-accent-purple" />
          <span className="text-muted">MCP Latency: <span className="text-foreground font-semibold">12ms</span></span>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, i) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col gap-4 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-${agent.accent}/10 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${agent.accent}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{agent.name}</h3>
                    <p className="text-xs text-muted mt-0.5 max-w-[220px]">{agent.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${statusColor(agent.status).split(" ")[0]} ${agent.status !== "Idle" ? "pulse-dot" : ""}`} />
                  <span className={`text-xs font-medium ${statusColor(agent.status).split(" ")[1]}`}>
                    {agent.status}
                  </span>
                </div>
              </div>

              {/* Current Task */}
              <div className="rounded-xl border border-border bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-widest text-muted mb-1">
                  Current Task
                </p>
                <p className="text-xs text-foreground/80">{agent.task}</p>
              </div>

              {/* Metrics */}
              <div className="flex gap-4 text-xs">
                <div>
                  <p className="text-muted">Accuracy</p>
                  <p className="font-semibold mt-0.5">{agent.metrics.accuracy}</p>
                </div>
                <div>
                  <p className="text-muted">Processed</p>
                  <p className="font-semibold mt-0.5">{agent.metrics.processed}</p>
                </div>
              </div>

              {/* Activity bar animation */}
              <div className="flex gap-[2px] h-6 items-end">
                {Array.from({ length: 20 }).map((_, j) => {
                  const h = agent.status === "Idle"
                    ? 4
                    : Math.max(4, Math.sin((j + ticks) * 0.6) * 16 + 12);
                  return (
                    <motion.div
                      key={j}
                      animate={{ height: h }}
                      transition={{ duration: 0.4 }}
                      className={`flex-1 rounded-sm bg-${agent.accent}/30`}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
