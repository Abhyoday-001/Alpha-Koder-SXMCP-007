import json
import os
import time
import asyncio
import google.generativeai as genai
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

class NGOAgent:
    def __init__(self, data_path="data/ngo_data.json"):
        self.data_path = data_path
        self._ensure_data()
        
        # Configure Gemini
        api_key = os.getenv("GOOGLE_API_KEY")
        self.llm_enabled = False
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.llm_enabled = True
        else:
            print("WARNING: GOOGLE_API_KEY not found. Operating in Deterministic Mock Mode.")

    def _ensure_data(self):
        if not os.path.exists(self.data_path):
            os.makedirs(os.path.dirname(self.data_path), exist_ok=True)
            default_ngos = [
                {"id": "ngo-001", "name": "HeartCare Foundation", "category": "Cardiology", "funding_limit": 500000},
                {"id": "ngo-002", "name": "Cancer Relief Trust", "category": "Oncology", "funding_limit": 1000000},
                {"id": "ngo-003", "name": "Childhood Smiles", "category": "Pediatrics", "funding_limit": 200000}
            ]
            with open(self.data_path, "w") as f:
                json.dump(default_ngos, f, indent=4)

    def load_ngos(self) -> List[Dict[str, Any]]:
        with open(self.data_path, "r") as f:
            return json.load(f)

    async def _get_llm_analysis(self, ngo: Dict[str, Any], medical_category: str, total_cost: float) -> Dict[str, Any]:
        """Uses Gemini to reason about the match and generate the request text."""
        if not self.llm_enabled:
            # Fallback to deterministic mock logic
            coverage_ratio = min(ngo["funding_limit"] / total_cost if total_cost > 0 else 1.0, 1.0)
            score = round(0.7 + (0.3 * coverage_ratio), 2)
            msg = (
                f"Subject: Emergency Funding Request - {medical_category}\n\n"
                f"Dear {ngo['name']} Team,\n\n"
                f"We are seeking financial assistance for a patient undergoing {medical_category} treatment."
            )
            return {"score": score, "message": msg, "reasoning": "Deterministic rule-based match."}

        prompt = f"""
        Act as an expert medical NGO coordinator for MediFi.
        Patient Category: {medical_category}
        Treatment Cost: INR {total_cost}
        NGO Target: {ngo['name']} (Mission: Supports {ngo['category']}, Max Grant: {ngo['funding_limit']})

        Task:
        1. Evaluate the match confidence (0.0 to 1.0).
        2. Generate a highly persuasive, professional request email to this NGO.
        3. Provide a brief 1-sentence reasoning for the score.

        Format your response ONLY as a JSON object:
        {{
            "score": 0.95,
            "message": "The email text here...",
            "reasoning": "The explanation here..."
        }}
        """
        try:
            # Running in a separate thread/exec if needed, but genai is typically blocking unless using async sdk
            response = self.model.generate_content(prompt)
            # Parse JSON from response
            text = response.text.strip()
            # Clean possible markdown formatting
            if text.startswith("```json"):
                text = text.replace("```json", "").replace("```", "").strip()
            data = json.loads(text)
            return data
        except Exception as e:
            print(f"LLM Error: {e}")
            return {"score": 0.5, "message": "Error generating text.", "reasoning": "LLM Failure."}

    async def match_ngos(self, medical_category: str, total_cost: float) -> List[Dict[str, Any]]:
        ngos = self.load_ngos()
        matches = []
        
        # Initial Filtering (Rule-based)
        candidates = [n for n in ngos if n["category"].lower() == medical_category.lower()]
        
        # Parallel Intelligence Processing
        tasks = [self._get_llm_analysis(ngo, medical_category, total_cost) for ngo in candidates]
        results = await asyncio.gather(*tasks)
        
        for ngo, analysis in zip(candidates, results):
            matches.append({
                "ngo_id": ngo["id"],
                "name": ngo["name"],
                "support_amount": min(ngo["funding_limit"], total_cost),
                "confidence_score": analysis.get("score", 0.7),
                "auto_action_text": analysis.get("message", ""),
                "llm_reasoning": analysis.get("reasoning", "")
            })
        
        return sorted(matches, key=lambda x: x["confidence_score"], reverse=True)

ngo_agent = NGOAgent()
