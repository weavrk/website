


import React, { useEffect, useState, useCallback } from 'react';
import DSL from '../pages/DSL';
import CloseButton from './CloseButton';

interface DSLSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const DSLSheet: React.FC<DSLSheetProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  // Handle open animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Start animation after a brief delay to ensure render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for close animation to complete before unmounting
      setTimeout(() => {
        setShouldRender(false);
      }, 400);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when sheet is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-end bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >

                      <div 
          className={`w-full bg-background transform transition-all duration-400 ease-in-out md:h-[calc(100vh-24px)] h-[calc(100vh-24px)] ${
            isAnimating ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -8px 25px -4px rgba(0, 0, 0, 0.15), 0 -4px 10px -2px rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center py-2 px-4" style={{ paddingLeft: '5vw', paddingRight: '2vw' }}>
          <h2 className="pattern-library-drawer text-primary">Pattern Library</h2>
          <CloseButton 
            onClose={handleClose}
            ariaLabel="Close DSL sheet"
          />
        </div>
        
        {/* DSL Content */}
        <div className="h-[calc(100vh-84px)] overflow-y-auto overflow-x-auto">
          <div className="w-[100vw] flex justify-center items-start" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
            <div>
              <DSL isEmbedded={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSLSheet;
