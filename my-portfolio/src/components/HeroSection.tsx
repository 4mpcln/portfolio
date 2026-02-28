import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();

  // Handle CV Download
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Resume (English version).pdf'; // ไฟล์ CV.pdf ใน public folder
    link.download = 'Resume (English version).pdf'; // ชื่อไฟล์ที่จะดาวน์โหลด
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Initial entry animations
  const webInitialX = 1000; // Start from right
  const designerInitialX = -1000; // Start from left

  // Profile image scroll transform - moves down when scrolling
  const profileTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
  const profileOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0.2]);

  // Text scroll transforms
  const webTranslateX = useTransform(scrollYProgress, [0, 0.3], [0, -500]);
  const designerTranslateX = useTransform(scrollYProgress, [0, 0.3], [0, 500]);

  return (
    <div className="relative w-full h-auto bg-transparent overflow-hidden flex flex-col items-center justify-start pt-16 pb-4">
      {/* Text and Image Container */}
      <div className="relative w-full flex flex-col items-center justify-start">
        {/* Text Overlay - "Web" and "Designer" */}
        <div className="absolute inset-0 flex flex-col items-center pointer-events-none z-10">
          {/* Left Text - "Web" */}
          <motion.div
            initial={{ x: webInitialX }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ x: webTranslateX }}
            className="absolute top-16"
          >
            <h1 className="text-[160px] font-[900] text-white leading-none whitespace-nowrap">
              Frontend
            </h1>
          </motion.div>

          {/* Right Text - "Designer" */}
          <motion.div
            initial={{ x: designerInitialX }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ x: designerTranslateX }}
            className="absolute top-52"
          >
            <h1 className="text-[160px] font-[900] text-white leading-none whitespace-nowrap">
              Developer
            </h1>
          </motion.div>
        </div>

        {/* Center Profile Image with Buttons */}
        <motion.div
          className="relative z-20 mt-1"
          style={{ y: profileTranslateY, opacity: profileOpacity }}
        >
          {/* Image */}
          <div className="relative w-fit">
            <img
              src="/profile1.png"
              alt="Profile"
              width={400}
              height={500}
              className="object-cover"
            />

            {/* Buttons - Bottom Left of Image, almost overlapping */}
            <div className="absolute bottom-1 -left-55 flex items-center gap-3">
              {/* Download CV Button - Left */}
              <motion.button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white text-white font-medium text-sm hover:bg-white hover:text-black transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ y: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </motion.svg>
                Download CV
              </motion.button>

              {/* Contact Me Button - Right */}
              <motion.a
                href="https://kritcontact.carrd.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-[#57595B] hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}

                whileTap={{ scale: 0.95 }}
              >
                <motion.svg
                  className="w-4 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
                Contact Me
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
