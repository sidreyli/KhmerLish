import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './AuthForms.css'

export function LoginForm({ onSuccess, onSwitchToSignUp, onForgotPassword }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Sign in to continue learning</p>

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
            placeholder="Your password"
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
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-links">
        <button
          type="button"
          className="auth-link"
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>
        <button
          type="button"
          className="auth-link"
          onClick={onSwitchToSignUp}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  )
}
