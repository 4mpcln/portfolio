import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import Lanyard from './Lanyard';

export default function AboutMeSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const isLanyardInView = useInView(lanyardRef, { amount: 0.4 });
  const [dropKey, setDropKey] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start center', 'end center'],
  });

  // Image scroll animation - enters from bottom-right, exits to top-left
  // Tilted at 15 degrees when at About Me section (scroll progress 0.5)
  // Smooth exit with easing curve
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], [300, 0, -150], { clamp: true });
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [300, 0, -150], { clamp: true });
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 45], { clamp: true });
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 0], { clamp: true });
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0.3], { clamp: true });

  const skills = useMemo(() => ['College of Computing Student','UX/UI designer', 'Web Developer', 'Front-end Developer'], []);

  // Trigger lanyard drop each time it enters the viewport
  useEffect(() => {
    if (isLanyardInView) setDropKey((k) => k + 1);
  }, [isLanyardInView]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentSkill = skills[currentSkillIndex];

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentSkill.length) {
        timer = setTimeout(() => {
          setDisplayText(currentSkill.substring(0, displayText.length + 1));
        }, 120); // Increased from 80
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
        }, 80); // Increased from 50
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
        ref={scrollRef}
        data-section="about"
        className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 px-6"
      >
      <div className="max-w-7xl w-full">
        {/* Header Section - Right Aligned */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-right mb-16"
        >
          {/* Title with Underline */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block"
          >
            <div className="relative">
              <h1 className="text-6xl md:text-9xl font-black text-white">
                About Me
              </h1>
              {/* Blue underline with extend animation */}
              <motion.div
                initial={{ scaleX: 0, originX: 1 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: false, margin: '-100px' }}
                className="h-1 bg-cyan-400 mt-3 rounded-full"
                style={{ width: '50%', marginLeft: 'auto' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section - Two Columns */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            className="flex flex-col gap-3 pt-5"
          >
            {/* Greeting */}
            <motion.div variants={leftVariants}>
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-semibold text-gray-300">
                  Hello, I&apos;m
                </p>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-tight">
                  Krit<br />Intarajinda
                </h2>
              </div>
            </motion.div>

            {/* Divider Line */}
            <motion.div 
              className="h-0.5 w-16 bg-gradient-to-r from-white/40 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false, margin: '-100px' }}
              style={{ originX: 0 }}
            />

            {/* Skills Tag - Typing Animation */}
            <motion.div variants={leftVariants}>
              <div className="text-white text-2xl md:text-3xl min-h-8" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
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
            <motion.div variants={leftVariants} className="pt-0">
              <p className="text-gray-400 text-base md:text-lg leading-relaxed text-justify">
                &nbsp;&nbsp;&nbsp;&nbsp;นักศึกษาสาขาวิทยาการคอมพิวเตอร์ คณะวิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น ผู้มีความสนใจด้าน Frontend Developer ชื่นชอบการเรียนรู้และทดลองใช้เครื่องมือใหม่ ๆ เพื่อพัฒนาเว็บไซต์ให้มีลูกเล่น ทันสมัย และตอบโจทย์การใช้งานจริง
              </p>
            </motion.div>

            {/* Education & Interests Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-0">
              {/* Education Card */}
              <motion.div
                variants={leftVariants}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(34, 197, 234, 0.2)',
                }}
                transition={{ duration: 0.3 }}
                className="relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(34, 197, 234, 0.1) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-cyan-400 transition-colors duration-300">
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ 
                        filter: ['drop-shadow(0 0 0px rgba(34, 197, 234, 0))', 'drop-shadow(0 0 8px rgba(34, 197, 234, 0.6))', 'drop-shadow(0 0 0px rgba(34, 197, 234, 0))']
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5m0 0l9-5m-9 5v-10m0 0l-9-5" />
                    </motion.svg>
                    Education
                  </h3>
                  <div className="space-y-2">
                    <p className="font-semibold text-white text-sm">Computer Science</p>
                    <p className="text-gray-400 text-xs">Khon Kaen University</p>
                    <p className="text-gray-500 text-xs mt-2">Year 3</p>
                  </div>
                </div>
              </motion.div>

              {/* Interests Card */}
              <motion.div
                variants={leftVariants}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(34, 197, 234, 0.2)',
                }}
                transition={{ duration: 0.3 }}
                className="relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(34, 197, 234, 0.1) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-cyan-400 transition-colors duration-300">
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ 
                        filter: ['drop-shadow(0 0 0px rgba(34, 197, 234, 0))', 'drop-shadow(0 0 8px rgba(34, 197, 234, 0.6))', 'drop-shadow(0 0 0px rgba(34, 197, 234, 0))']
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </motion.svg>
                    Interests
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs flex items-center gap-2 group-hover:text-gray-300 transition-colors duration-300">
                      <span className="text-cyan-400">•</span>
                      Frontend Development
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-2 group-hover:text-gray-300 transition-colors duration-300">
                      <span className="text-cyan-400">•</span>
                      UI/UX Design
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-2 group-hover:text-gray-300 transition-colors duration-300">
                      <span className="text-cyan-400">•</span>
                      Web Innovation
                    </p>
                  </div>
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
            className="relative h-full flex items-start justify-center -mt-16"
            style={{
              perspective: '1200px',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Interactive Image Container */}
            <motion.div
              className="relative w-full z-0"
              style={{
                maxWidth: '420px',
                rotateX: isHovering ? rotateX : 0,
                rotateY: isHovering ? rotateY : imageRotateY,
                transformStyle: 'preserve-3d',
                x: imageX,
                y: imageY,
                rotate: imageRotate,
                opacity: imageOpacity,
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
              <motion.div>
                {/* Image */}
                <motion.div
                  className="relative w-full overflow-hidden rounded-3xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  style={{ aspectRatio: '2480 / 3508' }}
                >
                  {/* Using native img for maximum quality - preserves original image clarity */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/meincamera.png"
                    alt="Krit Intarajinda"
                    loading="eager"
                    className="w-full h-full object-cover object-top"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      display: 'block'
                    }}
                  />
                </motion.div>
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
            className="text-right mb-8 relative"
          >
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-9xl font-black text-white">
                Skills
              </h1>
              {/* Blue underline with extend animation */}
              <motion.div
                initial={{ scaleX: 0, originX: 1 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: false, margin: '-100px' }}
                className="h-1 bg-cyan-400 mt-3 rounded-full"
                style={{ width: '50%', marginLeft: 'auto' }}
              />
            </div>

            {/* Lanyard Component - Hanging from blue line */}
            <motion.div
              ref={lanyardRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false, margin: '-100px' }}
              className="absolute right-0 top-full mt-1 z-50"
              style={{ width: '450px', overflow: 'visible' }}
            >
              <Lanyard key={dropKey} position={[0, 0, 20]} gravity={[0, -40, 0]} resetSignal={dropKey} />
            </motion.div>
          </motion.div>

          {/* DEVELOP Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-6"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2">DEVELOP</h2>
            
            <p className="text-gray-400 text-base leading-relaxed mb-2 max-w-3xl indent-8">
              Started creating Web Development using Next.js, React, and Tailwind <br />
              and eventually switched to Mobile Development using React Native
            </p>
            
            <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-2 indent-8">Stack & Technologies</p>
            
            {/* First Row - 6 items */}
            <div className="flex flex-wrap gap-4 mb-2" style={{ maxWidth: 'calc(6 * (128px + 32px))' }}>
              {[
                { name: 'HTML', icon: 'html.png' },
                { name: 'CSS', icon: 'css.png' },
                { name: 'JavaScript', icon: 'jss.png', scale: '0.6' },
                { name: 'TypeScript', icon: 'ts.png' },
                { name: 'React', icon: 'rc.png' },
                { name: 'Next.JS', icon: 'next.png' },
              ].map((tool, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="relative p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-32 h-32 flex items-center justify-center"
                  >
                    <img
                      src={`/${tool.icon}`}
                      alt={tool.name}
                      className="w-24 h-24 object-contain"
                      style={{ transform: tool.scale ? `scale(${tool.scale})` : 'scale(1)' }}
                    />
                  </motion.div>
                  <p className="text-sm font-light text-gray-400 text-center whitespace-nowrap">{tool.name}</p>
                </div>
              ))}
            </div>

            {/* Second Row - 5 items */}
            <div className="flex flex-wrap gap-4 justify-left">
              {[
                { name: 'Tailwind CSS', icon: 'tw.png' },
                { name: 'Vite', icon: 'vt.png', scale: '1.7' },
                { name: 'VS Code', icon: 'vscode.png' },
                { name: 'Vercel', icon: 'vercel.png' },
                { name: 'GitHub', icon: 'gh.png' }
              ].map((tool, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx + 6) * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="relative p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-32 h-32 flex items-center justify-center"
                  >
                    <img
                      src={`/${tool.icon}`}
                      alt={tool.name}
                      className="w-24 h-24 object-contain"
                      style={{ transform: tool.scale ? `scale(${tool.scale})` : 'scale(1)' }}
                    />
                  </motion.div>
                  <p className="text-sm font-light text-gray-400 text-center whitespace-nowrap">{tool.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CREATE Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-2"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2">CREATE</h2>
            
            <p className="text-gray-400 text-base leading-relaxed mb-2 max-w-3xl indent-8">
              Aspiring content creator and junior developer, passionate about telling <br />
              stories through both words and code. Currently learning and building as I go
            </p>
            
            <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-2 indent-8">Tools & Platforms</p>
            
            <div className="flex flex-wrap gap-4 justify-left">
              {[
                { name: 'Wix', icon: 'wixx.png' },
                { name: 'Figma', icon: 'fm.png' },
                { name: 'Canva', icon: 'canva.png' }
              ].map((tool, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="relative p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-32 h-32 flex items-center justify-center"
                  >
                    <img
                      src={`/${tool.icon}`}
                      alt={tool.name}
                      className="w-24 h-24 object-contain"
                    />
                  </motion.div>
                  <p className="text-sm font-light text-gray-400 text-center whitespace-nowrap">{tool.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
