import { sampleData, corrigendaData } from '../../sample-data';

export async function POST(request) {
  // Add CORS headers for production
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 });
  }

  try {
    const { filename } = await request.json();
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let resultData;
    if (filename && sampleData[filename]) {
      resultData = sampleData[filename];
    } else {
      resultData = sampleData.default;
    }
    
    const amendments = corrigendaData[filename] || [];
    
    return Response.json({
      success: true,
      data: resultData,
      amendments: amendments,
      processing_time: "2.3 seconds",
      documents_analyzed: 1,
      fields_extracted: resultData.extracted_fields.length,
      amendments_count: amendments.length
    }, { headers });
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: "Processing failed" 
    }, { headers, status: 500 });
  }
}