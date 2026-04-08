"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Cpu,
  FileText,
  AlertTriangle,
  TrendingUp,
  Shield,
  Sparkles,
  Activity,
  CheckCircle2,
  Loader2,
  Zap,
  Brain,
  Download,
  Heart,
  ArrowRight,
  ShieldCheck,
  FileUp,
} from "lucide-react";

/* ── Agent Processing Steps ────────────────────── */
const processingSteps = [
  { label: "Document Authentication Agent", icon: Shield },
  { label: "Medical Context Agent (Gemini)", icon: Brain },
  { label: "Insurance Decoder Agent (Gemini)", icon: ShieldCheck },
  { label: "Hospital Quotation Agent (Gemini)", icon: FileUp },
  { label: "RNSIT Scheme & Financial Agent", icon: TrendingUp },
];

/* ── Agent Trail Data (Enhanced) ────────────────── */
const reportAgents = [
  { name: "Authenticator", status: "Verified", color: "bg-accent-green" },
  { name: "Medical Agent", status: "Context Extracted", color: "bg-accent-blue" },
  { name: "Insurance Agent", status: "Policy Decoded", color: "bg-accent-purple" },
  { name: "Quotation Agent", status: "Bill Parsed", color: "bg-accent-amber" },
  { name: "Scheme Agent", status: "Scheme Matched", color: "bg-accent-rose" },
  { name: "Financial Planner", status: "Plan Generated", color: "bg-accent-cyan" },
];

