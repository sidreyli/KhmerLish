import { useState, useEffect } from 'react'

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = async () => {
    if (!deferredPrompt) return false

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstallable(false)
      setDeferredPrompt(null)
      return true
    }
    return false
  }

  return { isInstallable, isInstalled, promptInstall }
}

export function InstallBanner({ onDismiss }) {
  const { isInstallable, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('install-banner-dismissed') === 'true'
  })

  if (!isInstallable || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('install-banner-dismissed', 'true')
    onDismiss?.()
  }

  const handleInstall = async () => {
    const success = await promptInstall()
    if (success) {
      handleDismiss()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(70px + env(safe-area-inset-bottom))',
      left: '16px',
      right: '16px',
      background: 'linear-gradient(135deg, #1A6B6B 0%, #0D4F4F 100%)',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 8px 32px rgba(26, 107, 107, 0.4)',
      zIndex: 1000,
      animation: 'slideUp 0.3s ease-out',
    }}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0,
        }}>
          📲
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-khmer)',
            fontSize: '15px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '4px',
          }}>
            ដំឡើងកម្មវិធី
          </div>
          <div style={{
            fontFamily: 'var(--font-english)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.8)',
          }}>
            Add to your home screen for a better experience
          </div>
        </div>

        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '16px',
      }}>
        <button
          onClick={handleDismiss}
          style={{
            flex: 1,
            padding: '10px',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '10px',
            fontFamily: 'var(--font-khmer)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.9)',
            cursor: 'pointer',
          }}
        >
          ពេលក្រោយ
        </button>
        <button
          onClick={handleInstall}
          style={{
            flex: 1,
            padding: '10px',
            background: '#E8913A',
            border: 'none',
            borderRadius: '10px',
            fontFamily: 'var(--font-khmer)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(232, 145, 58, 0.4)',
          }}
        >
          ដំឡើង
        </button>
      </div>
    </div>
  )
}
