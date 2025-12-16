import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuizQuestions, useSaveQuizAttempt } from './hooks/useQuiz'
import { useLesson } from './hooks/useLessons'

// ============================================
// QUIZ SCREEN COMPONENT
// Dynamic quiz with multiple question types
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
const AudioPlayer = ({ audioUrl, isPlaying, onPlay, replaysLeft, totalReplays }) => (
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
const ImageDisplay = ({ emoji, imageUrl, label }) => (
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
    overflow: 'hidden',
  }}>
    {imageUrl ? (
      <img src={imageUrl} alt={label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    ) : (
      <span style={{ fontSize: '4rem' }}>{emoji || '📖'}</span>
    )}
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
const FillInBlank = ({ sentence }) => {
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
        color: 'white',
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

// Dynamic Question Component
const QuizQuestion = ({ question, onAnswer, onNext }) => {
  const [selected, setSelected] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showXP, setShowXP] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [replaysLeft, setReplaysLeft] = useState(3)

  const correctOption = question.options.find(opt => opt.is_correct)
  const isCorrect = selected !== null && question.options[selected]?.is_correct

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
      if (isCorrect) setShowXP(true)
      onAnswer({
        questionId: question.id,
        userAnswer: question.options[selected]?.option_text,
        isCorrect,
      })
    }, 800)
  }

  const handlePlayAudio = () => {
    if (replaysLeft > 0 && question.audio_url) {
      setIsPlaying(true)
      setReplaysLeft(prev => prev - 1)
      // In production, play actual audio
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }

  const handleNext = () => {
    setSelected(null)
    setShowHint(false)
    setShowResult(false)
    setShowXP(false)
    setReplaysLeft(3)
    onNext()
  }

  // Render based on question type
  const renderQuestionContent = () => {
    const questionText = question.question_text || question.question_text_khmer

    switch (question.question_type) {
      case 'listening':
        return (
          <>
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-h3)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-4)',
              textAlign: 'center',
            }}>
              {question.question_text_khmer || 'តើអ្នកឮអ្វី?'}
            </p>
            <AudioPlayer
              audioUrl={question.audio_url}
              isPlaying={isPlaying}
              onPlay={handlePlayAudio}
              replaysLeft={replaysLeft}
              totalReplays={3}
            />
          </>
        )

      case 'image_match':
        return (
          <>
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-h3)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-4)',
              textAlign: 'center',
            }}>
              {question.question_text_khmer || 'តើរូបនេះជាពាក្យអ្វី?'}
            </p>
            <ImageDisplay
              emoji={question.emoji}
              imageUrl={question.image_url}
              label={questionText}
            />
          </>
        )

      case 'fill_blank':
        return (
          <>
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-3)',
              textAlign: 'center',
            }}>
              បំពេញចន្លោះខាងក្រោម:
            </p>
            <FillInBlank sentence={questionText} />
            {question.hint && (
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
                💡 {question.hint}
              </p>
            )}
          </>
        )

      case 'multiple_choice':
      case 'translation':
      default:
        return (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p style={{
              fontFamily: 'var(--font-english)',
              fontSize: 'var(--text-h3)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}>
              {questionText}
            </p>
            {question.hint && (
              <HintButton
                hint={question.hint}
                isRevealed={showHint}
                onReveal={() => setShowHint(true)}
              />
            )}
          </div>
        )
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto', position: 'relative' }}>
        <XPFloat show={showXP} amount={10} />

        {renderQuestionContent()}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {question.options.map((opt, idx) => (
            <AnswerOption
              key={opt.id || idx}
              label={opt.option_label || String.fromCharCode(65 + idx)}
              text={opt.option_text}
              isSelected={selected === idx}
              isCorrect={opt.is_correct}
              isWrong={selected === idx && !opt.is_correct}
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
          correctAnswer={!isCorrect ? correctOption?.option_text : null}
          explanation={isCorrect ? question.explanation : null}
          onNext={handleNext}
        />
      )}
    </div>
  )
}

// Loading Skeleton
const LoadingSkeleton = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'var(--color-background)',
    padding: 'var(--space-5)',
  }}>
    <div className="loading-spinner" style={{ marginBottom: 'var(--space-4)' }} />
    <p style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      color: 'var(--color-text-secondary)',
    }}>
      កំពុងផ្ទុកតេស្ត...
    </p>
  </div>
)

