import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
export default function QuoteSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });
    const line1 = "Don't stop when you're tired.";
    const line2 = "Stop when you're done.";
    const chars1 = line1.split('');
    const chars2 = line2.split('');
    // Create opacity transforms for each character - each one reveals in sequence
    const opacities1 = chars1.map((_, i) => useTransform(scrollYProgress, [i * 0.010, (i + 1) * 0.010], [0.2, 1]));
    const opacities2 = chars2.map((_, i) => useTransform(scrollYProgress, [(chars1.length + i) * 0.010, (chars1.length + i + 1) * 0.010], [0.2, 1]));
    return (_jsx("section", { ref: ref, className: "quote-section relative w-full py-32 px-6 bg-transparent flex items-center justify-center", children: _jsx("div", { className: "max-w-4xl w-full", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true, margin: '-100px' }, className: "relative", children: [_jsx(motion.div, { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, viewport: { once: true, margin: '-100px' }, className: "text-6xl text-cyan-500/30 mb-4", children: "\u201C" }), _jsxs("div", { className: "text-4xl md:text-6xl font-black leading-relaxed text-gray-300", children: [_jsx("div", { className: "pl-8 md:pl-12", children: chars1.map((char, index) => (_jsx(motion.span, { style: {
                                        opacity: opacities1[index] || opacities1[opacities1.length - 1],
                                        display: 'inline-block',
                                    }, children: char === ' ' ? '\u00A0' : char }, index))) }), _jsx("div", { children: chars2.map((char, index) => (_jsx(motion.span, { style: {
                                        opacity: opacities2[index] || opacities2[opacities2.length - 1],
                                        display: 'inline-block',
                                    }, children: char === ' ' ? '\u00A0' : char }, index))) })] }), _jsx(motion.div, { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, viewport: { once: true, margin: '-100px' }, className: "text-6xl text-cyan-500/30 mt-4 text-right", children: "\u201D" }), _jsx(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.8, delay: 0.3 }, viewport: { once: true, margin: '-100px' }, className: "text-gray-400 text-sm md:text-base mt-6 text-right", children: "\u2014 David goggins" })] }) }) }));
}
