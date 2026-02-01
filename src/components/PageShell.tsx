import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PageShell: React.FC<PageShellProps> = ({ children, className = '', style }) => {
  return (
    <div 
      className={`mb-32 md:mb-12 pb-0 md:pb-5vw px-4 md:px-page-x pt-20 md:pt-0 bg-background ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
};

export default PageShell; 