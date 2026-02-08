import { motion } from 'framer-motion';
import { useState } from 'react';
import Folder from './FolderComponent';

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'design'>('all');
  const folders = [
    // Featured Projects
    {
      id: 'featured-1',
      category: 'all',
      color: '#6a6774',
      size: 2,
      title: 'Doctora',
      techStack: ['Next.js', 'Spring Boot', 'TypeScript', 'PostgresSQL'],
      papers: []
    },
    {
      id: 'featured-2',
      category: 'all',
      color: '#6a6774',
      size: 2,
      title: 'Doctora Mobile',
      techStack: ['React Native', 'TypeScript', 'Expo', 'REST'],
      papers: []
    },
    {
      id: 'featured-3',
      category: 'all',
      color: '#6a6774',
      size: 2,
      title: 'Phamacy POS',
      techStack: ['React', 'Tailwind', 'Prisma'],
      papers: []
    },
        {
      id: 'featured-4',
      category: 'all',
      color: '#6a6774',
      size: 2,
      title: 'EatAtHome',
      techStack: ['Figma', 'Framer'],
      papers: []
    },
    {
      id: 'featured-5',
      category: 'all',
      color: '#6a6774',
      size: 2,
      title: 'FaceCheck',
      techStack: ['Figma', 'Illustrator'],
      papers: []
    },
    {
      id: 'featured-6',
      category: 'all',
      color: '#6a6774',
      size: 2,
      title: 'Real Time Chat',
      techStack: ['Photoshop', 'After Effects'],
      papers: []
    },
    // Design Projects
        {
      id: 'design-1',
      category: 'design',
      color: '#6a6774',
      size: 2,
      title: 'Doctora',
      techStack: ['Figma'],
      papers: []
    },
    {
      id: 'design-2',
      category: 'design',
      color: '#6a6774',
      size: 2,
      title: 'Doctora Mobile',
      techStack: ['Figma'],
      papers: []
    },
    {
      id: 'design-3',
      category: 'design',
      color: '#6a6774',
      size: 2,
      title: 'Eat At Home',
      techStack: ['Figma','Canva'],
      papers: []
    },
    {
      id: 'design-4',
      category: 'design',
      color: '#6a6774',
      size: 2,
      title: 'Elite Tutor',
      techStack: ['Figma'],
      papers: []
    },
    {
      id: 'design-5',
      category: 'design',
      color: '#6a6774',
      size: 2,
      title: 'Laundry Tracker',
      techStack: ['Figma'],
      papers: []
    },
        {
      id: 'design-6',
      category: 'design',
      color: '#6a6774',
      size: 2,
      title: 'Real Time Chat',
      techStack: ['Figma'],
      papers: []
    },
    

  ];

  const visibleFolders = folders.filter((folder) =>
    activeFilter === 'all' ? folder.category === 'all' : folder.category === 'design'
  );

  return (
    <section
      data-section="experience"
  className="relative w-full bg-transparent flex items-center justify-center pt-28 pb-40 px-6 scroll-mt-40 md:scroll-mt-48"
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
                  className="h-1 bg-cyan-400 mt-3 rounded-full w-1/2 min-w-[6rem] self-end"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Featured Project
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('design')}
                className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                  activeFilter === 'design'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                My Design
              </button>
            </div>
          </div>
        </motion.div>
        <div className="mt-8 pb-24">
          <div className="grid gap-x-[25em] gap-y-[23em] grid-cols-2 md:grid-cols-3 mx-auto py-[1em] overflow-visible mt-[15rem] justify-items-start">
            {visibleFolders.map((folder) => (
              <Folder
                key={folder.id}
                className="custom-folder"
                color={folder.color}
                size={folder.size}
                title={folder.title}
                techStack={folder.techStack}
                paperImages={folder.papers}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
