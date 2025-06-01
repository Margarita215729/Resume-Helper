import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { Providers } from '@/components/providers'

// Mock SessionProvider
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}))

// Mock ErrorBoundary
jest.mock('@/components/error-boundary', () => {
  return function MockErrorBoundary({ children }: { children: React.ReactNode }) {
    return <div data-testid="error-boundary">{children}</div>
  }
})

describe('Providers', () => {
  it('renders children wrapped in providers', () => {
    const testContent = 'Test content'
    
    render(
      <Providers>
        <div>{testContent}</div>
      </Providers>
    )
    
    expect(screen.getByText(testContent)).toBeInTheDocument()
    expect(screen.getByTestId('session-provider')).toBeInTheDocument()
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
  })

  it('renders with session prop', () => {
    const mockSession = {
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      expires: '2024-01-01'
    }
    
    render(
      <Providers session={mockSession}>
        <div>Test with session</div>
      </Providers>
    )
    
    expect(screen.getByText('Test with session')).toBeInTheDocument()
  })
})
