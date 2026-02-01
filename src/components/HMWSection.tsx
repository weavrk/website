import React, { useState, useEffect } from 'react';
import { Microscope } from 'lucide-react';

interface HMWSectionProps {
  text: string;
}

const HMWSection: React.FC<HMWSectionProps> = ({ text }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Responsive text styles
  const getTextStyles = () => {
    if (isMobile) {
      return {
        fontSize: '32px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        paddingLeft: 0,
        marginLeft: 0,
        marginTop: '8px',
        textAlign: 'left' as const,
        maxWidth: '100%',
        width: '100%'
      };
    } else if (windowWidth >= 1685) {
      return {
        fontSize: '64px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        paddingLeft: '32px',
        marginLeft: '-16px',
        marginTop: 0,
        textAlign: 'left' as const,
        maxWidth: '75vw',
        width: '75vw'
      };
    } else if (windowWidth >= 1600) {
      return {
        fontSize: '64px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        paddingLeft: '32px',
        marginLeft: '-16px',
        marginTop: 0,
        textAlign: 'left' as const,
        maxWidth: '75vw',
        width: '75vw'
      };
    } else {
      return {
        fontSize: '42px',
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        paddingLeft: '24px',
        marginLeft: '-12px',
        marginTop: 0,
        textAlign: 'left' as const,
        maxWidth: '75vw',
        width: '75vw'
      };
    }
  };

  const textStyles = getTextStyles();

  return (
    <div 
      className="hmw-shell" 
      style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        width: '100%',
        position: 'relative',
        paddingTop: isMobile ? '24px' : '48px',
        paddingBottom: isMobile ? '24px' : '48px',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '0' : '16px'
      }}
    >
      {/* Top border element */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isMobile ? '48px' : '80px',
          height: isMobile ? '4px' : '10px',
          backgroundColor: 'var(--color-accent-blue-mid)'
        }}
      />
      <div 
        className="hmw-mic" 
        style={{ 
          marginRight: isMobile ? 0 : 16,
          marginBottom: isMobile ? 16 : 0,
          flexShrink: 0
        }}
      >
        <Microscope 
          style={{ 
            width: isMobile ? 48 : 80, 
            height: isMobile ? 48 : 80, 
            stroke: 'var(--color-accent-blue-mid)'
          }} 
        />
      </div>
      <div
        className="project-leadin"
      >
        {text}
      </div>
    </div>
  );
};

export default HMWSection; 