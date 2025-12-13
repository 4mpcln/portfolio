'use client';

import Image from 'next/image';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const { scrollY } = useViewportScroll();

  // Initial entry animations
  const webInitialX = 1000; // Start from right
  const designerInitialX = -1000; // Start from left

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-start pt-20">
      {/* Text and Image Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Text Overlay - "Web" and "Designer" */}
        <div className="absolute inset-0 flex flex-col items-center pointer-events-none z-10">
          {/* Left Text - "Web" */}
          <motion.div
            initial={{ x: webInitialX }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ x: useTransform(scrollY, [0, 500], [0, -1000]) }}
            className="absolute top-16"
          >
            <h1 className="text-[160px] font-black text-white leading-none whitespace-nowrap drop-shadow-2xl">
              Web
            </h1>
          </motion.div>

          {/* Right Text - "Designer" */}
          <motion.div
            initial={{ x: designerInitialX }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ x: useTransform(scrollY, [0, 500], [0, 1000]) }}
            className="absolute top-52"
          >
            <h1 className="text-[160px] font-black text-white leading-none whitespace-nowrap drop-shadow-2xl">
              Designer
            </h1>
          </motion.div>
        </div>

        {/* Center Profile Image - No animation, just static */}
        <div
          className="relative z-20 mt-1"
        >
          <Image
            src="/profile1.png"
            alt="Profile"
            width={400}
            height={500}
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white text-sm font-light">Scroll to explore</div>
        <div className="text-white text-2xl text-center mt-2">↓</div>
      </motion.div>
    </div>
  );
}
