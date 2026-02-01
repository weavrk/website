import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BackToTop from '../../components/BackToTop';

const WatchBox: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <button 
            onClick={() => navigate('/sandbox')}
            className="flex items-center text-primary hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sandbox
          </button>
          
          <div className="flex items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mr-3">
              WatchBox
            </h1>
          </div>
          
          <p className="text-xl text-primary">
            Central source for streaming watchlists.
          </p>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Image */}
        <div 
          className="w-full h-96 md:h-[500px] bg-gray-200 rounded-3xl mb-12 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/thumbnails/sandbox-watchbox.webp)` }}
        ></div>
      </div>
      <BackToTop />
    </div>
  );
};

export default WatchBox;

