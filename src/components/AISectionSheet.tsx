import React, { useEffect, useState, useCallback } from 'react';
import CloseButton from './CloseButton';
import ImageCarousel from './ImageCarousel';

interface ImageItem {
  src: string;
  caption: string;
}

interface AISubsection {
  title: string;
  subtitle: string;
  description: string;
  images: ImageItem[];
}

interface AISectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  subsection: AISubsection | null;
}

const AISectionSheet: React.FC<AISectionSheetProps> = ({ isOpen, onClose, subsection }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 400);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
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

  if (!shouldRender || !subsection) return null;

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
        <div className="flex justify-between items-center py-4 px-4 md:px-8" style={{ paddingLeft: '5vw', paddingRight: '2vw' }}>
          <div>
            <h2 className="bc-title text-primary">{subsection.title}</h2>
            <h3 className="text-lg font-semibold text-primary mt-2">{subsection.subtitle}</h3>
          </div>
          <CloseButton 
            onClose={handleClose}
            ariaLabel="Close AI section"
          />
        </div>
        
        <div className="h-[calc(100vh-120px)] overflow-y-auto px-4 md:px-8" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
          <p className="home-section-copy mb-8 mt-4">{subsection.description}</p>
          <ImageCarousel images={subsection.images} />
        </div>
      </div>
    </div>
  );
};

export default AISectionSheet;

