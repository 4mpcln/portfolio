'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  icon: string;
  color: string;
}

export default function SkillsSection() {
  const stackItems: SkillItem[] = [
    { name: 'HTML', icon: '/html.png', color: 'from-orange-500/20 to-orange-600/20' },
    { name: 'CSS', icon: '/css.png', color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'JavaScript', icon: '/javascript.png', color: 'from-yellow-500/20 to-yellow-600/20' },
    { name: 'TypeScript', icon: '/typescript.png', color: 'from-blue-500/20 to-blue-700/20' },
    { name: 'React/Next.js', icon: '/next.png', color: 'from-cyan-500/20 to-cyan-600/20' },
    { name: 'Tailwind CSS', icon: '/tailwind.png', color: 'from-cyan-400/20 to-blue-600/20' },
  ];

  const toolsItems = [
    { name: 'VS Code', icon: '/vs code.png', color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'GitHub', icon: '/github.png', color: 'from-gray-500/20 to-gray-700/20' },
    { name: 'Figma', icon: '/figma.png', color: 'from-purple-500/20 to-pink-600/20' },
    { name: 'Canva', icon: '/canva.png', color: 'from-blue-500/20 to-purple-600/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const SkillCard = ({ item, index }: { item: SkillItem; index: number }) => (
    <motion.div
      custom={index}
      variants={skillCardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-50px' }}
      className={`relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br ${item.color} backdrop-blur-sm hover:border-white/40 transition-colors duration-300 group cursor-pointer`}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)',
        }}
      />

      {/* Icon Container */}
      <div className="relative h-16 w-16 mb-4 mx-auto">
        <Image
          src={item.icon}
          alt={item.name}
          width={64}
          height={64}
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      {/* Text */}
      <h3 className="text-center font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors duration-300">
        {item.name}
      </h3>
    </motion.div>
  );

  return (
    <section
      data-section="skills"
      className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 px-6"
    >
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block w-full">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-6xl md:text-7xl font-black text-white">
                  Skills
                </h1>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Stack Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Stack & Technologies
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-white/40 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stackItems.map((item, index) => (
                <SkillCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Tools & Platforms
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-white/40 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {toolsItems.map((item, index) => (
                <SkillCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
