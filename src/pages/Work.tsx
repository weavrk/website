import React, { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import HorizontalCardCarousel from '../components/HorizontalCardCarousel';
import { workProjects } from '../data/projects';
import PageShell from '../components/PageShell';
import BackToTop from '../components/BackToTop';


const Work: React.FC = () => {
  useEffect(() => {
  
  }, []);

  return (
    <PageShell 
      className="flex flex-col !pb-0 !px-0 md:!px-page-x work-page-shell"
      style={{
        height: 'calc(100vh + 164px + 40px)',
        minHeight: 'calc(100vh + 164px + 40px)'
      }}
    >
      {/* Mobile Carousel */}
      <div className="md:hidden flex-1">
        <HorizontalCardCarousel 
          projects={workProjects} 
          variant="work"
          backgroundColor="bg-[var(--color-background)]"
          className="responsive-carousel-height"
        />
      </div>
      
      {/* Desktop Grid */}
      <div 
        className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-8 work-grid-desktop"
        style={{
          // Desktop: equal height rows that fill the container
          gridAutoRows: 'minmax(0, 1fr)',
          height: 'calc(100vh + 164px)',
          minHeight: 'calc(100vh + 164px)'
        }}
      >
        {workProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            variant="work"
            backgroundColor={project.id === 'mobile-onboarding-flows' ? 'bg-[var(--color-accent-blue-dark)]' : 'bg-[var(--color-background)]'}
            showComingSoon={project.id !== 'spatial-data-mapping'}
          />
        ))}
      </div>
      <BackToTop />
    </PageShell>
  );
};

export default Work; 