import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useScroll, useTransform } from 'framer-motion';
export default function AnimatedBackground() {
    // Use global scroll position instead of target element
    const { scrollYProgress } = useScroll();
    // Create smooth scroll-based transformations with stronger parallax effect
    const translateY1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const translateY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const translateY3 = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const translateY4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    return (_jsxs("div", { className: "fixed inset-0 bg-black overflow-hidden z-0", children: [_jsx(motion.div, { style: { y: translateY1 }, className: "absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full filter blur-3xl opacity-8" }), _jsx(motion.div, { style: { y: translateY2 }, className: "absolute top-32 right-0 w-[500px] h-[500px] bg-white rounded-full filter blur-3xl opacity-6" }), _jsx(motion.div, { style: { y: translateY3 }, className: "absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-white rounded-full filter blur-3xl opacity-7" }), _jsx(motion.div, { style: { y: translateY4 }, className: "absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-white rounded-full filter blur-3xl opacity-5" }), _jsx(motion.div, { style: { y: useTransform(scrollYProgress, [0, 1], [0, 350]) }, className: "absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-white rounded-full filter blur-3xl opacity-4" }), _jsx(motion.div, { style: { y: useTransform(scrollYProgress, [0, 1], [0, -280]) }, className: "absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-white rounded-full filter blur-3xl opacity-5" })] }));
}
