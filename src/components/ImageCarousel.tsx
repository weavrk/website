import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  caption: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  className?: string;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className = '', currentIndex: externalIndex, onIndexChange }) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

  // Detect mobile and update images to use mobile versions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Convert image srcs to mobile versions on mobile
  const mobileImages = useMemo(() => {
    if (!isMobile) return images;
    return images.map(img => ({
      ...img,
      src: img.src.replace(/\.webp$/, '-mobile.webp')
    }));
  }, [images, isMobile]);
  
  const setCurrentIndex = (index: number) => {
    if (onIndexChange) {
      onIndexChange(index);
    } else {
      setInternalIndex(index);
    }
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % mobileImages.length;
    setCurrentIndex(newIndex);
    setImageError(false);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + mobileImages.length) % mobileImages.length;
    setCurrentIndex(newIndex);
    setImageError(false);
  };

  if (mobileImages.length === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full rounded-lg overflow-hidden image-carousel-container" style={{ backgroundColor: 'var(--color-tertiary)', height: 'calc(-320px + 100vh)' }}>
        {!imageError ? (
          <img
            src={mobileImages[currentIndex].src}
            alt={mobileImages[currentIndex].caption}
            className="w-full h-full ai-carousel-image"
            style={{ height: '100%' }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="var(--color-primary)"/>
            </svg>
          </div>
        )}
        
        {mobileImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="ai-carousel-nav ai-carousel-nav-inverted absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="ai-carousel-nav ai-carousel-nav-inverted absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;

