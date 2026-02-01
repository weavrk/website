import React, { useState } from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  type?: 'deboss' | 'flat' | 'emboss';
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '',
  type = 'deboss',
  backgroundColor,
  style
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = () => {
    if (isMobile && type === 'deboss') {
      setIsClicked(!isClicked);
    }
  };

  const cardClassName = `${className} ${isClicked && isMobile && type === 'deboss' ? 'bento-card-clicked' : ''} ${type === 'flat' ? 'bento-card-flat' : type === 'emboss' ? 'bento-card-emboss' : 'bento-card-deboss'} ${type === 'deboss' && backgroundColor === 'white' ? 'bento-card-white-hover' : ''}`;

  return (
    <div 
      className={`bento-card ${cardClassName}`} 
      onClick={handleCardClick}
      style={{ backgroundColor: backgroundColor || undefined, ...style }}
    >
      {children}
    </div>
  );
};

export default BentoCard; 