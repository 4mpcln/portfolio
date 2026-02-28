import { motion } from 'framer-motion';

export default function SkillsSection() {
  return (
    <section
      data-section="skills"
  className="relative w-full bg-transparent flex items-center justify-center pt-20 pb-16 px-6 scroll-mt-0"
    >
      <div className="max-w-7xl w-full">
        {/* Skills Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-right mb-3 relative"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-9xl font-black text-white inline-flex items-center gap-4">
              Skills
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </h1>
            {/* Blue underline with extend animation */}
            <motion.div
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false, margin: '-100px' }}
              className="h-1 bg-cyan-400 mt-3 rounded-full w-1/2 min-w-[6rem] ml-auto"
            />
          </div>
        </motion.div>

        {/* DEVELOP Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-2"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-1">DEVELOP</h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-2 max-w-3xl indent-8">
            I started my journey in Web Development using Next.js, React, and Tailwind CSS, building responsive and user-friendly web applications.
I am passionate about improving my frontend skills and creating scalable, high-quality digital products.
          </p>

          <p className="text-lg md:text-xl font-semibold text-cyan-400 mb-2 indent-8">Stack & Technologies</p>

          {/* First Row - 6 items */}
          <div className="flex flex-wrap gap-3 mb-2" style={{ maxWidth: 'calc(6 * (112px + 24px))' }}>
            {[
              { name: 'HTML', icon: 'html.png' },
              { name: 'CSS', icon: 'css.png' },
              { name: 'JavaScript', icon: 'jss.png', scale: '0.6' },
              { name: 'TypeScript', icon: 'ts.png' },
              { name: 'PHP', icon: 'php.png' },
              { name: 'Python', icon: 'python.png' },
              
            ].map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="relative p-5 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-28 h-28 flex items-center justify-center"
                >
                  <img
                    src={`/${tool.icon}`}
                    alt={tool.name}
                    className="w-20 h-20 object-contain"
                    style={{ transform: tool.scale ? `scale(${tool.scale})` : 'scale(1)' }}
                  />
                </motion.div>
                <p className="text-xs md:text-sm font-medium text-gray-300 text-center whitespace-nowrap mt-1">{tool.name}</p>
              </div>
            ))}
          </div>

          {/* Second Row - 5 items */}
          <div className="flex flex-wrap gap-3 justify-left">
            {[
              { name: 'React', icon: 'rc.png' },
              { name: 'Next.JS', icon: 'next.png' },
              { name: 'Tailwind CSS', icon: 'tw.png' },
              { name: 'Bootstrap', icon: 'bootstrap.png'},
              { name: 'Vue.JS', icon: 'vue.png'},
              { name: 'Nuxt.JS', icon: 'nuxt.png'},
              { name: 'Express.JS', icon: 'express.png', scale: '1.5' },
            ].map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx + 6) * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="relative p-5 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-28 h-28 flex items-center justify-center"
                >
                  <img
                    src={`/${tool.icon}`}
                    alt={tool.name}
                    className="w-20 h-20 object-contain"
                    style={{ transform: tool.scale ? `scale(${tool.scale})` : 'scale(1)' }}
                  />
                </motion.div>
                <p className="text-xs md:text-sm font-medium text-gray-300 text-center whitespace-nowrap mt-1">{tool.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CREATE Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-0"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-1">CREATE</h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-2 max-w-3xl indent-8">
            Aspiring content creator and junior developer, passionate about telling <br />
            stories through both words and code. Currently learning and building as I go
          </p>

          <p className="text-lg md:text-xl font-semibold text-cyan-400 mb-2 indent-8">Tools & Platforms</p>

          <div className="flex flex-wrap gap-3 justify-left">
            {[
              { name: 'Capcut', icon: 'capcut.png' },
              { name: 'Wix', icon: 'wixx.png' },
              { name: 'Figma', icon: 'fm.png' },
              { name: 'Canva', icon: 'canva.png' },
              { name: 'VS Code', icon: 'vscode.png' },
              { name: 'GitHub', icon: 'gh.png' },
              { name: 'Vite', icon: 'vt.png', scale: '1.7' },
              { name: 'Vercel', icon: 'vercel.png' },
              
            ].map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="relative p-5 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-28 h-28 flex items-center justify-center"
                >
                  <img src={`/${tool.icon}`} alt={tool.name} className="w-20 h-20 object-contain" />
                </motion.div>
                <p className="text-xs md:text-sm font-medium text-gray-300 text-center whitespace-nowrap mt-1">{tool.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
