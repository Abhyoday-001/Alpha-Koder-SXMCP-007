"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Palette, Shield, Database } from "lucide-react";

const sections = [
  {
    title: "Profile",
    icon: User,
    items: [
      { label: "Name", value: "Dr. Olivia Mitchell" },
      { label: "Specialty", value: "Cardiology" },
      { label: "Hospital", value: "Metro General Hospital" },
      { label: "License", value: "MD-2024-3891" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Agent Alerts", value: "Enabled", toggle: true },
      { label: "Report Completion", value: "Enabled", toggle: true },
      { label: "Risk Warnings", value: "Enabled", toggle: true },
      { label: "Weekly Digest", value: "Disabled", toggle: true },
    ],
  },
  {
    title: "MCP Configuration",
    icon: Database,
    items: [
      { label: "Memory Retention", value: "30 days" },
      { label: "Agent Timeout", value: "120 seconds" },
      { label: "Max Parallel Agents", value: "5" },
      { label: "Context Window", value: "128k tokens" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { label: "Two-Factor Auth", value: "Enabled", toggle: true },
      { label: "Session Duration", value: "8 hours" },
      { label: "Audit Logging", value: "Enabled", toggle: true },
      { label: "Data Encryption", value: "AES-256" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="animate-fade-in-up space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage your profile, preferences, and MCP configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent-blue" />
                <h3 className="font-semibold text-sm">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-xs text-muted">{item.label}</span>
                    {item.toggle ? (
                      <div
                        className={`h-5 w-9 rounded-full relative cursor-pointer transition-colors ${
                          item.value === "Enabled"
                            ? "bg-accent-blue"
                            : "bg-white/10"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                            item.value === "Enabled" ? "left-[18px]" : "left-0.5"
                          }`}
                        />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
