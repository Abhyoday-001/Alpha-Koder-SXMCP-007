import asyncio
import time
from main import app, orchestrator
from mcp_core.server import mcp_server

async def test_full_flow():
    print("--- Testing MediFi Full Orchestration Pipeline ---")
    patient_id = "TEST-PATIENT-999"
    user_input = {
        "patient_name": "John Doe",
        "category": "Oncology",
        "total_cost": 1200000.0
    }
    
    # 1. Trigger Pipeline
    print(f"Starting pipeline for {patient_id}...")
    result = await orchestrator.run_pipeline(patient_id, user_input)
    
    print("\n--- Final Aggregated Result ---")
    print(f"Total Cost: {result['total_cost']}")
    print(f"Total Covered: {result['total_covered']}")
    print(f"Out of Pocket: {result['out_of_pocket']}")
    print(f"Recommendation: {result['recommendation']}")
    
    # 2. Verify Audit Logs (Advanced MCP Feature)
    print("\n--- MCP Audit Trail (Partial) ---")
    logs = mcp_server.get_audit_logs(10)
    for log in reversed(logs):
        print(f"[{log['agent']}] {log['action']} -> {log['key']}")
        
    # 3. Check Auto-Action (NGO Request)
    print("\n--- Auto-Action Verification ---")
    ngo_res = mcp_server.read_memory(f"patient_{patient_id}_ngo", agent="Verifier")
    ngo_matches = ngo_res["value"]["matches"]
    if ngo_matches:
        print(f"Top Match: {ngo_matches[0]['name']}")
        print(f"Confidence: {ngo_matches[0]['confidence_score']}")
        print(f"Request Msg Sample: {ngo_matches[0]['auto_action_text'][:60]}...")

if __name__ == "__main__":
    asyncio.run(test_full_flow())
