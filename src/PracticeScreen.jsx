import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useDueReviewsCount, useLearnedWordsCount } from './hooks/useVocabulary'
import { useOverallStats, useContinueLearning, useStudyDays } from './hooks/useProgress'
import { useTotalQuizzesTaken } from './hooks/useQuiz'

// Streak Badge Component
function StreakBadge({ streak }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      padding: '6px 12px',
      borderRadius: '20px',
      boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
    }}>
      <span style={{ fontSize: '16px' }}>🔥</span>
      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        fontWeight: '700',
        color: '#fff',
      }}>
        {streak || 0}
      </span>
    </div>
  )
}

// Review Hero Card - Reviews Due
function ReviewDueCard({ reviewsDue, onReview }) {
  const [pulse, setPulse] = useState(false)

  // Pulse animation effect
  useState(() => {
    const interval = setInterval(() => {
      setPulse(p => !p)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const size = 100
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  // Show progress based on reviews (max 20 for full circle)
  const progress = Math.min((reviewsDue / 20) * 100, 100)
  const fillAmount = (progress / 100) * circumference
  const center = size / 2

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1A6B6B 0%, #0D4F4F 100%)',
      borderRadius: '20px',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(26, 107, 107, 0.3)',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Timer/Progress Circle */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
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
              stroke="#FFD700"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - fillAmount}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
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
              fontFamily: 'Nunito, sans-serif',
              fontSize: '32px',
              fontWeight: '800',
              color: '#fff',
              lineHeight: 1,
              transform: pulse ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}>
              {reviewsDue}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}>
            <span style={{ fontSize: '20px' }}>📚</span>
            <span style={{
              fontFamily: 'Battambang, serif',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
            }}>
              ពាក្យត្រូវពិនិត្យថ្ងៃនេះ
            </span>
          </div>

          <button
            onClick={onReview}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #E8913A 0%, #D4791F 100%)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'Battambang, serif',
              fontSize: '14px',
              fontWeight: '600',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(232, 145, 58, 0.4)',
              transition: 'transform 0.2s ease',
            }}
          >
            ពិនិត្យឥឡូវ →
          </button>

          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '10px',
            textAlign: 'center',
          }}>
            💡 កុំភ្លេច! ជួយអ្នកចាំបានយូរ
          </div>
        </div>
      </div>
    </div>
  )
}

// Review Hero Card - All Done
function AllDoneCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      borderRadius: '20px',
      padding: '24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        fontSize: '24px',
        opacity: 0.3,
        animation: 'float 3s ease-in-out infinite',
      }}>✨</div>
      <div style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        fontSize: '20px',
        opacity: 0.3,
        animation: 'float 3s ease-in-out infinite 0.5s',
      }}>⭐</div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '40px',
        fontSize: '18px',
        opacity: 0.3,
        animation: 'float 3s ease-in-out infinite 1s',
      }}>🌟</div>

      <div style={{
        fontSize: '48px',
        marginBottom: '12px',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        🎉
      </div>

      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '8px',
      }}>
        អស់ហើយថ្ងៃនេះ!
      </div>

      <div style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.8)',
        marginBottom: '4px',
      }}>
        All done for today!
      </div>

      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.7)',
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}>
        <span>⏰</span>
        <span>ពិនិត្យបន្ទាប់ថ្ងៃស្អែក</span>
      </div>
    </div>
  )
}

// Study New Words Card
function NewWordsCard({ lesson, onStart }) {
  if (!lesson) return null

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0,
        }}>
          {lesson.lesson?.icon_emoji || '📖'}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '16px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '4px',
          }}>
            បន្តរៀន
          </div>

          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px',
          }}>
            {lesson.lesson?.title_khmer || 'មេរៀន'}
          </div>

          <div style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '11px',
            color: '#1A6B6B',
            background: 'rgba(26, 107, 107, 0.1)',
            padding: '4px 8px',
            borderRadius: '6px',
            display: 'inline-block',
            marginBottom: '12px',
          }}>
            {lesson.progress_percent || 0}% completed
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: 'Battambang, serif',
              fontSize: '13px',
              color: '#E8913A',
              fontWeight: '600',
            }}>
              ✨ {lesson.lesson?.word_count - (lesson.words_learned || 0)} ពាក្យនៅសល់
            </div>

            <button
              onClick={onStart}
              style={{
                padding: '8px 20px',
                background: '#1A6B6B',
                border: 'none',
                borderRadius: '10px',
                fontFamily: 'Battambang, serif',
                fontSize: '13px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              បន្ត
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Quick Practice Card
function PracticeCard({ icon, title, subtitle, duration, highlight, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: highlight
          ? 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
          : '#fff',
        borderRadius: '16px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 25px rgba(0,0,0,0.12)'
          : '0 4px 15px rgba(0,0,0,0.06)',
        border: highlight
          ? '2px solid #FFD700'
          : '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <div style={{
        fontSize: '32px',
        marginBottom: '12px',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s ease',
      }}>
        {icon}
      </div>

      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '14px',
        fontWeight: '700',
        color: '#333',
        marginBottom: '4px',
      }}>
        {title}
      </div>

      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '11px',
        color: '#666',
        marginBottom: '8px',
        lineHeight: 1.4,
      }}>
        {subtitle}
      </div>

      <div style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '11px',
        color: highlight ? '#E8913A' : '#1A6B6B',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {highlight ? '🏆' : '⏱️'} {duration}
      </div>
    </div>
  )
}

