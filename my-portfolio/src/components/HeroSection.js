import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "relative w-full h-auto bg-transparent overflow-hidden flex flex-col items-center justify-start pt-16 pb-4", children: _jsxs("div", { className: "relative w-full flex flex-col items-center justify-start", children: [_jsxs("div", { className: "absolute inset-0 flex flex-col items-center pointer-events-none z-10", children: [_jsx(motion.div, { initial: { x: webInitialX }, animate: { x: 0 }, transition: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }, style: { x: useTransform(scrollYProgress, [0, 0.3], [0, -500]) }, className: "absolute top-16", children: _jsx("h1", { className: "text-[160px] font-[900] text-white leading-none whitespace-nowrap drop-shadow-2xl", children: "Frontend" }) }), _jsx(motion.div, { initial: { x: designerInitialX }, animate: { x: 0 }, transition: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }, style: { x: useTransform(scrollYProgress, [0, 0.3], [0, 500]) }, className: "absolute top-52", children: _jsx("h1", { className: "text-[160px] font-[900] text-white leading-none whitespace-nowrap drop-shadow-2xl", children: "Developer" }) })] }), _jsx(motion.div, { className: "relative z-20 mt-1", style: { y: profileTranslateY, opacity: profileOpacity }, children: _jsxs("div", { className: "relative w-fit", children: [_jsx("img", { src: "/profile1.png", alt: "Profile", width: 400, height: 500, className: "object-cover" }), _jsxs("div", { className: "absolute bottom-1 -left-55 flex items-center gap-3", children: [_jsxs(motion.button, { onClick: handleDownloadCV, className: "flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white text-white font-medium text-sm hover:bg-white hover:text-black transition-all cursor-pointer", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(motion.svg, { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", whileHover: { y: 3 }, transition: { duration: 0.3 }, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }), "Download CV"] }), _jsxs(motion.a, { href: "#", className: "flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-[#57595B] hover:text-white transition-all", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(motion.svg, { className: "w-4 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", whileHover: { y: -3 }, transition: { duration: 0.3 }, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }), "Contact Me"] })] })] }) })] }) }));
}
