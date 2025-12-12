import { useState, useEffect } from 'react'

// ============================================
// KHMERLISH BRANDING CONCEPTS
// ============================================

// Logo Option A: Wordmark-focused with stylized Khmer script
const LogoWordmark = ({ size = 120, color = 'var(--color-primary)' }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 300 120" fill="none">
    {/* Stylized "Kh" ligature inspired by Khmer script curves */}
    <path
      d="M30 90V30c0-10 8-18 18-18h12c8 0 14 6 14 14v10c0 6-4 11-10 13l20 41"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Decorative Khmer-inspired curl */}
    <path
      d="M74 36c6-6 14-8 22-6 10 2 16 12 14 22-2 8-8 14-16 16"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    {/* The word "merlish" in friendly rounded letters */}
    <text
      x="100"
      y="78"
      fontFamily="Nunito, sans-serif"
      fontSize="42"
      fontWeight="700"
      fill={color}
      letterSpacing="-1"
    >
      merlish
    </text>
    {/* Underline with subtle wave (like water/Mekong) */}
    <path
      d="M30 100 Q80 95 130 100 Q180 105 230 100 Q260 97 280 100"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
  </svg>
)

// Logo Option B: Lotus + Speech bubble icon with wordmark
const LogoIconWordmark = ({ size = 48, showText = true, color = 'var(--color-primary)' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.25 }}>
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8913A" />
          <stop offset="100%" stopColor="#D4802E" />
        </linearGradient>
        <linearGradient id="petalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFF4E6" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* Main circle */}
      <circle cx="32" cy="32" r="30" fill="url(#lotusGrad)" />

      {/* Simplified lotus/speech hybrid - represents growth + communication */}
      {/* Center petal (speech bubble shape) */}
      <path
        d="M32 16c-8 0-14 6-14 13 0 7 6 13 14 13 2 0 4-0.5 6-1l6 4-2-5c2-2 4-5 4-8 0-7-6-13-14-13z"
        fill="url(#petalGrad)"
      />
      {/* Left petal */}
      <ellipse cx="22" cy="40" rx="6" ry="10" fill="url(#petalGrad)" opacity="0.9" transform="rotate(-20 22 40)" />
      {/* Right petal */}
      <ellipse cx="42" cy="40" rx="6" ry="10" fill="url(#petalGrad)" opacity="0.9" transform="rotate(20 42 40)" />
      {/* Small center dot (like lotus center) */}
      <circle cx="32" cy="26" r="3" fill="#E8913A" />
    </svg>

    {showText && (
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'Battambang, cursive',
          fontSize: size * 0.5,
          fontWeight: 700,
          color: color,
          letterSpacing: '-0.02em'
        }}>
          Khmerlish
        </span>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: size * 0.22,
          color: 'var(--color-text-tertiary)',
          marginTop: 2
        }}>
          រៀនភាសាអង់គ្លេស
        </span>
      </div>
    )}
  </div>
)

// Logo Option C: Abstract growing sprout/path symbol
const LogoAbstract = ({ size = 64, color = 'var(--color-primary)' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="sproutGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1A6B6B" />
        <stop offset="50%" stopColor="#E8913A" />
        <stop offset="100%" stopColor="#F5A623" />
      </linearGradient>
    </defs>

    {/* Growing path - represents journey from Khmer to English */}
    <path
      d="M12 52 Q16 40 24 36 Q32 32 32 24 Q32 16 40 12"
      stroke="url(#sproutGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Leaf/flame at top - knowledge blooming */}
    <path
      d="M40 12 Q48 8 52 14 Q56 20 50 24 Q44 20 40 12"
      fill="#E8913A"
    />
    <path
      d="M40 12 Q36 6 40 2 Q44 6 44 14 Q42 10 40 12"
      fill="#F5A623"
    />

    {/* Root circle - foundation */}
    <circle cx="12" cy="52" r="6" fill="#1A6B6B" />

    {/* Small dots along path - progress markers */}
    <circle cx="24" cy="36" r="3" fill="#E8913A" opacity="0.6" />
    <circle cx="32" cy="24" r="3" fill="#E8913A" opacity="0.8" />
  </svg>
)

// App Icon Component (rounded square Android style)
const AppIcon = ({ size = 96, variant = 'B' }) => {
  const radius = size * 0.22 // Android adaptive icon radius

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: 'linear-gradient(135deg, #E8913A 0%, #D4802E 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 ${size * 0.04}px ${size * 0.12}px rgba(232, 145, 58, 0.4)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
      }} />

      {variant === 'A' && (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 64 64" fill="none">
          <text
            x="32"
            y="44"
            fontFamily="Battambang, cursive"
            fontSize="36"
            fontWeight="900"
            fill="white"
            textAnchor="middle"
          >
            ខ
          </text>
        </svg>
      )}

      {variant === 'B' && (
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 64 64" fill="none">
          {/* Lotus speech bubble */}
          <path
            d="M32 10c-10 0-18 7-18 16 0 9 8 16 18 16 3 0 5-0.5 7-1.5l8 5-3-7c3-3 4-6 4-10 0-9-8-16-18-16z"
            fill="white"
          />
          <ellipse cx="20" cy="48" rx="7" ry="12" fill="white" opacity="0.9" transform="rotate(-15 20 48)" />
          <ellipse cx="44" cy="48" rx="7" ry="12" fill="white" opacity="0.9" transform="rotate(15 44 48)" />
          <circle cx="32" cy="22" r="4" fill="#E8913A" />
        </svg>
      )}

      {variant === 'C' && (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 64 64" fill="none">
          <path
            d="M16 52 Q20 38 30 34 Q40 30 40 20 Q40 12 48 8"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M48 8 Q56 4 60 10 Q64 16 58 20 Q52 16 48 8"
            fill="white"
          />
          <circle cx="16" cy="52" r="5" fill="white" />
          <circle cx="30" cy="34" r="2.5" fill="white" opacity="0.7" />
        </svg>
      )}
    </div>
  )
}

