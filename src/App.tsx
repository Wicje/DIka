import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './App.css';

// Import Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import GrowBusiness from './sections/GrowBusiness';
import EverythingYouNeed from './sections/EverythingYouNeed';
import GettingStarted from './sections/GettingStarted';
import DomainSearch from './sections/DomainSearch';
import TrustedBy from './sections/TrustedBy';
import MadeWithSpaces from './sections/MadeWithSpaces';
import FAQ from './sections/FAQ';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-black origin-left z-[1000]"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <Stats />
        <GrowBusiness />
        <EverythingYouNeed />
        <GettingStarted />
        <DomainSearch />
        <TrustedBy />
        <MadeWithSpaces />
        <FAQ />
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
