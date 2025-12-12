import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './AuthForms.css'

export function ForgotPasswordForm({ onSuccess, onBack }) {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await resetPassword(email)
      setSent(true)
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="auth-form">
        <div className="auth-success-icon">📧</div>
        <h2 className="auth-title">Check Your Email</h2>
        <p className="auth-subtitle">
          We sent a password reset link to <strong>{email}</strong>
        </p>
        <button
          type="button"
          className="auth-submit"
          onClick={onBack}
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="auth-form">
      <h2 className="auth-title">Reset Password</h2>
      <p className="auth-subtitle">Enter your email to receive a reset link</p>

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

        <button
          type="submit"
          className="auth-submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="auth-links">
        <button
          type="button"
          className="auth-link"
          onClick={onBack}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  )
}
