import { useState, useEffect } from 'react';

// Demo data
const reviewData = {
  hasReviews: true,
  reviewsDue: 12,
  nextReviewTime: 'ថ្ងៃស្អែក 9:00',
  reviewWindowProgress: 75, // percentage of optimal review window
};

const newWordsData = {
  lessonName: 'មេរៀនទី ៣: អាហារ និង ភេសជ្ជៈ',
  newWordsCount: 10,
};

const statsData = {
  totalLearned: 156,
  mastered: 89,
  reviewing: 45,
  learning: 22,
  retentionRate: 87,
  bestScore: 45,
  currentStreak: 7,
  memoryStrength: [65, 78, 82, 70, 85, 90, 87], // last 7 days
};

// Calendar data (current month)
const generateCalendarData = () => {
  const today = new Date();
  const studiedDays = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]; // days studied this month
  return { today: today.getDate(), studiedDays };
};

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
        {streak}
      </span>
    </div>
  );
}

// Review Hero Card - Reviews Due
function ReviewDueCard({ reviewsDue, progress, onReview }) {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillAmount = (progress / 100) * circumference;
  const center = size / 2;
  
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
  );
}

// Review Hero Card - All Done
function AllDoneCard({ nextReviewTime }) {
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
        <span>ពិនិត្យបន្ទាប់: {nextReviewTime}</span>
      </div>
    </div>
  );
}

// Study New Words Card
function NewWordsCard({ lessonName, wordCount, onStart }) {
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
          📖
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '16px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '4px',
          }}>
            រៀនពាក្យថ្មី
          </div>
          
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px',
          }}>
            រៀនពាក្យថ្មីពីមេរៀនបច្ចុប្បន្ន
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
            {lessonName}
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
              ✨ {wordCount} ពាក្យថ្មី
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
              ចាប់ផ្តើម
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Practice Card
function PracticeCard({ icon, title, subtitle, duration, highlight, onClick }) {
  const [hovered, setHovered] = useState(false);
  
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
  );
}

// Memory Strength Chart
function MemoryStrengthChart({ data }) {
  const maxValue = Math.max(...data);
  const days = ['ស', 'អ', 'ព', 'ព្រ', 'សុ', 'ស', 'អា'];
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: '80px',
      gap: '8px',
    }}>
      {data.map((value, index) => (
        <div key={index} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            height: `${(value / maxValue) * 60}px`,
            background: index === data.length - 1 
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
  );
}

// Stats Progress Bar
function StatBar({ label, value, total, color }) {
  const percentage = (value / total) * 100;
  
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
  );
}

// Mini Calendar
function MiniCalendar({ today, studiedDays }) {
  const daysInMonth = 31;
  const firstDayOffset = 3; // Wednesday start (0 = Sunday)
  
  const dayNames = ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'];
  
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
        ធ្នូ ២០២៥
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
          const day = i + 1;
          const isStudied = studiedDays.includes(day);
          const isToday = day === today;
          
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
          );
        })}
      </div>
    </div>
  );
}

export default function PracticeScreen() {
  const [hasReviews, setHasReviews] = useState(reviewData.hasReviews);
  const calendarData = generateCalendarData();

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
        
        <StreakBadge streak={statsData.currentStreak} />
      </div>
      
      {/* Scrollable Content */}
      <div className="screen-content">
        {/* Today's Review Section */}
        <div style={{ marginBottom: '20px' }}>
          {hasReviews ? (
            <ReviewDueCard 
              reviewsDue={reviewData.reviewsDue}
              progress={reviewData.reviewWindowProgress}
              onReview={() => console.log('Start review')}
            />
          ) : (
            <AllDoneCard nextReviewTime={reviewData.nextReviewTime} />
          )}
        </div>
        
        {/* Study New Words Card */}
        <div style={{ marginBottom: '24px' }}>
          <NewWordsCard 
            lessonName={newWordsData.lessonName}
            wordCount={newWordsData.newWordsCount}
            onStart={() => console.log('Start new words')}
          />
        </div>
        
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
              onClick={() => console.log('Random quiz')}
            />
            <PracticeCard
              icon="🎧"
              title="លំហាត់ស្តាប់"
              subtitle="ស្តាប់ និងជ្រើសរើស"
              duration="5 នាទី"
              onClick={() => console.log('Listening')}
            />
            <PracticeCard
              icon="⚡"
              title="ល្បឿនលឿន"
              subtitle="ឆ្លើយឱ្យលឿនតាមដែលអាច"
              duration="3 នាទី"
              onClick={() => console.log('Speed review')}
            />
            <PracticeCard
              icon="🏆"
              title="ការប្រកួត"
              subtitle="ប្រកួតជាមួយខ្លួនឯង"
              duration={`កំណត់ត្រាល្អបំផុត: ${statsData.bestScore}`}
              highlight
              onClick={() => console.log('Challenge')}
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
            <MemoryStrengthChart data={statsData.memoryStrength} />
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
              value={statsData.mastered}
              total={statsData.totalLearned}
              color="linear-gradient(90deg, #4CAF50, #8BC34A)"
            />
            <StatBar 
              label="កំពុងពិនិត្យ (Reviewing)"
              value={statsData.reviewing}
              total={statsData.totalLearned}
              color="linear-gradient(90deg, #E8913A, #FFB74D)"
            />
            <StatBar 
              label="កំពុងរៀន (Learning)"
              value={statsData.learning}
              total={statsData.totalLearned}
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
                  {statsData.totalLearned}
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
                  {statsData.mastered}
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
                  {statsData.retentionRate}%
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
          
          <MiniCalendar 
            today={calendarData.today}
            studiedDays={calendarData.studiedDays}
          />
        </div>
        
        {/* Bottom padding */}
        <div style={{ height: '20px' }} />
      </div>
    </div>
  );
}
