// This is our fake database of extracted tender data
export const sampleData = {
  "tender1.pdf": {
    "tender_title": "Supply of Computer Equipment to Government Offices",
    "tender_id": "GSFT/2024/001",
    "publishing_authority": "Government IT Department",
    "submission_deadline": "2024-10-31",
    "emd_amount": "₹50,000",
    "estimated_value": "₹25,00,000",
    "eligibility_criteria": "Minimum 3 years experience in similar projects, annual turnover > ₹5 Crores",
    "extracted_fields": [
      { "field_name": "Submission Deadline", "value": "October 31, 2024", "confidence": 0.98 },
      { "field_name": "EMD Amount", "value": "₹50,000", "confidence": 0.95 },
      { "field_name": "Tender Value", "value": "₹25,00,000", "confidence": 0.92 },
      { "field_name": "Tender ID", "value": "GSFT/2024/001", "confidence": 0.99 }
    ],
    "boq_table": [
      {"item": "Laptop Computers", "quantity": "50", "unit": "Nos", "rate": "₹45,000", "amount": "₹22,50,000"},
      {"item": "Desktop Computers", "quantity": "25", "unit": "Nos", "rate": "₹35,000", "amount": "₹8,75,000"},
      {"item": "Printers", "quantity": "10", "unit": "Nos", "rate": "₹15,000", "amount": "₹1,50,000"}
    ]
  },
  "tender2.pdf": {
    "tender_title": "Construction of New School Building in District A",
    "tender_id": "PWD/EDU/2024/005",
    "publishing_authority": "Public Works Department",
    "submission_deadline": "2024-11-15",
    "emd_amount": "₹2,00,000",
    "estimated_value": "₹2,50,00,000",
    "eligibility_criteria": "Class A contractor license required, minimum 5 completed projects",
    "extracted_fields": [
      { "field_name": "Submission Deadline", "value": "November 15, 2024", "confidence": 0.97 },
      { "field_name": "EMD Amount", "value": "₹2,00,000", "confidence": 0.96 },
      { "field_name": "Project Value", "value": "₹2.5 Crores", "confidence": 0.91 }
    ],
    "boq_table": [
      {"item": "Cement", "quantity": "500", "unit": "Bags", "rate": "₹400", "amount": "₹2,00,000"},
      {"item": "Steel", "quantity": "100", "unit": "Tonnes", "rate": "₹60,000", "amount": "₹60,00,000"},
      {"item": "Bricks", "quantity": "50,000", "unit": "Nos", "rate": "₹10", "amount": "₹5,00,000"}
    ]
  },
  "default": {
    "tender_title": "Tender Document Analysis",
    "tender_id": "Not specified in document",
    "publishing_authority": "Various Government Departments",
    "submission_deadline": "Please check document for exact date",
    "emd_amount": "Varies based on tender",
    "estimated_value": "Refer to Bill of Quantities",
    "eligibility_criteria": "Standard government eligibility criteria apply",
    "extracted_fields": [
      { "field_name": "Document Type", "value": "Government Tender", "confidence": 0.99 },
      { "field_name": "Processing Status", "value": "Successfully Analyzed", "confidence": 1.0 }
    ],
    "boq_table": [
      {"item": "Sample Item", "quantity": "100", "unit": "Nos", "rate": "₹1,000", "amount": "₹1,00,000"}
    ]
  }
};

// Corrigenda (Amendment) data
export const corrigendaData = {
  "tender1.pdf": [
    {
      "change_id": "C001",
      "change_date": "2024-09-20",
      "field_changed": "Submission Deadline",
      "old_value": "October 20, 2024",
      "new_value": "October 31, 2024",
      "reason": "Extension due to festival season"
    },
    {
      "change_id": "C002", 
      "change_date": "2024-09-18",
      "field_changed": "EMD Amount",
      "old_value": "₹75,000",
      "new_value": "₹50,000",
      "reason": "Revised based on project scope"
    }
  ],
  "tender2.pdf": [
    {
      "change_id": "C003",
      "change_date": "2024-09-25",
      "field_changed": "Project Value",
      "old_value": "₹2.0 Crores",
      "new_value": "₹2.5 Crores",
      "reason": "Scope of work increased"
    }
  ]
};
// Add to sample-data.js
export const riskAnalysis = {
  "tender1.pdf": [
    { risk: "Tight Deadline", level: "High", description: "Submission deadline is in 30 days" },
    { risk: "High EMD", level: "Medium", description: "EMD amount is substantial" },
    { risk: "Technical Complexity", level: "Low", description: "Standard equipment requirements" }
  ]
};

// Add to your results display
{result.data.risk_analysis && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
    <h3 className="font-semibold text-red-800 mb-3">⚠️ AI Risk Analysis</h3>
    <div className="grid gap-3">
      {result.data.risk_analysis.map((risk, index) => (
        <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
          <div>
            <span className="font-medium">{risk.risk}</span>
            <p className="text-sm text-gray-600">{risk.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            risk.level === 'High' ? 'bg-red-100 text-red-800' :
            risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {risk.level} Risk
          </span>
        </div>
      ))}
    </div>
  </div>
)}