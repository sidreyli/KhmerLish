import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useDueReviewsCount, useLearnedWordsCount } from './hooks/useVocabulary'
import { useContinueLearning, useOverallStats } from './hooks/useProgress'

// Time-aware greeting function
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return { khmer: 'អរុណសួស្តី', english: 'Good morning', period: 'morning' }
  } else if (hour >= 12 && hour < 17) {
    return { khmer: 'ទិវាសួស្តី', english: 'Good afternoon', period: 'afternoon' }
  } else if (hour >= 17 && hour < 21) {
    return { khmer: 'សាយ័ណសួស្តី', english: 'Good evening', period: 'evening' }
  } else {
    return { khmer: 'រាត្រីសួស្តី', english: 'Good night', period: 'night' }
  }
}

// Calculate level from XP
const calculateLevel = (xp) => {
  // Each level requires progressively more XP
  // Level 1: 0-100, Level 2: 100-250, Level 3: 250-500, etc.
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]
  let level = 1
  let progress = 0

  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i + 1
    } else {
      const prevThreshold = thresholds[i - 1]
      const nextThreshold = thresholds[i]
      progress = ((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100
      break
    }
  }

  return { level, progress: Math.round(progress) }
}

// Animated Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 10 }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 300)
    return () => clearTimeout(timer)
  }, [progress])

  const center = size / 2

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--color-border-light)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: 'stroke-dashoffset 1s ease-out',
        }}
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-warning)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Fire Streak Badge with Glow
const StreakBadge = ({ count }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 12px',
    background: 'linear-gradient(135deg, #FFF4E6 0%, #FFECD2 100%)',
    borderRadius: 'var(--radius-full)',
    boxShadow: '0 2px 8px rgba(232, 145, 58, 0.2)',
  }}>
    <span style={{
      fontSize: '1.1rem',
      filter: 'drop-shadow(0 0 4px rgba(255, 120, 50, 0.6))',
      animation: count > 0 ? 'fireGlow 1.5s ease-in-out infinite alternate' : 'none',
    }}>
      🔥
    </span>
    <span style={{
      fontFamily: 'var(--font-english)',
      fontWeight: 700,
      fontSize: 'var(--text-caption)',
      color: 'var(--color-primary-dark)',
    }}>
      {count}
    </span>
  </div>
)

// XP Level Indicator
const XPIndicator = ({ level, progress }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }}>
    <div style={{
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-full)',
      background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(26, 107, 107, 0.3)',
    }}>
      <span style={{
        color: 'white',
        fontFamily: 'var(--font-english)',
        fontWeight: 700,
        fontSize: '0.7rem',
      }}>
        {level}
      </span>
    </div>
    <div style={{ flex: 1, maxWidth: 60 }}>
      <div style={{
        height: 4,
        background: 'var(--color-border-light)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--color-secondary)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.5s ease-out',
        }} />
      </div>
    </div>
  </div>
)

// Profile Avatar
const ProfileAvatar = ({ name, onClick }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <div
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-full)',
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, #FFE4C9 100%)',
        border: '2px solid var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
      }}
      className="avatar-hover"
    >
      <span style={{
        fontFamily: 'var(--font-khmer)',
        fontWeight: 600,
        fontSize: '1rem',
        color: 'var(--color-primary-dark)',
      }}>
        {initial}
      </span>
    </div>
  )
}

// Card Container Component
const Card = ({ children, variant = 'default', onClick, style = {} }) => {
  const variants = {
    default: {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-light)',
    },
    hero: {
      background: 'linear-gradient(135deg, var(--color-primary-light) 0%, #FFEDD5 100%)',
      border: '1px solid rgba(232, 145, 58, 0.2)',
    },
    alert: {
      background: 'linear-gradient(135deg, #FEF7E6 0%, #FFF4E6 100%)',
      border: '1px solid rgba(230, 168, 23, 0.3)',
    },
    success: {
      background: 'linear-gradient(135deg, var(--color-success-light) 0%, #D4EDDA 100%)',
      border: '1px solid rgba(74, 155, 92, 0.2)',
    },
  }

  return (
    <div
      onClick={onClick}
      style={{
        ...variants[variant],
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-md)',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      className={onClick ? 'card-interactive' : ''}
    >
      {children}
    </div>
  )
}

