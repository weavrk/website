import React, { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import AISectionSheet from '../components/AISectionSheet';
import { useNavigate } from 'react-router-dom';

interface ImageItem {
  src: string;
  caption: string;
}

interface AISubsection {
  title: string;
  subtitle: string;
  description: string;
  images: ImageItem[];
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAISection, setSelectedAISection] = useState<AISubsection | null>(null);

  // Calculate Product Design years from January 2022 to present
  const calculateProductDesignYears = () => {
    const startDate = new Date(2022, 0, 1); // January 2022
    const now = new Date();
    const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    return (monthsDiff / 12).toFixed(1);
  };

  // Calculate total Design years as sum of Product Design, DXD/RS, and Architecture
  const productDesignYears = parseFloat(calculateProductDesignYears());
  const dxdYears = 3.1;
  const architectureYears = 7.8;
  const totalDesignYears = (productDesignYears + dxdYears + architectureYears).toFixed(1);
  const [isAISheetOpen, setIsAISheetOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.classList.remove('mobile-menu-open');
    document.documentElement.style.overflow = '';
    document.documentElement.style.position = '';
  }, []);

  const photoStyle = {
    backgroundImage: 'url(/images/about/Weaver_Katherine_030421-33.webp)',
    backgroundPositionY: '40%',
    backgroundPositionX: '60%',
    backgroundSize: '160%',
    backgroundRepeat: 'no-repeat'
  };

  const handleAISectionClick = (subsection: AISubsection) => {
    setSelectedAISection(subsection);
    setIsAISheetOpen(true);
  };

  const handleCloseAISheet = () => {
    setIsAISheetOpen(false);
    setTimeout(() => {
      setSelectedAISection(null);
    }, 400);
  };

  // AI Augmented Design subsections
  const aiSubsections: AISubsection[] = [
    {
      title: 'AI Augmented Design',
      subtitle: 'Rapid Prototyping',
      description: 'Using AI tools to quickly iterate on design concepts, explore variations, and generate initial mockups. This accelerates the ideation phase and allows for more experimentation before committing to a direction.',
      images: [
        { src: '/images/project-pages/placeholder.webp', caption: 'AI-generated design variations' },
        { src: '/images/project-pages/placeholder.webp', caption: 'Rapid prototyping workflow' }
      ]
    },
    {
      title: 'AI Augmented Design',
      subtitle: 'Content Generation',
      description: 'Leveraging AI for generating placeholder content, user personas, and scenario descriptions. This helps maintain focus on design structure and user flow without getting bogged down in content creation early in the process.',
      images: [
        { src: '/images/project-pages/placeholder.webp', caption: 'AI-generated user personas' },
        { src: '/images/project-pages/placeholder.webp', caption: 'Content variations' }
      ]
    },
    {
      title: 'AI Augmented Design',
      subtitle: 'Design System Automation',
      description: 'Using AI to generate consistent design tokens, component variations, and documentation. This ensures design system scalability while maintaining human oversight for quality and brand alignment.',
      images: [
        { src: '/images/project-pages/placeholder.webp', caption: 'Automated design tokens' },
        { src: '/images/project-pages/placeholder.webp', caption: 'Component variations' }
      ]
    },
    {
      title: 'AI Augmented Design',
      subtitle: 'User Research Synthesis',
      description: 'Employing AI to analyze user interviews, surveys, and feedback at scale. This helps identify patterns and insights that might be missed in manual analysis, while the designer focuses on interpretation and design decisions.',
      images: [
        { src: '/images/project-pages/placeholder.webp', caption: 'Research synthesis dashboard' },
        { src: '/images/project-pages/placeholder.webp', caption: 'Pattern identification' }
      ]
    }
  ];

  return (
    <PageShell>
      {/* About Me Intro Section */}
      <section className="outer-shell">
        <section className="pp-background">
          <div className="about-content">
            <div className="about-intro-flex">
              <div 
                className="about-me-photo fade-in-start fade-in-animation-first"
                style={photoStyle}
              ></div>

              <div className="text-shell">
                <div className="about-intro-leadin">
                  <div className="about-leadin-part float-up-start float-up-animation-second">Hello,</div>
                  <div className="about-leadin-part float-up-start float-up-animation-second">I'm Katherine</div>
                </div>
                <p className="about-intro-subtitle float-up-start float-up-animation-third">
                  A product designer with a foundation in architecture and experience design. I translate complex systems into user-centered products that support meaningful business outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Personal Growth Model Section */}
      <section className="about-section">
        <div className="break-line-landing-primary-shell about-break-line-container about-break-header">
          <div className="break-line-landing-secondary-a"></div>
          <h2 className="about-section-break">Growth Model</h2>
          <div className="break-line-landing-secondary-b"></div>
        </div>
        <div className="about-content-wrapper">
          <p className="about-section-copy about-intro-text">
            What started as T-shaped growth has evolved into a compounding model over time.
          </p>
          <div className="about-growth-model-container">
            {/* Cumulative Diagram */}
            <div className="about-growth-item">
              <div className="about-growth-diagram-wrapper">
                <img src="/images/about/growth-cumulative.svg" alt="Cumulative growth model" className="about-growth-image" />
                <p className="about-caption-copy about-growth-caption-mobile">
                  Multiple areas of expertise at different depths
                </p>
                <p className="about-caption-copy about-growth-caption-desktop">
                  Multiple areas of expertise at different depths
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="about-growth-arrow">
              <img src="/images/about/growth-arrow.svg" alt="Arrow" className="about-growth-arrow-image" />
            </div>

            {/* Compounding Diagram */}
            <div className="about-growth-item">
              <div className="about-growth-diagram-wrapper">
                <img src="/images/about/growth-compounding.svg" alt="Compounding growth model" className="about-growth-image" />
                <p className="about-caption-copy about-growth-caption-mobile">
                  Continuous learning with accelerating growth phases
                </p>
                <p className="about-caption-copy about-growth-caption-desktop">
                  Continuous learning with accelerating growth phases
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="about-section">
        <div className="break-line-landing-primary-shell about-break-line-container about-break-header">
          <div className="break-line-landing-secondary-a"></div>
          <h2 className="about-section-break">Experience</h2>
          <div className="break-line-landing-secondary-b"></div>
        </div>
        <div className="about-experience-container">
          <p className="about-section-copy about-metrics-intro">
            I'm mindful of Goodhart's Law, once a metric becomes a target, it starts to lose its meaning. So instead of optimizing for years of experience and logos in my resume, I focus on the underlying capabilities they're meant to represent: curiosity, grit, and impact.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="about-diagram-header">2025 Top Metrics</p>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item">
            <p className="about-metrics-lg">3.56<span className="about-metrics-md">B+</span></p>
            <p className="about-metrics-sm">Tokens</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">137 <span className="about-metrics-md">hrs</span></p>
            <p className="about-metrics-sm">Podcasts & Audiobooks</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">8<span className="about-metrics-md">x</span></p>
            <p className="about-metrics-sm">Nerd Sniped</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">14<span className="about-metrics-md">%</span> <span className="about-metrics-md">Top</span></p>
            <p className="about-metrics-sm">Cursor Usage</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">144 <span className="about-metrics-md">days</span></p>
            <p className="about-metrics-sm">Vibe Coding</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">10<span className="about-metrics-md">x</span></p>
            <p className="about-metrics-sm">New Sandbox Projects</p>
          </div>
          </div>
          <div style={{ borderBottom: '1px solid var(--color-accent-blue-lite)', marginBottom: '24px', paddingBottom: '24px' }}>
          </div>
          <p className="about-diagram-header">Lifetime Metrics</p>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item">
            <p className="about-metrics-lg">8.2 <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Volunteer Mentorship</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">107<span className="about-metrics-md">+</span></p>
            <p className="about-metrics-sm">User Interviews</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">47<span className="about-metrics-md">+</span></p>
            <p className="about-metrics-sm">Features & Improvements Shipped</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">2</p>
            <p className="about-metrics-sm">0→1 Design Systems Built</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">367<span className="about-metrics-md">k</span> <span className="about-metrics-md">SF</span></p>
            <p className="about-metrics-sm">Building Area Designed</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">$84<span className="about-metrics-md">M</span></p>
            <p className="about-metrics-sm">Managed Construction Projects</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">$62.7<span className="about-metrics-md">M</span></p>
            <p className="about-metrics-sm">Client Recurring Revenue Generated</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">$12.4<span className="about-metrics-md">M</span></p>
            <p className="about-metrics-sm">Company Recurring Revenue Generated</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">3</p>
            <p className="about-metrics-sm">Higher-Ed Degree</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">3 <span className="about-metrics-md">CE Dev</span></p>
            <p className="about-metrics-sm">Certificates</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">7 <span className="about-metrics-md">Passed</span></p>
            <p className="about-metrics-sm">Licensing Exams</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">9<span className="about-metrics-md">x</span></p>
            <p className="about-metrics-sm">Rebuilt Portfolio</p>
          </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-accent-blue-lite)', marginTop: '24px', paddingTop: '24px' }}>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item">
            <p className="about-metrics-lg">{productDesignYears.toFixed(1)} <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Product Design</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">3.1 <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Revenue-Driven Experience Design</p>
          </div>
          <div className="about-metrics-item">
            <p className="about-metrics-lg">7.8 <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Architecture</p>
          </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-accent-blue-lite)', marginTop: '24px', paddingTop: '24px' }}>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item about-metrics-item-full-width">
            <p className="about-metrics-lg">{totalDesignYears} <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Professional Design Experience</p>
          </div>
          </div>
          </div>
          </div>
          </div>
        </div>
      </section>

      {/* Design Principles & Heuristics Section */}
      <section className="about-section">
        <div className="break-line-landing-primary-shell about-break-line-container about-break-header">
          <div className="break-line-landing-secondary-a"></div>
          <h2 className="about-section-break">Design Principles & Heuristics</h2>
          <div className="break-line-landing-secondary-b"></div>
        </div>
      </section>

      {/* Block Text Section */}
      <section className="about-section">
        <p className="about-section-leadin">
          Design transcends field and job title. At its core, it is about systems, patterns, and communication.
        </p>
      </section>

      {/* Design Principles & Heuristics Section */}
      <section className="about-section">
        {/* Principles List */}
        <div className="about-principles-section">
          <h2 className="about-section-header">Principles</h2>
          <div className="about-principles-grid">
            <div>
              <h4 className="text-lg font-semibold text-primary about-subsection-title-sm">Layout: Visual Hierarchy & Wayfinding</h4>
              <p className="about-section-copy">
                Clear information architecture guides users naturally through interfaces, reducing friction and cognitive overhead.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary about-subsection-title-sm">Type: Legibility is King</h4>
              <p className="about-section-copy about-text-italic">
                "Legibility is king" — Robert Bringhurst. Typography serves communication first, aesthetics second.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary about-subsection-title-sm">Structure & Scalability: Modularity</h4>
              <p className="about-section-copy">
                Building with reusable, composable components ensures consistency and enables rapid iteration at scale.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary about-subsection-title-sm">Behavior Before Aesthetics</h4>
              <p className="about-section-copy">
                Form follows function still holds. But... people have higher trust in aesthetically pleasing things. Balance is key.
              </p>
            </div>
          </div>
        </div>

        {/* Design Heuristics */}
        <div className="about-principles-section">
          <h2 className="about-section-header">Design Heuristics</h2>
          
          <div className="about-heuristics-grid">
            {/* Behavioral Sciences */}
            <div>
              <h3 className="text-lg font-semibold text-primary about-subsection-title">Behavioral Sciences</h3>
              <p className="about-section-copy">
                Understanding cognitive biases, decision-making patterns, and human psychology to create more intuitive and effective designs.
              </p>
            </div>

            {/* Patterns and Mental Models */}
            <div>
              <h3 className="text-lg font-semibold text-primary about-subsection-title">Patterns & Mental Models</h3>
              <p className="about-section-copy">
                Leveraging established design patterns and user mental models to create familiar, learnable interfaces that reduce cognitive load.
              </p>
            </div>

            {/* Third Column - Principles Project Ad */}
            <div className="role-tag-blue-lite about-principles-card about-card-rounded"
                 style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}
                 onClick={() => navigate('/work/principles-of-human-behavior')}>
              <h3 className="text-lg font-semibold text-primary about-principles-card-title">Principles of Human Behavior</h3>
              <p className="text-sm text-primary about-principles-card-text">
                Explore my project on design principles grounded in behavioral science
              </p>
              <div className="text-primary font-semibold text-sm">
                View Project →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Augmented Design Section */}
      <section className="about-section">
        <div className="break-line-landing-primary-shell about-break-line-container about-break-header">
          <div className="break-line-landing-secondary-a"></div>
          <h2 className="about-section-break">AI Augmented Design</h2>
          <div className="break-line-landing-secondary-b"></div>
        </div>
        <p className="about-section-copy about-intro-text">
          Exploring how AI tools enhance rather than replace the design process. From rapid prototyping to research synthesis, AI amplifies human creativity and strategic thinking.
        </p>

        {/* 4 Quadrant Grid */}
        <div className="about-ai-grid">
          {aiSubsections.map((subsection, index) => (
            <div
              key={index}
              className="bento-card-deboss about-ai-card about-card-rounded about-card-transition"
              style={{ backgroundColor: 'var(--color-background)' }}
              onClick={() => handleAISectionClick(subsection)}
            >
              <h3 className="text-lg font-semibold text-primary about-ai-card-title">{subsection.subtitle}</h3>
              <p className="text-sm text-primary about-text-clamp">{subsection.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collaborative Project Management Section */}
      <section className="about-section">
        <div className="break-line-landing-primary-shell about-break-line-container about-break-header">
          <div className="break-line-landing-secondary-a"></div>
          <h2 className="about-section-break">Collaborative Project Management</h2>
          <div className="break-line-landing-secondary-b"></div>
        </div>
        <p className="about-section-copy about-intro-text">
          The soft skills of my career have been instrumental in pushing projects forward and working with a wide array of collaborators. From architecture to DXD to product design, patterns of bringing people together toward a common goal transcend specific fields. The key to project management is keeping everyone unblocked while also identifying the critical path to get things over the line.
        </p>

        {/* Collaboration Diagram */}
        <div className="about-collab-diagram-wrapper">
          <div className="about-collab-diagram-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e5e5', borderRadius: '8px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="var(--color-primary)"/>
            </svg>
          </div>
        </div>
      </section>

      {/* AI Section Bottom Sheet */}
      <AISectionSheet
        isOpen={isAISheetOpen}
        onClose={handleCloseAISheet}
        subsection={selectedAISection}
      />
    </PageShell>
  );
};

export default About;
