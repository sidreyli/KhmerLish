import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useAchievements, useOverallStats } from './hooks/useProgress'
import { useLearnedWordsCount } from './hooks/useVocabulary'
import { useTotalQuizzesTaken } from './hooks/useQuiz'

// Calculate level from XP
const calculateLevel = (xp) => {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]
  const levelNames = [
    { level: 'A1', name: 'អ្នកចាប់ផ្តើម' },
    { level: 'A1', name: 'អ្នកចាប់ផ្តើម' },
    { level: 'A1', name: 'អ្នកចាប់ផ្តើម' },
    { level: 'A2', name: 'បឋម' },
    { level: 'A2', name: 'បឋម' },
    { level: 'B1', name: 'មធ្យម' },
    { level: 'B1', name: 'មធ្យម' },
    { level: 'B2', name: 'កម្រិតខ្ពស់' },
    { level: 'B2', name: 'កម្រិតខ្ពស់' },
    { level: 'C1', name: 'ជំនាញ' },
  ]

  let currentLevel = 0
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      currentLevel = i
    }
  }

  const nextThreshold = thresholds[currentLevel + 1] || thresholds[thresholds.length - 1]
  const currentThreshold = thresholds[currentLevel]
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100

  return {
    level: levelNames[currentLevel].level,
    name: levelNames[currentLevel].name,
    progress: Math.min(progress, 100),
    xpToNext: nextThreshold - xp,
  }
}

// Avatar Component
function Avatar({ initials, size = 100, showEdit = false, onEdit }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1A6B6B 0%, #0D4F4F 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(26, 107, 107, 0.3)',
        border: '4px solid #fff',
      }}>
        <span style={{
          fontFamily: 'Battambang, serif',
          fontSize: size * 0.4,
          fontWeight: '700',
          color: '#fff',
        }}>
          {initials || '?'}
        </span>
      </div>

      {showEdit && (
        <button
          onClick={onEdit}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#E8913A',
            border: '3px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: '14px' }}>✏️</span>
        </button>
      )}
    </div>
  )
}

// Level Badge
function LevelBadge({ level, levelName }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, #E8913A 0%, #D4791F 100%)',
      padding: '6px 14px',
      borderRadius: '20px',
      boxShadow: '0 2px 8px rgba(232, 145, 58, 0.3)',
    }}>
      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        fontWeight: '800',
        color: '#fff',
      }}>
        {level}
      </span>
      <span style={{
        width: '1px',
        height: '14px',
        background: 'rgba(255,255,255,0.3)',
      }} />
      <span style={{
        fontFamily: 'Battambang, serif',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.9)',
      }}>
        {levelName}
      </span>
    </div>
  )
}

// Stat Card
function StatCard({ icon, value, label }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '20px',
        fontWeight: '800',
        color: '#333',
        marginBottom: '2px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '11px',
        color: '#666',
      }}>
        {label}
      </div>
    </div>
  )
}

// Achievement Badge
function AchievementBadge({ achievement }) {
  const earned = !!achievement.earned_at
  const icon = achievement.achievement?.emoji || '🏅'
  const title = achievement.achievement?.title_khmer || achievement.title_khmer
  const progress = achievement.progress

  return (
    <div style={{
      minWidth: '100px',
      padding: '16px 12px',
      background: earned
        ? 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
        : 'rgba(0,0,0,0.04)',
      borderRadius: '16px',
      textAlign: 'center',
      border: earned ? '2px solid #FFD700' : '1px solid rgba(0,0,0,0.08)',
      opacity: earned ? 1 : 0.7,
      position: 'relative',
    }}>
      <div style={{
        fontSize: '32px',
        marginBottom: '8px',
        filter: earned ? 'none' : 'grayscale(1)',
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '11px',
        fontWeight: '600',
        color: earned ? '#333' : '#666',
        marginBottom: '2px',
      }}>
        {title}
      </div>
      {progress && !earned && (
        <div style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '10px',
          color: '#E8913A',
          marginTop: '4px',
        }}>
          {progress}
        </div>
      )}
      {!earned && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '12px',
        }}>
          🔒
        </div>
      )}
    </div>
  )
}

