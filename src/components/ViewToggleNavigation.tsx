import React, { useRef } from 'react';
import { LandPlot, Building2 } from 'lucide-react';

interface ViewToggleNavigationProps {
  viewMode: 'view1' | 'view2';
  onViewModeChange: (mode: 'view1' | 'view2') => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  view1Label?: string;
  view2Label?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
  showNavButtons?: boolean;
  showViewToggle?: boolean;
  centered?: boolean;
  marginTop?: string;
  marginBottom?: string;
}

const ViewToggleNavigation: React.FC<ViewToggleNavigationProps> = ({
  viewMode,
  onViewModeChange,
  onPrevClick,
  onNextClick,
  view1Label = 'Site Use',
  view2Label = 'Building Use',
  prevLabel = 'Prev',
  nextLabel = 'Next',
  className = '',
  showNavButtons = true,
  showViewToggle = true,
  centered = false,
  marginTop = '5vw',
  marginBottom = '0'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use CSS class for specific styling, inline styles otherwise
  const useProjectNavClass = className.includes('project-nav');
  const useProjectToggleClass = className.includes('project-toggle');
  const useProjectBottomNavClass = className.includes('project-bottom-nav');
  const useProjectFooterNavClass = className.includes('project-footer-nav');
  const useCSSClass = useProjectNavClass || useProjectToggleClass || useProjectBottomNavClass || useProjectFooterNavClass;
  
  const containerStyles = useCSSClass ? {} : {
    marginTop,
    marginBottom,
    ...(showNavButtons && {
      paddingTop: '4vw'
    })
  };

  if (centered) {
    // Centered layout without nav buttons
    return (
      <div 
        ref={containerRef}
        className={`project-footer-nav ${className}`}
        style={containerStyles}
      >
        <div className="flex justify-center">
          {showViewToggle && (
            <div className={`view-toggle-container ${viewMode === 'view1' ? 'view1-active' : 'view2-active'}`}>
              <button 
                className={`view-toggle ${viewMode === 'view1' ? 'active' : ''}`}
                onClick={() => onViewModeChange('view1')}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  <LandPlot className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="ml-1 flex items-center">{view1Label}</div>
              </button>
              <button 
                className={`view-toggle ${viewMode === 'view2' ? 'active' : ''}`}
                onClick={() => onViewModeChange('view2')}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="ml-1 flex items-center">{view2Label}</div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default layout with optional nav buttons
  return (
    <div 
      ref={containerRef}
      className={`project-footer-nav w-full flex flex-col items-center ${className}`}
      style={containerStyles}
    >
      {/* Divider line at the top */}
      {showNavButtons && (
        <div 
          className="w-full mb-6"
          style={{ 
            height: '2px', 
            backgroundColor: 'var(--color-tertiary)',
            borderRadius: '1px'
          }}
        />
      )}
      
      {/* Container with two divs */}
      <div className="w-full relative">
        {/* Div 1: View Toggle Container - fills container, centered */}
        {showViewToggle && (
          <div className="flex justify-center w-full">
            <div 
              className={`view-toggle-container ${viewMode === 'view2' ? 'view2-active' : ''}`}
            >
              <button 
                className={`view-toggle ${viewMode === 'view1' ? 'active' : ''}`}
                onClick={() => onViewModeChange('view1')}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  <LandPlot className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="ml-1 flex items-center">{view1Label}</div>
              </button>
              <button 
                className={`view-toggle ${viewMode === 'view2' ? 'active' : ''}`}
                onClick={() => onViewModeChange('view2')}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="ml-1 flex items-center">{view2Label}</div>
              </button>
            </div>
          </div>
        )}
        
        {/* Div 2: Navigation Buttons - positioned to the right */}
        {showNavButtons && (
          <div className={`navigation-buttons-container flex items-center space-x-4 ${showViewToggle ? 'absolute top-0 right-0' : 'justify-end'}`}>
            <button 
              className="arrow-button-slide-background-light-blue-left md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary"
              onClick={onPrevClick}
            >
              <div className="flex items-center justify-center w-5 h-5" style={{ transform: 'scaleX(-1)' }}>
                <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></polyline>
                </svg>
              </div>
              <div className="flex items-center hidden md:flex">{prevLabel}</div>
            </button>
            <button 
              className="arrow-button-slide-background-light-blue md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary"
              onClick={onNextClick}
            >
              <div className="flex items-center hidden md:flex">{nextLabel}</div>
              <div className="flex items-center justify-center w-5 h-5">
                <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></polyline>
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewToggleNavigation;
