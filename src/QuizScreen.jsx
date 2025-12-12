import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// ============================================
// QUIZ SCREEN COMPONENT
// Multiple question types with feedback
// ============================================

// Close Button with Confirmation
const CloseButton = ({ onClose }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 'var(--space-4)',
        }}>
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            width: '100%',
            maxWidth: 300,
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <span style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)', display: 'block' }}>😢</span>
            <h3 style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-h3)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-2)',
            }}>
              បោះបង់តេស្ត?
            </h3>
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-4)',
            }}>
              វឌ្ឍនភាពរបស់អ្នកនឹងត្រូវបាត់បង់
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--color-border-light)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-khmer)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
              >
                បន្តតេស្ត
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--color-error)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-khmer)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                បោះបង់
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Quiz Header
const QuizHeader = ({ current, total, timer, onClose }) => {
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
      <CloseButton onClose={onClose} />
      
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}>
          <span style={{
            fontFamily: 'var(--font-english)',
            fontSize: 'var(--text-caption)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
          }}>
            {current}/{total}
          </span>
          {timer && (
            <span style={{
              fontFamily: 'var(--font-english)',
              fontSize: 'var(--text-caption)',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {timer}
            </span>
          )}
        </div>
        <div style={{
          height: 6,
          background: 'var(--color-border-light)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.5s ease-out',
          }} />
        </div>
      </div>
    </div>
  )
}

// Hint Button
const HintButton = ({ hint, isRevealed, onReveal }) => (
  <button
    onClick={onReveal}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      background: isRevealed ? 'var(--color-primary-light)' : 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-small)',
      color: 'var(--color-text-secondary)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
    {isRevealed ? hint : 'ជំនួយ'}
  </button>
)

// Answer Option Card
const AnswerOption = ({ 
  label, 
  text, 
  isSelected, 
  isCorrect, 
  isWrong,
  showResult,
  onClick,
  disabled 
}) => {
  let background = 'var(--color-surface)'
  let border = '2px solid var(--color-border)'
  let labelBg = 'var(--color-border-light)'
  let labelColor = 'var(--color-text-secondary)'

  if (isSelected && !showResult) {
    background = 'var(--color-primary-light)'
    border = '2px solid var(--color-primary)'
    labelBg = 'var(--color-primary)'
    labelColor = 'white'
  }

  if (showResult && isCorrect) {
    background = 'var(--color-success-light)'
    border = '2px solid var(--color-success)'
    labelBg = 'var(--color-success)'
    labelColor = 'white'
  }

  if (showResult && isWrong) {
    background = 'var(--color-error-light)'
    border = '2px solid var(--color-error)'
    labelBg = 'var(--color-error)'
    labelColor = 'white'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
        background,
        border,
        borderRadius: 'var(--radius-lg)',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all var(--transition-fast)',
        textAlign: 'left',
      }}
      className={!disabled && !showResult ? 'answer-option' : (showResult && isWrong ? 'shake' : '')}
    >
      <span style={{
        width: 32,
        height: 32,
        borderRadius: 'var(--radius-sm)',
        background: labelBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-english)',
        fontSize: 'var(--text-caption)',
        fontWeight: 700,
        color: labelColor,
        flexShrink: 0,
      }}>
        {showResult && isCorrect ? '✓' : showResult && isWrong ? '✗' : label}
      </span>
      <span style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--leading-khmer)',
        flex: 1,
      }}>
        {text}
      </span>
    </button>
  )
}

// Audio Player Button
const AudioPlayer = ({ isPlaying, onPlay, replaysLeft, totalReplays }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-5)',
    background: 'linear-gradient(135deg, var(--color-secondary-light) 0%, #D4ECEC 100%)',
    borderRadius: 'var(--radius-xl)',
    marginBottom: 'var(--space-4)',
  }}>
    {/* Waveform visualization */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      height: 40,
      marginBottom: 'var(--space-2)',
    }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: isPlaying ? `${20 + Math.random() * 20}px` : 8,
            background: 'var(--color-secondary)',
            borderRadius: 2,
            transition: 'height 0.1s ease',
            animation: isPlaying ? `wave 0.5s ease-in-out ${i * 0.05}s infinite alternate` : 'none',
          }}
        />
      ))}
    </div>

    <button
      onClick={onPlay}
      disabled={replaysLeft === 0}
      style={{
        width: 72,
        height: 72,
        borderRadius: 'var(--radius-full)',
        background: replaysLeft === 0 
          ? 'var(--color-border)' 
          : 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: replaysLeft === 0 ? 'not-allowed' : 'pointer',
        boxShadow: replaysLeft > 0 ? '0 4px 16px rgba(26, 107, 107, 0.4)' : 'none',
        transition: 'all var(--transition-fast)',
      }}
      className={replaysLeft > 0 ? 'audio-btn' : ''}
    >
      {isPlaying ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )}
    </button>

    <span style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-small)',
      color: 'var(--color-secondary-dark)',
    }}>
      {replaysLeft}/{totalReplays} ដងនៅសល់
    </span>
  </div>
)

