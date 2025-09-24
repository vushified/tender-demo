'use client';

export default function LoadingSpinner() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div>
        <div>
          <p className="font-semibold text-yellow-800">AI Processing Document...</p>
          <p className="text-sm text-yellow-600">Extracting tender data using advanced AI models</p>
        </div>
      </div>
    </div>
  );
}