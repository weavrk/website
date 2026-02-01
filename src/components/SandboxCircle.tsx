import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Project } from '../data/projects';
import ProjectCard from './ProjectCard';

interface SandboxCircleProps {
  backgroundImage: string;
  backgroundColor?: string;
  x?: number;
  y?: number;
  label?: string;
  project?: Project;
  cardBackgroundColor?: string;
  zIndex?: number;
  isActive?: boolean;
  isHovered?: boolean;
  shouldFade?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  onDrawerHeightChange?: (height: number) => void;
  onHover?: (circleId: string) => void;
  onHoverEnd?: () => void;
}

const SandboxCircle: React.FC<SandboxCircleProps> = ({
  backgroundImage,
  backgroundColor = '#fafafa',
  x = 0,
  y = 0,
  label,
  project,
  cardBackgroundColor = 'bg-[var(--color-background)]',
  zIndex = 10,
  isActive = false,
  isHovered = false,
  shouldFade = false,
  onToggle,
  onClick,
  onDrawerHeightChange,
  onHover,
  onHoverEnd
}) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate drawer height based on text content
  useEffect(() => {
    if (isActive && textContentRef.current) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        if (textContentRef.current) {
          const textHeight = textContentRef.current.offsetHeight;
          const newDrawerHeight = textHeight + 16; // Reduced padding from 40px to 16px
          setDrawerHeight(newDrawerHeight);
          
          // Notify parent component about height change
          if (onDrawerHeightChange) {
            onDrawerHeightChange(newDrawerHeight);
          }
        }
      }, 50);
    } else if (!isActive && onDrawerHeightChange) {
      onDrawerHeightChange(0);
    }
  }, [isActive, project, onDrawerHeightChange]);

  // Measure card height for "in-search-of-utopia" when hovered
  useEffect(() => {
    if (isHovered && project?.id === 'in-search-of-utopia' && cardRef.current) {
      const height = cardRef.current.offsetHeight;
      console.log(`[Card Height] in-search-of-utopia card height: ${height}px`);
    }
  }, [isHovered, project]);

  // Calculate quadrant-based positioning
  const getCardPosition = () => {
    const centerX = 50;
    const centerY = 50;
    
    // Use a fixed percentage offset that approximates 24px gap + circle radius
    // This is approximately 120px (80px radius + 40px gap) from circle center
    const cardOffset = 10; // Increased from 8 to 10 for 16px more gap
    
    // Determine quadrant based on circle position relative to center
    const isRightQuadrant = x >= centerX; // (+) for x
    const isTopQuadrant = y <= centerY;   // (+) for y (inverted because top is smaller value)
    
    let cardX, cardY, transformX, transformY;
    
    if (isRightQuadrant && isTopQuadrant) {
      // (+,+) quadrant: card to the left of circle, top-aligned to circle
      cardX = x - cardOffset;
      cardY = y;
      transformX = '-100%';
      transformY = '0%'; // Top-aligned
    } else if (isRightQuadrant && !isTopQuadrant) {
      // (+,-) quadrant: card to the left of circle, bottom-aligned to circle
      cardX = x - cardOffset;
      cardY = y;
      transformX = '-100%';
      transformY = '-100%'; // Bottom-aligned
    } else if (!isRightQuadrant && !isTopQuadrant) {
      // (-,-) quadrant: card to the right of circle, bottom-aligned to circle
      cardX = x + cardOffset;
      cardY = y;
      transformX = '0%';
      transformY = '-100%'; // Bottom-aligned
    } else {
      // (-,+) quadrant: card to the right of circle, top-aligned to circle
      cardX = x + cardOffset;
      cardY = y;
      transformX = '0%';
      transformY = '0%'; // Top-aligned
    }
    
    return {
      left: `${cardX}%`,
      top: `${cardY}%`,
      transform: `translate(${transformX}, ${transformY})`
    };
  };

  // Determine background size based on project
  const getBackgroundSize = () => {
    if (project?.id === 'nomad' || project?.id === 'blessu') {
      return '150%';
    }
    return '200%';
  };

  const style = {
    position: 'absolute' as const,
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    border: '2px solid white',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: getBackgroundSize(),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '4px 11px 18px #e4e4e4, inset 4px 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    zIndex: (isHovered || isActive) ? 500 : zIndex,
    opacity: shouldFade ? 0.25 : 1
  };

  // Create overlay style for the background color
  const overlayStyle = {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    opacity: 0.1,
    pointerEvents: 'none' as const
  };

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
    if (bgColor === 'bg-white') return 'var(--color-white)';
    
    return 'var(--color-background)'; // default
  };

  // Function to get role tag shadow class based on background color
  const getRoleTagShadowClass = (bgColor: string) => {
    const cssColor = getCSSColor(bgColor);
    
    // Map CSS colors to role tag shadow classes
    const shadowClassMap: { [key: string]: string } = {
      'var(--color-background)': 'role-tag-background',
      'var(--color-tertiary)': 'role-tag-tertiary',
      'var(--color-accent-blue-lite)': 'role-tag-blue-lite',
      'var(--color-accent-blue-mid)': 'role-tag-blue-mid',
      'var(--color-accent-blue-dark)': 'role-tag-blue-dark',
      'var(--color-accent-yellow-lite)': 'role-tag-yellow-lite',
      'var(--color-accent-yellow-mid)': 'role-tag-yellow-mid',
      'var(--color-accent-yellow-dark)': 'role-tag-yellow-dark',
      'var(--color-white)': 'role-tag-white',
    };
    
    return shadowClassMap[cssColor] || 'role-tag-background'; // default
  };

  return (
    <>
      <style>{`
        .sandbox-circle {
          width: 120px;
          height: 120px;
        }
        .sandbox-circle-label {
          display: none;
        }
        @media (max-width: 768px) {
          .sandbox-circle {
            width: 64px;
            height: 64px;
          }
          .sandbox-circle-label {
            display: none;
          }
        }
        /* Force sandbox hover cards to be exactly 400px */
        @media (min-width: 768px) {
          .sandbox-hover-card {
            height: 400px !important;
          }
          .sandbox-hover-card > div {
            height: 100% !important;
          }
          .sandbox-hover-card .card-contents {
            height: 100% !important;
            min-height: 100% !important;
            max-height: 100% !important;
          }
          /* Ensure background colors from inline styles are applied */
          .sandbox-hover-card .card-contents[style] {
            background-color: var(--card-bg-color, inherit) !important;
          }
        }
      `}</style>
      <div 
        className="sandbox-circle"
        style={style}
        onClick={(e) => {
          // On mobile, toggle drawer for this specific circle
          if (window.innerWidth < 768 && onToggle) {
            onToggle();
          }
          // On desktop, navigate to project
          else if (onClick) {
            onClick();
          }
        }}
        onMouseEnter={(e) => {
          // Only handle mouse events on desktop
          if (window.innerWidth >= 768) {
            if (onHover && project) {
              onHover(project.id);
            }
            if (onClick) {
              e.currentTarget.style.boxShadow = '4px 16px 18px #bdbdbd, inset 4px 4px 8px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }
          }
        }}
        onMouseLeave={(e) => {
          // Only handle mouse events on desktop
          if (window.innerWidth >= 768) {
            if (onHoverEnd) {
              onHoverEnd();
            }
            if (onClick) {
              e.currentTarget.style.boxShadow = '4px 11px 18px #e4e4e4, inset 4px 4px 8px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translate(-50%, -50%)';
            }
          }
        }}
      >
        {/* Background color overlay */}
        <div style={overlayStyle} />
        {label && (
          <div
            className="sandbox-circle-label"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 20px)',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'var(--color-primary)',
              fontSize: '12px',
              fontWeight: '300',
              textAlign: 'left',
              maxWidth: '160px',
              padding: '0 0 2px 0',
              paddingLeft: '0',
              pointerEvents: 'none',
              whiteSpace: 'normal',
              lineHeight: '1.3',
              letterSpacing: '0.02em',
              textTransform: 'lowercase',
              opacity: 0.85,
              fontFamily: "'Wix Madefor Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '0',
                width: '2px',
                height: '16px',
                backgroundColor: 'var(--color-primary)',
                content: '""'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 'calc(50% + 16px)',
                bottom: '0',
                maxWidth: '200px'
              }}
            >
              {label.toLowerCase()}
            </div>
          </div>
        )}
      </div>

      {/* Hover Card */}
      {project && (
        <>
          {/* Desktop Card - positioned based on quadrant */}
          {isHovered && (
            <div
              ref={cardRef}
              className="hidden md:block sandbox-hover-card"
              style={{
                position: 'absolute',
                ...getCardPosition(),
                width: '420px',
                height: '400px',
                maxHeight: '400px',
                minHeight: '400px',
                zIndex: 1000,
                pointerEvents: 'none',
                opacity: 1,
                transition: 'all 0.2s ease-out',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <ProjectCard 
                project={project}
                variant="sandbox"
                backgroundColor={cardBackgroundColor}
                showComingSoon={false}
              />
            </div>
          )}
          
          {/* Mobile Card - bottom drawer style */}
          <div
            ref={drawerRef}
            className="block md:hidden"
            style={{
              position: 'fixed',
              left: '0',
              right: '0',
              bottom: '0',
              zIndex: 1000,
              pointerEvents: isActive ? 'auto' : 'none',
              transform: isActive 
                ? `translateY(${isDragging ? currentY : 0}px)` 
                : 'translateY(100%)',
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              overflow: 'hidden',
              height: isActive ? `${drawerHeight}px` : 'auto'
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              setStartY(touch.clientY);
              setCurrentY(0);
              setIsDragging(true);
            }}
            onTouchMove={(e) => {
              if (!isDragging) return;
              const touch = e.touches[0];
              const deltaY = Math.max(0, touch.clientY - startY); // Only allow downward movement
              setCurrentY(deltaY);
            }}
            onTouchEnd={() => {
              if (isDragging) {
                // If dragged down more than 50px, close the drawer
                if (currentY > 50 && onToggle) {
                  onToggle();
                }
                setIsDragging(false);
                setCurrentY(0);
              }
            }}
            onClick={(e) => {
              // Prevent closing when clicking on close button
              if (e.target instanceof Element && e.target.closest('.close-button')) {
                return;
              }
              // Navigate to project when clicking on card content
              if (project?.url) {
                if (project.url.startsWith('http')) {
                  window.open(project.url, '_blank');
                } else {
                  window.location.href = project.url;
                }
              }
            }}
          >
            <div style={{ 
              borderRadius: '16px 16px 0 0', 
              overflow: 'hidden', 
              cursor: 'pointer', 
              height: '100%', 
              position: 'relative',
              backgroundColor: getCSSColor(cardBackgroundColor)
            }}>
              {/* Close button */}
              <button
                className="close-button absolute top-3 right-3 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggle) {
                    onToggle();
                  }
                }}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none'
                }}
              >
                <X size={28} color="var(--color-primary)" />
              </button>
              
              {/* Text content only */}
              <div 
                ref={textContentRef}
                className="px-6 pt-6 pb-4"
                style={{ 
                  backgroundColor: getCSSColor(cardBackgroundColor)
                }}
              >
                <div 
                  className={`text-sm text-primary rounded-full inline-block w-fit ${getRoleTagShadowClass(cardBackgroundColor)}`}
                  style={{
                    backgroundColor: getCSSColor(cardBackgroundColor),
                    padding: '8px 20px', // Updated to match desktop cards
                    marginBottom: '16px',
                    fontWeight: '500',
                    fontSize: '0.7rem' // 80% of text-sm on mobile
                  }}
                >
                  {project.role}
                </div>
                <div 
                  className="font-semibold mb-2"
                  style={{
                    fontSize: '1.5rem',
                    lineHeight: 'normal',
                    width: '80%' // Make title width 80%
                  }}
                >
                  {project.title}
                </div>
                <div 
                  className="text-primary"
                  style={{
                    fontSize: '0.8rem' // 80% of text-base on mobile
                  }}
                >
                  {project.description}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SandboxCircle; 