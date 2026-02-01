export interface SoundBar {
  id: number;
  label: string;
  audioSrc: string;
  color: string;
  playbackRate: number;
}

export const soundBars: SoundBar[] = [
  // Column 1
  { id: 1, label: "problem identification", audioSrc: "/audio/piano/piano08.mp3", color: "c2", playbackRate: 1 },
  { id: 2, label: "engineering working sessions", audioSrc: "/audio/piano/piano15.mp3", color: "c1", playbackRate: 1 },
  { id: 3, label: "focus on business drivers", audioSrc: "/audio/banjo-guitar/banjo1.mp3", color: "c3", playbackRate: 0.34 },
  { id: 4, label: "user journeys", audioSrc: "/audio/piano/piano19.mp3", color: "c1", playbackRate: 1 },
  { id: 5, label: "map user patterns and mental models", audioSrc: "/audio/piano/piano22.mp3", color: "c1", playbackRate: 1 },
  { id: 6, label: "generative research", audioSrc: "/audio/percussion/percussion01.mp3", color: "c4", playbackRate: 0.95 },
  
  // Column 2
  { id: 7, label: "analyze competitors", audioSrc: "/audio/piano/piano24.mp3", color: "c1", playbackRate: 1 },
  { id: 8, label: "measure engagement", audioSrc: "/audio/banjo-guitar/banjo2.mp3", color: "c3", playbackRate: 0.34 },
  { id: 9, label: "evaluate the market space", audioSrc: "/audio/banjo-guitar/banjo3.mp3", color: "c3", playbackRate: 0.34 },
  { id: 10, label: "high-fi mock-ups", audioSrc: "/audio/piano/piano08.mp3", color: "c2", playbackRate: 1 },
  { id: 11, label: "prototyping", audioSrc: "/audio/piano/piano15.mp3", color: "c1", playbackRate: 1 },
  { id: 12, label: "user interface design and visual communication", audioSrc: "/audio/piano/piano19.mp3", color: "c1", playbackRate: 1 },
  
  // Column 3
  { id: 13, label: "how might we statements", audioSrc: "/audio/percussion/bass02.mp3", color: "c4", playbackRate: 1 },
  { id: 14, label: "architecture diagrams", audioSrc: "/audio/piano/piano24.mp3", color: "c2", playbackRate: 1 },
  { id: 15, label: "integrate the design system", audioSrc: "/audio/piano/piano15.mp3", color: "c1", playbackRate: 1 },
  { id: 16, label: "wireframes", audioSrc: "/audio/piano/piano19.mp3", color: "c1", playbackRate: 1 },
  { id: 17, label: "validate hypothesis", audioSrc: "/audio/piano/piano08.mp3", color: "c2", playbackRate: 1 },
  { id: 18, label: "stakeholder alignment", audioSrc: "/audio/percussion/bass02.mp3", color: "c4", playbackRate: 1 },
]; 