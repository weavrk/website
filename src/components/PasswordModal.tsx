import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Lock, Eye, EyeOff, X } from 'lucide-react';
import { validatePassword, setAuthenticated } from '../utils/auth';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordCorrect: () => void;
  projectTitle: string;
  projectId: string;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ 
  isOpen, 
  onClose, 
  onPasswordCorrect, 
  projectTitle,
  projectId
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

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
      onClose();
    } else {
      setError('Incorrect password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-12 bg-gray-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleClose();
        }}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 pt-12"
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        style={{ alignSelf: 'flex-start' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-4 right-4 transition-colors hover:bg-gray-100 rounded-full p-2 -m-2"
          style={{ color: 'var(--color-primary)' }}
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
            <Lock className="h-8 w-8" style={{ color: 'var(--color-accent-blue-dark)' }} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2 text-center" style={{ fontFamily: 'Wix Madefor Display, sans-serif' }}>
            Password Protected
          </h2>
          <p className="text-primary text-center" style={{ fontFamily: 'Wix Madefor Display, sans-serif' }}>
            This content requires a password to access.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-center"
                placeholder="Enter password"
                required
                style={{ 
                  fontFamily: 'Wix Madefor Display, sans-serif',
                  '--tw-ring-color': 'var(--color-accent-blue-dark)'
                } as React.CSSProperties}
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
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg text-center" style={{ fontFamily: 'Wix Madefor Display, sans-serif' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-center"
            style={{ 
              fontFamily: 'Wix Madefor Display, sans-serif',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: 'var(--color-primary)',
              '--tw-ring-color': 'var(--color-primary)'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLoading ? 'Checking...' : "Let's Go"}
          </button>
        </form>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default PasswordModal; 