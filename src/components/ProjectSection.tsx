import React from 'react';
import { ProjectSection as ProjectSectionType } from '../data/projects';

interface ProjectSectionProps {
  section: ProjectSectionType;
  className?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ section, className = '' }) => {
  const renderContent = () => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            {section.title && (
              <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
            )}
            <div className="text-lg leading-relaxed mb-8">
              {typeof section.content === 'string' ? (
                <p>{section.content}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="w-full">
            {section.title && (
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            )}
            <img 
              src={section.content.src} 
              alt={section.content.alt || section.title || 'Project image'}
              className="w-full h-auto rounded-2xl"
            />
            {section.content.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center">{section.content.caption}</p>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-12 h-1 bg-primary"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                  {section.content.quote}
                </h3>
                {section.content.author && (
                  <p className="text-lg font-medium text-primary">— {section.content.author}</p>
                )}
              </div>
              {section.content.context && (
                <div className="space-y-6 text-primary">
                  <p className="text-base leading-relaxed opacity-75">
                    {section.content.context}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.content.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-8">
            {section.title && (
              <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
            )}
            <div className="space-y-6">
              {section.content.map((item: any, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-gray-600 mb-2">{item.date}</p>
                    <p className="text-primary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.content.map((image: any, index: number) => (
              <div key={index} className="space-y-2">
                <img 
                  src={image.src} 
                  alt={image.alt || `Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {image.caption && (
                  <p className="text-sm text-gray-600">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 'video':
        return (
          <div className="w-full">
            {section.title && (
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            )}
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src={section.content.src}
                title={section.content.title || section.title || 'Project video'}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="custom-section">
            {section.content}
          </div>
        );

      default:
        return <div>Unsupported section type: {section.type}</div>;
    }
  };

  // Determine the data-type based on section content and title
  const getDataType = () => {
    const title = section.title?.toLowerCase() || '';
    const content = typeof section.content === 'string' ? section.content.toLowerCase() : '';
    
    // Check for insights/research keywords
    if (title.includes('insight') || title.includes('research') || title.includes('finding') || 
        title.includes('discovery') || title.includes('user') || title.includes('feedback') ||
        content.includes('insight') || content.includes('research') || content.includes('finding')) {
      return 'insights';
    }
    
    // Check for process/step keywords
    if (title.includes('process') || title.includes('step') || title.includes('method') || 
        title.includes('approach') || title.includes('timeline') || title.includes('phase') ||
        content.includes('process') || content.includes('step') || content.includes('method')) {
      return 'process';
    }
    
    // Check for results/outcomes keywords
    if (title.includes('result') || title.includes('outcome') || title.includes('achievement') || 
        title.includes('impact') || title.includes('metric') || title.includes('success') ||
        content.includes('result') || content.includes('outcome') || content.includes('achievement')) {
      return 'results';
    }
    
    // Default to text for general content
    return 'text';
  };

  return (
    <section className={`project-section ${className}`} data-type={getDataType()}>
      {renderContent()}
    </section>
  );
};

export default ProjectSection; 