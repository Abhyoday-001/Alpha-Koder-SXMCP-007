import asyncio
from mcp_core.server import mcp_server
from agents.medical_agent import medical_agent
from agents.insurance_agent import insurance_agent
from agents.quotation_agent import quotation_agent
from agents.ngo_agent import ngo_agent
from agents.rnsit_wrapper import RNSITSchemeAgent, RNSITFinancialPlanner

class MediFiOrchestrator:
    def __init__(self, mcp):
        self.mcp = mcp
        self.medical = medical_agent
        self.insurance = insurance_agent
        self.quotation = quotation_agent
        self.ngo = ngo_agent
        self.scheme = RNSITSchemeAgent()
        self.financial = RNSITFinancialPlanner()

    async def run_pipeline(self, patient_id: str, files_content: dict):
        """
        Runs the full 6-stage integration pipeline.
        files_content should contain 'medical', 'insurance', and 'quotation' keys with text.
        """
        # 1. Initialize Context
        self.mcp.write_memory(f"patient_{patient_id}", {"files_uploaded": list(files_content.keys())}, agent="Orchestrator")
        
        # 2. Medical Analysis
        print("Stage 1: Medical Context Agent...")
        medical_res = await self.medical.process(files_content.get("medical", ""))
        self.mcp.write_memory(f"patient_{patient_id}_medical", medical_res, agent="Medical_Context_Agent")
        
        # 3. Insurance Decoding
        print("Stage 2: Insurance Decoder Agent...")
        insurance_res = await self.insurance.process(files_content.get("insurance", ""), medical_res)
        self.mcp.write_memory(f"patient_{patient_id}_insurance", insurance_res, agent="Insurance_Decoder_Agent")
        
        # 4. Quotation Analysis (NEW)
        print("Stage 3: Quotation Agent...")
        quotation_res = await self.quotation.process(files_content.get("quotation", ""))
        self.mcp.write_memory(f"patient_{patient_id}_quotation", quotation_res, agent="Quotation_Agent")
        
        # 5. Government Scheme Match (RNSIT)
        print("Stage 4: Scheme Agent...")
        scheme_res = await self.scheme.process(medical_res)
        self.mcp.write_memory(f"patient_{patient_id}_scheme", scheme_res, agent="Scheme_Agent")
        
        # 6. NGO Matching
        print("Stage 5: NGO Agent...")
        total_needed = quotation_res.get("admission_deposit", medical_res.get("estimated_cost", 0))
        ngo_matches = await self.ngo.match_ngos(medical_res.get("medical_category", "General"), total_needed)
        total_ngo = sum(n["support_amount"] for n in ngo_matches[:2])
        ngo_res = {"matches": ngo_matches, "total_ngo_support": total_ngo}
        self.mcp.write_memory(f"patient_{patient_id}_ngo", ngo_res, agent="NGO_Agent")
        
        # 7. Final Financial Plan (RNSIT)
        print("Stage 6: Financial Planner Agent...")
        final_res = await self.financial.process(
            total_cost=quotation_res.get("total_estimate", medical_res.get("estimated_cost", 0)),
            insurance_cover=insurance_res.get("claimable_amount", 0),
            government_coverage=scheme_res.get("coverage_amount", 0),
            ngo_support=total_ngo
        )
        self.mcp.write_memory(f"patient_{patient_id}_final", final_res, agent="Financial_Planner")
        
        return {
            "patient_id": patient_id,
            "medical": medical_res,
            "insurance": insurance_res,
            "quotation": quotation_res,
            "scheme": scheme_res,
            "ngo": ngo_res,
            "final_plan": final_res
        }

orchestrator = MediFiOrchestrator(mcp_server)
