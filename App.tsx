
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import FileExplorer from './pages/FileExplorer';
import AdminDashboard from './pages/AdminDashboard';
import Documentation from './pages/Documentation';
import ProfileSettings from './pages/ProfileSettings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FilePreviewer from './components/FilePreviewer';
import UploadOverlay from './components/UploadOverlay';
import ToastContainer from './components/ToastContainer';
import { AppProvider, useApp } from './context/AppContext';

const AuthenticatedApp: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user } = useApp();
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>

      <Header user={user} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/files" element={<FileExplorer title="My Files" />} />
            <Route path="/shared" element={<FileExplorer title="Files Shared by Developers" />} />
            <Route path="/starred" element={<FileExplorer title="Starred Files" />} />
            <Route path="/recent" element={<FileExplorer title="Recent Activity" />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
      <FilePreviewer />
      <UploadOverlay />
      <ToastContainer />
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen relative">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage onLogin={() => {}} />
            } />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/docs" element={<Documentation />} />
            
            <Route path="/*" element={
              isAuthenticated ? (
                <AuthenticatedApp onLogout={handleLogout} />
              ) : <Navigate to="/login" />
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;