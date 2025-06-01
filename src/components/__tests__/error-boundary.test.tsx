import { render, screen } from '@testing-library/react'
import ErrorBoundary from '@/components/error-boundary'

// Mock the logger to avoid winston issues in tests
jest.mock('@/lib/logger', () => ({
  logError: jest.fn(),
}))

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

// Suppress console.error for these tests
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('renders error details in development mode', () => {
    // Mock NODE_ENV for this test since it's read-only
    const originalDescriptor = Object.getOwnPropertyDescriptor(process.env, 'NODE_ENV')
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    })
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    // Check for the error message within the error details
    const errorDetailsElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'pre' && content.includes('Test error')
    })
    expect(errorDetailsElement).toBeTruthy()
    
    // Restore NODE_ENV
    if (originalDescriptor) {
      Object.defineProperty(process.env, 'NODE_ENV', originalDescriptor)
    }
  })

  it('resets error state when retry button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Something went wrong')).toBeTruthy()
    
    // Click retry button
    screen.getByText('Try again').click()
    
    // Re-render with no error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('No error')).toBeTruthy()
  })
})
