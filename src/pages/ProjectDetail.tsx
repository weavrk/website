import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { workProjects, sandboxProjects, Project } from '../data/projects';
import PasswordProtection from '../components/PasswordProtection';
import { isGlobalAuthenticated } from '../utils/auth';
import HMWSection from '../components/HMWSection';
import BentoGrid from '../components/BentoGrid';
import BentoGridDefault from '../components/BentoGridDefault';
import ProjectTag from '../components/ProjectTag';
import BackToTop from '../components/BackToTop';

// Hook to detect screen size
const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useScreenSize();

  // Get only work projects and filter based on authentication
  const getWorkProjects = (): Project[] => {
    const isAuthenticated = isGlobalAuthenticated();
    
    // If not authenticated, only show non-password-protected work projects
    if (!isAuthenticated) {
      return workProjects.filter((project: Project) => !project.passwordProtected);
    }
    
    // If authenticated, show all work projects
    return workProjects;
  };

  useEffect(() => {
    // Find the project by ID
    const foundProject = [...workProjects, ...sandboxProjects].find(
      p => p.id === projectId
    );
    
    if (foundProject) {
      setProject(foundProject);
      // Check if user is globally authenticated
      if (!foundProject.passwordProtected || isGlobalAuthenticated()) {
        setIsAuthenticatedState(true);
      }
    }
    setIsLoading(false);
  }, [projectId]);

  const handlePasswordCorrect = () => {
    setIsAuthenticatedState(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:-mt-12">
      {project.passwordProtected && !isAuthenticatedState && (
        <PasswordProtection 
          onPasswordCorrect={handlePasswordCorrect}
          projectTitle={project.title}
          projectId={projectId!}
        />
      )}
      {/* Project Body */}
      <div className={`project-body mx-4 md:mx-page-x mt-16 md:mt-0 ${project.id === 'spatial-data-mapping' ? 'project-spatial-data' : ''} ${project.id === 'co2-emissions-dashboard' ? 'project-co2-emissions-dashboard' : ''}`}>
        {/* Header */}
        <div className="bg-background">
          <div className="w-full pb-3 md:pb-5">
            {/* Role Tag and Navigation */}
            <div className="flex justify-between items-center project-header-margin pt-8 md:pt-20">
              <ProjectTag>
                {project.role}
              </ProjectTag>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    const projects = getWorkProjects();
                    const currentIndex = projects.findIndex((p: Project) => p.id === projectId);
                    const prevProject = currentIndex === 0 ? projects[projects.length - 1] : projects[currentIndex - 1];
                    navigate(prevProject.url);
                  }}
                  className="arrow-button-slide-background-light-blue-left md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary"
                >
                  <div className="flex items-center justify-center w-5 h-5" style={{ transform: 'scaleX(-1)' }}>
                    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="ml-1 flex items-center hidden md:flex">Prev</div>
                </button>

                <button
                  onClick={() => {
                    const projects = getWorkProjects();
                    const currentIndex = projects.findIndex((p: Project) => p.id === projectId);
                    const nextProject = currentIndex === projects.length - 1 ? projects[0] : projects[currentIndex + 1];
                    navigate(nextProject.url);
                  }}
                  className="arrow-button-slide-background-light-blue md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary"
                >
                  <div className="mr-1 flex items-center hidden md:flex">Next</div>
                  <div className="flex items-center justify-center w-5 h-5">
                    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Project Title */}
            <h1 className="project-page-title">
              <span dangerouslySetInnerHTML={{ __html: project.title }} />
              {project.passwordProtected && !isGlobalAuthenticated() && (
                <Lock className="h-6 w-6 text-primary ml-3" />
              )}
            </h1>
            
            {/* Project Leadin */}
            <p className="project-page-title-description">
              {project.id === 'spatial-data-mapping' 
                ? "Delivering on the business promise of full software integration with the EPA's Energy Star Program."
                : project.id === 'co2-emissions-dashboard'
                ? "Transforming building data into portfolio-wide environmental impact metrics for regulatory and voluntary reporting."
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            </p>
            
          </div>
        </div>

        {/* Project Content */}
        <div className="w-full pb-3 md:pb-5">
        {/* Hero Image */}
        <div 
          className="hero-image w-full bg-white rounded-3xl mb-12 md:mb-20 xl:mb-28 bg-cover bg-center"
          style={{ 
              backgroundImage: `url(${project.heroImage ? (isMobile ? project.heroImage.mobile : project.heroImage.desktop) : project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'right center' : 'center',
            backgroundRepeat: 'no-repeat',
            height: '75vw'
          }}
            role="img"
            aria-label={project.heroImage?.alt || 'Project hero image'}
        ></div>



          {/* Bento Grid - Only show if enabled */}
          {project.bentoGrid?.enabled && (
            <div className="mb-12 md:mb-20 xl:mb-28">
              <BentoGrid projectDescription={project.hmwStatement || project.description} />
            </div>
          )}



      </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default ProjectDetail; 