// Splash Screen Component
const SplashScreen = ({ animating = true }) => {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (animating) {
      const interval = setInterval(() => setPulse(p => !p), 1500)
      return () => clearInterval(interval)
    }
  }, [animating])

  return (
    <div style={{
      width: '100%',
      maxWidth: 375,
      height: 667,
      background: 'linear-gradient(180deg, #FFFBF5 0%, #FFF4E6 50%, #FFE8CC 100%)',
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(45, 35, 25, 0.15)'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,145,58,0.15) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '-15%',
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,107,107,0.1) 0%, transparent 70%)',
      }} />

      {/* Angkor-inspired subtle pattern at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        opacity: 0.1,
        background: `repeating-linear-gradient(
          90deg,
          #E8913A 0px,
          #E8913A 20px,
          transparent 20px,
          transparent 30px
        )`,
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
      }} />

      {/* Main logo with pulse animation */}
      <div style={{
        transform: pulse ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 1.5s ease-in-out',
        marginBottom: 24
      }}>
        <AppIcon size={120} variant="B" />
      </div>

      {/* App name in English */}
      <h1 style={{
        fontFamily: 'Battambang, cursive',
        fontSize: 36,
        fontWeight: 700,
        color: '#E8913A',
        margin: 0,
        letterSpacing: '-0.02em'
      }}>
        Khmerlish
      </h1>

      {/* Tagline in Khmer */}
      <p style={{
        fontFamily: 'Battambang, cursive',
        fontSize: 16,
        color: '#6B5D4D',
        margin: '8px 0 0 0',
        lineHeight: 1.7
      }}>
        រៀនភាសាអង់គ្លេសជារៀងរាល់ថ្ងៃ
      </p>

      {/* Loading indicator */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        display: 'flex',
        gap: 8
      }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#E8913A',
              opacity: pulse ? (i === 1 ? 1 : 0.4) : (i === 0 ? 1 : 0.4),
              transition: 'opacity 0.5s ease',
              transitionDelay: `${i * 150}ms`
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Custom Loading Animation
const LoadingSpinner = ({ size = 48 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 48 48" style={{ animation: 'spin 2s linear infinite' }}>
        <defs>
          <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8913A" stopOpacity="0" />
            <stop offset="50%" stopColor="#E8913A" stopOpacity="1" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#spinGrad)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="25"
        />
      </svg>
      {/* Center lotus dot */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size * 0.25,
        height: size * 0.25,
        borderRadius: '50%',
        background: '#E8913A',
        animation: 'pulse 1.5s ease-in-out infinite'
      }} />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

// Skeleton Loader
const SkeletonLoader = ({ type = 'card' }) => {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, #F2EBE3 0%, #FFFBF5 50%, #F2EBE3 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
    borderRadius: 8
  }

  if (type === 'card') {
    return (
      <div style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 2px 8px rgba(45,35,25,0.08)'
      }}>
        {/* Header skeleton */}
        <div style={{ ...shimmerStyle, height: 24, width: '60%', marginBottom: 12 }} />
        {/* Body lines */}
        <div style={{ ...shimmerStyle, height: 16, width: '100%', marginBottom: 8 }} />
        <div style={{ ...shimmerStyle, height: 16, width: '85%', marginBottom: 8 }} />
        <div style={{ ...shimmerStyle, height: 16, width: '70%' }} />

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    )
  }

  if (type === 'lesson') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        background: '#FFFFFF',
        borderRadius: 12
      }}>
        {/* Icon placeholder */}
        <div style={{ ...shimmerStyle, width: 56, height: 56, borderRadius: 12, flexShrink: 0 }} />
        {/* Text area */}
        <div style={{ flex: 1 }}>
          <div style={{ ...shimmerStyle, height: 18, width: '70%', marginBottom: 8 }} />
          <div style={{ ...shimmerStyle, height: 14, width: '50%' }} />
        </div>
        {/* Progress indicator */}
        <div style={{ ...shimmerStyle, width: 40, height: 40, borderRadius: '50%' }} />

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    )
  }

  return null
}