// Setting Item
function SettingItem({ icon, title, subtitle, children, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: danger ? 'rgba(244, 67, 54, 0.1)' : 'rgba(26, 107, 107, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        marginRight: '12px',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '14px',
          fontWeight: '600',
          color: danger ? '#F44336' : '#333',
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '12px',
            color: '#666',
            marginTop: '2px',
          }}>
            {subtitle}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}

// Toggle Switch
function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: '50px',
        height: '28px',
        borderRadius: '14px',
        background: value
          ? 'linear-gradient(135deg, #1A6B6B 0%, #0D4F4F 100%)'
          : '#E0E0E0',
        padding: '2px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        transform: value ? 'translateX(22px)' : 'translateX(0)',
        transition: 'transform 0.2s ease',
      }} />
    </div>
  )
}

// Theme Selector
function ThemeSelector({ value, onChange }) {
  const options = [
    { id: 'light', label: '☀️' },
    { id: 'dark', label: '🌙' },
    { id: 'system', label: '⚙️' },
  ]

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      background: '#F0F0F0',
      borderRadius: '10px',
      padding: '4px',
    }}>
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: 'none',
            background: value === opt.id ? '#fff' : 'transparent',
            boxShadow: value === opt.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s ease',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// Storage Progress
function StorageProgress({ used, total }) {
  const percentage = (used / total) * 100

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}>
        <span style={{
          fontFamily: 'Battambang, serif',
          fontSize: '13px',
          color: '#333',
        }}>
          ទំហំផ្ទុក
        </span>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '13px',
          color: '#666',
        }}>
          {used} MB / {total} MB
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
          background: percentage > 80
            ? 'linear-gradient(90deg, #FF9800, #F44336)'
            : 'linear-gradient(90deg, #1A6B6B, #4DB6AC)',
          borderRadius: '4px',
        }} />
      </div>
    </div>
  )
}

// Section Header
function SectionHeader({ title, icon }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      marginTop: '24px',
    }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{
        fontFamily: 'Battambang, serif',
        fontSize: '18px',
        fontWeight: '700',
        color: '#333',
      }}>
        {title}
      </span>
    </div>
  )
}

// Confirmation Modal
function ConfirmModal({ title, message, confirmText, cancelText, onConfirm, onCancel, danger }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '24px',
        maxWidth: '300px',
        width: '100%',
        textAlign: 'center',
        animation: 'modalSlideUp 0.3s ease-out',
      }}>
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '18px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '12px',
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '14px',
          color: '#666',
          marginBottom: '24px',
          lineHeight: 1.6,
        }}>
          {message}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #E0E0E0',
              background: '#fff',
              fontFamily: 'Battambang, serif',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              background: danger
                ? 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)'
                : 'linear-gradient(135deg, #1A6B6B 0%, #0D4F4F 100%)',
              fontFamily: 'Battambang, serif',
              fontSize: '14px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '60px',
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        marginBottom: '16px',
      }} />
      <div style={{
        width: 120,
        height: 24,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '8px',
        marginBottom: '8px',
      }} />
      <div style={{
        width: 80,
        height: 32,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '16px',
      }} />
    </div>
  )
}

