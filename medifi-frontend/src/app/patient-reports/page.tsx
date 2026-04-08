"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye, CheckCircle2, Clock, AlertTriangle, Search, Upload } from "lucide-react";
import { useState } from "react";

const reports = [
  {
    name: "CT_Scan_Abdomen_4821.pdf",
    patient: "Patient #4821",
    date: "Apr 8, 2026",
    status: "Analyzed",
    statusColor: "accent-green",
    summary: "CT scan confirms acute appendicitis with mild periappendiceal fat stranding. No abscess. Surgical intervention recommended.",
    size: "2.4 MB",
  },
  {
    name: "Blood_Panel_3092.pdf",
    patient: "Patient #3092",
    date: "Apr 7, 2026",
    status: "Analyzed",
    statusColor: "accent-green",
    summary: "Complete blood panel showing elevated CRP (142mg/L) and WBC count (18,000/μL). Suggestive of acute inflammatory response.",
    size: "856 KB",
  },
  {
    name: "ECG_Report_5517.jpg",
    patient: "Patient #5517",
    date: "Apr 7, 2026",
    status: "Processing",
    statusColor: "accent-amber",
    summary: "12-lead ECG uploaded. Awaiting rhythm analysis by Diagnosis Agent. Preliminary: normal sinus rhythm noted.",
    size: "1.1 MB",
  },
  {
    name: "MRI_Brain_2284.pdf",
    patient: "Patient #2284",
    date: "Apr 6, 2026",
    status: "Pending",
    statusColor: "muted",
    summary: "MRI brain scan queued for analysis. High-priority flag set by referring physician due to recurring headaches.",
    size: "8.7 MB",
  },
  {
    name: "Chest_XRay_1190.png",
    patient: "Patient #1190",
    date: "Apr 6, 2026",
    status: "Analyzed",
    statusColor: "accent-green",
    summary: "PA and lateral chest X-ray shows clear lung fields. No cardiomegaly. No pleural effusion. Normal study.",
    size: "3.2 MB",
  },
  {
    name: "Pathology_Report_6643.pdf",
    patient: "Patient #6643",
    date: "Apr 5, 2026",
    status: "Analyzed",
    statusColor: "accent-green",
    summary: "Biopsy results: Benign fibroadenoma. No malignant cells detected. Routine follow-up in 6 months recommended.",
    size: "1.5 MB",
  },
];

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "Analyzed":
      return <CheckCircle2 className="h-3.5 w-3.5 text-accent-green" />;
    case "Processing":
      return <Clock className="h-3.5 w-3.5 text-accent-amber" />;
    case "Pending":
      return <AlertTriangle className="h-3.5 w-3.5 text-muted" />;
    default:
      return null;
  }
}

export default function PatientReportsPage() {
  const [search, setSearch] = useState("");
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const filtered = reports.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuotationUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setQuotationFile(file);
      // Here you would typically send the file to your backend
      console.log("Quotation file uploaded:", file.name);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Patient Reports</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            All uploaded medical documents with AI-generated summaries.
          </p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter reports..."
            className="h-9 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Quotation Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 flex flex-col gap-4 group border-2 border-dashed border-accent-blue/30 hover:border-accent-blue/50 transition-colors"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
              <Upload className="h-4 w-4 text-accent-blue" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold truncate">
                {quotationFile ? quotationFile.name : "Upload Quotation"}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {quotationFile ? `${quotationFile.size} bytes` : "Click to upload doctor's quotation"}
              </p>
            </div>
          </div>

          {/* Status & Date */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {quotationFile ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-green" />
                  <span className="font-medium text-accent-green">Uploaded</span>
                </>
              ) : (
                <>
                  <Clock className="h-3.5 w-3.5 text-accent-amber" />
                  <span className="font-medium text-accent-amber">Ready to Upload</span>
                </>
              )}
            </div>
            <span className="text-muted">{new Date().toLocaleDateString()}</span>
          </div>

          {/* Summary */}
          <p className="text-xs text-muted leading-relaxed line-clamp-3">
            {quotationFile 
              ? "Quotation uploaded successfully. Ready for cost analysis and comparison."
              : "Upload doctor's treatment quotation for automated pricing analysis and financial planning."
            }
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-auto pt-2 border-t border-border">
            <div className="relative flex-1">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleQuotationUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="quotation-upload"
              />
              <label
                htmlFor="quotation-upload"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-white/[0.02] py-2 text-xs font-medium text-muted hover:text-foreground hover:bg-card-hover transition-all cursor-pointer w-full"
              >
                <Upload className="h-3.5 w-3.5" />
                {quotationFile ? "Change File" : "Upload"}
              </label>
            </div>
            {quotationFile && (
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-white/[0.02] py-2 text-xs font-medium text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
            )}
          </div>
        </motion.div>

        {filtered.map((report, i) => (
          <motion.div
            key={report.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-5 flex flex-col gap-4 group"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-accent-blue" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold truncate">{report.name}</h3>
                <p className="text-xs text-muted mt-0.5">{report.patient} · {report.size}</p>
              </div>
            </div>

            {/* Status & Date */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <StatusIcon status={report.status} />
                <span className={`font-medium text-${report.statusColor}`}>{report.status}</span>
              </div>
              <span className="text-muted">{report.date}</span>
            </div>

            {/* Summary */}
            <p className="text-xs text-muted leading-relaxed line-clamp-3">
              {report.summary}
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-2 border-t border-border">
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-white/[0.02] py-2 text-xs font-medium text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Eye className="h-3.5 w-3.5" />
                View Analysis
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-white/[0.02] py-2 text-xs font-medium text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
