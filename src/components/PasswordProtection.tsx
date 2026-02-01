import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { validatePassword, setAuthenticated } from '../utils/auth';
import '../styles/PasswordButton.css';
import CloseButton from './CloseButton';

interface PasswordProtectionProps {
  onPasswordCorrect: () => void;
  projectTitle: string;
  projectId: string;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ 
  onPasswordCorrect, 
  projectTitle,
  projectId
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate password using secure authentication
    const isValid = await validatePassword(password);
    if (isValid) {
      // Store authentication state
      setAuthenticated(projectId);
      onPasswordCorrect();
    } else {
      setError('Incorrect password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Navigate back when clicking outside the modal
      window.history.back();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 pt-[120px] md:pt-[20vw]"
      onClick={handleBackdropClick}
    >
      <div 
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 relative 2xl:max-w-lg 2xl:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-2 right-2">
          <CloseButton 
            onClose={() => window.history.back()}
            ariaLabel="Close password modal"
          />
        </div>
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">
            Password Protected
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="button-psswd"
          >
            {isLoading ? 'Checking...' : 'View Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection; 