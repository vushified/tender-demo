'use client';

export default function FileUpload({ onFileUpload, onDemoClick }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-dashed border-blue-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📄</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Upload Tender Document
        </h2>
        <p className="text-gray-600 mb-4">
          Upload any tender PDF to extract structured data automatically
        </p>
        
        <label className="cursor-pointer">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 inline-block">
            Choose PDF File
          </div>
          <input
            type="file"
            accept=".pdf"
            onChange={onFileUpload}
            className="hidden"
          />
        </label>
        
        {/* Demo Buttons */}
        <div className="mt-4 flex gap-4 justify-center">
          <button 
            onClick={() => onDemoClick('tender1.pdf')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600"
          >
            Demo Tender 1 (IT Equipment)
          </button>
          <button 
            onClick={() => onDemoClick('tender2.pdf')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600"
          >
            Demo Tender 2 (Construction)
          </button>
        </div>
      </div>
    </div>
  );
}