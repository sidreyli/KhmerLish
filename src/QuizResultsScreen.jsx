import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Demo data - quiz results
const quizData = {
  passed: {
    score: 85,
    correct: 8,
    total: 10,
    timeTaken: '2:34',
    streakBonus: 1,
    xpBase: 50,
    xpBonus: 25,
    currentXP: 1250,
    nextLevelXP: 1500,
    level: 7,
  },
  failed: {
    score: 60,
    correct: 6,
    total: 10,
    timeTaken: '3:12',
    streakBonus: 0,
    xpBase: 30,
    xpBonus: 0,
    currentXP: 1180,
    nextLevelXP: 1500,
    level: 7,
  }
};

const questions = [
  { id: 1, question: '"Hello" ជាភាសាខ្មែរ', userAnswer: 'សួស្តី', correctAnswer: 'សួស្តី', isCorrect: true, explanation: '"សួស្តី" (suostei) is the standard Khmer greeting.' },
  { id: 2, question: '"Thank you" ជាភាសាខ្មែរ', userAnswer: 'អរគុណ', correctAnswer: 'អរគុណ', isCorrect: true, explanation: '"អរគុណ" (awkun) expresses gratitude.' },
  { id: 3, question: '"Water" ជាភាសាខ្មែរ', userAnswer: 'ទឹក', correctAnswer: 'ទឹក', isCorrect: true, explanation: '"ទឹក" (tuk) means water.' },
  { id: 4, question: '"Goodbye" ជាភាសាខ្មែរ', userAnswer: 'បាយ បាយ', correctAnswer: 'លាហើយ', isCorrect: false, explanation: '"លាហើយ" (lea haey) is the formal goodbye. "បាយ បាយ" is informal/borrowed.' },
  { id: 5, question: '"Food" ជាភាសាខ្មែរ', userAnswer: 'ម្ហូប', correctAnswer: 'ម្ហូប', isCorrect: true, explanation: '"ម្ហូប" (mahob) refers to food/cuisine.' },
  { id: 6, question: '"One" ជាភាសាខ្មែរ', userAnswer: 'មួយ', correctAnswer: 'មួយ', isCorrect: true, explanation: '"មួយ" (muoy) is the number one.' },
  { id: 7, question: '"Beautiful" ជាភាសាខ្មែរ', userAnswer: 'ល្អ', correctAnswer: 'ស្អាត', isCorrect: false, explanation: '"ស្អាត" (saat) means beautiful. "ល្អ" (laaw) means good.' },
  { id: 8, question: '"Friend" ជាភាសាខ្មែរ', userAnswer: 'មិត្ត', correctAnswer: 'មិត្ត', isCorrect: true, explanation: '"មិត្ត" (mitt) means friend.' },
  { id: 9, question: '"House" ជាភាសាខ្មែរ', userAnswer: 'ផ្ទះ', correctAnswer: 'ផ្ទះ', isCorrect: true, explanation: '"ផ្ទះ" (pteah) means house/home.' },
  { id: 10, question: '"Love" ជាភាសាខ្មែរ', userAnswer: 'ស្រលាញ់', correctAnswer: 'ស្រលាញ់', isCorrect: true, explanation: '"ស្រលាញ់" (srolanh) means love.' },
];

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
  };
  return <div style={style} />;
}

// Animated Score Circle
function ScoreCircle({ score, passed }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  
  useEffect(() => {
    // Animate number counting
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);
    
    // Animate fill
    setTimeout(() => {
      setFillProgress(score);
    }, 300);
    
    return () => clearInterval(timer);
  }, [score]);
  
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillAmount = (fillProgress / 100) * circumference;
  const center = size / 2;
  
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
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
          fontFamily: 'Nunito, sans-serif',
          fontSize: '48px',
          fontWeight: '800',
          color: '#fff',
          lineHeight: 1,
        }}>
          {animatedScore}%
        </div>
      </div>
    </div>
  );
}

// Animated Star
function AnimatedStar({ lit, delay, index }) {
  const [visible, setVisible] = useState(false);
  const [bounced, setBounced] = useState(false);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), delay);
    const timer2 = setTimeout(() => setBounced(true), delay + 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [delay]);
  
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
  );
}

