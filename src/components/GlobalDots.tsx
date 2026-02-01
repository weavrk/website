import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DSLSheet from './DSLSheet';
import { createPortal } from 'react-dom';
import { useCellNumbers } from '../contexts/CellNumbersContext';

const GlobalDots: React.FC = () => {
  const location = useLocation();
  const [isDSLSheetOpen, setIsDSLSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showCellNumbers, toggleCellNumbers } = useCellNumbers();

  // Check if we're on a BentoGrid page (project detail pages) - exclude DSL page and work tab since they have their own dots
  const isBentoGridPage = location.pathname.startsWith('/projects/') && 
                          location.pathname !== '/work';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[10001] flex flex-col items-center gap-2">
      {/* Cell Numbers Toggle Dot - only visible on BentoGrid pages */}
      {isBentoGridPage && (
        <div className="relative group">
          {/* Hover text */}
          <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <span 
              className="text-primary whitespace-nowrap"
              style={{
                fontFamily: 'Wix Madefor Display, sans-serif',
                fontSize: '10px',
                fontWeight: '500'
              }}
            >
              cell-id
            </span>
          </div>
          <button
            onClick={toggleCellNumbers}
            className="dot-counter w-4 h-4 rounded-full relative flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: showCellNumbers ? 'var(--color-primary)' : 'transparent',
              border: '2px solid var(--color-secondary)'
            }}
            onMouseEnter={(e) => {
              if (!showCellNumbers) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showCellNumbers) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
              }
            }}
            aria-label="Toggle cell numbers"
          />
        </div>
      )}
      
      {/* DSL Navigation Dot - always visible at bottom */}
      <div className="relative group">
        {/* Hover text */}
        <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <span 
            className="text-primary whitespace-nowrap"
            style={{
              fontFamily: 'Wix Madefor Display, sans-serif',
              fontSize: '10px',
              fontWeight: '500'
            }}
          >
            dsl
          </span>
        </div>
        <button
          onClick={() => {
            setIsDSLSheetOpen(prevState => !prevState);
          }}
          className="dot-dsl w-4 h-4 rounded-full relative group overflow-hidden transition-all duration-200"
          style={{
            backgroundColor: isDSLSheetOpen ? 'var(--color-primary)' : 'transparent',
            border: `2px solid ${isDSLSheetOpen ? 'var(--color-primary)' : 'var(--color-secondary)'}`
          }}
          onMouseEnter={(e) => {
            if (!isDSLSheetOpen) {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.borderColor = 'var(--color-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isDSLSheetOpen) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--color-secondary)';
            }
          }}
          aria-label={isDSLSheetOpen ? "Close Design System Library" : "Open Design System Library"}
        >
          {/* Background image that surfaces on hover or when drawer is open */}
          <div 
            className={`absolute inset-0 transition-opacity duration-200 ${
              isDSLSheetOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{
              backgroundImage: 'url(/images/thumbnails/radial.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </button>
      </div>
      
      {/* DSL Sheet - rendered via portal to avoid z-index conflicts */}
      {mounted && createPortal(
        <DSLSheet 
          isOpen={isDSLSheetOpen} 
          onClose={() => setIsDSLSheetOpen(false)} 
        />,
        document.body
      )}
    </div>
  );
};

export default GlobalDots;
