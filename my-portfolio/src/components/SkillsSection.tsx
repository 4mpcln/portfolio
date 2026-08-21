import { motion } from 'framer-motion';

type Skill = {
  name: string;
  icon?: string;
  scale?: number;
};

type SkillGroup = {
  title: string;
  description: string;
  iconPath: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Core tools for building typed, responsive, component-driven interfaces.',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
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
    iconPath: 'M4 7h16M4 12h16M4 17h16M7 4v16M17 4v16',
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
    iconPath: 'M4 7c0-2 3.6-4 8-4s8 2 8 4-3.6 4-8 4-8-2-8-4Zm0 0v5c0 2 3.6 4 8 4s8-2 8-4V7M4 12v5c0 2 3.6 4 8 4s8-2 8-4v-5',
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
    iconPath: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.05a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.05A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.05a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.05A1.7 1.7 0 0 0 19.4 15Z',
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

function SkillLogoTile({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.025 }}
      whileHover={{ y: -5 }}
      className="group flex min-w-[70px] flex-col items-center gap-1.5"
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

function SkillGroupCard({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-100px' }}
      className="rounded-2xl border border-white/15 bg-black/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_55px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gray-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={group.iconPath} />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-black text-white md:text-2xl">{group.title}</h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-500">{group.description}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(72px,72px))] justify-start gap-x-4 gap-y-4">
        {group.skills.map((skill, skillIndex) => (
          <SkillLogoTile key={skill.name} skill={skill} index={skillIndex} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      data-section="skills"
      className="relative flex w-full items-center justify-center bg-transparent px-4 pb-16 pt-20 scroll-mt-0 sm:px-6"
    >
      <div className="w-full max-w-7xl">
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

        <div className="grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <SkillGroupCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
