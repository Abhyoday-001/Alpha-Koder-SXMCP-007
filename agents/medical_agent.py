import json
import os
import google.generativeai as genai
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class MedicalAgent:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.llm_enabled = True
        else:
            self.llm_enabled = False
            print("WARNING: MedicalAgent operating in mock mode.")

    async def process(self, report_text: str) -> Dict[str, Any]:
        if not self.llm_enabled:
            return {
                "diagnosis": "General Condition (Mock)",
                "treatmentType": "Observation",
                "severity": "Moderate",
                "estimated_cost": 50000.0,
                "medical_category": "General",
                "summary": "Mock analysis active."
            }

        prompt = f"""
        Analyze the following medical report and extract structured information.
        Format your response ONLY as a JSON object:
        {{
          "diagnosis": "Detailed diagnosis",
          "treatmentType": "Surgery | Medication | Therapy | Other",
          "severity": "Mild | Moderate | Critical",
          "estimated_cost": number (in INR),
          "medical_category": "Oncology | Cardiology | Pediatrics | etc.",
          "summary": "Short 2-sentence patient summary"
        }}

        Report text:
        {report_text}
        """
        try:
            response = self.model.generate_content(prompt)
            data = json.loads(response.text.strip().replace("```json", "").replace("```", ""))
            return data
        except Exception as e:
            print(f"MedicalAgent Error: {e}")
            return {"error": str(e)}

medical_agent = MedicalAgent()
