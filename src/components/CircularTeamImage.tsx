import React from 'react';

interface CircularTeamImageProps {
  name: string;
  className: string;
  image: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isActive?: boolean;
  isAnyHovered?: boolean;
  style?: React.CSSProperties;
}

const CircularTeamImage: React.FC<CircularTeamImageProps> = ({
  name,
  className,
  image,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isActive = false,
  isAnyHovered = false,
  style
}) => {
  const getStateClass = () => {
    if (isActive) return 'active';
    if (isAnyHovered) return 'dimmed';
    return '';
  };

  return (
    <div className={`team-member-image-approach ${isActive ? 'active' : ''}`}>
      <div 
        className={`team-member-image-inner ${className} ${getStateClass()}`}
        style={{ 
          backgroundImage: `url(${image})`,
          ...style
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        tabIndex={0}
        aria-label={name}
        role="img"
      />
    </div>
  );
};

export default CircularTeamImage;
