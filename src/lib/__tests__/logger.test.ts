// Mock winston before importing logger
jest.mock('winston', () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  }
  
  return {
    default: {
      createLogger: jest.fn(() => mockLogger),
      format: {
        combine: jest.fn(),
        timestamp: jest.fn(),
        errors: jest.fn(),
        json: jest.fn(),
        printf: jest.fn(),
        colorize: jest.fn(),
        simple: jest.fn(),
      },
      transports: {
        Console: jest.fn(),
        File: jest.fn(),
      },
    },
    createLogger: jest.fn(() => mockLogger),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      errors: jest.fn(),
      json: jest.fn(),
      printf: jest.fn(),
      colorize: jest.fn(),
      simple: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  }
})

import { logger, logInfo, logError, logWarn } from '@/lib/logger'

// Get reference to the mocked logger
const mockLogger = (logger as any) as {
  info: jest.Mock
  error: jest.Mock
  warn: jest.Mock
}

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('logInfo', () => {
    it('logs info message with context', () => {
      const message = 'Test info message'
      const context = { userId: '123', action: 'test' }
      
      logInfo(message, context)
      
      expect(mockLogger.info).toHaveBeenCalledWith(message, context)
    })

    it('logs info message without context', () => {
      const message = 'Test info message'
      
      logInfo(message)
      
      expect(mockLogger.info).toHaveBeenCalledWith(message, undefined)
    })
  })

  describe('logError', () => {
    it('logs error message with error object and context', () => {
      const message = 'Test error message'
      const error = new Error('Test error')
      const context = { userId: '123' }
      
      logError(message, error, context)
      
      expect(mockLogger.error).toHaveBeenCalledWith(message, { 
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }, 
        ...context 
      })
    })

    it('logs error message without error object', () => {
      const message = 'Test error message'
      
      logError(message)
      
      expect(mockLogger.error).toHaveBeenCalledWith(message, { error: undefined })
    })
  })

  describe('logWarn', () => {
    it('logs warning message with context', () => {
      const message = 'Test warning message'
      const context = { resource: 'test' }
      
      logWarn(message, context)
      
      expect(mockLogger.warn).toHaveBeenCalledWith(message, context)
    })

    it('logs warning message without context', () => {
      const message = 'Test warning message'
      
      logWarn(message)
      
      expect(mockLogger.warn).toHaveBeenCalledWith(message, undefined)
    })
  })
})
