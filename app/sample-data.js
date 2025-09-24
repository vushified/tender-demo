// This is our fake database of extracted tender data
export const sampleData = {
  "tender1.pdf": {
    "tender_title": "Supply of Computer Equipment to Government Offices",
    "tender_id": "GSFT/2024/001",
    "publishing_authority": "Government IT Department",
    "submission_deadline": "2025-10-31",
    "emd_amount": "₹50,000",
    "estimated_value": "₹25,00,000",
    "eligibility_criteria": "Minimum 3 years experience in similar projects, annual turnover > ₹5 Crores.",
    "extracted_fields": [
      { "field_name": "Submission Deadline", "value": "October 31, 2025", "confidence": 0.98 },
      { "field_name": "EMD Amount", "value": "₹50,000", "confidence": 0.95 },
      { "field_name": "Tender Value", "value": "₹25,00,000", "confidence": 0.92 }
    ],
    "boq_table": [
      {"item": "Laptop Computers", "quantity": 50, "unit": "Nos", "rate": "₹45,000"},
      {"item": "Desktop Computers", "quantity": 25, "unit": "Nos", "rate": "₹35,000"},
      {"item": "Printers", "quantity": 10, "unit": "Nos", "rate": "₹15,000"}
    ]
  },
  "tender2.pdf": {
    "tender_title": "Construction of New School Building in District A",
    "tender_id": "PWD/EDU/2024/005",
    "publishing_authority": "Public Works Department",
    "submission_deadline": "2025-11-15",
    "emd_amount": "₹2,00,000",
    "estimated_value": "₹2,50,00,000",
    "eligibility_criteria": "Class A contractor license required, minimum 5 completed projects over ₹1 Crore each.",
    "extracted_fields": [
      { "field_name": "Submission Deadline", "value": "November 15, 2025", "confidence": 0.97 },
      { "field_name": "EMD Amount", "value": "₹2,00,000", "confidence": 0.96 }
    ],
     "boq_table": [
      {"item": "Cement", "quantity": 500, "unit": "Bags", "rate": "₹400"},
      {"item": "Steel", "quantity": 100, "unit": "Tonnes", "rate": "₹60,000"}
    ]
  },
  "default": {
    "tender_title": "Generic Tender Document Analysis",
    "tender_id": "N/A",
    "publishing_authority": "Various Departments",
    "submission_deadline": "Varies",
    "emd_amount": "Varies",
    "estimated_value": "Varies",
    "eligibility_criteria": "Standard government eligibility criteria apply.",
    "extracted_fields": [
      { "field_name": "Document Type", "value": "Government Tender", "confidence": 0.99 }
    ],
    "boq_table": [
       {"item": "Sample Item", "quantity": 1, "unit": "Unit", "rate": "₹10,000"}
    ]
  }
};

// Corrigenda (Amendment) data
export const corrigendaData = {
  "tender1.pdf": [
    {
      "change_id": "C001",
      "field_changed": "Submission Deadline",
      "old_value": "October 20, 2025",
      "new_value": "October 31, 2025",
    }
  ],
};

// AI-powered risk analysis data
export const riskAnalysis = {
  "tender1.pdf": [
    { risk: "High Competition Expected", level: "High", description: "IT supply tenders in this region are highly competitive." },
    { risk: "Strict Technical Specs", level: "Medium", description: "Specific hardware models listed may pose supply chain challenges." }
  ]
};