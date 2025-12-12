import { useLocation, useNavigate } from 'react-router-dom'

// Navigation Tab Component
function NavTab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '8px 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform var(--transition-fast)',
      }}
      className="nav-tab-hover"
    >
      <span style={{
        fontSize: '1.3rem',
        opacity: active ? 1 : 0.5,
        transform: active ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform var(--transition-bounce), opacity var(--transition-fast)',
      }}>
        {icon}
      </span>
      <span style={{
        fontFamily: 'var(--font-khmer)',
        fontSize: 'var(--text-small)',
        fontWeight: active ? 600 : 400,
        color: active ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
        transition: 'color var(--transition-fast)',
      }}>
        {label}
      </span>
      {active && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: 24,
          height: 3,
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
        }} />
      )}
    </button>
  )
}

// Bottom Navigation Bar Component
export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path.startsWith('/lessons')) return 'lessons'
    if (path === '/practice') return 'practice'
    if (path === '/profile') return 'profile'
    return 'home'
  }

  const activeTab = getActiveTab()

  const handleNavigate = (tab) => {
    const routes = {
      home: '/',
      lessons: '/lessons',
      practice: '/practice',
      profile: '/profile'
    }
    navigate(routes[tab])
  }

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 70,
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border-light)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--space-4)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
      zIndex: 100,
    }}>
      <style>{`
        .nav-tab-hover:hover {
          transform: scale(1.05);
        }
        .nav-tab-hover:active {
          transform: scale(0.95);
        }
      `}</style>
      <NavTab
        icon="🏠"
        label="ផ្ទះ"
        active={activeTab === 'home'}
        onClick={() => handleNavigate('home')}
      />
      <NavTab
        icon="📚"
        label="មេរៀន"
        active={activeTab === 'lessons'}
        onClick={() => handleNavigate('lessons')}
      />
      <NavTab
        icon="📝"
        label="លំហាត់"
        active={activeTab === 'practice'}
        onClick={() => handleNavigate('practice')}
      />
      <NavTab
        icon="👤"
        label="ខ្ញុំ"
        active={activeTab === 'profile'}
        onClick={() => handleNavigate('profile')}
      />
    </nav>
  )
}

export default BottomNavigation