// Image Display
const ImageDisplay = ({ emoji, label }) => (
  <div style={{
    width: '100%',
    height: 160,
    background: 'linear-gradient(135deg, var(--color-primary-light) 0%, #FFE4C9 100%)',
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'var(--space-4)',
    border: '2px solid var(--color-border-light)',
  }}>
    <span style={{ fontSize: '4rem' }}>{emoji}</span>
    {label && (
      <span style={{
        fontFamily: 'var(--font-english)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-tertiary)',
        marginTop: 'var(--space-2)',
      }}>
        {label}
      </span>
    )}
  </div>
)

// Fill in Blank Sentence
const FillInBlank = ({ sentence, blankIndex }) => {
  const parts = sentence.split('___')
  
  return (
    <div style={{
      padding: 'var(--space-5)',
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-xl)',
      border: '2px solid var(--color-border-light)',
      marginBottom: 'var(--space-4)',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-english)',
        fontSize: 'var(--text-h3)',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        lineHeight: 1.6,
      }}>
        {parts[0]}
        <span style={{
          display: 'inline-block',
          minWidth: 80,
          borderBottom: '3px solid var(--color-primary)',
          marginLeft: 4,
          marginRight: 4,
        }}>
          &nbsp;
        </span>
        {parts[1]}
      </p>
    </div>
  )
}

// XP Floating Animation
const XPFloat = ({ show, amount }) => (
  <div
    style={{
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: show ? 1 : 0,
      animation: show ? 'floatUp 1s ease-out forwards' : 'none',
      pointerEvents: 'none',
      zIndex: 50,
    }}
  >
    <span style={{
      fontFamily: 'var(--font-english)',
      fontSize: 'var(--text-h2)',
      fontWeight: 800,
      color: 'var(--color-primary)',
      textShadow: '0 2px 8px rgba(232, 145, 58, 0.4)',
    }}>
      +{amount} XP
    </span>
  </div>
)