// Memory Strength Chart
function MemoryStrengthChart({ data }) {
  const chartData = data && data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0]
  const maxValue = Math.max(...chartData, 1)
  const days = ['ស', 'អ', 'ព', 'ព្រ', 'សុ', 'ស', 'អា']

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: '80px',
      gap: '8px',
    }}>
      {chartData.map((value, index) => (
        <div key={index} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            height: `${Math.max((value / maxValue) * 60, 4)}px`,
            background: index === chartData.length - 1
              ? 'linear-gradient(180deg, #E8913A 0%, #D4791F 100%)'
              : 'linear-gradient(180deg, #1A6B6B 0%, #0D4F4F 100%)',
            borderRadius: '4px 4px 0 0',
            transition: 'height 0.5s ease',
            marginBottom: '4px',
          }} />
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '10px',
            color: '#666',
          }}>
            {days[index]}
          </div>
        </div>
      ))}
    </div>
  )
}

// Stats Progress Bar
function StatBar({ label, value, total, color }) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
      }}>
        <span style={{
          fontFamily: 'Battambang, serif',
          fontSize: '12px',
          color: '#666',
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          fontWeight: '600',
          color: '#333',
        }}>
          {value}
        </span>
      </div>
      <div style={{
        height: '8px',
        background: '#E0E0E0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: color,
          borderRadius: '4px',
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  )
}

// Mini Calendar
function MiniCalendar({ studyDays = [] }) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const todayDate = today.getDate()

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  // Get first day of month (0 = Sunday)
  const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay()

  const dayNames = ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស']
  const monthNames = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
    'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']

  // Extract day numbers from study days
  const studiedDayNumbers = studyDays.map(sd => new Date(sd.study_date).getDate())

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '14px',
        fontWeight: '700',
        color: '#333',
        marginBottom: '12px',
        textAlign: 'center',
      }}>
        {monthNames[currentMonth]} {currentYear}
      </div>

      {/* Day names */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px',
      }}>
        {dayNames.map((day, i) => (
          <div key={i} style={{
            fontFamily: 'Battambang, serif',
            fontSize: '10px',
            color: '#999',
            textAlign: 'center',
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
      }}>
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const isStudied = studiedDayNumbers.includes(day)
          const isToday = day === todayDate

          return (
            <div
              key={day}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '11px',
                fontWeight: isToday ? '700' : '400',
                color: isToday ? '#fff' : isStudied ? '#1A6B6B' : '#999',
                background: isToday
                  ? 'linear-gradient(135deg, #E8913A 0%, #D4791F 100%)'
                  : isStudied
                    ? 'rgba(26, 107, 107, 0.1)'
                    : 'transparent',
                position: 'relative',
              }}
            >
              {day}
              {isStudied && !isToday && (
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#4CAF50',
                }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{
        height: '160px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '20px',
      }} />
      <div style={{
        height: '100px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '16px',
      }} />
    </div>
  )
}

