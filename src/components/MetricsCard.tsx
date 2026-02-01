import React from 'react';

interface Metric {
  label: string;
  value: string;
}

interface MetricsCardProps {
  title: string;
  metrics: Metric[];
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, metrics, className = '' }) => {
  return (
    <div className={`metrics-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <span className="text-lg font-bold text-primary">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsCard; 