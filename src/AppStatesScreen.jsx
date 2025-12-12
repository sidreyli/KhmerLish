import { useState, useEffect } from 'react';

// Shimmer animation for skeleton loaders
const shimmerStyle = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  
  @keyframes wave {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }
  
  @keyframes confettiFall {
    0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  
  @keyframes celebrate {
    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
`;

// Skeleton Component
function Skeleton({ width, height, borderRadius = '8px', style = {} }) {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, #E0E0E0 25%, #F0F0F0 50%, #E0E0E0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s ease-in-out infinite',
      ...style,
    }} />
  );
}

// Offline Banner Component
function OfflineBanner({ onDismiss }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      borderBottom: '1px solid rgba(255, 152, 0, 0.2)',
    }}>
      <span style={{ fontSize: '20px' }}>📡</span>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '13px',
          fontWeight: '600',
          color: '#E65100',
          marginBottom: '2px',
        }}>
          អ្នកកំពុងប្រើដោយគ្មានអ៊ីនធឺណិត
        </div>
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '11px',
          color: '#F57C00',
        }}>
          មេរៀនដែលបានទាញយកនៅតែដំណើរការ
        </div>
      </div>
      <button
        onClick={onDismiss}
        style={{
          background: 'none',
          border: 'none',
          padding: '4px',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#E65100',
          opacity: 0.7,
        }}
      >
        ✕
      </button>
    </div>
  );
}

// Illustration Components
function NoSignalIllustration() {
  return (
    <div style={{
      width: '160px',
      height: '160px',
      margin: '0 auto 24px',
      position: 'relative',
    }}>
      {/* Phone body */}
      <div style={{
        width: '80px',
        height: '140px',
        background: 'linear-gradient(135deg, #37474F 0%, #263238 100%)',
        borderRadius: '16px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Screen */}
        <div style={{
          width: '68px',
          height: '120px',
          background: '#546E7A',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* No signal icon */}
          <div style={{
            fontSize: '32px',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            📵
          </div>
        </div>
      </div>
      {/* Signal waves (crossed out) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '24px',
        opacity: 0.5,
      }}>
        〰️
      </div>
    </div>
  );
}

function EmptyBookshelfIllustration() {
  return (
    <div style={{
      width: '160px',
      height: '140px',
      margin: '0 auto 24px',
      position: 'relative',
    }}>
      {/* Bookshelf */}
      <div style={{
        width: '140px',
        height: '100px',
        background: 'linear-gradient(180deg, #8D6E63 0%, #6D4C41 100%)',
        borderRadius: '8px',
        position: 'absolute',
        left: '50%',
        bottom: '0',
        transform: 'translateX(-50%)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      }}>
        {/* Shelves */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '8px',
          right: '8px',
          height: '4px',
          background: '#5D4037',
          borderRadius: '2px',
        }} />
        <div style={{
          position: 'absolute',
          top: '65px',
          left: '8px',
          right: '8px',
          height: '4px',
          background: '#5D4037',
          borderRadius: '2px',
        }} />
      </div>
      {/* Dust particle */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '20px',
        animation: 'float 3s ease-in-out infinite',
      }}>
        💨
      </div>
    </div>
  );
}

function HappyCharacterIllustration() {
  return (
    <div style={{
      width: '160px',
      height: '160px',
      margin: '0 auto 24px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Character */}
      <div style={{
        fontSize: '80px',
        animation: 'float 3s ease-in-out infinite',
      }}>
        😌
      </div>
      {/* Sparkles */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        fontSize: '24px',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>✨</div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '20px',
        animation: 'pulse 1.5s ease-in-out infinite 0.5s',
      }}>⭐</div>
    </div>
  );
}

function QuizPaperIllustration() {
  return (
    <div style={{
      width: '160px',
      height: '160px',
      margin: '0 auto 24px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Paper */}
      <div style={{
        width: '100px',
        height: '130px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        position: 'relative',
        transform: 'rotate(-5deg)',
      }}>
        {/* Lines */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: 'absolute',
            top: `${30 + i * 24}px`,
            left: '16px',
            right: '16px',
            height: '8px',
            background: '#E0E0E0',
            borderRadius: '4px',
          }} />
        ))}
      </div>
      {/* Question mark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '48px',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        ❓
      </div>
    </div>
  );
}

function ConfusedCharacterIllustration() {
  return (
    <div style={{
      width: '160px',
      height: '160px',
      margin: '0 auto 24px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Character */}
      <div style={{
        fontSize: '80px',
        animation: 'wave 2s ease-in-out infinite',
      }}>
        😅
      </div>
      {/* Error symbols */}
      <div style={{
        position: 'absolute',
        top: '0px',
        right: '30px',
        fontSize: '24px',
        color: '#F44336',
      }}>⚠️</div>
    </div>
  );
}

// Button Component
function ActionButton({ children, variant = 'primary', onClick, fullWidth = true }) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #1A6B6B 0%, #0D4F4F 100%)',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(26, 107, 107, 0.3)',
    },
    secondary: {
      background: '#fff',
      color: '#1A6B6B',
      border: '2px solid #1A6B6B',
    },
    warning: {
      background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px 24px',
        borderRadius: '12px',
        border: 'none',
        fontFamily: 'Battambang, serif',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...variants[variant],
      }}
    >
      {children}
    </button>
  );
}

// Empty State Container
function EmptyState({ illustration, title, subtitle, hint, children }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 32px',
      textAlign: 'center',
    }}>
      {illustration}
      
      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '22px',
        fontWeight: '700',
        color: '#333',
        marginBottom: '8px',
      }}>
        {title}
      </div>
      
      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '14px',
        color: '#666',
        marginBottom: '8px',
        lineHeight: 1.6,
      }}>
        {subtitle}
      </div>
      
      {hint && (
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '12px',
          color: '#999',
          marginBottom: '24px',
        }}>
          {hint}
        </div>
      )}
      
      <div style={{ width: '100%', maxWidth: '280px', marginTop: '16px' }}>
        {children}
      </div>
    </div>
  );
}

// Loading Skeletons
function HomeScreenSkeleton() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Header skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <Skeleton width="120px" height="24px" style={{ marginBottom: '8px' }} />
          <Skeleton width="80px" height="16px" />
        </div>
        <Skeleton width="40px" height="40px" borderRadius="50%" />
      </div>
      
      {/* Daily goal card */}
      <Skeleton width="100%" height="140px" borderRadius="16px" style={{ marginBottom: '16px' }} />
      
      {/* Review card */}
      <Skeleton width="100%" height="100px" borderRadius="16px" style={{ marginBottom: '16px' }} />
      
      {/* Continue learning card */}
      <Skeleton width="100%" height="80px" borderRadius="16px" style={{ marginBottom: '24px' }} />
      
      {/* Stats row */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Skeleton width="100%" height="70px" borderRadius="12px" />
        <Skeleton width="100%" height="70px" borderRadius="12px" />
        <Skeleton width="100%" height="70px" borderRadius="12px" />
      </div>
    </div>
  );
}

function LessonListSkeleton() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <Skeleton width="140px" height="28px" style={{ marginBottom: '20px' }} />
      
      {/* Category pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <Skeleton width="80px" height="32px" borderRadius="16px" />
        <Skeleton width="100px" height="32px" borderRadius="16px" />
        <Skeleton width="70px" height="32px" borderRadius="16px" />
      </div>
      
      {/* Lesson cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} width="100%" height="160px" borderRadius="16px" />
        ))}
      </div>
    </div>
  );
}

function ProfileStatsSkeleton() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
        <Skeleton width="100px" height="100px" borderRadius="50%" style={{ marginBottom: '16px' }} />
        <Skeleton width="120px" height="24px" style={{ marginBottom: '8px' }} />
        <Skeleton width="80px" height="16px" />
      </div>
      
      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[0, 1, 2, 3].map(i => (
          <Skeleton key={i} width="100%" height="80px" borderRadius="16px" />
        ))}
      </div>
      
      {/* Settings list */}
      <Skeleton width="100%" height="200px" borderRadius="16px" />
    </div>
  );
}

// Error State Component
function ErrorState({ errorDetails, onRetry, onGoBack }) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <EmptyState
      illustration={<ConfusedCharacterIllustration />}
      title="មានបញ្ហាកើតឡើង"
      subtitle="សូមអភ័យទោស មានកំហុសមួយបានកើតឡើង"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <ActionButton onClick={onRetry}>
          🔄 ព្យាយាមម្តងទៀត
        </ActionButton>
        <ActionButton variant="secondary" onClick={onGoBack}>
          ← ត្រឡប់ក្រោយ
        </ActionButton>
        
        {errorDetails && (
          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '12px',
                color: '#999',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {showDetails ? 'Hide details' : 'Show error details'}
            </button>
            
            {showDetails && (
              <div style={{
                marginTop: '8px',
                padding: '12px',
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '11px',
                color: '#666',
                textAlign: 'left',
                wordBreak: 'break-all',
              }}>
                {errorDetails}
              </div>
            )}
          </div>
        )}
      </div>
    </EmptyState>
  );
}

// Celebration Overlay
function CelebrationOverlay({ type, onDismiss }) {
  const celebrations = {
    firstLesson: {
      emoji: '🎓',
      title: 'មេរៀនដំបូង!',
      subtitle: 'អ្នកបានបញ្ចប់មេរៀនដំបូងរបស់អ្នក',
      reward: '+50 XP',
    },
    firstQuiz: {
      emoji: '📝',
      title: 'តេស្តដំបូង!',
      subtitle: 'អ្នកបានបញ្ចប់តេស្តដំបូងរបស់អ្នក',
      reward: '+75 XP',
    },
    weekStreak: {
      emoji: '🔥',
      title: '7 ថ្ងៃ Streak!',
      subtitle: 'អ្នកបានរៀនរៀងរាល់ថ្ងៃ ១សប្តាហ៍ហើយ',
      reward: '+100 XP',
    },
  };
  
  const data = celebrations[type];
  
  // Confetti particles
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    color: ['#FFD700', '#E8913A', '#4CAF50', '#2196F3', '#9C27B0'][Math.floor(Math.random() * 5)],
  }));
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}>
      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            top: 0,
            left: c.left,
            width: '10px',
            height: '10px',
            background: c.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall 3s ease-out ${c.delay}s forwards`,
          }}
        />
      ))}
      
      {/* Card */}
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px 32px',
        textAlign: 'center',
        maxWidth: '300px',
        animation: 'celebrate 0.5s ease-out',
        position: 'relative',
      }}>
        <div style={{
          fontSize: '80px',
          marginBottom: '16px',
          animation: 'bounce 1s ease-in-out infinite',
        }}>
          {data.emoji}
        </div>
        
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '24px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '8px',
        }}>
          {data.title}
        </div>
        
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '14px',
          color: '#666',
          marginBottom: '20px',
        }}>
          {data.subtitle}
        </div>
        
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
          borderRadius: '20px',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '18px',
          fontWeight: '800',
          color: '#fff',
          marginBottom: '24px',
          boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
        }}>
          {data.reward}
        </div>
        
        <ActionButton onClick={onDismiss}>
          អស្ចារ្យ! 🎉
        </ActionButton>
      </div>
    </div>
  );
}

