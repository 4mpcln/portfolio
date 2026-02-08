import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  { 
    label: 'Home', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
      </svg>
    )
  },
  { 
    label: 'About', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    label: 'Skills', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  { 
    label: 'Experience', 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
];

export default function HeroMenu() {
  const [isOpen, setIsOpen] = useState(true); // Start open
  const [selectedItem, setSelectedItem] = useState('Home');
  const [scrollY, setScrollY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  const scrollToSection = (sectionName: string) => {
    const section = document.querySelector(`[data-section="${sectionName}"]`) as HTMLElement | null;
    if (!section) return;
    const baseTop = section.getBoundingClientRect().top + window.scrollY;
  const offset = sectionName === 'experience' ? 80 : 0;
    window.scrollTo({ top: baseTop + offset, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersHover = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
    setIsTouch(!prefersHover);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-section]')) as HTMLElement[];

    const updateActiveSection = () => {
      if (!sections.length) return;
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
        } else {
          setIsOpen(true);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTouch]);

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
      initial={false}
    >
      <motion.div
        className="flex items-center gap-0 rounded-full px-6 py-4 cursor-pointer transition-colors"
        style={{ backgroundColor: '#33333366' }}
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (!isTouch && scrollY > 600) {
            setIsOpen(false);
          }
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') {
            setIsOpen(true);
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse' && scrollY > 600) {
            setIsOpen(false);
          }
        }}
        onClick={() => {
          if (isTouch) setIsOpen((prev) => !prev);
        }}
        layout
      >
        {/* Menu Text */}
        <motion.span
          className="text-white font-bold text-sm whitespace-nowrap overflow-hidden flex items-center gap-2"
          animate={{
            opacity: isOpen ? 0 : 1,
            width: isOpen ? 0 : 'auto',
            marginRight: isOpen ? 0 : 8
          }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          menu
        </motion.span>

        {/* Menu Items */}
        <motion.div className="flex items-center gap-0" layout>
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              animate={isOpen ? {
                opacity: 1,
                width: 'auto',
                paddingLeft: 8,
                paddingRight: 8
              } : {
                opacity: 0,
                width: 0,
                paddingLeft: 0,
                paddingRight: 0
              }}
              transition={{ duration: 0.2 }}
              className={`text-white font-bold text-sm whitespace-nowrap transition-colors px-0.5 py-1 w-fit relative flex items-center gap-1 ${
                selectedItem === item.label ? 'hover:text-gray-300' : 'hover:text-gray-300'
              }`}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setSelectedItem(item.label);
                if (item.label.toLowerCase() === 'home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  scrollToSection(item.label.toLowerCase());
                }
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {item.icon}
              </motion.div>
              <span className={`relative ${
                selectedItem === item.label ? 'after:content-[\'\'] after:absolute after:bottom-0 after:left-1/3 after:w-1/3 after:h-0.5 after:bg-white after:rounded-full' : ''
              }`}>
                {item.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
