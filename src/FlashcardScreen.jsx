import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useVocabulary, useVocabularyProgress, useRecordFlashcardReview } from './hooks/useVocabulary'
import { useLesson, useUpdateLessonProgress } from './hooks/useLessons'
import { useAuth } from './contexts/AuthContext'
import { SM2 } from './services/spaced-repetition'

// ============================================
// VOCABULARY FLASHCARD SCREEN
// A calm, focused, rewarding study experience
// ============================================

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="screen screen-fullscreen" style={{
    background: 'var(--color-background)',
    display: 'flex',
    flexDirection: 'column',
  }}>
    <div style={{
      padding: 'var(--space-4)',
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border-light)',
    }}>
      <div style={{
        height: 6,
        background: 'var(--color-border-light)',
        borderRadius: 'var(--radius-full)',
      }} />
    </div>
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)',
    }}>
      <div style={{
        width: '100%',
        height: 380,
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-xl)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }} />
    </div>
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </div>
)

// Confetti Particle Component
const ConfettiParticle = ({ style }) => (
  <div
    style={{
      position: 'absolute',
      width: 8,
      height: 8,
      borderRadius: '50%',
      ...style,
    }}
    className="confetti-particle"
  />
)

// Success Celebration Component
const SuccessCelebration = ({ show }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    background: ['#FFD700', '#4A9B5C', '#E8913A', '#1A6B6B', '#FF6B6B'][Math.floor(Math.random() * 5)],
    delay: `${Math.random() * 0.3}s`,
    duration: `${0.8 + Math.random() * 0.4}s`,
  }))

  if (!show) return null

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 100,
    }}>
      {particles.map(p => (
        <ConfettiParticle
          key={p.id}
          style={{
            left: p.left,
            top: '50%',
            background: p.background,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

// Back Button
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
    }}
    className="icon-btn"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
)

// Progress Header
const ProgressHeader = ({ current, total, lessonName, onBack }) => {
  const progress = (current / total) * 100

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-4)',
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border-light)',
    }}>
      <BackButton onClick={onBack} />

      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}>
          <span style={{
            fontFamily: 'var(--font-khmer)',
            fontSize: 'var(--text-caption)',
            color: 'var(--color-text-secondary)',
          }}>
            {lessonName}
          </span>
          <span style={{
            fontFamily: 'var(--font-english)',
            fontSize: 'var(--text-caption)',
            fontWeight: 700,
            color: 'var(--color-primary)',
          }}>
            {current}/{total}
          </span>
        </div>
        <div style={{
          height: 6,
          background: 'var(--color-border-light)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-warning) 100%)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.5s ease-out',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Audio Play Button
const AudioButton = ({ size = 'large', onClick, isPlaying }) => {
  const sizes = {
    small: { button: 44, icon: 20 },
    large: { button: 72, icon: 32 },
  }
  const s = sizes[size]

  return (
    <button
      onClick={onClick}
      style={{
        width: s.button,
        height: s.button,
        borderRadius: 'var(--radius-full)',
        background: isPlaying
          ? 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)'
          : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: isPlaying
          ? '0 4px 16px rgba(26, 107, 107, 0.4)'
          : 'var(--shadow-glow-primary)',
        transition: 'all var(--transition-fast)',
      }}
      className="audio-btn"
    >
      {isPlaying ? (
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="white">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )
}

// Flashcard Component
const Flashcard = ({ word, isFlipped, onFlip }) => (
  <div
    onClick={!isFlipped ? onFlip : undefined}
    style={{
      perspective: 1000,
      width: '100%',
      height: 380,
      cursor: !isFlipped ? 'pointer' : 'default',
    }}
  >
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Card Front */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border-light)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-6)',
        }}
      >
        {/* Sound wave decoration */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          opacity: 0.1,
          fontSize: '4rem',
        }}>
          🔊
        </div>

        <p style={{
          fontFamily: 'var(--font-english)',
          fontSize: '3rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
          textAlign: 'center',
        }}>
          {word.english}
        </p>

        <p style={{
          fontFamily: 'var(--font-english)',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--space-5)',
        }}>
          {word.ipa}
        </p>

        <AudioButton
          size="large"
          onClick={(e) => {
            e.stopPropagation()
            // TODO: Play English audio
          }}
        />

        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-tertiary)',
          marginTop: 'var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 15l6 6m-6-6v4.8m0-4.8h4.8" />
            <path d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
            <path d="M15 4.2V9m0 0h4.8M15 9l6-6" />
            <path d="M9 4.2V9m0 0H4.2M9 9L3 3" />
          </svg>
          ចុចដើម្បីបើក
        </p>
      </div>

      {/* Card Back */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, var(--color-secondary-light) 0%, #D4ECEC 100%)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--color-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'var(--space-5)',
          overflow: 'hidden',
        }}
      >
        {/* Illustration */}
        <div style={{
          fontSize: '3rem',
          marginBottom: 'var(--space-3)',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        }}>
          {word.emoji || '📝'}
        </div>

        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--color-secondary-dark)',
          marginBottom: 'var(--space-1)',
          textAlign: 'center',
          lineHeight: 'var(--leading-khmer)',
        }}>
          {word.khmer}
        </p>

        <p style={{
          fontFamily: 'var(--font-english)',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          fontStyle: 'italic',
          marginBottom: 'var(--space-4)',
        }}>
          {word.phonetic}
        </p>

        <AudioButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            // TODO: Play Khmer audio
          }}
        />

        {/* Example Sentence */}
        {(word.example_en || word.example_kh) && (
          <div style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-4)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 'var(--radius-md)',
            width: '100%',
          }}>
            {word.example_en && (
              <p style={{
                fontFamily: 'var(--font-english)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-secondary)',
                marginBottom: word.example_kh ? 6 : 0,
              }}>
                "{word.example_en}"
              </p>
            )}
            {word.example_kh && (
              <p style={{
                fontFamily: 'var(--font-khmer)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-secondary-dark)',
                lineHeight: 'var(--leading-khmer)',
              }}>
                "{word.example_kh}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
)

// Rating Button
const RatingButton = ({ emoji, label, variant, onClick, disabled, nextReview }) => {
  const variants = {
    hard: {
      background: 'var(--color-error-light)',
      border: 'var(--color-error)',
      color: 'var(--color-error-dark)',
      shadow: 'rgba(212, 97, 75, 0.3)',
    },
    okay: {
      background: 'var(--color-warning-light)',
      border: 'var(--color-warning)',
      color: '#8B6914',
      shadow: 'rgba(230, 168, 23, 0.3)',
    },
    easy: {
      background: 'var(--color-success-light)',
      border: 'var(--color-success)',
      color: 'var(--color-success-dark)',
      shadow: 'rgba(74, 155, 92, 0.3)',
    },
  }
  const v = variants[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: 'var(--space-3)',
        background: v.background,
        border: `2px solid ${v.border}`,
        borderRadius: 'var(--radius-lg)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--transition-fast)',
        opacity: disabled ? 0.5 : 1,
      }}
      className={!disabled ? 'rating-btn' : ''}
    >
      <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
      <span style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-caption)',
        fontWeight: 600,
        color: v.color,
      }}>
        {label}
      </span>
      {nextReview && (
        <span style={{
          fontFamily: 'var(--font-english)',
          fontSize: '10px',
          color: v.color,
          opacity: 0.8,
        }}>
          {nextReview}
        </span>
      )}
    </button>
  )
}

