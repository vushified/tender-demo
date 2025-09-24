'use client';

export default function ResultsDisplay({ result, onCompareClick }) {
  if (!result || !result.data) return null;

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-green-500 text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold text-green-800 text-lg">Tender Analysis Complete!</p>
              <p className="text-green-600">{result.fields_extracted} fields extracted • {result.processing_time}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {result.amendments_count > 0 && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                {result.amendments_count} amendments detected
              </span>
            )}
            <button 
              onClick={onCompareClick}
              className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-600"
            >
              Compare Tenders
            </button>
          </div>
        </div>
      </div>

      {/* Rest of your results display code goes here */}
      {/* ... */}
    </div>
  );
}