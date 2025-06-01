import { NextRequest } from 'next/server'
import { GET } from '@/app/api/health/route'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: async () => data,
      status: options?.status || 200,
      headers: new Headers({ 'content-type': 'application/json' }),
    })),
  },
}))

// Mock NextRequest
const createMockRequest = (url: string = 'http://localhost:3000/api/health') => {
  return {
    url,
    method: 'GET',
    headers: new Headers(),
    body: null,
    json: jest.fn(),
    text: jest.fn(),
    formData: jest.fn(),
  } as unknown as NextRequest
}

// Mock the auth module
jest.mock('../../../../../auth', () => ({
  auth: jest.fn(),
}))

// Mock logger
jest.mock('@/lib/logger', () => ({
  logInfo: jest.fn(),
  logError: jest.fn(),
}))

// Mock Application Insights
jest.mock('@/lib/monitoring', () => ({
  appInsights: {
    defaultClient: {
      trackDependency: jest.fn(),
      trackException: jest.fn(),
    },
  },
}))

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Set up environment variables to ensure healthy status
    process.env.GITHUB_TOKEN = 'test-token'
    process.env.npm_package_version = '1.0.0'
  })

  afterEach(() => {
    // Clean up environment variables
    delete process.env.GITHUB_TOKEN
    delete process.env.npm_package_version
  })

  it('returns healthy status when all services are OK', async () => {
    const mockRequest = createMockRequest()
    
    const response = await GET(mockRequest)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.timestamp).toBeDefined()
    expect(data.checks.uptime).toBeDefined()
    expect(data.checks).toBeDefined()
    expect(data.checks.database).toBe('healthy')
    expect(data.checks.ai_service).toBe('healthy')
    expect(data.checks.memory).toBe('healthy')
  })

  it('includes proper health check metadata', async () => {
    const mockRequest = createMockRequest()
    
    const response = await GET(mockRequest)
    const data = await response.json()
    
    expect(data.version).toBe('1.0.0')
    expect(data.environment).toBe('test')
    expect(typeof data.checks.uptime).toBe('number')
    expect(data.checks).toBeDefined()
    expect(data.checks.memory).toBeDefined()
  })

  it('returns correct content type headers', async () => {
    const mockRequest = createMockRequest()
    
    const response = await GET(mockRequest)
    
    expect(response.headers.get('content-type')).toBe('application/json')
  })
})
