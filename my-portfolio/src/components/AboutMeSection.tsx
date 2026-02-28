import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lanyard from './Lanyard';

export default function AboutMeSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const isLanyardInView = useInView(lanyardRef, { amount: 0.2, margin: '1000px 0px 0px 0px' });
  const isLanyardVisible = useInView(lanyardRef, { amount: 0.4 });
  const [dropKey, setDropKey] = useState(0);
  const [hasScrolledNearLanyard, setHasScrolledNearLanyard] = useState(false);

  const skills = useMemo(
    () => ['College of Computing Student', 'UX/UI designer', 'Web Developer', 'Front-end Developer'],
    []
  );

  useEffect(() => {
    if (isLanyardInView) setHasScrolledNearLanyard(true);
  }, [isLanyardInView]);

  useEffect(() => {
    if (isLanyardVisible) setDropKey((k) => k + 1);
  }, [isLanyardVisible]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentSkill = skills[currentSkillIndex];

    if (!isDeleting) {
      if (displayText.length < currentSkill.length) {
        timer = setTimeout(() => {
          setDisplayText(currentSkill.substring(0, displayText.length + 1));
        }, 120);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
          setIsDeleting(false);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentSkillIndex, skills]);

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

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      data-section="about"
      className="relative w-full min-h-screen bg-transparent flex items-center justify-center pt-200 pb-20 px-6"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-right mb-16"
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block"
          >
            <div className="relative">
              <h1 className="text-6xl md:text-9xl font-black text-white inline-flex items-center gap-4">
                About Me
                <svg
                  className="w-[1em] h-[1em] text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </h1>
              <motion.div
                initial={{ scaleX: 0, originX: 1 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: false, margin: '-100px' }}
                className="h-1 bg-cyan-400 mt-3 rounded-full w-1/2 min-w-[6rem] ml-auto"
              />

              <motion.div
                ref={lanyardRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: false, margin: '-100px' }}
                className="absolute right-0 top-full mt-1 z-50"
                style={{ width: '450px', overflow: 'visible' }}
              >
                {hasScrolledNearLanyard && (
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} resetSignal={dropKey} />
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            className="flex flex-col gap-3 pt-5"
          >
            <motion.div variants={leftVariants}>
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-semibold text-gray-300">Hello, I&apos;m</p>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-tight pl-6">
                  Krit<br />Intarajinda
                </h2>
              </div>
            </motion.div>

            <motion.div
              className="h-0.5 w-16 bg-gradient-to-r from-white/40 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false, margin: '-100px' }}
              style={{ originX: 0 }}
            />

            <motion.div variants={leftVariants}>
              <div
                className="text-white text-2xl md:text-3xl min-h-8 font-extralight"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 200 }}
              >
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

            <motion.div variants={leftVariants} className="pt-0">
              <p className="text-gray-400 text-base md:text-lg leading-relaxed text-justify">
                &nbsp;&nbsp;&nbsp;&nbsp;I’m interested in{' '}
                <span className="font-inter-bold text-white">Frontend Developer</span>.
                Passionate about
                learning and experimenting with new tools to create modern, interactive websites that effectively
                meet real-world user needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-0">
              <motion.div
                variants={leftVariants}
                className="relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all duration-300 overflow-hidden"
              >

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        filter: [
                          'drop-shadow(0 0 0px rgba(34, 197, 234, 0))',
                          'drop-shadow(0 0 8px rgba(34, 197, 234, 0.6))',
                          'drop-shadow(0 0 0px rgba(34, 197, 234, 0))',
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5m0 0l9-5m-9 5v-10m0 0l-9-5"
                      />
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

              <motion.div
                variants={leftVariants}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(34, 197, 234, 0.2)',
                }}
                transition={{ duration: 0.3 }}
                className="relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group cursor-pointer overflow-hidden"
              >
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
                        filter: [
                          'drop-shadow(0 0 0px rgba(34, 197, 234, 0))',
                          'drop-shadow(0 0 8px rgba(34, 197, 234, 0.6))',
                          'drop-shadow(0 0 0px rgba(34, 197, 234, 0))',
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
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

          <div className="hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
}
