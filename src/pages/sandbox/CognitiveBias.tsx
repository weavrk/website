import React from 'react';
import PageShell from '../../components/PageShell';
import BackToTop from '../../components/BackToTop';

const CognitiveBias: React.FC = () => {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cognitive Biases</h1>
          <p className="text-lg text-secondary mb-2">Online Repository</p>
          <p className="text-xl">
            A centralized space to record Behavioral Laws, Biases, and Conditioning.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-background rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="mb-4">
              This repository serves as a comprehensive collection of cognitive biases, behavioral laws, 
              and psychological conditioning patterns. It's designed to be a reference tool for understanding 
              human decision-making processes and behavioral psychology.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Repository Contents</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Cognitive biases and their effects</li>
              <li>Behavioral laws and principles</li>
              <li>Psychological conditioning patterns</li>
              <li>Case studies and examples</li>
              <li>Research methodologies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Purpose and Application</h3>
            <p className="mb-4">
              Understanding cognitive biases is crucial for designing better user experiences, 
              making informed decisions, and developing products that account for human psychology. 
              This repository provides a structured approach to studying and applying these concepts.
            </p>

            <h3 className="text-xl font-semibold mb-3">Research Methodology</h3>
            <p className="mb-4">
              The repository is built on extensive research from psychology, behavioral economics, 
              and cognitive science. Each entry includes definitions, examples, and practical 
              applications for designers and researchers.
            </p>

            <h3 className="text-xl font-semibold mb-3">Target Audience</h3>
            <p className="mb-4">
              This resource is designed for UX researchers, product designers, behavioral scientists, 
              and anyone interested in understanding how human psychology influences decision-making 
              and behavior in digital and physical environments.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mt-8">
              <h4 className="text-lg font-semibold mb-3">Project Status</h4>
              <p className="text-secondary">
                This repository is currently being developed and organized. The "Coming Soon" tag 
                indicates that while the research and content structure are in place, the full 
                interactive repository is still being built.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </PageShell>
  );
};

export default CognitiveBias; 