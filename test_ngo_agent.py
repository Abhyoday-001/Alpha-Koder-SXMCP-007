import asyncio
import json
import os
from agents.ngo_agent import ngo_agent
from mcp_core.server import mcp_server

async def test_ngo_agent_direct():
    print("--- Testing NGO Agent Intelligence (Direct) ---")
    
    # 1. Register fake patient data in MCP
    patient_id = "P999"
    expense_data = {
        "medical_category": "Oncology",
        "amount": 950000.0,
        "status": "pending_support",
        "timestamp": 1775645843.0
    }
    mcp_server.write_memory(f"patient_{patient_id}_expense", expense_data, agent="Setup")
    
    # 2. Run matching
    print(f"Step 2: Matching NGOs for Patient {patient_id}...")
    matches = await ngo_agent.match_ngos("Oncology", 950000.0)
    
    print(f"\nFound {len(matches)} Intelligence-backed matches:")
    for m in matches:
        print(f"\nNGO: {m['name']}")
        print(f"Confidence: {m['confidence_score']}")
        print(f"Reasoning: {m['llm_reasoning']}")
        print(f"Auto-Action Snippet: {m['auto_action_text'][:100]}...")

if __name__ == "__main__":
    asyncio.run(test_ngo_agent_direct())
