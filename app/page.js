'use client';
import { useState } from 'react';

export default function TenderDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  const handleFileUpload = async (event) => {
    let filename;

    if (event && event.target && event.target.files) {
      const file = event.target.files[0];
      if (!file) return;
      filename = file.name;
    } else if (typeof event === 'string') {
      filename = event;
    } else {
      setError('Invalid input for file handling.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to process file');
      }
    } catch (err) {
      setError('Network error: Please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚀 Tender Twin Engine</h1>
          <p className="text-lg text-gray-600">AI-Powered Tender Document Analysis</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-dashed border-blue-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload Tender Document</h2>
            <p className="text-gray-600 mb-4">Upload any tender PDF to extract structured data automatically.</p>
            <label className="cursor-pointer">
              <div className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 inline-block">
                Choose PDF File
              </div>
              <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
            </label>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">Or try a sample:</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleFileUpload('tender1.pdf')}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Analyze Tender 1
                </button>
                <button
                  onClick={() => handleFileUpload('tender2.pdf')}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Analyze Tender 2
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Processing/Error Messages */}
        {isProcessing && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8"><div className="flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div><div><p className="font-semibold text-yellow-800">AI Processing Document...</p><p className="text-sm text-yellow-600">Extracting tender data using advanced AI models.</p></div></div></div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"><div className="flex items-center"><span className="text-red-500 text-xl mr-3">❌</span><div><p className="font-semibold text-red-800">Processing Error</p><p className="text-red-600">{error}</p></div></div></div>
        )}

        {/* Results Display Container */}
        {result && result.data && (
          <div className="space-y-6">
            
            {/* 1. Success Header */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-3">✅</span>
                  <div>
                    <p className="font-semibold text-green-800 text-lg">Tender Analysis Complete!</p>
                    <p className="text-green-600">{result.fields_extracted} fields extracted • {result.processing_time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {result.amendments_count > 0 && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {result.amendments_count} amendments detected
                    </span>
                  )}
                  <button onClick={() => setCompareMode(true)} className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-600">
                    Compare Tenders
                  </button>
                </div>
              </div>
            </div>

            {/* ADDED: Amendments / Corrigenda Section */}
            {result.amendments && result.amendments.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">🚨 Amendments Detected (Corrigenda)</h3>
                <div className="space-y-3">
                  {result.amendments.map((amendment, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border grid grid-cols-3 items-center gap-4">
                      <div className="font-medium text-gray-800">{amendment.field_changed}</div>
                      <div className="text-center">
                        <span className="text-red-600 line-through">{amendment.old_value}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-green-700 font-bold">{amendment.new_value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Risk Analysis */}
            {result.risk_analysis && result.risk_analysis.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">⚠️ AI Risk Analysis</h3>
                <div className="grid gap-3">
                  {result.risk_analysis.map((risk, index) => (
                    <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
                      <div><span className="font-medium text-gray-800">{risk.risk}</span><p className="text-sm text-gray-600">{risk.description}</p></div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${ risk.level === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800' }`}>{risk.level.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Basic Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border"><label className="text-sm text-gray-500 block">Tender Title</label><p className="font-semibold text-gray-800">{result.data.tender_title}</p></div>
              <div className="bg-white p-4 rounded-lg shadow border"><label className="text-sm text-gray-500 block">Tender ID</label><p className="font-semibold text-blue-600">{result.data.tender_id}</p></div>
              <div className="bg-white p-4 rounded-lg shadow border"><label className="text-sm text-gray-500 block">Authority</label><p className="font-semibold text-gray-800">{result.data.publishing_authority}</p></div>
              <div className="bg-white p-4 rounded-lg shadow border"><label className="text-sm text-gray-500 block">Submission Deadline</label><p className="font-semibold text-red-600">{result.data.submission_deadline}</p></div>
              <div className="bg-white p-4 rounded-lg shadow border"><label className="text-sm text-gray-500 block">EMD Amount</label><p className="font-semibold text-green-600">{result.data.emd_amount}</p></div>
              <div className="bg-white p-4 rounded-lg shadow border"><label className="text-sm text-gray-500 block">Estimated Value</label><p className="font-semibold text-purple-600">{result.data.estimated_value}</p></div>
            </div>
            
            {/* Extracted Fields Table */}
            <div className="bg-white rounded-lg shadow border overflow-hidden"><div className="bg-gray-50 px-6 py-4 border-b"><h3 className="font-semibold text-gray-800">AI-Extracted Fields</h3></div><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-gray-100"><th className="text-left p-4 font-semibold text-gray-700">Field Name</th><th className="text-left p-4 font-semibold text-gray-700">Extracted Value</th><th className="text-left p-4 font-semibold text-gray-700">AI Confidence</th></tr></thead><tbody>{result.data.extracted_fields.map((field, index) => (<tr key={index} className="border-b hover:bg-gray-50"><td className="p-4 font-medium text-gray-800">{field.field_name}</td><td className="p-4 text-gray-700">{field.value}</td><td className="p-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ field.confidence >= 0.95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }`}>{(field.confidence * 100).toFixed(1)}%</span></td></tr>))}</tbody></table></div></div>
            
            {/* Eligibility, Checklist, Timeline, etc. */}
            <div className="bg-white rounded-lg shadow border p-6"><h3 className="font-semibold text-gray-800 mb-3">📋 Eligibility Criteria</h3><p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{result.data.eligibility_criteria}</p></div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6"><h3 className="font-semibold text-purple-800 mb-3">✅ Auto-Generated Compliance Checklist</h3><div className="space-y-2">{[{ item: "EMD Payment Proof", status: "pending", deadline: "5 days before submission" },{ item: "Technical Bid Preparation", status: "in-progress", deadline: "15 days" }].map((item, index) => (<div key={index} className="flex items-center justify-between bg-white p-3 rounded"><div className="flex items-center"><span className={`w-3 h-3 rounded-full mr-3 ${ item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300' }`}></span><span className="text-gray-800">{item.item}</span></div><span className="text-sm text-gray-500">Due: {item.deadline}</span></div>))}</div></div>
            <div className="bg-white rounded-lg shadow border p-6"><h3 className="font-semibold text-gray-800 mb-4">📅 Project Timeline</h3><div className="space-y-4">{[{ date: "Today", event: "Tender Analysis Complete", status: "completed" },{ date: "Oct 10, 2025", event: "Technical Bid Submission", status: "upcoming" },{ date: "Oct 31, 2025", event: "Final Submission Deadline", status: "upcoming" }].map((item, index) => (<div key={index} className="flex items-center"><div className={`w-3 h-3 rounded-full mr-4 ${ item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300' }`}></div><div className="flex-1"><div className="flex justify-between"><span className="font-medium text-gray-800">{item.event}</span><span className="text-sm text-gray-500">{item.date}</span></div></div></div>))}</div></div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6"><h3 className="font-semibold text-xl mb-2">🎯 Win Probability Analysis</h3><div className="flex items-center justify-between"><div className="w-2/3"><div className="text-4xl font-bold">72%</div><div className="text-blue-200">High chance of winning</div><div className="mt-2 text-sm text-blue-200">• Your company size matches requirement<br />• Similar past projects completed</div></div><div className="text-6xl opacity-80">🎯</div></div></div>
            <div className="bg-white rounded-lg shadow border p-6"><h3 className="font-semibold text-gray-800 mb-3">💾 Export Analysis</h3><div className="flex gap-3 flex-wrap"><button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">📊 Export to Excel</button><button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">📄 Generate Report</button><button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600">📋 Risk Assessment PDF</button></div></div>
            
          </div>
        )}
        
        {/* Demo Instructions & Comparison Modal */}
        {!result && !isProcessing && (
          <div className="text-center text-gray-500 text-sm mt-12"><p>💡 <strong>Demo Tip:</strong> Upload any PDF file or click a demo button above.</p></div>
        )}
        {compareMode && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"><div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 shadow-2xl"><h3 className="text-xl font-bold text-gray-800 mb-4">Tender Comparison</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h4 className="font-semibold text-gray-700 mb-2">Current Tender ({result.data.tender_id})</h4><p className="text-gray-800"><strong>Value:</strong> {result.data.estimated_value}</p><p className="text-gray-800"><strong>Deadline:</strong> {result.data.submission_deadline}</p><p className="text-gray-800"><strong>EMD:</strong> {result.data.emd_amount}</p></div><div><h4 className="font-semibold text-gray-700 mb-2">Similar Tender (Avg.)</h4><p className="text-gray-800"><strong>Value:</strong> ₹18,00,000</p><p className="text-gray-800"><strong>Deadline:</strong> 45 days</p><p className="text-gray-800"><strong>EMD:</strong> ₹35,000</p></div></div><button onClick={() => setCompareMode(false)} className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Close</button></div></div>
        )}
        
      </div>
    </div>
  );
}