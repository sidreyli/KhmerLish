import { Outlet } from 'react-router-dom'
import { BottomNavigation } from '../components/BottomNavigation'

// App Layout with Bottom Navigation
// Used for main screens: Home, Lessons, Practice, Profile
function AppLayout() {
  return (
    <div className="app-shell">
      {/* Main content area - scrollable */}
      <main className="app-content">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default AppLayout
