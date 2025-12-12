import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLessons, useCategories, useUserLessonProgress } from './hooks/useLessons'
import { useContinueLearning } from './hooks/useProgress'

// Level data
const levels = [
  { id: 'all', khmer: 'ទាំងអស់កម្រិត', english: 'All Levels' },
  { id: 'A1', khmer: 'A1 - អ្នកចាប់ផ្តើម', english: 'A1 - Beginner' },
  { id: 'A2', khmer: 'A2 - បឋម', english: 'A2 - Elementary' },
  { id: 'B1', khmer: 'B1 - មធ្យម', english: 'B1 - Intermediate' },
  { id: 'B2', khmer: 'B2 - កម្រិតខ្ពស់', english: 'B2 - Upper Intermediate' },
]

// Level Selector Chip
const LevelChip = ({ level, onClick, isOpen }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      background: 'var(--color-secondary-light)',
      border: '1px solid var(--color-secondary)',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-caption)',
      fontWeight: 600,
      color: 'var(--color-secondary-dark)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
    }}
  >
    {level.khmer}
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform var(--transition-fast)',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>
)

// Level Dropdown
const LevelDropdown = ({ levels, currentLevel, onSelect, isOpen }) => (
  <div style={{
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'all var(--transition-fast)',
    zIndex: 100,
  }}>
    {levels.map((level) => (
      <button
        key={level.id}
        onClick={() => onSelect(level)}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: currentLevel.id === level.id ? 'var(--color-secondary-light)' : 'transparent',
          border: 'none',
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-caption)',
          fontWeight: currentLevel.id === level.id ? 600 : 400,
          color: currentLevel.id === level.id ? 'var(--color-secondary-dark)' : 'var(--color-text-primary)',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'background var(--transition-fast)',
        }}
      >
        {level.khmer}
      </button>
    ))}
  </div>
)

// Category Filter Pill
const CategoryPill = ({ category, isSelected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flexShrink: 0,
      padding: '10px 18px',
      background: isSelected
        ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)'
        : 'var(--color-surface)',
      border: isSelected ? 'none' : '1px solid var(--color-border)',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-khmer)',
      fontSize: 'var(--text-caption)',
      fontWeight: 600,
      color: isSelected ? 'white' : 'var(--color-text-secondary)',
      cursor: 'pointer',
      transition: 'all var(--transition-normal)',
      boxShadow: isSelected ? 'var(--shadow-glow-primary)' : 'var(--shadow-sm)',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    }}
    className="category-pill"
  >
    {category.emoji} {category.name_khmer || category.khmer}
  </button>
)