// Progress Loader (for lesson completion, etc.)
const ProgressLoader = ({ progress = 65, label = 'កំពុងផ្ទុក...' }) => {
  return (
    <div style={{ width: '100%', maxWidth: 280 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 8,
        fontFamily: 'Battambang, cursive',
        fontSize: 14,
        color: '#6B5D4D'
      }}>
        <span>{label}</span>
        <span style={{ color: '#E8913A', fontWeight: 700 }}>{progress}%</span>
      </div>
      <div style={{
        height: 8,
        background: '#F2EBE3',
        borderRadius: 999,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #E8913A, #F5A623)',
          borderRadius: 999,
          transition: 'width 0.5s ease',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            animation: 'progressShimmer 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}

// Main Branding Component
function Branding() {
  const [activeTab, setActiveTab] = useState('logos')

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: 32,
      fontFamily: 'Nunito, sans-serif',
      background: 'var(--color-background)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: 48,
        paddingBottom: 32,
        borderBottom: '2px solid var(--color-border)'
      }}>
        <h1 style={{
          fontFamily: 'Battambang, cursive',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--color-primary)',
          marginBottom: 8
        }}>
          Khmerlish Branding
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 18 }}>
          Brand Identity & Visual Assets
        </p>
      </header>

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 48,
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'logos', label: 'Logo Concepts' },
          { id: 'icons', label: 'App Icons' },
          { id: 'splash', label: 'Splash Screen' },
          { id: 'loading', label: 'Loading States' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: activeTab === tab.id ? 'white' : 'var(--color-text-secondary)',
              boxShadow: activeTab === tab.id ? 'var(--shadow-md)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Logo Concepts Section */}
      {activeTab === 'logos' && (
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 32
          }}>
            {/* Option A: Wordmark */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              padding: 32,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24
              }}>
                Option A: Wordmark
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                alignItems: 'center'
              }}>
                <LogoWordmark size={200} />

                {/* Monochrome version */}
                <div style={{ padding: 20, background: '#2D2319', borderRadius: 12, width: '100%' }}>
                  <LogoWordmark size={160} color="#FFFFFF" />
                </div>
              </div>

              <p style={{
                marginTop: 24,
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                <strong>Concept:</strong> Stylized Khmer script "Kh" ligature flows into English text.
                Wave underline evokes the Mekong River. Works best for horizontal layouts.
              </p>
            </div>

            {/* Option B: Icon + Wordmark */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              padding: 32,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24
              }}>
                Option B: Lotus Speech (Recommended)
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                alignItems: 'center'
              }}>
                <LogoIconWordmark size={64} />

                <div style={{
                  display: 'flex',
                  gap: 24,
                  alignItems: 'center',
                  padding: 20,
                  background: '#2D2319',
                  borderRadius: 12,
                  width: '100%',
                  justifyContent: 'center'
                }}>
                  <LogoIconWordmark size={48} color="#FFFFFF" />
                </div>

                {/* Icon only */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <AppIcon size={48} variant="B" />
                  <AppIcon size={64} variant="B" />
                  <AppIcon size={80} variant="B" />
                </div>
              </div>

              <p style={{
                marginTop: 24,
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                <strong>Concept:</strong> Lotus flower meets speech bubble - symbolizes Cambodian
                culture and language learning. Icon works standalone at all sizes.
              </p>
            </div>

            {/* Option C: Abstract */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              padding: 32,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24
              }}>
                Option C: Growth Path
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <LogoAbstract size={80} />
                  <div>
                    <div style={{
                      fontFamily: 'Battambang, cursive',
                      fontSize: 32,
                      fontWeight: 700,
                      color: 'var(--color-primary)'
                    }}>
                      Khmerlish
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  padding: 20,
                  background: '#2D2319',
                  borderRadius: 12
                }}>
                  <AppIcon size={56} variant="C" />
                  <AppIcon size={72} variant="C" />
                </div>
              </div>

              <p style={{
                marginTop: 24,
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                <strong>Concept:</strong> A growing path from root (Khmer) to bloom (English fluency).
                Represents the learning journey with progress markers along the way.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* App Icons Section */}
      {activeTab === 'icons' && (
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32
          }}>
            {['A', 'B', 'C'].map(variant => (
              <div key={variant} style={{
                background: 'var(--color-surface)',
                borderRadius: 20,
                padding: 32,
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--color-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 24
                }}>
                  Variant {variant}: {variant === 'A' ? 'Khmer Letter' : variant === 'B' ? 'Lotus Speech' : 'Growth Path'}
                </div>

                {/* Light background */}
                <div style={{
                  background: '#FFFBF5',
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: 20
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <AppIcon size={48} variant={variant} />
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 8 }}>48px</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <AppIcon size={96} variant={variant} />
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 8 }}>96px</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <AppIcon size={144} variant={variant} />
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 8 }}>144px</div>
                  </div>
                </div>

                {/* Dark background */}
                <div style={{
                  background: '#1A1612',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: 20
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <AppIcon size={48} variant={variant} />
                    <div style={{ fontSize: 11, color: '#8A7A68', marginTop: 8 }}>48px</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <AppIcon size={96} variant={variant} />
                    <div style={{ fontSize: 11, color: '#8A7A68', marginTop: 8 }}>96px</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <AppIcon size={144} variant={variant} />
                    <div style={{ fontSize: 11, color: '#8A7A68', marginTop: 8 }}>144px</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Splash Screen Section */}
      {activeTab === 'splash' && (
        <section>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 16,
                textAlign: 'center'
              }}>
                Splash Screen (Live Preview)
              </div>
              <SplashScreen animating={true} />
            </div>

            <div style={{
              maxWidth: 400,
              padding: 32,
              background: 'var(--color-surface)',
              borderRadius: 20,
              boxShadow: 'var(--shadow-md)',
              alignSelf: 'flex-start'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 16
              }}>
                Splash Screen Elements
              </h3>

              <ul style={{
                listStyle: 'none',
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                lineHeight: 2
              }}>
                <li>✓ Warm cream-to-peach gradient background</li>
                <li>✓ Subtle radial glow accents (mango & teal)</li>
                <li>✓ Angkor-inspired geometric pattern at bottom</li>
                <li>✓ Centered app icon with gentle pulse animation</li>
                <li>✓ App name in Battambang font</li>
                <li>✓ Khmer tagline: "រៀនភាសាអង់គ្លេសជារៀងរាល់ថ្ងៃ"</li>
                <li>✓ Three-dot loading indicator</li>
              </ul>

              <div style={{
                marginTop: 24,
                padding: 16,
                background: 'var(--color-primary-light)',
                borderRadius: 12,
                fontSize: 13,
                color: 'var(--color-primary-dark)'
              }}>
                <strong>Animation Notes:</strong> Logo pulses gently (scale 1.0→1.02) every 1.5s.
                Loading dots alternate opacity. Keep animations subtle for budget devices.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading States Section */}
      {activeTab === 'loading' && (
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32
          }}>
            {/* Spinner */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              padding: 32,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24
              }}>
                Loading Spinner
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 32,
                alignItems: 'center',
                padding: 32
              }}>
                <LoadingSpinner size={32} />
                <LoadingSpinner size={48} />
                <LoadingSpinner size={64} />
              </div>

              <p style={{
                fontSize: 13,
                color: 'var(--color-text-secondary)',
                marginTop: 16
              }}>
                Gradient arc spinner with pulsing lotus center. Smooth rotation, not jarring.
              </p>
            </div>

            {/* Progress Loader */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              padding: 32,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24
              }}>
                Progress Indicator
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                alignItems: 'center',
                padding: 16
              }}>
                <ProgressLoader progress={35} label="កំពុងទាញយកមេរៀន..." />
                <ProgressLoader progress={65} label="កំពុងផ្ទុក..." />
                <ProgressLoader progress={90} label="ស្ទើរតែរួចរាល់..." />
              </div>
            </div>

            {/* Skeleton Loaders */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              padding: 32,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24
              }}>
                Skeleton Loaders
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                background: '#FFFBF5',
                padding: 16,
                borderRadius: 12
              }}>
                <SkeletonLoader type="lesson" />
                <SkeletonLoader type="lesson" />
                <SkeletonLoader type="card" />
              </div>

              <p style={{
                fontSize: 13,
                color: 'var(--color-text-secondary)',
                marginTop: 16
              }}>
                Warm-toned skeleton with subtle shimmer animation. Matches app's cream palette.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '48px 0 24px',
        borderTop: '1px solid var(--color-border)',
        marginTop: 64
      }}>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
          Khmerlish Brand Guidelines v1.0
        </p>
        <p className="khmer" style={{
          fontFamily: 'Battambang, cursive',
          color: 'var(--color-primary)',
          marginTop: 8,
          fontWeight: 700
        }}>
          សម្រាប់សិស្សកម្ពុជា
        </p>
      </footer>
    </div>
  )
}

export default Branding
