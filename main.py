import uuid
from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from mcp_core.server import mcp_server, fast_mcp
from orchestrator.pipeline import orchestrator
from agents.ngo_agent import ngo_agent
import asyncio

app = FastAPI(title="MediFi Backend Orchestrator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "service": "MediFi Backend Orchestrator"}

@app.post("/upload")
async def upload_documents(
    background_tasks: BackgroundTasks,
    medical_report: Optional[UploadFile] = File(None),
    insurance_policy: Optional[UploadFile] = File(None),
    hospital_quotation: Optional[UploadFile] = File(None),
    patient_name: str = Form("Unknown Patient")
):
    patient_id = f"PAT-{uuid.uuid4().hex[:6].upper()}"
    
    # Read files as text (Simple OCR simulation or direct text read)
    contents = {}
    if medical_report:
        contents["medical"] = (await medical_report.read()).decode("utf-8", "ignore")
    if insurance_policy:
        contents["insurance"] = (await insurance_policy.read()).decode("utf-8", "ignore")
    if hospital_quotation:
        contents["quotation"] = (await hospital_quotation.read()).decode("utf-8", "ignore")

    # Store initial state
    mcp_server.write_memory(f"patient_{patient_id}_init", {"name": patient_name}, agent="API")
    
    # Trigger Orchestration in Background
    background_tasks.add_task(orchestrator.run_pipeline, patient_id, contents)
    
    return {
        "status": "Accepted",
        "patient_id": patient_id,
        "message": f"Orchestration pipeline started for {patient_name}. Track status via patient_id."
    }

@app.get("/result/{patient_id}")
async def get_patient_result(patient_id: str):
    # Try to fetch final plan from memory
    final_plan = mcp_server.read_memory(f"patient_{patient_id}_final", agent="API")
    medical = mcp_server.read_memory(f"patient_{patient_id}_medical", agent="API")
    insurance = mcp_server.read_memory(f"patient_{patient_id}_insurance", agent="API")
    quotation = mcp_server.read_memory(f"patient_{patient_id}_quotation", agent="API")
    ngo = mcp_server.read_memory(f"patient_{patient_id}_ngo", agent="API")
    scheme = mcp_server.read_memory(f"patient_{patient_id}_scheme", agent="API")

    if not final_plan:
        return {"status": "Processing", "patient_id": patient_id}

    return {
        "status": "Complete",
        "data": {
            "medical": medical["value"] if medical else None,
            "insurance": insurance["value"] if insurance else None,
            "quotation": quotation["value"] if quotation else None,
            "ngo": ngo["value"] if ngo else None,
            "scheme": scheme["value"] if scheme else None,
            "final_plan": final_plan["value"]
        }
    }

@app.get("/mcp/logs")
async def get_mcp_logs(limit: int = 20):
    return mcp_server.get_audit_logs(limit)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
