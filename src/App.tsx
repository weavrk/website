import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LogoutButton from './components/LogoutButton';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import SandboxMatrix from './pages/SandboxMatrix';
import ProjectDetail from './pages/ProjectDetail';
import DSL from './pages/DSL';
import Blessu from './pages/sandbox/Blessu';
import Nomad from './pages/sandbox/Nomad';
import WatchBox from './pages/sandbox/WatchBox';
import Chrona from './pages/sandbox/Chrona';
import CognitiveBias from './pages/sandbox/CognitiveBias';
import MarketResearch from './pages/sandbox/MarketResearch';
import TufteVisualizations from './pages/TufteVisualizations';
import GlobalDots from './components/GlobalDots';
import { CellNumbersProvider } from './contexts/CellNumbersContext';
import './App.css';

// Debug component to see what's happening
const RouteDebug: React.FC = () => {
  const location = useLocation();

  return null;
};

// Scroll to top when route changes
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

function App() {
  return (
    <CellNumbersProvider>
      <Router>
        <RouteDebug />
        <ScrollToTop />
        <GlobalDots />
        <div className="App">
            <Routes>
              <Route path="/dsl" element={<DSL />} />
              <Route path="/*" element={
                <>
                  <Navigation />
                  <main className="relative z-10 bg-background mb-36 md:mb-48 pt-0 md:pt-24" style={{ boxShadow: '0px 10px 15px 10px rgba(216, 216, 216, 0.35)', backgroundColor: 'var(--color-background)' }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/work" element={<Work />} />
                      <Route path="/sandbox" element={<SandboxMatrix />} />
                      <Route path="/sandbox-matrix" element={<SandboxMatrix />} />
                      <Route path="/sandbox/blessu" element={<Blessu />} />
                      <Route path="/sandbox/nomad" element={<Nomad />} />
                      <Route path="/sandbox/watchbox" element={<WatchBox />} />
                      <Route path="/sandbox/chrona" element={<Chrona />} />
                      <Route path="/sandbox/cognitive-bias" element={<CognitiveBias />} />
                      <Route path="/sandbox/market-research" element={<MarketResearch />} />
                      <Route path="/tufte" element={<TufteVisualizations />} />
                      <Route path="/projects/:projectId" element={<ProjectDetail />} />
                      <Route path="/sandbox/:projectId" element={<ProjectDetail />} />
                    </Routes>
                  </main>
                  <Footer />
                  <LogoutButton />
                </>
              } />
            </Routes>
          </div>
        </Router>
    </CellNumbersProvider>
  );
}

export default App;
