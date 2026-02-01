import React from 'react';

interface BreakLineHeaderProps {
  text: string;
  lineColor?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const BreakLineHeader: React.FC<BreakLineHeaderProps> = ({ 
  text, 
  lineColor = 'secondary',
  className = ''
}) => {
  const getLineClasses = () => {
    switch (lineColor) {
      case 'secondary':
        return {
          lineA: 'break-line-landing-secondary-a',
          lineB: 'break-line-landing-secondary-b'
        };
      case 'tertiary':
        return {
          lineA: 'break-line-landing-primary-a',
          lineB: 'break-line-landing-primary-b'
        };
      default:
        return {
          lineA: 'break-line-landing-primary-a',
          lineB: 'break-line-landing-primary-b'
        };
    }
  };

  const lineClasses = getLineClasses();

  return (
    <div className={`break-line-landing-primary-shell flex items-center justify-center my-12 delay-900 opacity-100 translate-y-0 ${className}`}>
      <div className={lineClasses.lineA}></div>
      <h2 className="landing-work-header">{text}</h2>
      <div className={lineClasses.lineB}></div>
    </div>
  );
};

export default BreakLineHeader; 