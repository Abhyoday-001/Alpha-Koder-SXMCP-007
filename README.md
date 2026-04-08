<![CDATA[# 🏥 MediFi — AI-Powered Healthcare Finance Platform

> **Worried about hospital bills?** MediFi uses a swarm of 6 AI agents to analyze your medical reports, insurance policies, and hospital quotations — then finds the best government schemes, NGO support, and financial strategies to minimize your out-of-pocket expenses.

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?logo=google&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![MCP](https://img.shields.io/badge/MCP-Memory%20Server-purple)

---

## 🧠 What is MediFi?

MediFi is a **multi-agent orchestration platform** built for healthcare finance. It takes a patient's medical documents and runs them through 6 specialized AI agents in a coordinated pipeline. Each agent extracts insights from a different domain — medical context, insurance coverage, hospital billing, government schemes, NGO funding, and financial planning — and combines them into a single, actionable financial strategy.

The system is powered by **Google Gemini 1.5 Flash** for intelligent document analysis and uses the **Model Context Protocol (MCP)** for persistent shared memory between agents.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend (Port 5177)              │
│         Upload Documents → View Agent Progress → Report      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP API
┌──────────────────────────▼──────────────────────────────────┐
│                   FastAPI Backend (Port 8001)                │
│                      main.py (API Layer)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│              MediFi Orchestrator (pipeline.py)                │
│           6-Stage Sequential Agent Pipeline                   │
│                                                               │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│   │ Medical  │→ │Insurance │→ │Quotation │                   │
│   │ Agent    │  │ Decoder  │  │ Analyzer │                   │
│   │(Gemini)  │  │(Gemini)  │  │(Gemini)  │                   │
│   └──────────┘  └──────────┘  └──────────┘                   │
│         ↓              ↓             ↓                        │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│   │  Govt    │→ │   NGO    │→ │Financial │                   │
│   │ Scheme   │  │ Matcher  │  │ Planner  │                   │
│   │ (RNSIT)  │  │(Gemini)  │  │ (RNSIT)  │                   │
│   └──────────┘  └──────────┘  └──────────┘                   │
│                                                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│              MCP Memory Server (SQLite)                       │
│     Shared context, versioning, audit logs, agent traces      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 The 6 AI Agents

| # | Agent | Engine | What It Does |
|---|-------|--------|-------------|
| 1 | **Medical Context Agent** | Gemini 1.5 Flash | Parses medical reports to extract diagnosis, severity, treatment plan, and estimated costs |
| 2 | **Insurance Decoder Agent** | Gemini 1.5 Flash | Analyzes insurance policy text against medical context to calculate claimable amounts and exclusions |
| 3 | **Quotation Analyzer Agent** | Gemini 1.5 Flash | Parses hospital estimate bills to determine admission deposits and total financial requirements |
| 4 | **Government Scheme Agent** | Rule-based (RNSIT) | Matches the patient with applicable national/state healthcare schemes (Ayushman Bharat, PMJAY, etc.) |
| 5 | **NGO Matching Agent** | Gemini 1.5 Flash | Semantically matches the patient's condition with NGO databases and generates persuasive funding requests |
| 6 | **Financial Planner Agent** | Rule-based (RNSIT) | Aggregates all coverage sources and produces a final financial strategy with out-of-pocket calculation |

---

## 📁 Project Structure

```
Medifi/
├── main.py                      # FastAPI backend — API endpoints
├── requirements.txt             # Python dependencies
├── .gitignore
│
├── agents/                      # All AI agent implementations
│   ├── medical_agent.py         # Medical Context Agent (Gemini)
│   ├── insurance_agent.py       # Insurance Decoder Agent (Gemini)
│   ├── quotation_analyzer.py    # Quotation Analyzer Agent (Gemini)
│   ├── ngo_agent.py             # NGO Matching Agent (Gemini)
│   ├── rnsit_wrapper.py         # Wrapper for RNSIT agents
│   ├── quotation_agent.py       # Quotation processing utilities
│   └── support_agents.py        # Helper agent utilities
│
├── orchestrator/
│   └── pipeline.py              # 6-stage orchestration pipeline
│
├── mcp_core/
│   └── server.py                # MCP Memory Server (SQLite-backed)
│
├── rnsit/                       # RNSIT agent logic (original)
│   ├── government_scheme_agent.py
│   └── financial_planner_agent.py
│
├── data/
│   └── ngo_data.json            # NGO database for matching
│
├── medifi-frontend/             # Next.js 16 frontend dashboard
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Main dashboard page
│   │   │   ├── layout.tsx       # Root layout
│   │   │   └── globals.css      # Design system & styles
│   │   └── components/
│   │       ├── Sidebar.tsx      # Navigation sidebar
│   │       └── TopNav.tsx       # Top navigation bar
│   ├── package.json
│   └── next.config.ts
│
└── tests/
    ├── test_mcp.py              # MCP Memory Server tests
    ├── test_ngo_agent.py        # NGO Agent tests
    └── test_full_pipeline.py    # Full pipeline integration test
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Google Gemini API Key** (optional — runs in mock mode without it)

### 1. Clone the repo

```bash
git clone https://github.com/Abhyoday-001/Alpha-Koder-SXMCP-007.git
cd Alpha-Koder-SXMCP-007
```

### 2. Set up the Backend

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Set your Gemini API key for full AI mode
echo "GOOGLE_API_KEY=your_key_here" > .env

# Start the backend server
python main.py
```

The backend will start on **http://localhost:8001**.

### 3. Set up the Frontend

```bash
cd medifi-frontend

# Install dependencies
npm install

# Start the dev server
npx next dev -p 5177 --webpack
```

The frontend will start on **http://localhost:5177**.

### 4. Use the App

1. Open **http://localhost:5177** in your browser
2. Click **"Get Started"**
3. Upload your **Medical Report** (required), **Insurance Policy** (optional), and **Hospital Quotation** (recommended)
4. Click **"Unleash AI Swarm"** and watch the 6 agents process your documents
5. View your comprehensive **Financial Intelligence Report**

---

## ⚙️ How It Works

### The Pipeline Flow

1. **Upload** → Patient uploads medical documents through the frontend
2. **Orchestration** → `pipeline.py` creates a session in the MCP Memory Server and passes documents through each agent sequentially
3. **Agent Processing** → Each agent reads the shared MCP context, performs its analysis, and writes results back
4. **Aggregation** → The Financial Planner Agent consolidates all coverage sources into a final strategy
5. **Report** → The frontend displays a comprehensive breakdown: total cost, insurance coverage, scheme eligibility, NGO support, and out-of-pocket amount

### MCP Memory Server

The MCP (Model Context Protocol) Memory Server provides:
- **Shared context** between all 6 agents via SQLite persistence
- **Versioning** — every update increments version and tracks `last_updated_by`
- **Audit logging** — records which agent read/wrote what data and when
- **Conflict-safe** — no overwrites, each agent writes to its own domain

### Mock Mode

If no `GOOGLE_API_KEY` is set, all Gemini-powered agents fall back to **deterministic mock mode** with realistic sample data. This allows full demo and testing without an API key.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4, Framer Motion |
| **Backend** | FastAPI, Uvicorn, Python 3.10+ |
| **AI Engine** | Google Gemini 1.5 Flash (`google-generativeai`) |
| **Memory** | MCP Protocol, SQLite, FastMCP |
| **Orchestration** | Custom async pipeline with sequential agent execution |

---

## 👥 Team — Alpha Koder

Built for **Smart India Hackathon / SXMCP** by Team Alpha Koder.

---

## 📄 License

This project is built for hackathon/educational purposes.
]]>
