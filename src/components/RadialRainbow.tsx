import React from 'react';

interface RadialRainbowProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const RadialRainbow: React.FC<RadialRainbowProps> = ({ 
  size = 16, 
  className = '', 
  onClick,
  ariaLabel = 'Radial rainbow'
}) => {
  const center = size / 2;
  const radius = size / 2 - 2; // Leave 2px border
  
  return (
    <button
      onClick={onClick}
      className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
      }}
      aria-label={ariaLabel}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="rainbow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="16.67%" stopColor="#ff8000" />
            <stop offset="33.33%" stopColor="#ffff00" />
            <stop offset="50%" stopColor="#00ff00" />
            <stop offset="66.67%" stopColor="#0080ff" />
            <stop offset="83.33%" stopColor="#8000ff" />
            <stop offset="100%" stopColor="#ff0080" />
          </radialGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="url(#rainbow-gradient)"
        />
      </svg>
    </button>
  );
};

export default RadialRainbow;