// Rating Section
const RatingSection = ({ show, onRate, disabled, currentProgress }) => {
  // Calculate what the next review intervals would be
  const getNextReviewLabel = (rating) => {
    const result = SM2.calculateNextReview(rating, currentProgress)
    const days = result.interval_days
    if (days === 1) return '1 day'
    if (days < 7) return `${days} days`
    if (days < 30) return `${Math.round(days / 7)} week${Math.round(days / 7) > 1 ? 's' : ''}`
    return `${Math.round(days / 30)} month${Math.round(days / 30) > 1 ? 's' : ''}`
  }

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.4s ease-out',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        textAlign: 'center',
        marginBottom: 'var(--space-3)',
      }}>
        តើអ្នកចាំបានទេ?
      </p>

      <div style={{
        display: 'flex',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-2)',
      }}>
        <RatingButton
          emoji="😫"
          label="ពិបាក"
          variant="hard"
          onClick={() => onRate('hard')}
          disabled={disabled}
          nextReview={getNextReviewLabel('hard')}
        />
        <RatingButton
          emoji="🤔"
          label="ល្អ"
          variant="okay"
          onClick={() => onRate('okay')}
          disabled={disabled}
          nextReview={getNextReviewLabel('okay')}
        />
        <RatingButton
          emoji="😊"
          label="ងាយ"
          variant="easy"
          onClick={() => onRate('easy')}
          disabled={disabled}
          nextReview={getNextReviewLabel('easy')}
        />
      </div>

      <p style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-tertiary)',
        textAlign: 'center',
      }}>
        ជួយយើងកំណត់ពេលពិនិត្យបន្ទាប់
      </p>
    </div>
  )
}

