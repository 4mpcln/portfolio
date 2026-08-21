import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Folder from './FolderComponent';
import { projects } from '@/data/projects';

const FILTER_KEY = 'portfolio_experience_filter';

const projectSectionCopy = {
  all: {
    title: 'Projects',
    description: 'Selected development projects that highlight frontend implementation, full-stack workflows, and practical problem solving.',
  },
  design: {
    title: 'Design',
    description: 'UI/UX and wireframe work focused on structure, usability, visual direction, and early product planning.',
  },
};

const internshipHighlights = [
  {
    title: 'Frontend Development',
    description:
      "Developed the frontend based on the team's UI/UX designs, improved interface usability, and suggested design adjustments when the original flow could be inconvenient or less user-friendly. Used React, React Hook Form, and related frontend technologies.",
  },
  {
    title: 'Backend Development',
    description:
      'Participated in backend development for the first time, gaining hands-on experience with system logic, API development, and frontend-backend integration using NestJS, Axios, Zod, Swagger, and TypeORM.',
  },
  {
    title: 'Additional Technical Experience',
    description:
      'Worked with PostgreSQL, PostGIS, Redis, MinIO, Docker, MapLibre, and TanStack Query, expanding my understanding of databases, geospatial data, infrastructure, and system integration.',
  },
];

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
    if (windowWidth < 1280) return 1.3; // หน้าจอแบ่งครึ่ง (Split screen) หรือ iPad ทั้งแนวตั้งและแนวนอน
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
  const activeProjectCopy = projectSectionCopy[activeFilter];

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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="mb-5">
            <h2 className="text-2xl font-black text-white md:text-4xl">Internship</h2>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-gray-400 md:text-base">
              Practical software development experience with frontend implementation, backend integration, and real project workflows.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 via-white/[0.04] to-cyan-400/10 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">INFRA Corporation</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-white md:text-3xl">
                    Environmental Protected Area Impact Assessment System
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-gray-300 md:text-base">
                    Frontend (Applied) | Backend (Additional)
                  </p>
                </div>
                <p className="shrink-0 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-gray-200 md:text-sm">
                  May 2026 - June 2026
                </p>
              </div>

              <p className="mt-5 max-w-4xl text-sm leading-relaxed text-gray-400 md:text-base">
                Developed a web application for preliminary impact assessment of construction projects or structures
                that may affect environmentally protected areas under the Office of Natural Resources and
                Environmental Policy and Planning (ONEP).
              </p>

              <div className="mt-6 space-y-4">
                {internshipHighlights.map((item) => (
                  <div key={item.title} className="border-l-2 border-cyan-400/70 pl-4">
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400 md:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8"
        >
          <div className="mb-5">
            <h2 className="text-2xl font-black text-white md:text-4xl">{activeProjectCopy.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-gray-400 md:text-base">
              {activeProjectCopy.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${activeFilter === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('design')}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${activeFilter === 'design'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              Design
            </button>
          </div>
        </motion.div>

        <div className="mt-8 pb-24">
          <div className="
  grid grid-cols-2 lg:grid-cols-3
  gap-x-3.5 gap-y-[90px]
  md:gap-x-11 md:gap-y-[150px]
  lg:gap-x-[12em] lg:gap-y-[20em]
  py-[1em] overflow-visible
  mt-[5rem] lg:mt-[15rem]
  justify-items-start
  w-full
  ml-2 md:ml-6 lg:ml-12
">
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
