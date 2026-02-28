import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const QuoteChar = ({ char, index, scrollYProgress }: { char: string; index: number; scrollYProgress: MotionValue<number> }) => {
  const opacity = useTransform(scrollYProgress, [index * 0.010, (index + 1) * 0.010], [0.2, 1]);
  return (
    <motion.span style={{ opacity, display: 'inline' }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export default function QuoteSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const line1 = "Don't stop when you're tired,";
  const line2 = "Stop when you're done.";
  const chars1 = line1.split('');
  const chars2 = line2.split('');

  return (
    <section ref={ref} className="quote-section relative w-full py-32 px-6 bg-transparent flex items-center justify-center">
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
          <div className="text-4xl md:text-6xl font-black leading-relaxed text-gray-300 quote-inter-bold">
            {/* First Line - Indented */}
            <div className="pl-8 md:pl-12">
              {chars1.map((char, index) => (
                <QuoteChar key={`line1-${index}`} char={char} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>

            {/* Second Line */}
            <div>
              {chars2.map((char, index) => (
                <QuoteChar key={`line2-${index}`} char={char} index={chars1.length + index} scrollYProgress={scrollYProgress} />
              ))}
            </div>
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
