import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// ============================================
// KHMERLISH ONBOARDING FLOW
// Multi-step swipeable walkthrough
// ============================================

// Decorative illustrations
const WelcomeIllustration = () => (
  <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
    <defs>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#E8913A" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <circle cx="220" cy="40" r="50" fill="url(#sunGrad)"/>
    <circle cx="220" cy="40" r="25" fill="#F5A623" opacity="0.4"/>
    <path d="M30 180 Q50 120 40 60 Q60 100 70 140 Q90 80 100 130 Q120 90 130 150"
          stroke="#1A6B6B" strokeWidth="3" fill="none" opacity="0.3"/>
    <g transform="translate(60, 70)">
      <ellipse cx="40" cy="100" rx="30" ry="20" fill="#E8913A"/>
      <circle cx="40" cy="55" r="28" fill="#D4A574"/>
      <path d="M12 55 Q12 25 40 20 Q68 25 68 55 Q68 40 55 35 Q45 32 40 35 Q35 32 25 35 Q12 40 12 55z" fill="#2D2319"/>
      <circle cx="32" cy="52" r="3" fill="#2D2319"/>
      <circle cx="48" cy="52" r="3" fill="#2D2319"/>
      <path d="M35 62 Q40 66 45 62" stroke="#2D2319" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="55" y="75" width="25" height="18" rx="2" fill="#1A6B6B"/>
    </g>
    <g transform="translate(150, 80)">
      <ellipse cx="40" cy="95" rx="28" ry="18" fill="#1A6B6B"/>
      <circle cx="40" cy="50" r="26" fill="#C4956A"/>
      <path d="M14 45 Q14 22 40 18 Q66 22 66 45 Q60 35 40 33 Q20 35 14 45z" fill="#2D2319"/>
      <circle cx="32" cy="47" r="2.5" fill="#2D2319"/>
      <circle cx="48" cy="47" r="2.5" fill="#2D2319"/>
      <path d="M36 57 Q40 60 44 57" stroke="#2D2319" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="52" y="68" width="14" height="22" rx="3" fill="#2D2319"/>
      <rect x="54" y="71" width="10" height="15" rx="1" fill="#4A9B5C"/>
    </g>
    <g transform="translate(110, 30)">
      <ellipse cx="20" cy="15" rx="25" ry="18" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
      <text x="20" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#E8913A">Hello!</text>
      <path d="M15 30 L20 40 L25 30" fill="white"/>
    </g>
    <g transform="translate(170, 45)">
      <ellipse cx="20" cy="12" rx="22" ry="15" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
      <text x="20" y="15" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1A6B6B">សួស្តី!</text>
      <path d="M25 24 L20 32 L15 24" fill="white"/>
    </g>
    <path d="M250 100 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" fill="#F5A623"/>
    <path d="M40 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z" fill="#E8913A" opacity="0.6"/>
  </svg>
)

const DailyLearningIllustration = () => (
  <svg width="260" height="180" viewBox="0 0 260 180" fill="none">
    <rect x="70" y="20" width="120" height="100" rx="12" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.1))"/>
    <rect x="70" y="20" width="120" height="28" rx="12" fill="#E8913A"/>
    <text x="130" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">សប្តាហ៍នេះ</text>
    {['ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស', 'អា'].map((day, i) => (
      <g key={i} transform={`translate(${82 + i * 15}, 55)`}>
        <text y="8" fontSize="8" fill="#6B5D4D" textAnchor="middle">{day}</text>
        <circle cy="22" r="6" fill={i < 5 ? '#4A9B5C' : i === 5 ? '#E8913A' : '#E8DFD3'}/>
        {i < 5 && (
          <path d="M-2 22 L0 24 L3 19" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        )}
      </g>
    ))}
    <g transform="translate(185, 65)">
      <path d="M15 35 Q5 25 10 15 Q12 20 15 18 Q14 10 20 5 Q22 12 25 10 Q30 15 28 25 Q35 20 30 35 Q25 40 20 40 Q15 40 15 35z" fill="#E8913A"/>
      <path d="M18 35 Q15 30 18 25 Q20 28 22 25 Q25 30 23 35 Q20 38 18 35z" fill="#F5A623"/>
      <text x="20" y="55" textAnchor="middle" fontSize="14" fontWeight="800" fill="#E8913A">6</text>
    </g>
    <g transform="translate(30, 90)">
      <circle cx="25" cy="25" r="22" fill="#C4956A"/>
      <path d="M3 20 Q3 5 25 2 Q47 5 47 20 Q40 12 25 10 Q10 12 3 20z" fill="#2D2319"/>
      <circle cx="18" cy="22" r="2.5" fill="#2D2319"/>
      <circle cx="32" cy="22" r="2.5" fill="#2D2319"/>
      <path d="M20 32 Q25 36 30 32" stroke="#2D2319" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="25" cy="65" rx="22" ry="12" fill="#1A6B6B"/>
    </g>
  </svg>
)

