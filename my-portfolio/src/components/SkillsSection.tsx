import { useRef, useState, type ComponentType } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconCode, IconDatabase, IconServer, IconSettings } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

type Skill = {
  name: string;
  icon?: string;
  scale?: number;
};

type SkillGroup = {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string; stroke?: number }>;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Core tools for building typed, responsive, component-driven interfaces.',
    Icon: IconCode,
    skills: [
      { name: 'HTML5', icon: 'html.png' },
      { name: 'CSS3', icon: 'css.png' },
      { name: 'JavaScript', icon: 'jss.png', scale: 0.7 },
      { name: 'TypeScript', icon: 'ts.png' },
      { name: 'React', icon: 'rc.png' },
      { name: 'Next.js', icon: 'next.png' },
      { name: 'Tailwind CSS', icon: 'tw.png' },
      { name: 'Vite', icon: 'vt.png', scale: 1.45 },
      { name: 'TanStack Query', icon: 'tanstack-query.png' },
      { name: 'Axios', icon: 'axios.png' },
      { name: 'React Hook Form', icon: 'react-hook-form.png' },
      { name: 'Zod', icon: 'zod.png' },
      { name: 'Vue.js', icon: 'vue.png' },
      { name: 'Nuxt.js', icon: 'nuxt.png' },
      { name: 'Bootstrap', icon: 'bootstrap.png' },
    ],
  },
  {
    title: 'Backend & API',
    description: 'Server-side experience from internship work and project integration.',
    Icon: IconServer,
    skills: [
      { name: 'Node.js', icon: 'nodejs.svg' },
      { name: 'Express.js', icon: 'express.png', scale: 1.35 },
      { name: 'NestJS', icon: 'nestjs.svg' },
      { name: 'REST API' },
      { name: 'Swagger', icon: 'swagger.svg' },
      { name: 'PHP', icon: 'php.png' },
      { name: 'Python', icon: 'python.png' },
    ],
  },
  {
    title: 'Database & Storage',
    description: 'Data, caching, storage, and geospatial tools used in system work.',
    Icon: IconDatabase,
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql.svg' },
      { name: 'PostGIS', icon: 'postgis-2.png' , scale: 1.5},
      { name: 'TypeORM', icon: 'typeorm-2.png' },
      { name: 'Redis', icon: 'redis.svg' },
      { name: 'MinIO', icon: 'minio.svg' },
      { name: 'MapLibre', icon: 'maplibre-1.svg' },
    ],
  },
  {
    title: 'Design & Tools',
    description: 'Design workflow, version control, deployment, and supporting tools.',
    Icon: IconSettings,
    skills: [
      { name: 'Figma', icon: 'fm.png' },
      { name: 'GitHub', icon: 'gh.png' },
      { name: 'Docker', icon: 'docker.svg' },
      { name: 'Vercel', icon: 'vercel.png' },
      { name: 'Canva', icon: 'canva.png' },
    ],
  },
];

const getFallbackLabel = (name: string) =>
  name
    .split(/[\s.-]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

function SkillLogoTile({ skill, index, isActive }: { skill: Skill; index: number; isActive: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={isActive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 8, filter: 'blur(4px)' }}
      transition={{ duration: 0.32, delay: index * 0.035 }}
      whileHover={isActive ? { y: -5 } : undefined}
      className={cn(
        'group flex min-w-[70px] flex-col items-center gap-1.5',
        !isActive && 'pointer-events-none'
      )}
    >
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white via-gray-100 to-gray-300 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-10px_18px_rgba(0,0,0,0.08),0_10px_22px_rgba(0,0,0,0.28)] transition-shadow duration-300 before:absolute before:left-2 before:right-2 before:top-1.5 before:h-6 before:rounded-full before:bg-white/65 before:blur-md before:content-[''] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-10px_18px_rgba(0,0,0,0.07),0_12px_26px_rgba(34,211,238,0.16)] md:h-[72px] md:w-[72px]">
        {skill.icon ? (
          <img
            src={`/${skill.icon}`}
            alt={skill.name}
            className="relative z-10 h-10 w-10 object-contain drop-shadow-sm md:h-11 md:w-11"
            style={{ transform: skill.scale ? `scale(${skill.scale})` : 'scale(1)' }}
          />
        ) : (
          <span className="relative z-10 text-center text-sm font-black leading-none text-gray-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-base">
            {getFallbackLabel(skill.name)}
          </span>
        )}
      </div>
      <p className="max-w-[86px] text-center text-[11px] font-medium leading-tight text-gray-300 md:text-xs">
        {skill.name}
      </p>
    </motion.div>
  );
}

