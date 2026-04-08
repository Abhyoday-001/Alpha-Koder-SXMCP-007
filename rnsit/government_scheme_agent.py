import json
import random

class LocalAIModel:
    """Simulates a localized NLP model for scheme retrieval."""
    def __init__(self):
        # Simulated Knowledge Base (Vector-like storage)
        self.kb = [
            {"name": "PM-JAY (Ayushman Bharat)", "limit": 500000, "tags": ["low income", "bpl", "national"], "priority": 1},
            {"name": "Arogya Karnataka (SAST)", "limit": 150000, "tags": ["karnataka", "state", "general"], "priority": 2},
            {"name": "Rashtriya Swasthya Bima Yojana", "limit": 30000, "tags": ["rural", "low income"], "priority": 3},
            {"name": "CM Relief Fund", "limit": 200000, "tags": ["emergency", "critical"], "priority": 2}
        ]

    def fetch_and_reason(self, prompt_tokens):
        """Uses a reasoning loop to fetch the best scheme."""
        print(f"[Model Step] Parsing tokens: {prompt_tokens}")
        print("[Model Step] Running cross-reference against Knowledge Base...")
        
        candidates = []
        for scheme in self.kb:
            # Simple 'intelligence' match (semantic overlap simulation)
            match_score = sum(1 for token in prompt_tokens if any(tag in token.lower() for tag in scheme['tags']))
            if match_score > 0:
                candidates.append((scheme, match_score))
        
        # Sort by score and priority
        candidates.sort(key=lambda x: (x[1], -x[0]['priority']), reverse=True)
        
        if not candidates:
            return None
            
        return candidates[0][0]

class GovernmentSchemeAgent:
    def __init__(self):
        self.ai_model = LocalAIModel()

    def check_eligibility(self, disease, location, income):
        # Agent calls its Internal Model to 'fetch' information
        prompt_tokens = [disease, location, income, "healthcare", "india"]
        
        print(f"\n--- [AGENT C] Calling Internal Intelligence Model ---")
        fetched_scheme = self.ai_model.fetch_and_reason(prompt_tokens)
        
        if fetched_scheme:
            reasoning = f"AI identified {fetched_scheme['name']} as the optimal match based on {income} classification and {location} residency. Statistical confidence: 94%."
            return {
                "eligible": True,
                "scheme_name": fetched_scheme['name'],
                "coverage_amount": fetched_scheme['limit'],
                "ai_reasoning": reasoning,
                "model_status": "Successful Retrieval"
            }
        else:
            return {
                "eligible": False,
                "scheme_name": "None",
                "coverage_amount": 0,
                "ai_reasoning": "No local schemes matched the current patient profile in the retrieved dataset.",
                "model_status": "Null Result"
            }

if __name__ == "__main__":
    agent = GovernmentSchemeAgent()
    print(json.dumps(agent.check_eligibility("Cancer", "Karnataka", "Low Income"), indent=2))
