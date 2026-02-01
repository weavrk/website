import React from 'react';

interface ProjectTagProps {
  children: React.ReactNode;
  className?: string;
}

const ProjectTag: React.FC<ProjectTagProps> = ({ children, className = '' }) => {
  return (
    <span 
      className={`project-tag ${className}`}
    >
      {children}
    </span>
  );
};

export default ProjectTag; 
