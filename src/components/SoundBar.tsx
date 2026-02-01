import React, { useState, useRef, useEffect } from 'react';

interface SoundBarProps {
  label: string;
  audioSrc: string;
  color: string;
  playbackRate: number;
  onAudioPlayChange?: (isPlaying: boolean) => void;
  isGlobalPlaying?: boolean;
  onClear?: () => void;
}

const SoundBar: React.FC<SoundBarProps> = ({ label, audioSrc, color, playbackRate, onAudioPlayChange, isGlobalPlaying, onClear }) => {
  const [activeButton, setActiveButton] = useState<'a' | 'b' | 'c' | null>(null);
  const audioRefs = {
    a: useRef<HTMLAudioElement>(null),
    b: useRef<HTMLAudioElement>(null),
    c: useRef<HTMLAudioElement>(null)
  };

  useEffect(() => {
    // Set playback rate for all audio elements
    Object.values(audioRefs).forEach(ref => {
      if (ref.current) {
        ref.current.playbackRate = playbackRate;
      }
    });
  }, [playbackRate, audioRefs]);

  const handleButtonClick = (buttonType: 'a' | 'b' | 'c') => {
    // If clicking the same button, turn it off
    if (activeButton === buttonType) {
      const audioRef = audioRefs[activeButton];
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setActiveButton(null);
      if (onAudioPlayChange) onAudioPlayChange(false);
      return;
    }

    // Stop currently playing audio first
    if (activeButton) {
      const currentAudioRef = audioRefs[activeButton];
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }
    }

    // Start the selected audio immediately on user gesture
    const audioRef = audioRefs[buttonType];
    if (audioRef.current) {
      // Ensure audio is loaded
      if (audioRef.current.readyState < 2) {
        audioRef.current.addEventListener('canplaythrough', () => {
          audioRef.current!.play().catch(e => console.error('Audio play failed:', e));
        }, { once: true });
      } else {
        audioRef.current.play().catch(e => console.error('Audio play failed:', e));
      }
      
      setActiveButton(buttonType);
      if (onAudioPlayChange) onAudioPlayChange(true);
    }
  };

  const getVolume = (buttonType: 'a' | 'b' | 'c') => {
    switch (buttonType) {
      case 'a': return 0.25; // Low volume
      case 'b': return 0.5;  // Medium volume
      case 'c': return 1;    // High volume
      default: return 1;
    }
  };

  useEffect(() => {
    // Update volume for all audio elements
    Object.entries(audioRefs).forEach(([type, ref]) => {
      if (ref.current) {
        ref.current.volume = getVolume(type as 'a' | 'b' | 'c');
      }
    });
  }, [audioRefs]);

  // Handle global play/stop
  useEffect(() => {
    if (isGlobalPlaying !== undefined) {
      if (!isGlobalPlaying) {
        // Pause all audio but keep active button state
        Object.values(audioRefs).forEach(ref => {
          if (ref.current && !ref.current.paused) {
            ref.current.pause();
          }
        });
      } else {
        // Resume playing the active button if there is one
        if (activeButton && audioRefs[activeButton].current) {
          audioRefs[activeButton].current!.play().catch(e => console.error('Audio resume failed:', e));
        }
      }
    }
  }, [isGlobalPlaying, audioRefs, activeButton]);

  // Handle clear
  useEffect(() => {
    if (onClear) {
      const handleClear = () => {
        setActiveButton(null);
        Object.values(audioRefs).forEach(ref => {
          if (ref.current && !ref.current.paused) {
            ref.current.pause();
            ref.current.currentTime = 0;
          }
        });
      };
      
      // Listen for clear events
      const handleClearEvent = () => handleClear();
      document.addEventListener('clear-synthesizer', handleClearEvent);
      
      return () => {
        document.removeEventListener('clear-synthesizer', handleClearEvent);
      };
    }
  }, [onClear, audioRefs]);

  return (
    <div className="sound-column">
      <button className={`radio ${activeButton ? 'radioactive' : 'radioinactive'}`}></button>
      <div className="flex-row-reverse-responsive">
        <div className="sound-bars-container">
          {/* Low volume button */}
          <div className="sound-bar-container c1-child1">
            <div
              className={`blank-bar child-1-bar ${color} ${activeButton === 'a' ? `${color}-on` : ''}`}
              onClick={() => {
                handleButtonClick('a');
              }}
            >
              <audio
                ref={audioRefs.a}
                src={audioSrc}
                loop
                className="sound-note a"
              />
            </div>
          </div>

          {/* Medium volume button */}
          <div className="sound-bar-container c1-child2">
            <div
              className={`blank-bar child-2-bar ${color} ${activeButton === 'b' ? `${color}-on` : ''}`}
              onClick={() => {
                handleButtonClick('b');
              }}
            >
              <audio
                ref={audioRefs.b}
                src={audioSrc}
                loop
                className="sound-note b"
              />
            </div>
          </div>

          {/* High volume button */}
          <div className="sound-bar-container c1-child3">
            <div
              className={`blank-bar child-3-bar ${color} ${activeButton === 'c' ? `${color}-on` : ''}`}
              onClick={() => {
                handleButtonClick('c');
              }}
            >
              <audio
                ref={audioRefs.c}
                src={audioSrc}
                loop
                className="sound-note c"
              />
            </div>
          </div>
        </div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
};

export default SoundBar; 