// Lesson Card Thumbnail
const LessonThumbnail = ({ lesson, progress }) => {
  const isLocked = lesson.is_premium && !progress
  const isCompleted = progress?.status === 'completed'
  const colors = lesson.gradient_colors || ['#FFE4B5', '#FFD700']

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 80,
      borderRadius: 'var(--radius-md)',
      background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]}33 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -10,
        right: -10,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: colors[1],
        opacity: 0.2,
      }} />
      <div style={{
        position: 'absolute',
        bottom: -15,
        left: -15,
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: colors[1],
        opacity: 0.15,
      }} />

      <span style={{
        fontSize: '2rem',
        opacity: isLocked ? 0.5 : 1,
      }}>
        {lesson.icon_emoji || '📚'}
      </span>

      {isCompleted && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(74, 155, 92, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-success)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      )}

      {isLocked && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

// Lesson Card
const LessonCard = ({ lesson, progress, onClick }) => {
  const isCompleted = progress?.status === 'completed'
  const isInProgress = progress?.status === 'in_progress'
  const isLocked = lesson.is_premium && !progress
  const progressPercent = progress?.progress_percent || 0

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3)',
        boxShadow: isCompleted ? '0 4px 16px rgba(74, 155, 92, 0.15)' : 'var(--shadow-md)',
        border: isCompleted
          ? '2px solid var(--color-success-light)'
          : '1px solid var(--color-border-light)',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all var(--transition-fast)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className={!isLocked ? 'lesson-card' : ''}
    >
      {isCompleted && (
        <div style={{
          position: 'absolute',
          top: -8,
          left: -8,
          width: 40,
          height: 40,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          transform: 'rotate(-45deg)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 4,
        }}>
          <span style={{
            transform: 'rotate(45deg)',
            fontSize: '0.7rem',
            marginBottom: 2,
          }}>⭐</span>
        </div>
      )}

      {lesson.is_premium && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          padding: '4px 8px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-english)',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 10,
        }}>
          Premium
        </div>
      )}

      <LessonThumbnail lesson={lesson} progress={progress} />

      <div style={{ marginTop: 'var(--space-3)' }}>
        <h3 style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-body)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 2,
          lineHeight: 'var(--leading-khmer)',
        }}>
          {lesson.title_khmer}
        </h3>
        <p style={{
          fontFamily: 'var(--font-english)',
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--space-2)',
        }}>
          {lesson.title_english}
        </p>

        <p style={{
          fontFamily: 'var(--font-khmer)',
          fontSize: 'var(--text-small)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2)',
        }}>
          {lesson.word_count} ពាក្យ
        </p>

        {isInProgress && (
          <div style={{ marginBottom: 'var(--space-2)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 4,
            }}>
              <span style={{
                fontFamily: 'var(--font-english)',
                fontSize: 'var(--text-small)',
                fontWeight: 600,
                color: 'var(--color-secondary)',
              }}>
                {progressPercent}%
              </span>
            </div>
            <div style={{
              height: 6,
              background: 'var(--color-border-light)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.5s ease-out',
              }} />
            </div>
          </div>
        )}

        {!isLocked && (
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-khmer)',
            fontSize: 'var(--text-small)',
            fontWeight: 600,
            background: isCompleted
              ? 'var(--color-success-light)'
              : isInProgress
                ? 'var(--color-secondary-light)'
                : 'var(--color-primary-light)',
            color: isCompleted
              ? 'var(--color-success-dark)'
              : isInProgress
                ? 'var(--color-secondary-dark)'
                : 'var(--color-primary-dark)',
          }}>
            {isCompleted && 'បានបញ្ចប់'}
            {isInProgress && 'បន្ត'}
            {!isCompleted && !isInProgress && 'ចាប់ផ្តើម'}
          </div>
        )}
      </div>
    </div>
  )
}

// Floating Continue Button
const FloatingContinueButton = ({ lesson, progress, onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: 90,
      left: 'var(--space-5)',
      right: 'var(--space-5)',
      padding: '16px 24px',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 8px 32px rgba(232, 145, 58, 0.4)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all var(--transition-fast)',
      zIndex: 50,
    }}
    className="floating-btn"
  >
    <div style={{ textAlign: 'left' }}>
      <p style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-body)',
        fontWeight: 700,
        color: 'white',
        marginBottom: 2,
      }}>
        បន្តមេរៀន
      </p>
      <p style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-small)',
        color: 'rgba(255, 255, 255, 0.8)',
      }}>
        {lesson.title_khmer} • {progress?.progress_percent || 0}%
      </p>
    </div>
    <div style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  </button>
)

// Loading skeleton
const LessonCardSkeleton = () => (
  <div style={{
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-3)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--color-border-light)',
  }}>
    <div className="skeleton" style={{ width: '100%', height: 80, borderRadius: 'var(--radius-md)' }} />
    <div style={{ marginTop: 'var(--space-3)' }}>
      <div className="skeleton" style={{ width: '70%', height: 20, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: '50%', height: 14, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: '30%', height: 14 }} />
    </div>
  </div>
)