// Speed Control Button
const SpeedButton = ({ speed, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 12px',
      borderRadius: 'var(--radius-full)',
      background: isActive ? 'var(--color-primary)' : 'transparent',
      border: isActive ? 'none' : '1px solid var(--color-border)',
      fontFamily: 'var(--font-english)',
      fontSize: 'var(--text-small)',
      fontWeight: 600,
      color: isActive ? 'white' : 'var(--color-text-secondary)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
    }}
  >
    {speed}x
  </button>
)

// Bottom Controls
const BottomControls = ({ onReplay, onSkip, speed, onSpeedChange }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-4)',
    background: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border-light)',
  }}>
    {/* Replay Button */}
    <button
      onClick={onReplay}
      style={{
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
      className="icon-btn"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    </button>

    {/* Speed Controls */}
    <div style={{
      display: 'flex',
      gap: 'var(--space-2)',
      background: 'var(--color-background)',
      padding: 4,
      borderRadius: 'var(--radius-full)',
    }}>
      {[0.5, 0.75, 1].map(s => (
        <SpeedButton
          key={s}
          speed={s}
          isActive={speed === s}
          onClick={() => onSpeedChange(s)}
        />
      ))}
    </div>

    {/* Skip Button */}
    <button
      onClick={onSkip}
      style={{
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
      className="icon-btn"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  </div>
)

// Success Message Component
const SuccessMessage = ({ rating, show }) => {
  const messages = {
    hard: { emoji: '💪', text: 'កុំបារម្ភ! យើងនឹងពិនិត្យឆាប់ៗ' },
    okay: { emoji: '👍', text: 'ល្អណាស់! បន្តទៀត!' },
    easy: { emoji: '🌟', text: 'អស្ចារ្យ! អ្នកចាំបានល្អ!' },
  }
  const m = messages[rating] || messages.okay

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 251, 245, 0.95)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        zIndex: 50,
      }}
    >
      <span style={{
        fontSize: '4rem',
        marginBottom: 'var(--space-4)',
        animation: show ? 'bounce 0.5s ease' : 'none',
      }}>
        {m.emoji}
      </span>
      <p style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-h3)',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        textAlign: 'center',
      }}>
        {m.text}
      </p>
    </div>
  )
}

