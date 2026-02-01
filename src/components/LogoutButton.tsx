import React from 'react';
import { LogOut } from 'lucide-react';
import { isGlobalAuthenticated, clearGlobalAuthentication } from '../utils/auth';

const LogoutButton: React.FC = () => {
  const isAuthenticated = isGlobalAuthenticated();

  const handleLogout = () => {
    clearGlobalAuthentication();
    // Force page refresh to update all components
    window.location.reload();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-6 right-6 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
      title="Logout"
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
};

export default LogoutButton; 