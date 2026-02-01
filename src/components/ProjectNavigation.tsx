import React from 'react';
import { useNavigate } from 'react-router-dom';
import { workProjects, Project } from '../data/projects';
import { isGlobalAuthenticated } from '../utils/auth';

// Custom arrow icon component
const ArrowIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    className={className}
    width="20" 
    height="20" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="78.5" y1="50" x2="15.4" y2="50" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
    <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ProjectNavigationProps {
  currentProjectId: string;
  className?: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ 
  currentProjectId, 
  className = '' 
}) => {
  const navigate = useNavigate();

  // Get only work projects and filter based on authentication
  const getWorkProjects = (): Project[] => {
    const isAuthenticated = isGlobalAuthenticated();
    
    // If not authenticated, only show non-password-protected work projects
    if (!isAuthenticated) {
      return workProjects.filter(project => !project.passwordProtected);
    }
    
    // If authenticated, show all work projects
    return workProjects;
  };

  const projects = getWorkProjects();
  const currentIndex = projects.findIndex(p => p.id === currentProjectId);

  // Handle cycling navigation
  const getPreviousProject = (): Project => {
    if (currentIndex === 0) {
      // If first project, cycle to last
      return projects[projects.length - 1];
    }
    return projects[currentIndex - 1];
  };

  const getNextProject = (): Project => {
    if (currentIndex === projects.length - 1) {
      // If last project, cycle to first
      return projects[0];
    }
    return projects[currentIndex + 1];
  };

  const handlePreviousClick = () => {
    const prevProject = getPreviousProject();
    navigate(prevProject.url);
  };

  const handleNextClick = () => {
    const nextProject = getNextProject();
    navigate(nextProject.url);
  };

  const handleBackClick = () => {
    const currentProject = projects[currentIndex];
    navigate(currentProject.category === 'work' ? '/work' : '/sandbox');
  };

  // Don't render if current project not found
  if (currentIndex === -1) {
    return null;
  }

  const currentProject = projects[currentIndex];

  return (
    <div className={`project-navigation ${className}`}>
      <div className="flex items-center space-x-4 mt-[20vw]">
            <button
              onClick={handlePreviousClick}
              className="arrow-button-slide-background-light-blue-left md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary"
            >
              <div className="flex items-center justify-center w-5 h-5" style={{ transform: 'scaleX(-1)' }}>
                <ArrowIcon />
              </div>
              <div className="ml-1 flex items-center hidden md:flex">Prev</div>
            </button>

            <button
              onClick={handleNextClick}
              className="arrow-button-slide-background-light-blue md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary"
            >
              <div className="mr-1 flex items-center hidden md:flex">Next</div>
              <div className="flex items-center justify-center w-5 h-5">
                <ArrowIcon />
              </div>
            </button>
          </div>
        </div>
      );
};

export default ProjectNavigation; 