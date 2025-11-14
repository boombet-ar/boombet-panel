import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Componente "Router" simple
function AppContent() {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}

// Componente App principal que provee el contexto
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}