// Button Component
const Button = ({ children, variant = 'primary', fullWidth = false, onClick }) => {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
      color: 'white',
      boxShadow: 'var(--shadow-glow-primary)',
    },
    secondary: {
      background: 'var(--color-surface)',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-secondary)',
    },
  }

  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant],
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 600,
        padding: '12px 24px',
        borderRadius: 'var(--radius-md)',
        border: variants[variant].border || 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: fullWidth ? '100%' : 'auto',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
      }}
      className="btn-hover"
    >
      {children}
    </button>
  )
}

// Arrow Icon
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// Quick Stat Card
const StatCard = ({ emoji, value, label, isLoading }) => (
  <div style={{
    flex: 1,
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-4)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border-light)',
    transition: 'transform var(--transition-fast)',
  }}
  className="stat-card-hover"
  >
    <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{emoji}</div>
    <div style={{
      fontFamily: 'var(--font-english)',
      fontWeight: 700,
      fontSize: 'var(--text-body)',
      color: 'var(--color-text-primary)',
    }}>
      {isLoading ? '-' : value}
    </div>
    <div style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-small)',
      color: 'var(--color-text-tertiary)',
    }}>
      {label}
    </div>
  </div>
)

// Lesson Thumbnail
const LessonThumbnail = ({ emoji = '📚' }) => (
  <div style={{
    width: 56,
    height: 56,
    borderRadius: 'var(--radius-md)',
    background: 'linear-gradient(135deg, var(--color-secondary-light) 0%, #D0ECEC 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  }}>
    {emoji}
  </div>
)

// Loading skeleton
const Skeleton = ({ width, height, style = {} }) => (
  <div
    className="skeleton"
    style={{
      width,
      height,
      borderRadius: 'var(--radius-sm)',
      ...style
    }}
  />
)

// Main Home Screen Component
function HomeScreen() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const greeting = getGreeting()

  // Fetch real data
  const { data: dueReviewsCount = 0, isLoading: reviewsLoading } = useDueReviewsCount()
  const { data: wordsLearned = 0, isLoading: wordsLoading } = useLearnedWordsCount()
  const { data: continueLearning, isLoading: continueLoading } = useContinueLearning()
  const { data: overallStats, isLoading: statsLoading } = useOverallStats()

  // Calculate level from XP
  const xp = profile?.xp || 0
  const streak = profile?.current_streak || 0
  const { level, progress: levelProgress } = calculateLevel(xp)

  // Get display name
  const displayName = profile?.display_name || 'Friend'

  // Daily goal (from settings, default 10)
  const dailyGoal = 10
  const dailyProgress = Math.min(100, ((overallStats?.dueReviews || 0) > 0 ? 50 : 100))

  const hasReviews = dueReviewsCount > 0

  return (
    <div className="screen">
      <style>{`
        @keyframes fireGlow {
          0% { filter: drop-shadow(0 0 4px rgba(255, 120, 50, 0.4)); }
          100% { filter: drop-shadow(0 0 8px rgba(255, 120, 50, 0.8)); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes celebrate {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        .card-interactive:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg) !important;
        }

        .card-interactive:active {
          transform: translateY(0);
        }

        .btn-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(232, 145, 58, 0.4) !important;
        }

        .btn-hover:active {
          transform: translateY(0);
        }

        .avatar-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(232, 145, 58, 0.3);
        }

        .stat-card-hover:hover {
          transform: translateY(-2px);
        }

        .animate-in {
          animation: slideUp 0.5s ease-out forwards;
        }

        .celebration-emoji {
          animation: celebrate 0.5s ease-in-out infinite;
          display: inline-block;
        }

        .skeleton {
          background: linear-gradient(90deg, var(--color-border-light) 25%, var(--color-border) 50%, var(--color-border-light) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="screen-content">
        {/* Header Section */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--space-5)',
          animation: 'slideUp 0.4s ease-out',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--leading-khmer)',
              marginBottom: 4,
            }}>
              {greeting.khmer}, {displayName}!
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <StreakBadge count={streak} />
              <XPIndicator level={level} progress={levelProgress} />
            </div>
          </div>
          <ProfileAvatar
            name={displayName}
            onClick={() => navigate('/profile')}
          />
        </header>

        {/* Daily Goal Card (Hero) */}
        <Card
          variant="hero"
          onClick={() => navigate('/lessons')}
          style={{
            marginBottom: 'var(--space-4)',
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-5)',
          }}>
            <div style={{ position: 'relative' }}>
              <ProgressRing progress={dailyProgress} size={100} strokeWidth={8} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-english)',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: 'var(--color-primary-dark)',
                  lineHeight: 1,
                }}>
                  {Math.round(dailyProgress)}%
                </div>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-secondary)',
                marginBottom: 4,
              }}>
                គោលដៅថ្ងៃនេះ
              </p>
              <p style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-h3)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-3)',
              }}>
                {wordsLoading ? '-' : wordsLearned} ពាក្យបានរៀន
              </p>
              <Button variant="primary" onClick={(e) => { e.stopPropagation(); navigate('/lessons'); }}>
                រៀនបន្ថែម
                <ArrowIcon />
              </Button>
            </div>
          </div>
        </Card>

        {/* Review Due Card */}
        <Card
          variant={hasReviews ? 'alert' : 'success'}
          onClick={() => navigate('/practice')}
          style={{
            marginBottom: 'var(--space-4)',
            animation: 'slideUp 0.55s ease-out',
          }}
        >
          {reviewsLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Skeleton width={40} height={40} style={{ borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
                <Skeleton width="40%" height={14} />
              </div>
            </div>
          ) : hasReviews ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}>
                <span style={{ fontSize: '1.5rem' }}>📚</span>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-khmer)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}>
                    {dueReviewsCount} ពាក្យត្រូវពិនិត្យ
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-khmer)',
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-text-tertiary)',
                  }}>
                    សម្រាប់រក្សាអង្គចងចាំ
                  </p>
                </div>
              </div>
              <Button variant="secondary" onClick={(e) => { e.stopPropagation(); navigate('/practice'); }}>
                ពិនិត្យឥឡូវ
              </Button>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2)',
            }}>
              <span style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-h3)',
                fontWeight: 600,
                color: 'var(--color-success-dark)',
              }}>
                គ្មានពាក្យត្រូវពិនិត្យ!
              </span>
              <span className="celebration-emoji" style={{ fontSize: '1.5rem' }}>🎉</span>
            </div>
          )}
        </Card>

        {/* Continue Learning Card */}
        {continueLoading ? (
          <Card style={{ marginBottom: 'var(--space-4)', animation: 'slideUp 0.6s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <Skeleton width={56} height={56} style={{ borderRadius: 'var(--radius-md)' }} />
              <div style={{ flex: 1 }}>
                <Skeleton width="30%" height={14} style={{ marginBottom: 8 }} />
                <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
                <Skeleton width="100%" height={6} />
              </div>
            </div>
          </Card>
        ) : continueLearning ? (
          <Card
            onClick={() => navigate(`/lessons/${continueLearning.lesson_id}`)}
            style={{
              marginBottom: 'var(--space-4)',
              animation: 'slideUp 0.6s ease-out',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}>
              <LessonThumbnail emoji={continueLearning.lesson?.icon_emoji || '📚'} />
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-khmer)',
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: 2,
                }}>
                  បន្តរៀន
                </p>
                <p style={{
                  fontFamily: 'var(--font-khmer)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}>
                  មេរៀន: {continueLearning.lesson?.title_khmer || 'Loading...'}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}>
                  <div style={{
                    flex: 1,
                    height: 6,
                    background: 'var(--color-border-light)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${continueLearning.progress_percent || 0}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s ease-out',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-english)',
                    fontSize: 'var(--text-small)',
                    fontWeight: 600,
                    color: 'var(--color-secondary)',
                  }}>
                    {continueLearning.progress_percent || 0}%
                  </span>
                </div>
              </div>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}>
                <ArrowIcon />
              </div>
            </div>
          </Card>
        ) : (
          <Card
            onClick={() => navigate('/lessons')}
            style={{
              marginBottom: 'var(--space-4)',
              animation: 'slideUp 0.6s ease-out',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}>
              <LessonThumbnail emoji="🚀" />
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-khmer)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: 4,
                }}>
                  ចាប់ផ្តើមមេរៀនដំបូង!
                </p>
                <p style={{
                  fontFamily: 'var(--font-khmer)',
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-tertiary)',
                }}>
                  រៀនពាក្យអង់គ្លេសថ្មីៗ
                </p>
              </div>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}>
                <ArrowIcon />
              </div>
            </div>
          </Card>
        )}

        {/* Quick Stats Row */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          animation: 'slideUp 0.65s ease-out',
        }}>
          <StatCard
            emoji="📖"
            value={wordsLearned}
            label="ពាក្យ"
            isLoading={wordsLoading}
          />
          <StatCard
            emoji="🔥"
            value={`${streak} ថ្ងៃ`}
            label="ជាប់គ្នា"
            isLoading={false}
          />
          <StatCard
            emoji="⭐"
            value={xp.toLocaleString()}
            label="XP"
            isLoading={false}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