// Default achievements for users without any
const defaultAchievements = [
  { id: 1, achievement: { emoji: '🌟', title_khmer: 'មេរៀនដំបូង', title_english: 'First Lesson' }, earned_at: null },
  { id: 2, achievement: { emoji: '🔥', title_khmer: '7 ថ្ងៃ Streak', title_english: '7 Day Streak' }, earned_at: null },
  { id: 3, achievement: { emoji: '📚', title_khmer: '100 ពាក្យ', title_english: '100 Words' }, earned_at: null },
  { id: 4, achievement: { emoji: '⭐', title_khmer: 'Perfect Quiz', title_english: 'Perfect Quiz' }, earned_at: null },
  { id: 5, achievement: { emoji: '💯', title_khmer: '500 ពាក្យ', title_english: '500 Words' }, earned_at: null },
  { id: 6, achievement: { emoji: '🏆', title_khmer: '30 ថ្ងៃ Streak', title_english: '30 Day Streak' }, earned_at: null },
]

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { profile, signOut, isLoading: authLoading } = useAuth()

  // Fetch real data
  const { data: achievements = [] } = useAchievements()
  const { data: overallStats } = useOverallStats()
  const { data: learnedWordsCount = 0 } = useLearnedWordsCount()
  const { data: totalQuizzes = 0 } = useTotalQuizzesTaken()

  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [theme, setTheme] = useState('light')
  const [reminderTime, setReminderTime] = useState('09:00')
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Calculate user level from XP
  const levelInfo = useMemo(() => {
    return calculateLevel(profile?.xp || 0)
  }, [profile?.xp])

  // Get user initials
  const initials = useMemo(() => {
    if (!profile?.display_name) return '?'
    return profile.display_name.charAt(0).toUpperCase()
  }, [profile?.display_name])

  // Member since date
  const memberSince = useMemo(() => {
    if (!profile?.created_at) return ''
    const date = new Date(profile.created_at)
    const monthNames = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
      'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }, [profile?.created_at])

  // Use real achievements or defaults
  const displayAchievements = achievements.length > 0 ? achievements : defaultAchievements

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  if (authLoading) {
    return (
      <div className="screen" style={{
        background: 'linear-gradient(180deg, #F8F6F0 0%, #F0EDE5 100%)',
      }}>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
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
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Scrollable Content */}
      <div>
        {/* Profile Header */}
        <div style={{
          background: 'linear-gradient(180deg, #1A6B6B 0%, #0D4F4F 100%)',
          padding: '40px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '-30px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          <Avatar
            initials={initials}
            size={100}
            showEdit
            onEdit={() => console.log('Edit avatar')}
          />

          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff',
            marginTop: '16px',
            marginBottom: '4px',
          }}>
            {profile?.display_name || 'អ្នកប្រើប្រាស់'}
          </div>

          <div style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
          }}>
            {profile?.email || ''}
          </div>

          <LevelBadge level={levelInfo.level} levelName={levelInfo.name} />

          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '12px',
          }}>
            ចាប់ពី {memberSince}
          </div>
        </div>

        {/* Stats Cards - Overlapping header */}
        <div style={{
          padding: '0 20px',
          marginTop: '-40px',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}>
            <StatCard icon="⭐" value={(profile?.xp || 0).toLocaleString()} label="XP" />
            <StatCard icon="🔥" value={`${profile?.current_streak || 0} ថ្ងៃ`} label="Streak" />
            <StatCard icon="📖" value={learnedWordsCount} label="ពាក្យ" />
            <StatCard icon="✅" value={overallStats?.lessonsCompleted || 0} label="មេរៀន" />
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '0 20px 40px', position: 'relative', zIndex: 2 }}>
          {/* Achievements Section */}
          <SectionHeader icon="🏅" title="សមិទ្ធិផល" />

          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginLeft: '-20px',
            marginRight: '-20px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}>
            {displayAchievements.map((achievement, idx) => (
              <AchievementBadge key={achievement.id || idx} achievement={achievement} />
            ))}
          </div>

          {/* Settings Section */}
          <SectionHeader icon="⚙️" title="ការកំណត់" />

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '4px 16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          }}>
            <SettingItem
              icon="🌐"
              title="ភាសា"
              subtitle="ខ្មែរ"
              onClick={() => console.log('Change language')}
            >
              <span style={{ color: '#999', fontSize: '18px' }}>›</span>
            </SettingItem>

            <SettingItem
              icon="🎨"
              title="ស្បែក"
            >
              <ThemeSelector value={theme} onChange={setTheme} />
            </SettingItem>

            <SettingItem
              icon="🔊"
              title="សំឡេង"
            >
              <Toggle value={soundEnabled} onChange={setSoundEnabled} />
            </SettingItem>

            <SettingItem
              icon="🔔"
              title="ការជូនដំណឹង"
            >
              <Toggle value={notificationsEnabled} onChange={setNotificationsEnabled} />
            </SettingItem>

            <SettingItem
              icon="⏰"
              title="រំលឹកប្រចាំថ្ងៃ"
            >
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  color: '#333',
                }}
              />
            </SettingItem>
          </div>

          {/* Storage Section */}
          <SectionHeader icon="💾" title="ទំហំផ្ទុក" />

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          }}>
            <StorageProgress used={45} total={500} />

            <div style={{
              fontFamily: 'Battambang, serif',
              fontSize: '13px',
              color: '#666',
              marginTop: '12px',
              marginBottom: '16px',
            }}>
              មេរៀនបានទាញយក: <strong style={{ color: '#333' }}>0</strong>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid #1A6B6B',
                background: 'transparent',
                fontFamily: 'Battambang, serif',
                fontSize: '12px',
                color: '#1A6B6B',
                cursor: 'pointer',
              }}>
                គ្រប់គ្រងការទាញយក
              </button>
              <button style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid #E0E0E0',
                background: 'transparent',
                fontFamily: 'Battambang, serif',
                fontSize: '12px',
                color: '#666',
                cursor: 'pointer',
              }}>
                សម្អាត Cache
              </button>
            </div>
          </div>

          {/* Account Section */}
          <SectionHeader icon="👤" title="គណនី" />

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '4px 16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          }}>
            <SettingItem
              icon="📧"
              title="អ៊ីមែល"
              subtitle={profile?.email || 'Not set'}
            />

            <SettingItem
              icon="☁️"
              title="បានធ្វើសមកាលកម្ម"
              subtitle="✓ ថ្ងៃនេះ"
            />

            <SettingItem
              icon="🚪"
              title="ចាកចេញ"
              onClick={() => setShowSignOutModal(true)}
            />

            <SettingItem
              icon="🗑️"
              title="លុបគណនី"
              danger
              onClick={() => setShowDeleteModal(true)}
            />
          </div>

          {/* App Info Footer */}
          <div style={{
            marginTop: '32px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '12px',
              color: '#999',
              marginBottom: '16px',
            }}>
              កុងរៀន v1.0.0
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
            }}>
              <a href="#" style={{
                fontFamily: 'Battambang, serif',
                fontSize: '12px',
                color: '#1A6B6B',
                textDecoration: 'none',
              }}>
                អំពីកម្មវិធី
              </a>
              <a href="#" style={{
                fontFamily: 'Battambang, serif',
                fontSize: '12px',
                color: '#1A6B6B',
                textDecoration: 'none',
              }}>
                ឯកជនភាព
              </a>
              <a href="#" style={{
                fontFamily: 'Battambang, serif',
                fontSize: '12px',
                color: '#1A6B6B',
                textDecoration: 'none',
              }}>
                ជំនួយ
              </a>
            </div>

            <div style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '11px',
              color: '#bbb',
              marginTop: '16px',
            }}>
              Made with ❤️ for Khmer learners
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Modal */}
      {showSignOutModal && (
        <ConfirmModal
          title="ចាកចេញ?"
          message="តើអ្នកប្រាកដថាចង់ចាកចេញពីគណនីរបស់អ្នក?"
          confirmText="ចាកចេញ"
          cancelText="បោះបង់"
          onConfirm={handleSignOut}
          onCancel={() => setShowSignOutModal(false)}
        />
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="លុបគណនី?"
          message="ការលុបគណនីនឹងបាត់បង់ទិន្នន័យទាំងអស់។ សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។"
          confirmText="លុប"
          cancelText="បោះបង់"
          danger
          onConfirm={() => {
            console.log('Delete account')
            setShowDeleteModal(false)
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}
