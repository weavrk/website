import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

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
    // Close when clicking on the backdrop (anywhere outside the sheet content)
    if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!shouldRender || !subsection) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ cursor: 'pointer' }}
    >
      <div 
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 w-full bg-background transform transition-all duration-400 ease-in-out ai-sheet-container flex flex-col ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          boxShadow: '0 -8px 25px -4px rgba(0, 0, 0, 0.15), 0 -4px 10px -2px rgba(0, 0, 0, 0.1)',
          marginTop: '0',
          height: '100vh',
          cursor: 'default'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center py-4 px-4 md:px-8 flex-shrink-0" style={{ paddingLeft: '3vw', paddingRight: '0', paddingTop: '2vw', paddingBottom: '0' }}>
          <div>
            <h3 className="about-section-header about-sheet-header">{subsection.subtitle}</h3>
          </div>
          <CloseButton 
            onClose={handleClose}
            ariaLabel="Close AI section"
            className="ai-sheet-close-button"
          />
        </div>
        
        <div className="overflow-y-auto px-4 md:px-8 flex-1" style={{ paddingLeft: '3vw', paddingRight: '3vw' }}>
          <div className="ai-caption-container" style={{ marginBottom: '24px' }}>
            <p className="about-body-copy" style={{ width: '100%' }}>
              {subsection.images[currentImageIndex]?.caption || subsection.description}
            </p>
          </div>
          {subsection.images.length > 1 && (
            <div className="flex items-center justify-end gap-3 mb-2" style={{ marginBottom: '16px' }}>
              <div className="flex gap-2">
                {subsection.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`ai-page-indicator ai-page-indicator-inverted rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'ai-page-indicator-active'
                        : 'ai-page-indicator-inactive'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
          <ImageCarousel 
            images={subsection.images} 
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default AISectionSheet;

