import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamSection from './TeamSection';
import BentoCardContent from './BentoCardContent';
import BentoGridDefault from './BentoGridDefault';
import InterviewSection from './InterviewSection';
import { ZoomIn, Activity, Navigation, PlaneTakeoff, ArrowRight, Blocks, Box, Telescope, Database, SendToBack, Microscope, Layers, Package, Route, Code, Workflow, Monitor, LayoutPanelTop, UserSearch, Cog, Repeat2, Palette, PanelRightOpen, LayoutDashboard, SquareMousePointer, BellRing, Wallpaper, SquareDashedMousePointer, TrendingUpDown, DatabaseBackup, SquaresUnite, Share2, Expand, FileSpreadsheet, Lightbulb, Compass, HeartPlus, ArrowUpRight, Map, MessageCirclePlus } from 'lucide-react';
import ViewToggleNavigation from './ViewToggleNavigation';
import HMWSection from './HMWSection';
import { workProjects, Project } from '../data/projects';
import { isGlobalAuthenticated } from '../utils/auth';
import { useCellNumbers } from '../contexts/CellNumbersContext';
import { Chart, registerables } from 'chart.js';

interface BentoGridProps {
  className?: string;
  projectDescription?: string;
}

// Register Chart.js components
Chart.register(...registerables);

