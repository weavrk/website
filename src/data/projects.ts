export interface ProjectSection {
  id: string;
  type: 'text' | 'image' | 'quote' | 'stats' | 'timeline' | 'gallery' | 'video' | 'custom';
  title?: string;
  content: any;
  className?: string;
}

export interface BentoGridConfig {
  enabled: boolean;
  sections?: {
    [key: string]: {
      component: string;
      props?: any;
    };
  };
}

export interface Project {
  id: string;
  title: string;
  titleSandbox?: string;
  titleCard?: string;
  role: string;
  description: string;
  hmwStatement?: string;
  image: string;
  url: string;
  passwordProtected: boolean;
  category: 'work' | 'sandbox';
  // New fields for flexible content
  heroImage?: {
    desktop: string;
    mobile: string;
    alt?: string;
  };
  sections?: ProjectSection[];
  bentoGrid?: BentoGridConfig;
  customComponents?: {
    [key: string]: React.ComponentType<any>;
  };
  metadata?: {
    duration?: string;
    team?: string[];
    tools?: string[];
    outcomes?: string[];
  };
}

export const workProjects: Project[] = [
  {
    id: 'mobile-onboarding-flows',
    title: 'Onboarding Flows',
    role: 'Mobile',
    description: 'Improving new worker segmentation through a refreshed onboarding flow.',
    image: '/images/thumbnails/work-mobile-onboarding-flows-mock.webp',
    url: '/projects/mobile-onboarding-flows',
    passwordProtected: true,
    category: 'work'
  },
  {
    id: 'spatial-data-mapping',
    title: 'Energy Star<br>Data Mapping',
    titleCard: 'Energy Star Data Mapping',
    role: 'B2B Dashboard',
    description: 'Making Energy Star data more digestible, supporting faster, more accurate reporting',
    hmwStatement: 'How might we make Energy Star more digestible, supporting faster, more accurate reporting?',
    image: '/images/thumbnails/landing-project02.webp',
    url: '/projects/spatial-data-mapping',
    passwordProtected: false,
    category: 'work',
    heroImage: {
      desktop: '/images/project-pages/project02-v00-a.webp',
      mobile: '/images/project-pages/project02-v00-a.webp',
      alt: 'Spatial Data Mapping Dashboard Interface'
    },
    metadata: {
      duration: '6 months',
      team: ['Product Manager', 'UX Designer', 'Frontend Developer', 'Data Scientist'],
      tools: ['React', 'D3.js', 'PostgreSQL', 'Figma', 'Tableau'],
      outcomes: ['Improved data visualization efficiency by 40%', 'Reduced user training time by 60%', 'Increased data accuracy by 25%']
    },
    sections: [
      {
        id: 'challenge',
        type: 'text',
        title: 'The Challenge',
        content: `
          <p>The main challenges included:</p>
          <ul>
            <li>Integrating data from multiple sources with different formats and structures</li>
            <li>Creating visualizations that could handle large datasets without performance issues</li>
            <li>Designing an interface that was intuitive for both technical and non-technical users</li>
            <li>Ensuring real-time data updates while maintaining system stability</li>
          </ul>
        `
      },
      {
        id: 'solution',
        type: 'text',
        title: 'Our Solution',
        content: `
          <p>We developed a comprehensive spatial data mapping platform that:</p>
          <ul>
            <li>Automatically ingests and transforms data from multiple sources</li>
            <li>Provides interactive map visualizations with filtering and search capabilities</li>
            <li>Offers customizable dashboards for different user roles</li>
            <li>Includes real-time alerts and notifications for data anomalies</li>
          </ul>
        `
      },
      {
        id: 'process',
        type: 'timeline',
        title: 'Design Process',
        content: [
          {
            title: 'Discovery & Research',
            date: 'Weeks 1-2',
            description: 'Conducted user interviews, analyzed existing workflows, and mapped data sources'
          },
          {
            title: 'Design & Prototyping',
            date: 'Weeks 3-6',
            description: 'Created wireframes, interactive prototypes, and conducted usability testing'
          },
          {
            title: 'Development & Testing',
            date: 'Weeks 7-20',
            description: 'Built the application with iterative testing and feedback cycles'
          },
          {
            title: 'Launch & Optimization',
            date: 'Weeks 21-24',
            description: 'Deployed to production and monitored performance metrics'
          }
        ]
      },
      {
        id: 'quote',
        type: 'quote',
        content: {
          quote: 'The spatial data mapping dashboard has transformed how we analyze energy consumption patterns. What used to take hours now takes minutes.',
          author: 'EPA Energy Star Program Manager',
          context: 'This feedback was received during our post-launch user interviews, highlighting the significant impact of our solution on daily workflows.'
        }
      },
      {
        id: 'results',
        type: 'stats',
        content: [
          { value: '40%', label: 'Faster Data Analysis' },
          { value: '60%', label: 'Reduced Training Time' },
          { value: '25%', label: 'Improved Data Accuracy' }
        ]
      },
      {
        id: 'user-research',
        type: 'text',
        title: 'User Research & Insights',
        content: `
          <p>We conducted extensive user research to understand the pain points and workflows of EPA analysts:</p>
          
          <h4>Key Findings:</h4>
          <ul>
            <li><strong>Data Fragmentation:</strong> Users spent 3-4 hours daily switching between 5+ different tools</li>
            <li><strong>Training Burden:</strong> New analysts required 6-8 weeks of training to become proficient</li>
            <li><strong>Error-Prone Process:</strong> Manual data correlation led to 15% error rate in reports</li>
            <li><strong>Scalability Issues:</strong> Existing tools couldn't handle the growing dataset (50,000+ buildings)</li>
          </ul>
          
          <p>These insights directly informed our design decisions, particularly around data integration, user onboarding, and error prevention.</p>
        `
      },
      {
        id: 'design-decisions',
        type: 'text',
        title: 'Key Design Decisions',
        content: `
          <p>Several critical design decisions shaped the final solution:</p>
          
          <h4>1. Unified Data Layer</h4>
          <p>Instead of forcing users to learn multiple data formats, we created a unified data ingestion system that automatically normalizes and validates incoming data.</p>
          
          <h4>2. Progressive Disclosure</h4>
          <p>We designed the interface with progressive disclosure - showing high-level patterns first, then allowing users to drill down into specific details as needed.</p>
          
          <h4>3. Role-Based Dashboards</h4>
          <p>Different user roles (analysts, managers, auditors) get customized views that match their specific workflows and information needs.</p>
          
          <h4>4. Real-Time Collaboration</h4>
          <p>Built-in commenting and sharing features allow teams to collaborate on data analysis without leaving the platform.</p>
        `
      },
      {
        id: 'technical-approach',
        type: 'text',
        title: 'Technical Approach',
        content: `
          <p>Our technical architecture was designed for performance, scalability, and maintainability:</p>
          
          <h4>Frontend Architecture</h4>
          <ul>
            <li><strong>React + TypeScript:</strong> For type safety and maintainable code</li>
            <li><strong>D3.js:</strong> Custom visualizations optimized for large datasets</li>
            <li><strong>WebGL:</strong> Hardware-accelerated rendering for smooth interactions</li>
            <li><strong>Progressive Web App:</strong> Offline capabilities for field work</li>
          </ul>
          
          <h4>Backend Infrastructure</h4>
          <ul>
            <li><strong>PostgreSQL + PostGIS:</strong> Spatial database for geographic data</li>
            <li><strong>Redis:</strong> Caching layer for improved performance</li>
            <li><strong>Apache Kafka:</strong> Real-time data streaming</li>
            <li><strong>Docker:</strong> Containerized deployment for consistency</li>
          </ul>
        `
      },
      {
        id: 'usability-testing',
        type: 'text',
        title: 'Usability Testing & Iteration',
        content: `
          <p>We conducted multiple rounds of usability testing throughout the design process:</p>
          
          <h4>Testing Phases:</h4>
          <ul>
            <li><strong>Paper Prototypes:</strong> Early concept validation with 12 users</li>
            <li><strong>Interactive Wireframes:</strong> Workflow testing with 8 analysts</li>
            <li><strong>Beta Testing:</strong> Full-feature testing with 25 users over 4 weeks</li>
            <li><strong>Post-Launch:</strong> Ongoing feedback collection and optimization</li>
          </ul>
          
          <h4>Key Iterations:</h4>
          <ul>
            <li>Simplified the filtering interface based on user confusion</li>
            <li>Added keyboard shortcuts for power users</li>
            <li>Redesigned the data export workflow</li>
            <li>Improved mobile responsiveness for field work</li>
          </ul>
        `
      },
      {
        id: 'impact',
        type: 'text',
        title: 'Impact & Outcomes',
        content: `
          <p>The spatial data mapping dashboard has delivered significant value to the EPA Energy Star Program:</p>
          
          <h4>Quantitative Impact:</h4>
          <ul>
            <li><strong>40% faster data analysis:</strong> What used to take 8 hours now takes 4.8 hours</li>
            <li><strong>60% reduction in training time:</strong> New analysts are productive in 2-3 weeks vs 6-8 weeks</li>
            <li><strong>25% improvement in data accuracy:</strong> Automated validation reduced human errors</li>
            <li><strong>200+ active users:</strong> Across 15 different EPA offices</li>
          </ul>
          
          <h4>Qualitative Impact:</h4>
          <ul>
            <li>Improved collaboration between field analysts and headquarters</li>
            <li>Better decision-making through real-time data insights</li>
            <li>Reduced analyst burnout from repetitive manual tasks</li>
            <li>Enhanced ability to identify energy efficiency opportunities</li>
          </ul>
        `
      },
      {
        id: 'lessons-learned',
        type: 'text',
        title: 'Lessons Learned',
        content: `
          <p>This project taught us valuable lessons about designing for complex data environments:</p>
          
          <h4>Design Lessons:</h4>
          <ul>
            <li><strong>Start with the data:</strong> Understanding data relationships is crucial before designing interfaces</li>
            <li><strong>Design for scale:</strong> Solutions that work for 100 records often fail at 50,000</li>
            <li><strong>Embrace complexity:</strong> Sometimes the right solution is complex - focus on making it feel simple</li>
            <li><strong>Test with real data:</strong> Mock data can hide important usability issues</li>
          </ul>
          
          <h4>Process Lessons:</h4>
          <ul>
            <li>Early stakeholder alignment prevents major pivots later</li>
            <li>Regular user testing keeps the design grounded in real needs</li>
            <li>Technical constraints often lead to better design solutions</li>
            <li>Documentation is as important as the design itself</li>
          </ul>
        `
      },
      {
        id: 'next-steps',
        type: 'text',
        title: 'Future Opportunities',
        content: `
          <p>Based on user feedback and usage patterns, we've identified several opportunities for future enhancements:</p>
          
          <h4>Short-term (3-6 months):</h4>
          <ul>
            <li>Advanced analytics and predictive modeling capabilities</li>
            <li>Integration with additional data sources (weather, economic indicators)</li>
            <li>Mobile app for field data collection</li>
            <li>Enhanced reporting and export features</li>
          </ul>
          
          <h4>Long-term (6-12 months):</h4>
          <ul>
            <li>AI-powered anomaly detection and recommendations</li>
            <li>Collaborative analysis tools for cross-agency projects</li>
            <li>Public-facing dashboards for transparency</li>
            <li>API for third-party integrations</li>
          </ul>
        `
      }
    ],
    bentoGrid: {
      enabled: true,
      sections: {
        'team': {
          component: 'TeamSection',
          props: {}
        },
        'metrics': {
          component: 'MetricsCard',
          props: {
            title: 'Key Metrics',
            metrics: [
              { label: 'Buildings Mapped', value: '50,000+' },
              { label: 'Data Sources', value: '12' },
              { label: 'Users Supported', value: '200+' }
            ]
          }
        }
      }
    }
  },
  {
    id: 'co2-emissions-dashboard',
    title: 'Environmental<br>Impact Reporting',
    titleCard: 'Environmental Impact Reporting',
    role: 'B2B Dashboard',
    description: 'Transforming raw utility data into portfolio-wide emissions, energy, and water metrics.',
    hmwStatement: 'How might we aggregate and standardize utility data across portfolios so teams can confidently report CO₂, energy, and water performance?',
    image: '/images/thumbnails/work-co2-emissions-dashboard-mock.webp',
    url: '/projects/co2-emissions-dashboard',
    passwordProtected: false,
    category: 'work',
    heroImage: {
      desktop: '/images/project-pages/project01-a.webp',
      mobile: '/images/project-pages/project01-a.webp',
      alt: 'Environmental Impact Reporting Interface'
    },
    bentoGrid: {
      enabled: true
    }
  },
  {
    id: 'pattern-libraries',
    title: 'Pattern Libraries',
    role: 'Design Ops',
    description: 'Creating consistent user patterns, brand consistency, and production efficiencies through a self-standing design system.',
    image: '/images/thumbnails/work-pattern-libraries-mock.webp',
    url: '/projects/pattern-libraries',
    passwordProtected: false,
    category: 'work'
  },
  {
    id: 'research-methods-toolbelt',
    title: 'Research Methods Toolbelt',
    role: 'Product Ops',
    description: 'A toolbelt of research methods and templates for generative user research.',
    image: '/images/thumbnails/work-research-methods-toolbelt-mock.webp',
    url: '/projects/research-methods-toolbelt',
    passwordProtected: false,
    category: 'work'
  },
  {
    id: 'brand',
    title: 'Brand Language',
    role: 'Design Ops',
    description: 'Expanding the design system into a visual identity.',
    image: '/images/thumbnails/work-brand-language-mock.webp',  
    url: '/projects/brand',
    passwordProtected: true,
    category: 'work'
  },
  
];

