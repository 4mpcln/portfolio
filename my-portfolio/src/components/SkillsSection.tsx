import { motion } from 'framer-motion';

type Skill = {
  name: string;
  icon?: string;
  scale?: number;
};

type SkillCategory = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    subtitle: 'Core stack for building responsive, typed, and component-driven web apps.',
    skills: [
      { name: 'HTML5', icon: 'html.png' },
      { name: 'CSS3', icon: 'css.png' },
      { name: 'JavaScript', icon: 'jss.png', scale: 0.6 },
      { name: 'TypeScript', icon: 'ts.png' },
      { name: 'React', icon: 'rc.png' },
      { name: 'Next.js', icon: 'next.png' },
      { name: 'Tailwind CSS', icon: 'tw.png' },
      { name: 'Vite', icon: 'vt.png', scale: 1.7 },
      { name: 'TanStack Query' },
      { name: 'Axios' },
      { name: 'React Hook Form' },
      { name: 'Zod' },
    ],
  },
  {
    title: 'Backend & API',
    subtitle: 'Server-side foundations for APIs, documentation, and application logic.',
    skills: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express.png', scale: 1.5 },
      { name: 'NestJS' },
      { name: 'Swagger' },
    ],
  },
  {
    title: 'Database & Storage',
    subtitle: 'Data, caching, and file-storage tools used in full-stack projects.',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'MinIO' },
    ],
  },
  {
    title: 'Design & Tools',
    subtitle: 'Design, version control, deployment, and workflow tools.',
    skills: [
      { name: 'Figma', icon: 'fm.png' },
      { name: 'GitHub', icon: 'gh.png' },
      { name: 'Docker' },
      { name: 'Vercel', icon: 'vercel.png' },
    ],
  },
  {
    title: 'Also Worked With',
    subtitle: 'Secondary tools and frameworks from coursework or smaller projects.',
    skills: [
      { name: 'Vue.js', icon: 'vue.png' },
      { name: 'Nuxt.js', icon: 'nuxt.png' },
      { name: 'Bootstrap', icon: 'bootstrap.png' },
      { name: 'PHP', icon: 'php.png' },
      { name: 'Python', icon: 'python.png' },
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

function SkillTile({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.035 }}
        whileHover={{ y: -8 }}
        className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white via-gray-100 to-gray-300 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-14px_24px_rgba(0,0,0,0.08),0_14px_28px_rgba(0,0,0,0.32)] transition-all duration-300 before:absolute before:left-3 before:right-3 before:top-2 before:h-8 before:rounded-full before:bg-white/60 before:blur-md before:content-[''] after:absolute after:inset-px after:rounded-[15px] after:border after:border-white/55 after:content-[''] hover:border-cyan-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-14px_24px_rgba(0,0,0,0.07),0_18px_36px_rgba(34,211,238,0.16)] md:h-28 md:w-28 md:p-5"
      >
        {skill.icon ? (
          <img
            src={`/${skill.icon}`}
            alt={skill.name}
            className="relative z-10 h-16 w-16 object-contain drop-shadow-sm md:h-20 md:w-20"
            style={{ transform: skill.scale ? `scale(${skill.scale})` : 'scale(1)' }}
          />
        ) : (
          <span className="relative z-10 text-center text-xl font-black leading-none text-gray-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-2xl">
            {getFallbackLabel(skill.name)}
          </span>
        )}
      </motion.div>
      <p className="mt-1 max-w-24 text-center text-xs font-medium text-gray-300 md:max-w-28 md:text-sm">
        {skill.name}
      </p>
    </div>
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

        <div className="space-y-8 md:space-y-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.05 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-black text-white md:text-4xl">
                  {category.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
                  {category.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillTile
                    key={skill.name}
                    skill={skill}
                    index={skillIndex + categoryIndex * 4}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
