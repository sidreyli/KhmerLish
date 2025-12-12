import { useState } from 'react';

// Demo data
const userData = {
  name: 'សុភា',
  nameEnglish: 'Sopha',
  initials: 'សុ',
  level: 'A1',
  levelName: 'អ្នកចាប់ផ្តើម',
  memberSince: 'មករា ២០២៥',
  xp: 1240,
  streak: 7,
  wordsLearned: 156,
  lessonsCompleted: 12,
  phone: '+855 ** *** 234',
  lastSync: 'ថ្ងៃនេះ 10:30',
};

const achievements = [
  { id: 1, icon: '🌟', title: 'មេរៀនដំបូង', titleEn: 'First Lesson', earned: true },
  { id: 2, icon: '🔥', title: '7 ថ្ងៃ Streak', titleEn: '7 Day Streak', earned: true },
  { id: 3, icon: '📚', title: '100 ពាក្យ', titleEn: '100 Words', earned: true },
  { id: 4, icon: '⭐', title: 'Perfect Quiz', titleEn: 'Perfect Quiz', earned: false },
  { id: 5, icon: '💯', title: '500 ពាក្យ', titleEn: '500 Words', earned: false, progress: '156/500' },
  { id: 6, icon: '🏆', title: '30 ថ្ងៃ Streak', titleEn: '30 Day Streak', earned: false },
];

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
          {initials}
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
  );
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
  );
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
  );
}

// Achievement Badge
function AchievementBadge({ achievement }) {
  const { icon, title, titleEn, earned, progress } = achievement;
  
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
  );
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
  );
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
  );
}

// Theme Selector
function ThemeSelector({ value, onChange }) {
  const options = [
    { id: 'light', label: '☀️' },
    { id: 'dark', label: '🌙' },
    { id: 'system', label: '⚙️' },
  ];
  
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
  );
}

// Storage Progress
function StorageProgress({ used, total }) {
  const percentage = (used / total) * 100;
  
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
  );
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
  );
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
  );
}

export default function ProfileScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            initials={userData.initials}
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
            {userData.name}
          </div>
          
          <div style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
          }}>
            {userData.nameEnglish}
          </div>
          
          <LevelBadge level={userData.level} levelName={userData.levelName} />
          
          <div style={{
            fontFamily: 'Battambang, serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '12px',
          }}>
            ចាប់ពី {userData.memberSince}
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
            <StatCard icon="⭐" value={userData.xp.toLocaleString()} label="XP" />
            <StatCard icon="🔥" value={`${userData.streak} ថ្ងៃ`} label="Streak" />
            <StatCard icon="📖" value={userData.wordsLearned} label="ពាក្យ" />
            <StatCard icon="✅" value={userData.lessonsCompleted} label="មេរៀន" />
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
            {achievements.map(achievement => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
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
              មេរៀនបានទាញយក: <strong style={{ color: '#333' }}>5</strong>
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
              icon="📱" 
              title="លេខទូរស័ព្ទ"
              subtitle={userData.phone}
            />
            
            <SettingItem 
              icon="☁️" 
              title="បានធ្វើសមកាលកម្ម"
              subtitle={`✓ ${userData.lastSync}`}
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
          onConfirm={() => {
            console.log('Sign out');
            setShowSignOutModal(false);
          }}
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
            console.log('Delete account');
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