export const sandboxProjects: Project[] = [
  {
    id: 'blessu',
    title: 'Blessu',
    titleSandbox: 'Blessu',
    role: 'AI Sound Classification',
    description: 'Offline AI sound classification that hears your sneeze and blesses you in multiple languages.',
    image: '/images/thumbnails/sandbox-blessu.webp',
    url: '/#/sandbox/blessu',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'cognitive-bias',
    title: 'Principles of Human Behavior',
    titleSandbox: 'Principles of Human Behavior',
    role: 'Behavioral Science',
    description: 'A visual database for learning and recording Behavioral Laws, Biases, and Conditioning.',
    image: '/images/thumbnails/sandbox-bela.webp',
    url: 'https://www.weavrk.com/hrefs/bela',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'nomad',
    title: 'Nomad',
    titleSandbox: 'Nomad',
    role: 'AI Agent and Image Classification',
    description: 'An offline AI voice activated assistant and image classifier.',
    image: '/images/thumbnails/sandbox-nomad.webp',
    url: '/#/sandbox/nomad',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'watchbox',
    title: 'WatchBox',
    titleSandbox: 'WatchBox',
    role: 'Watchlist Agreggator',
    description: 'Central source for streaming watchlists.',
    image: '/images/thumbnails/sandbox-watchbox.webp',
    url: 'https://weavrk.com/hrefs/watchbox/',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'chrona',
    title: 'Chrona',
    titleSandbox: 'Chrona',
    role: 'Health Tracking',
    description: 'A health tracking web app for custom labels.',
    image: '/images/thumbnails/sandbox-chrona.webp',
    url: 'https://www.weavrk.com/hrefs/chrona/?mobile=true',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'recipe-search',
    title: 'Recipe Search',
    titleSandbox: 'API Lookup',
    role: 'API Integration',
    description: 'Creating a keyword search for recipes by ingredient using the Edaman Recipe Search API.',
    image: '/images/thumbnails/sandbox-wfd.webp',
    url: 'https://www.weavrk.com/hrefs/whatsfordinner/index.html',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'in-search-of-utopia',
    title: 'In Search of Utopia',
    titleSandbox: 'Utopia',
    role: 'Exploratory Data Analysis',
    description: 'Data visualization using Python Pandas Library and the World Happiness Report hosted on Kaggle.',
    image: '/images/thumbnails/sandbox-happiness.webp',
    url: 'https://www.kaggle.com/code/weavrk/final-project-utopia',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'recontextualizing-social-media',
    title: 'Recontextualizing Social Media',
    titleSandbox: 'Recontextualizing Social Media',
    role: 'Experimental Web Experience',
    description: 'Recontextualizing social media to reveal the translucent veils of embedded conditioning as users click deeper into the site.',
    image: '/images/thumbnails/sandbox-di.webp',
    url: 'https://www.weavrk.com/hrefs/digital-intimacy',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'adventure-game',
    title: 'Adventure Game',
    titleSandbox: 'Adventure Game',
    role: 'Text Based CYOA',
    description: 'Had some fun with logic and vanilla Javascript in a very basic text-based game.',
    image: '/images/thumbnails/sandbox-cyoa.webp',
    url: 'https://www.weavrk.com/hrefs/text-based-cyoa-game',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'weavrk-v3',
    title: 'weavrk_v3',
    titleSandbox: 'v3',
    role: 'Design Portfolio',
    description: 'Scratch built (vanilla Javascript/HTML/CSS) minimalist portfolio',
    image: '/images/thumbnails/sandbox-weavrk3.webp',
    url: 'https://www.weavrk.com/hrefs/weavrk-v3',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'weavrk-v2',
    title: 'weavrk_v2',
    titleSandbox: 'v2',
    role: 'Design Portfolio',
    description: 'Went a bit crazy with content for this one and had to edit waaaayyyy down. Built in a lot of Javascript, so good practice!',
    image: '/images/thumbnails/sandbox-weavrk2.webp',
    url: 'https://www.weavrk.com/hrefs/weavrk-v2',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'weavrk-v1',
    title: 'weavrk_v1',
    titleSandbox: 'weavrk_v1',
    role: 'Design Portfolio',
    description: 'Older portfolio version created after graduate school, roughly.',
    image: '/images/thumbnails/sandbox-weavrk1.webp',
    url: 'https://www.weavrk.com/hrefs/weavrk-v1',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'coverage-heatmap',
    title: 'Coverage Heatmap',
    titleSandbox: 'Coverage Heatmap',
    role: 'Location Visualization',
    description: 'Visualizing location data with customizable heat maps, intensity controls, and geographic styling options.',
    image: '/images/thumbnails/sandbox-heatmap.webp',
    url: 'https://weavrk.com/hrefs/heatmap/',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'isochrone',
    title: 'Market Isochrones',
    titleSandbox: 'Market Isochrones',
    role: 'Market Analysis',
    description: 'Exploring market expansion opportunities by analyzing isochrone boundaries, ZIP codes, and user distribution across markets.',
    image: '/images/thumbnails/sandbox-isochrone.webp',
    url: 'https://weavrk.com/hrefs/isochrone-sandbox/',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'market-research',
    title: 'Market Research',
    titleSandbox: 'Market Research',
    role: 'Market Expansion',
    description: 'Cross-referencing retailer store locations nationally with live markets using Google Places API. Generates insights on high potential new markets and growth opportunities through customizable city lists and CSV exports.',
    image: '/images/thumbnails/sandbox-market-research.webp',
    url: '/#/sandbox/market-research',
    passwordProtected: false,
    category: 'sandbox'
  },
  {
    id: 'shift-simulator',
    title: 'Shift Simulator',
    titleSandbox: 'Shift Simulator',
    role: 'Market Visualization',
    description: 'Simulating market location shifts with dynamic heatmaps, gradient controls, and real-time data visualization.',
    image: '/images/thumbnails/sandbox-shift-simulator.webp',
    url: 'https://weavrk.com/hrefs/shift-simulator/',
    passwordProtected: false,
    category: 'sandbox'
  }
]; 