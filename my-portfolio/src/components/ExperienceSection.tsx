import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'design'>('all');

  return (
    <section
      data-section="experience"
      className="relative w-full bg-transparent flex items-center justify-center pt-28 pb-20 px-6"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-10 relative"
        >
          <div className="flex flex-col gap-5">
            <div className="relative inline-block text-right">
              <div className="inline-flex flex-col items-end">
                <h1 className="text-6xl md:text-9xl font-black text-white inline-flex items-center gap-4 leading-none">
                  Experience
                  <svg
                    className="w-[1em] h-[1em] text-white shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </h1>
                <motion.div
                  initial={{ scaleX: 0, originX: 1 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: false, margin: '-100px' }}
                  className="h-1 bg-cyan-400 mt-3 rounded-full w-[60%] self-end"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-white/15 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Featured Project
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('design')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === 'design'
                    ? 'bg-white/15 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Design
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
