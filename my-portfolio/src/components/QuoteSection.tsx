import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const READ_START = 0.16;
const READ_END = 0.7;

const QuoteChar = ({
  char,
  index,
  totalChars,
  scrollYProgress
}: {
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const charStart = READ_START + (index / totalChars) * (READ_END - READ_START);
  const charEnd = READ_START + ((index + 1) / totalChars) * (READ_END - READ_START);
  const opacity = useTransform(scrollYProgress, [charStart, charEnd], [0.2, 1]);

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
    offset: ['start start', 'end end']
  });

  const line1 = "Don't stop when you're tired,";
  const line2 = "Stop when you're done.";
  const chars1 = line1.split('');
  const chars2 = line2.split('');
  const totalChars = chars1.length + chars2.length;
  const authorOpacity = useTransform(scrollYProgress, [READ_START, READ_START + 0.08], [0, 1]);
  const authorY = useTransform(scrollYProgress, [READ_START, READ_START + 0.08], [10, 0]);

  return (
    <section ref={ref} className="quote-section relative w-full h-[220vh] -mt-24 md:-mt-36 bg-transparent">
      <div className="sticky top-0 h-screen w-full px-6 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.45 }}
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
                  <QuoteChar
                    key={`line1-${index}`}
                    char={char}
                    index={index}
                    totalChars={totalChars}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              {/* Second Line */}
              <div>
                {chars2.map((char, index) => (
                  <QuoteChar
                    key={`line2-${index}`}
                    char={char}
                    index={chars1.length + index}
                    totalChars={totalChars}
                    scrollYProgress={scrollYProgress}
                  />
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
              style={{ opacity: authorOpacity, y: authorY }}
              className="text-gray-400 text-sm md:text-base mt-6 text-right"
            >
              &mdash; David goggins
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
