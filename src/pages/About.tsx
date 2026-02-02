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
      subtitle: 'Rapid Early Ideation',
      description: 'AI is useful early in design when constraints are loose and the goal is exploration. I iterate through broad variations by setting initial boundaries and letting AI generate content flows and UI possibilities. This surfaces unexpected directions rather than narrowing on a single idea too soon.',
      images: [
        { src: '/images/about/ai-rapid-early-ideation-1.webp', caption: 'AI-generated design variations' },
        { src: '/images/about/ai-rapid-early-ideation-2.webp', caption: 'Rapid prototyping workflow' },
        { src: '/images/about/ai-rapid-early-ideation-3.webp', caption: 'Content flow variations' },
        { src: '/images/about/ai-rapid-early-ideation-4.webp', caption: 'UI possibilities exploration' }
      ]
    },
    {
      title: 'AI Augmented Design',
      subtitle: 'Proof of Concept',
      description: 'I vibe code lightweight tools and working prototypes early. The proof of concept acts as both a scoping exercise and a testing ground, allowing teams to interact with ideas directly. This short-circuits long product cycles, exposes assumptions earlier, and grounds conversations in real behavior and constraints early.',
      images: [
        { src: '/images/about/ai-proof-of-concept-1.webp', caption: 'AI-generated user personas' },
        { src: '/images/about/ai-proof-of-concept-2.webp', caption: 'Content variations' },
        { src: '/images/about/ai-proof-of-concept-3.webp', caption: 'Prototype interactions' },
        { src: '/images/about/ai-proof-of-concept-4.webp', caption: 'Scoping exercises' }
      ]
    },
    {
      title: 'AI Augmented Design',
      subtitle: 'Copy Tuning and Behavioral Research',
      description: 'I explore tone, messaging, and microcopy through agentic feedback loops. This includes generating variants, stress-testing language for clarity and intent, and aligning copy with behavioral patterns. The goal is concise language that supports behavior and reduces friction.',
      images: [
        { src: '/images/about/ai-copy-tuning-and-behavioral-research-1.webp', caption: 'Automated design tokens' },
        { src: '/images/about/ai-copy-tuning-and-behavioral-research-2.webp', caption: 'Component variations' },
        { src: '/images/about/ai-copy-tuning-and-behavioral-research-3.webp', caption: 'Messaging variants' },
        { src: '/images/about/ai-copy-tuning-and-behavioral-research-4.webp', caption: 'Behavioral pattern alignment' }
      ]
    },
    {
      title: 'AI Augmented Design',
      subtitle: 'Data Querying',
      description: 'AI helps accelerate early data work by supporting quick SQL writing to pull aggregates, counts, and patterns needed for identifying trends, business gaps, user behavior. This allows me to shape data-driven interfaces without waiting on full data pipelines or analytics support. The result is tighter alignment between data structure and design intent.',
      images: [
        { src: '/images/about/ai-data-query-1.webp', caption: 'Research synthesis dashboard' },
        { src: '/images/about/ai-data-query-2.webp', caption: 'Pattern identification' },
        { src: '/images/about/ai-data-query-3.webp', caption: 'Data-driven interfaces' },
        { src: '/images/about/ai-data-query-4.webp', caption: 'SQL query generation' }
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="about-growth-item about-card-metrics">
                <div className="about-growth-diagram-wrapper">
                  <img src="/images/about/growth-cumulative.svg" alt="Cumulative growth model" className="about-growth-image" />
                </div>
              </div>
              <p className="about-caption-copy about-growth-caption-mobile">
                Multiple areas of expertise at different depths
              </p>
              <p className="about-caption-copy about-growth-caption-desktop">
                Multiple areas of expertise at different depths
              </p>
            </div>

            {/* Arrow */}
            <div className="about-growth-arrow">
              <img src="/images/about/growth-arrow.svg" alt="Arrow" className="about-growth-arrow-image" />
            </div>

            {/* Compounding Diagram */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="about-growth-item about-card-emboss">
                <div className="about-growth-diagram-wrapper">
                  <img src="/images/about/growth-compounding.svg" alt="Compounding growth model" className="about-growth-image" />
                </div>
              </div>
              <p className="about-caption-copy about-growth-caption-mobile">
                Continuous learning with accelerating growth phases
              </p>
              <p className="about-caption-copy about-growth-caption-desktop">
                Continuous learning with accelerating growth phases
              </p>
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
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">3.56<span className="about-metrics-md">B+</span></p>
            <p className="about-metrics-sm">Tokens</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">137 <span className="about-metrics-md">hrs</span></p>
            <p className="about-metrics-sm">Podcasts & Audiobooks</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">8<span className="about-metrics-md">x</span></p>
            <p className="about-metrics-sm">Nerd Sniped</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">14<span className="about-metrics-md">%</span> <span className="about-metrics-md">Top</span></p>
            <p className="about-metrics-sm">Cursor Usage</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">144 <span className="about-metrics-md">days</span></p>
            <p className="about-metrics-sm">Vibe Coding</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">10<span className="about-metrics-md">x</span></p>
            <p className="about-metrics-sm">New Sandbox Projects</p>
          </div>
          </div>
          <div style={{ borderBottom: '1px solid var(--color-accent-blue-lite)', marginBottom: '24px', paddingBottom: '24px' }}>
          </div>
          <p className="about-diagram-header">Lifetime Metrics</p>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">8.2 <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Volunteer Mentorship</p>
          </div>
            <div className="about-metrics-item about-card-metrics">
              <p className="about-metrics-lg">71<span className="about-metrics-md">+</span></p>
              <p className="about-metrics-sm">User Interviews</p>
            </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">47<span className="about-metrics-md">+</span></p>
            <p className="about-metrics-sm">Features & Improvements Shipped</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">2</p>
            <p className="about-metrics-sm">0→1 Design Systems Built</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">367<span className="about-metrics-md">k</span> <span className="about-metrics-md">SF</span></p>
            <p className="about-metrics-sm">Building Area Designed</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">$84<span className="about-metrics-md">M</span></p>
            <p className="about-metrics-sm">Managed Construction Projects</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">$62.7<span className="about-metrics-md">M</span></p>
            <p className="about-metrics-sm">Client Recurring Revenue Generated</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">$12.4<span className="about-metrics-md">M</span></p>
            <p className="about-metrics-sm">Company Recurring Revenue Generated</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">3</p>
            <p className="about-metrics-sm">Higher Education Degrees</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">3 <span className="about-metrics-md">Dev</span></p>
            <p className="about-metrics-sm">Continuing Education Certificates</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">7 <span className="about-metrics-md">Passed</span></p>
            <p className="about-metrics-sm">Licensing Exams</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">9<span className="about-metrics-md">x</span></p>
            <p className="about-metrics-sm">Rebuilt Portfolio</p>
          </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-accent-blue-lite)', marginTop: '24px', paddingTop: '24px' }}>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">{productDesignYears.toFixed(1)} <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Product Design</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">3.1 <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Revenue-Driven Experience Design</p>
          </div>
          <div className="about-metrics-item about-card-metrics">
            <p className="about-metrics-lg">7.8 <span className="about-metrics-md">yrs</span></p>
            <p className="about-metrics-sm">Architecture</p>
          </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-accent-blue-lite)', marginTop: '24px', paddingTop: '24px' }}>
          <div className="about-metrics-grid-simple">
          <div className="about-metrics-item about-metrics-item-full-width about-card-metrics">
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
          Design transcends fields and job titles. Fundamentally, it is the patterning of systems for human behavior.
        </p>
      </section>

      {/* Design Principles & Heuristics Section */}
      <section className="about-section">
        {/* Principles List */}
        <div className="about-principles-section">
          <h2 className="about-section-header">Principles</h2>
          <div className="about-principles-grid">
            <div className="about-card about-card-blue-lite">
              <h3 className="about-tag">Design for Humans</h3>
              <p className="about-body-copy">
                Whether designing at human scale or for digital users, human-centered design puts real people at the center of the problem. Start from human needs, context, and behavior rather than system convenience or internal metrics. Tone, clarity, and empathy matter as much as functionality.
              </p>
            </div>
            <div className="about-card about-card-blue-mid">
              <h3 className="about-tag">Clarity First</h3>
              <p className="about-body-copy">
                Form follows function (Sullivan). Structure and hierarchy should guide attention and priority, not compete for it. Use progressive disclosure to make complexity manageable, and apply aesthetics intentionally.
              </p>
            </div>
            <div className="about-card about-card-blue-dark">
              <h3 className="about-tag">Build Trust</h3>
              <p className="about-body-copy">
                Design is a partnership. Avoid dark patterns, hidden logic, or obscured information. Treat users as collaborators rather than conversion metrics. Transparency, predictability, and honesty create confidence and long-term value.
              </p>
            </div>
            <div className="about-card about-card-yellow-mid">
              <h3 className="about-tag">Reduce Cognitive Load</h3>
               <p className="about-body-copy">
                 Do not overwhelm users with choice or burdensome mental effort. Apply heuristics like Miller's Law (limits of working memory) and Hick's Law (more choices increase decision time) to support faster understanding and decision-making.
               </p>
            </div>
            <div className="about-card about-card-yellow-dark">
              <h3 className="about-tag">A Pattern Language</h3>
              <p className="about-body-copy">
                Build systems from clear, modular patterns that align with how users already think. Favor foundational units over novelty. Patterns should reinforce mental models, scale over time, and remain understandable as complexity grows.
              </p>
            </div>
          </div>
        </div>

        {/* Design Heuristics */}
        <div className="about-principles-section">
          <h2 className="about-section-header">Design Heuristics</h2>
          
          <div className="about-heuristics-grid">
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Behavioral Sciences</h3>
              <p className="about-body-copy">
                Understand how people think, decide, and make mistakes. Use cognitive biases and psychology to design systems that feel intuitive instead of demanding extra effort.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Mental Models</h3>
              <p className="about-body-copy">
                Build on patterns people already recognize. Familiar structures make interfaces easier to learn and reduce cognitive load.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Make Data Actionable, Not Decorative</h3>
              <p className="about-body-copy">
                Data should help people decide or act. If a visualization does not change behavior, it is just noise.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Surface Assumptions and Gaps</h3>
              <p className="about-body-copy">
                Hidden uncertainty breaks trust. Being clear about what is missing or assumed is better than pretending data is complete.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Expose Structure Before Detail</h3>
              <p className="about-body-copy">
                Show the shape of the system first. Let people understand how things fit together before asking them to engage with complexity.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Prevent Errors Before Handling Them</h3>
              <p className="about-body-copy">
                Design to reduce mistakes upfront. It is better to guide users away from errors than rely on fixes later.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Respect User Effort</h3>
              <p className="about-body-copy">
                Every step, field, and decision has a cost. If it does not clearly add value, it should not be there.
              </p>
            </div>
            <div className="about-card-metrics">
              <h3 className="about-diagram-header">Always Provide a Way Forward</h3>
              <p className="about-body-copy">
                Users should never reach a state without knowing what to do next. Every screen should offer direction, recovery, or progress.
              </p>
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
            I use AI as an extension of the design process, not a replacement for judgment or craft. It helps me move faster in early exploration, pressure-test ideas, and build tangible artifacts that inform product direction before committing to full scope or production work.
          </p>

        {/* 4 Quadrant Grid */}
        <div className="about-ai-grid">
          {aiSubsections.map((subsection, index) => (
            <div
              key={index}
              className="about-card about-card-gray-dark about-card-ai"
              onClick={() => handleAISectionClick(subsection)}
            >
              <div className="about-ai-card-content">
                <h3 className="about-tag">{subsection.subtitle}</h3>
                <p className="about-body-copy">{subsection.description}</p>
              </div>
              <div className="about-ai-card-image">
                <img 
                  src={subsection.images[0]?.src || '/images/project-pages/placeholder.webp'} 
                  alt={subsection.images[0]?.caption || subsection.subtitle}
                  className="about-ai-card-img"
                />
              </div>
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
