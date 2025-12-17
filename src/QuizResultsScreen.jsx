import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// ============================================
// QUIZ RESULTS SCREEN
// Shows results from completed quiz
// ============================================

// Confetti Particle Component
function ConfettiParticle({ delay, x, color }) {
  const style = {
    position: 'absolute',
    left: `${x}%`,
    top: '-20px',
    width: '10px',
    height: '10px',
    backgroundColor: color,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    animation: `confettiFall 3s ease-out ${delay}s forwards`,
    transform: `rotate(${Math.random() * 360}deg)`,
    opacity: 0,
  }
  return <div style={style} />
}

// Animated Score Circle
function ScoreCircle({ score, passed }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [fillProgress, setFillProgress] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.round(current))
      }
    }, duration / steps)

    setTimeout(() => {
      setFillProgress(score)
    }, 300)

    return () => clearInterval(timer)
  }, [score])

  const size = 180
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const fillAmount = (fillProgress / 100) * circumference
  const center = size / 2

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={passed ? '#4CAF50' : '#FF9800'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - fillAmount}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-english)',
          fontSize: '48px',
          fontWeight: '800',
          color: '#fff',
          lineHeight: 1,
        }}>
          {animatedScore}%
        </div>
      </div>
    </div>
  )
}

// Animated Star
function AnimatedStar({ lit, delay }) {
  const [visible, setVisible] = useState(false)
  const [bounced, setBounced] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), delay)
    const timer2 = setTimeout(() => setBounced(true), delay + 300)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [delay])

  return (
    <div style={{
      fontSize: '48px',
      opacity: visible ? 1 : 0,
      transform: visible
        ? bounced
          ? 'scale(1) translateY(0)'
          : 'scale(1.5) translateY(-20px)'
        : 'scale(0)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      filter: lit ? 'drop-shadow(0 0 10px #FFD700)' : 'grayscale(1) opacity(0.5)',
      margin: '0 8px',
    }}>
      {lit ? '⭐' : '☆'}
    </div>
  )
}

