import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfileSettings from './pages/ProfileSettings';
import Documentation from './pages/Documentation';

import Dashboard from './pages/Dashboard';        
import Header from './components/Header';       
import GlassCard from './components/GlassCard';   


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useApp();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <Header user={user!} onLogout={logout} />
      <main className="pt-20 px-8 py-12">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
      
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/docs" element={<Documentation />} />

          
      
          <Route path="/dashboard" element={
            <MainLayout>
              <div className="max-w-7xl mx-auto">
                <Dashboard />
              </div>
            </MainLayout>
          } />
          
          <Route path="/profile" element={
            <MainLayout>
              <ProfileSettings />
            </MainLayout>
          } />
          
          {/* 404 */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
