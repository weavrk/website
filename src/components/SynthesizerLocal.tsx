import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import SoundBar from './SoundBar';
import { soundBars } from '../data/synthesizerData';

interface SynthesizerLocalProps {
  className?: string;
}

const SynthesizerLocal: React.FC<SynthesizerLocalProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [activeSoundBars, setActiveSoundBars] = useState<Set<string>>(new Set());

  const synthRef = useRef<HTMLDivElement>(null);

  // Handle audio play changes from SoundBar components
  const handleAudioPlayChange = (soundBarId: string, isPlayingForBar: boolean) => {
    setActiveSoundBars(prev => {
      const newSet = new Set(prev);
      if (isPlayingForBar) {
        newSet.add(soundBarId);
        setIsPlaying(true); // Always turn on global play if any bar is activated
      } else {
        newSet.delete(soundBarId);
        if (newSet.size === 0) {
          setIsPlaying(false); // Only turn off global play if no bars are active
        }
      }
      return newSet;
    });
  };

  // Clear all audio selections
  const clearAll = useCallback(() => {
    // Stop all audio and reset state
    setIsPlaying(false);
    setActiveSoundBars(new Set());
    
    // Trigger React state reset for all SoundBar components
    setClearTrigger(prev => prev + 1);
    
    // Dispatch clear event for SoundBar components
    document.dispatchEvent(new CustomEvent('clear-synthesizer'));
  }, []);

  useEffect(() => {
    if (!synthRef.current) return;

    const container = synthRef.current;
    
    // Initialize synthesizer functionality
    const initSynth = () => {
      const toggleSwitch = container.querySelector('#toggleSwitch') as HTMLDivElement;

      if (!toggleSwitch) return;

      // Toggle switch functionality
      const handleToggle = () => {
        if (isPlaying) {
          // Just pause audio, don't clear active sound bars
          setIsPlaying(false);
        } else {
          // Resume playing if there are active sound bars
          if (activeSoundBars.size > 0) {
            setIsPlaying(true);
          }
        }
      };

      toggleSwitch.addEventListener('click', handleToggle);

      // Clear button functionality
      const clearButton = container.querySelector('#clearButton') as HTMLDivElement;
      if (clearButton) {
        clearButton.addEventListener('click', clearAll);
      }

      // Cleanup function
      return () => {
        toggleSwitch.removeEventListener('click', handleToggle);
        if (clearButton) {
          clearButton.removeEventListener('click', clearAll);
        }
      };
    };

    const cleanup = initSynth();
    return () => {
      cleanup && cleanup();
    };
  }, [isPlaying, clearTrigger, clearAll, activeSoundBars.size]);

  return (
    <div className={`synthesizer-container ${className}`} ref={synthRef}>
      <section className="lexicon-shell" id="lexicon">
        <div className="synth-container">
          <div className="synth-controls">
            <div className="speaker-container">
              <div className="speaker-image-container">
                <img src="/images/icons/speaker.svg" alt="Speaker" />
              </div>
            </div>
            <div className="synth-buttons">
              <div className="control-1">
                <div className="bg-white border border-tertiary text-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]" style={{ marginBottom: 0, padding: '6px 16px' }}>
                  Audio off/on
                </div>
                <div className={`toggle-switch ${isPlaying ? 'playing' : 'stopped'}`} id="toggleSwitch">
                  <div className="toggle-slider">
                    <div className="toggle-dot"></div>
                  </div>
                </div>
              </div>
              <div className="control-2">
                <div className="bg-white border border-tertiary text-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]" style={{ marginBottom: 0, padding: '6px 16px' }}>
                  Clear audio
                </div>
                <div className="clear-button" id="clearButton">
                  <Trash2 size={20} />
                </div>
              </div>
            </div>
          </div>
          <hr className="synth-divider" />

          <section className="synth-notes">
            {soundBars.map((soundBar) => (
              <SoundBar
                key={`${soundBar.id}-${clearTrigger}`}
                label={soundBar.label}
                audioSrc={soundBar.audioSrc}
                color={soundBar.color}
                playbackRate={soundBar.playbackRate}
                onAudioPlayChange={(isPlaying) => handleAudioPlayChange(soundBar.id.toString(), isPlaying)}
                isGlobalPlaying={isPlaying}
                onClear={() => {}}
              />
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default SynthesizerLocal; 