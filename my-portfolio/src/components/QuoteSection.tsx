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
    <section ref={ref} className="quote-section relative w-full h-[210vh] -mt-20 bg-transparent sm:h-[220vh] md:-mt-36">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-[22rem] sm:max-w-2xl md:max-w-4xl">
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
              className="mb-3 text-5xl text-cyan-500/30 sm:mb-4 sm:text-6xl"
            >
              &ldquo;
            </motion.div>

            {/* Quote Text with Character-level Scroll Animation */}
            <div className="text-2xl font-black leading-tight text-gray-300 quote-inter-bold min-[390px]:text-3xl sm:text-4xl sm:leading-snug md:text-5xl lg:text-6xl lg:leading-relaxed">
              <div className="pl-5 sm:pl-8 md:pl-12">
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
              className="mt-3 text-right text-5xl text-cyan-500/30 sm:mt-4 sm:text-6xl"
            >
              &rdquo;
            </motion.div>

            {/* Author */}
            <motion.div
              style={{ opacity: authorOpacity, y: authorY }}
              className="mt-5 text-right text-xs text-gray-400 sm:text-sm md:mt-6 md:text-base"
            >
              &mdash; David goggins
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
