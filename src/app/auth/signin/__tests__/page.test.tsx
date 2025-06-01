import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignInPage from '@/app/auth/signin/page'
import { signIn } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react')
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

// Mock router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
}))

describe('SignIn Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign in form', () => {
    render(<SignInPage />)
    
    expect(screen.getByText('Sign in to Resume Helper')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles form submission with valid credentials', async () => {
    mockSignIn.mockResolvedValue({ ok: true, error: null })
    
    render(<SignInPage />)
    
    const emailInput = screen.getByPlaceholderText('Email address')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      })
    })
  })

  it('displays error message on failed sign in', async () => {
    mockSignIn.mockResolvedValue({ ok: false, error: 'Invalid credentials' })
    
    render(<SignInPage />)
    
    const emailInput = screen.getByPlaceholderText('Email address')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<SignInPage />)
    
    const emailInput = screen.getByPlaceholderText('Email address')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Signing in...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })
})
