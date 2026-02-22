import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Folder from './FolderComponent';
import { projects } from '@/data/projects';

const FILTER_KEY = 'portfolio_experience_filter';

export default function ExperienceSection() {
  // โหลดค่า filter ที่บันทึกไว้ หรือใช้ 'all' เป็นค่าเริ่มต้น
  const [activeFilter, setActiveFilter] = useState<'all' | 'design'>(() => {
    const saved = sessionStorage.getItem(FILTER_KEY);
    return (saved === 'design' ? 'design' : 'all') as 'all' | 'design';
  });

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // เริ่มต้น
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // บันทึกค่า filter ทุกครั้งที่มีการเปลี่ยน
  useEffect(() => {
    sessionStorage.setItem(FILTER_KEY, activeFilter);
  }, [activeFilter]);

  // ปรับขนาดโฟลเดอร์ให้พอดีกับหน้าจอ
  const getFolderSize = () => {
    if (windowWidth < 640) return 0.85; // มือถือจอเล็ก: ปรับขึ้นนิดนึงจาก 0.6 เป็น 0.85
    if (windowWidth < 1024) return 1.3; // หน้าจอแบ่งครึ่ง (Split screen) หรือ iPad: ปรับขึ้นจาก 1.0 เป็น 1.3
    return 1.8; // จอ Desktop ปกติ
  };

  const folders = projects.map((project) => ({
    ...project,
    color: '#6a6774',
    size: getFolderSize(),
    papers: project.paperImages || [] // ใช้รูปจาก project.paperImages
  }));
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
                className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${activeFilter === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                All Featured Project
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('design')}
                className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${activeFilter === 'design'
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-24 md:gap-x-12 md:gap-y-40 lg:gap-x-[12em] lg:gap-y-[20em] mx-auto py-[1em] overflow-visible mt-[5rem] lg:mt-[15rem] justify-items-center lg:justify-items-start w-full">
            {visibleFolders.map((folder) => (
              <Link
                key={folder.id}
                to={`/projects/${folder.id}`}
                aria-label={`View details for ${folder.title}`}
                className="block"
              >
                <Folder
                  className="custom-folder"
                  color={folder.color}
                  size={folder.size}
                  title={folder.title}
                  techStack={folder.techStack}
                  paperImages={folder.papers}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
