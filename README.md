# MediFi — AI-Powered Healthcare Finance Platform

Worried about hospital bills? MediFi uses a swarm of 6 AI agents to analyze your medical reports, insurance policies, and hospital quotations — then finds the best government schemes, NGO support, and financial strategies to minimize your out-of-pocket expenses.

## What is MediFi?

MediFi is a multi-agent orchestration platform built for healthcare finance. A patient uploads their medical documents and the system runs them through 6 specialized AI agents in a coordinated pipeline. Each agent extracts insights from a different domain and combines them into a single, actionable financial strategy.

The system is powered by **Google Gemini 1.5 Flash** for intelligent document analysis and uses the **Model Context Protocol (MCP)** for persistent shared memory between agents.

## The 6 AI Agents

1. **Medical Context Agent** (Gemini) — Parses medical reports to extract diagnosis, severity, treatment plan, and estimated costs.
2. **Insurance Decoder Agent** (Gemini) — Analyzes insurance policy text against medical context to calculate claimable amounts and exclusions.
3. **Quotation Analyzer Agent** (Gemini) — Parses hospital estimate bills to determine admission deposits and total financial requirements.
4. **Government Scheme Agent** (Rule-based) — Matches the patient with applicable national/state healthcare schemes (Ayushman Bharat, PMJAY, etc.).
5. **NGO Matching Agent** (Gemini) — Semantically matches the patient's condition with NGO databases and generates persuasive funding requests.
6. **Financial Planner Agent** (Rule-based) — Aggregates all coverage sources and produces a final financial strategy with out-of-pocket calculation.

## How It Works

1. Patient uploads medical documents through the frontend.
2. The orchestrator creates a session in the MCP Memory Server and passes documents through each agent sequentially.
3. Each agent reads the shared MCP context, performs its analysis, and writes results back.
4. The Financial Planner consolidates all coverage sources into a final strategy.
5. The frontend displays a comprehensive breakdown: total cost, insurance coverage, scheme eligibility, NGO support, and the final out-of-pocket amount.

## Tech Stack

- **Frontend** — Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Backend** — FastAPI, Uvicorn, Python 3.10+
- **AI Engine** — Google Gemini 1.5 Flash
- **Memory** — MCP Protocol with SQLite persistence
- **Orchestration** — Custom async pipeline with sequential agent execution

## Project Structure

```
agents/              — All AI agent implementations (Gemini-powered + RNSIT wrappers)
orchestrator/        — 6-stage orchestration pipeline
mcp_core/            — MCP Memory Server (SQLite-backed, versioned, audit-logged)
rnsit/               — Original RNSIT agent logic (Scheme + Financial Planner)
data/                — NGO database for matching
medifi-frontend/     — Next.js dashboard (upload, progress, report views)
main.py              — FastAPI backend entry point
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Google Gemini API Key (optional — runs in mock mode without it)

### Backend

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Optional: enable full AI mode
echo "GOOGLE_API_KEY=your_key_here" > .env

python main.py
```

Backend starts on http://localhost:8001

### Frontend

```bash
cd medifi-frontend
npm install
npx next dev -p 5177 --webpack
```

Frontend starts on http://localhost:5177

### Usage

1. Open http://localhost:5177
2. Click **Get Started**
3. Upload your Medical Report (required), Insurance Policy (optional), and Hospital Quotation (recommended)
4. Click **Unleash AI Swarm**
5. View your Financial Intelligence Report

## MCP Memory Server

The MCP Memory Server provides shared context between all 6 agents:

- **Persistence** — SQLite-backed storage for patient sessions
- **Versioning** — Every update increments version and tracks which agent wrote it
- **Audit logging** — Records all agent read/write operations with timestamps
- **Domain isolation** — Each agent writes to its own section (medical, insurance, scheme, ngo, financial)

## Mock Mode

If no `GOOGLE_API_KEY` is set, all Gemini-powered agents fall back to deterministic mock mode with realistic sample data. This allows full demo and testing without an API key.

## Team

Built by **Team Alpha Koder** for SXMCP Hackathon.

## License

This project is built for hackathon and educational purposes.
