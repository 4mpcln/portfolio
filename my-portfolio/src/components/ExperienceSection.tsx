import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Folder from './FolderComponent';
import { Terminal, type TerminalCommand } from '@/components/ui/terminal';
import { projects } from '@/data/projects';

const projectSectionCopy = {
  project: {
    title: 'Projects',
    description:
      'Selected development projects that highlight frontend implementation, full-stack workflows, and practical problem solving.',
  },
  design: {
    title: 'Design',
    description:
      'UI/UX and wireframe work focused on structure, usability, visual direction, and early product planning.',
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

type ExperienceView = 'internship' | 'project' | 'design';

export default function ExperienceSection() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeView, setActiveView] = useState<ExperienceView>('internship');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFolderSize = () => {
    if (windowWidth < 640) return 1.05;
    if (windowWidth < 1280) return 1.28;
    return 1.55;
  };

  const folders = projects.map((project) => ({
    ...project,
    color: '#6a6774',
    size: getFolderSize(),
    papers: project.paperImages || [],
  }));

  const projectFolders = folders.filter((folder) => folder.category === 'all');
  const designFolders = folders.filter((folder) => folder.category === 'design');

  const renderFolderGrid = (items: typeof folders) => (
    <div className="mt-10 grid w-full grid-cols-2 justify-items-center gap-x-8 gap-y-28 overflow-visible pb-20 pt-8 md:gap-x-8 md:gap-y-36 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-44 xl:grid-cols-4">
      {items.map((folder) => (
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
  );

  const internshipContent = (
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
  );

  const renderProjectContent = (type: 'project' | 'design') => {
    const copy = projectSectionCopy[type];
    const items = type === 'project' ? projectFolders : designFolders;

    return (
      <div className="overflow-visible">
        <h2 className="text-2xl font-black text-white md:text-4xl">{copy.title}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-gray-400 md:text-base">{copy.description}</p>
        {renderFolderGrid(items)}
      </div>
    );
  };

  const experienceCommands: TerminalCommand[] = [
    {
      command: 'internship',
      label: 'internship',
      description: 'Show internship experience at INFRA Corporation.',
      aliases: ['intern', 'work'],
    },
    {
      command: 'project',
      label: 'project',
      description: 'Show featured development projects.',
      aliases: ['projects', 'featured'],
    },
    {
      command: 'design',
      label: 'design',
      description: 'Show all your UI/UX design projects.',
      aliases: ['ui', 'ux', 'figma'],
    },
  ];

  const activeContent = {
    internship: internshipContent,
    project: renderProjectContent('project'),
    design: renderProjectContent('design'),
  }[activeView];

  return (
    <section
      data-section="experience"
      className="relative flex w-full items-center justify-center bg-transparent px-6 pb-40 pt-28 scroll-mt-40 md:scroll-mt-48"
    >
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative mb-10"
        >
          <div className="flex flex-col gap-5">
            <div className="relative inline-block text-right">
              <div className="inline-flex flex-col items-end">
                <h1 className="inline-flex items-center gap-4 text-6xl font-black leading-none text-white md:text-9xl">
                  Experience
                  <svg
                    className="h-[1em] w-[1em] shrink-0 text-white"
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
                  className="mt-3 h-1 w-1/2 min-w-[6rem] self-end rounded-full bg-cyan-400"
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
        >
          <Terminal
            commands={experienceCommands}
            activeCommand={activeView}
            defaultCommand="internship"
            username="krit@experience"
            enableSound={false}
            onCommandChange={(command) => setActiveView(command as ExperienceView)}
          />

          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 overflow-visible"
          >
            {activeContent}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
