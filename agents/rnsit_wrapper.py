import sys
import os

# Add rnsit folder to path so we can import from it
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'rnsit')))

from government_scheme_agent import GovernmentSchemeAgent
from financial_planner_agent import FinancialPlannerAgent

class RNSITSchemeAgent:
    def __init__(self):
        self.agent = GovernmentSchemeAgent()

    async def process(self, medical_data: dict) -> dict:
        disease = medical_data.get("diagnosis", "General")
        # Mock some attributes since RNSIT expects location/income
        res = self.agent.check_eligibility(disease, "Karnataka", "Low Income")
        return res

class RNSITFinancialPlanner:
    def __init__(self):
        self.agent = FinancialPlannerAgent()

    async def process(self, total_cost, insurance_cover, government_coverage, ngo_support):
        # The RNSIT agent expects (estimated_cost, insurance_cover, government_coverage)
        # We'll adjust it to include ngo_support in the 'total_covered' logic if needed,
        # but let's follow its implementation and just add NGO to its inputs.
        res = self.agent.generate_plan(total_cost, insurance_cover + ngo_support, government_coverage)
        return res
