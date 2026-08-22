import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionUnderlineProps = {
  className?: string;
};

export default function SectionUnderline({ className }: SectionUnderlineProps) {
  return (
    <div
      className={cn(
        'relative mt-3 h-1 w-1/2 min-w-[6rem] overflow-hidden rounded-full bg-cyan-400',
        className,
      )}
    >
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0 }}
        className="absolute inset-0 origin-right rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.65)]"
      />
    </div>
  );
}
