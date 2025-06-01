import { render, screen, fireEvent } from '@testing-library/react'
import SignUpPage from '@/app/auth/signup/page'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign up form', () => {
    render(<SignUpPage />)
    
    expect(screen.getByText('Create your account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Create a password (min 8 characters)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('shows validation errors for invalid input', async () => {
    render(<SignUpPage />)
    
    // Try to submit with empty fields
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    
    // Since we can't easily test HTML5 validation, let's test password mismatch
    fireEvent.change(screen.getByPlaceholderText('Create a password (min 8 characters)'), {
      target: { value: 'password123' }
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'different' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  it('handles successful sign up', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'User created successfully' })
    })

    const { signIn } = require('next-auth/react')
    signIn.mockResolvedValue({ ok: true, error: null })
    
    render(<SignUpPage />)
    
    // Fill in form
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Create a password (min 8 characters)'), {
      target: { value: 'password123' }
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    
    // Wait for API calls
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(mockFetch).toHaveBeenCalledWith('/api/auth/signup', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
    }))
  })

  it('handles sign up error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already exists' })
    })
    
    render(<SignUpPage />)
    
    // Fill in form
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Create a password (min 8 characters)'), {
      target: { value: 'password123' }
    })
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    
    // Wait for API calls
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(screen.getByText('Email already exists')).toBeInTheDocument()
  })
})
