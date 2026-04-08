import os
import json
import google.generativeai as genai
from typing import Dict, Any, Optional

class QuotationAnalyzerAgent:
    """
    Parses hospital estimate bills/quotations to extract cost breakdowns and deposits.
    """
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    async def analyze(self, quotation_text: str) -> Dict[str, Any]:
        if not quotation_text:
            return {"error": "No quotation text provided"}

        prompt = f"""
        Analyze the following hospital quotation/estimate bill and extract financial details:
        1. Total estimated cost.
        2. Admission deposit required.
        3. Breakdown of room charges, surgery, meds, etc.
        4. Any specific hospital notes on payment.

        Quotation Text:
        {quotation_text}

        Return JSON ONLY:
        {{
          "total_estimate": float,
          "admission_deposit": float,
          "breakdown": {{ "room": val, "surgery": val, ... }},
          "hospital_notes": "...",
          "currency": "INR"
        }}
        """

        if self.model:
            try:
                response = self.model.generate_content(prompt)
                return json.loads(response.text.strip().replace('```json', '').replace('```', ''))
            except Exception as e:
                return self._mock_analysis(quotation_text)
        else:
            return self._mock_analysis(quotation_text)

    def _mock_analysis(self, text: str) -> Dict[str, Any]:
        # Fallback for demo
        return {
            "total_estimate": 150000.0,
            "admission_deposit": 50000.0,
            "breakdown": {
                "room_charges": 20000.0,
                "surgery_fees": 80000.0,
                "medications": 30000.0,
                "diagnostics": 20000.0
            },
            "hospital_notes": "Estimated 3 days stay. Deposit required at admission.",
            "currency": "INR",
            "is_mock": True
        }

quotation_analyzer = QuotationAnalyzerAgent()
