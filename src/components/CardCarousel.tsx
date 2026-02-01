import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../data/projects';

interface CardCarouselProps {
  projects: Project[];
  variant?: 'home' | 'work' | 'sandbox';
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  height?: string;
  backgroundColor?: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ 
  projects, 
  variant, 
  autoPlay = false, // Disabled by default
  autoPlayInterval = 4000,
  className = '',
  height = '70vh',
  backgroundColor
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
  
  }, [projects.length]);
  
  if (projects.length === 0) {
    return null;
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`card-carousel ${className}`} style={{ height: '100%' }}>
      <div className="relative w-full h-full flex flex-col">
        {/* Stepper Buttons - Top */}
        <div className="steppers-container" style={{ paddingBottom: '24px' }}>
          <div className="flex justify-start gap-0 items-start">
            {projects.map((_, index) => (
              <button 
                key={index}
                className="stepper-frame"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`custom-dot ${index === currentSlide ? 'slick-active' : ''}`} />
              </button>
            ))}
          </div>
        </div>
        
        {/* Current Slide */}
        <div className="flex-1 px-4 flex items-center justify-center">
          <div className="w-full h-full">
            <ProjectCard 
              project={projects[currentSlide]} 
              variant={variant}

              backgroundColor={projects[currentSlide].id === 'mobile-onboarding-flows' ? 'bg-[var(--color-accent-blue-dark)]' : (backgroundColor || 'bg-[var(--color-background)]')}
              showComingSoon={currentSlide < 3 && currentSlide !== 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel; 