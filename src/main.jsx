import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Context Providers
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Layouts
import AppLayout from './layouts/AppLayout'

// Screens
import HomeScreen from './HomeScreen'
import LessonsScreen from './LessonsScreen'
import LessonDetail from './LessonDetail'
import FlashcardScreen from './FlashcardScreen'
import QuizScreen from './QuizScreen'
import QuizResultsScreen from './QuizResultsScreen'
import PracticeScreen from './PracticeScreen'
import ProfileScreen from './ProfileScreen'
import Onboarding from './Onboarding'
import LoginScreen from './LoginScreen'

// Dev-only screens
import DesignSystem from './DesignSystem'
import Branding from './Branding'
import AppStatesScreen from './AppStatesScreen'

// Styles
import './DesignSystem.css'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Loading screen while checking auth
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'var(--color-background)',
    }}>
      <div className="loading-spinner" />
    </div>
  )
}

// Protected route that requires authentication and onboarding
function RequireAuth({ children }) {
  const { isAuthenticated, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  // Not logged in - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Logged in but hasn't completed onboarding
  if (!profile?.onboarding_completed) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />
  }

  return children
}

// Route for users who need to complete onboarding
function RequireAuthOnly({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// Redirect authenticated users away from login
function RedirectIfAuthenticated({ children }) {
  const { isAuthenticated, profile, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    if (profile?.onboarding_completed) {
      return <Navigate to="/" replace />
    }
    return <Navigate to="/onboarding" replace />
  }

  return children
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          <RedirectIfAuthenticated>
            <LoginScreen />
          </RedirectIfAuthenticated>
        } />

        {/* Onboarding - requires auth but not completed onboarding */}
        <Route path="/onboarding" element={
          <RequireAuthOnly>
            <Onboarding />
          </RequireAuthOnly>
        } />

        {/* Main app routes with bottom navigation */}
        <Route element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/lessons" element={<LessonsScreen />} />
          <Route path="/practice" element={<PracticeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>

        {/* Full-screen routes (no bottom nav) - require auth */}
        <Route path="/lessons/:lessonId" element={
          <RequireAuth>
            <LessonDetail />
          </RequireAuth>
        } />
        <Route path="/flashcard/:lessonId" element={
          <RequireAuth>
            <FlashcardScreen />
          </RequireAuth>
        } />
        <Route path="/quiz/:lessonId" element={
          <RequireAuth>
            <QuizScreen />
          </RequireAuth>
        } />
        <Route path="/quiz/:lessonId/results" element={
          <RequireAuth>
            <QuizResultsScreen />
          </RequireAuth>
        } />

        {/* Dev-only routes */}
        {import.meta.env.DEV && (
          <>
            <Route path="/dev/design" element={<DesignSystem />} />
            <Route path="/dev/branding" element={<Branding />} />
            <Route path="/dev/states" element={<AppStatesScreen />} />
          </>
        )}

        {/* Fallback - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
