import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import PanelPage from './pages/PanelPage';
import { DashboardLayout } from './layouts/DashboardLayout';

function App() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <DashboardLayout>
      <PanelPage />
    </DashboardLayout>
  ) : (
    <LoginPage />
  );
}

export default App;