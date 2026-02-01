import React from 'react';

interface ProjectMetadataProps {
  metadata: {
    duration?: string;
    team?: string[];
    tools?: string[];
    outcomes?: string[];
  };
  className?: string;
}

const ProjectMetadata: React.FC<ProjectMetadataProps> = ({ metadata, className = '' }) => {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }

  const renderMetadataItem = (title: string, items: string[] | undefined) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-primary">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-primary px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`project-metadata bg-gray-50 rounded-2xl p-8 ${className}`}>
      <h3 className="text-xl font-semibold mb-6">Project Details</h3>
      <div className="space-y-6">
        {metadata.duration && (
          <div className="space-y-2">
            <h4 className="font-semibold text-lg text-primary">Duration</h4>
            <p className="text-primary">{metadata.duration}</p>
          </div>
        )}
        {renderMetadataItem('Team', metadata.team)}
        {renderMetadataItem('Tools & Technologies', metadata.tools)}
        {renderMetadataItem('Key Outcomes', metadata.outcomes)}
      </div>
    </div>
  );
};

export default ProjectMetadata; 