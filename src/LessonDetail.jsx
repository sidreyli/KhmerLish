import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// ============================================
// LESSON DETAIL SCREEN
// The exciting moment before an adventure
// ============================================

// Sample vocabulary data
const vocabularyPreview = [
  { english: 'Hello', khmer: 'សួស្តី', pronunciation: 'suostei' },
  { english: 'Good morning', khmer: 'អរុណសួស្តី', pronunciation: 'arun suostei' },
  { english: 'Thank you', khmer: 'អរគុណ', pronunciation: 'orkun' },
  { english: 'Goodbye', khmer: 'លាហើយ', pronunciation: 'lea haey' },
  { english: 'How are you?', khmer: 'សុខសប្បាយទេ?', pronunciation: 'sok sabay te?' },
]

// Back Button
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      transition: 'all var(--transition-fast)',
    }}
    className="icon-btn"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
)

// Bookmark Button
const BookmarkButton = ({ isBookmarked, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      transition: 'all var(--transition-fast)',
    }}
    className="icon-btn"
  >
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={isBookmarked ? 'var(--color-primary)' : 'none'} 
      stroke={isBookmarked ? 'var(--color-primary)' : 'var(--color-text-primary)'} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  </button>
)

// Badge Component
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: {
      background: 'var(--color-border-light)',
      color: 'var(--color-text-secondary)',
    },
    primary: {
      background: 'var(--color-primary-light)',
      color: 'var(--color-primary-dark)',
    },
    secondary: {
      background: 'var(--color-secondary-light)',
      color: 'var(--color-secondary-dark)',
    },
  }

  return (
    <span style={{
      ...variants[variant],
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-small)',
      fontWeight: 600,
    }}>
      {children}
    </span>
  )
}

// Stat Item
const StatItem = ({ emoji, value, label }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  }}>
    <span style={{ fontSize: '1rem' }}>{emoji}</span>
    <span style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-caption)',
      color: 'var(--color-text-secondary)',
    }}>
      {value}
    </span>
  </div>
)

// Vocabulary Preview Card
const VocabPreviewCard = ({ word, onPlayAudio }) => (
  <div style={{
    flexShrink: 0,
    width: 140,
    padding: 'var(--space-4)',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--color-border-light)',
    transition: 'all var(--transition-fast)',
  }}
  className="vocab-card"
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 'var(--space-2)',
    }}>
      <p style={{
        fontFamily: 'var(--font-english)',
        fontSize: 'var(--text-caption)',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
      }}>
        {word.english}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPlayAudio(word)
        }}
        style={{
          width: 28,
          height: 28,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-primary-light)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        className="play-btn"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-primary)">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>
    </div>
    <p style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      fontWeight: 600,
      color: 'var(--color-secondary-dark)',
      lineHeight: 'var(--leading-khmer)',
      marginBottom: 4,
    }}>
      {word.khmer}
    </p>
    <p style={{
      fontFamily: 'var(--font-english)',
      fontSize: 'var(--text-small)',
      color: 'var(--color-text-tertiary)',
      fontStyle: 'italic',
    }}>
      {word.pronunciation}
    </p>
  </div>
)

// Progress Section
const ProgressSection = ({ progress, wordsLearned, totalWords, quizzesTaken, bestScore }) => (
  <div style={{
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border-light)',
  }}>
    <h3 style={{
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      fontWeight: 600,
      color: 'var(--color-text-primary)',
      marginBottom: 'var(--space-3)',
    }}>
      វឌ្ឍនភាព
    </h3>
    
    {/* Progress Bar */}
    <div style={{ marginBottom: 'var(--space-3)' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6,
      }}>
        <span style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-secondary)',
        }}>
          បានរៀន {wordsLearned}/{totalWords} ពាក្យ
        </span>
        <span style={{
          fontFamily: 'var(--font-english)',
          fontSize: 'var(--text-caption)',
          fontWeight: 700,
          color: 'var(--color-secondary)',
        }}>
          {progress}%
        </span>
      </div>
      <div style={{
        height: 8,
        background: 'var(--color-border-light)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.8s ease-out',
        }} />
      </div>
    </div>

    {/* Stats */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-tertiary)',
      }}>
        បានធ្វើតេស្ត {quizzesTaken} ដង
      </span>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <span style={{ fontSize: '0.9rem' }}>⭐⭐⭐</span>
        <span style={{
          fontFamily: 'var(--font-english)',
          fontSize: 'var(--text-caption)',
          fontWeight: 600,
          color: 'var(--color-warning)',
        }}>
          {bestScore}%
        </span>
      </div>
    </div>
  </div>
)

