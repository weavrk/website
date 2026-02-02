import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  caption: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageError(false);
  };

  if (images.length === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--color-tertiary)' }}>
        {!imageError ? (
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].caption}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="var(--color-primary)"/>
            </svg>
          </div>
        )}
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity"
              style={{ backgroundColor: 'var(--color-background)', opacity: 0.8 }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity"
              style={{ backgroundColor: 'var(--color-background)', opacity: 0.8 }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            </button>
          </>
        )}
      </div>
      
      {images[currentIndex].caption && (
        <p className="mt-4 text-sm text-primary opacity-70 text-center">
          {images[currentIndex].caption}
        </p>
      )}
      
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6'
                  : ''
              }`}
              style={{
                backgroundColor: index === currentIndex 
                  ? 'var(--color-primary)' 
                  : 'var(--color-secondary)'
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

