import React from 'react';
import NewNavbar from '../components/NewNavbar';
import NewHero from '../components/NewHero';
import IntroSection from '../components/IntroSection';
import FeaturesSection from '../components/FeaturesSection';
import CollageSection from '../components/CollageSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BottomCTA from '../components/BottomCTA';
import NewFooter from '../components/NewFooter';

const LandingPage = () => {
  return (
    <div className="landing-page font-sans">
      <NewNavbar />
      <NewHero />
      <IntroSection />
      <FeaturesSection />
      <CollageSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BottomCTA />
      <NewFooter />
    </div>
  );
};

export default LandingPage;
