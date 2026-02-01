import React from 'react';

interface CaretDesktopProps {
  className?: string;
}

const CaretDesktop: React.FC<CaretDesktopProps> = ({ className = '' }) => {
  return (
    <div className={`caret-desktop-animation ${className}`}>
      <div className="caret-down fade-in-start fade-in-animation-second">
        <svg 
          version="1.1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100"
        >
          <polyline 
            points="10.4,33.3 50,66.7 89.6,33.3" 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default CaretDesktop; 