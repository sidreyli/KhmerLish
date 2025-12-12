import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from './components/auth/LoginForm'
import { SignUpForm } from './components/auth/SignUpForm'
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm'
import './LoginScreen.css'

function LoginScreen() {
  const navigate = useNavigate()
  const [view, setView] = useState('login') // 'login' | 'signup' | 'forgot'

  const handleSuccess = () => {
    navigate('/onboarding')
  }

  return (
    <div className="login-screen">
      <div className="login-header">
        <div className="login-logo">
          <span className="login-logo-icon">📚</span>
          <h1 className="login-logo-text">កុងរៀន</h1>
          <p className="login-logo-subtitle">Khmerlish</p>
        </div>
      </div>

      <div className="login-content">
        {view === 'login' && (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => setView('signup')}
            onForgotPassword={() => setView('forgot')}
          />
        )}

        {view === 'signup' && (
          <SignUpForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setView('login')}
          />
        )}

        {view === 'forgot' && (
          <ForgotPasswordForm
            onSuccess={() => {}}
            onBack={() => setView('login')}
          />
        )}
      </div>
    </div>
  )
}

export default LoginScreen
