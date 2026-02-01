import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { sandboxProjects } from '../data/projects';
import PageShell from '../components/PageShell';
import SandboxCircle from '../components/SandboxCircle';
import BackToTop from '../components/BackToTop';


const Sandbox: React.FC = () => {
  const [activeCircleId, setActiveCircleId] = useState<string | null>(null);
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [hoveredCircleId, setHoveredCircleId] = useState<string | null>(null);

  useEffect(() => {
  
  }, []);

  // Close drawer when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 768 && activeCircleId) {
        const target = event.target as Element;
        // Don't close if clicking on a circle or inside the drawer
        if (!target.closest('.sandbox-circle') && !target.closest('.block.md\\:hidden')) {
          setActiveCircleId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCircleId]);

  // Handle drawer height changes
  const handleDrawerHeightChange = (height: number) => {
    setDrawerHeight(height);
  };

  return (
    <PageShell className="!pb-0 md:pt-0 sandbox-page-shell">
      <div className="h-[90vh] md:h-[90vh] flex flex-col">
        <div>
          <p className="sandbox-leadin text-xl md:text-2xl mb-4 md:mb-8">
            Experimental playground.
          </p>
        </div>
        
        <div 
          className="md:flex-1 bg-background matrix-container rounded-2xl relative overflow-hidden quadrants p-4 transition-all duration-300 ease-out"
          style={{ 
            boxShadow: '4px 11px 18px #e4e4e4, -11px -11px 18px var(--color-white)',
            height: activeCircleId ? `calc(100vh - 80px - ${drawerHeight + 20}px - 48px)` : 'calc(100vh - 80px - 48px)',
            marginBottom: '4vw',
            background: `
              radial-gradient(circle at 50% 50%, rgba(178, 194, 198, 0.05) 0%, transparent 70%),
              linear-gradient(135deg, var(--color-background) 0%, rgba(250, 205, 96, 0.02) 50%, rgba(79, 200, 204, 0.02) 100%)
            `
          }}
          onClick={(e) => {
            // Close drawer when clicking on quadrant area (but not on circles)
            if (e.target === e.currentTarget && activeCircleId) {
              setActiveCircleId(null);
            }
          }}
        >
          {/* Cartesian Grid */}
          <div className="absolute inset-4 flex items-center justify-center">
            {/* Main Horizontal Axis */}
            <div 
              className="absolute" 
              style={{ 
                left: '24px',
                right: '24px',
                top: '50%',
                height: '2px',
                transform: 'translateY(-50%)',
                background: `linear-gradient(to right, 
                  transparent 0%, 
                  rgba(50, 53, 53, 0.15) 8%, 
                  rgba(50, 53, 53, 0.4) 25%, 
                  rgba(50, 53, 53, 0.6) 50%, 
                  rgba(50, 53, 53, 0.4) 75%, 
                  rgba(50, 53, 53, 0.15) 92%,
                  transparent 100%)`
              }}
            />
            
            {/* Main Vertical Axis */}
            <div 
              className="absolute" 
              style={{ 
                top: '24px',
                bottom: '24px',
                left: '50%',
                width: '2px',
                transform: 'translateX(-50%)',
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  rgba(50, 53, 53, 0.15) 8%, 
                  rgba(50, 53, 53, 0.4) 25%, 
                  rgba(50, 53, 53, 0.6) 50%, 
                  rgba(50, 53, 53, 0.4) 75%, 
                  rgba(50, 53, 53, 0.15) 92%,
                  transparent 100%)`
              }}
            />
            
            {/* Subtle Grid Lines - Horizontal */}
            {[25, 75].map((position, index) => (
              <div 
                key={`h-grid-${index}`}
                className="absolute" 
                style={{ 
                  left: '32px',
                  right: '32px',
                  top: `${position}%`,
                  height: '1px',
                  background: `linear-gradient(to right, 
                    transparent 0%, 
                    rgba(178, 194, 198, 0.2) 20%, 
                    rgba(178, 194, 198, 0.3) 50%, 
                    rgba(178, 194, 198, 0.2) 80%,
                    transparent 100%)`
                }}
              />
            ))}
            
            {/* Subtle Grid Lines - Vertical */}
            {[25, 75].map((position, index) => (
              <div 
                key={`v-grid-${index}`}
                className="absolute" 
                style={{ 
                  top: '32px',
                  bottom: '32px',
                  left: `${position}%`,
                  width: '1px',
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(178, 194, 198, 0.2) 20%, 
                    rgba(178, 194, 198, 0.3) 50%, 
                    rgba(178, 194, 198, 0.2) 80%,
                    transparent 100%)`
                }}
              />
            ))}
            
            {/* Refined Tick Marks - X-axis */}
            {[10, 20, 30, 40, 60, 70, 80, 90].map((position, index) => (
              <div 
                key={`x-tick-${index}`}
                className="absolute"
                style={{ 
                  left: `${position}%`,
                  top: '50%',
                  width: '1px',
                  height: '8px',
                  transform: 'translateX(-0.5px) translateY(-8px)',
                  background: 'rgba(50, 53, 53, 0.3)',
                  borderRadius: '0.5px'
                }}
              />
            ))}
            
            {/* Refined Tick Marks - Y-axis */}
            {[10, 20, 30, 40, 60, 70, 80, 90].map((position, index) => (
              <div 
                key={`y-tick-${index}`}
                className="absolute"
                style={{ 
                  top: `${position}%`,
                  left: '50%',
                  height: '1px',
                  width: '8px',
                  transform: 'translateY(-0.5px)',
                  background: 'rgba(50, 53, 53, 0.3)',
                  borderRadius: '0.5px'
                }}
              />
            ))}
            
            {/* Origin Point */}
            <div 
              className="absolute"
              style={{ 
                left: '50%',
                top: '50%',
                width: '6px',
                height: '6px',
                transform: 'translate(-50%, -50%)',
                background: 'var(--color-primary)',
                borderRadius: '50%',
                boxShadow: '0 0 0 2px var(--color-background), 0 0 0 3px rgba(50, 53, 53, 0.2)'
              }}
            />
            
            {/* All Sandbox Circles */}
            {(() => {
              // Define circle coordinates, background colors, and z-index
              const circleData = [
                { id: 'blessu', coords: [5, 7], bgColor: 'bg-[var(--color-accent-blue-lite)]', zIndex: 10 },
                { id: 'cognitive-bias', coords: [-2, -2], bgColor: 'bg-[var(--color-background)]', zIndex: 12 },
                { id: 'nomad', coords: [7, 8], bgColor: 'bg-[var(--color-accent-blue-dark)]', zIndex: 10 },
                { id: 'watchbox', coords: [5, 3], bgColor: 'bg-[var(--color-tertiary)]', zIndex: 30 },
                { id: 'chrona', coords: [6, 1], bgColor: 'bg-[var(--color-accent-blue-mid)]', zIndex: 25 },
                { id: 'coverage-heatmap', coords: [1, -3], bgColor: 'bg-[var(--color-accent-blue-lite)]', zIndex: 10 },
                { id: 'isochrone', coords: [4, 1], bgColor: 'bg-[var(--color-accent-blue-mid)]', zIndex: 20 },
                { id: 'market-research', coords: [2, 1], bgColor: 'bg-[var(--color-accent-yellow-mid)]', zIndex: 15 },
                { id: 'shift-simulator', coords: [-4, -3], bgColor: 'bg-[var(--color-accent-blue-dark)]', zIndex: 10 },
                { id: 'recipe-search', coords: [5, -5], bgColor: 'bg-[var(--color-tertiary)]', zIndex: 20 },
                { id: 'in-search-of-utopia', coords: [-8, -7], bgColor: 'bg-[var(--color-accent-blue-mid)]', zIndex: 10 },
                { id: 'recontextualizing-social-media', coords: [8, -5], bgColor: 'bg-[var(--color-accent-yellow-mid)]', zIndex: 10 },
                { id: 'adventure-game', coords: [3, -7], bgColor: 'bg-[var(--color-accent-blue-dark)]', zIndex: 10 },
                { id: 'weavrk-v3', coords: [-2, -6], bgColor: 'bg-[var(--color-background)]', zIndex: 15 },
                { id: 'weavrk-v2', coords: [-4, -6], bgColor: 'bg-[var(--color-accent-yellow-dark)]', zIndex: 10 },
                { id: 'weavrk-v1', coords: [-6, -6], bgColor: 'bg-white', zIndex: 10 }
              ];

              // Convert Cartesian coordinates to percentage
              const convertToPercentage = (x: number, y: number) => ({
                x: 50 + (x * 5), // Convert to percentage (center is 50%)
                y: 50 - (y * 5)  // Convert to percentage (inverted Y for screen coordinates)
              });

              return circleData.map((circle) => {
                const project = sandboxProjects.find(p => p.id === circle.id);
                if (!project) return null;

                const position = convertToPercentage(circle.coords[0], circle.coords[1]);
                const isHovered = hoveredCircleId === circle.id;
                const shouldFade = !!(
                  (hoveredCircleId && hoveredCircleId !== circle.id && window.innerWidth >= 768) ||
                  (activeCircleId && activeCircleId !== circle.id && window.innerWidth < 768)
                );

                return (
                  <SandboxCircle 
                    key={circle.id}
                    backgroundImage={project.image}
                    backgroundColor={circle.bgColor.replace('bg-[', '').replace(']', '')}
                    x={position.x}
                    y={position.y}
                    label={project.titleSandbox}
                    project={project}
                    cardBackgroundColor={circle.bgColor}
                    zIndex={circle.zIndex}
                    isActive={activeCircleId === circle.id}
                    isHovered={isHovered}
                    shouldFade={shouldFade}
                    onToggle={() => {
                      // Mobile: toggle drawer for this circle
                      setActiveCircleId(activeCircleId === circle.id ? null : circle.id);
                    }}
                    onClick={() => {
                      // Desktop circle click - navigate to project
                      if (project.url.startsWith('http')) {
                        window.open(project.url, '_blank');
                      } else {
                        window.location.href = project.url;
                      }
                    }}
                    onDrawerHeightChange={handleDrawerHeightChange}
                    onHover={(circleId) => setHoveredCircleId(circleId)}
                    onHoverEnd={() => setHoveredCircleId(null)}
                  />
                );
              }).filter(Boolean);
            })()}
          </div>
          
          {/* Enhanced Quadrant Headers */}
          {/* Logic - Top Left with improved typography */}
          <div className="absolute" style={{ left: 'calc(50% - 68px)', top: 'calc(8% - 8px)' }}>
            <div className="transform -rotate-90 origin-right text-right">
              <span 
                className="text-primary font-medium tracking-wide"
                style={{ 
                  fontSize: window.innerWidth < 768 ? '15px' : '18px',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  opacity: 0.85,
                  fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                }}
              >
                Logic
              </span>
            </div>
          </div>
          
          {/* Interactivity - Left side with improved positioning */}
          <div className="absolute top-1/2 transform translate-y-3" style={{ left: 'calc(12px + 16px)' }}>
            <span 
              className="text-primary font-medium tracking-wide"
              style={{ 
                fontSize: window.innerWidth < 768 ? '15px' : '18px',
                fontWeight: '600',
                letterSpacing: '0.02em',
                opacity: 0.85,
                fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
              }}
            >
              Interactivity
            </span>
          </div>
          
          {/* Enhanced Axis Labels with Better Typography */}
          {/* X-Axis Labels */}
          <div className="absolute left-3 top-1/2 transform -translate-y-10">
            <div className="flex items-center">
              <div 
                className="w-3 h-0.5 mr-2"
                style={{ 
                  background: 'linear-gradient(to right, var(--color-secondary), transparent)',
                  opacity: 0.6
                }}
              />
              <span 
                className="text-primary font-medium"
                style={{ 
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.01em',
                  opacity: 0.8,
                  fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                }}
              >
                Passive
              </span>
            </div>
          </div>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-10">
            <div className="flex items-center justify-end">
              <span 
                className="text-primary font-medium"
                style={{ 
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.01em',
                  opacity: 0.8,
                  fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                }}
              >
                Active
              </span>
              <div 
                className="w-3 h-0.5 ml-2"
                style={{ 
                  background: 'linear-gradient(to left, var(--color-secondary), transparent)',
                  opacity: 0.6
                }}
              />
            </div>
          </div>
          
          {/* Y-Axis Labels */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div 
                className="w-0.5 h-3 mb-1"
                style={{ 
                  background: 'linear-gradient(to bottom, var(--color-secondary), transparent)',
                  opacity: 0.6
                }}
              />
              <span 
                className="text-primary font-medium text-center"
                style={{ 
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.01em',
                  opacity: 0.8,
                  whiteSpace: 'nowrap',
                  fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                }}
              >
                Agentic
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span 
                className="text-primary font-medium text-center"
                style={{ 
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.01em',
                  opacity: 0.8,
                  fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                }}
              >
                Deterministic
              </span>
              <div 
                className="w-0.5 h-3 mt-1"
                style={{ 
                  background: 'linear-gradient(to top, var(--color-secondary), transparent)',
                  opacity: 0.6
                }}
              />
            </div>
          </div>
          
          {/* Quadrant Indicators - Subtle Corner Markers */}
          <div className="absolute top-6 right-6 opacity-30">
            <div className="w-6 h-6 border-t-2 border-r-2 border-secondary rounded-tr-lg" />
          </div>
          <div className="absolute top-6 left-6 opacity-30">
            <div className="w-6 h-6 border-t-2 border-l-2 border-secondary rounded-tl-lg" />
          </div>
          <div className="absolute bottom-6 right-6 opacity-30">
            <div className="w-6 h-6 border-b-2 border-r-2 border-secondary rounded-br-lg" />
          </div>


        </div>
      </div>
      
      <div className="pt-12 hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sandboxProjects.map((project, index) => {
            // Define background colors using CSS variables based on the card mapping
            const backgroundColors = [
              'bg-[var(--color-accent-blue-lite)]', // card 1: Blessu - light blue #d3f1ef
              'bg-[var(--color-background)]', // card 2: #fafafa
              'bg-[var(--color-accent-blue-dark)]', // card 3: Nomad - blue dark #4fc8cc
              'bg-[var(--color-tertiary)]', // card 4: #EDEDED
              'bg-[var(--color-accent-blue-mid)]', // card 5: blue-mid
              'bg-[var(--color-accent-yellow-mid)]', // card 6: #FFE9B6
              'bg-[var(--color-accent-blue-dark)]', // card 7: #4fc8cc
              'bg-[var(--color-background)]', // card 8: weavrk v3 - #fafafa
              'bg-[var(--color-accent-yellow-dark)]', // card 9: #FACD60
              'bg-[var(--color-white)]', // card 10: white
            ];
            
            // Use the background color based on the project's position in the original design
            const backgroundColor = backgroundColors[index] || 'bg-white';
            
            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                variant="sandbox"
                backgroundColor={backgroundColor}
                showComingSoon={index < 3 && index !== 1}
              />
            );
          })}
        </div>
      </div>
      <BackToTop />
    </PageShell>
  );
};

export default Sandbox; 