import json

class DecisionModel:
    """Simulates a local financial reasoning model."""
    def evaluate_strategies(self, cost, cover):
        gap = cost - cover
        gap_pct = (gap / cost) if cost > 0 else 0
        
        # Simulated Iterative Reasoning (Multiple passes)
        strategies = [
            {"type": "Conservative", "risk": "Low", "action": "Wait for more funding."},
            {"type": "Balanced", "risk": "Medium", "action": "Use personal savings + hospital EMI."},
            {"type": "Aggressive", "risk": "High", "action": "Crowdfunding + Immediate admission."}
        ]
        
        print("[Decision Model] Simulating 3 financial paths...")
        
        # Model 'fetches' the logically best strategy
        if gap == 0:
            return "No Gap Strategy: Immediate Hospitalization."
        elif gap_pct < 0.2:
            return f"Balanced Strategy: {strategies[1]['action']} (Risk: {strategies[1]['risk']})"
        else:
            return f"High-Impact Strategy: {strategies[2]['action']} (Risk: {strategies[2]['risk']})"

class FinancialPlannerAgent:
    def __init__(self):
        self.brain = DecisionModel()

    def generate_plan(self, estimated_cost, insurance_cover, government_coverage):
        total_covered = insurance_cover + government_coverage
        
        print(f"\n--- [AGENT E] Invoking Financial Intelligence Model ---")
        ai_strategy = self.brain.evaluate_strategies(estimated_cost, total_covered)
        
        remaining_amount = max(0, estimated_cost - total_covered)
        coverage_percentage = (total_covered / estimated_cost * 100) if estimated_cost > 0 else 0

        # AI-Generated Insights (Faking a model generation)
        model_insight = f"Based on a {round(coverage_percentage, 1)}% coverage rate, the model predicts {ai_strategy}"

        return {
            "total_cost": estimated_cost,
            "covered_amount": total_covered,
            "remaining_amount": remaining_amount,
            "coverage_percentage": round(coverage_percentage, 2),
            "ai_strategy_priority": ai_strategy,
            "model_insight": model_insight,
            "breakdown": {
                "insurance": insurance_cover,
                "government_scheme": government_coverage
            }
        }

if __name__ == "__main__":
    agent = FinancialPlannerAgent()
    print(json.dumps(agent.generate_plan(1000000, 300000, 500000), indent=2))
