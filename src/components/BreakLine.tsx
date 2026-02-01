import React from 'react';

interface BreakLineProps {
  title: string;
  className?: string;
  animationDelay?: string;
  isVisible?: boolean;
}

const BreakLine: React.FC<BreakLineProps> = ({ 
  title, 
  className = '', 
  animationDelay = 'delay-900',
  isVisible = true 
}) => {
  return (
    <div className={`break-line-landing-primary-shell ${className} ${animationDelay} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="break-line-landing-primary-a"></div>
      <h2 className="landing-work-header">{title}</h2>
      <div className="break-line-landing-primary-b"></div>
    </div>
  );
};

export default BreakLine; 