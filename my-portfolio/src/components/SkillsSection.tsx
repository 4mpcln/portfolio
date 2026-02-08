import { motion } from 'framer-motion';

export default function SkillsSection() {
  const stackItems = [
    { name: 'HTML', icon: 'html.png' },
    { name: 'CSS', icon: 'css.png' },
    { name: 'JavaScript', icon: 'jss.png', scale: '0.6' },
    { name: 'TypeScript', icon: 'ts.png' },
    { name: 'React', icon: 'rc.png' },
    { name: 'Next.JS', icon: 'next.png' },
  ];

  const toolItems = [
    { name: 'Tailwind CSS', icon: 'tw.png' },
    { name: 'Vite', icon: 'vt.png', scale: '1.7' },
    { name: 'Vercel', icon: 'vercel.png' },
  ];

  const createItems = [
    { name: 'Capcut', icon: 'capcut.png' },
    { name: 'Wix', icon: 'wixx.png' },
    { name: 'Figma', icon: 'fm.png' },
    { name: 'Canva', icon: 'canva.png' },
    { name: 'GitHub', icon: 'gh.png' },

  ];

  return (
    <section
      data-section="skills"
      className="relative w-full bg-transparent flex items-center justify-center py-20 px-6"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-right mb-8 relative"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-9xl font-black text-white">Skills</h1>
            <motion.div
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false, margin: '-100px' }}
              className="h-1 bg-cyan-400 mt-3 rounded-full"
              style={{ width: '50%', marginLeft: 'auto' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">DEVELOP</h2>

          <p className="text-gray-400 text-base leading-relaxed mb-2 max-w-3xl indent-8">
            Started creating Web Development using Next.js, React, and Tailwind <br />
            and eventually switched to Mobile Development using React Native
          </p>

          <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-2 indent-8">Stack & Technologies</p>

          <div className="flex flex-wrap gap-4 mb-2" style={{ maxWidth: 'calc(6 * (128px + 32px))' }}>
            {stackItems.map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="relative p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-32 h-32 flex items-center justify-center"
                >
                  <img
                    src={`/${tool.icon}`}
                    alt={tool.name}
                    className="w-24 h-24 object-contain"
                    style={{ transform: tool.scale ? `scale(${tool.scale})` : 'scale(1)' }}
                  />
                </motion.div>
                <p className="text-sm font-light text-gray-400 text-center whitespace-nowrap">{tool.name}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-left">
            {toolItems.map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx + 6) * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="relative p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-32 h-32 flex items-center justify-center"
                >
                  <img
                    src={`/${tool.icon}`}
                    alt={tool.name}
                    className="w-24 h-24 object-contain"
                    style={{ transform: tool.scale ? `scale(${tool.scale})` : 'scale(1)' }}
                  />
                </motion.div>
                <p className="text-sm font-light text-gray-400 text-center whitespace-nowrap">{tool.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-2"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">CREATE</h2>

          <p className="text-gray-400 text-base leading-relaxed mb-2 max-w-3xl indent-8">
            Aspiring content creator and junior developer, passionate about telling <br />
            stories through both words and code. Currently learning and building as I go
          </p>

          <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-2 indent-8">Tools & Platforms</p>

          <div className="flex flex-wrap gap-4 justify-left">
            {createItems.map((tool, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="relative p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-250 hover:border-gray-400 transition-all duration-300 cursor-pointer overflow-hidden w-32 h-32 flex items-center justify-center"
                >
                  <img src={`/${tool.icon}`} alt={tool.name} className="w-24 h-24 object-contain" />
                </motion.div>
                <p className="text-sm font-light text-gray-400 text-center whitespace-nowrap">{tool.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
