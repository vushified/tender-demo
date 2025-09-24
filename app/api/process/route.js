import { sampleData, corrigendaData, riskAnalysis } from '../../sample-data';

export async function POST(request) {
  try {
    const { filename } = await request.json();
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get data based on filename, or use default
    const resultData = filename && sampleData[filename] ? sampleData[filename] : sampleData.default;
    const amendments = filename && corrigendaData[filename] ? corrigendaData[filename] : [];
    const risks = filename && riskAnalysis[filename] ? riskAnalysis[filename] : [];
    
    return Response.json({
      success: true,
      data: resultData,
      amendments: amendments,
      risk_analysis: risks,
      processing_time: "2.3 seconds",
      // Safely access properties to prevent errors
      fields_extracted: resultData?.extracted_fields?.length ?? 0,
      amendments_count: amendments.length
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({  
      success: false,  
      error: "Processing failed: " + error.message  
    }, { status: 500 });
  }
}