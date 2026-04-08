import time
from typing import Dict, Any

class BaseAgent:
    def __init__(self, name: str):
        self.name = name

    def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        # To be implemented by someone else
        print(f"[{self.name}] Placeholder called...")
        return {"agent": self.name, "status": "completed", "data": {}}

class MedicalAgent(BaseAgent):
    def __init__(self): super().__init__("Medical_Agent")
    def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        # Simulating standard output until 'someone else' builds it
        return {
            "estimated_cost": context.get("user_input", {}).get("total_cost", 0),
            "medical_category": context.get("user_input", {}).get("category", "General")
        }

class InsuranceAgent(BaseAgent):
    def __init__(self): super().__init__("Insurance_Agent")
    def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        cost = context.get("medical", {}).get("estimated_cost", 0)
        return {
            "insurance_coverage": cost * 0.4, # Simulating 40% coverage
            "claim_text": f"DRAFT: Please find attached medical bills for INR {cost} for claim processing."
        }

class SchemeAgent(BaseAgent):
    def __init__(self): super().__init__("Scheme_Agent")
    def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "scheme_benefit": 50000, # Simulating a flat 50k benefit
            "eligible": True
        }

class FinancialPlanner(BaseAgent):
    def __init__(self): super().__init__("Financial_Planner")
    def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        # Final aggregation
        medical = context.get("medical", {})
        insurance = context.get("insurance", {})
        scheme = context.get("scheme", {})
        ngo = context.get("ngo", {})
        
        total = medical.get("estimated_cost", 0)
        covered = insurance.get("insurance_coverage", 0) + scheme.get("scheme_benefit", 0) + ngo.get("total_ngo_support", 0)
        
        return {
            "total_cost": total,
            "total_covered": covered,
            "out_of_pocket": max(total - covered, 0),
            "recommendation": "Apply for interest-free medical loan for the remaining balance."
        }