// Error State
const ErrorState = ({ message, onRetry }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'var(--color-background)',
    padding: 'var(--space-5)',
    textAlign: 'center',
  }}>
    <span style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>😔</span>
    <h2 style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-h3)',
      color: 'var(--color-text-primary)',
      marginBottom: 'var(--space-2)',
    }}>
      មានបញ្ហាកើតឡើង
    </h2>
    <p style={{
      fontFamily: 'var(--font-english)',
      fontSize: 'var(--text-caption)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--space-4)',
    }}>
      {message || 'Could not load quiz'}
    </p>
    <button
      onClick={onRetry}
      style={{
        padding: '12px 24px',
        background: 'var(--color-primary)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 600,
        color: 'white',
        cursor: 'pointer',
      }}
    >
      ព្យាយាមម្តងទៀត
    </button>
  </div>
)

// Empty State - No Questions
const EmptyState = ({ onBack }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'var(--color-background)',
    padding: 'var(--space-5)',
    textAlign: 'center',
  }}>
    <span style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>📝</span>
    <h2 style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-h3)',
      color: 'var(--color-text-primary)',
      marginBottom: 'var(--space-2)',
    }}>
      មិនទាន់មានសំណួរ
    </h2>
    <p style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-caption)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--space-4)',
    }}>
      មេរៀននេះមិនទាន់មានសំណួរតេស្តទេ
    </p>
    <button
      onClick={onBack}
      style={{
        padding: '12px 24px',
        background: 'var(--color-primary)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 600,
        color: 'white',
        cursor: 'pointer',
      }}
    >
      ត្រឡប់ក្រោយ
    </button>
  </div>
)

// Format time as MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Main Quiz Screen Component
function QuizScreen() {
  const navigate = useNavigate()
  const { lessonId } = useParams()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTimeRef = useRef(Date.now())
  const timerRef = useRef(null)

  // Fetch quiz questions
  const {
    data: questions,
    isLoading,
    error,
    refetch
  } = useQuizQuestions(lessonId)

  // Fetch lesson info for results
  const { data: lesson } = useLesson(lessonId)

  // Save quiz attempt mutation
  const saveAttempt = useSaveQuizAttempt()

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [])

  const handleAnswer = (answerData) => {
    setAnswers(prev => [...prev, {
      ...answerData,
      timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000) -
        answers.reduce((acc, a) => acc + (a.timeTaken || 0), 0)
    }])
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      // Quiz complete - save and navigate to results
      handleQuizComplete()
    }
  }

  const handleQuizComplete = async () => {
    clearInterval(timerRef.current)

    const correctCount = answers.filter(a => a.isCorrect).length
    const totalQuestions = questions.length
    const scorePercent = Math.round((correctCount / totalQuestions) * 100)
    const passed = scorePercent >= 70
    const xpEarned = passed ? Math.round(scorePercent / 2) : 10

    const attemptData = {
      scorePercent,
      correctCount,
      totalQuestions,
      timeTaken: elapsedTime,
      xpEarned,
      passed,
      answers,
      startedAt: new Date(startTimeRef.current).toISOString(),
    }

    try {
      await saveAttempt.mutateAsync({ lessonId, attemptData })
    } catch (err) {
      console.error('Failed to save quiz attempt:', err)
    }

    // Navigate to results
    navigate(`/quiz/${lessonId}/results`, {
      state: {
        scorePercent,
        correctCount,
        totalQuestions,
        timeTaken: elapsedTime,
        xpEarned,
        passed,
        lessonTitle: lesson?.title_khmer,
      }
    })
  }

  // Show loading state
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // Show error state
  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />
  }

  // Show empty state if no questions
  if (!questions || questions.length === 0) {
    return <EmptyState onBack={() => navigate(-1)} />
  }

  const currentQuestion = questions[currentIndex]

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
      `}</style>

      {/* Header */}
      <QuizHeader
        current={currentIndex + 1}
        total={questions.length}
        timer={formatTime(elapsedTime)}
        onClose={() => navigate(-1)}
      />

      {/* Question Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>
    </div>
  )
}

export default QuizScreen