export default function DashboardPage() {
  const [step, setStep] = useState<"welcome" | "upload" | "processing" | "report">("welcome");
  const [currentAgent, setCurrentAgent] = useState(0);
  const [medicalFile, setMedicalFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [reportData, setReportData] = useState<any>(null);

  const medicalInputRef = useRef<HTMLInputElement>(null);
  const insuranceInputRef = useRef<HTMLInputElement>(null);
  const quotationInputRef = useRef<HTMLInputElement>(null);

  const pollResult = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8001/result/${id}`);
      const data = await res.json();
      if (data.status === "Complete") {
        setReportData(data.data);
        setStep("report");
      } else {
        setTimeout(() => pollResult(id), 2000);
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  };

  const startProcessing = useCallback(async () => {
    if (!medicalFile) return;
    setStep("processing");
    setCurrentAgent(0);

    const stepInterval = setInterval(() => {
      setCurrentAgent((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    const formData = new FormData();
    formData.append("medical_report", medicalFile);
    if (insuranceFile) formData.append("insurance_policy", insuranceFile);
    if (quotationFile) formData.append("hospital_quotation", quotationFile);
    formData.append("patient_name", "Valued Patient");

    try {
      const res = await fetch("http://localhost:8001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      pollResult(data.patient_id);
    } catch (err) {
      console.error("Upload failed", err);
      setStep("upload");
    }
  }, [medicalFile, insuranceFile, quotationFile]);

  const handleMedicalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMedicalFile(file);
  };

  const handleInsuranceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setInsuranceFile(file);
  };

  const handleQuotationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setQuotationFile(file);
  };

  return (
    <div className="animate-fade-in-up space-y-6 max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-10"
          >
            {/* ── Hero Section ── */}
            <div className="text-center pt-10 pb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan shadow-lg shadow-accent-purple/20 mb-8"
              >
                <Heart className="h-10 w-10 text-white" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-extrabold tracking-tight mb-4"
              >
                Welcome to <span className="gradient-text">MediFi</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted text-base max-w-2xl mx-auto leading-relaxed"
              >
                Worried about hospital bills? MediFi is your AI-powered healthcare finance assistant.
                Simply upload your medical reports, insurance policy, and hospital quotation — and our
                intelligent swarm of 6 AI agents will instantly analyze everything to find the best
                government schemes, NGO support, and financial strategies to minimize your out-of-pocket expenses.
              </motion.p>
            </div>

            {/* ── How It Works ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-widest text-muted mb-4 font-semibold">How It Works</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: FileUp, title: "1. Upload Documents", desc: "Upload your medical reports, insurance policy, and hospital bills — all processed securely.", accent: "accent-blue", num: "01" },
                { icon: Cpu, title: "2. AI Swarm Analyzes", desc: "6 specialized agents (Medical, Insurance, Quotation, Schemes, NGO, Financial) work in parallel to decode your situation.", accent: "accent-purple", num: "02" },
                { icon: ShieldCheck, title: "3. Get Your Strategy", desc: "Receive a clear, actionable financial plan showing total costs, coverage sources, and exactly how much you need to pay.", accent: "accent-green", num: "03" },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    className="glass-card p-6 text-center relative overflow-hidden group hover:border-white/10 transition-all"
                  >
                    <div className="absolute top-3 right-4 text-4xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors">{card.num}</div>
                    <div className={`h-12 w-12 rounded-2xl bg-${card.accent}/10 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-6 w-6 text-${card.accent}`} />
                    </div>
                    <h3 className="text-sm font-bold mb-2">{card.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center pt-4 space-y-3"
            >
              <button
                onClick={() => setStep("upload")}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent-blue to-accent-purple px-10 py-4 text-base font-bold text-white shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-xs text-muted">No sign-up required · 100% free · Powered by Gemini AI</p>
            </motion.div>
          </motion.div>
        )}

        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Upload Your <span className="gradient-text">Context</span>
              </h1>
              <p className="mt-1 text-sm text-muted">
                Provide your medical documents to empower the MediFi AI Swarm.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Medical */}
              <div
                onClick={() => medicalInputRef.current?.click()}
                className={`glass-card cursor-pointer flex flex-col items-center justify-center py-10 px-6 text-center transition-all ${medicalFile ? "border-accent-green bg-accent-green/5" : ""}`}
              >
                <input ref={medicalInputRef} type="file" onChange={handleMedicalUpload} className="hidden" />
                {medicalFile ? <CheckCircle2 className="h-10 w-10 text-accent-green mb-3" /> : <FileText className="h-10 w-10 text-accent-blue mb-3" />}
                <h3 className="text-sm font-semibold">Medical Report*</h3>
                <p className="text-xs text-muted truncate max-w-full">{medicalFile ? medicalFile.name : "Click to upload"}</p>
              </div>

              {/* Box 2: Insurance */}
              <div
                onClick={() => insuranceInputRef.current?.click()}
                className={`glass-card cursor-pointer flex flex-col items-center justify-center py-10 px-6 text-center transition-all ${insuranceFile ? "border-accent-green bg-accent-green/5" : ""}`}
              >
                <input ref={insuranceInputRef} type="file" onChange={handleInsuranceUpload} className="hidden" />
                {insuranceFile ? <CheckCircle2 className="h-10 w-10 text-accent-green mb-3" /> : <Shield className="h-10 w-10 text-accent-purple mb-3" />}
                <h3 className="text-sm font-semibold">Insurance Policy</h3>
                <p className="text-xs text-muted truncate max-w-full">{insuranceFile ? insuranceFile.name : "Optional"}</p>
              </div>

              {/* Box 3: Quotation */}
              <div
                onClick={() => quotationInputRef.current?.click()}
                className={`glass-card cursor-pointer flex flex-col items-center justify-center py-10 px-6 text-center transition-all ${quotationFile ? "border-accent-green bg-accent-green/5" : ""}`}
              >
                <input ref={quotationInputRef} type="file" onChange={handleQuotationUpload} className="hidden" />
                {quotationFile ? <CheckCircle2 className="h-10 w-10 text-accent-green mb-3" /> : <FileUp className="h-10 w-10 text-accent-amber mb-3" />}
                <h3 className="text-sm font-semibold">Hospital Quotation</h3>
                <p className="text-xs text-muted truncate max-w-full">{quotationFile ? quotationFile.name : "Recommended"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={startProcessing}
                disabled={!medicalFile}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${medicalFile ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg" : "bg-white/5 text-muted cursor-not-allowed"}`}
              >
                <Sparkles className="h-4 w-4" /> Unleash AI Swarm
              </button>
              <button onClick={() => setStep("welcome")} className="px-6 py-3 text-sm text-muted">Back</button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div key="processing" className="glass-card p-10 flex flex-col items-center text-center">
            <div className="relative h-20 w-20 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-blue/30 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center"><Brain className="h-8 w-8 text-accent-blue" /></div>
            </div>
            <h3 className="text-lg font-semibold gradient-text">Swarm Intelligence in Progress</h3>
            <p className="text-sm text-muted mb-8">Orchestrating 6 agents across MCP memory...</p>
            <div className="w-full max-w-sm space-y-3 text-left">
              {processingSteps.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm ${i <= currentAgent ? "text-accent-blue bg-accent-blue/5" : "text-muted/30"}`}>
                   {i < currentAgent ? <CheckCircle2 className="h-4 w-4 text-accent-green" /> : <Loader2 className={`h-4 w-4 ${i === currentAgent ? "animate-spin" : ""}`} />}
                   <span>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "report" && reportData && (
          <motion.div key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
             <div className="glass-card p-4 border-accent-green/20 flex items-center gap-3">
                <ShieldCheck className="text-accent-green" />
                <div>
                  <h4 className="font-bold text-accent-green uppercase text-xs">Final Strategy Generated</h4>
                  <p className="text-xs text-muted">Integrated plan for {reportData.medical?.diagnosis}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                   <div className="glass-card p-6">
                      <h3 className="font-bold mb-4">Financial Intelligence Report</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                         <div className="p-3 rounded-xl bg-white/5">
                            <p className="text-[10px] text-muted uppercase">Total Cost</p>
                            <p className="text-lg font-bold">₹{reportData.final_plan?.total_cost?.toLocaleString()}</p>
                         </div>
                         <div className="p-3 rounded-xl bg-accent-green/10">
                            <p className="text-[10px] text-accent-green uppercase">Covered</p>
                            <p className="text-lg font-bold text-accent-green">₹{reportData.final_plan?.covered_amount?.toLocaleString()}</p>
                         </div>
                         <div className="p-3 rounded-xl bg-accent-rose/10">
                            <p className="text-[10px] text-accent-rose uppercase">Out of Pocket</p>
                            <p className="text-lg font-bold text-accent-rose">₹{reportData.final_plan?.remaining_amount?.toLocaleString()}</p>
                         </div>
                         <div className="p-3 rounded-xl bg-accent-blue/10">
                            <p className="text-[10px] text-accent-blue uppercase">Support %</p>
                            <p className="text-lg font-bold text-accent-blue">{reportData.final_plan?.coverage_percentage}%</p>
                         </div>
                      </div>

                      <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
                        <p><strong>Medical Insight:</strong> {reportData.medical?.summary}</p>
                        <p><strong>Insurance Breakdown:</strong> Claim of ₹{reportData.insurance?.claimable_amount?.toLocaleString()} ({reportData.insurance?.status}) approved based on policy scan.</p>
                        <p><strong>Government Scheme:</strong> Eligible for <strong>{reportData.scheme?.scheme_name}</strong> (Coverage: ₹{reportData.scheme?.coverage_amount?.toLocaleString()}).</p>
                        <p><strong>NGO Support:</strong> Found {reportData.ngo?.matches?.length} matches. Top support from {reportData.ngo?.matches?.[0]?.name}.</p>
                        <div className="p-4 bg-accent-purple/5 rounded-xl border border-accent-purple/10">
                           <p className="font-bold text-accent-purple text-xs mb-1 uppercase">AI Strategic Recommendation</p>
                           <p className="text-sm italic">{reportData.final_plan?.model_insight}</p>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="glass-card p-5">
                      <h4 className="text-sm font-bold mb-4">Swarm Trace</h4>
                      <div className="space-y-3">
                         {reportAgents.map(ag => (
                           <div key={ag.name} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5">
                              <div className={`h-2 w-2 rounded-full ${ag.color}`} />
                              <span className="text-xs font-medium">{ag.name}</span>
                              <span className="text-[10px] text-muted ml-auto">{ag.status}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <button onClick={() => setStep("upload")} className="w-full glass-card p-3 text-sm font-semibold hover:bg-white/10">New Session</button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
