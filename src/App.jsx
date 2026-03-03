import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { initializeMockData } from './services/mockData';
import { isMobile } from './utils/helpers';

// Pages
import { DesktopRedirect } from './pages/Desktop/DesktopRedirect';
import { Onboarding } from './pages/Onboarding/Onboarding';
import { Home } from './pages/Home/Home';
import { Rewards } from './pages/Rewards/Rewards';
import { Promotions } from './pages/Promotions/Promotions';
import { Feedback } from './pages/Feedback/Feedback';
import { Profile } from './pages/Profile/Profile';
import { Menu } from './pages/Menu/Menu';
import { LoadingSpinner } from './components/common';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading, onboardingCompleted } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!onboardingCompleted || !user) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

// Main App Routes
const AppRoutes = () => {
  const { onboardingCompleted, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={
          onboardingCompleted ? <Navigate to="/home" replace /> : <Onboarding />
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rewards"
        element={
          <ProtectedRoute>
            <Rewards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/promotions"
        element={
          <ProtectedRoute>
            <Promotions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <Navigate to={onboardingCompleted ? '/home' : '/onboarding'} replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    // Initialize mock data on first load
    initializeMockData();
  }, []);

  // Desktop redirect
  if (!isMobile()) {
    return <DesktopRedirect />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