const GamesIllustration = () => (
  <svg width="260" height="180" viewBox="0 0 260 180" fill="none">
    <g transform="translate(40, 20)">
      <rect x="8" y="8" width="100" height="70" rx="10" fill="#E8DFD3"/>
      <rect x="4" y="4" width="100" height="70" rx="10" fill="#F2EBE3"/>
      <rect x="0" y="0" width="100" height="70" rx="10" fill="white" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"/>
      <text x="50" y="35" textAnchor="middle" fontSize="28" fontWeight="800" fill="#E8913A">?</text>
      <text x="50" y="55" textAnchor="middle" fontSize="10" fill="#6B5D4D">Apple = ?</text>
    </g>
    <g transform="translate(150, 30)">
      <rect x="0" y="0" width="70" height="28" rx="8" fill="#E8F5EA" stroke="#4A9B5C" strokeWidth="2"/>
      <text x="35" y="18" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4A9B5C">ផ្លែប៉ោម</text>
      <rect x="0" y="35" width="70" height="28" rx="8" fill="white" stroke="#E8DFD3" strokeWidth="2"/>
      <text x="35" y="53" textAnchor="middle" fontSize="11" fill="#6B5D4D">ផ្លែចេក</text>
    </g>
    <g transform="translate(60, 100)">
      <ellipse cx="70" cy="35" rx="60" ry="30" fill="#1A6B6B"/>
      <ellipse cx="70" cy="30" rx="55" ry="26" fill="#2A9D9D"/>
      <rect x="30" y="20" width="8" height="22" rx="2" fill="#1A6B6B"/>
      <rect x="25" y="26" width="18" height="8" rx="2" fill="#1A6B6B"/>
      <circle cx="95" cy="24" r="6" fill="#E8913A"/>
      <circle cx="108" cy="32" r="6" fill="#4A9B5C"/>
      <circle cx="82" cy="32" r="6" fill="#D4614B"/>
      <circle cx="95" cy="40" r="6" fill="#F5A623"/>
    </g>
    <path d="M30 60 l4 8 9 1 -6 6 2 9 -9 -4 -9 4 2 -9 -6 -6 9 -1z" fill="#F5A623"/>
  </svg>
)

const LevelIllustration = ({ level }) => {
  const colors = {
    A1: { bg: '#E8F5EA', emoji: '🌱' },
    A2: { bg: '#FFF4E6', emoji: '🌿' },
    B1: { bg: '#E6F5F5', emoji: '🌳' }
  }
  const c = colors[level] || colors.A1

  return (
    <div style={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: c.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24
    }}>
      {c.emoji}
    </div>
  )
}

// Page dot indicator
const PageDots = ({ current, total }) => (
  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? 24 : 8,
          height: 8,
          borderRadius: 4,
          background: i === current ? 'var(--color-primary)' : 'var(--color-border)',
          transition: 'all 0.3s ease'
        }}
      />
    ))}
  </div>
)