function SkillGroupCard({
  group,
  index,
  isRevealed,
  onReveal,
  animated = true,
  compact = false,
}: {
  group: SkillGroup;
  index: number;
  isRevealed: boolean;
  onReveal: () => void;
  animated?: boolean;
  compact?: boolean;
}) {
  const { Icon } = group;

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: -88 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      animate={animated ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-100px' }}
      onAnimationComplete={animated ? onReveal : undefined}
      className={cn(
        'rounded-2xl border border-white/15 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_55px_rgba(0,0,0,0.28)] backdrop-blur-sm',
        compact ? 'p-4' : 'p-5 md:p-6',
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gray-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
          compact ? 'h-12 w-12' : 'h-14 w-14',
        )}>
          <Icon className={compact ? 'h-6 w-6' : 'h-7 w-7'} stroke={2} />
        </div>
        <div>
          <h2 className={cn('font-black text-white', compact ? 'text-xl' : 'text-xl md:text-2xl')}>{group.title}</h2>
          <p className={cn('mt-1 max-w-xl leading-relaxed text-gray-500', compact ? 'text-xs' : 'text-sm')}>{group.description}</p>
        </div>
      </div>

      <div className={cn(
        'grid justify-start',
        compact ? 'mt-5 grid-cols-[repeat(auto-fill,minmax(68px,68px))] gap-x-3 gap-y-3' : 'mt-6 grid-cols-[repeat(auto-fill,minmax(72px,72px))] gap-x-4 gap-y-4',
      )}>
        {group.skills.map((skill, skillIndex) => (
          <SkillLogoTile key={skill.name} skill={skill} index={skillIndex} isActive={isRevealed} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillsGrid({
  className,
  isRevealed,
  onReveal,
  animated = true,
  compact = false,
}: {
  className?: string;
  isRevealed: (title: string) => boolean;
  onReveal: (title: string) => void;
  animated?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={cn('grid gap-5 lg:grid-cols-2', className)}>
      {skillGroups.map((group, index) => (
        <SkillGroupCard
          key={group.title}
          group={group}
          index={index}
          isRevealed={isRevealed(group.title)}
          onReveal={() => onReveal(group.title)}
          animated={animated}
          compact={compact}
        />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealedGroups, setRevealedGroups] = useState<Record<string, boolean>>({});
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', '55% start'],
  });
  const extractedY = useTransform(scrollYProgress, [0.08, 0.5, 0.68], [-735, -260, 0]);
  const extractedScale = useTransform(scrollYProgress, [0.08, 0.5, 0.68], [0.46, 0.62, 1]);
  const extractedRotateX = useTransform(scrollYProgress, [0.08, 0.3, 0.5], [-18, -8, 0]);

  const revealGroup = (title: string) => {
    setRevealedGroups((current) => (current[title] ? current : { ...current, [title]: true }));
  };

  return (
    <section
      ref={sectionRef}
      data-section="skills"
      className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-4 pb-16 pt-20 scroll-mt-0 sm:px-6"
    >
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-6"
        >
          <MacbookScroll
            title={null}
            showGradient={false}
            className="-mb-24 md:-mb-28"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative mb-8 text-right md:mb-10"
        >
          <div className="relative inline-block">
            <h1 className="inline-flex items-center gap-3 text-6xl font-black text-white md:gap-4 md:text-9xl">
              Skills
              <svg
                className="h-[1em] w-[1em] text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </h1>
            <motion.div
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false, margin: '-100px' }}
              className="ml-auto mt-3 h-1 w-1/2 min-w-[6rem] rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>

        <motion.div
          style={{
            y: extractedY,
            scale: extractedScale,
            rotateX: extractedRotateX,
            transformOrigin: 'top center',
          }}
          className="absolute left-1/2 top-[60rem] z-20 hidden w-[min(92vw,80rem)] -translate-x-1/2 [perspective:1400px] lg:block"
        >
          <SkillsGrid
            isRevealed={() => true}
            onReveal={() => undefined}
            animated={false}
          />
        </motion.div>

        <div className="pointer-events-none relative z-10 hidden opacity-0 lg:block">
          <SkillsGrid
            isRevealed={() => true}
            onReveal={() => undefined}
            animated={false}
          />
        </div>

        <div className="relative z-10 lg:hidden">
          <SkillsGrid
            isRevealed={(title) => Boolean(revealedGroups[title])}
            onReveal={revealGroup}
          />
        </div>
      </div>
    </section>
  );
}
