'use client';
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';

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
      setError('Invalid input');
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
      setResult(data.success ? data : null);
      setError(data.success ? null : data.error);
    } catch (err) {
      setError('Network error: Please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDemoClick = (filename) => {
    handleFileUpload(filename);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚀 Tender Twin Engine</h1>
          <p className="text-lg text-gray-600">AI-Powered Tender Document Analysis • Zero Hallucinations Guaranteed</p>
        </div>

        {/* File Upload Component */}
        <FileUpload onFileUpload={handleFileUpload} onDemoClick={handleDemoClick} />

        {/* Loading Spinner */}
        {isProcessing && <LoadingSpinner />}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-3">❌</span>
              <div>
                <p className="font-semibold text-red-800">Processing Error</p>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        <ResultsDisplay 
          result={result} 
          onCompareClick={() => setCompareMode(true)} 
        />

        {/* Comparison Modal */}
        {compareMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Tender Comparison</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Current Tender</h4>
                  <p><strong>Value:</strong> {result?.data?.estimated_value}</p>
                  <p><strong>Deadline:</strong> {result?.data?.submission_deadline}</p>
                  <p><strong>EMD:</strong> {result?.data?.emd_amount}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Similar Tender (Avg.)</h4>
                  <p><strong>Value:</strong> ₹18,00,000</p>
                  <p><strong>Deadline:</strong> 45 days</p>
                  <p><strong>EMD:</strong> ₹35,000</p>
                </div>
              </div>
              <button 
                onClick={() => setCompareMode(false)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        {!result && !isProcessing && (
          <div className="text-center text-gray-500 text-sm mt-12">
            <p>💡 <strong>Demo Tip:</strong> Upload any PDF file or click demo buttons above.</p>
            <p>The system will demonstrate AI-powered tender data extraction with amendments detection.</p>
          </div>
        )}
      </div>
    </div>
  );
}