// Button components
const PrimaryButton = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: '100%',
      padding: '16px 24px',
      background: disabled ? 'var(--color-border)' : 'var(--color-primary)',
      color: disabled ? 'var(--color-text-tertiary)' : 'white',
      border: 'none',
      borderRadius: 14,
      fontFamily: 'var(--font-khmer)',
      fontSize: 16,
      fontWeight: 700,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: disabled ? 'none' : '0 4px 12px rgba(232, 145, 58, 0.3)',
      lineHeight: 1.7,
    }}
  >
    {children}
  </button>
)

const SecondaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: '14px 24px',
      background: 'white',
      color: 'var(--color-text-primary)',
      border: '2px solid var(--color-border)',
      borderRadius: 14,
      fontFamily: 'var(--font-khmer)',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      lineHeight: 1.7,
    }}
  >
    {children}
  </button>
)

const TextButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 14,
      cursor: 'pointer',
      padding: '8px 16px',
      lineHeight: 1.7
    }}
  >
    {children}
  </button>
)

// Onboarding screens data
const screens = [
  {
    id: 'welcome',
    title: 'Khmerlish',
    subtitle: 'រៀនភាសាអង់គ្លេសយ៉ាងសប្បាយ',
    subtitleEn: 'Learn English the fun way',
    illustration: WelcomeIllustration,
    isWelcome: true,
  },
  {
    id: 'daily',
    title: 'រៀនរៀងរាល់ថ្ងៃ',
    subtitle: 'ចំណាយពេល ១០ នាទីក្នុងមួយថ្ងៃ ហើយមើលការរីកចម្រើនរបស់អ្នក។ រក្សាការរៀនជាប់គ្នារាល់ថ្ងៃ!',
    illustration: DailyLearningIllustration,
  },
  {
    id: 'games',
    title: 'លេងហ្គេមភាសា',
    subtitle: 'រៀនតាមរយៈល្បែងកម្សាន្ត សំណួរ និងការប្រកួត។ អ្នកនឹងមិនដឹងថាអ្នកកំពុងរៀនទេ!',
    illustration: GamesIllustration,
  },
  {
    id: 'level',
    title: 'ជ្រើសរើសកម្រិតរបស់អ្នក',
    titleEn: 'Choose your level',
    isLevelSelect: true,
  },
  {
    id: 'name',
    title: 'តើយើងគួរហៅអ្នកថាអ្វី?',
    titleEn: 'What should we call you?',
    isNameInput: true,
  },
]

const levels = [
  { id: 'A1', khmer: 'អ្នកចាប់ផ្តើម', desc: 'I know very little English' },
  { id: 'A2', khmer: 'មូលដ្ឋាន', desc: 'I know some basic words' },
  { id: 'B1', khmer: 'មធ្យម', desc: 'I can have simple conversations' }
]

