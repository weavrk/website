import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  variant?: 'work' | 'sandbox' | 'home';
  backgroundColor?: string;
  showComingSoon?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'work',
  backgroundColor = 'bg-[var(--color-background)]',
  showComingSoon = false,
}) => {
  const navigate = useNavigate();

  // Function to extract CSS variable or hex color from Tailwind class
  const getCSSColor = (bgColor: string) => {
    // Check for CSS variable format
    const cssVarMatch = bgColor.match(/bg-\[var\(([^)]+)\)\]/);
    if (cssVarMatch) {
      return `var(${cssVarMatch[1]})`;
    }
    
    // Check for direct hex format
    const hexMatch = bgColor.match(/bg-\[#([A-Fa-f0-9]{6})\]/);
    if (hexMatch) {
      return `#${hexMatch[1]}`;
    }
    
    // Check for standard colors
    if (bgColor === 'bg-white') return 'white';
    
    return undefined;
  };

  // Handle card click to navigate to project URL
  const handleCardClick = () => {
    console.log('ProjectCard clicked:', project.title, project.url);
    if (project.url) {
      if (project.url.startsWith('http')) {
        // External URL - open in new tab
        window.open(project.url, '_blank');
      } else {
        // Internal URL - use React Router navigation
        // Handle hash URLs like /#/sandbox/blessu by removing the hash prefix
        let cleanUrl = project.url;
        if (cleanUrl.startsWith('/#')) {
          cleanUrl = cleanUrl.substring(2); // Remove /# prefix
        }
        // Navigate to the cleaned URL (React Router will handle the leading slash)
        console.log('Navigating to:', cleanUrl);
        navigate(cleanUrl);
      }
    }
  };

  // Simple background color mapping
  const getProjectBackgroundColor = (projectId: string) => {
    const colorMap: { [key: string]: string } = {
      'mobile-onboarding-flows': 'var(--color-accent-blue-dark)',
      'blessu': 'var(--color-accent-yellow-dark)',
      'blessu-home': 'var(--color-accent-yellow-mid)',
      'co2-emissions-dashboard': 'var(--color-accent-blue-lite)',
      'spatial-data-mapping': 'var(--color-accent-yellow-dark)',
      'pattern-libraries': 'var(--color-accent-yellow-lite)',
      'research-methods-toolbelt': 'var(--color-accent-yellow-mid)',
      'brand': 'var(--color-accent-blue-mid)'
    };
    return colorMap[projectId] || 'var(--color-accent-blue-lite)';
  };

  // Role tag shadow mapping - using the color-based shadows from DSL
  const getProjectRoleTagShadow = (projectId: string) => {
    const shadowMap: { [key: string]: string } = {
      // Work projects
      'mobile-onboarding-flows': '4px 6px 8px #43aaad, -4px -4px 8px #5be6eb',
      'co2-emissions-dashboard': '4px 6px 8px #b3cdcb, -4px -4px 8px #f3ffff',
      'spatial-data-mapping': '4px 6px 8px #d5ae52, -4px -4px 8px #f8e66e',
      'pattern-libraries': '4px 6px 8px #f0e6b3, -4px -4px 8px #fffff0',
      'research-methods-toolbelt': '4px 6px 8px #d9c69b, -4px -4px 8px #ffffd1',
      'brand': '4px 6px 8px #92c3c5, -4px -4px 8px #c6ffff',
      
      // Sandbox projects - using the exact color-based shadow values from DSL
      'blessu': '4px 6px 8px #b3cdcb, -4px -4px 8px #f3ffff', // blue-lite
      'blessu-home': '4px 6px 8px #d9c69b, -4px -4px 8px #ffffd1', // yellow-mid
      'cognitive-bias': '4px 6px 8px #d5d5d5, -4px -4px 8px #ffffff', // background
      'nomad': '4px 6px 8px #43aaad, -4px -4px 8px #5be6eb', // blue-dark
      'watchbox': '4px 6px 8px #c9c9c9, -4px -4px 8px var(--color-white)', // tertiary
      'chrona': '4px 6px 8px #92c3c5, -4px -4px 8px #c6ffff', // blue-mid
      'recipe-search': '4px 6px 8px #c9c9c9, -4px -4px 8px var(--color-white)', // tertiary
      'in-search-of-utopia': '4px 6px 8px #92c3c5, -4px -4px 8px #c6ffff', // blue-mid
      'recontextualizing-social-media': '4px 6px 8px #d9c69b, -4px -4px 8px #ffffd1', // yellow-mid
      'adventure-game': '4px 6px 8px #43aaad, -4px -4px 8px #5be6eb', // blue-dark
      'weavrk-v3': '4px 6px 8px #d5d5d5, -4px -4px 8px #ffffff', // background
      'weavrk-v2': '4px 6px 8px #d5ae52, -4px -4px 8px #f8e66e', // yellow-dark
      'weavrk-v1': '4px 6px 8px #e0e0e0, -4px -4px 8px var(--color-white)' // white
    };
    return shadowMap[projectId] || '4px 6px 8px #b3cdcb, -4px -4px 8px #f3ffff';
  };

  return (
    <div 
      className="block group h-full cursor-pointer transition-transform duration-200 hover:scale-[1.02]" 
      data-url={project.url}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div
        className="card-contents relative text-left flex flex-col neumorph-lg"
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          ...(variant === 'sandbox' ? {
            height: '100%',
            minHeight: '100%',
            maxHeight: '100%',
            backgroundColor: getCSSColor(backgroundColor),
            '--card-bg-color': getCSSColor(backgroundColor)
          } : variant === 'work' ? {
            backgroundColor: getProjectBackgroundColor(project.id)
          } : {})
        } as React.CSSProperties}
      >
        <div 
          className="flex flex-col flex-shrink-0 pt-6 pb-8"
          style={{ 
            paddingLeft: '24px',
            paddingRight: '24px',
            alignItems: 'flex-start',
            width: '100%',
            ...(variant === 'sandbox' ? {
              backgroundColor: project.id === 'weavrk-v1' ? 'white' : getCSSColor(backgroundColor)
            } : {}),
            flexShrink: 0
          }}
        >
          <div 
            className="pc-role-tag rounded-full inline-block w-fit"
            style={{
              backgroundColor: variant === 'work' ? getProjectBackgroundColor(project.id) : 
                (backgroundColor && backgroundColor.startsWith('bg-[var(--color-') ? 
                  backgroundColor.replace('bg-[var(--color-', 'var(--color-').replace(')]', '') : 
                  undefined),
              marginBottom: variant === 'sandbox' ? '18px' : '14px',
              boxShadow: (variant === 'work' || variant === 'home' || variant === 'sandbox') ? getProjectRoleTagShadow(project.id) : undefined
            }}
          >
            {project.role}
          </div>
          <div className="pc-title font-semibold mb-2">
            {project.titleCard || project.title}
          </div>
          <div className="pc-description">
            {project.description}
          </div>
        </div>
        
        <div className="flex-1 w-full overflow-hidden relative" style={{ backgroundColor: 'white', ...(variant === 'sandbox' ? { minHeight: 0 } : {}) }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full"
            style={{ 
              objectFit: 'cover',
              ...(variant === 'sandbox' ? { objectPosition: 'center top' } : {})
            }}
          />
          {showComingSoon && (
            <div className="absolute bottom-4 right-4">
              <div className="bg-white border border-tertiary text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                Coming Soon
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 