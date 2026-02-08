import { motion } from 'framer-motion';

export default function AboutMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 px-6">
      <div className="max-w-6xl w-full">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 md:p-12 mb-12 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Who I Am</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4"
          >
            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              สตูดนต์ชั้นปีที่ 3 ของ <span className="text-cyan-400 font-semibold">วิทยาลัยวิทยาศาสตร์</span> เป็นผู้ศึกษาสาขา Backend Development, AI/ML, และการออกแบบ UX/UI ที่มีความตั้งใจในการสร้างสรรค์และพัฒนาตัวเอง
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              ผมมีความสนใจในการเขียนโค้ดและพัฒนา Backend Development, AI/ML, และการออกแบบ UX/UI ทำให้พบความสุขในการสร้างสรรค์และพัฒนาทักษะวิศวกรรม
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              คนผมเป็นคนที่มีความหลงใหล Develop เพื่อพัฒนาโครงการทางออนไลน์และสร้างวิธีการแก้ไขปัญหาที่มีประสิทธิภาพระดับสูงตามมาตรฐาน
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Education and Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-cyan-500 rounded"></div>
              Education
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div variants={itemVariants} className="border-l-4 border-cyan-500 pl-4 py-2">
                <h4 className="text-white font-semibold text-lg mb-2">
                  College of Computing / Computer Science
                </h4>
                <p className="text-gray-400 text-sm">มหาวิทยาลัยวิทยาศาสตร์</p>
                <p className="text-gray-400 text-sm">ปีการศึกษา 3</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interests & Goals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-cyan-500 rounded"></div>
              Interests & Goals
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-3"
            >
              {[
                'Frontend Development & Web Design',
                'Backend Development & API Design',
                'Machine Learning & AI Integration',
                'Full-Stack Development',
                'System Architecture & Scalability',
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-gray-300 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, x: 5 }}
                    className="w-2 h-2 bg-cyan-500 rounded-full group-hover:bg-cyan-300 transition-colors"
                  ></motion.div>
                  <span className="group-hover:text-cyan-400 transition-colors">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
