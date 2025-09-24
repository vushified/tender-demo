import { sampleData, corrigendaData } from '../../sample-data';

export async function POST(request) {
  try {
    const { filename } = await request.json();
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return data based on filename, or default data
    let resultData;
    if (filename && sampleData[filename]) {
      resultData = sampleData[filename];
    } else {
      resultData = sampleData.default;
    }
    
    // Add corrigenda information if available
    const amendments = corrigendaData[filename] || [];
    
    return Response.json({
      success: true,
      data: resultData,
      amendments: amendments,
      processing_time: "2.3 seconds",
      documents_analyzed: 1,
      fields_extracted: resultData.extracted_fields.length,
      amendments_count: amendments.length
    });
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: "Processing failed" 
    });
  }
}