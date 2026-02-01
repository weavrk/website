import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface BackToTopProps {
  className?: string;
}

const BackToTop: React.FC<BackToTopProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      
      // Show button when user scrolls down more than 300px AND is not within 300px of bottom
      if (scrollTop > 300 && distanceFromBottom > 300) {
        if (!isVisible && !isExiting) {
          setIsVisible(true);
          setIsExiting(false);
        }
      } else {
        if (isVisible && !isExiting) {
          setIsExiting(true);
          // Wait for exit animation to complete before hiding
          setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
          }, 300); // Match the exit animation duration
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [isVisible, isExiting]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50
            px-4 py-2 rounded-full shadow-lg
            bg-[var(--color-accent-blue-lite)] text-white
            hover:bg-[var(--color-accent-blue-mid)] 
            transition-all duration-500 ease-out
            flex items-center gap-2 text-sm font-medium
            ${isExiting ? 'back-to-top-exit' : 'back-to-top-enter'}
            ${className}
          `}
          style={{
            color: 'var(--color-primary)'
          }}
          aria-label="Back to top"
        >
          back to top
          <ChevronUp size={16} className="transition-transform duration-200 hover:scale-110" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
