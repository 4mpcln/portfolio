import HeroMenu from '@/components/HeroMenu';
import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollToTop from '@/components/ScrollToTop';
import CursorFollower from '@/components/CursorFollower';

export default function Home() {
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
        
        <section data-section="experience" className="w-full h-screen bg-transparent flex items-center justify-center">
          <div className="text-white text-4xl font-bold">Experience Section</div>
        </section>
      </div>
    </div>
  );
}
