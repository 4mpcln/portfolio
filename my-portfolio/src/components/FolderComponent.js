import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const darkenColor = (hex, percent) => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
        color = color
            .split('')
            .map(c => c + c)
            .join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};
const Folder = ({ color = '#5227FF', size = 1, items = [], className = '', title, techStack = [], paperImages = [] }) => {
    const maxItems = 3;
    // ใช้จำนวนรูปจริงที่มี ไม่เติมให้ครบ 3
    const papers = items.slice(0, maxItems);
    const paperSources = paperImages.slice(0, maxItems);
    const actualPaperCount = paperSources.length;
    const [open, setOpen] = useState(false);
    const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: actualPaperCount }, () => ({ x: 0, y: 0 })));
    const glassGradient = 'linear-gradient(hsla(0, 0%, 21%, 0.8), hsla(0, 0%, 16%, 0.5))';
    const glassBackGradient = 'linear-gradient(hsla(0, 0%, 22%, 0.64), hsla(0, 0%, 14%, 0.41))';
    const folderBackColor = darkenColor(color, 0.08);
    const paper1 = darkenColor('#ffffff', 0.1);
    const paper2 = darkenColor('#ffffff', 0.05);
    const paper3 = '#ffffff';
    const handleMouseEnter = () => {
        setOpen(true);
    };
    const handleMouseLeave = () => {
        setOpen(false);
        setPaperOffsets(Array.from({ length: actualPaperCount }, () => ({ x: 0, y: 0 })));
    };
    const handlePaperMouseMove = (e, index) => {
        if (!open)
            return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;
        setPaperOffsets(prev => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: offsetX, y: offsetY };
            return newOffsets;
        });
    };
    const handlePaperMouseLeave = (_e, index) => {
        setPaperOffsets(prev => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: 0, y: 0 };
            return newOffsets;
        });
    };
    const folderStyle = {
        '--folder-color': color,
        '--folder-back-color': folderBackColor,
        '--paper-1': paper1,
        '--paper-2': paper2,
        '--paper-3': paper3
    };
    const scaleStyle = { transform: `scale(${size})` };
    const getOpenTransform = (index) => {
        // ปรับตำแหน่งตามจำนวนกระดาษจริง
        if (actualPaperCount === 1) {
            return 'translate(-50%, -100%) rotate(0deg)'; // กลางหน้า
        }
        if (actualPaperCount === 2) {
            if (index === 0)
                return 'translate(-80%, -70%) rotate(-10deg)';
            if (index === 1)
                return 'translate(-20%, -70%) rotate(10deg)';
        }
        // กรณี 3 แผ่น
        if (index === 0)
            return 'translate(-120%, -70%) rotate(-15deg)';
        if (index === 1)
            return 'translate(10%, -70%) rotate(15deg)';
        if (index === 2)
            return 'translate(-50%, -100%) rotate(5deg)';
        return '';
    };
    return (_jsxs("div", { style: scaleStyle, className: `flex flex-col items-center ${className}`, children: [_jsx("div", { className: `group relative transition-all duration-200 ease-in cursor-pointer ${!open ? 'hover:-translate-y-2' : ''}`, style: {
                    ...folderStyle,
                    transform: open ? 'translateY(-8px)' : undefined
                }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: _jsxs("div", { className: "relative w-[170px] h-[150px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]", style: { background: glassBackGradient }, children: [_jsx("span", { className: "absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0", style: { background: glassBackGradient } }), paperSources.map((paperSrc, i) => {
                            let sizeClasses = '';
                            if (i === 0)
                                sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';
                            if (i === 1)
                                sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
                            if (i === 2)
                                sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';
                            const transformStyle = open
                                ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
                                : undefined;
                            const paperStyle = paperSrc
                                ? {
                                    backgroundImage: `url(${paperSrc})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }
                                : {
                                    backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3
                                };
                            return (_jsx("div", { onMouseMove: e => handlePaperMouseMove(e, i), onMouseLeave: e => handlePaperMouseLeave(e, i), className: `absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${!open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'} ${sizeClasses}`, style: {
                                    ...(!open ? {} : { transform: transformStyle }),
                                    ...paperStyle,
                                    borderRadius: '10px'
                                }, children: papers[i] }, i));
                        }), techStack.length > 0 && (_jsx("div", { className: "absolute z-40 left-3 right-3 bottom-3 flex flex-wrap gap-1", children: techStack.map((tech) => (_jsx("span", { className: "text-[8px] px-2 py-1 rounded-full bg-black/40 text-white/80 backdrop-blur-sm", children: tech }, tech))) })), _jsx("div", { className: `absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${!open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''}`, style: {
                                background: glassGradient,
                                borderRadius: '5px 10px 10px 10px',
                                ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
                            } }), _jsx("div", { className: `absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${!open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''}`, style: {
                                background: glassGradient,
                                borderRadius: '5px 10px 10px 10px',
                                ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
                            } })] }) }), title && (_jsx("div", { className: "mt-0 text-sm font-semi text-white/80 text-center", children: title }))] }));
};
export default Folder;
