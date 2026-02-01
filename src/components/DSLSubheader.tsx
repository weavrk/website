import React from 'react';

interface DSLSubheaderProps {
  title: string;
  className?: string;
}

const DSLSubheader: React.FC<DSLSubheaderProps> = ({ title, className = '' }) => {
  return (
    <div className={`flex items-center mb-6 dsl-subheaders ${className}`}>
      <p className="text-sm font-medium text-gray-500 mr-4">{title}</p>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>
  );
};

export default DSLSubheader; 