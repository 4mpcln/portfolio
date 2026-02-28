import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedBackground() {
  // Use global scroll position instead of target element
  const { scrollYProgress } = useScroll();

  // Create smooth scroll-based transformations with stronger parallax effect
  const translateY1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const translateY4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const translateY5 = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const translateY6 = useTransform(scrollYProgress, [0, 1], [0, -280]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-0">
      {/* Animated gradient blobs */}

      {/* Top-left large blob */}
      <motion.div
        style={{ y: translateY1 }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_transparent_70%)] opacity-10"
      />

      {/* Top-right medium blob */}
      <motion.div
        style={{ y: translateY2 }}
        className="absolute top-32 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_transparent_70%)] opacity-[0.06]"
      />

      {/* Bottom-left medium blob */}
      <motion.div
        style={{ y: translateY3 }}
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_transparent_70%)] opacity-[0.07]"
      />

      {/* Bottom-right large blob */}
      <motion.div
        style={{ y: translateY4 }}
        className="absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_transparent_70%)] opacity-5"
      />

      {/* Additional subtle blobs for more depth */}
      <motion.div
        style={{ y: translateY5 }}
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_transparent_70%)] opacity-[0.04]"
      />

      <motion.div
        style={{ y: translateY6 }}
        className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_transparent_70%)] opacity-5"
      />
    </div>
  );
}
