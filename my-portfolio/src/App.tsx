import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroMenu from '@/components/HeroMenu';
import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorFollower from '@/components/CursorFollower';
import Footer from '@/components/footer';
import ProjectDetail from '@/pages/ProjectDetail';
import RouteScrollManager from '@/components/RouteScrollManager';

function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col">
      <CursorFollower />
      <AnimatedBackground />
      <div className="relative z-10 w-full flex flex-col flex-1">
        <HeroMenu />
        <HeroSection />
        <QuoteSection />
        <AboutMeSection />
        <SkillsSection />
        <ExperienceSection />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
