import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './AuthForms.css'

export function SignUpForm({ onSuccess, onSwitchToLogin }) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const data = await signUp(email, password)
      console.log('SignUp response:', data)

      // Check if email confirmation is required
      if (data?.user && !data?.session) {
        // User created but no session = email confirmation required
        setEmailSent(true)
      } else if (data?.session) {
        // User logged in immediately (email confirmation disabled)
        onSuccess?.()
      }
    } catch (err) {
      console.error('SignUp error:', err)
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="auth-form">
        <h2 className="auth-title">Check Your Email</h2>
        <p className="auth-subtitle">
          We've sent a confirmation link to <strong>{email}</strong>
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '16px' }}>
          Click the link in the email to activate your account, then come back here to sign in.
        </p>
        <button
          type="button"
          className="auth-submit"
          onClick={onSwitchToLogin}
          style={{ marginTop: '24px' }}
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="auth-form">
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Start your learning journey</p>

      <form onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={loading}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-links">
        <button
          type="button"
          className="auth-link"
          onClick={onSwitchToLogin}
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  )
}
