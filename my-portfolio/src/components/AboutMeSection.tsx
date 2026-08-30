import { motion, useInView } from 'framer-motion';
import { Component, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Lanyard from './Lanyard';
import SectionUnderline from './SectionUnderline';

class LanyardMountBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Lanyard failed to render:', error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function AboutMeSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const isLanyardVisible = useInView(lanyardRef, { amount: 0.4 });
  const [dropKey, setDropKey] = useState(0);

  const skills = useMemo(
    () => ['College of Computing Student', 'Front-end Developer' , 'UX/UI designer', 'Backend Developer'],
    []
  );

  useEffect(() => {
    if (isLanyardVisible) setDropKey((k) => k + 1);
  }, [isLanyardVisible]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentSkill = skills[currentSkillIndex];

    if (!isDeleting) {
      if (displayText.length < currentSkill.length) {
        timer = setTimeout(() => {
          setDisplayText(currentSkill.substring(0, displayText.length + 1));
        }, 150); // Slowed down typing (120 -> 150)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2500); // Increased pause at end (2000 -> 2500)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 100); // Slowed down deleting (80 -> 100)
      } else {
        timer = setTimeout(() => {
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
          setIsDeleting(false);
        }, 350); // Increased pause before typing next word (300 -> 350)
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
      className="relative w-full min-h-screen bg-transparent flex items-center justify-center pt-40 md:pt-200 pb-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          data-section-header="about"
          className="text-right mb-10 md:mb-16"
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block"
          >
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-white inline-flex items-center gap-3 md:gap-4">
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
              <SectionUnderline className="ml-auto" />

              <motion.div
                ref={lanyardRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: false, margin: '-100px' }}
                className="relative z-50 ml-auto mt-1 w-full max-w-[430px] sm:max-w-[460px] md:absolute md:right-0 md:top-full md:mt-1 md:w-[390px] md:max-w-none min-[900px]:w-[430px] lg:w-[450px]"
                style={{ overflow: 'visible' }}
              >
                <LanyardMountBoundary>
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} resetSignal={dropKey} />
                </LanyardMountBoundary>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: '-100px' }}
          className="grid grid-cols-1 -mt-12 sm:-mt-10 md:mt-0 md:grid-cols-[minmax(0,1fr)_360px] min-[900px]:grid-cols-[minmax(0,1fr)_420px] lg:grid-cols-2 gap-y-8 md:gap-x-8 items-start"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            className="flex flex-col gap-3 pt-0 md:pt-5"
          >
            <motion.div variants={leftVariants}>
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300">Hello, I&apos;m</p>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight pl-4 md:pl-6">
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
                className="text-white text-xl sm:text-2xl md:text-3xl min-h-8 font-extralight"
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
  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed text-left sm:text-justify">
    &nbsp;&nbsp;&nbsp;&nbsp;I’m a{' '}
    <span className="font-inter-bold text-white">Frontend Developer</span>{' '}
    passionate about creating modern, interactive, and user-centered web
    experiences. With strong frontend experience and a focus on UX/UI, I’m
    currently expanding my backend skills to build complete full-stack
    applications.
  </p>
</motion.div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-1">
              <motion.div
                variants={leftVariants}
                className="relative p-5 sm:p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm transition-all duration-300 overflow-hidden"
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
                    <p className="text-gray-500 text-xs mt-2">4th Year</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          <div className="hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
}
