import { validateInput, sanitizeHtml, handleApiError } from '@/lib/api-utils'
import { z } from 'zod'
import { NextResponse } from 'next/server'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status || 200,
      body: JSON.stringify(body),
      json: async () => body,
    })),
  },
}))

// Mock the auth module
jest.mock('../../../auth', () => ({
  auth: jest.fn(),
}))

// Mock the logger module
jest.mock('@/lib/logger', () => ({
  logError: jest.fn(),
  logInfo: jest.fn(),
}))

const mockNextResponse = NextResponse as jest.Mocked<typeof NextResponse>

describe('API Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('validateInput', () => {
    const testSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      age: z.number().min(18),
    })

    it('validates correct input', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
      }

      const result = validateInput(testSchema, validData)
      expect(result).toEqual(validData)
    })

    it('returns error response for invalid input', () => {
      const invalidData = {
        name: 'J',
        email: 'invalid-email',
        age: 16,
      }

      const result = validateInput(testSchema, invalidData)
      expect(mockNextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Validation failed',
          details: expect.any(Array),
        }),
        { status: 400 }
      )
    })
  })

  describe('sanitizeHtml', () => {
    it('escapes HTML characters', () => {
      const input = '<script>alert("xss")</script>'
      const result = sanitizeHtml(input)
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;')
    })

    it('handles normal text', () => {
      const input = 'Hello world!'
      const result = sanitizeHtml(input)
      expect(result).toBe('Hello world!')
    })

    it('escapes quotes and apostrophes', () => {
      const input = `It's a "test" string`
      const result = sanitizeHtml(input)
      expect(result).toBe('It&#x27;s a &quot;test&quot; string')
    })
  })

  describe('handleApiError', () => {
    it('handles ZodError', () => {
      const zodError = new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['name'],
          message: 'Expected string, received number',
        },
      ])

      handleApiError(zodError)
      expect(mockNextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Validation failed',
          details: expect.any(Array),
        }),
        { status: 400 }
      )
    })

    it('handles generic Error', () => {
      const error = new Error('Test error')
      handleApiError(error)
      expect(mockNextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(String),
        }),
        { status: 500 }
      )
    })

    it('handles unknown errors', () => {
      const error = 'String error'
      handleApiError(error)
      expect(mockNextResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Internal server error',
        }),
        { status: 500 }
      )
    })
  })
})