// Main Lessons Screen Component
function LessonsScreen() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentLevel, setCurrentLevel] = useState(levels[0])
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false)

  // Fetch data from Supabase
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const { data: lessons = [], isLoading: lessonsLoading } = useLessons(
    selectedCategory === 'all' ? null : selectedCategory,
    currentLevel.id === 'all' ? null : currentLevel.id
  )
  const { data: progressData = [] } = useUserLessonProgress()
  const { data: continueLearning } = useContinueLearning()

  // Create a map of progress by lesson ID
  const progressMap = progressData.reduce((acc, p) => {
    acc[p.lesson_id] = p
    return acc
  }, {})

  // All categories for filter (add "All" option)
  const allCategories = [
    { id: 'all', name_khmer: 'ទាំងអស់', name_english: 'All', emoji: '📚' },
    ...categories
  ]

  const isLoading = categoriesLoading || lessonsLoading

  return (
    <div className="screen">
      <style>{`
        .lesson-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-lg) !important;
        }

        .lesson-card:active {
          transform: translateY(0) scale(0.98);
        }

        .category-pill:hover {
          transform: scale(1.05);
        }

        .category-pill:active {
          transform: scale(0.95);
        }

        .floating-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(232, 145, 58, 0.5) !important;
        }

        .floating-btn:active {
          transform: translateY(0);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-card {
          animation: slideIn 0.4s ease-out forwards;
        }

        .category-scroll::-webkit-scrollbar {
          display: none;
        }

        .skeleton {
          background: linear-gradient(90deg, var(--color-border-light) 25%, var(--color-border) 50%, var(--color-border-light) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius-sm);
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: 'var(--space-5)',
        paddingBottom: 'var(--space-3)',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-3)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-khmer)',
            fontSize: 'var(--text-h2)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}>
            មេរៀន
          </h1>

          <div style={{ position: 'relative' }}>
            <LevelChip
              level={currentLevel}
              onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
              isOpen={isLevelDropdownOpen}
            />
            <LevelDropdown
              levels={levels}
              currentLevel={currentLevel}
              isOpen={isLevelDropdownOpen}
              onSelect={(level) => {
                setCurrentLevel(level)
                setIsLevelDropdownOpen(false)
              }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div
          className="category-scroll"
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            overflowX: 'auto',
            paddingBottom: 'var(--space-2)',
            marginLeft: 'calc(-1 * var(--space-5))',
            marginRight: 'calc(-1 * var(--space-5))',
            paddingLeft: 'var(--space-5)',
            paddingRight: 'var(--space-5)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {allCategories.map((category) => (
            <CategoryPill
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>
      </header>

      {/* Lessons Grid */}
      <div style={{
        padding: 'var(--space-4)',
        paddingBottom: continueLearning ? '120px' : 'var(--space-4)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-4)',
        }}>
          {isLoading ? (
            <>
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
              <LessonCardSkeleton />
            </>
          ) : lessons.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: 'var(--space-8)',
              color: 'var(--color-text-secondary)',
            }}>
              <p style={{ fontFamily: 'var(--font-khmer)', fontSize: 'var(--text-body)' }}>
                មិនមានមេរៀនទេ
              </p>
              <p style={{ fontFamily: 'var(--font-english)', fontSize: 'var(--text-small)', marginTop: 8 }}>
                No lessons found
              </p>
            </div>
          ) : (
            lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="animate-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <LessonCard
                  lesson={lesson}
                  progress={progressMap[lesson.id]}
                  onClick={() => {
                    if (!lesson.is_premium || progressMap[lesson.id]) {
                      navigate(`/lessons/${lesson.id}`)
                    }
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Continue Button */}
      {continueLearning && (
        <FloatingContinueButton
          lesson={continueLearning.lesson}
          progress={continueLearning}
          onClick={() => navigate(`/flashcard/${continueLearning.lesson_id}`)}
        />
      )}

      {/* Click outside to close dropdown */}
      {isLevelDropdownOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
          }}
          onClick={() => setIsLevelDropdownOpen(false)}
        />
      )}
    </div>
  )
}

export default LessonsScreen