// Feedback Section
const FeedbackSection = ({ isCorrect, correctAnswer, explanation, onNext }) => (
  <div
    style={{
      padding: 'var(--space-4)',
      background: isCorrect ? 'var(--color-success-light)' : 'var(--color-error-light)',
      borderTop: `3px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}`,
      animation: 'slideUp 0.3s ease-out',
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-3)',
    }}>
      <span style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-full)',
        background: isCorrect ? 'var(--color-success)' : 'var(--color-error)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
      }}>
        {isCorrect ? '✓' : '✗'}
      </span>
      <div>
        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-body)',
          fontWeight: 700,
          color: isCorrect ? 'var(--color-success-dark)' : 'var(--color-error-dark)',
        }}>
          {isCorrect ? 'ត្រូវហើយ! 🎉' : 'ខុសហើយ'}
        </p>
        {!isCorrect && correctAnswer && (
          <p style={{
            fontFamily: 'var(--font-khmer)',
            fontSize: 'var(--text-caption)',
            color: 'var(--color-text-secondary)',
          }}>
            ចម្លើយត្រឹមត្រូវ: {correctAnswer}
          </p>
        )}
      </div>
    </div>

    {explanation && (
      <p style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-caption)',
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--space-3)',
        padding: 'var(--space-3)',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 'var(--radius-md)',
      }}>
        {explanation}
      </p>
    )}

    <button
      onClick={onNext}
      style={{
        width: '100%',
        padding: '14px',
        background: isCorrect 
          ? 'var(--color-success)' 
          : 'var(--color-error)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 700,
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      បន្ទាប់
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  </div>
)

// Submit Button
const SubmitButton = ({ disabled, loading, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    style={{
      width: '100%',
      padding: '16px',
      background: disabled 
        ? 'var(--color-border-light)' 
        : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      fontWeight: 700,
      color: disabled ? 'var(--color-text-tertiary)' : 'white',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : 'var(--shadow-glow-primary)',
      transition: 'all var(--transition-fast)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}
    className={!disabled ? 'submit-btn' : ''}
  >
    {loading ? (
      <>
        <div style={{
          width: 18,
          height: 18,
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        កំពុងពិនិត្យ...
      </>
    ) : (
      'បញ្ជូន'
    )}
  </button>
)

// Question Type 1: Multiple Choice
const MultipleChoiceQuestion = ({ onNext }) => {
  const [selected, setSelected] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showXP, setShowXP] = useState(false)

  const correctAnswer = 0 // Index A
  const isCorrect = selected === correctAnswer

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
      if (isCorrect) setShowXP(true)
    }, 800)
  }

  const options = [
    { label: 'A', text: 'សួស្តី' },
    { label: 'B', text: 'លាហើយ' },
    { label: 'C', text: 'អរគុណ' },
    { label: 'D', text: 'សុខសប្បាយ' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto' }}>
        <XPFloat show={showXP} amount={10} />
        
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <p style={{
            fontFamily: 'var(--font-english)',
            fontSize: 'var(--text-h3)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-3)',
          }}>
            What does "Hello" mean?
          </p>
          <HintButton 
            hint="តើ 'Hello' មានន័យថាអ្វី?"
            isRevealed={showHint}
            onReveal={() => setShowHint(true)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {options.map((opt, idx) => (
            <AnswerOption
              key={idx}
              label={opt.label}
              text={opt.text}
              isSelected={selected === idx}
              isCorrect={idx === correctAnswer}
              isWrong={selected === idx && idx !== correctAnswer}
              showResult={showResult}
              onClick={() => !showResult && setSelected(idx)}
              disabled={showResult}
            />
          ))}
        </div>
      </div>

      {!showResult ? (
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-light)' }}>
          <SubmitButton 
            disabled={selected === null} 
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <FeedbackSection
          isCorrect={isCorrect}
          correctAnswer={!isCorrect ? 'សួស្តី' : null}
          explanation={isCorrect ? '"Hello" ជាពាក្យស្វាគមន៍ទូទៅបំផុតជាភាសាអង់គ្លេស។' : null}
          onNext={onNext}
        />
      )}
    </div>
  )
}

// Question Type 2: Listening
const ListeningQuestion = ({ onNext }) => {
  const [selected, setSelected] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [replaysLeft, setReplaysLeft] = useState(3)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const correctAnswer = 1
  const isCorrect = selected === correctAnswer

  const handlePlay = () => {
    if (replaysLeft > 0) {
      setIsPlaying(true)
      setReplaysLeft(prev => prev - 1)
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 800)
  }

  const options = [
    { label: 'A', text: 'Hello' },
    { label: 'B', text: 'Good morning' },
    { label: 'C', text: 'Good night' },
    { label: 'D', text: 'Goodbye' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto' }}>
        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-h3)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center',
        }}>
          តើអ្នកឮអ្វី?
        </p>

        <AudioPlayer
          isPlaying={isPlaying}
          onPlay={handlePlay}
          replaysLeft={replaysLeft}
          totalReplays={3}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {options.map((opt, idx) => (
            <AnswerOption
              key={idx}
              label={opt.label}
              text={opt.text}
              isSelected={selected === idx}
              isCorrect={idx === correctAnswer}
              isWrong={selected === idx && idx !== correctAnswer}
              showResult={showResult}
              onClick={() => !showResult && setSelected(idx)}
              disabled={showResult}
            />
          ))}
        </div>
      </div>

      {!showResult ? (
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-light)' }}>
          <SubmitButton 
            disabled={selected === null} 
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <FeedbackSection
          isCorrect={isCorrect}
          correctAnswer={!isCorrect ? 'Good morning' : null}
          onNext={onNext}
        />
      )}
    </div>
  )
}