const BentoGrid: React.FC<BentoGridProps> = ({ className = '', projectDescription }) => {
  const { showCellNumbers, setShowCellNumbers } = useCellNumbers();
  const [viewMode, setViewMode] = useState<'view1' | 'view2'>('view1');
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [shouldScrollToToggle, setShouldScrollToToggle] = useState(false);

  // Get only work projects and filter based on authentication
  const getWorkProjects = (): Project[] => {
    const isAuthenticated = isGlobalAuthenticated();
    
    // If not authenticated, only show non-password-protected work projects
    if (!isAuthenticated) {
      return workProjects.filter(project => !project.passwordProtected);
    }
    
    // If authenticated, show all work projects
    return workProjects;
  };

  // Handler for 3D/2D toggle buttons (with scroll behavior)
  const handleViewModeChange = (newViewMode: 'view1' | 'view2') => {
    setViewMode(newViewMode);
    setShouldScrollToToggle(true); // Trigger scroll for toggle buttons
  };

  // Handler for Prev/Next buttons (same logic as ProjectDetail page)
  const handleNavigation = (direction: 'prev' | 'next') => {
    const projects = getWorkProjects();
    const currentIndex = projects.findIndex((p: Project) => p.id === projectId);
    
    if (currentIndex === -1) return;
    
    let targetProject: Project;
    
    if (direction === 'prev') {
      // If first project, cycle to last
      targetProject = currentIndex === 0 ? projects[projects.length - 1] : projects[currentIndex - 1];
    } else {
      // If last project, cycle to first
      targetProject = currentIndex === projects.length - 1 ? projects[0] : projects[currentIndex + 1];
    }
    
    navigate(targetProject.url);
  };

  // Scroll to the project-toggle container when view mode changes (only for toggle buttons)
  useEffect(() => {
    if (shouldScrollToToggle) {
      const toggleContainer = document.querySelector('.project-footer-nav.project-toggle');
      if (toggleContainer) {
        const rect = toggleContainer.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollTop = scrollTop + rect.top - 200;
        
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
      setShouldScrollToToggle(false); // Reset the flag
    }
  }, [viewMode, shouldScrollToToggle]);

  // Initialize opportunity chart
  useEffect(() => {
    const canvas = document.getElementById('opportunityChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    // Constants
    const PRICE_PER_BUILDING = 2500; // $2,500 per building

    // Fixed portfolio data (totals + current coverage in buildings)
    const CLIENTS = [
      { name: 'MetLife',    total: 4150,  covered: 125 },  // 3% coverage
      { name: 'Blackstone', total: 12500, covered: 250 }, // 2% coverage
      { name: 'Lionstone',  total: 218,   covered: 40  }   // 18% coverage
    ];

    // Compute coverage vs expandable (in buildings and $)
    function compute(client: any) {
      const expand = Math.max(0, client.total - client.covered);
      const coveredValue = client.covered * PRICE_PER_BUILDING;
      const expandValue  = expand          * PRICE_PER_BUILDING;
      const totalValue   = (client.total)  * PRICE_PER_BUILDING;
      return { expand, coveredValue, expandValue, totalValue };
    }

    // Build arrays for the chart
    const labels = CLIENTS.map(c => c.name);
    const coveredPercentages = CLIENTS.map(c => (c.covered / c.total) * 100);
    const expandPercentages  = CLIENTS.map(c => (compute(c).expand / c.total) * 100);
    // Chart.js stacked bar
    const fmtCurrency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    // Create diagonal hatch pattern for expansion opportunity bars
    const createHatchPattern = () => {
      const patternCanvas = document.createElement('canvas');
      const patternCtx = patternCanvas.getContext('2d');
      patternCanvas.width = 8;
      patternCanvas.height = 8;
      
      if (patternCtx) {
        patternCtx.strokeStyle = '#ace5e8';
        patternCtx.lineWidth = 1;
        patternCtx.beginPath();
        patternCtx.moveTo(0, 8);
        patternCtx.lineTo(8, 0);
        patternCtx.stroke();
      }
      
      return ctx.createPattern(patternCanvas, 'repeat');
    };

    // Create the hatch pattern before creating the chart
    const hatchPattern = createHatchPattern();

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Current coverage (%)',
            data: coveredPercentages,
            backgroundColor: '#4fc8cc',
            borderRadius: 10,
            maxBarThickness: 72,
            stack: 'stack1'
          },
          {
            label: 'Expansion opportunity (%)',
            data: expandPercentages,
            backgroundColor: hatchPattern || '#ace5e8',
            borderColor: '#ace5e8',
            borderWidth: 2,
            borderRadius: 10,
            maxBarThickness: 72,
            stack: 'stack1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            position: 'bottom',
            align: 'center',
            onClick: () => {}, // Disable legend clicks
            labels: {
              padding: 20,
              usePointStyle: false
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              afterTitle: (ctx: any) => {
                if (ctx && ctx.length > 0) {
                  const index = ctx[0].dataIndex;
                  const client = CLIENTS[index];
                  const computed = compute(client);
                  
                  // Format expansion value
                  let expansionFormatted;
                  if (computed.expandValue >= 1000000) {
                    expansionFormatted = `$${(computed.expandValue / 1000000).toFixed(1)}Mil`;
                  } else if (computed.expandValue >= 100000) {
                    expansionFormatted = `$${Math.round(computed.expandValue / 1000)}k`;
                  } else {
                    expansionFormatted = `$${fmtCurrency.format(computed.expandValue).replace('$', '')}`;
                  }
                  
                  return [
                    `Coverage: ${coveredPercentages[index].toFixed(1)}% (${client.covered} buildings)`,
                    `Expansion: ${expansionFormatted} (${computed.expand} buildings)`
                  ];
                }
                return [];
              },
              label: () => '' // Disable default dataset labels
            }
          }
        },
        scales: {
          x: { stacked: true, ticks: { font: { size: 12 } } },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 100,
            ticks: { 
              callback: (v: any) => `${v}%`,
              font: { size: 12 }
            },
            grid: { color: 'rgba(0,0,0,.06)' }
          }
        },
        animation: { duration: 300 }
      }
    });



    // Cleanup function to destroy chart when component unmounts or dependencies change
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [projectId]); // Re-initialize when project changes

  // Remove mobile detection for now to prevent auto-refresh issues
  // React.useEffect(() => {
  //   const handleResize = () => setMobile(isMobile());
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // Desktop grid positions (commented out - not currently used)
  // const cells = [
  //   { key: 'team', row: 1, col: 1, rowSpan: 1, colSpan: 2, content: <BentoCardContent sectionHeader="Team"><TeamSection /></BentoCardContent> },
  //   
  //   // Add 3 empty clickable cards to replace the removed impact card
  //         </BentoCardContent>
  //       )
  //     };
  //   }),
  // ];

  // Mobile grid positions (2 columns, cards that span 3+ cols now span 2)
  // const mobileCells = [
  //   { ...cells[0], row: 1, col: 1, colSpan: 2 }, // team
  //   { ...cells[1], row: 2, col: 1, colSpan: 1 }, // role
  //   { ...cells[2], row: 2, col: 2, colSpan: 1 }, // status1
  //   { ...cells[3], row: 3, col: 1, colSpan: 1 }, // approach-card-1
  //   { ...cells[4], row: 3, col: 2, colSpan: 1 }, // approach-card-2
  //   { ...cells[5], row: 4, col: 1, colSpan: 1 }, // approach-card-3
  //   { ...cells[6], row: 4, col: 2, colSpan: 1 }, // placeholder
  //   { ...cells[7], row: 5, col: 1, colSpan: 2 }, // placeholder
  // ];

  // Use desktop cells only to prevent auto-refresh issues

  // Create cells for the new top bento grid (4 columns, 3 rows)
  const topBentoCells = [];
  
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 4; col++) {
      // Skip cells 11 and 12 (row 3, cols 2-3) since they're covered by the Impact card
      if (row === 3 && (col === 2 || col === 3)) {
        continue;
      }
      
      // Place Impact card in cell 10 (row 3, col 1) - spans 3 cells wide
      if (row === 3 && col === 1) {
        topBentoCells.push({
          key: `top-bento-impact`,
          row,
          col,
          colSpan: 3,
          content: <BentoCardContent sectionHeader="Impact and Outcomes"><div className="grid grid-cols-2 gap-6 w-full h-full">
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                  <div className="bc-metric-callout">40%</div>
                                              <div className="bc-metric-caption">Faster Data Analysis</div>
                            <p className="bc-body-copy text-xs">8h → 4.8h</p>
                </div>
                <div className="text-center">
                  <div className="bc-metric-callout">60%</div>
                                              <div className="bc-metric-caption">Reduced Training</div>
                            <p className="bc-body-copy text-xs">6-8w → 2-3w</p>
                </div>
                <div className="text-center">
                  <div className="bc-metric-callout">25%</div>
                                              <div className="bc-metric-caption">Data Accuracy</div>
                            <p className="bc-body-copy text-xs">Auto validation</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-primary mb-2">Qualitative Impact</h4>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                            <p className="bc-body-copy text-xs">Improved collaboration between field analysts and headquarters</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                            <p className="bc-body-copy text-xs">Better decision-making through real-time data insights</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                            <p className="bc-body-copy text-xs">Reduced analyst burnout from repetitive manual tasks</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                            <p className="bc-body-copy text-xs">Enhanced ability to identify energy efficiency opportunities</p>
                </div>
              </div>
            </div>
          </div></BentoCardContent>
        });
      } else {
        topBentoCells.push({
          key: `top-bento-${row}-${col}`,
          row,
          col,
          content: (
            <BentoCardContent sectionHeader="--">
              <div></div>
            </BentoCardContent>
          )
        });
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Bento Grid Header */}
      <div className="bento-header">
        <div className="break-line-projects-primary-shell">
          <div className="break-line-projects-primary-a"></div>
          <h2 className="bento-section-header">Opportunity Space</h2>
          <div className="break-line-projects-primary-b"></div>
        </div>
      </div>

      {/* HMW Section */}
      {projectDescription && (
        <HMWSection text={projectDescription} />
      )}

      {/* New 6-row grid above opportunity-space-ghg */}
      {projectId === 'co2-emissions-dashboard' && (
        <div className="opportunity-space-ghg" style={{ marginBottom: '32px' }}>
          <BentoGridDefault 
            showCellNumbers={showCellNumbers}
            setShowCellNumbers={setShowCellNumbers}
            customCells={[
              {
                row: 1,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Expanding Portfolio Coverage"
                    icon={<ArrowUpRight className="w-3 h-3" />}
                  >
                    <div className="flex flex-col lg:flex-row gap-12">
                      <div className="w-full lg:w-1/4 mt-6">
                        <div className="mb-6">
                          <h3 className="bc-leadin-md mb-3">Business Objective</h3>
                          <p className="bc-leadin-md">
                            Our goal is to land and expand accounts while generating a sustainable competitive advantage.
                          </p>
                        </div>
                        <div>
                          <h3 className="bc-leadin-md mb-3">Differentiator</h3>
                          <p className="bc-leadin-md">
                            We integrate directly with utility APIs to automate utility data ingestion. For utilities without APIs, our operations team fills the gaps through internal tooling that manages manual inputs and tracks coverage gaps, ensuring complete and reliable datasets.
                          </p>
                        </div>
                      </div>
                      <div className="ghg-epc-viz flex-1 bg-white rounded-lg p-6 border border-gray-200">
                        <div className="mb-4">
                          <h3 className="bc-leadin-lg mb-2">Coverage vs. Expansion Opportunity</h3>
                                                     <p className="bc-body-copy text-gray-600">Expansion opportunity = Benchmark $2,500 per building annual fee × Expandable portfolio quantity</p>
                        </div>
                        
                                                <div>
                          <canvas id="opportunityChart" className="w-full max-h-[280px] [@media(min-width:1100px)]:max-h-[280px] [@media(min-width:1600px)]:max-h-[280px]"></canvas>
                          <div className="text-white" style={{ fontSize: '1px' }}>-</div>
                        </div>

                        {/* Summary columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                            <h4 className="bc-subheaders mb-3">MetLife</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between"><span className="text-gray-600">AUM</span><span className="font-semibold">$104.6B (~4,150 buildings)</span></div>
                                                              <div className="flex justify-between"><span className="text-gray-600">Coverage</span><span className="font-semibold">3%</span></div>
                                                                <div className="flex justify-between"><span className="text-gray-600">Expansion Value</span><span className="font-semibold">~$10.06M</span></div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                            <h4 className="bc-subheaders mb-3">Blackstone</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between"><span className="text-gray-600">AUM</span><span className="font-semibold">$315.4B (~12,500 buildings)</span></div>
                                                              <div className="flex justify-between"><span className="text-gray-600">Coverage</span><span className="font-semibold">2%</span></div>
                                                                <div className="flex justify-between"><span className="text-gray-600">Expansion Value</span><span className="font-semibold">~$30.63M</span></div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                            <h4 className="bc-subheaders mb-3">Lionstone</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between"><span className="text-gray-600">AUM</span><span className="font-semibold">$5.5B (~218 buildings)</span></div>
                                                              <div className="flex justify-between"><span className="text-gray-600">Coverage</span><span className="font-semibold">18%</span></div>
                                                                <div className="flex justify-between"><span className="text-gray-600">Expansion Value</span><span className="font-semibold">~$445K</span></div>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">
                          <span className="font-bold" style={{ fontWeight: '700' }}>Notes:</span> MetLife and Lionstone total buildings are back-of-envelope estimates using Blackstone's
                          ~$315.4B real-estate Assets Under Management (AUM) and ~12,500 buildings as a baseline (~$25.2M per building) to infer
                          building counts from AUM.
                        </div>
                      </div>
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 2,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="User Interviews"
                    icon={<Lightbulb className="w-3 h-3" />}
                  >
                    <div>
                      <div className="relative">
                        <div className="absolute top-0 w-10 h-10 quote-icon-large-screen" style={{ 
                          backgroundImage: 'url(/images/icons/icons_project-content-quotes.svg)',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          marginTop: '-6px',
                          left: '2vw'
                        }}></div>
                        <div className="pl-14">
                          <div className="bc-leadin-xl mb-2">
                            I just get copied on a lot of things. I'm trying to see through the mess.
                          </div>
                          <p className="bc-body-copy mt-2">
                            Associate Director, ESG at Metlife Investment Management
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <div className="ghg-content-container">
                          <div className="user-research-interviewees-grid">
                            <div className="ghg-interviewees-shell">
                              <div className="interviewee-image" style={{
                                backgroundImage: 'url(/images/thumbnails/user-research/guils.jpg)',
                                backgroundSize: '150%',
                                backgroundPosition: 'center 45%'
                              }}></div>
                              <div className="bc-label-headers">Guiliana</div>
                              <div className="bc-label">Associate Director, ESG</div>
                            </div>
                            <div className="ghg-interviewees-shell">
                              <div className="interviewee-image" style={{
                                backgroundImage: 'url(/images/thumbnails/user-research/colette.jpg)',
                                backgroundSize: '140%',
                                backgroundPosition: '60% 55%'
                              }}></div>
                              <div className="bc-label-headers">Colette</div>
                              <div className="bc-label">Director, Carbon Services</div>
                            </div>
                            <div className="ghg-interviewees-shell">
                              <div className="interviewee-image" style={{
                                backgroundImage: 'url(/images/thumbnails/user-research/jared.jpeg)',
                                backgroundSize: '120%',
                                backgroundPosition: '50% 40%'
                              }}></div>
                              <div className="bc-label-headers">Jared</div>
                              <div className="bc-label">Commissioner</div>
                              <div className="bc-label">Taconic Regional Commission</div>
                            </div>
                            <div className="ghg-interviewees-shell">
                              <div className="interviewee-image" style={{
                                backgroundImage: 'url(/images/thumbnails/team/andrew.jpg)',
                                backgroundSize: '170%',
                                backgroundPosition: 'center 60%'
                              }}></div>
                              <div className="bc-label-headers">Andrew</div>
                              <div className="bc-label">Benchmark Data Analyst</div>
                            </div>
                          </div>
                          
                          <div className="flex-column margin-right-s margin-bottom-l">
                            <div className="problems-column">
                              <div className="flex-row-responsive">
                                <div className="bc-label-headers" style={{ color: 'var(--color-accent-blue-mid)', marginRight: '10px' }}>01</div>
                                <div className="bc-label-headers">Structuring Utility Data</div>
                              </div>
                              <div className="problem-column-quotes-shell">
                                <div className="bc-leadin-md" style={{ marginBottom: '12px' }}>I'm in Portfolio Manager every day.</div>
                                <div className="bc-leadin-md" style={{ marginBottom: '12px' }}>It would be great if every utility had an API.</div>
                                <div className="bc-leadin-md">It's not really easy to pull helpful information from a utility bill.</div>
                              </div>
                            </div>
                            <div className="break-line-project-content-accent1"></div>
                            <div className="problems-column">
                              <div className="flex-row-responsive">
                                <div className="bc-label-headers" style={{ color: 'var(--color-accent-blue-mid)', marginRight: '10px' }}>02</div>
                                <div className="bc-label-headers">Gaps in Coverage</div>
                              </div>
                              <div className="problem-column-quotes-shell">
                                <div className="bc-leadin-md" style={{ marginBottom: '12px' }}>Goal is 100% coverage.</div>
                                <div className="bc-leadin-md" style={{ marginBottom: '12px' }}>If that's the best that we have, we have to use it.</div>
                                <div className="bc-leadin-md">There's only so much that's within our control.</div>
                              </div>
                            </div>
                            <div className="break-line-project-content-accent1"></div>
                            <div className="problems-column">
                              <div className="flex-row-responsive">
                                <div className="bc-label-headers" style={{ color: 'var(--color-accent-blue-mid)', marginRight: '10px' }}>03</div>
                                <div className="bc-label-headers">Vast Stakeholder Group</div>
                              </div>
                              <div className="problem-column-quotes-shell">
                                <div className="bc-leadin-md" style={{ marginBottom: '12px' }}>We have found that there are a lot of eyes on every metric.</div>
                                <div className="bc-leadin-md">I communicate with fund arms of our company, third-party property management teams, asset managers, real-estate developers, third-party sustainability consultants, and utility providers... across 250 buildings.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 3,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                type: 'flat',
                content: (
                  <BentoCardContent 
                    sectionHeader="User Needs"
                    icon={<HeartPlus className="w-3 h-3" />}
                  >
                    <div className="w-full h-full">
                      <div className="goals-shell flex flex-col md:flex-row gap-4" style={{ height: '80%' }}>
                        <div className="goals-columns rounded-2xl overflow-hidden flex flex-col h-full" style={{ border: '1px solid var(--color-tertiary)', backgroundColor: 'white' }}>
                          <div className="p-3 1100:p-4 1440:p-6" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
                            <div className="w-12 h-12 1100:w-16 1100:h-16 1440:w-16 1440:h-16 1600:w-20 1600:h-20 rounded-full flex items-center justify-center role-tag-blue-lite" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
                              <FileSpreadsheet className="w-6 h-6 1100:w-8 1100:h-8 1440:w-8 1440:h-8 1600:w-10 1600:h-10 text-primary" />
                            </div>
                          </div>
                          <div className="p-6 pb-8 flex-1">
                            <div className="bc-content-header">
                              <p>
                                <span>Digitize and Normalize Utility Data</span>
                              </p>
                            </div>
                            <div className="bc-leadin-md">As a portfolio manager, I want quick, reliable access to utility data so I don't have to manually parse bills across 200+ properties.</div>
                          </div>
                        </div>

                        <div className="goals-columns rounded-2xl overflow-hidden flex flex-col h-full" style={{ border: '1px solid var(--color-tertiary)', backgroundColor: 'white' }}>
                          <div className="p-3 1100:p-4 1440:p-6" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
                            <div className="w-12 h-12 1100:w-16 1100:h-16 1440:w-16 1440:h-16 1600:w-20 1600:h-20 rounded-full flex items-center justify-center role-tag-blue-lite" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
                              <Expand className="w-6 h-6 1100:w-8 1100:h-8 1440:w-8 1440:h-8 1600:w-10 1600:h-10 text-primary" />
                            </div>
                          </div>
                          <div className="p-6 pb-8 flex-1">
                            <div className="bc-content-header">
                              <p>
                                <span>Improve Coverage</span>
                              </p>
                            </div>
                            <div className="bc-leadin-md">As a portfolio manager, I want to improve our coverage so I'm not constrained by limited data, and so reporting isn't undermined by gaps and inconsistencies.</div>
                          </div>
                        </div>

                        <div className="goals-columns rounded-2xl overflow-hidden flex flex-col h-full" style={{ border: '1px solid var(--color-tertiary)', backgroundColor: 'white' }}>
                          <div className="p-3 1100:p-4 1440:p-6" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
                            <div className="w-12 h-12 1100:w-16 1100:h-16 1440:w-16 1440:h-16 1600:w-20 1600:h-20 rounded-full flex items-center justify-center role-tag-blue-lite" style={{ backgroundColor: 'var(--color-accent-blue-lite)' }}>
                              <Share2 className="w-6 h-6 1100:w-8 1100:h-8 1440:w-8 1440:h-8 1600:w-10 1600:h-10 text-primary" />
                            </div>
                          </div>
                          <div className="p-6 pb-8 flex-1">
                            <div className="bc-content-header">
                              <p>
                                <span>Make Data Easy to Share</span>
                              </p>
                            </div>
                            <div className="bc-leadin-md">As a portfolio manager, I want an easier way to share metrics across a wide stakeholder group, so I can build alignment and support for our energy improvement initiatives.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 4,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Generative Research User Journey Mapping"
                    icon={<UserSearch className="w-3 h-3" />}
                  >
                    <div className="w-full h-full flex items-start justify-center">
                      <img 
                        src="/images/project-pages/project01-b-a.webp" 
                        alt="Generative Research User Journey Mapping" 
                        loading="lazy" 
                        className="w-full h-auto object-contain rounded-lg" 
                      />
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 5,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                type: 'flat',
                content: (
                  <BentoCardContent 
                    sectionHeader="Ideal Journey"
                    icon={<Compass className="w-3 h-3" />}
                  >
                    <div className="mb-4">
                      <p className="bc-leadin-lg w-full md:w-[55vw]">
                        User interviews showed that adoption and value lie upstream in utility data aggregation. Instead of focusing on final reporting visuals, we surfaced normalized consumption data and gaps to integrate more easily into existing workflows.
                      </p>
                    </div>
                    <div className="h-full w-full flex items-start justify-center">
                      <img 
                        src="/images/project-pages/project01-b-b.webp" 
                        alt="Ideal Journey" 
                        loading="lazy" 
                        className="w-full h-auto object-contain rounded-lg" 
                      />
                    </div>
                  </BentoCardContent>
                )
              },

            ]}
          />
        </div>
      )}



      {/* Approach Section - Added below opportunity-space-ghg */}
      {projectId === 'co2-emissions-dashboard' && (
        <div className="mb-12 md:mb-20 xl:mb-28">
          {/* Project Section Header */}
          <div className="project-section-header">
            <div className="break-line-left"></div>
            <h2 className="bento-section-header">Our Approach</h2>
            <div className="break-line-right"></div>
          </div>
          
          {/* Bento Grid Default for Approach */}
          <BentoGridDefault 
            className="approach-ghg"
            customCells={[
              {
                row: 1,
                col: 1,
                colSpan: 4,
                rowSpan: 2,
                className: "row0custom-lg",
                content: (
                  <BentoCardContent 
                    sectionHeader="Information Architecture"
                    icon={<Database className="w-3 h-3" />}
                  >
                    <div className="w-full">
                      <p className="bc-leadin-lg w-full md:w-[55vw]">
                        After we identified a north star for solutioning, I started mapping data schemas to define the scope of the feature. We sliced the data vertically to aggregate building data into portfolio-wide overviews.
                      </p>
                      <img 
                        src="/images/project-pages/project01-c.webp" 
                        alt="Information Architecture Diagram" 
                        className="w-full h-auto rounded-lg 2xl:max-h-none 2xl:w-auto"
                        style={{ margin: 0, padding: 0 }}
                        loading="eager"
                        fetchPriority="high"
                      />
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 3,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Mapping the Architecture to Wireframes"
                    icon={<Map className="w-3 h-3" />}
                  >
                    <div className="w-full">
                      <img 
                        src="/images/project-pages/project01-d.webp" 
                        alt="Mapping the Architecture to Wireframes" 
                        className="w-full h-auto rounded-lg"
                        style={{ margin: 0, padding: 0 }}
                        loading="eager"
                        fetchPriority="high"
                      />
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 4,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Stakeholder Alignment"
                    icon={<MessageCirclePlus className="w-3 h-3" />}
                  >
                    <div className="stakeholder-alignment-content-shell">
                      <div className="stakeholder-grid">
                        <div className="stakeholder-shell">
                          <div 
                            className="team-member-image mark"
                            style={{
                              backgroundImage: 'url(/images/thumbnails/team/mark.jpg)',
                              backgroundSize: '170%',
                              backgroundPositionY: '60%'
                            }}
                          ></div>
                          <div className="interviewee-name">Mark</div>
                          <div className="interviewee-role">COO</div>
                        </div>
                        <div className="stakeholder-shell">
                          <div 
                            className="team-member-image alec"
                            style={{
                              backgroundImage: 'url(/images/thumbnails/team/alec.jpg)',
                              backgroundSize: '170%',
                              backgroundPositionY: '60%'
                            }}
                          ></div>
                          <div className="interviewee-name">Alec</div>
                          <div className="interviewee-role">CIO</div>
                        </div>
                        <div className="stakeholder-shell">
                          <div 
                            className="team-member-image sarah"
                            style={{
                              backgroundImage: 'url(/images/thumbnails/team/sarah.jpg)',
                              backgroundSize: '170%',
                              backgroundPositionY: '60%'
                            }}
                          ></div>
                          <div className="interviewee-name">Sarah</div>
                          <div className="interviewee-role">Manager</div>
                          <div className="interviewee-role">Customer Success</div>
                        </div>
                        <div className="stakeholder-shell">
                          <div 
                            className="team-member-image daniel"
                            style={{
                              backgroundImage: 'url(/images/thumbnails/team/daniel.jpg)',
                              backgroundSize: '170%',
                              backgroundPositionY: '60%'
                            }}
                          ></div>
                          <div className="interviewee-name">Daniel</div>
                          <div className="interviewee-role">Manager</div>
                          <div className="interviewee-role">Professional Services</div>
                        </div>
                      </div>

                      <div className="stakeholder-leadin-shell">
                        <div className="bc-leadin-lg mb-3">
                          After exploring the building blocks, we started molding the architecture.
                        </div>
                        <div className="bc-leadin-lg">
                          We talked with our customer facing team members to build a solution that addresses user problems and business objectives.
                        </div>
                      </div>
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 5,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Row 5 - Placeholder"
                    icon={<Database className="w-3 h-3" />}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-500">Content for Row 5</p>
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 6,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Row 6 - Placeholder"
                    icon={<Database className="w-3 h-3" />}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-500">Content for Row 6</p>
                    </div>
                  </BentoCardContent>
                )
              },
              {
                row: 7,
                col: 1,
                colSpan: 4,
                rowSpan: 1,
                content: (
                  <BentoCardContent 
                    sectionHeader="Row 7 - Placeholder"
                    icon={<Database className="w-3 h-3" />}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-500">Content for Row 7</p>
                    </div>
                  </BentoCardContent>
                )
              }
            ]}
          />
        </div>
      )}

      {/* Additional BentoGridDefault above the Opportunity Space grid - Hide for GHG project */}
      {projectId !== 'co2-emissions-dashboard' && (
        <div className="opportunity-space-es" style={{ marginBottom: '32px' }}>
          <BentoGridDefault 
            showCellNumbers={showCellNumbers}
            setShowCellNumbers={setShowCellNumbers}
            customCells={[
            {
              row: 1,
              col: 1,
              colSpan: 2,
              clickable: false,
              type: 'deboss',
              content: (
                <BentoCardContent 
                  sectionHeader="User Interviews"
                  icon={<Lightbulb className="w-3 h-3" />}
                >
                  <InterviewSection />
                </BentoCardContent>
              )
            },

            {
              row: 2,
              col: 1,
              colSpan: 4,
              rowSpan: 2,
              className: "row0custom-lg",
              content: (
                <BentoCardContent 
                  sectionHeader="Analysis of Existing Energy Star Workflows"
                  icon={<ZoomIn className="w-3 h-3" />}
                >
                  <div className="w-full">
                    <img 
                      src="/images/projectImages/project02-v11-b.webp" 
                      alt="Tenants and Spaces Design Iterations" 
                      className="w-full h-auto rounded-lg"
                      style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </BentoCardContent>
              )
            },
            {
              row: 1,
              col: 3,
              colSpan: 2,
              clickable: false,
              content: (
                <BentoCardContent 
                  sectionHeader="Insights"
                  icon={<Activity className="w-3 h-3" />}
                >
                  <div>
                    {/* Main heading with left border */}
                                          <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--color-accent-blue-mid)' }}></div>
                        <p className="bc-leadin pl-6 w-full lg:w-[90%] mt-0 md:mt-[4vw] xl:mt-[6vw] 2xl:mt-[6vw]">
                          Structure Energy Star data the way property teams think and work, rather than offloading complex calculations onto users.
                        </p>
                      </div>
                      
                                            {/* Stacked flex layout */}
                      <div className="mt-6">
                        <div className="flex flex-col pl-6 w-[95%] md:w-[95%] lg:w-[90%]">
                          <p className="bc-body-copy">
                            What users do today feels easy, but they don't feel confident about the results.
                          </p>
                          <p className="bc-body-copy">
                            Manual data conversions increase assumptions and push users to rely on tribal knowledge, which makes accuracy hard to scale.
                          </p>
                        </div>
                      </div>
                  </div>
                </BentoCardContent>
              )
            },
            {
              row: 4,
              col: 1,
              colSpan: 4,
              rowSpan: 2,
              content: (
                <BentoCardContent sectionHeader="Objectives" icon={<PlaneTakeoff className="w-3 h-3" />}>
                  <div className="w-full h-full flex flex-col justify-start">
                    {/* Touchpoints at top */}
                                           <div className="mb-2 touchpoints-mb-960 touchpoints-mb-1600 space-y-2">
                         <div className="bc-subheaders touchpoints-header-960" style={{
                           marginTop: window.innerWidth < 960 ? '16px' : window.innerWidth >= 960 && window.innerWidth < 1600 ? '24px' : '0px',
                           marginBottom: window.innerWidth < 960 ? '16px' : window.innerWidth >= 960 && window.innerWidth < 1600 ? '12px' : '24px'
                         }}>Touchpoints</div>
                         <div className="flex flex-col md:flex-row">
                           <div className="bc-label" style={{fontWeight: '700', marginRight: '8px'}}>Current</div>
                           <div className="bc-label">Property Team Questionnaire + Airtable + Dropbox Paper + Portfolio Manager</div>
                         </div>
                         <div className="flex flex-col md:flex-row">
                           <div className="bc-label" style={{fontWeight: '700', marginRight: '8px'}}>Proposed</div>
                           <div className="bc-label">Backpack App + Portfolio Manager</div>
                         </div>
                       </div>
                    
                    {/* Current vs Proposed Comparison Visualization */}
                    <div className="space-y-8">
                      
                        {/* Single Grid with Headers and Sliders */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[24px] md:gap-[56px] mt-0 relative">
                          {/* Vertical divider lines */}
                          <div className="hidden md:block absolute bottom-0 w-px bg-gray-200 vertical-divider-left" style={{height: 'calc(100% - 24px)'}}></div>
                          <div className="hidden md:block absolute bottom-0 w-px bg-gray-200 vertical-divider-right" style={{height: 'calc(100% - 24px)'}}></div>
                          <div className="space-y-0">
                            <div className="bc-subheaders text-sm h-12 md:h-8 lg:h-10 flex items-end objectives-headers">Transparent Reporting</div>
                            
                            {/* Labels Container */}
                            <div className="slider-labels-shell">
                              <div className="bc-list-item text-left">
                                <div className="bc-label-headers">Low Transparency</div>
                                <div className="bc-label"></div>
                              </div>
                              <div className="bc-list-item text-right">
                                <div className="bc-label-headers text-right">High Transparency</div>
                                <div className="bc-label text-right"></div>
                              </div>
                            </div>
                            
                            {/* Current Slider */}
                            <div className="slider-shell flex flex-col">
                              <div className="bc-label mt-1 md:mt-3 lg:mt-4">Current</div>
                              <div className="slider-container">
                                <div className="w-full rounded-full" style={{backgroundColor: 'var(--color-tertiary)', height: '10px'}}></div>
                                <div className="absolute top-0 left-0 rounded-full" style={{width: '20%', backgroundColor: 'var(--color-primary)', height: '10px'}}></div>
                                <div className="progress-bar-dot current-slider" style={{left: '20%'}}></div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs"></div>
                              <div className="text-xs"></div>
                            </div>
                            
                            {/* Proposed Slider */}
                            <div className="slider-shell flex flex-col">
                              <div className="bc-label mt-1 md:mt-3 lg:mt-4">Proposed</div>
                              <div className="slider-container">
                                <div className="w-full rounded-full" style={{backgroundColor: 'var(--color-tertiary)', height: '10px'}}></div>
                                <div className="absolute top-0 left-0 rounded-full" style={{width: '85%', backgroundColor: 'var(--color-accent-blue-lite)', height: '10px'}}></div>
                                <div className="progress-bar-dot" style={{left: '85%'}}></div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs"></div>
                              <div className="text-xs"></div>
                            </div>
                            
                            {/* Bullet points */}
                            <div className="mt-4" style={{marginTop: '2vw'}}>
                              <ul className="bc-bullets-sm">
                                <li>Increase consistency and scale new calculation methods as Energy Star requirements evolve</li>
                                <li>Ensure reporting logic is clear and consistent across onboarding coordinators, Energy Star engineers, and property teams</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="space-y-0">
                            <div className="bc-subheaders text-sm h-12 md:h-8 lg:h-10 flex items-end objectives-headers">Cognitive Load</div>
                            
                            {/* Labels Container */}
                            <div className="slider-labels-shell">
                              <div className="bc-list-item text-left">
                                <div className="bc-label-headers">Low</div>
                                <div className="bc-label"></div>
                              </div>
                              <div className="bc-list-item text-right">
                                <div className="bc-label-headers text-right">High</div>
                                <div className="bc-label text-right"></div>
                              </div>
                            </div>
                            
                            {/* Current Slider */}
                                                 <div className="slider-shell flex flex-col">
                       <div className="bc-label mt-1 md:mt-3 lg:mt-4 md:invisible">Current</div>
                       <div className="slider-container">
                         <div className="w-full rounded-full" style={{backgroundColor: 'var(--color-tertiary)', height: '10px'}}></div>
                         <div className="absolute top-0 left-0 rounded-full" style={{width: '70%', backgroundColor: 'var(--color-primary)', height: '10px'}}></div>
                         <div className="progress-bar-dot current-slider" style={{left: '70%'}}></div>
                       </div>
                     </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs"></div>
                              <div className="text-xs"></div>
                            </div>
                            
                            {/* Proposed Slider */}
                                                 <div className="slider-shell flex flex-col">
                       <div className="bc-label mt-1 md:mt-3 lg:mt-4 md:invisible">Proposed</div>
                       <div className="slider-container">
                         <div className="w-full rounded-full" style={{backgroundColor: 'var(--color-tertiary)', height: '10px'}}></div>
                         <div className="absolute top-0 left-0 rounded-full" style={{width: '20%', backgroundColor: 'var(--color-accent-blue-lite)', height: '10px'}}></div>
                         <div className="progress-bar-dot" style={{left: '20%'}}></div>
                       </div>
                     </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs"></div>
                              <div className="text-xs"></div>
                            </div>
                            
                            {/* Bullet points */}
                            <div className="mt-4" style={{marginTop: '2vw'}}>
                              <ul className="bc-bullets-sm">
                                <li>A shared mental model reduces duplicate effort and makes onboarding and handoff between roles more seamless</li>
                                <li>Energy engineers can focus on strategic insights rather than reconciling incomplete or inconsistent data</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="space-y-0">
                            <div className="bc-subheaders text-sm h-12 md:h-8 lg:h-10 flex items-end objectives-headers">Data Maintenance</div>
                            
                            {/* Labels Container */}
                            <div className="slider-labels-shell">
                              <div className="bc-list-item text-left">
                                <div className="bc-label-headers">Low lift</div>
                                <div className="bc-label"></div>
                              </div>
                              <div className="bc-list-item text-right">
                                <div className="bc-label-headers text-right">High lift</div>
                                <div className="bc-label text-right"></div>
                              </div>
                            </div>
                            
                            {/* Current Slider */}
                                                 <div className="slider-shell flex flex-col">
                       <div className="bc-label mt-1 md:mt-3 lg:mt-4 md:invisible">Current</div>
                       <div className="slider-container">
                         <div className="w-full rounded-full" style={{backgroundColor: 'var(--color-tertiary)', height: '10px'}}></div>
                         <div className="absolute top-0 left-0 rounded-full" style={{width: '87%', backgroundColor: 'var(--color-primary)', height: '10px'}}></div>
                         <div className="progress-bar-dot current-slider" style={{left: '87%'}}></div>
                       </div>
                     </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs"></div>
                              <div className="text-xs"></div>
                            </div>
                            
                            {/* Proposed Slider */}
                                                 <div className="slider-shell flex flex-col">
                       <div className="bc-label mt-1 md:mt-3 lg:mt-4 md:invisible">Proposed</div>
                       <div className="slider-container">
                         <div className="w-full rounded-full" style={{backgroundColor: 'var(--color-tertiary)', height: '10px'}}></div>
                         <div className="absolute top-0 left-0 rounded-full" style={{width: '22%', backgroundColor: 'var(--color-accent-blue-lite)', height: '10px'}}></div>
                         <div className="progress-bar-dot" style={{left: '22%'}}></div>
                       </div>
                     </div>
                            <div className="flex justify-between mt-2">
                              <div className="text-xs"></div>
                              <div className="text-xs"></div>
                            </div>
                            
                            {/* Bullet points */}
                            <div className="mt-4" style={{marginTop: '2vw'}}>
                              <ul className="bc-bullets-sm">
                                <li>Maintain Energy Star certification with targeted updates, aligned to how property teams already track tenant changes</li>
                                <li>Catch and resolve issues early to avoid time-consuming audits or full data recalculations during submission</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      


                    </div>
                  </div>
                </BentoCardContent>
              )
            },
            {
              row: 6,
              col: 2,
              colSpan: 3,
              rowSpan: 1,
              content: (
                <BentoCardContent sectionHeader="Next Steps" icon={<ArrowRight className="w-3 h-3" />}>
                  <div>
                                          <div className="next-steps-top-shell flex flex-row gap-4">
                        <div className="bc-bullets next-steps-bullets-width">
                          <ol className="next-steps-bullets">
                            <li>Integrate push API to Energy Star for direct submission</li>
                            <li>Manage response handling and data sync from Energy Star</li>
                            <li>Extend into new verticals, starting with multi-family housing</li>
                          </ol>
                        </div>
                        <div className="next-steps-logos flex flex-row items-center justify-center gap-2 next-steps-logos-margin flex-1">
                        <img src="/images/logos/linkedin-logo.png" alt="LinkedIn" className="next-steps-logo-height w-auto" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-link2 lucide-link-2 next-steps-transfer" aria-hidden="true">
    <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
    <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
    <line x1="8" x2="16" y1="12" y2="12"></line>
  </svg>
                        <img src="/images/logos/energy-star-logo.png" alt="Energy Star" className="next-steps-logo-height w-auto" />
                      </div>
                    </div>
                    
                    <div className="my-4">
                      <div className="h-px bg-gray-200 my-6"></div>
                      <h4 className="bc-subheaders">Metrics for Future Impact</h4>
                                              <div className="w-[70vw] md:w-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="space-y-2">
                            <p className="bc-label-headers">Accuracy & Quality</p>
                            <div className="bc-bullets-sm">
                              <ul>
                                <li>Reduction in audit flags or Energy Star rejections</li>
                                <li>% decrease in user-submitted support tickets about data errors</li>
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="bc-label-headers">Operational Impact</p>
                            <div className="bc-bullets-sm">
                              <ul>
                                <li># of repeated support issues related to product changes</li>
                                <li>% of properties fully onboarded in first 90 days</li>
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="bc-label-headers">Market Expansion</p>
                            <div className="bc-bullets-sm">
                              <ul>
                                <li>% increase in portfolio coverage with existing team size helps us expand into portfolio-wide capital improvements recommendations</li>
                              </ul>
                            </div>
                          </div>
                        </div>
               

                    </div>
                  </div>
                </BentoCardContent>
              )
            },
            {
              row: 6,
              col: 1,
              colSpan: 1,
              rowSpan: 1,
              clickable: false,
              className: 'target-impact-card',
              content: (
                <BentoCardContent sectionHeader="Target Impact" icon={<Navigation className="w-3 h-3" />} className="pb-0 target-impact-card" style={{ paddingBottom: '0' }}>
                  <div className="flex flex-col w-full h-full gap-0" style={{ paddingBottom: '0', marginBottom: '0' }}>
                    <div className="h-full" style={{ paddingBottom: '0', marginBottom: '0' }}>
                      <div className="grid grid-cols-1 h-full" style={{ paddingBottom: '0', marginBottom: '0' }}>
                        <div className="text-center metrics-shell h-full flex flex-col justify-start">
                          <div className="bc-metric-callout">45%</div>
                          <div className="bc-metric-caption">Reduction in Energy Star preparation and reporting time spent per building</div>
                          <p className="bc-body-copy">Based on optimal building-to-analyst ratio for maintaining positive ROI</p>
                          <p className="bc-body-copy text-xs mb-1">4 → 2.2 hours</p>
                          <p className="bc-body-copy text-xs mb-1">5 → 2 softwares</p>
                        </div>

                      </div>
                    </div>

                  </div>
                </BentoCardContent>
              )
            }
          ]}
        />
      </div>
      )}



      {/* Middle Bento Grid Header - Hide for GHG project */}
      {projectId !== 'co2-emissions-dashboard' && (
        <div className="bento-header" style={{ marginTop: '5vw' }}>
              <div className="project-section-header">
                <div className="break-line-left"></div>
                <h2 className="bento-section-header">Our Approach</h2>
                <div className="break-line-right"></div>
              </div>
            </div>
      )}

                        {/* Toggle View Element - Hide for GHG project */}
                        {projectId !== 'co2-emissions-dashboard' && (
                          <ViewToggleNavigation
                            viewMode={viewMode}
                            onViewModeChange={handleViewModeChange}
                            showNavButtons={false}
                            centered={true}
                            className="project-toggle"
                          />
                        )}



      {/* View 1 Content - Hide for GHG project */}
      {projectId !== 'co2-emissions-dashboard' && viewMode === 'view1' && (
        <div className="view-1-content">

          {/* Custom BentoGridDefault variant with team card for 3D tab */}
          <div className="approach-site" style={{ marginTop: '32px', marginBottom: '32px' }}>
            <BentoGridDefault 
              showCellNumbers={showCellNumbers}
              setShowCellNumbers={setShowCellNumbers}
              customCells={[
                // Overview card at row 1, col 1
                {
                  row: 1,
                  col: 1,
                  type: 'flat',
                  content: (
                    <BentoCardContent 
                      sectionHeader="Overview"
                      icon={<Telescope className="w-3 h-3" />}
                    >
                      <div>
                        <p className="bc-header">Project Overview</p>
                        <p className="bc-body-copy">We needed a more efficient way to integrate with the EPA's Energy Star Program. The existing system was fragmented, forcing users to switch between multiple tools and manually piece together data.</p>
                        <p className="bc-body-copy">We built a spatial data dashboard that ingests structured data aligned with property teams' management tools. This lets users enter building and property details quickly, without the burden of complex calculations.</p>
                      </div>
                    </BentoCardContent>
                  )
                },
                // Team card spanning 3 cells (row 1, cols 2-4)
                {
                  row: 1,
                  col: 2,
                  colSpan: 3,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Team"
                      icon={<Blocks className="w-3 h-3" />}
                      className="relative"
                    >
                      <div className="my-role">
                        <p className="bc-header text-sm">My Role: Product Designer</p>
                        <p className="bc-body-copy">As design–product lead, I drove the end-to-end software development process, from initial research and concept development through final implementation. Partnered with engineering and data science to scope, refine, and phase scalable spatial visualizations, turning complex data transformations and logic into intuitive user flows.</p>
                      </div>
                      <TeamSection teamType="3d" />
                    </BentoCardContent>
                  )
                },
                // Large spanning card for rows 2-3, all columns (cells 5-12)  
                {
                  row: 2,
                  col: 1,
                  colSpan: 4,
                  rowSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Energy Star Data Structure"
                      icon={<Database className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v00-b.webp" 
                          alt="Analysis of existing Energy Star workflows" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Card spanning cells 13-14 (row 4, cols 1-2)
                {
                  row: 4,
                  col: 1,
                  colSpan: 2,
                  type: 'flat',
                  content: (
                    <BentoCardContent 
                      sectionHeader="Chunking into Smaller Datasets"
                      icon={<Package className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v00-e.webp" 
                          alt="Chunking Datasets" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Card spanning cells 15-16 (row 4, cols 3-4)
                {
                  row: 4,
                  col: 3,
                  colSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Phasing into Projects and Features"
                      icon={<SendToBack className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v00-f.webp" 
                          alt="Phasing into Projects" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Large card spanning cells 17-24 (rows 5-6, all columns)
                {
                  row: 5,
                  col: 1,
                  colSpan: 4,
                  rowSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Testing through Wireframes"
                      icon={<Microscope className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v00-d.webp" 
                          alt="Testing Through Wireframes" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Card spanning cells 25-32 (rows 7-8, all columns)
                {
                  row: 7,
                  col: 1,
                  colSpan: 4,
                  rowSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Creating a Modular 3D System"
                      icon={<Box className="w-3 h-3" />}
                      bodyClassName="center-vertically"
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v10-b.webp" 
                          alt="Implementation & Results" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                        <img 
                          src="/images/project-pages/project02-v10-c.webp" 
                          alt="Implementation & Results Detail" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Row 9 - Scale the Visualization card spanning all columns
                {
                  row: 9,
                  col: 1,
                  colSpan: 4,
                  type: 'flat',
                  content: (
                    <BentoCardContent 
                      sectionHeader="Scale through Test Cases"
                      icon={<Layers className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v10-d.webp" 
                          alt="Scale the Visualization for Various Size Buildings" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Rows 10-11 - Logic and User Flows card spanning 2 rows and all columns
                {
                  row: 10,
                  col: 1,
                  colSpan: 4,
                  rowSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Logic and User Flows"
                      icon={<Route className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v10-h.webp" 
                          alt="Logic and User Flows" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Row 12 - Design cards (cells 45-48)
                {
                  row: 12,
                  col: 1,
                  colSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Designs for Engineering"
                      icon={<Code className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v10-i.webp" 
                          alt="Designs for Engineering" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                {
                  row: 12,
                  col: 3,
                  colSpan: 2,
                  type: 'flat',
                  content: (
                    <BentoCardContent 
                      sectionHeader="Tangential Flow States"
                      icon={<Workflow className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v10-k.webp" 
                          alt="Tangential Flow States" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                },
                // Rows 13-14 - Hi-Fi Mocks card spanning 2 rows and all columns
                {
                  row: 13,
                  col: 1,
                  colSpan: 4,
                  rowSpan: 2,
                  content: (
                    <BentoCardContent 
                      sectionHeader="Hi-Fi Mocks"
                      icon={<Monitor className="w-3 h-3" />}
                    >
                      <div className="w-full">
                        <img 
                          src="/images/project-pages/project02-v10-j.webp" 
                          alt="Hi-Fi Mocks" 
                          className="w-full h-auto rounded-lg"
                          style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                          loading="lazy"
                        />
                      </div>
                    </BentoCardContent>
                  )
                }
              ]}
            />
          </div>

          {/* Toggle View Container */}
          <ViewToggleNavigation
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onPrevClick={() => handleNavigation('prev')}
            onNextClick={() => handleNavigation('next')}
            className="project-bottom-nav"
          />

        </div>
      )}

      {/* View 2 Content - Hide for GHG project */}
      {projectId !== 'co2-emissions-dashboard' && viewMode === 'view2' && (
                    <div className="view-2-content approach-building">
                      <BentoGridDefault 
                        showCellNumbers={showCellNumbers} 
                        setShowCellNumbers={setShowCellNumbers}
                        customCells={[
                          // Row 1 - Building Use Data Schemas (spans entire row)
                          {
                            row: 1,
                            col: 1,
                            colSpan: 4,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Building Use Data Schemas"
                                icon={<Database className="w-3 h-3" />}
                              >
                                <div className="w-full">
                                  <img 
                                    src="/images/project-pages/project02-v01-e.webp" 
                                    alt="Building Use Data Schemas" 
                                    className="w-full h-auto rounded-lg"
                                    style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                                    loading="eager"
                                    fetchPriority="high"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Row 2 - Cell 1 (Cell 9) - spans 2 rows (includes cell 13)
                          {
                            row: 2,
                            col: 1,
                            rowSpan: 2,
                            type: 'flat',
                            content: (
                              <BentoCardContent 
                                sectionHeader="Data Architecture"
                                icon={<LayoutPanelTop className="w-3 h-3" />}
                              >
                                <div className="w-full">
                                  <img 
                                    src="/images/project-pages/project02-v10-l.webp" 
                                    alt="Data Architecture" 
                                    className="w-full h-auto rounded-lg"
                                    style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Spans cells 10-12 and 14-16 (Row 2, Cols 2-4 and Row 3, Cols 2-4)
                          {
                            row: 2,
                            col: 2,
                            colSpan: 3,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Testing through Wireframes"
                                icon={<Microscope className="w-3 h-3" />}
                              >
                                <div className="w-full">
                                  <img 
                                    src="/images/project-pages/project02-v10-m.webp" 
                                    alt="Testing Through Wireframes" 
                                    className="w-full h-auto rounded-lg"
                                    style={{ objectFit: 'contain', margin: 0, padding: 0 }}
                                  />
                                </div>
                              </BentoCardContent>
                                                        )
                          },
                          // Rows 4-5 - Design Iterations for Editing Data (spans all columns)
                          {
                            row: 4,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Design Iterations for Editing Data"
                                icon={<Repeat2 className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-f.webp" 
                                    alt="Design Iterations" 
                                    className="w-full h-auto object-contain rounded-lg"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },

                          // Row 6 - Adding Spaces Drawers (spans all columns)
                          {
                            row: 6,
                            col: 1,
                            colSpan: 4,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Adding Spaces Drawers"
                                icon={<PanelRightOpen className="w-3 h-3" />}
                              >
                                <div className="w-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-h.webp" 
                                    alt="Adding Spaces Drawers" 
                                    className="w-full object-contain rounded-lg"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Rows 7-8 - UI Studies (spans all columns)
                          {
                            row: 7,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="UI Studies"
                                icon={<Palette className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-j.webp" 
                                    alt="UI Studies" 
                                    className="w-full h-auto object-contain rounded-lg"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },


                          // Row 9 - Standard Row (spans all columns)
                          {
                            row: 9,
                            col: 1,
                            colSpan: 4,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Feature Interactivity"
                                icon={<SquareMousePointer className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-k.webp" 
                                    alt="Standard Row" 
                                    className="w-auto h-full object-contain rounded-lg feature-interactivity-image"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },

                          // Rows 10-11 - Final Implementation for Tenants and Spaces (spans all columns)
                          {
                            row: 10,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Final Implementation for Tenants and Spaces"
                                icon={<LayoutDashboard className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-i.webp" 
                                    alt="Final Implementation for Tenants and Spaces" 
                                    className="w-full h-auto object-contain rounded-lg"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Row 12-13 - Vertical spanning card (cells 12-13)
                          {
                            row: 12,
                            col: 1,
                            rowSpan: 2,
                            type: 'deboss',
                            content: (
                              <BentoCardContent 
                                sectionHeader="Stakeholder Review"
                                icon={<UserSearch className="w-3 h-3" />}
                              >
                                <div className="building-use-stakeholder-shell">
                                  <p className="bc-body-copy">We interviewed internal team members to ensure we were supporting their current processes and offered ways to help streamline them.</p>
                                  <div className="stakeholder-items-container">
                                    <div className="stakeholder-list-item">
                                      <div 
                                        className="stakeholder-image"
                                        style={{
                                          backgroundImage: `url('/images/teamsPhotos/daniel.jpg')`
                                        }}
                                      />
                                      <div className="stakeholder-text">
                                        <div className="bc-label-headers text-center">Daniel</div>
                                        <div className="bc-label text-center" style={{ whiteSpace: 'pre-line' }}>Manager, Professional Services</div>
                                      </div>
                                    </div>
                                    <div className="stakeholder-list-item">
                                      <div 
                                        className="stakeholder-image"
                                        style={{
                                          backgroundImage: `url('/images/teamsPhotos/duffy.jpg')`
                                        }}
                                      />
                                      <div className="stakeholder-text">
                                        <div className="bc-label-headers text-center">Andrew</div>
                                        <div className="bc-label text-center" style={{ whiteSpace: 'pre-line' }}>Director, Operations</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Spans cells 12-13 (Row 12, Cols 2-4 and Row 13, Cols 2-4)
                          {
                            row: 12,
                            col: 2,
                            colSpan: 3,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Operations Support"
                                icon={<Cog className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v10-n.webp" 
                                    alt="Operations Support" 
                                    className="w-full h-auto object-contain rounded-lg"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },

                          // Row 14 - User Nudges and Status Updates (spans all columns)
                          {
                            row: 14,
                            col: 1,
                            colSpan: 4,
                            content: (
                              <BentoCardContent 
                                sectionHeader="User Nudges and Status Updates"
                                icon={<BellRing className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-l.webp" 
                                    alt="User Nudges and Status Updates" 
                                    className="w-full object-contain rounded-lg"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Rows 15-16 - Designs for Data Visualization and Hover States (spans all columns)
                          {
                            row: 15,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Designs for Data Visualization and Hover States"
                                icon={<Wallpaper className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v12-j.webp" 
                                    alt="" 
                                    loading="lazy" 
                                    className="w-auto h-full object-contain rounded-lg data-viz-hover-image" 
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Rows 17-18 - Hi-Fi Data Ingest User Flows (spans all columns)
                          {
                            row: 17,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Hi-Fi Data Ingest User Flows"
                                icon={<TrendingUpDown className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-start justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-g.webp" 
                                    alt="Translating into Hi-Fi User Flows" 
                                    className="w-auto h-full object-contain rounded-lg hi-fi-user-flows-image"
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },



                          // Rows 19-20 - Versioning Datasets (spans all columns)
                          {
                            row: 19,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Versioning Datasets"
                                icon={<DatabaseBackup className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v20-e.webp" 
                                    alt="" 
                                    loading="lazy" 
                                    className="w-full h-auto object-contain rounded-lg final-impl-tenants-image" 
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Row 21 - Major UX States (spans all columns)
                          {
                            row: 21,
                            col: 1,
                            colSpan: 4,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Major UX States"
                                icon={<SquareDashedMousePointer className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v11-m.webp" 
                                    alt="" 
                                    loading="lazy" 
                                    className="w-auto h-full object-contain rounded-lg major-ux-states-image" 
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },
                          // Rows 22-23 - Final Implementation for Property Use Types (spans all columns)
                          {
                            row: 22,
                            col: 1,
                            colSpan: 4,
                            rowSpan: 2,
                            content: (
                              <BentoCardContent 
                                sectionHeader="Final Implementation for Property Use Types"
                                icon={<SquaresUnite className="w-3 h-3" />}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src="/images/project-pages/project02-v12-f.webp" 
                                    alt="" 
                                    loading="lazy" 
                                    className="w-auto h-full object-contain rounded-lg final-impl-property-image" 
                                  />
                                </div>
                              </BentoCardContent>
                            )
                          },

                        ]}
                      />
                      
                      {/* Toggle View Navigation below the grid */}
                      <ViewToggleNavigation
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                        onPrevClick={() => handleNavigation('prev')}
                        onNextClick={() => handleNavigation('next')}
                        className="project-bottom-nav"
                        showViewToggle={projectId === 'spatial-data-mapping'}
                      />
                    </div>
                  )}

    </div>
  );
};

export default BentoGrid;
