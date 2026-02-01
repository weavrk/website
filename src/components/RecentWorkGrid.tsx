import React from 'react';
import ProjectCard from './ProjectCard';
import HorizontalCardCarousel from './HorizontalCardCarousel';
import { workProjects, sandboxProjects } from '../data/projects';

const RecentWorkGrid: React.FC = () => {
  // Map to specific projects as requested
  const blessuProject = sandboxProjects.find(p => p.id === 'blessu');
  const onboardingProject = workProjects.find(p => p.id === 'mobile-onboarding-flows');
  const spatialDataProject = workProjects.find(p => p.id === 'spatial-data-mapping');
  const ghgProject = workProjects.find(p => p.id === 'co2-emissions-dashboard');

  const recentProjects = [
    blessuProject ? {
      ...blessuProject,
      id: 'blessu-home',
      image: '/images/thumbnails/sandbox-blessu-mock.webp' // Use mock version for home page
    } : null, // card 01: sandbox/blessu (home version)
    spatialDataProject ? {
      ...spatialDataProject,
      image: '/images/projectImages/project02-v00-a.webp' // Use project image for home page
    } : null, // card 02: projects/spatial-data-mapping (home version)
    onboardingProject, // card 03: projects/onboarding
    ghgProject ? {
      ...ghgProject,
      image: '/images/thumbnails/work-co2-emissions-dashboard-mock.webp' // Use mock version for home page
    } : null, // card 04: projects/ghg emissions
  ].filter(Boolean); // Remove any undefined projects

  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden responsive-carousel-height home">
        <HorizontalCardCarousel 
          projects={recentProjects.filter((project): project is NonNullable<typeof project> => project !== null && project !== undefined)} 
          variant="home" 
          autoPlay={true}
          autoPlayInterval={3000}
        />
      </div>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 gap-x-12 gap-y-8 w-full px-[8vw] mt-24">
        {recentProjects.map((project, index) => (
          <ProjectCard
            key={project!.id}
            project={project!}
            variant={project!.id === 'blessu-home' ? 'work' : (project!.category === 'work' ? 'work' : 'home')}
            backgroundColor={
              project!.id === 'blessu-home' ? 'bg-[var(--color-accent-yellow-mid)]' :
              project!.id === 'mobile-onboarding-flows' ? 'bg-[var(--color-accent-blue-dark)]' :
              project!.id === 'spatial-data-mapping' ? 'bg-[var(--color-accent-yellow-dark)]' :
              project!.id === 'co2-emissions-dashboard' ? 'bg-[var(--color-accent-blue-lite)]' :
              'bg-[var(--color-background)]'
            }
            showComingSoon={(index < 3 && index !== 1) || index === 3}
          />
        ))}
      </div>
    </>
  );
};

export default RecentWorkGrid; 