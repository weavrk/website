import React from 'react';
import { Circle } from 'lucide-react';

interface BentoCardContentProps {
  sectionHeader: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const BentoCardContent: React.FC<BentoCardContentProps> = ({ 
  sectionHeader, 
  children, 
  className = '',
  bodyClassName = '',
  icon = <Circle className="w-3 h-3" />,
  style
}) => {
  return (
    <div className={`bento-card-content ${className}`} style={style}>
      <div className="bento-card-header">
        <p className="bc-title">
          {icon}
          <span>{sectionHeader}</span>
        </p>
      </div>
      <div className={`bc-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default BentoCardContent; 