// Download Button with Progress
const DownloadButton = ({ downloadSize, isDownloading, downloadProgress, onDownload }) => (
  <button
    onClick={onDownload}
    disabled={isDownloading}
    style={{
      width: '100%',
      padding: '16px 24px',
      background: isDownloading 
        ? 'var(--color-border-light)'
        : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      fontWeight: 700,
      color: isDownloading ? 'var(--color-text-secondary)' : 'white',
      cursor: isDownloading ? 'not-allowed' : 'pointer',
      boxShadow: isDownloading ? 'none' : 'var(--shadow-glow-primary)',
      transition: 'all var(--transition-fast)',
      position: 'relative',
      overflow: 'hidden',
    }}
    className={!isDownloading ? 'primary-btn' : ''}
  >
    {isDownloading && (
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: `${downloadProgress}%`,
        background: 'var(--color-primary-light)',
        transition: 'width 0.3s ease-out',
      }} />
    )}
    <span style={{ position: 'relative', zIndex: 1 }}>
      {isDownloading ? `កំពុងទាញយក... ${downloadProgress}%` : `ទាញយក (${downloadSize})`}
    </span>
  </button>
)

// Primary Action Button
const PrimaryButton = ({ children, onClick, icon }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '16px 24px',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      fontWeight: 700,
      color: 'white',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-glow-primary)',
      transition: 'all var(--transition-fast)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}
    className="primary-btn"
  >
    {children}
    {icon && icon}
  </button>
)

// Secondary Button (Quiz)
const QuizButton = ({ enabled, onClick }) => (
  <button
    onClick={enabled ? onClick : undefined}
    style={{
      width: '100%',
      padding: '14px 24px',
      background: enabled ? 'var(--color-secondary-light)' : 'var(--color-border-light)',
      border: enabled ? '2px solid var(--color-secondary)' : '2px solid transparent',
      borderRadius: 'var(--radius-lg)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-body)',
      fontWeight: 600,
      color: enabled ? 'var(--color-secondary-dark)' : 'var(--color-text-tertiary)',
      cursor: enabled ? 'pointer' : 'not-allowed',
      transition: 'all var(--transition-fast)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      opacity: enabled ? 1 : 0.6,
    }}
    className={enabled ? 'quiz-btn' : ''}
  >
    {enabled ? '🎯' : '🔒'}
    ធ្វើតេស្ត
    {!enabled && (
      <span style={{
        fontSize: 'var(--text-small)',
        fontWeight: 400,
      }}>
        (រៀនពាក្យសិន)
      </span>
    )}
  </button>
)

// Hero Illustration Component
const HeroIllustration = ({ scrollY }) => {
  const parallaxOffset = scrollY * 0.3

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 280,
      background: 'linear-gradient(135deg, #FFE4B5 0%, #FFD700 50%, #FFA500 100%)',
      overflow: 'hidden',
      transform: `translateY(${parallaxOffset}px)`,
      transition: 'transform 0.1s ease-out',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 30,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.3)',
      }} />
      <div style={{
        position: 'absolute',
        top: 80,
        right: 80,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 20,
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.25)',
      }} />
      <div style={{
        position: 'absolute',
        top: 30,
        left: 50,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
      }} />

      {/* Main illustration - waving hands */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '6rem',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
      }}>
        👋
      </div>

      {/* Speech bubbles */}
      <div style={{
        position: 'absolute',
        top: 50,
        left: 30,
        padding: '8px 14px',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-caption)',
        color: 'var(--color-primary-dark)',
      }}>
        សួស្តី!
      </div>
      <div style={{
        position: 'absolute',
        top: 90,
        right: 40,
        padding: '8px 14px',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'var(--font-english)',
        fontSize: 'var(--text-caption)',
        color: 'var(--color-secondary-dark)',
      }}>
        Hello!
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
      }} />
    </div>
  )
}

