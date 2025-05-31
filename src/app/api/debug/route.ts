import { NextRequest, NextResponse } from 'next/server';

// Configure for static export
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    console.log('🔍 Environment Debug Test:');
    
    // Check environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubEndpoint = process.env.GITHUB_MODEL_ENDPOINT;
    const githubModel = process.env.GITHUB_MODEL_NAME;
    
    console.log('GITHUB_TOKEN exists:', !!githubToken);
    console.log('GITHUB_TOKEN length:', githubToken ? githubToken.length : 'undefined');
    console.log('GITHUB_MODEL_ENDPOINT:', githubEndpoint);
    console.log('GITHUB_MODEL_NAME:', githubModel);
    
    // Try to import the Azure client
    const ModelClient = (await import('@azure-rest/ai-inference')).default;
    const { AzureKeyCredential } = await import('@azure/core-auth');
    
    console.log('✅ Azure modules imported successfully');
    
    if (!githubToken) {
      throw new Error('GITHUB_TOKEN is not available');
    }
    
    // Try to create the client
    const client = ModelClient(
      githubEndpoint || "https://models.github.ai/inference",
      new AzureKeyCredential(githubToken),
      { apiVersion: "2024-12-01-preview" }
    );
    
    console.log('✅ Azure client created successfully');
    
    return NextResponse.json({
      success: true,
      environment: {
        hasGitHubToken: !!githubToken,
        tokenLength: githubToken ? githubToken.length : 0,
        endpoint: githubEndpoint,
        model: githubModel
      },
      message: 'Environment check passed'
    });
    
  } catch (error: any) {
    console.error('❌ Environment debug error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        environment: {
          hasGitHubToken: !!process.env.GITHUB_TOKEN,
          endpoint: process.env.GITHUB_MODEL_ENDPOINT,
          model: process.env.GITHUB_MODEL_NAME
        }
      },
      { status: 500 }
    );
  }
}
