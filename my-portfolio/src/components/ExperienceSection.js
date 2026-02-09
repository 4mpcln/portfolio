import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Folder from './FolderComponent';
import { projects } from '@/data/projects';
const FILTER_KEY = 'portfolio_experience_filter';
export default function ExperienceSection() {
    // โหลดค่า filter ที่บันทึกไว้ หรือใช้ 'all' เป็นค่าเริ่มต้น
    const [activeFilter, setActiveFilter] = useState(() => {
        const saved = sessionStorage.getItem(FILTER_KEY);
        return (saved === 'design' ? 'design' : 'all');
    });
    // บันทึกค่า filter ทุกครั้งที่มีการเปลี่ยน
    useEffect(() => {
        sessionStorage.setItem(FILTER_KEY, activeFilter);
    }, [activeFilter]);
    const folders = projects.map((project) => ({
        ...project,
        color: '#6a6774',
        size: 2,
        papers: project.paperImages || [] // ใช้รูปจาก project.paperImages
    }));
    const visibleFolders = folders.filter((folder) => activeFilter === 'all' ? folder.category === 'all' : folder.category === 'design');
    return (_jsx("section", { "data-section": "experience", className: "relative w-full bg-transparent flex items-center justify-center pt-28 pb-40 px-6 scroll-mt-40 md:scroll-mt-48", children: _jsxs("div", { className: "max-w-7xl w-full", children: [_jsx(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.8 }, viewport: { once: true, margin: '-100px' }, className: "mb-10 relative", children: _jsxs("div", { className: "flex flex-col gap-5", children: [_jsx("div", { className: "relative inline-block text-right", children: _jsxs("div", { className: "inline-flex flex-col items-end", children: [_jsxs("h1", { className: "text-6xl md:text-9xl font-black text-white inline-flex items-center gap-4 leading-none", children: ["Experience", _jsx("svg", { className: "w-[1em] h-[1em] text-white shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) })] }), _jsx(motion.div, { initial: { scaleX: 0, originX: 1 }, whileInView: { scaleX: 1 }, transition: { duration: 0.8, ease: 'easeOut' }, viewport: { once: false, margin: '-100px' }, className: "h-1 bg-cyan-400 mt-3 rounded-full w-1/2 min-w-[6rem] self-end" })] }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", onClick: () => setActiveFilter('all'), className: `rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${activeFilter === 'all'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`, children: "All Featured Project" }), _jsx("button", { type: "button", onClick: () => setActiveFilter('design'), className: `rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${activeFilter === 'design'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`, children: "My Design" })] })] }) }), _jsx("div", { className: "mt-8 pb-24", children: _jsx("div", { className: "grid gap-x-[17em] gap-y-[23em] grid-cols-2 md:grid-cols-3 mx-auto py-[1em] overflow-visible mt-[15rem] justify-items-start", children: visibleFolders.map((folder) => (_jsx(Link, { to: `/projects/${folder.id}`, "aria-label": `View details for ${folder.title}`, className: "block", children: _jsx(Folder, { className: "custom-folder", color: folder.color, size: folder.size, title: folder.title, techStack: folder.techStack, paperImages: folder.papers }) }, folder.id))) }) })] }) }));
}
