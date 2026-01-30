import React, { useState, useEffect, useRef } from 'react';
import { Wand2 } from 'lucide-react';
import RecentWorkGrid from '../components/RecentWorkGrid';
import BreakLineHeader from '../components/BreakLineHeader';
import CaretDesktop from '../components/CaretDesktop';
import PageShell from '../components/PageShell';
import SynthesizerLocal from '../components/SynthesizerLocal';
import BackToTop from '../components/BackToTop';


const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const words = ['product designer', 'maker', 'life-long learner'];

  useEffect(() => {
    // Set visible immediately
    setIsVisible(true);
    

    
    // Ensure body can scroll (fix for mobile scroll issues)
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.classList.remove('mobile-menu-open');
    
    // Also ensure html can scroll
    document.documentElement.style.overflow = '';
    document.documentElement.style.position = '';
    
    const animateWord = () => {
      setIsAnimating(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Roll out current word
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }, 500);
    };

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(animateWord, 2500);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words.length]);

  return (
    <PageShell>
      <section className="landing">
        <div className="intro">
          <p className={`intro-greeting float-up-start float-up-animation-first${isVisible ? ' animate' : ''}`}>Hello!</p>
          <div className={`i-am-leadin float-up-start float-up-animation-second${isVisible ? ' animate' : ''}`}>
            <p>I'm Katherine,</p>
            <div className="i-am-animation">
              <p className="mr-4">a</p>
              <div className="relative">
                <p className={`${isAnimating ? 'roll-out-animation' : 'roll-in-animation'}`}>{words[currentWord]}</p>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          </div>
          <p className={`intro-body float-up-start float-up-animation-third${isVisible ? ' animate' : ''}`}>
            living in Austin, Texas who loves opening hoods. Give me a challenge
            and I roll up my sleeves and lean in.
          </p>
        </div>
        {/* Caret animation */}
        <div className="flex justify-start mt-8">
          <CaretDesktop />
        </div>
      </section>

      <BreakLineHeader 
        text="Recent Work" 
        lineColor="secondary"
        className="flex items-center justify-center my-12"
      />

      {/* Recent Projects Section */}
      <div className="mb-[8vw] mt-0 md:mt-6">
        <RecentWorkGrid />
      </div>

      {/* Toolbelt Section */}
      <BreakLineHeader 
        text="Toolbelt" 
        lineColor="secondary"
        className="flex items-center justify-center my-12"
      />

      <div className="toolbelt-shell mb-12">
                    <h3 className="home-section-leadin home-section-leadin-yellow">
              What can <span>design</span> sound like?
            </h3>
        <div className="toolbelt-callout-shell max-w-4xl">
          <div className="flex items-center mb-2">
            <div className="toolbelt-call-out-icon mr-3">
              <Wand2 size={32} color="var(--color-accent-blue-mid)" />
            </div>
            <div className="landing-toolbelt-caption">Let's make some music</div>
          </div>
          <p className="home-section-copy">
            I iterate using a toolbelt of skills—orchestrated notes
            building to a multi-faceted solution. I had some fun with front-end
            development and built a synthesizer to simulate this.
          </p>
        </div>
      </div>

      {/* Interactive Synthesizer Section */}
      <div>
        <SynthesizerLocal className="w-full" />
      </div>
      <BackToTop />
    </PageShell>
  );
};

export default Home;