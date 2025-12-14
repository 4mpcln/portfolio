'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function QuoteSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const quote = " Don't stop coding when you are tired. Stop coding when you are done. ";
  const chars = quote.split('');

  // Create opacity transforms for each character - each one reveals in sequence
  const opacities = [
    useTransform(scrollYProgress, [0, 1], [0.2, 0.2]),
    useTransform(scrollYProgress, [0, 0.01], [0.2, 1]),
    useTransform(scrollYProgress, [0.01, 0.02], [0.2, 1]),
    useTransform(scrollYProgress, [0.02, 0.03], [0.2, 1]),
    useTransform(scrollYProgress, [0.03, 0.04], [0.2, 1]),
    useTransform(scrollYProgress, [0.04, 0.05], [0.2, 1]),
    useTransform(scrollYProgress, [0.05, 0.06], [0.2, 1]),
    useTransform(scrollYProgress, [0.06, 0.07], [0.2, 1]),
    useTransform(scrollYProgress, [0.07, 0.08], [0.2, 1]),
    useTransform(scrollYProgress, [0.08, 0.09], [0.2, 1]),
    useTransform(scrollYProgress, [0.09, 0.10], [0.2, 1]),
    useTransform(scrollYProgress, [0.10, 0.11], [0.2, 1]),
    useTransform(scrollYProgress, [0.11, 0.12], [0.2, 1]),
    useTransform(scrollYProgress, [0.12, 0.13], [0.2, 1]),
    useTransform(scrollYProgress, [0.13, 0.14], [0.2, 1]),
    useTransform(scrollYProgress, [0.14, 0.15], [0.2, 1]),
    useTransform(scrollYProgress, [0.15, 0.16], [0.2, 1]),
    useTransform(scrollYProgress, [0.16, 0.17], [0.2, 1]),
    useTransform(scrollYProgress, [0.17, 0.18], [0.2, 1]),
    useTransform(scrollYProgress, [0.18, 0.19], [0.2, 1]),
    useTransform(scrollYProgress, [0.19, 0.20], [0.2, 1]),
    useTransform(scrollYProgress, [0.20, 0.21], [0.2, 1]),
    useTransform(scrollYProgress, [0.21, 0.22], [0.2, 1]),
    useTransform(scrollYProgress, [0.22, 0.23], [0.2, 1]),
    useTransform(scrollYProgress, [0.23, 0.24], [0.2, 1]),
    useTransform(scrollYProgress, [0.24, 0.25], [0.2, 1]),
    useTransform(scrollYProgress, [0.25, 0.26], [0.2, 1]),
    useTransform(scrollYProgress, [0.26, 0.27], [0.2, 1]),
    useTransform(scrollYProgress, [0.27, 0.28], [0.2, 1]),
    useTransform(scrollYProgress, [0.28, 0.29], [0.2, 1]),
    useTransform(scrollYProgress, [0.29, 0.30], [0.2, 1]),
    useTransform(scrollYProgress, [0.30, 0.31], [0.2, 1]),
    useTransform(scrollYProgress, [0.31, 0.32], [0.2, 1]),
    useTransform(scrollYProgress, [0.32, 0.33], [0.2, 1]),
    useTransform(scrollYProgress, [0.33, 0.34], [0.2, 1]),
    useTransform(scrollYProgress, [0.34, 0.35], [0.2, 1]),
    useTransform(scrollYProgress, [0.35, 0.36], [0.2, 1]),
    useTransform(scrollYProgress, [0.36, 0.37], [0.2, 1]),
    useTransform(scrollYProgress, [0.37, 0.38], [0.2, 1]),
    useTransform(scrollYProgress, [0.38, 0.39], [0.2, 1]),
    useTransform(scrollYProgress, [0.39, 0.40], [0.2, 1]),
    useTransform(scrollYProgress, [0.40, 0.41], [0.2, 1]),
    useTransform(scrollYProgress, [0.41, 0.42], [0.2, 1]),
    useTransform(scrollYProgress, [0.42, 0.43], [0.2, 1]),
    useTransform(scrollYProgress, [0.43, 0.44], [0.2, 1]),
    useTransform(scrollYProgress, [0.44, 0.45], [0.2, 1]),
    useTransform(scrollYProgress, [0.45, 0.46], [0.2, 1]),
    useTransform(scrollYProgress, [0.46, 0.47], [0.2, 1]),
    useTransform(scrollYProgress, [0.47, 0.48], [0.2, 1]),
    useTransform(scrollYProgress, [0.48, 0.49], [0.2, 1]),
    useTransform(scrollYProgress, [0.49, 0.50], [0.2, 1]),
    useTransform(scrollYProgress, [0.50, 0.51], [0.2, 1]),
    useTransform(scrollYProgress, [0.51, 0.52], [0.2, 1]),
    useTransform(scrollYProgress, [0.52, 0.53], [0.2, 1]),
    useTransform(scrollYProgress, [0.53, 0.54], [0.2, 1]),
    useTransform(scrollYProgress, [0.54, 0.55], [0.2, 1]),
    useTransform(scrollYProgress, [0.55, 0.56], [0.2, 1]),
    useTransform(scrollYProgress, [0.56, 0.57], [0.2, 1]),
    useTransform(scrollYProgress, [0.57, 0.58], [0.2, 1]),
    useTransform(scrollYProgress, [0.58, 0.59], [0.2, 1]),
    useTransform(scrollYProgress, [0.59, 0.60], [0.2, 1]),
    useTransform(scrollYProgress, [0.60, 0.61], [0.2, 1]),
    useTransform(scrollYProgress, [0.61, 0.62], [0.2, 1]),
    useTransform(scrollYProgress, [0.62, 0.63], [0.2, 1]),
    useTransform(scrollYProgress, [0.63, 0.64], [0.2, 1]),
    useTransform(scrollYProgress, [0.64, 0.65], [0.2, 1]),
    useTransform(scrollYProgress, [0.65, 0.66], [0.2, 1]),
    useTransform(scrollYProgress, [0.66, 0.67], [0.2, 1]),
    useTransform(scrollYProgress, [0.67, 0.68], [0.2, 1]),
    useTransform(scrollYProgress, [0.68, 0.69], [0.2, 1]),
    useTransform(scrollYProgress, [0.69, 0.70], [0.2, 1]),
    useTransform(scrollYProgress, [0.70, 0.71], [0.2, 1]),
    useTransform(scrollYProgress, [0.71, 0.72], [0.2, 1]),
    useTransform(scrollYProgress, [0.72, 0.73], [0.2, 1]),
    useTransform(scrollYProgress, [0.73, 0.74], [0.2, 1]),
  ];

  return (
    <section ref={ref} className="relative w-full py-32 px-6 bg-transparent flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Quote Mark - Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-6xl text-cyan-500/30 mb-4"
          >
            &ldquo;
          </motion.div>

          {/* Quote Text with Character-level Scroll Animation */}
          <div className="text-3xl md:text-5xl font-bold leading-tight text-gray-300">
            {chars.map((char, index) => (
              <motion.span
                key={index}
                style={{
                  opacity: opacities[index] || opacities[opacities.length - 1],
                  display: 'inline-block',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Quote Mark - Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-6xl text-cyan-500/30 mt-4 text-right"
          >
            &rdquo;
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-gray-400 text-sm md:text-base mt-6 text-right"
          >
            &mdash; David goggins
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
