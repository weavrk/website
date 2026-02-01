import React from 'react';

interface ComingSoonProps {
  text?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ text = "Coming Soon" }) => {
  return (
    <div className="bg-white border border-tertiary text-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]" style={{ marginBottom: 0, padding: '6px 16px' }}>
      {text}
    </div>
  );
};

export default ComingSoon; 