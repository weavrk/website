import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../data/projects';

interface HorizontalCardCarouselProps {
  projects: Project[];
  variant?: 'home' | 'work' | 'sandbox';
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  height?: string;
  backgroundColor?: string;
}

const HorizontalCardCarousel: React.FC<HorizontalCardCarouselProps> = ({ 
  projects, 
  variant, 
  autoPlay = false,
  autoPlayInterval = 3000,
  className = '',
  height = '70vh',
  backgroundColor
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(autoPlay);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality - only on page load, stops after interaction
  useEffect(() => {
    if (autoPlay && projects.length > 1 && autoPlayEnabled) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, projects.length, autoPlayEnabled]);

  // Pause auto-play on user interaction - permanently disable after first interaction
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    setAutoPlayEnabled(false); // Permanently disable auto-play after interaction
  };

  // Resume auto-play - removed since we want to stop after interaction
  const resumeAutoPlay = () => {
    // Auto-play is permanently disabled after first interaction
  };

  // Touch/Mouse handlers for sliding
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartY(e.pageY);
    pauseAutoPlay();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const endX = e.pageX;
    const endY = e.pageY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    const threshold = 50; // Minimum swipe distance
    
    // Only handle as swipe if horizontal movement is greater than vertical and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swiped left - go to next
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else {
        // Swiped right - go to previous
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }
    
    setIsDragging(false);
    pauseAutoPlay();
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start');
    setStartX(e.touches[0].pageX);
    setStartY(e.touches[0].pageY);
    setIsDragging(false); // Start as not dragging
    pauseAutoPlay();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);
    
    // If movement is significant, start dragging
    if (!isDragging && (diffX > 10 || diffY > 10)) {
      console.log('Started dragging, diffX:', diffX, 'diffY:', diffY);
      setIsDragging(true);
    }
    
    if (isDragging) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    console.log('Touch end, isDragging:', isDragging);
    if (!isDragging) {
      // This was a tap, let the click event handle it
      return;
    }
    
    const endX = e.changedTouches[0].pageX;
    const endY = e.changedTouches[0].pageY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    const threshold = 50; // Minimum swipe distance
    
    console.log('Swipe detected, diffX:', diffX, 'diffY:', diffY, 'threshold:', threshold);
    
    // Only handle as swipe if horizontal movement is greater than vertical and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swiped left - go to next
        console.log('Swiping left to next slide');
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else {
        // Swiped right - go to previous
        console.log('Swiping right to previous slide');
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
      // Prevent click events if we detected a swipe
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsDragging(false);
    pauseAutoPlay();
  };

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    pauseAutoPlay();
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className={`horizontal-card-carousel ${className} ${isDragging ? 'dragging' : ''}`} style={{ height }}>
      <div className="relative w-full h-full flex flex-col">
        {/* Horizontal Slider Container */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-hidden relative w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y pinch-zoom'
          }}
        >
          <div 
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: variant === 'work' 
                ? `translateX(calc(-${currentIndex} * 100vw))`
                : `translateX(calc(-${currentIndex} * (92vw + 16px)))`,
              width: variant === 'work'
                ? `calc(${projects.length} * 100vw)`
                : `calc(${projects.length} * (92vw + 16px))`
            }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="w-screen h-full flex-shrink-0"
                style={{ 
                  width: variant === 'work' ? '100vw' : '92vw', 
                  marginRight: variant === 'work' ? '0' : '16px' 
                }}
              >
                <div className={`w-full h-full select-none pb-8 ${variant === 'home' ? '' : 'px-4'}`}>
                  <ProjectCard 
                    project={project} 
                    variant={variant}
                    backgroundColor={
                      project.id === 'blessu-home' ? 'bg-[var(--color-accent-yellow-mid)]' :
                      project.id === 'mobile-onboarding-flows' ? 'bg-[var(--color-accent-blue-dark)]' :
                      project.id === 'spatial-data-mapping' ? 'bg-[var(--color-accent-yellow-dark)]' :
                      project.id === 'co2-emissions-dashboard' ? 'bg-[var(--color-accent-blue-lite)]' :
                      (backgroundColor || 'bg-[var(--color-background)]')
                    }
                    showComingSoon={index < 3 && index !== 1}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Progress Indicator - primary color with stroke/fill */}
        {projects.length > 1 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary' 
                      : ''
                  }`}
                  style={{
                    border: 'none',
                    backgroundColor: index === currentIndex ? 'var(--color-primary)' : 'var(--color-secondary)'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalCardCarousel;