// Main Lesson Detail Component
function LessonDetail() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const scrollRef = useRef(null)

  // Lesson status: 'not-downloaded', 'downloaded', 'in-progress', 'completed'
  const [lessonStatus, setLessonStatus] = useState('in-progress')

  // Lesson data
  const lesson = {
    titleKhmer: 'ការស្វាគមន៍',
    titleEnglish: 'Basic Greetings',
    level: 'A1',
    category: 'រាល់ថ្ងៃ',
    wordCount: 10,
    duration: '~15 នាទី',
    xpReward: '+50 XP',
    downloadSize: '2.3 MB',
    description: 'រៀនពាក្យស្វាគមន៍សំខាន់ៗសម្រាប់ការជួបមនុស្សថ្មី។ មេរៀននេះនឹងជួយអ្នកឱ្យចេះស្វាគមន៍ និងសំណេះសំណាលជាមួយមនុស្សថ្មីបានដោយទំនុកចិត្ត។',
    progress: 60,
    wordsLearned: 6,
    quizzesTaken: 1,
    bestScore: 95,
  }

  const handleScroll = (e) => {
    setScrollY(e.target.scrollTop)
  }

  const handleDownload = () => {
    setIsDownloading(true)
    setDownloadProgress(0)
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          setLessonStatus('downloaded')
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handlePlayAudio = (word) => {
    console.log('Playing audio for:', word.english)
    // In real app, would play audio
  }

  const canTakeQuiz = lessonStatus === 'in-progress' || lessonStatus === 'completed'

  const navigate = useNavigate()
  const { lessonId } = useParams()

  return (
    <div className="screen screen-fullscreen" style={{
      background: 'var(--color-background)',
      position: 'relative',
      overflow: 'auto',
    }}>
      {/* CSS for animations */}
      <style>{`
        .icon-btn:hover {
          transform: scale(1.1);
        }
        
        .icon-btn:active {
          transform: scale(0.95);
        }
        
        .vocab-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg) !important;
        }
        
        .play-btn:hover {
          transform: scale(1.1);
          background: var(--color-primary) !important;
        }
        
        .play-btn:hover svg {
          fill: white;
        }
        
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(232, 145, 58, 0.5) !important;
        }
        
        .primary-btn:active {
          transform: translateY(0);
        }
        
        .quiz-btn:hover {
          transform: translateY(-2px);
          background: var(--color-secondary-light);
          box-shadow: 0 4px 16px rgba(26, 107, 107, 0.2);
        }
        
        .vocab-scroll::-webkit-scrollbar {
          display: none;
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
        
        .animate-in {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Fixed Header Buttons */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 'var(--space-4)',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 20,
      }}>
        <BackButton onClick={() => navigate(-1)} />
        <BookmarkButton 
          isBookmarked={isBookmarked} 
          onClick={() => setIsBookmarked(!isBookmarked)} 
        />
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Hero Section */}
        <HeroIllustration scrollY={scrollY} />

        {/* Content Section */}
        <div style={{
          padding: 'var(--space-5)',
          paddingTop: 'var(--space-4)',
          marginTop: -20,
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Title & Badges */}
          <div className="animate-in" style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-2)',
            }}>
              <Badge variant="secondary">{lesson.level}</Badge>
              <Badge variant="primary">{lesson.category}</Badge>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-h1)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--leading-khmer)',
              marginBottom: 4,
            }}>
              {lesson.titleKhmer}
            </h1>
            <p style={{
              fontFamily: 'var(--font-english)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
            }}>
              {lesson.titleEnglish}
            </p>
          </div>

          {/* Stats Row */}
          <div 
            className="animate-in"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 'var(--space-4)',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-border-light)',
              marginBottom: 'var(--space-4)',
              animationDelay: '0.1s',
            }}
          >
            <StatItem emoji="📖" value={`${lesson.wordCount} ពាក្យ`} />
            <StatItem emoji="⏱️" value={lesson.duration} />
            <StatItem emoji="⭐" value={lesson.xpReward} />
          </div>

          {/* Description */}
          <div 
            className="animate-in"
            style={{ marginBottom: 'var(--space-5)', animationDelay: '0.15s' }}
          >
            <p style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-khmer)',
            }}>
              {lesson.description}
            </p>
          </div>

          {/* Vocabulary Preview */}
          <div 
            className="animate-in"
            style={{ marginBottom: 'var(--space-5)', animationDelay: '0.2s' }}
          >
            <h3 style={{
              fontFamily: 'var(--font-khmer)',
              fontSize: 'var(--text-body)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}>
              មើលពាក្យជាមុន
            </h3>
            <div 
              className="vocab-scroll"
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                overflowX: 'auto',
                marginLeft: 'calc(-1 * var(--space-5))',
                marginRight: 'calc(-1 * var(--space-5))',
                paddingLeft: 'var(--space-5)',
                paddingRight: 'var(--space-5)',
                paddingBottom: 'var(--space-2)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {vocabularyPreview.map((word, index) => (
                <VocabPreviewCard 
                  key={index} 
                  word={word} 
                  onPlayAudio={handlePlayAudio}
                />
              ))}
            </div>
          </div>

          {/* Progress Section (if started) */}
          {(lessonStatus === 'in-progress' || lessonStatus === 'completed') && (
            <div 
              className="animate-in"
              style={{ marginBottom: 'var(--space-5)', animationDelay: '0.25s' }}
            >
              <ProgressSection
                progress={lesson.progress}
                wordsLearned={lesson.wordsLearned}
                totalWords={lesson.wordCount}
                quizzesTaken={lesson.quizzesTaken}
                bestScore={lesson.bestScore}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div 
            className="animate-in"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              paddingBottom: 'var(--space-6)',
              animationDelay: '0.3s',
            }}
          >
            {lessonStatus === 'not-downloaded' && (
              <DownloadButton
                downloadSize={lesson.downloadSize}
                isDownloading={isDownloading}
                downloadProgress={downloadProgress}
                onDownload={handleDownload}
              />
            )}

            {lessonStatus === 'downloaded' && (
              <PrimaryButton onClick={() => setLessonStatus('in-progress')}>
                ចាប់ផ្តើមមេរៀន
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </PrimaryButton>
            )}

            {lessonStatus === 'in-progress' && (
              <PrimaryButton onClick={() => navigate(`/flashcard/${lessonId || 'greetings'}`)}>
                បន្តរៀន
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </PrimaryButton>
            )}

            {lessonStatus === 'completed' && (
              <PrimaryButton onClick={() => navigate(`/flashcard/${lessonId || 'greetings'}`)}>
                ពិនិត្យមើលឡើងវិញ
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </PrimaryButton>
            )}

            <QuizButton
              enabled={canTakeQuiz}
              onClick={() => navigate(`/quiz/${lessonId || 'greetings'}`)}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default LessonDetail
