import { useState, useEffect, createContext, useContext, useCallback } from 'react'

// Toast Context
const ToastContext = createContext(null)

// Toast types and their styles
const toastStyles = {
  success: {
    background: 'linear-gradient(135deg, #4A9B5C 0%, #3D8B4F 100%)',
    icon: '✓',
  },
  error: {
    background: 'linear-gradient(135deg, #D4614B 0%, #C4513B 100%)',
    icon: '✕',
  },
  warning: {
    background: 'linear-gradient(135deg, #E6A817 0%, #D69707 100%)',
    icon: '⚠',
  },
  info: {
    background: 'linear-gradient(135deg, #1A6B6B 0%, #0D5555 100%)',
    icon: 'ℹ',
  },
}

// Individual Toast Component
function Toast({ id, type, message, messageKhmer, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false)
  const style = toastStyles[type] || toastStyles.info

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onDismiss(id), 300)
    }, 4000)

    return () => clearTimeout(timer)
  }, [id, onDismiss])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => onDismiss(id), 300)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        background: style.background,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        marginBottom: '8px',
        animation: isExiting ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.3s ease-out',
        cursor: 'pointer',
        maxWidth: 'calc(100vw - 32px)',
      }}
      onClick={handleDismiss}
    >
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        color: 'white',
        flexShrink: 0,
      }}>
        {style.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {messageKhmer && (
          <p style={{
            fontFamily: 'Battambang, serif',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            margin: 0,
            lineHeight: 1.4,
          }}>
            {messageKhmer}
          </p>
        )}
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: messageKhmer ? '12px' : '14px',
          color: messageKhmer ? 'rgba(255, 255, 255, 0.85)' : 'white',
          margin: 0,
          marginTop: messageKhmer ? '2px' : 0,
          lineHeight: 1.4,
        }}>
          {message}
        </p>
      </div>
    </div>
  )
}

// Toast Container Component
function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: 'max(env(safe-area-inset-top, 16px), 16px)',
        left: '16px',
        right: '16px',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{ pointerEvents: 'auto', width: '100%', maxWidth: '400px' }}>
            <Toast {...toast} onDismiss={onDismiss} />
          </div>
        ))}
      </div>
    </>
  )
}

// Toast Provider
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((type, message, messageKhmer = null) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, message, messageKhmer }])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (message, messageKhmer) => addToast('success', message, messageKhmer),
    error: (message, messageKhmer) => addToast('error', message, messageKhmer),
    warning: (message, messageKhmer) => addToast('warning', message, messageKhmer),
    info: (message, messageKhmer) => addToast('info', message, messageKhmer),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

// Hook to use toasts
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastProvider
