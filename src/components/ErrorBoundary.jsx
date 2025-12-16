import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '24px',
          background: 'var(--color-background, #FFFBF5)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '16px',
          }}>
            😵
          </div>

          <h1 style={{
            fontFamily: 'Battambang, serif',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--color-text-primary, #2D2319)',
            marginBottom: '8px',
          }}>
            មានបញ្ហាកើតឡើង
          </h1>

          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            color: 'var(--color-text-secondary, #6B5D4D)',
            marginBottom: '24px',
          }}>
            Something went wrong. Please try again.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <div style={{
              background: 'rgba(212, 97, 75, 0.1)',
              border: '1px solid rgba(212, 97, 75, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              maxWidth: '100%',
              overflow: 'auto',
              textAlign: 'left',
            }}>
              <p style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#D4614B',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {this.state.error.toString()}
              </p>
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #E8913A 0%, #D4791F 100%)',
                border: 'none',
                borderRadius: '12px',
                fontFamily: 'Battambang, serif',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(232, 145, 58, 0.4)',
              }}
            >
              🔄 ព្យាយាមម្តងទៀត
            </button>

            <button
              onClick={this.handleGoHome}
              style={{
                padding: '14px 28px',
                background: 'white',
                border: '2px solid #E8913A',
                borderRadius: '12px',
                fontFamily: 'Battambang, serif',
                fontSize: '16px',
                fontWeight: 600,
                color: '#E8913A',
                cursor: 'pointer',
              }}
            >
              🏠 ទៅទំព័រដើម
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
