import json
import os
import google.generativeai as genai
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class InsuranceAgent:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.llm_enabled = True
        else:
            self.llm_enabled = False

    async def process(self, policy_text: str, medical_context: Dict[str, Any]) -> Dict[str, Any]:
        if not self.llm_enabled:
            return {
                "insurer": "Mock Insurer",
                "claimable_amount": 0,
                "status": "Not Analyzed",
                "reasoning": "Mock mode active."
            }

        prompt = f"""
        Analyze the following insurance policy against the patient's medical context.
        Calculate the claimable amount based on inclusions/exclusions.
        
        Medical Context: {json.dumps(medical_context)}
        
        Policy Text:
        {policy_text}

        Format ONLY as JSON:
        {{
          "insurer": "Company Name",
          "policy_name": "Name",
          "sum_insured": number,
          "claimable_amount": number,
          "status": "Covered | Partial | Not Covered",
          "reasoning": "Short explanation"
        }}
        """
        try:
            response = self.model.generate_content(prompt)
            data = json.loads(response.text.strip().replace("```json", "").replace("```", ""))
            return data
        except Exception as e:
            return {"error": str(e)}

insurance_agent = InsuranceAgent()
