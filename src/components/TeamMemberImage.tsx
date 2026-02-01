import React from 'react';

interface TeamMemberImageProps {
  name: string;
  role: string;
  image: string;
  className?: string;
  style?: {
    backgroundSize?: string;
    backgroundPosition?: string;
  };
  isActive: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const TeamMemberImage: React.FC<TeamMemberImageProps> = ({
  name,
  role,
  image,
  className = '',
  style = {},
  isActive,
  isAnyHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  return (
    <div className="team-member">
      <div
        className={`approach-team-images ${className}`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: style.backgroundSize || 'cover',
          backgroundPosition: style.backgroundPosition || 'center',
          opacity: isActive ? 0.97 : isAnyHovered ? 0.2 : 0.98,
          transform: isActive ? 'scale(1.2)' : 'scale(1)',
          zIndex: isActive ? 20 : 10,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        tabIndex={0}
        aria-label={name}
        role="img"
        aria-hidden={false}
      />
    </div>
  );
};

export default TeamMemberImage; 