// Question Type 3: Image Match
const ImageMatchQuestion = ({ onNext }) => {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const correctAnswer = 2
  const isCorrect = selected === correctAnswer

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 800)
  }

  const options = [
    { label: 'A', text: 'មិត្តភក្តិ' },
    { label: 'B', text: 'គ្រូបង្រៀន' },
    { label: 'C', text: 'គ្រួសារ' },
    { label: 'D', text: 'ជិតខាង' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto' }}>
        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-h3)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center',
        }}>
          តើរូបនេះជាពាក្យអ្វី?
        </p>

        <ImageDisplay emoji="👨‍👩‍👧‍👦" label="Family illustration" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {options.map((opt, idx) => (
            <AnswerOption
              key={idx}
              label={opt.label}
              text={opt.text}
              isSelected={selected === idx}
              isCorrect={idx === correctAnswer}
              isWrong={selected === idx && idx !== correctAnswer}
              showResult={showResult}
              onClick={() => !showResult && setSelected(idx)}
              disabled={showResult}
            />
          ))}
        </div>
      </div>

      {!showResult ? (
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-light)' }}>
          <SubmitButton 
            disabled={selected === null} 
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <FeedbackSection
          isCorrect={isCorrect}
          correctAnswer={!isCorrect ? 'គ្រួសារ (Family)' : null}
          onNext={onNext}
        />
      )}
    </div>
  )
}

// Question Type 4: Fill in Blank
const FillInBlankQuestion = ({ onNext }) => {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const correctAnswer = 0
  const isCorrect = selected === correctAnswer

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 800)
  }

  const options = [
    { label: 'A', text: 'morning' },
    { label: 'B', text: 'night' },
    { label: 'C', text: 'hello' },
    { label: 'D', text: 'bye' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto' }}>
        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-3)',
          textAlign: 'center',
        }}>
          បំពេញចន្លោះខាងក្រោម:
        </p>

        <FillInBlank sentence="Good ___, how are you?" />

        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center',
          padding: '8px 16px',
          background: 'var(--color-primary-light)',
          borderRadius: 'var(--radius-md)',
        }}>
          💡 គំនិត: នេះជាពាក្យស្វាគមន៍នៅពេលព្រឹក
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {options.map((opt, idx) => (
            <AnswerOption
              key={idx}
              label={opt.label}
              text={opt.text}
              isSelected={selected === idx}
              isCorrect={idx === correctAnswer}
              isWrong={selected === idx && idx !== correctAnswer}
              showResult={showResult}
              onClick={() => !showResult && setSelected(idx)}
              disabled={showResult}
            />
          ))}
        </div>
      </div>

      {!showResult ? (
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-light)' }}>
          <SubmitButton 
            disabled={selected === null} 
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <FeedbackSection
          isCorrect={isCorrect}
          correctAnswer={!isCorrect ? 'morning' : null}
          explanation={isCorrect ? '"Good morning" ប្រើពេលស្វាគមន៍នៅពេលព្រឹក។' : null}
          onNext={onNext}
        />
      )}
    </div>
  )
}

// Question Type Tab
const QuestionTypeTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: '10px 8px',
      background: isActive ? 'var(--color-primary)' : 'transparent',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-english)',
      fontSize: '0.7rem',
      fontWeight: 600,
      color: isActive ? 'white' : 'var(--color-text-secondary)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </button>
)

// Main Quiz Screen Component
function QuizScreen() {
  const [questionType, setQuestionType] = useState('multiple')
  const [currentQuestion, setCurrentQuestion] = useState(3)

  const questionTypes = [
    { id: 'multiple', label: 'Multiple' },
    { id: 'listening', label: 'Listening' },
    { id: 'image', label: 'Image' },
    { id: 'fillblank', label: 'Fill Blank' },
  ]

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, 10))
  }

  const navigate = useNavigate()
  const { lessonId } = useParams()

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
        }
        
        .icon-btn:active {
          transform: scale(0.95);
        }
        
        .answer-option:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232, 145, 58, 0.5) !important;
        }
        
        .audio-btn:hover {
          transform: scale(1.05);
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        .shake {
          animation: shake 0.4s ease-in-out;
        }
        
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-60px);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wave {
          0% { height: 8px; }
          100% { height: 32px; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Header */}
      <QuizHeader
        current={currentQuestion}
        total={10}
        timer="02:45"
        onClose={() => navigate(-1)}
      />

      {/* Question Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {questionType === 'multiple' && <MultipleChoiceQuestion onNext={handleNext} />}
        {questionType === 'listening' && <ListeningQuestion onNext={handleNext} />}
        {questionType === 'image' && <ImageMatchQuestion onNext={handleNext} />}
        {questionType === 'fillblank' && <FillInBlankQuestion onNext={handleNext} />}
      </div>
    </div>
  )
}

export default QuizScreen