// Completion Screen Component
const CompletionScreen = ({ wordsStudied, onBack, onContinue }) => (
  <div className="screen screen-fullscreen" style={{
    background: 'var(--color-background)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-6)',
    textAlign: 'center',
  }}>
    <div style={{
      fontSize: '5rem',
      marginBottom: 'var(--space-4)',
    }}>
      🎉
    </div>
    <h1 style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-h2)',
      fontWeight: 700,
      color: 'var(--color-text-primary)',
      marginBottom: 'var(--space-2)',
    }}>
      អស្ចារ្យ!
    </h1>
    <p style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--space-6)',
    }}>
      អ្នកបានរៀន {wordsStudied} ពាក្យ
    </p>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      width: '100%',
      maxWidth: 300,
    }}>
      <button
        onClick={onContinue}
        style={{
          padding: 'var(--space-4)',
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-body)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        ធ្វើកម្រងសំណួរ
      </button>
      <button
        onClick={onBack}
        style={{
          padding: 'var(--space-4)',
          background: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-body)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        ត្រឡប់ទៅមេរៀន
      </button>
    </div>
  </div>
)

// Main Flashcard Screen Component
function FlashcardScreen() {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const { user } = useAuth()

  // Fetch lesson and vocabulary data
  const { data: lesson, isLoading: lessonLoading } = useLesson(lessonId)
  const { data: vocabulary, isLoading: vocabLoading } = useVocabulary(lessonId)
  const { data: vocabProgress } = useVocabularyProgress(lessonId)

  // Mutations
  const recordReview = useRecordFlashcardReview()
  const updateLessonProgress = useUpdateLessonProgress()

  // Local state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastRating, setLastRating] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isRatingDisabled, setIsRatingDisabled] = useState(false)
  const [wordsStudied, setWordsStudied] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Build progress map by vocabulary ID
  const progressMap = useMemo(() => {
    if (!vocabProgress) return {}
    return vocabProgress.reduce((acc, p) => {
      acc[p.vocabulary_id] = p
      return acc
    }, {})
  }, [vocabProgress])

  const isLoading = lessonLoading || vocabLoading
  const totalCards = vocabulary?.length || 0
  const currentWord = vocabulary?.[currentIndex]
  const currentProgress = currentWord ? progressMap[currentWord.id] : null

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true)
    }
  }

  const handleRate = async (rating) => {
    if (!currentWord || !user) return

    setIsRatingDisabled(true)
    setLastRating(rating)
    setShowSuccess(true)

    if (rating === 'easy') {
      setShowCelebration(true)
    }

    // Record the review with spaced repetition
    try {
      await recordReview.mutateAsync({
        vocabularyId: currentWord.id,
        lessonId: lessonId,
        rating: rating
      })
      setWordsStudied(prev => prev + 1)
    } catch (error) {
      console.error('Failed to record review:', error)
    }

    setTimeout(() => {
      setShowSuccess(false)
      setShowCelebration(false)
      setIsFlipped(false)
      setIsRatingDisabled(false)

      // Move to next card or complete
      if (currentIndex + 1 >= totalCards) {
        // Update lesson progress
        updateLessonProgress.mutate({
          lessonId,
          wordsLearned: wordsStudied + 1,
          totalWords: totalCards
        })
        setIsComplete(true)
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, 1200)
  }

  const handleSkip = () => {
    setIsFlipped(false)
    if (currentIndex + 1 >= totalCards) {
      // Update lesson progress with current words studied
      if (wordsStudied > 0) {
        updateLessonProgress.mutate({
          lessonId,
          wordsLearned: wordsStudied,
          totalWords: totalCards
        })
      }
      setIsComplete(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleReplay = () => {
    // TODO: Implement audio replay at current speed
    console.log('Replay audio at speed:', speed)
  }

  const handleBack = () => {
    navigate(`/lesson/${lessonId}`)
  }

  const handleContinueToQuiz = () => {
    navigate(`/quiz/${lessonId}`)
  }

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // No vocabulary found
  if (!vocabulary || vocabulary.length === 0) {
    return (
      <div className="screen screen-fullscreen" style={{
        background: 'var(--color-background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>📚</div>
        <h2 style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-h3)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
        }}>
          មិនមានពាក្យនៅទេ
        </h2>
        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
        }}>
          មេរៀននេះមិនមានពាក្យទេ
        </p>
        <button
          onClick={handleBack}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-khmer)',
            cursor: 'pointer',
          }}
        >
          ត្រឡប់ក្រោយ
        </button>
      </div>
    )
  }

  // Completion screen
  if (isComplete) {
    return (
      <CompletionScreen
        wordsStudied={wordsStudied}
        onBack={handleBack}
        onContinue={handleContinueToQuiz}
      />
    )
  }

  return (
    <div className="screen screen-fullscreen" style={{
      background: 'var(--color-background)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* CSS for animations */}
      <style>{`
        .icon-btn:hover {
          transform: scale(1.1);
          background: var(--color-primary-light);
        }

        .icon-btn:active {
          transform: scale(0.95);
        }

        .audio-btn:hover {
          transform: scale(1.08);
        }

        .audio-btn:active {
          transform: scale(0.95);
        }

        .rating-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px var(--shadow);
        }

        .rating-btn:active {
          transform: translateY(0);
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti-particle {
          animation: confetti-fall 1s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-container {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>

      {/* Success Celebration */}
      <SuccessCelebration show={showCelebration} />

      {/* Success Message Overlay */}
      <SuccessMessage rating={lastRating} show={showSuccess} />

      {/* Header */}
      <ProgressHeader
        current={currentIndex + 1}
        total={totalCards}
        lessonName={lesson?.title_khmer || 'មេរៀន'}
        onBack={handleBack}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-4)',
        paddingBottom: 0,
        overflow: 'hidden',
      }}>
        {/* Flashcard */}
        <div
          className="card-container"
          key={currentIndex}
          style={{ marginBottom: 'var(--space-4)' }}
        >
          <Flashcard
            word={currentWord}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>

        {/* Rating Section */}
        <RatingSection
          show={isFlipped}
          onRate={handleRate}
          disabled={isRatingDisabled}
          currentProgress={currentProgress}
        />
      </div>

      {/* Bottom Controls */}
      <BottomControls
        onReplay={handleReplay}
        onSkip={handleSkip}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Success celebration */}
      <SuccessCelebration show={showSuccess} />
    </div>
  )
}

export default FlashcardScreen
