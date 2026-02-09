import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const menuItems = [
    {
        label: 'Home',
        icon: (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" }) }))
    },
    {
        label: 'About',
        icon: (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }))
    },
    {
        label: 'Skills',
        icon: (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }))
    },
    {
        label: 'Experience',
        icon: (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }))
    },
];
export default function HeroMenu() {
    const [isOpen, setIsOpen] = useState(true); // Start open
    const [selectedItem, setSelectedItem] = useState('Home');
    const [scrollY, setScrollY] = useState(0);
    const [isTouch, setIsTouch] = useState(false);
    const scrollToSection = (sectionName) => {
        const section = document.querySelector(`[data-section="${sectionName}"]`);
        if (!section)
            return;
        const isAtTop = window.scrollY < 100; // Check if user is at top
        if (isAtTop && sectionName !== 'home') {
            // Slow scroll through entire Quote section
            const quoteSection = document.querySelector('.quote-section');
            if (quoteSection) {
                const quoteSectionTop = quoteSection.offsetTop;
                const quoteSectionHeight = quoteSection.offsetHeight;
                // Stop when last character shadow completes (51 chars × 0.010 = 0.51 or 51%)
                const quoteScrollTarget = quoteSectionTop + (quoteSectionHeight * 0.51);
                // Calculate scroll duration based on quote section height
                const scrollDistance = quoteScrollTarget - window.scrollY;
                const scrollDuration = 7200; // 7.2 seconds to scroll through quote (10% faster)
                const scrollStep = scrollDistance / (scrollDuration / 16); // 60fps
                let currentScroll = window.scrollY;
                let scrolling = true;
                const smoothScrollThroughQuote = () => {
                    if (!scrolling)
                        return;
                    currentScroll += scrollStep;
                    if (currentScroll >= quoteScrollTarget) {
                        currentScroll = quoteScrollTarget;
                        scrolling = false;
                        // After reaching end of quote, quickly scroll to target section
                        setTimeout(() => {
                            const baseTop = section.getBoundingClientRect().top + window.scrollY;
                            const offset = sectionName === 'experience' ? 80 : sectionName === 'about' ? 700 : 0;
                            window.scrollTo({ top: baseTop + offset, behavior: 'smooth' });
                        }, 5); // Minimal delay before jumping
                    }
                    window.scrollTo({ top: currentScroll, behavior: 'auto' });
                    if (scrolling) {
                        requestAnimationFrame(smoothScrollThroughQuote);
                    }
                };
                requestAnimationFrame(smoothScrollThroughQuote);
                return;
            }
        }
        // Normal scroll behavior
        const baseTop = section.getBoundingClientRect().top + window.scrollY;
        const offset = sectionName === 'experience' ? 80 : sectionName === 'about' ? 700 : 0;
        window.scrollTo({ top: baseTop + offset, behavior: 'smooth' });
    };
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const prefersHover = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
        setIsTouch(!prefersHover);
    }, []);
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('[data-section]'));
        const updateActiveSection = () => {
            if (!sections.length)
                return;
            const viewportMarker = window.scrollY + window.innerHeight * 0.45;
            let currentSection = 'home';
            sections.forEach((section) => {
                if (section.offsetTop <= viewportMarker) {
                    currentSection = section.getAttribute('data-section') || currentSection;
                }
            });
            const label = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
            setSelectedItem(label === 'Home' ? 'Home' : label);
        };
        const handleScroll = () => {
            setScrollY(window.scrollY);
            updateActiveSection();
            if (!isTouch) {
                if (window.scrollY > 600) {
                    setIsOpen(false);
                }
                else {
                    setIsOpen(true);
                }
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isTouch]);
    return (_jsx(motion.div, { className: "fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto", initial: false, children: _jsxs(motion.div, { className: "flex items-center gap-0 rounded-full px-6 py-4 cursor-pointer transition-colors", style: { backgroundColor: '#33333366' }, onMouseEnter: () => {
                setIsOpen(true);
            }, onMouseLeave: () => {
                if (!isTouch && scrollY > 600) {
                    setIsOpen(false);
                }
            }, onPointerEnter: (event) => {
                if (event.pointerType === 'mouse') {
                    setIsOpen(true);
                }
            }, onPointerLeave: (event) => {
                if (event.pointerType === 'mouse' && scrollY > 600) {
                    setIsOpen(false);
                }
            }, onClick: () => {
                if (isTouch)
                    setIsOpen((prev) => !prev);
            }, layout: true, children: [_jsxs(motion.span, { className: "text-white font-bold text-sm whitespace-nowrap overflow-hidden flex items-center gap-2", animate: {
                        opacity: isOpen ? 0 : 1,
                        width: isOpen ? 0 : 'auto',
                        marginRight: isOpen ? 0 : 8
                    }, transition: { duration: 0.2 }, children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }), "menu"] }), _jsx(motion.div, { className: "flex items-center gap-0", layout: true, children: menuItems.map((item) => (_jsxs(motion.a, { href: `#${item.label.toLowerCase()}`, animate: isOpen ? {
                            opacity: 1,
                            width: 'auto',
                            paddingLeft: 8,
                            paddingRight: 8
                        } : {
                            opacity: 0,
                            width: 0,
                            paddingLeft: 0,
                            paddingRight: 0
                        }, transition: { duration: 0.2 }, className: `text-white font-bold text-sm whitespace-nowrap transition-colors px-0.5 py-1 w-fit relative flex items-center gap-1 ${selectedItem === item.label ? 'hover:text-gray-300' : 'hover:text-gray-300'}`, onClick: (e) => {
                            e.preventDefault();
                            setSelectedItem(item.label);
                            if (item.label.toLowerCase() === 'home') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                            else {
                                scrollToSection(item.label.toLowerCase());
                            }
                        }, children: [_jsx(motion.div, { whileHover: { scale: 1.1 }, transition: { duration: 0.2 }, className: "flex items-center justify-center", children: item.icon }), _jsx("span", { className: `relative ${selectedItem === item.label ? 'after:content-[\'\'] after:absolute after:bottom-0 after:left-1/3 after:w-1/3 after:h-0.5 after:bg-white after:rounded-full' : ''}`, children: item.label })] }, item.label))) })] }) }));
}
