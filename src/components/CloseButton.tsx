import React from 'react';
import { X } from 'lucide-react';
import '../styles/CloseButton.css';

interface CloseButtonProps {
  onClose: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ 
  onClose, 
  className = '', 
  size = 'md',
  ariaLabel = 'Close'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-13 h-13'
  };

  return (
    <button
      onClick={onClose}
      className={`p-3 hover:bg-gray-100 rounded-full transition-all duration-200 close-button ${className}`}
      style={{ backgroundColor: 'transparent' }}
      aria-label={ariaLabel}
    >
      <X 
        className={`${sizeClasses[size]}`} 
        style={{ stroke: 'var(--color-primary)' }} 
        strokeWidth={2} 
      />
    </button>
  );
};

export default CloseButton;
