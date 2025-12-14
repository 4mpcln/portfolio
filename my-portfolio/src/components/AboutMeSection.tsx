'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

export default function AboutMeSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const skills = useMemo(() => ['DEVELOP', 'CREATE', 'College of Computing Student'], []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentSkill = skills[currentSkillIndex];

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentSkill.length) {
        timer = setTimeout(() => {
          setDisplayText(currentSkill.substring(0, displayText.length + 1));
        }, 80);
      } else {
        // Wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
      } else {
        // Move to next skill with timeout to avoid state batching issues
        timer = setTimeout(() => {
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
          setIsDeleting(false);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentSkillIndex, skills]);

  // Handle mouse position for 3D corner press effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Calculate 3D rotation based on mouse position
  const rotateX = (mousePos.y - 0.5) * -20;
  const rotateY = (mousePos.x - 0.5) * 20;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Animation variants for left content (slide in from left)
  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  // Animation variants for right content (slide in from right)
  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <section 
        data-section="about"
        className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 px-6"
      >
      <div className="max-w-7xl w-full">
        {/* Header Section - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          {/* Title, Line, and Description - All in One Container */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            {/* Title with Icon and Underline */}
            <div className="inline-block w-full">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-6xl md:text-7xl font-black text-white">
                  About Me
                </h1>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section - Two Columns */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-6"
          >
            {/* Greeting */}
            <motion.div variants={leftVariants}>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-semibold text-gray-300">
                  Hello, I&apos;m
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  Krit<br />Intarajinda
                </h2>
              </div>
            </motion.div>

            {/* Divider Line */}
            <div className="h-0.5 w-16 bg-gradient-to-r from-white/40 to-transparent"></div>

            {/* Skills Tag - Typing Animation */}
            <motion.div variants={leftVariants}>
              <div className="text-white text-lg md:text-2xl min-h-8" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block ml-1 text-white"
                >
                  |
                </motion.span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={leftVariants} className="pt-4">
              <p className="text-gray-400 text-sm leading-relaxed text-justify">
                &nbsp;&nbsp;&nbsp;&nbsp;นักศึกษาสาขาวิทยาการคอมพิวเตอร์ คณะวิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น ผู้มีความสนใจด้าน Frontend Developer ชื่นชอบการเรียนรู้และทดลองใช้เครื่องมือใหม่ ๆ เพื่อพัฒนาเว็บไซต์ให้มีลูกเล่น ทันสมัย และตอบโจทย์การใช้งานจริง
              </p>
            </motion.div>

            {/* Education & Interests Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Education Card */}
              <motion.div
                variants={leftVariants}
                className="p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-white/40 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5m0 0l9-5m-9 5v-10m0 0l-9-5" />
                  </svg>
                  Education
                </h3>
                <div className="space-y-2">
                  <p className="font-semibold text-white text-sm">Computer Science</p>
                  <p className="text-gray-400 text-xs">Khon Kaen University</p>
                  <p className="text-gray-500 text-xs mt-2">Year 3</p>
                </div>
              </motion.div>

              {/* Interests Card */}
              <motion.div
                variants={leftVariants}
                className="p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-white/40 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Interests
                </h3>
                <div className="space-y-1">
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    Frontend Development
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    UI/UX Design
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    Web Innovation
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Interactive Image with 3D Flip & Parallax */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative h-full flex items-center justify-center"
            style={{
              perspective: '1200px',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Interactive Image Container */}
            <motion.div
              className="relative w-full max-w-sm"
              style={{
                rotateX: isHovering ? rotateX : 0,
                rotateY: isHovering ? rotateY : 0,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Background Glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.2)',
                    '0 0 40px rgba(255, 255, 255, 0.3)',
                    '0 0 20px rgba(255, 255, 255, 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none"
              ></motion.div>

              {/* Main Image Card */}
              <motion.div
                className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-gradient-to-br from-gray-900 to-black shadow-2xl"
                whileHover={{
                  borderColor: 'rgba(255, 255, 255, 0.6)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <motion.div
                  className="relative w-full overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ aspectRatio: '3 / 5' }}
                >
                  <Image
                    src="/aboutme.jpg"
                    alt="Krit Intarajinda"
                    width={300}
                    height={500}
                    priority
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Overlay Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    whileHover={{ opacity: 0 }}
                  ></motion.div>
                </motion.div>

                {/* Info Badge - Floating */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-black text-white mb-1">Krit Intarajinda</h3>
                  <p className="text-white font-semibold text-sm">Frontend Developer</p>
                </motion.div>

                {/* Shine Effect */}
                <motion.div
                  animate={{
                    opacity: [0, 0.5, 0],
                    x: [-200, 400, -200],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                ></motion.div>
              </motion.div>

              {/* Floating Particles/Dots */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-2xl pointer-events-none"
              ></motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-white/5 to-white/10 rounded-full blur-3xl pointer-events-none"
              ></motion.div>

              {/* Interactive Hover Info */}

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      </section>

      {/* Skills Section */}
      <section 
        data-section="skills"
        className="relative w-full bg-transparent flex items-center justify-center py-20 px-6"
      >
        <div className="max-w-7xl w-full">
          {/* Skills Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-7xl font-black text-white">
              Skills
            </h1>
          </motion.div>

          {/* DEVELOP Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">DEVELOP</h2>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-3xl indent-8">
              Started creating Web Development using Next.js, React, and Tailwind <br />
              and eventually switched to Mobile Development using React Native
            </p>
            
            <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-6 indent-8">Stack & Technologies</p>
            
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'HTML', color: 'from-orange-600 to-orange-800' },
                { name: 'CSS', color: 'from-blue-600 to-blue-800' },
                { name: 'JavaScript', color: 'from-yellow-500 to-yellow-700' },
                { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
                { name: 'React', color: 'from-cyan-500 to-cyan-700' },
                { name: 'Next.JS', color: 'from-gray-700 to-gray-900' },
                { name: 'Tailwind CSS', color: 'from-cyan-600 to-cyan-800' },
                { name: 'VS Code', color: 'from-blue-500 to-blue-700' },
                { name: 'GitHub', color: 'from-gray-600 to-gray-800' }
              ].map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`px-6 py-4 rounded-lg bg-gradient-to-br ${tool.color} text-white text-center cursor-pointer transition-all hover:shadow-lg hover:shadow-white/20`}
                >
                  <p className="text-sm font-semibold">{tool.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CREATE Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">CREATE</h2>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-3xl indent-8">
              Aspiring content creator and junior developer, passionate about telling <br />
              stories through both words and code. Currently learning and building as I go
            </p>
            
            <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-6 indent-8">Tools & Platforms</p>
            
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'VS Code', color: 'from-blue-600 to-blue-800' },
                { name: 'GitHub', color: 'from-gray-700 to-gray-900' },
                { name: 'Figma', color: 'from-purple-600 to-purple-800' },
                { name: 'Canva', color: 'from-blue-500 to-purple-600' }
              ].map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`px-6 py-4 rounded-lg bg-gradient-to-br ${tool.color} text-white text-center cursor-pointer transition-all hover:shadow-lg hover:shadow-white/20`}
                >
                  <p className="text-sm font-semibold">{tool.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