// XP Display Component
function XPDisplay({ xpEarned, currentXP, profile }) {
  const [showXP, setShowXP] = useState(false)
  const [animatedXP, setAnimatedXP] = useState(currentXP - xpEarned)

  // Calculate level based on XP (simple formula: 100 XP per level)
  const level = Math.floor((profile?.xp || 0) / 100) + 1
  const xpInLevel = (profile?.xp || 0) % 100
  const nextLevelXP = 100

  useEffect(() => {
    setTimeout(() => setShowXP(true), 800)
    setTimeout(() => {
      setAnimatedXP(profile?.xp || currentXP)
    }, 1000)
  }, [profile?.xp, currentXP])

  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '24px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-english)',
          fontSize: '32px',
          fontWeight: '800',
          color: '#FFD700',
          opacity: showXP ? 1 : 0,
          transform: showXP ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.5s ease-out',
        }}>
          +{xpEarned} XP
        </span>
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-english)',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '6px',
        }}>
          <span>Level {level}</span>
          <span>{xpInLevel}/{nextLevelXP} XP</span>
        </div>
        <div style={{
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${(xpInLevel / nextLevelXP) * 100}%`,
            background: 'linear-gradient(90deg, #E8913A, #FFD700)',
            borderRadius: '4px',
            transition: 'width 1s ease-out',
          }} />
        </div>
      </div>
    </div>
  )
}

// Stats Card
function StatCard({ icon, value, label }) {
  return (
    <div style={{
      flex: 1,
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '16px 8px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-english)',
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',
        marginTop: '2px',
      }}>
        {label}
      </div>
    </div>
  )
}

// Format time from seconds
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Action Button
function ActionButton({ children, variant = 'primary', onClick }) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #E8913A 0%, #D4791F 100%)',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(232, 145, 58, 0.4)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.9)',
      color: '#1A6B6B',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    tertiary: {
      background: 'transparent',
      color: 'rgba(255,255,255,0.8)',
      border: '1px solid rgba(255,255,255,0.3)',
    },
  }

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: variant === 'tertiary' ? '12px 24px' : '16px 24px',
        borderRadius: '14px',
        border: 'none',
        fontFamily: 'var(--font-khmer)',
        fontSize: variant === 'primary' ? '16px' : '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginBottom: '12px',
        ...variants[variant],
      }}
    >
      {children}
    </button>
  )
}

export default function QuizResultsScreen() {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const location = useLocation()
  const { profile } = useAuth()
  const [confettiVisible, setConfettiVisible] = useState(false)

  // Get results from navigation state
  const results = location.state || {}
  const {
    scorePercent = 0,
    correctCount = 0,
    totalQuestions = 0,
    timeTaken = 0,
    xpEarned = 0,
    passed = false,
    lessonTitle = 'មេរៀន'
  } = results

  // Determine stars based on score
  const getStars = (score) => {
    if (score === 100) return 3
    if (score >= 85) return 2
    if (score >= 70) return 1
    return 0
  }

  const starsEarned = getStars(scorePercent)

  // Trigger confetti for passed state
  useEffect(() => {
    if (passed) {
      setTimeout(() => setConfettiVisible(true), 500)
    }
  }, [passed])

  // If no results data, redirect to lessons
  useEffect(() => {
    if (!location.state) {
      navigate('/lessons', { replace: true })
    }
  }, [location.state, navigate])

  // Generate confetti particles
  const confettiColors = ['#FFD700', '#E8913A', '#4CAF50', '#FF6B6B', '#64B5F6', '#BA68C8']
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }))

  return (
    <div className="screen screen-fullscreen" style={{
      background: passed
        ? 'linear-gradient(180deg, #1A6B6B 0%, #0D4F4F 100%)'
        : 'linear-gradient(180deg, #5D4E6D 0%, #3D3250 100%)',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(800px) rotate(720deg);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Confetti */}
      {confettiVisible && passed && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {confettiParticles.map(p => (
            <ConfettiParticle
              key={p.id}
              x={p.x}
              delay={p.delay}
              color={p.color}
            />
          ))}
        </div>
      )}

      {/* Scrollable Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {/* Header Section */}
        <div style={{
          padding: '60px 24px 24px',
          textAlign: 'center',
        }}>
          {/* Title */}
          <div style={{
            fontFamily: 'var(--font-khmer)',
            fontSize: '28px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '8px',
            animation: passed ? 'float 3s ease-in-out infinite' : 'none',
          }}>
            {passed ? 'អស្ចារ្យ! 🎉' : 'ជិតបានហើយ! 💪'}
          </div>

          <div style={{
            fontFamily: 'var(--font-english)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
          }}>
            {passed ? 'Amazing! You passed!' : 'Almost there! Keep going!'}
          </div>

          {/* Score Circle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '8px',
          }}>
            <ScoreCircle score={scorePercent} passed={passed} />
          </div>

          {/* Correct count */}
          <div style={{
            fontFamily: 'var(--font-khmer)',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '24px',
          }}>
            {correctCount}/{totalQuestions} ត្រឹមត្រូវ
          </div>

          {/* Stars (only for passed) */}
          {passed && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              <AnimatedStar lit={starsEarned >= 1} delay={600} />
              <AnimatedStar lit={starsEarned >= 2} delay={900} />
              <AnimatedStar lit={starsEarned >= 3} delay={1200} />
            </div>
          )}

          {/* Encouraging message for failed */}
          {!passed && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
              }}>
                សាកល្បងម្តងទៀត អ្នកអាចធ្វើបាន!
              </div>
              <div style={{
                fontFamily: 'var(--font-english)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '4px',
              }}>
                Try again, you can do it!
              </div>
            </div>
          )}

          {/* XP Display */}
          <XPDisplay
            xpEarned={xpEarned}
            currentXP={profile?.xp || 0}
            profile={profile}
          />

          {/* Stats Cards */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
          }}>
            <StatCard
              icon="⏱️"
              value={formatTime(timeTaken)}
              label="រយៈពេល"
            />
            <StatCard
              icon="🎯"
              value={`${scorePercent}%`}
              label="ភាពត្រឹមត្រូវ"
            />
            <StatCard
              icon="🔥"
              value={profile?.current_streak || 0}
              label="Streak"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ padding: '0 24px 16px' }}>
          {passed ? (
            <>
              <ActionButton variant="primary" onClick={() => navigate('/lessons')}>
                បន្តមេរៀនបន្ទាប់ →
              </ActionButton>
              <ActionButton variant="tertiary" onClick={() => navigate(`/quiz/${lessonId}`)}>
                🔄 ធ្វើម្តងទៀត
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton variant="primary" onClick={() => navigate(`/flashcard/${lessonId}`)}>
                📚 រៀនម្តងទៀត
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={() => navigate(`/quiz/${lessonId}`)}
              >
                🔄 ធ្វើតេស្តម្តងទៀត
              </ActionButton>
            </>
          )}
        </div>

        {/* Bottom padding */}
        <div style={{ height: '40px' }} />
      </div>
    </div>
  )
}