// XP Animation Component
function XPDisplay({ xpBase, xpBonus, currentXP, nextLevelXP, level }) {
  const [showBase, setShowBase] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(currentXP - xpBase - xpBonus);
  
  const totalXP = xpBase + xpBonus;
  const progressPercent = (animatedXP / nextLevelXP) * 100;
  
  useEffect(() => {
    setTimeout(() => setShowBase(true), 800);
    setTimeout(() => setShowBonus(true), 1400);
    setTimeout(() => {
      setAnimatedXP(currentXP);
    }, 1000);
  }, [currentXP]);
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '24px',
    }}>
      {/* Total XP earned */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
      }}>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '32px',
          fontWeight: '800',
          color: '#FFD700',
          animation: 'xpPop 0.5s ease-out',
        }}>
          +{totalXP} XP
        </span>
      </div>
      
      {/* Breakdown */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Battambang, serif',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '8px',
          opacity: showBase ? 1 : 0,
          transform: showBase ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 0.3s ease-out',
        }}>
          <span>ពិន្ទុមូលដ្ឋាន:</span>
          <span style={{ color: '#4CAF50' }}>+{xpBase} XP</span>
        </div>
        {xpBonus > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Battambang, serif',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)',
            opacity: showBonus ? 1 : 0,
            transform: showBonus ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.3s ease-out',
          }}>
            <span>ពិន្ទុល្អ:</span>
            <span style={{ color: '#FFD700' }}>+{xpBonus} XP</span>
          </div>
        )}
      </div>
      
      {/* Level progress */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '6px',
        }}>
          <span>Level {level}</span>
          <span>{animatedXP}/{nextLevelXP} XP</span>
        </div>
        <div style={{
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #E8913A, #FFD700)',
            borderRadius: '4px',
            transition: 'width 1s ease-out',
          }} />
        </div>
      </div>
    </div>
  );
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
        fontFamily: 'Nunito, sans-serif',
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'Battambang, serif',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',
        marginTop: '2px',
      }}>
        {label}
      </div>
    </div>
  );
}