export default function PracticeScreen() {
  const navigate = useNavigate()
  const { profile } = useAuth()

  // Fetch real data from hooks
  const { data: dueReviewsCount = 0, isLoading: loadingReviews } = useDueReviewsCount()
  const { data: continueLearning, isLoading: loadingContinue } = useContinueLearning()
  const { data: overallStats, isLoading: loadingStats } = useOverallStats()
  const { data: learnedWordsCount = 0 } = useLearnedWordsCount()
  const { data: totalQuizzes = 0 } = useTotalQuizzesTaken()

  // Get study days for current month
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]
  const { data: studyDays = [] } = useStudyDays(startOfMonth, endOfMonth)

  // Calculate stats
  const stats = useMemo(() => {
    const totalLearned = learnedWordsCount || 0
    const mastered = overallStats?.wordsMastered || 0
    const reviewing = Math.max(0, totalLearned - mastered)
    const learning = overallStats?.wordsLearning || 0

    // Calculate retention rate (correct reviews / total reviews)
    const retentionRate = 87 // This would come from actual review data

    // Memory strength for last 7 days (placeholder - would need daily data)
    const memoryStrength = studyDays.slice(-7).map(day => day.words_studied || 0)
    while (memoryStrength.length < 7) memoryStrength.unshift(0)

    return {
      totalLearned,
      mastered,
      reviewing,
      learning,
      retentionRate,
      memoryStrength,
      bestScore: totalQuizzes,
    }
  }, [learnedWordsCount, overallStats, studyDays, totalQuizzes])

  const isLoading = loadingReviews || loadingContinue || loadingStats

  if (isLoading) {
    return (
      <div className="screen" style={{
        background: 'linear-gradient(180deg, #F8F6F0 0%, #F0EDE5 100%)',
      }}>
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className="screen" style={{
      background: 'linear-gradient(180deg, #F8F6F0 0%, #F0EDE5 100%)',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        <div>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '24px',
            fontWeight: '700',
            color: '#333',
          }}>
            លំហាត់
          </div>
          <div style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '12px',
            color: '#666',
          }}>
            Practice & Review
          </div>
        </div>

        <StreakBadge streak={profile?.current_streak} />
      </div>

      {/* Scrollable Content */}
      <div className="screen-content">
        {/* Today's Review Section */}
        <div style={{ marginBottom: '20px' }}>
          {dueReviewsCount > 0 ? (
            <ReviewDueCard
              reviewsDue={dueReviewsCount}
              onReview={() => navigate('/practice/review')}
            />
          ) : (
            <AllDoneCard />
          )}
        </div>

        {/* Continue Learning Card */}
        {continueLearning && (
          <div style={{ marginBottom: '24px' }}>
            <NewWordsCard
              lesson={continueLearning}
              onStart={() => navigate(`/flashcard/${continueLearning.lesson_id}`)}
            />
          </div>
        )}

        {/* Quick Practice Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span>⚡</span>
            <span>លំហាត់រហ័ស</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}>
            <PracticeCard
              icon="🎲"
              title="តេស្តចៃដន្យ"
              subtitle="សំណួរចៃដន្យពីពាក្យទាំងអស់"
              duration="5 នាទី"
              onClick={() => navigate('/practice/random')}
            />
            <PracticeCard
              icon="🎧"
              title="លំហាត់ស្តាប់"
              subtitle="ស្តាប់ និងជ្រើសរើស"
              duration="5 នាទី"
              onClick={() => navigate('/practice/listening')}
            />
            <PracticeCard
              icon="⚡"
              title="ល្បឿនលឿន"
              subtitle="ឆ្លើយឱ្យលឿនតាមដែលអាច"
              duration="3 នាទី"
              onClick={() => navigate('/practice/speed')}
            />
            <PracticeCard
              icon="🏆"
              title="ការប្រកួត"
              subtitle="ប្រកួតជាមួយខ្លួនឯង"
              duration={`តេស្តសរុប: ${totalQuizzes}`}
              highlight
              onClick={() => navigate('/practice/challenge')}
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span>📊</span>
            <span>ស្ថិតិរបស់អ្នក</span>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
            marginBottom: '12px',
          }}>
            {/* Memory Strength */}
            <div style={{
              fontFamily: 'Battambang, serif',
              fontSize: '13px',
              color: '#666',
              marginBottom: '12px',
            }}>
              កម្លាំងចងចាំ (៧ ថ្ងៃចុងក្រោយ)
            </div>
            <MemoryStrengthChart data={stats.memoryStrength} />
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          }}>
            {/* Word Status Bars */}
            <StatBar
              label="កំពុងស្ទាត់ (Mastered)"
              value={stats.mastered}
              total={stats.totalLearned || 1}
              color="linear-gradient(90deg, #4CAF50, #8BC34A)"
            />
            <StatBar
              label="កំពុងពិនិត្យ (Reviewing)"
              value={stats.reviewing}
              total={stats.totalLearned || 1}
              color="linear-gradient(90deg, #E8913A, #FFB74D)"
            />
            <StatBar
              label="កំពុងរៀន (Learning)"
              value={stats.learning}
              total={stats.totalLearned || 1}
              color="linear-gradient(90deg, #1A6B6B, #4DB6AC)"
            />

            {/* Summary Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #eee',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#1A6B6B',
                }}>
                  {stats.totalLearned}
                </div>
                <div style={{
                  fontFamily: 'Battambang, serif',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  ពាក្យបានរៀន
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#4CAF50',
                }}>
                  {stats.mastered}
                </div>
                <div style={{
                  fontFamily: 'Battambang, serif',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  ពាក្យបានស្ទាត់
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#E8913A',
                }}>
                  {stats.retentionRate}%
                </div>
                <div style={{
                  fontFamily: 'Battambang, serif',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  រក្សាអត្រា
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Calendar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span>📅</span>
            <span>ប្រតិទិនការរៀន</span>
          </div>

          <MiniCalendar studyDays={studyDays} />
        </div>

        {/* Bottom padding */}
        <div style={{ height: '20px' }} />
      </div>
    </div>
  )
}
