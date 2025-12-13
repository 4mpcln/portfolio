import HeroMenu from '@/components/HeroMenu';
import HeroSection from '@/components/HeroSection';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatedBackground />
      <div className="relative z-10 w-full">
        <HeroMenu />
        <HeroSection />
      
        {/* Placeholder sections for menu navigation */}
        <section data-section="home" className="w-full h-screen bg-transparent flex items-center justify-center border-b border-gray-700">
          <div className="text-white text-4xl font-bold">Home Section</div>
        </section>
        
        <section data-section="aboutme" className="w-full h-screen bg-transparent flex items-center justify-center border-b border-gray-700">
          <div className="text-white text-4xl font-bold">About Me Section</div>
        </section>
        
        <section data-section="stack&tools" className="w-full h-screen bg-transparent flex items-center justify-center border-b border-gray-700">
          <div className="text-white text-4xl font-bold">Stack & Tools Section</div>
        </section>
        
        <section data-section="experience" className="w-full h-screen bg-transparent flex items-center justify-center">
          <div className="text-white text-4xl font-bold">Experience Section</div>
        </section>
      </div>
    </div>
  );
}