// Review Answer Item
function ReviewItem({ question, index, isExpanded, onToggle }) {
  return (
    <div style={{
      background: question.isCorrect 
        ? 'rgba(76, 175, 80, 0.1)' 
        : 'rgba(244, 67, 54, 0.1)',
      borderRadius: '12px',
      marginBottom: '8px',
      overflow: 'hidden',
      border: `1px solid ${question.isCorrect ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
    }}>
      <div 
        onClick={onToggle}
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}
      >
        {/* Status indicator */}
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: question.isCorrect ? '#4CAF50' : '#F44336',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          flexShrink: 0,
        }}>
          {question.isCorrect ? '✓' : '✗'}
        </div>
        
        {/* Question */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '14px',
            color: '#333',
          }}>
            {index + 1}. {question.question}
          </div>
        </div>
        
        {/* Expand indicator */}
        <div style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          color: '#666',
        }}>
          ▼
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div style={{
          padding: '0 16px 16px 56px',
          animation: 'slideDown 0.2s ease-out',
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '12px',
          }}>
            <div>
              <div style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '11px',
                color: '#666',
                marginBottom: '2px',
              }}>Your answer</div>
              <div style={{
                fontFamily: 'Battambang, serif',
                fontSize: '16px',
                color: question.isCorrect ? '#4CAF50' : '#F44336',
              }}>
                {question.userAnswer}
              </div>
            </div>
            {!question.isCorrect && (
              <div>
                <div style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '11px',
                  color: '#666',
                  marginBottom: '2px',
                }}>Correct answer</div>
                <div style={{
                  fontFamily: 'Battambang, serif',
                  fontSize: '16px',
                  color: '#4CAF50',
                }}>
                  {question.correctAnswer}
                </div>
              </div>
            )}
          </div>
          
          <div style={{
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '8px',
            padding: '10px 12px',
          }}>
            <div style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '13px',
              color: '#555',
              lineHeight: 1.5,
            }}>
              💡 {question.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: variant === 'tertiary' ? '12px 24px' : '16px 24px',
        borderRadius: '14px',
        border: 'none',
        fontFamily: 'Battambang, serif',
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
  );
}

// Share Button
function ShareButton() {
  const [copied, setCopied] = useState(false);
  
  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleShare}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: 'transparent',
        border: '1px dashed rgba(255,255,255,0.3)',
        borderRadius: '12px',
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'Battambang, serif',
        fontSize: '14px',
        cursor: 'pointer',
        margin: '0 auto',
        transition: 'all 0.2s ease',
      }}
    >
      {copied ? (
        <>✓ បានចម្លង!</>
      ) : (
        <>📤 ចែករំលែក</>
      )}
    </button>
  );
}

export default function QuizResultsScreen() {
  const [isPassed, setIsPassed] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [confettiVisible, setConfettiVisible] = useState(false);
  
  const data = isPassed ? quizData.passed : quizData.failed;
  
  // Determine stars based on score
  const getStars = (score) => {
    if (score === 100) return 3;
    if (score >= 85) return 2;
    if (score >= 70) return 1;
    return 0;
  };
  
  const starsEarned = getStars(data.score);
  
  // Trigger confetti for passed state
  useEffect(() => {
    if (isPassed) {
      setTimeout(() => setConfettiVisible(true), 500);
    } else {
      setConfettiVisible(false);
    }
  }, [isPassed]);
  
  // Generate confetti particles
  const confettiColors = ['#FFD700', '#E8913A', '#4CAF50', '#FF6B6B', '#64B5F6', '#BA68C8'];
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));
  
  const navigate = useNavigate()
  const { lessonId } = useParams()

  return (
    <div className="screen screen-fullscreen" style={{
      background: isPassed
        ? 'linear-gradient(180deg, #1A6B6B 0%, #0D4F4F 100%)'
        : 'linear-gradient(180deg, #5D4E6D 0%, #3D3250 100%)',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* CSS Animations */}
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
        
        @keyframes xpPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes encouragePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
      
      {/* Confetti */}
      {confettiVisible && isPassed && (
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
      
      {/* Demo Toggle */}
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
            fontFamily: 'Battambang, serif',
            fontSize: '28px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '8px',
            animation: isPassed ? 'float 3s ease-in-out infinite' : 'none',
          }}>
            {isPassed ? 'អស្ចារ្យ! 🎉' : 'ជិតបានហើយ! 💪'}
          </div>
          
          <div style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
          }}>
            {isPassed ? 'Amazing! You passed!' : 'Almost there! Keep going!'}
          </div>
          
          {/* Score Circle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '8px',
          }}>
            <ScoreCircle score={data.score} passed={isPassed} />
          </div>
          
          {/* Correct count */}
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '24px',
          }}>
            {data.correct}/{data.total} ត្រឹមត្រូវ
          </div>
          
          {/* Stars (only for passed) */}
          {isPassed && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              <AnimatedStar lit={starsEarned >= 1} delay={600} index={0} />
              <AnimatedStar lit={starsEarned >= 2} delay={900} index={1} />
              <AnimatedStar lit={starsEarned >= 3} delay={1200} index={2} />
            </div>
          )}
          
          {/* Encouraging message for failed */}
          {!isPassed && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
            }}>
              <div style={{
                fontFamily: 'Battambang, serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
              }}>
                សាកល្បងម្តងទៀត អ្នកអាចធ្វើបាន!
              </div>
              <div style={{
                fontFamily: 'Nunito, sans-serif',
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
            xpBase={data.xpBase}
            xpBonus={data.xpBonus}
            currentXP={data.currentXP}
            nextLevelXP={data.nextLevelXP}
            level={data.level}
          />
          
          {/* Stats Cards */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
          }}>
            <StatCard 
              icon="⏱️" 
              value={data.timeTaken} 
              label="រយៈពេល" 
            />
            <StatCard 
              icon="🎯" 
              value={`${data.score}%`} 
              label="ភាពត្រឹមត្រូវ" 
            />
            <StatCard 
              icon="🔥" 
              value={data.streakBonus > 0 ? `+${data.streakBonus}` : '—'} 
              label="Streak" 
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div style={{ padding: '0 24px 16px' }}>
          {isPassed ? (
            <>
              <ActionButton variant="primary" onClick={() => navigate('/lessons')}>
                បន្តមេរៀនបន្ទាប់ →
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={() => setShowReview(!showReview)}
              >
                📋 ពិនិត្យចម្លើយ
              </ActionButton>
              <ActionButton variant="tertiary" onClick={() => navigate(`/quiz/${lessonId || 'greetings'}`)}>
                🔄 ធ្វើម្តងទៀត
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton variant="primary" onClick={() => navigate(`/flashcard/${lessonId || 'greetings'}`)}>
                📚 រៀនម្តងទៀត
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={() => navigate(`/quiz/${lessonId || 'greetings'}`)}
              >
                🔄 ធ្វើតេស្តម្តងទៀត
              </ActionButton>
              <ActionButton
                variant="tertiary"
                onClick={() => setShowReview(!showReview)}
              >
                📋 ពិនិត្យចម្លើយ
              </ActionButton>
            </>
          )}
        </div>
        
        {/* Review Answers Section */}
        {showReview && (
          <div style={{
            background: '#fff',
            borderRadius: '24px 24px 0 0',
            padding: '24px',
            minHeight: '300px',
            animation: 'slideDown 0.3s ease-out',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <div style={{
                fontFamily: 'Battambang, serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#333',
              }}>
                ពិនិត្យចម្លើយ
              </div>
              <button
                onClick={() => setShowReview(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: '#666',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </div>
            
            {/* Summary */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
            }}>
              <div style={{
                flex: 1,
                background: 'rgba(76, 175, 80, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#4CAF50',
                  fontFamily: 'Nunito, sans-serif',
                }}>
                  {questions.filter(q => q.isCorrect).length}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  fontFamily: 'Battambang, serif',
                }}>
                  ត្រឹមត្រូវ
                </div>
              </div>
              <div style={{
                flex: 1,
                background: 'rgba(244, 67, 54, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#F44336',
                  fontFamily: 'Nunito, sans-serif',
                }}>
                  {questions.filter(q => !q.isCorrect).length}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  fontFamily: 'Battambang, serif',
                }}>
                  មិនត្រឹមត្រូវ
                </div>
              </div>
            </div>
            
            {/* Questions list */}
            <div>
              {questions.map((q, index) => (
                <ReviewItem
                  key={q.id}
                  question={q}
                  index={index}
                  isExpanded={expandedQuestion === q.id}
                  onToggle={() => setExpandedQuestion(
                    expandedQuestion === q.id ? null : q.id
                  )}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Share Button (when review is not shown) */}
        {!showReview && isPassed && (
          <div style={{ padding: '0 24px 32px' }}>
            <ShareButton />
          </div>
        )}
        
        {/* Bottom padding */}
        <div style={{ height: '40px' }} />
      </div>
    </div>
  );
}
