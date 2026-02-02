import React, { useState, useEffect } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BentoGridDefault from '../components/BentoGridDefault';
import BreakLineHeader from '../components/BreakLineHeader';
import DSLHeader from '../components/DSLHeader';
import DSLSubheader from '../components/DSLSubheader';
import ViewToggleNavigation from '../components/ViewToggleNavigation';
import DSLSheet from '../components/DSLSheet';
import { useCellNumbers } from '../contexts/CellNumbersContext';

interface DSLProps {
  isEmbedded?: boolean;
}

const DSL: React.FC<DSLProps> = ({ isEmbedded = false }) => {
  const [computedColors, setComputedColors] = useState<{[key: string]: string}>({});
  const { showCellNumbers, setShowCellNumbers } = useCellNumbers();
  const [viewMode, setViewMode] = useState<'view1' | 'view2'>('view1');
  const [isDSLSheetOpen, setIsDSLSheetOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getComputedColor = (variable: string) => {
      return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    const updateColors = () => {
          const computed = {
      '--color-primary': getComputedColor('--color-primary'),
      '--color-secondary': getComputedColor('--color-secondary'),
      '--color-tertiary': getComputedColor('--color-tertiary'),
      '--color-background': getComputedColor('--color-background'),
      '--empty-1': 'transparent',
      '--empty-2': 'transparent',
      '--color-accent-blue-dark': getComputedColor('--color-accent-blue-dark'),
      '--color-accent-blue-mid': getComputedColor('--color-accent-blue-mid'),
      '--color-accent-blue-lite': getComputedColor('--color-accent-blue-lite'),
      '--color-accent-yellow-dark': getComputedColor('--color-accent-yellow-dark'),
      '--color-accent-yellow-mid': getComputedColor('--color-accent-yellow-mid'),
      '--color-accent-yellow-lite': getComputedColor('--color-accent-yellow-lite'),
      '--color-accent-pink-dark': getComputedColor('--color-accent-pink-dark'),
      '--color-accent-pink-mid': getComputedColor('--color-accent-pink-mid'),
      '--color-accent-pink-lite': getComputedColor('--color-accent-pink-lite'),
    };
      setComputedColors(computed);
    };

    // Initial load
    updateColors();

    // Set up a MutationObserver to watch for CSS changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          updateColors();
        }
      });
    });

    // Observe the document element for style changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    // Also update on window resize (in case of responsive changes)
    window.addEventListener('resize', updateColors);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateColors);
    };
  }, []);

  const colors = [
    { variable: '--color-primary', value: 'var(--color-primary)' },
    { variable: '--color-secondary', value: 'var(--color-secondary)' },
    { variable: '--color-tertiary', value: 'var(--color-tertiary)' },
    { variable: '--color-background', value: 'var(--color-background)' },
    { variable: '--empty-1', value: 'transparent' },
    { variable: '--empty-2', value: 'transparent' },
    { variable: '--color-accent-blue-dark', value: 'var(--color-accent-blue-dark)' },
    { variable: '--color-accent-blue-mid', value: 'var(--color-accent-blue-mid)' },
    { variable: '--color-accent-blue-lite', value: 'var(--color-accent-blue-lite)' },
    { variable: '--color-accent-yellow-dark', value: 'var(--color-accent-yellow-dark)' },
    { variable: '--color-accent-yellow-mid', value: 'var(--color-accent-yellow-mid)' },
    { variable: '--color-accent-yellow-lite', value: 'var(--color-accent-yellow-lite)' },
    { variable: '--color-accent-pink-dark', value: 'var(--color-accent-pink-dark)' },
    { variable: '--color-accent-pink-mid', value: 'var(--color-accent-pink-mid)' },
    { variable: '--color-accent-pink-lite', value: 'var(--color-accent-pink-lite)' },
  ];

  // Shadow examples
  const shadowExamples = [
    // Neumorphic Shadows
    { name: 'Neumorph Small', class: 'neumorph-sm', color: 'var(--color-background)' },
    { name: 'Neumorph Medium', class: 'neumorph-md', color: 'var(--color-background)' },
    { name: 'Neumorph Large', class: 'neumorph-lg', color: 'var(--color-background)' },
    
    // Regular Shadows
    { name: 'Regular Small', class: 'reg-sm', color: 'var(--color-background)' },
    { name: 'Regular Medium', class: 'reg-md', color: 'var(--color-background)' },
    { name: 'Regular Large', class: 'reg-lg', color: 'var(--color-background)' },
  ];

  // Role tag shadow examples
  const roleTagShadows = [
    { name: 'Background', class: 'role-tag-background', color: 'var(--color-background)' },
    { name: 'Tertiary', class: 'role-tag-tertiary', color: 'var(--color-tertiary)' },
    { name: 'Blue Lite', class: 'role-tag-blue-lite', color: 'var(--color-accent-blue-lite)' },
    { name: 'Blue Mid', class: 'role-tag-blue-mid', color: 'var(--color-accent-blue-mid)' },
    { name: 'Blue Dark', class: 'role-tag-blue-dark', color: 'var(--color-accent-blue-dark)' },
    { name: 'Yellow Mid', class: 'role-tag-yellow-mid', color: 'var(--color-accent-yellow-mid)' },
    { name: 'Yellow Dark', class: 'role-tag-yellow-dark', color: 'var(--color-accent-yellow-dark)' },
    { name: 'Pink Mid', class: 'role-tag-pink-mid', color: 'var(--color-accent-pink-mid)' },
    { name: 'Gray Dark', class: 'role-tag-gray-dark', color: 'var(--color-primary)' },
    { name: 'White', class: 'role-tag-white', color: 'var(--color-white)' },
  ];

  return (
    <div className={`min-h-screen ${isEmbedded ? 'p-0' : 'p-8'}`} style={{ backgroundColor: 'var(--color-background)' }}>
              <div className={`${isEmbedded ? 'w-full' : 'max-w-6xl mx-auto'}`}>
        

        
        {/* Color Palette Section */}
        <section className="mb-12 w-full">
          <DSLHeader title="Color Palette" />
          <div className="grid grid-cols-6 gap-6 w-full">
            {colors.map((color, index) => (
              <div key={index} className="flex flex-col items-start w-full">
                <div 
                  className={`w-full mb-3 ${color.variable === '--color-background' ? 'border' : ''}`}
                  style={{ 
                    backgroundColor: color.value,
                    aspectRatio: '1 / 0.25',
                    borderRadius: '4px',
                    borderColor: color.variable === '--color-background' ? 'var(--color-tertiary)' : 'transparent'
                  }}
                />
                <p className="text-xs font-mono text-left">{color.variable}</p>
                <p className="text-xs text-gray-400 mt-1">{computedColors[color.variable] || 'N/A'}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shadow Examples Section */}
        <section className="mb-12">
          <DSLHeader title="Shadow System" />
          <div className="grid grid-cols-6 gap-6">
            {shadowExamples.map((shadow, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`aspect-square rounded-full mb-3 ${shadow.class}`}
                  style={{ 
                    backgroundColor: 'var(--color-background)',
                    width: '45%'
                  }}
                />
                <p className="text-sm font-semibold text-center">{shadow.name}</p>
                <p className="text-xs text-gray-400 mt-1">.{shadow.class}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Role Tag Shadows Section */}
        <section className="mb-12">
          <DSLHeader title="color-based-shadows" />
          <div className="flex flex-wrap gap-4">
            {roleTagShadows.map((roleTag, index) => (
              <div key={index} className="flex flex-col items-start flex-shrink-0">
                <div 
                  className={`w-24 h-24 rounded-full mb-3 ${roleTag.class}`}
                  style={{ backgroundColor: roleTag.color }}
                />
                <p className="text-sm font-semibold text-left text-white">{roleTag.name}</p>
                <p className="text-xs text-white mt-1 opacity-70">.{roleTag.class}</p>
                
                {/* Role tag example below each circle */}
                <div className="mt-3 w-full">
                  <div 
                    className="w-full h-[200px] flex items-center justify-center"
                    style={{ backgroundColor: roleTag.color }}
                  >
                    <div 
                      className={`px-3 py-2 rounded-full text-xs font-medium ${roleTag.class}`}
                      style={{ 
                        backgroundColor: roleTag.color,
                        color: roleTag.class === 'role-tag-gray-dark' ? 'var(--color-secondary)' : 'white'
                      }}
                    >
                      {roleTag.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type Styles Section */}
        <section className="mb-12">
          <DSLHeader title="Type Styles" />
          
          {/* Home Subsection */}
          <div className="mb-8">
            <DSLSubheader title="home" />
            <div className="dsl-text-grid" style={{ gap: '16px' }}>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">home-section-break</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <BreakLineHeader text="Recent Work" lineColor="secondary" />
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>32px, 1.2</div>
                      <div>1100px:</div><div>48px, 1.1</div>
                      <div>1600px:</div><div>56px, 1.1</div>
                      <div>weight:</div><div>500</div>
                      <div>color:</div><div>primary</div>
                      <div>break-lines:</div><div>secondary, 1px</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">home-section-leadin</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h3 className="home-section-leadin">What can <span>design</span> sound like?</h3>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>40px, 1.2</div>
                      <div>1100px:</div><div>48px, 1.3</div>
                      <div>1600px:</div><div>48px, 1.3</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                      <div>span:</div><div>inherit</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">home-section-copy</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="home-section-copy">I iterate using a toolbelt of skills—orchestrated notes building to a multi-faceted solution.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.3</div>
                      <div>1100px:</div><div>24px, 1.3</div>
                      <div>1600px:</div><div>24px, 1.4</div>
                      <div>weight:</div><div>300</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">home-body-copy</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-body-copy">Sample body text with multiple lines to demonstrate the styling and spacing.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>14px, 1.3</div>
                      <div>1100px:</div><div>20px, 1.3</div>
                      <div>1600px:</div><div>22px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Page Subsection */}
          <div className="mb-8">
            <DSLSubheader title="about" />
            <div className="dsl-text-grid" style={{ gap: '16px' }}>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-section-leadin</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h3 className="about-section-leadin">What can design sound like?</h3>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>40px, 1.2</div>
                      <div>1100px:</div><div>56px, 1.3</div>
                      <div>1600px:</div><div>56px, 1.3</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-intro-subtitle</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-intro-subtitle">A product designer with</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>20px, 1.3</div>
                      <div>1100px:</div><div>32px, 1.3</div>
                      <div>1600px:</div><div>36px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-section-break</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <BreakLineHeader text="Recent Work" lineColor="secondary" />
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>20px, 1.2</div>
                      <div>1100px:</div><div>24px, 1.2</div>
                      <div>1600px:</div><div>24px, 1.2</div>
                      <div>weight:</div><div>500</div>
                      <div>color:</div><div>primary</div>
                      <div>break-lines:</div><div>secondary, 1px</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-section-header</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h2 className="about-section-header">Section Header</h2>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>20px, 1.2</div>
                      <div>768px:</div><div>24px, 1.2</div>
                      <div>1600px:</div><div>24px, 1.2</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                      <div>margin-bottom:</div><div>32px (mobile)</div>
                      <div>margin-bottom:</div><div>48px (768px+)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-diagram-header</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h3 className="about-diagram-header">Deep T</h3>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>20px, 1.2</div>
                      <div>1100px:</div><div>20px, 1.2</div>
                      <div>1600px:</div><div>20px, 1.2</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                      <div>margin-bottom:</div><div>16px</div>
                      <div>margin-top:</div><div>0</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-tag</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h3 className="about-tag" style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: 'var(--color-accent-blue-mid)', margin: '0 0 16px 0', display: 'inline-block', width: 'fit-content' }}>Card Header</h3>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.2</div>
                      <div>1100px:</div><div>16px, 1.2</div>
                      <div>1600px:</div><div>20px, 1.2</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                      <div>margin-bottom:</div><div>16px (mobile), 24px (1100px), 20px (1600px)</div>
                      <div>padding:</div><div>8px 16px</div>
                      <div>border-radius:</div><div>20px</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-section-copy</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-section-copy">I iterate using a toolbelt of skills—orchestrated notes building to a multi-faceted solution.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.4</div>
                      <div>1100px:</div><div>24px, 1.4</div>
                      <div>1600px:</div><div>24px, 1.4</div>
                      <div>weight:</div><div>300</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-caption-copy</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-caption-copy">Going through an existential moment with metrics, so had some fun with metrics that convey who I am</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>14px, 1.3</div>
                      <div>1100px:</div><div>18px, 1.3</div>
                      <div>1600px:</div><div>18px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>width:</div><div>80vw (mobile), 40vw (480px+), 25vw (1100px+)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-body-copy</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-body-copy">Whether designing at human scale or for digital users, human-centered design puts real people at the center of the problem.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.3</div>
                      <div>1100px:</div><div>18px, 1.3</div>
                      <div>1600px:</div><div>20px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-metrics-lg</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-metrics-lg">275k SF</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>28px, 1.2</div>
                      <div>768px:</div><div>36px, 1.2</div>
                      <div>1600px:</div><div>42px, 1.2</div>
                      <div>weight:</div><div>500</div>
                      <div>color:</div><div>accent-blue-dark</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-metrics-md</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-metrics-lg">15.16 <span className="about-metrics-md">yrs</span></p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>20px, 1.2</div>
                      <div>768px:</div><div>24px, 1.2</div>
                      <div>1600px:</div><div>28px, 1.2</div>
                      <div>weight:</div><div>500</div>
                      <div>color:</div><div>accent-blue-dark</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-metrics-sm</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="about-metrics-sm">Square Feet</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>12px, 1.3</div>
                      <div>768px:</div><div>14px, 1.3</div>
                      <div>1600px:</div><div>16px, 1.3</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">about-card</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="about-card about-card-blue-mid" style={{ borderRadius: '16px', padding: '24px', backgroundColor: 'var(--color-accent-blue-mid)' }}>
                      <h3 className="about-tag" style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: 'var(--color-accent-blue-mid)', margin: '0 0 16px 0', display: 'inline-block', width: 'fit-content' }}>Card Header</h3>
                      <p className="about-body-copy">Card body copy using about-body-copy style.</p>
                    </div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>border-radius:</div><div>16px</div>
                      <div>background:</div><div>full card color</div>
                      <div>padding:</div><div>24px</div>
                      <div>header:</div><div>about-tag</div>
                      <div>body:</div><div>about-body-copy</div>
                      <div>card shadow:</div><div>background style</div>
                      <div>tag shadow:</div><div>color-based</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Cards Subsection */}
          <div className="mb-8">
                        <DSLSubheader title="project cards" />
            <div className="dsl-text-grid" style={{ gap: '16px' }}>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">pc-role-tag</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="text-sm text-primary rounded-full inline-block w-fit" style={{ padding: '8px 20px', fontWeight: '500', fontSize: '1rem' }}>
                      B2B Web App
                    </div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>13.2px, 1.0</div>
                      <div>1100px:</div><div>16px, 1.0</div>
                      <div>1600px:</div><div>16px, 1.0</div>
                      <div>weight:</div><div>500</div>
                      <div>color:</div><div>primary</div>
                      <div>padding:</div><div>8px 20px</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">pc-title</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h2 className="pc-title">Sample Project Title</h2>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>40px, 1.2</div>
                      <div>1100px:</div><div>56px, 1.2</div>
                      <div>1600px:</div><div>64px, 1.2</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">pc-description</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="text-primary" style={{ fontSize: '1rem', lineHeight: '130%' }}>
                      Transforming building data into portfolio-wide environmental impact metrics for regulatory and voluntary reporting.
                    </div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.3</div>
                      <div>1100px:</div><div>18px, 1.3</div>
                      <div>1600px:</div><div>20px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>line-height:</div><div>130%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Page Subsection */}
          <div className="mb-8">
            <DSLSubheader title="project-page" />
            <div className="dsl-text-grid" style={{ gap: '16px' }}>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">project-tag</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <span className="project-tag">B2B Dashboard</span>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 16px 8px</div>
                      <div>1100px:</div><div>20px, 24px 12px</div>
                      <div>1600px:</div><div>24px, 28px 16px</div>
                      <div>radius:</div><div>32px</div>
                      <div>weight:</div><div>600</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">project-page-title</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="project-page-title">Sample Project Title</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>48px, 56px</div>
                      <div>1100px:</div><div>112px, 128px</div>
                      <div>1600px:</div><div>148px, 164px</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">project-page-title-description</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="project-page-title-description">Sample project title description text</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.4</div>
                      <div>1100px:</div><div>32px, 1.4</div>
                      <div>1440px:</div><div>36px, 1.4</div>
                      <div>1600px:</div><div>42px, 1.4</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>width:</div><div>mobile: 85vw, 1100px: 70vw, 1600px: 60vw</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">project-leadin</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="project-leadin">Sample lead-in text for project descriptions</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>30px, 1.3</div>
                      <div>1100px:</div><div>40px, 1.3</div>
                      <div>1600px:</div><div>52px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>width:</div><div>mobile: 90vw, 1100px: 85vw, 1600px: 85vw</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">project-section-header</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="flex items-center" style={{ marginTop: 0, marginBottom: 0 }}>
                      <div className="break-line-left"></div>
                      <h2 className="bento-section-header">Opportunity Space</h2>
                      <div className="break-line-right"></div>
                    </div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.4</div>
                      <div>1100px:</div><div>24px, 1.4</div>
                      <div>1600px:</div><div>28px, 1.4</div>
                      <div>weight:</div><div>500</div>
                      <div>color:</div><div>primary</div>
                      <div>line:</div><div>secondary, 1px</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Footer Navigation Components */}
              <div className="col-span-3 neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">project-footer-nav components</div>
                <div className="type-card-body">
                  <div className="sample-text w-full">
                    <div className="flex flex-col space-y-12">
                      {/* Navigation Buttons Container */}
                      <div className="flex flex-col w-full">
                        <div className="text-xs text-primary opacity-60 mb-4">navigation-buttons-container</div>
                        <div className="flex items-center space-x-4 justify-end w-full">
                          <button className="arrow-button-slide-background-light-blue-left md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary">
                            <div className="flex items-center justify-center w-5 h-5" style={{ transform: 'scaleX(-1)' }}>
                              <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></polyline>
                              </svg>
                            </div>
                            <div className="flex items-center hidden md:flex">Prev</div>
                          </button>
                          <button className="arrow-button-slide-background-light-blue md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary">
                            <div className="flex items-center hidden md:flex">Next</div>
                            <div className="flex items-center justify-center w-5 h-5">
                              <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></polyline>
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* View Toggle Container */}
                      <div className="flex flex-col w-full">
                        <div className="text-xs text-primary opacity-60 mb-4">view-toggle-container</div>
                        <div className="flex justify-center w-full">
                          <div className="view-toggle-container view1-active">
                            <button className="view-toggle active">
                              <div className="flex items-center justify-center w-5 h-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                  <path d="m12 8 6-3-6-3v10"></path>
                                  <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"></path>
                                  <path d="m6.49 12.85 11.02 6.3"></path>
                                  <path d="M17.51 12.85 6.5 19.15"></path>
                                </svg>
                              </div>
                              <div className="ml-1 flex items-center">Site Use</div>
                            </button>
                            <button className="view-toggle">
                              <div className="flex items-center justify-center w-5 h-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                                  <path d="M10 6h4"></path>
                                  <path d="M10 10h4"></path>
                                  <path d="M10 14h4"></path>
                                  <path d="M10 18h4"></path>
                                </svg>
                              </div>
                              <div className="ml-1 flex items-center">Building Use</div>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Complete Project Footer Navigation */}
                      <div className="flex flex-col w-full mb-4">
                        <div className="text-xs text-primary opacity-60 mb-4">project-footer-nav</div>
                        <div className="project-footer-nav w-full flex flex-col items-center" style={{ minHeight: '120px' }}>
                          {/* Divider line at the top */}
                          <div 
                            className="w-full mb-6"
                            style={{ 
                              height: '2px', 
                              backgroundColor: 'var(--color-tertiary)',
                              borderRadius: '1px'
                            }}
                          />
                          
                          {/* Container with two divs */}
                          <div className="w-full relative">
                            {/* Div 1: View Toggle Container - fills container, centered */}
                            <div className="flex justify-center w-full">
                              <div className="view-toggle-container view1-active">
                                <button className="view-toggle active">
                                  <div className="flex items-center justify-center w-5 h-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                      <path d="m12 8 6-3-6-3v10"></path>
                                      <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"></path>
                                      <path d="m6.49 12.85 11.02 6.3"></path>
                                      <path d="M17.51 12.85 6.5 19.15"></path>
                                    </svg>
                                  </div>
                                  <div className="ml-1 flex items-center">Site Use</div>
                                </button>
                                <button className="view-toggle">
                                  <div className="flex items-center justify-center w-5 h-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                                      <path d="M10 6h4"></path>
                                      <path d="M10 10h4"></path>
                                      <path d="M10 14h4"></path>
                                      <path d="M10 18h4"></path>
                                    </svg>
                                  </div>
                                  <div className="ml-1 flex items-center">Building Use</div>
                                </button>
                              </div>
                            </div>
                            
                            {/* Div 2: Navigation Buttons - absolute positioned to the right */}
                            <div className="navigation-buttons-container absolute top-0 right-0 flex items-center space-x-4">
                              <button className="arrow-button-slide-background-light-blue-left md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary">
                                <div className="flex items-center justify-center w-5 h-5" style={{ transform: 'scaleX(-1)' }}>
                                  <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></polyline>
                                  </svg>
                                </div>
                                <div className="flex items-center hidden md:flex">Prev</div>
                              </button>
                              <button className="arrow-button-slide-background-light-blue md:slide-in-element-animation active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] text-primary">
                                <div className="flex items-center hidden md:flex">Next</div>
                                <div className="flex items-center justify-center w-5 h-5">
                                  <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="52.3,85 84.6,50 52.3,15" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></polyline>
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Cards Subsection */}
          <div className="mb-8">
            <DSLSubheader title="bento-cards" />
            <div className="dsl-text-grid" style={{ gap: '16px' }}>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-title</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Target Impact & Outcomes</span>
                    </h2>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.3, 20px</div>
                      <div>1100px:</div><div>20px, 1.3, 24px</div>
                      <div>1600px:</div><div>24px, 1.3, 28px</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-leadin-xl</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-leadin-xl">Key metrics and outcomes from the project implementation.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>28px, 1.3</div>
                      <div>1100px:</div><div>40px, 1.3</div>
                      <div>1600px:</div><div>48px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-leadin-lg</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-leadin-lg">Key metrics and outcomes from the project implementation.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.3</div>
                      <div>1100px:</div><div>22px, 1.3</div>
                      <div>1600px:</div><div>28px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-leadin-md</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-leadin-md">How might we enable users to identify gaps in their portfolio's utility data?</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.4</div>
                      <div>1100px:</div><div>18px, 1.4</div>
                      <div>1440px:</div><div>20px, 1.4</div>
                      <div>1600px:</div><div>22px, 1.4</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-leadin</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-leadin">Key metrics and outcomes from the project implementation.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>14px, 1.4</div>
                      <div>1100px:</div><div>16px, 1.4</div>
                      <div>1600px:</div><div>18px, 1.4</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-header</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="bc-header">Section Header</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>14px, 1.0</div>
                      <div>1100px:</div><div>18px, 1.0</div>
                      <div>1600px:</div><div>20px, 1.0</div>
                      <div>weight:</div><div>800</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-subheaders</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <h4 className="bc-subheaders">Metrics for Future Impact</h4>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>14px, 1.3</div>
                      <div>1100px:</div><div>16px, 1.3</div>
                      <div>1600px:</div><div>18px, 1.3</div>
                      <div>weight:</div><div>800</div>
                      <div>color:</div><div>primary</div>
                      <div>margin:</div><div>bottom: 12px</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-label-headers</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="bc-label-headers">Team Member Name</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>14px, 1.2</div>
                      <div>1100px:</div><div>16px, 1.2</div>
                      <div>1600px:</div><div>20px, 1.2</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                      <div>margin:</div><div>top: 8px</div>
                      <div>align:</div><div>center</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-label</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="bc-label">UX Designer</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>12px, 1.3</div>
                      <div>1100px:</div><div>14px, 1.3</div>
                      <div>1600px:</div><div>16px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>align:</div><div>center</div>
                      <div>overflow:</div><div>ellipsis</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-body-copy</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-body-copy">This is body copy text that provides detailed information about the project, its goals, and outcomes. It should be readable and well-structured.</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.4</div>
                      <div>1100px:</div><div>15px, 1.25</div>
                      <div>1440px:</div><div>18px, 1.3</div>
                      <div>1600px:</div><div>22px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-bullets</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <ol className="bc-bullets">
                      <li>Improved user engagement by 25%</li>
                      <li>Reduced support tickets by 40%</li>
                      <li>Increased conversion rate by 15%</li>
                    </ol>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>18px, 1.3</div>
                      <div>1100px:</div><div>16px, 1.25</div>
                      <div>1440px:</div><div>20px, 1.3</div>
                      <div>1600px:</div><div>24px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>spacing:</div><div>8px between items</div>
                      <div>style:</div><div>decimal numbers</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-bullets-sm</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <ul className="bc-bullets-sm">
                      <li>Feature A</li>
                      <li>Feature B</li>
                      <li>Feature C</li>
                    </ul>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.3</div>
                      <div>1100px:</div><div>14px, 1.2</div>
                      <div>1440px:</div><div>16px, 1.3</div>
                      <div>1685px:</div><div>20px, 1.3</div>
                      <div>weight:</div><div>400</div>
                      <div>color:</div><div>primary</div>
                      <div>spacing:</div><div>8px between items</div>
                      <div>bullet:</div><div>4px circle, primary color</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-content-header</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="bc-content-header">
                      <div 
                        className="project-content-icon"
                        style={{
                          backgroundImage: 'url(/images/icons/project-pages/icons_project-section-header-solve-painpoints.svg)'
                        }}
                      ></div>
                      <p>
                        <span>Solve Painpoints</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>20px, 1.3, 28px</div>
                      <div>1100px:</div><div>20px, 1.3, 32px</div>
                      <div>1440px:</div><div>24px, 1.3, 32px</div>
                      <div>1600px:</div><div>24px, 1.3, 36px</div>
                      <div>weight:</div><div>600</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-metric-callout</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <div className="bc-metric-callout">45%</div>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>32px, 1.2</div>
                      <div>1100px:</div><div>36px, 1.2</div>
                      <div>1600px:</div><div>56px, 1.2</div>
                      <div>weight:</div><div>700</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards">
                <div className="text-xs text-primary opacity-60 mb-4">bc-metric-caption</div>
                <div className="type-card-body">
                  <div className="sample-text">
                    <p className="bc-metric-caption">*45% reduction based on optimal building-to-analyst ratio for maintaining positive ROI</p>
                  </div>
                  <div className="text-xs text-primary">
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <div>mobile:</div><div>16px, 1.3</div>
                      <div>1100px:</div><div>16px, 1.3</div>
                      <div>1600px:</div><div>20px, 1.3</div>
                      <div>weight:</div><div>600</div>
                      <div>color:</div><div>primary</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section>
          <DSLHeader title="Bento Grid" />
        </section>

        {/* Card Types */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Deboss Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '30vw', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">bento-card-deboss</div>
              <div className="type-card-body">
                <div className="sample-text">
                  <div className="bento-card-deboss p-6 rounded-xl bg-background">
                    <div className="bc-title">Deboss Card</div>
                    <div className="bc-body-copy mt-4">Clickable card with depth effects and shadow styling.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>background:</div><div>var(--color-background)</div>
                    <div>border-radius:</div><div>12px</div>
                    <div>shadow:</div><div>4px 6px 8px #d5d5d5, -4px -4px 8px #ffffff</div>
                    <div>hover:</div><div>enhanced shadow effects</div>
                    <div>clickable:</div><div>true</div>
                    <div>type:</div><div>deboss</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flat Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '30vw', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">bento-card-flat</div>
              <div className="type-card-body">
                <div className="sample-text">
                  <div className="bento-card-flat p-6 rounded-xl bg-background">
                    <div className="bc-title">Flat Card</div>
                    <div className="bc-body-copy mt-4">Non-clickable card without depth effects.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>background:</div><div>var(--color-background)</div>
                    <div>border-radius:</div><div>12px</div>
                    <div>shadow:</div><div>none</div>
                    <div>hover:</div><div>no effects</div>
                    <div>clickable:</div><div>false</div>
                    <div>type:</div><div>flat</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emboss Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '30vw', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">bento-card-emboss</div>
              <div className="type-card-body">
                <div className="sample-text">
                  <div className="bento-card-emboss p-6 rounded-xl bg-background">
                    <div className="bc-title">Emboss Card</div>
                    <div className="bc-body-copy mt-4">Card with raised/embossed appearance.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>background:</div><div>var(--color-background)</div>
                    <div>border-radius:</div><div>12px</div>
                    <div>shadow:</div><div>-4px -4px 8px #ffffff, 4px 4px 8px #d5d5d5</div>
                    <div>hover:</div><div>enhanced emboss effects</div>
                    <div>clickable:</div><div>true</div>
                    <div>type:</div><div>emboss</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Row Heights Section */}
        <section>
          <DSLSubheader title="bento-row heights" className="mt-12" />
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-8" style={{minHeight: '39vw'}}>
            {/* Hug Content Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-hug</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-hug w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>min-content</div>
                    <div>1440px:</div><div>min-content</div>
                    <div>1600px:</div><div>min-content</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Extra Short Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-xxs</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-xxs w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>4rem</div>
                    <div>1440px:</div><div>5rem</div>
                    <div>1600px:</div><div>6rem</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Short Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-xs</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-xs w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>10vw</div>
                    <div>1440px:</div><div>14vw</div>
                    <div>1600px:</div><div>18vw</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Short Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-sm</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-sm w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>14vw</div>
                    <div>1440px:</div><div>19vw</div>
                    <div>1600px:</div><div>24vw</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-md</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-md w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>20vw</div>
                    <div>1440px:</div><div>24vw</div>
                    <div>1600px:</div><div>27vw</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tall Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-lg</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-lg w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>27vw</div>
                    <div>1440px:</div><div>29vw</div>
                    <div>1600px:</div><div>30vw</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Large Height Card */}
            <div className="neumorph-lg p-4 rounded-2xl bg-background overflow-hidden flex flex-col justify-between dsl-text-cards" style={{height: '100%', minHeight: '200px'}}>
              <div className="text-xs text-primary opacity-60 mb-4">row-custom-xl</div>
              <div className="type-card-body flex-1">
                <div className="sample-text w-full h-full">
                  <div className="bento-card-deboss p-4 rounded-xl bg-background row-custom-xl w-full h-full">
                    <h2 className="bc-title">
                      <Users className="w-3 h-3" />
                      <span>Card Title</span>
                    </h2>
                    <div className="bc-body-copy mt-2">These are references only for copying styles, they aren't directly applied to the cell/rows. Do not apply them to the cards themselves.</div>
                  </div>
                </div>
                <div className="text-xs text-primary">
                  <div className="grid grid-cols-[auto_1fr] gap-x-2">
                    <div>mobile:</div><div>min-content</div>
                    <div>1100px:</div><div>35vw</div>
                    <div>1440px:</div><div>38vw</div>
                    <div>1600px:</div><div>42vw</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                  {/* BentoGridDefault Component */}
          <section className="mb-[10vw]">
            <DSLSubheader title="BentoGridDefault Component" className="mt-12" />
            <div className="text-primary mt-4 mb-6 space-y-6">

              
                              <div className="grid grid-cols-1 lg:grid-cols-6 gap-16">
                <div className="flex flex-col lg:col-span-1">
                  <h4 className="font-semibold text-primary mb-4">Props</h4>
                  <div className="flex-1 space-y-4">
                    <ol className="list-decimal list-inside space-y-0.5 text-xs">
                      <li>className: string</li>
                      <li>customCells: CustomCell[]</li>
                      <li>showCellNumbers: boolean</li>
                      <li>setShowCellNumbers: function</li>
                    </ol>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Base Layout</h4>
                      <ul className="list-none space-y-0.5 text-xs">
                        <li>• display: grid</li>
                        <li>• width: 100%</li>
                        <li>• gap: varies by breakpoint</li>
                        <li>• border-radius: 12px</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:col-span-2">
                  <h4 className="font-semibold text-primary mb-4">Base Breakpoint Styles</h4>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <h5 className="font-bold">Mobile (≤1099px)</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• 1 column</li>
                          <li>• min-content rows</li>
                          <li>• 8px gap</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">Desktop (1100px+)</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• 4 columns</li>
                          <li>• min-content auto rows</li>
                          <li>• 42px gap</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">Large (1440px+)</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• 4 columns</li>
                          <li>• min-content auto rows</li>
                          <li>• 42px gap</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">XL (1600px+)</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• 4 columns</li>
                          <li>• min-content auto rows</li>
                          <li>• 42px gap</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:col-span-3">
                  <h4 className="font-semibold text-primary mb-4">Special Classes</h4>
                  <p className="text-xs text-gray-600 mb-3">Breakpoints: ≤1099px/1100px+/1440px+</p>
                  <div className="flex-1">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="space-y-2">
                        <h5 className="font-bold">.approach-building</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• <span className="font-medium">All Rows:</span> min-content (hug) - cleared</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">.approach-site</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• <span className="font-medium">All Rows:</span> min-content (hug) - cleared</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">.opportunity-space-es</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• <span className="font-medium">All Rows:</span> min-content (hug) - cleared</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">.opportunity-space-ghg</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• <span className="font-medium">All Rows:</span> min-content (hug)</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-bold">.approach-ghg</h5>
                        <ul className="list-none space-y-0.5">
                          <li>• <span className="font-medium">All Rows:</span> min-content (hug) - cleared</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[calc(2*35vw+8px)] overflow-hidden">
              <BentoGridDefault showCellNumbers={showCellNumbers} setShowCellNumbers={setShowCellNumbers} />
            </div>
          </section>
      </div>

      {/* Global Dots for DSL Page - only show when not embedded */}
      {!isEmbedded && (
        <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-center gap-2">
          {/* Cell Numbers Toggle Dot - always visible on DSL page */}
          <button
            onClick={() => {
              setShowCellNumbers(!showCellNumbers);
            }}
            className="dot-counter w-4 h-4 rounded-full transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-primary)',
              border: '2px solid var(--color-secondary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-secondary)';
            }}
            aria-label="Toggle cell numbers"
          />

          {/* DSL Navigation Dot - always visible at bottom */}
          <button
            onClick={() => setIsDSLSheetOpen(!isDSLSheetOpen)}
            className="dot-dsl w-4 h-4 rounded-full relative group overflow-hidden transition-all duration-200"
            style={{
              backgroundColor: 'white',
              border: '2px solid var(--color-secondary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-secondary)';
            }}
            aria-label="Toggle Design System Library sheet"
          >
            {/* Background image that surfaces on hover when closed, hidden when open */}
            <div
              className={`absolute inset-0 transition-opacity duration-200 ${
                isDSLSheetOpen 
                  ? 'opacity-100 group-hover:opacity-0' 
                  : 'opacity-0 group-hover:opacity-100'
              }`}
              style={{
                backgroundImage: 'url(/images/thumbnails/radial.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </button>

          {/* DSL Sheet */}
          <DSLSheet
            isOpen={isDSLSheetOpen}
            onClose={() => setIsDSLSheetOpen(false)}
          />
        </div>
      )}

    </div>
  );
};

export default DSL; 