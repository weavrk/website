import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TufteVisualizations: React.FC = () => {
  const navigate = useNavigate();

  // Sample data for visualizations
  const brandLanguageData = [
    { metric: 'consistency', value: 85, change: '+12' },
    { metric: 'recognition', value: 78, change: '+23' },
    { metric: 'cohesion', value: 92, change: '+18' },
    { metric: 'efficiency', value: 67, change: '+31' }
  ];

  const researchMethodsData = [
    { method: 'interviews', frequency: 45, effectiveness: 88 },
    { method: 'surveys', frequency: 32, effectiveness: 72 },
    { method: 'usability testing', frequency: 28, effectiveness: 94 },
    { method: 'card sorting', frequency: 15, effectiveness: 81 },
    { method: 'journey mapping', frequency: 22, effectiveness: 89 }
  ];

  const patternLibraryData = [
    { component: 'buttons', reuse: 94, savings: 240 },
    { component: 'forms', reuse: 87, savings: 180 },
    { component: 'navigation', reuse: 96, savings: 320 },
    { component: 'cards', reuse: 82, savings: 150 },
    { component: 'modals', reuse: 78, savings: 110 }
  ];

  const spatialData = [
    { region: 'northeast', buildings: 1240, efficiency: 76 },
    { region: 'southeast', buildings: 980, efficiency: 82 },
    { region: 'midwest', buildings: 1150, efficiency: 71 },
    { region: 'southwest', buildings: 890, efficiency: 84 },
    { region: 'northwest', buildings: 760, efficiency: 79 }
  ];

  const co2Data = [
    { month: 'jan', baseline: 450, actual: 380, reduction: 70 },
    { month: 'feb', baseline: 460, actual: 375, reduction: 85 },
    { month: 'mar', baseline: 440, actual: 360, reduction: 80 },
    { month: 'apr', baseline: 420, actual: 340, reduction: 80 },
    { month: 'may', baseline: 410, actual: 320, reduction: 90 },
    { month: 'jun', baseline: 400, actual: 310, reduction: 90 }
  ];

  const onboardingData = [
    { step: 'welcome', completion: 96, time: 45 },
    { step: 'profile', completion: 89, time: 120 },
    { step: 'preferences', completion: 82, time: 90 },
    { step: 'verification', completion: 78, time: 180 },
    { step: 'tutorial', completion: 71, time: 240 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-light text-primary mb-2">
            data visualizations
          </h1>
          <p className="text-primary opacity-75 text-sm">
            conceptual representations inspired by edward tufte's principles of clarity and minimal design
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Brand Language */}
        <div className="mb-16">
          <h2 className="text-lg font-light text-primary mb-6">brand language impact</h2>
          <div className="grid grid-cols-4 gap-8">
            {brandLanguageData.map((item, index) => (
              <div key={index} className="neumorph-sm p-6 rounded-2xl bg-background border-l-4" style={{borderLeftColor: 'var(--color-accent-blue-dark)'}}>
                <div className="text-2xl font-light text-primary">{item.value}%</div>
                <div className="text-xs text-primary opacity-60">{item.metric}</div>
                <div className="text-xs font-medium" style={{color: 'var(--color-accent-blue-dark)'}}>{item.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Methods */}
        <div className="mb-16">
          <h2 className="text-lg font-light text-primary mb-6">research methods effectiveness</h2>
          <div className="neumorph-md p-8 rounded-2xl bg-background space-y-4">
            {researchMethodsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3" style={{borderBottomColor: 'var(--color-tertiary)'}}>
                <div className="flex items-center space-x-8">
                  <div className="w-32 text-sm text-primary">{item.method}</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-primary opacity-60">frequency</div>
                    <div className="text-sm text-primary">{item.frequency}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${item.effectiveness}px`,
                      backgroundColor: 'var(--color-accent-yellow-dark)'
                    }}
                  ></div>
                  <div className="text-sm text-primary w-8">{item.effectiveness}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Library */}
        <div className="mb-16">
          <h2 className="text-lg font-light text-primary mb-6">pattern library efficiency</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="neumorph-sm p-6 rounded-2xl bg-background">
              <div className="text-xs text-primary opacity-60 mb-4">reuse rate</div>
              {patternLibraryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-3 pb-2 border-b" style={{borderBottomColor: 'var(--color-tertiary)'}}>
                  <div className="text-sm text-primary">{item.component}</div>
                  <div className="text-sm font-medium" style={{color: 'var(--color-accent-blue-dark)'}}>{item.reuse}%</div>
                </div>
              ))}
            </div>
            <div className="neumorph-sm p-6 rounded-2xl bg-background">
              <div className="text-xs text-primary opacity-60 mb-4">time savings (hours)</div>
              {patternLibraryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-3 pb-2 border-b" style={{borderBottomColor: 'var(--color-tertiary)'}}>
                  <div className="text-sm text-primary">{item.component}</div>
                  <div className="text-sm font-medium" style={{color: 'var(--color-accent-yellow-dark)'}}>{item.savings}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spatial Data */}
        <div className="mb-16">
          <h2 className="text-lg font-light text-primary mb-6">spatial data mapping</h2>
          <div className="neumorph-md p-8 rounded-2xl bg-background">
            <div className="grid grid-cols-5 gap-6">
              {spatialData.map((item, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-full rounded-t-lg mb-3 mx-auto"
                    style={{ 
                      height: `${item.buildings / 20}px`,
                      backgroundColor: 'var(--color-accent-blue-mid)'
                    }}
                  ></div>
                  <div className="text-xs text-primary opacity-60 mb-1">{item.region}</div>
                  <div className="text-sm text-primary font-medium">{item.buildings}</div>
                  <div className="text-xs" style={{color: 'var(--color-accent-blue-dark)'}}>{item.efficiency}% efficient</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CO2 Dashboard */}
        <div className="mb-16">
          <h2 className="text-lg font-light text-primary mb-6">co2 emissions reduction</h2>
          <div className="neumorph-md p-8 rounded-2xl bg-background space-y-4">
            <div className="flex items-center space-x-8 text-xs text-primary opacity-60 pb-2 border-b" style={{borderBottomColor: 'var(--color-tertiary)'}}>
              <div>month</div>
              <div>baseline</div>
              <div>actual</div>
              <div>reduction</div>
            </div>
            {co2Data.map((item, index) => (
              <div key={index} className="flex items-center space-x-8">
                <div className="w-8 text-sm text-primary font-medium">{item.month}</div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-2 rounded-full" style={{backgroundColor: 'var(--color-secondary)'}}></div>
                  <div className="text-sm text-primary">{item.baseline}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${item.actual / 10}px`,
                      backgroundColor: 'var(--color-accent-blue-dark)'
                    }}
                  ></div>
                  <div className="text-sm text-primary">{item.actual}</div>
                </div>
                <div className="text-sm font-medium" style={{color: 'var(--color-accent-yellow-dark)'}}>-{item.reduction}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Onboarding */}
        <div className="mb-16">
          <h2 className="text-lg font-light text-primary mb-6">mobile onboarding flows</h2>
          <div className="neumorph-md p-8 rounded-2xl bg-background space-y-4">
            {onboardingData.map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b" style={{borderBottomColor: 'var(--color-tertiary)'}}>
                <div className="flex items-center space-x-6">
                  <div className="w-20 text-sm text-primary font-medium">{item.step}</div>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-3 rounded-full" 
                      style={{ 
                        width: `${item.completion}px`,
                        backgroundColor: 'var(--color-accent-yellow-mid)'
                      }}
                    ></div>
                    <div className="text-sm text-primary">{item.completion}%</div>
                  </div>
                </div>
                <div className="text-sm text-primary opacity-60">{item.time}s avg</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-8 border-t" style={{borderTopColor: 'var(--color-tertiary)'}}>
          <p className="text-xs text-primary opacity-40">
            data visualizations follow edward tufte's principles: high data-ink ratio, 
            minimal chartjunk, clear typography, and focus on the information itself
          </p>
        </div>
      </div>
    </div>
  );
};

export default TufteVisualizations; 