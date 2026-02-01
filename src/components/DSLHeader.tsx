import React from 'react';

interface DSLHeaderProps {
  title: string;
  className?: string;
}

const DSLHeader: React.FC<DSLHeaderProps> = ({ title, className = '' }) => {
  return (
    <div className={`flex items-center dsl-headers ${className}`}>
      <p className="dsl-header mr-4">{title}</p>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
};

export default DSLHeader; 