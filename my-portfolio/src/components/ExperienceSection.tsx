import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Folder from './FolderComponent';
import SectionUnderline from './SectionUnderline';
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

const internshipImages = [
  { src: '/intern1.jpg', label: 'Intern 1' },
  { src: '/intern2.jpg', label: 'Intern 2' },
  { src: '/intern3.jpg', label: 'Intern 3' },
];

type ExperienceView = 'internship' | 'project' | 'design';

const experiencePathMap: Record<ExperienceView, string> = {
  internship: '/experience/internship',
  project: '/experience/project',
  design: '/experience/design',
};

const getExperienceViewFromPath = (pathname: string): ExperienceView => {
  if (pathname === '/experience/project' || pathname === '/project') return 'project';
  if (pathname === '/experience/design' || pathname === '/design') return 'design';
  return 'internship';
};

const isExperienceSectionPath = (pathname: string) =>
  pathname === '/experience' ||
  pathname === '/experience/internship' ||
  pathname === '/experience/project' ||
  pathname === '/experience/design' ||
  pathname === '/internship' ||
  pathname === '/project' ||
  pathname === '/design';

interface InternFullscreenModalProps {
  currentImageIndex: number;
  images: typeof internshipImages;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function InternFullscreenModal({
  currentImageIndex,
  images,
  onClose,
  onNext,
  onPrev,
}: InternFullscreenModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/95 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Close fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="relative flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].label}
          className="mx-auto max-h-full max-w-full object-contain object-center"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 42 42">
                <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 42 42" className="rotate-180">
                <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-lg text-white backdrop-blur-sm">
          {currentImageIndex + 1}/{images.length}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function ExperienceSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeView, setActiveView] = useState<ExperienceView>(() => getExperienceViewFromPath(location.pathname));
  const [currentInternImage, setCurrentInternImage] = useState(0);
  const [isInternFullscreen, setIsInternFullscreen] = useState(false);
  const [isInternDetailExpanded, setIsInternDetailExpanded] = useState(false);

  useEffect(() => {
    if (isExperienceSectionPath(location.pathname)) {
      setActiveView(getExperienceViewFromPath(location.pathname));
    }
  }, [location.pathname]);

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

  const handlePrevInternImage = () => {
    setCurrentInternImage((prev) => (prev === 0 ? internshipImages.length - 1 : prev - 1));
  };

  const handleNextInternImage = () => {
    setCurrentInternImage((prev) => (prev === internshipImages.length - 1 ? 0 : prev + 1));
  };

  const handleExperienceViewChange = (command: string) => {
    const nextView = command as ExperienceView;
    setActiveView(nextView);
    navigate(experiencePathMap[nextView], { state: { skipRouteScroll: true } });
  };

  const renderFolderGrid = (items: typeof folders) => (
    <div className="mt-10 grid w-full grid-cols-2 justify-items-center gap-x-8 gap-y-28 overflow-visible pb-20 pt-8 md:gap-x-8 md:gap-y-36 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-44 xl:grid-cols-4">
      {items.map((folder) => (
        <Link
          key={folder.id}
          to={`/experience/${folder.category === 'design' ? 'design' : 'project'}/${folder.id}`}
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
    <div className="relative overflow-visible rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-7">
      <div>
        <p className="text-2xl font-black text-cyan-300 md:text-3xl">
          iNFRA Corporation
        </p>
        <h3 className="mt-3 text-xl font-black leading-tight text-white md:text-3xl">
          Environmental Protected Area Impact Assessment System
        </h3>
        <p className="mt-3 text-base font-semibold text-gray-300 md:text-l">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Contribution <span className="text-gray-600">|</span>
          </span>{' '}
          Frontend (Applied) and Backend (Additional)
        </p>
      </div>

      <p className="mt-5 max-w-4xl text-sm leading-relaxed text-gray-400 md:text-base" style={{ textIndent: '1.5rem' }}>
        Developed a web application for preliminary impact assessment of construction projects or structures
        that may affect environmentally protected areas under the Office of Natural Resources and
        Environmental Policy and Planning (ONEP).
      </p>

      <div className="mt-6">
        <div className="relative mx-auto max-w-4xl">
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black p-4 md:p-5">
            <div className="relative mx-auto flex aspect-video w-full max-w-[760px] items-center justify-center overflow-hidden rounded-xl bg-black">
              <img
                src={internshipImages[currentInternImage].src}
                alt={internshipImages[currentInternImage].label}
                className="h-full w-full object-cover object-center"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-white/[0.03] text-sm font-semibold text-gray-500">
                {internshipImages[currentInternImage].label}
              </div>
            </div>
          </div>

          {internshipImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevInternImage}
                className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 md:-translate-x-14"
                aria-label="Previous internship image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 42 42">
                  <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNextInternImage}
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 md:translate-x-14"
                aria-label="Next internship image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 42 42" className="rotate-180">
                  <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z" />
                </svg>
              </button>
            </>
          )}

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {currentInternImage + 1}/{internshipImages.length}
            </div>

            <button
              type="button"
              onClick={() => setIsInternFullscreen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label="View fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <motion.button
          type="button"
          onClick={() => setIsInternDetailExpanded((value) => !value)}
          aria-expanded={isInternDetailExpanded}
          className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-white px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-black sm:min-h-11 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{isInternDetailExpanded ? 'Hide detail' : 'More detail'}</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`h-4 w-4 transition-transform duration-300 sm:h-[18px] sm:w-[18px] ${isInternDetailExpanded ? 'rotate-180' : ''}`}
            whileHover={{ y: isInternDetailExpanded ? -2 : 2 }}
            transition={{ duration: 0.3 }}
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </motion.button>

        {isInternDetailExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 space-y-4 overflow-hidden"
          >
            {internshipHighlights.map((item) => (
              <div key={item.title} className="border-l-2 border-cyan-400/70 pl-4">
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-400 md:text-base" style={{ textIndent: '1.5rem' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        )}
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
      description: 'Show internship experience at iNFRA Corporation',
      aliases: ['intern', 'work'],
    },
    {
      command: 'project',
      label: 'project',
      description: 'Show featured development projects',
      aliases: ['projects', 'featured'],
    },
    {
      command: 'design',
      label: 'design',
      description: 'Show all your UI/UX design projects',
      aliases: ['ui', 'ux', 'figma'],
    },
  ];

  const activeContent = {
    internship: internshipContent,
    project: renderProjectContent('project'),
    design: renderProjectContent('design'),
  }[activeView];

  return (
    <>
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
            data-section-header="experience"
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
                  <SectionUnderline className="self-end" />
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
              autoFocusOnView
              onCommandChange={handleExperienceViewChange}
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

      {isInternFullscreen && (
        <InternFullscreenModal
          currentImageIndex={currentInternImage}
          images={internshipImages}
          onClose={() => setIsInternFullscreen(false)}
          onNext={handleNextInternImage}
          onPrev={handlePrevInternImage}
        />
      )}
    </>
  );
}
