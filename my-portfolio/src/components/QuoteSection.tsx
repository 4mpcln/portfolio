import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { getQuoteKeyCode, QuoteKeyboard } from '@/components/ui/quote-keyboard';

const READ_START = 0.12;
const TYPE_START = 0.34;
const TYPE_END = 0.78;
const EXIT_START = 0.84;
const LINE_1 = "Don't stop when you're tired,";
const LINE_2 = "Stop when you're done.";
const CHARS_1 = LINE_1.split('');
const CHARS_2 = LINE_2.split('');
const QUOTE_CHARS = [...CHARS_1, ...CHARS_2];
type QuotePhase = 'idle' | 'entering' | 'typing' | 'exiting' | 'done';

const QuoteChar = ({
  char,
  index,
  activeIndex,
}: {
  char: string;
  index: number;
  activeIndex: number;
}) => {
  const isTyped = index <= activeIndex;
  const isActive = index === activeIndex;

  return (
    <motion.span
      animate={{
        opacity: isTyped ? 1 : 0.2,
        color: isTyped ? '#ffffff' : '#d1d5db',
        textShadow: isActive
          ? '0 0 18px rgba(34, 211, 238, 0.65), 0 0 38px rgba(34, 211, 238, 0.35)'
          : isTyped
            ? '0 0 10px rgba(255, 255, 255, 0.18)'
            : '0 0 0 rgba(0, 0, 0, 0)',
      }}
      transition={{ duration: 0.12 }}
      style={{ display: 'inline' }}
    >
      {char}
    </motion.span>
  );
};

export default function QuoteSection() {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [phase, setPhase] = useState<QuotePhase>('idle');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const totalChars = QUOTE_CHARS.length;
  const activeKey = activeIndex >= 0 ? getQuoteKeyCode(QUOTE_CHARS[activeIndex] ?? '') : null;
  const authorOpacity = useTransform(scrollYProgress, [READ_START, READ_START + 0.08], [0, 1]);
  const authorY = useTransform(scrollYProgress, [READ_START, READ_START + 0.08], [10, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < READ_START) {
      setPhase('idle');
      setActiveIndex(-1);
      return;
    }

    if (latest < TYPE_START) {
      setPhase('entering');
      setActiveIndex(-1);
      return;
    }

    if (latest <= TYPE_END) {
      const typedProgress = (latest - TYPE_START) / (TYPE_END - TYPE_START);
      const nextIndex = Math.min(totalChars - 1, Math.max(0, Math.floor(typedProgress * totalChars)));
      setPhase('typing');
      setActiveIndex(nextIndex);
      return;
    }

    setActiveIndex(totalChars - 1);
    setPhase(latest < EXIT_START ? 'done' : 'exiting');
  });

  return (
    <section ref={ref} className="quote-section relative w-full h-[270vh] -mt-20 bg-transparent sm:h-[285vh] md:-mt-36">
      <div className="sticky top-0 flex h-screen w-full items-start justify-center px-4 pt-[16vh] sm:px-6 sm:pt-[13vh] md:pt-[20vh] lg:pt-[16vh]">
        <div className="w-full max-w-[22rem] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
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
            <div className="max-w-full text-center text-[clamp(1.05rem,5.1vw,1.42rem)] font-black leading-tight text-gray-300 quote-inter-bold sm:text-4xl sm:leading-snug md:text-5xl lg:text-6xl lg:leading-relaxed">
              <div className="whitespace-nowrap">
                {CHARS_1.map((char, index) => (
                  <QuoteChar
                    key={`line1-${index}`}
                    char={char}
                    index={index}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>

              <div className="whitespace-nowrap">
                {CHARS_2.map((char, index) => (
                  <QuoteChar
                    key={`line2-${index}`}
                    char={char}
                    index={CHARS_1.length + index}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>
            </div>

            <motion.div className="mt-3 flex flex-col items-end sm:mt-4">
              {/* Quote Mark - Right */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-5xl text-cyan-500/30 sm:text-6xl"
              >
                &rdquo;
              </motion.div>

              {/* Author */}
              <motion.div
                style={{ opacity: authorOpacity, y: authorY }}
                className="mt-1 text-xs text-gray-400 sm:text-sm md:text-base"
              >
                by David Goggins
              </motion.div>
            </motion.div>

            <QuoteKeyboard
              activeKey={activeKey}
              isVisible={phase === 'entering' || phase === 'typing' || phase === 'done'}
              isTyping={phase === 'typing'}
              pressId={activeIndex}
              shouldExitRight={phase === 'exiting'}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
