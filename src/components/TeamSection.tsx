import React, { useState } from 'react';
import CircularTeamImage from './CircularTeamImage';

const teamMembers3D = [
  { name: 'Alec Manfre', role: 'CIO', image: '/images/teamsPhotos/alec.jpg', key: 'alec', className: 'alec' },
  { name: 'Cody Bond', role: 'Senior Researcher', image: '/images/teamsPhotos/cody.jpeg', key: 'cody', className: 'cody' },
  { name: 'Malathi Ananthakrishnan', role: 'Engineering Manager', image: '/images/teamsPhotos/malathi.jpg', key: 'malathi', className: 'malathi' },
  { name: 'James Sullivan', role: 'Back-End Engineer', image: '/images/teamsPhotos/james.jpeg', key: 'james', className: 'james' },
  { name: 'Peter Klingman', role: 'Front-End Engineer', image: '/images/teamsPhotos/peter.jpg', key: 'peter', className: 'peter' },
];

const teamMembers2D = [
  { name: 'Alec Manfre', role: 'CIO', image: '/images/teamsPhotos/alec.jpg', key: 'alec', className: 'alec' },
  { name: 'Cody Bond', role: 'Senior Researcher', image: '/images/teamsPhotos/cody.jpeg', key: 'cody', className: 'cody' },
  { name: 'Maggie Parsons', role: 'Product Manager', image: '/images/teamsPhotos/maggie.jpg', key: 'maggie', className: 'maggie' },
  { name: 'James Sullivan', role: 'Back-End Engineer', image: '/images/teamsPhotos/james.jpeg', key: 'james', className: 'james' },
  { name: 'Duncan Jacobsen', role: 'Front-End Engineer', image: '/images/teamsPhotos/duncan.jpg', key: 'duncan', className: 'duncan' },
];

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
};

interface TeamSectionProps {
  teamType?: '3d' | '2d';
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamType = '3d' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const teamMembers = teamType === '2d' ? teamMembers2D : teamMembers3D;

  const handleClick = (idx: number) => {
    if (isTouchDevice()) {
      // For touch devices, toggle the hovered state
      setHoveredIndex(hoveredIndex === idx ? null : idx);
    }
  };

  const handleMouseEnter = (idx: number) => {
    if (!isTouchDevice()) {
      setHoveredIndex(idx);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice()) {
      setHoveredIndex(null);
    }
  };

  const activeMember = hoveredIndex !== null ? teamMembers[hoveredIndex] : null;

  return (
    <div className="card-content" style={{ position: 'relative', height: '100%' }}>
      <div className="team-member-approach-grid">
        {teamMembers.map((member, idx) => (
          <CircularTeamImage
            key={member.key}
            name={member.name}
            className={member.className}
            image={member.image}
            isActive={hoveredIndex === idx}
            isAnyHovered={hoveredIndex !== null}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
      
      {/* Fixed height container for team member info - positioned at bottom left */}
      <div className="team-member-info-container" style={{ 
        position: 'absolute',
        bottom: '0',
        left: '0',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start'
      }}>
        {activeMember ? (
          <div className="project-info">
            <div className="project-name" style={{ fontWeight: 600 }}>
              {activeMember.name}
            </div>
            <div className="project-role" style={{ fontWeight: 400 }}>
              {activeMember.role}
            </div>
          </div>
        ) : (
          <div className="project-info team-instruction">
            <div className="project-name" style={{ fontWeight: 600 }}>
              <span className="team-instruction-text">
                {isTouchDevice() ? 'Click a team member to see their role' : 'Hover over a team member to see their role'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSection; 