// Main Component
export default function AppStatesScreen() {
  const [currentState, setCurrentState] = useState('offline-banner');
  const [showBanner, setShowBanner] = useState(true);
  const [showCelebration, setShowCelebration] = useState(true);
  
  const states = [
    { id: 'offline-banner', label: 'Offline Banner' },
    { id: 'offline-screen', label: 'Offline Screen' },
    { id: 'empty-lessons', label: 'No Lessons' },
    { id: 'empty-reviews', label: 'No Reviews' },
    { id: 'empty-quiz', label: 'No Quizzes' },
    { id: 'loading-home', label: 'Loading Home' },
    { id: 'loading-lessons', label: 'Loading List' },
    { id: 'loading-profile', label: 'Loading Profile' },
    { id: 'error', label: 'Error' },
    { id: 'celebration-lesson', label: 'First Lesson' },
    { id: 'celebration-quiz', label: 'First Quiz' },
    { id: 'celebration-streak', label: '7-Day Streak' },
  ];
  
  const renderState = () => {
    switch (currentState) {
      case 'offline-banner':
        return (
          <div style={{ background: '#F8F6F0', height: '100%' }}>
            {showBanner && <OfflineBanner onDismiss={() => setShowBanner(false)} />}
            <HomeScreenSkeleton />
            {!showBanner && (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <button
                  onClick={() => setShowBanner(true)}
                  style={{
                    padding: '8px 16px',
                    background: '#E8913A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Show Banner Again
                </button>
              </div>
            )}
          </div>
        );
        
      case 'offline-screen':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <EmptyState
              illustration={<NoSignalIllustration />}
              title="គ្មានអ៊ីនធឺណិត"
              subtitle="មុខងារនេះត្រូវការអ៊ីនធឺណិត"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ActionButton>
                  📥 ទៅមេរៀនដែលបានទាញយក
                </ActionButton>
                <ActionButton variant="secondary">
                  🔄 ព្យាយាមម្តងទៀត
                </ActionButton>
              </div>
            </EmptyState>
          </div>
        );
        
      case 'empty-lessons':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <EmptyState
              illustration={<EmptyBookshelfIllustration />}
              title="មិនទាន់មានមេរៀន"
              subtitle="ទាញយកមេរៀនដំបូងរបស់អ្នក"
            >
              <ActionButton>
                📚 រុករក មេរៀន
              </ActionButton>
            </EmptyState>
          </div>
        );
        
      case 'empty-reviews':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <EmptyState
              illustration={<HappyCharacterIllustration />}
              title="អស់ហើយ! 🎉"
              subtitle="គ្មានពាក្យត្រូវពិនិត្យថ្ងៃនេះ"
              hint="ពិនិត្យបន្ទាប់: ថ្ងៃស្អែក ម៉ោង 9:00"
            >
              <ActionButton>
                📖 រៀនពាក្យថ្មី
              </ActionButton>
            </EmptyState>
          </div>
        );
        
      case 'empty-quiz':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <EmptyState
              illustration={<QuizPaperIllustration />}
              title="មិនទាន់បានធ្វើតេស្ត"
              subtitle="បញ្ចប់មេរៀនដើម្បីបើកតេស្ត"
            >
              <ActionButton>
                📚 ទៅកាន់មេរៀន
              </ActionButton>
            </EmptyState>
          </div>
        );
        
      case 'loading-home':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', overflow: 'auto' }}>
            <HomeScreenSkeleton />
          </div>
        );
        
      case 'loading-lessons':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', overflow: 'auto' }}>
            <LessonListSkeleton />
          </div>
        );
        
      case 'loading-profile':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', overflow: 'auto' }}>
            <ProfileStatsSkeleton />
          </div>
        );
        
      case 'error':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ErrorState
              errorDetails="Error: NetworkError - Failed to fetch lesson data. Status: 500. Request ID: abc-123-xyz"
              onRetry={() => console.log('Retry')}
              onGoBack={() => console.log('Go back')}
            />
          </div>
        );
        
      case 'celebration-lesson':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', position: 'relative' }}>
            <HomeScreenSkeleton />
            {showCelebration && (
              <CelebrationOverlay 
                type="firstLesson" 
                onDismiss={() => setShowCelebration(false)} 
              />
            )}
            {!showCelebration && (
              <div style={{ 
                position: 'absolute', 
                bottom: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)' 
              }}>
                <button
                  onClick={() => setShowCelebration(true)}
                  style={{
                    padding: '8px 16px',
                    background: '#E8913A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Show Celebration
                </button>
              </div>
            )}
          </div>
        );
        
      case 'celebration-quiz':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', position: 'relative' }}>
            <HomeScreenSkeleton />
            {showCelebration && (
              <CelebrationOverlay 
                type="firstQuiz" 
                onDismiss={() => setShowCelebration(false)} 
              />
            )}
            {!showCelebration && (
              <div style={{ 
                position: 'absolute', 
                bottom: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)' 
              }}>
                <button
                  onClick={() => setShowCelebration(true)}
                  style={{
                    padding: '8px 16px',
                    background: '#E8913A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Show Celebration
                </button>
              </div>
            )}
          </div>
        );
        
      case 'celebration-streak':
        return (
          <div style={{ background: '#F8F6F0', height: '100%', position: 'relative' }}>
            <HomeScreenSkeleton />
            {showCelebration && (
              <CelebrationOverlay 
                type="weekStreak" 
                onDismiss={() => setShowCelebration(false)} 
              />
            )}
            {!showCelebration && (
              <div style={{ 
                position: 'absolute', 
                bottom: '20px', 
                left: '50%', 
                transform: 'translateX(-50%)' 
              }}>
                <button
                  onClick={() => setShowCelebration(true)}
                  style={{
                    padding: '8px 16px',
                    background: '#E8913A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Show Celebration
                </button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Reset celebration when changing states
  useEffect(() => {
    setShowCelebration(true);
    setShowBanner(true);
  }, [currentState]);
  
  return (
    <div style={{
      width: '375px',
      height: '812px',
      background: '#fff',
      fontFamily: 'system-ui, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{shimmerStyle}</style>
      
      {/* State Selector */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #E0E0E0',
        padding: '12px',
      }}>
        <div style={{
          fontFamily: 'Battambang, serif',
          fontSize: '14px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          App States Demo
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
        }}>
          {states.map(state => (
            <button
              key={state.id}
              onClick={() => setCurrentState(state.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '12px',
                border: 'none',
                background: currentState === state.id 
                  ? '#1A6B6B' 
                  : 'rgba(0,0,0,0.06)',
                color: currentState === state.id ? '#fff' : '#666',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* State Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {renderState()}
      </div>
    </div>
  );
}