function Onboarding() {
  const navigate = useNavigate()
  const { updateProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [name, setName] = useState('')
  const [nameFocused, setNameFocused] = useState(false)
  const [saving, setSaving] = useState(false)
  const containerRef = useRef(null)

  const screen = screens[currentStep]
  const isLastStep = currentStep === screens.length - 1
  const totalSteps = screens.length

  const handleNext = async () => {
    if (isLastStep) {
      // Complete onboarding - save to Supabase
      setSaving(true)
      try {
        await updateProfile({
          level: selectedLevel || 'A1',
          display_name: name || null,
          onboarding_completed: true
        })
        navigate('/')
      } catch (error) {
        console.error('Failed to save profile:', error)
        // Still navigate even if save fails - we can retry later
        navigate('/')
      } finally {
        setSaving(false)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSkip = async () => {
    setSaving(true)
    try {
      await updateProfile({
        onboarding_completed: true
      })
    } catch (error) {
      console.error('Failed to save profile:', error)
    }
    navigate('/')
  }

  const canProceed = () => {
    if (screen.isLevelSelect) return !!selectedLevel
    if (screen.isNameInput) return true // Name is optional
    return true
  }

  return (
    <div className="screen screen-fullscreen" style={{
      background: 'linear-gradient(180deg, #FFFBF5 0%, #FFF4E6 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-5)',
      paddingTop: 'env(safe-area-inset-top, var(--space-5))',
      paddingBottom: 'env(safe-area-inset-bottom, var(--space-5))',
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* Skip button (not on welcome or last step) */}
      {!screen.isWelcome && !isLastStep && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-2)' }}>
          <TextButton onClick={handleSkip}>រំលង</TextButton>
        </div>
      )}

      {/* Content */}
      <div
        ref={containerRef}
        className="animate-fade-in"
        key={currentStep}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-5)',
          overflow: 'auto',
        }}
      >
        {/* Welcome screen */}
        {screen.isWelcome && (
          <>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #E8913A, #D4802E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(232, 145, 58, 0.35)'
            }}>
              <span style={{ fontSize: 40 }}>📚</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-display)',
              fontWeight: 700,
              color: 'var(--color-primary)',
              margin: 0
            }}>
              {screen.title}
            </h1>
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              margin: 0,
              textAlign: 'center'
            }}>
              {screen.subtitle}
            </p>
            <screen.illustration />
          </>
        )}

        {/* Regular onboarding screens */}
        {!screen.isWelcome && !screen.isLevelSelect && !screen.isNameInput && (
          <>
            <screen.illustration />
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-h1)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: '0 0 var(--space-3)',
                lineHeight: 'var(--leading-khmer)'
              }}>
                {screen.title}
              </h2>
              <p style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: 'var(--leading-khmer)',
                padding: '0 var(--space-4)'
              }}>
                {screen.subtitle}
              </p>
            </div>
          </>
        )}

        {/* Level selection screen */}
        {screen.isLevelSelect && (
          <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-h2)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: '0 0 var(--space-2)',
              }}>
                {screen.title}
              </h2>
              <p style={{
                fontFamily: 'var(--font-english)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-secondary)',
                margin: 0
              }}>
                {screen.titleEn}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    background: selectedLevel === level.id ? 'var(--color-primary-light)' : 'white',
                    border: `2px solid ${selectedLevel === level.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  <LevelIllustration level={level.id} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontFamily: 'var(--font-english)',
                        fontSize: 'var(--text-caption)',
                        fontWeight: 800,
                        color: selectedLevel === level.id ? 'var(--color-primary)' : 'var(--color-text-tertiary)'
                      }}>
                        {level.id}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-khmer)',
                        fontSize: 'var(--text-body)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}>
                        {level.khmer}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-english)',
                      fontSize: 'var(--text-small)',
                      color: 'var(--color-text-secondary)',
                      margin: '4px 0 0'
                    }}>
                      {level.desc}
                    </p>
                  </div>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `2px solid ${selectedLevel === level.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {selectedLevel === level.id && (
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'var(--color-primary)'
                      }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Name input screen */}
        {screen.isNameInput && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light))',
              margin: '0 auto var(--space-5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48
            }}>
              👋
            </div>

            <h2 style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: '0 0 var(--space-2)',
            }}>
              {screen.title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-english)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-secondary)',
              margin: '0 0 var(--space-5)'
            }}>
              {screen.titleEn}
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
              style={{
                width: '100%',
                padding: '16px 20px',
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-primary)',
                background: 'white',
                border: `2px solid ${nameFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
              }}
            />
            <p style={{
              fontFamily: 'var(--font-english)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-text-tertiary)',
              margin: 'var(--space-2) 0 0',
              textAlign: 'left'
            }}>
              This helps us personalize your experience
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-4)',
      }}>
        <PageDots current={currentStep} total={totalSteps} />

        {currentStep === 0 ? (
          <PrimaryButton onClick={handleNext}>
            ចាប់ផ្តើម 🚀
          </PrimaryButton>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {currentStep > 0 && (
              <SecondaryButton onClick={() => setCurrentStep(prev => prev - 1)}>
                ថយក្រោយ
              </SecondaryButton>
            )}
            <div style={{ flex: 2 }}>
              <PrimaryButton onClick={handleNext} disabled={!canProceed() || saving}>
                {saving ? 'កំពុងរក្សាទុក...' : isLastStep ? 'ចាប់ផ្តើមរៀន 🎉' : 'បន្ទាប់'}
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Onboarding
