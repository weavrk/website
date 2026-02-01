import React from 'react';

interface InterviewMemberProps {
  name: string;
  role: string;
  imageClass: string;
}

const InterviewMember: React.FC<InterviewMemberProps> = ({ name, role, imageClass }) => {
  const getImageSrc = (imageClass: string) => {
    switch (imageClass) {
      case 'michelle':
        return '/images/teamsPhotos/michelle.jpg';
      case 'allysandra':
        return '/images/teamsPhotos/allysandra.jpg';
      case 'kathryn':
        return '/images/teamsPhotos/kathryn.jpeg';
      default:
        return '';
    }
  };

  return (
    <div className="user-interview-list-items">
      <div 
        className={`team-member-image ${imageClass}`}
        style={{
          backgroundImage: `url(${getImageSrc(imageClass)})`
        }}
      />
              <div className="bc-label-headers text-center">{name}</div>
              <div className="bc-label text-center" style={{ whiteSpace: 'pre-line' }}>{role}</div>
    </div>
  );
};

const InterviewSection: React.FC = () => {
  return (
    <div className="user-interview-shell">
      <InterviewMember 
        name="Michelle" 
        role="Onboarding Coordinator" 
        imageClass="michelle"
      />
      <InterviewMember 
        name="Allysandra" 
        role="Onboarding Coordinator" 
        imageClass="allysandra"
      />
      <InterviewMember 
        name="Kathryne, PE" 
        role={`Energy Modeler,\nE* Reporting Manager`} 
        imageClass="kathryn"
      />
    </div>
  );
};

export default InterviewSection; 