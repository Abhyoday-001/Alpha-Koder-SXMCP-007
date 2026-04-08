import json
import os
import google.generativeai as genai
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class QuotationAgent:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.llm_enabled = True
        else:
            self.llm_enabled = False

    async def process(self, quotation_text: str) -> Dict[str, Any]:
        """Analyzes hospital estimate quotation/bill."""
        if not self.llm_enabled:
            return {
                "hospital_name": "Mock Hospital",
                "total_estimate": 100000.0,
                "admission_deposit": 20000.0,
                "urgency": "High",
                "breakdown": []
            }

        prompt = f"""
        Analyze the following hospital estimate quotation.
        Extract the total cost, any required advance/deposit for admission, and the key cost centers.
        
        Quotation Text:
        {quotation_text}

        Format ONLY as JSON:
        {{
          "hospital_name": "String",
          "total_estimate": number,
          "admission_deposit": number,
          "urgency": "High | Medium | Low",
          "breakdown": [
            {{"item": "Surgery", "cost": 50000}},
            {{"item": "Bed Charges", "cost": 10000}}
          ],
          "valid_until": "Date if found"
        }}
        """
        try:
            response = self.model.generate_content(prompt)
            data = json.loads(response.text.strip().replace("```json", "").replace("```", ""))
            return data
        except Exception as e:
            return {"error": str(e)}

quotation_agent = QuotationAgent()
