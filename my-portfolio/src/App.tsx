import HeroMenu from '@/components/HeroMenu';
import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollToTop from '@/components/ScrollToTop';
import CursorFollower from '@/components/CursorFollower';

export default function App() {
  
  return (
    <div className="relative w-full min-h-screen bg-black">
      <CursorFollower />
      <ScrollToTop />
      <AnimatedBackground />
      <div className="relative z-10 w-full">
        <HeroMenu />
        <HeroSection />
        <QuoteSection />
        <AboutMeSection />
        <SkillsSection />
  <ExperienceSection />
        

      </div>
    </div>
  );
}
