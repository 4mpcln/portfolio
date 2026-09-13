import { useState, useEffect, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

const HEADER_EDGE_OFFSET = 5;
const menuPathMap: Record<string, string> = {
  Home: '/home',
  About: '/about',
  Skills: '/skill',
  Experience: '/experience/internship',
};

type FloatingMenuItemProps = {
  href: string;
  icon: ReactNode;
  isOpen: boolean;
  isSelected: boolean;
  label: string;
  mouseX: MotionValue<number>;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function FloatingMenuItem({
  href,
  icon,
  isOpen,
  isSelected,
  label,
  mouseX,
  onClick,
}: FloatingMenuItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const yTransform = useTransform(distance, [-130, 0, 130], [0, -9, 0]);
  const scaleTransform = useTransform(distance, [-130, 0, 130], [1, 1.14, 1]);
  const iconSizeTransform = useTransform(distance, [-130, 0, 130], [16, 23, 16]);

  const y = useSpring(yTransform, { mass: 0.12, stiffness: 180, damping: 14 });
  const scale = useSpring(scaleTransform, { mass: 0.12, stiffness: 180, damping: 14 });
  const iconSize = useSpring(iconSizeTransform, { mass: 0.12, stiffness: 180, damping: 14 });

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-current={isSelected ? 'page' : undefined}
      animate={
        isOpen
          ? {
              opacity: 1,
              width: 'auto',
              paddingLeft: 8,
              paddingRight: 8,
            }
          : {
              opacity: 0,
              width: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }
      }
      style={{ y, scale }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex w-fit items-center gap-1.5 overflow-visible whitespace-nowrap rounded-full py-1 text-sm font-bold text-white outline-none transition-colors',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        'hover:bg-white/10 hover:text-gray-200 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50',
      )}
      onClick={onClick}
    >
      <motion.span
        style={{ width: iconSize, height: iconSize }}
        className="flex shrink-0 items-center justify-center"
        whileHover={{
          rotate: [0, -13, 12, -9, 8, -4, 0],
          x: [0, -2, 2, -1.5, 1.5, -0.5, 0],
        }}
        transition={{ duration: 0.46, ease: 'easeInOut' }}
      >
        {icon}
      </motion.span>
      <span
        className={cn(
          'relative',
          isSelected &&
            "after:absolute after:bottom-0 after:left-1/3 after:h-0.5 after:w-1/3 after:rounded-full after:bg-white after:content-['']",
        )}
      >
        {label}
      </span>
    </motion.a>
  );
}

export default function HeroMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // Start open
  const [selectedItem, setSelectedItem] = useState('Home');
  const [scrollY, setScrollY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const mouseX = useMotionValue(Infinity);

  const animateScrollTo = (
    targetY: number,
    duration: number,
    onComplete?: () => void,
    easing: 'smooth' | 'linear' = 'smooth'
  ) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing === 'linear' ? progress : easeInOutCubic(progress);
      const nextY = startY + distance * easedProgress;

      window.scrollTo({ top: nextY, behavior: 'auto' });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToSection = (sectionName: string) => {
    const section = document.querySelector(`[data-section="${sectionName}"]`) as HTMLElement | null;
    if (!section) return;

    const getTargetTop = (target: HTMLElement, offset = 0) =>
      target.getBoundingClientRect().top + window.scrollY + offset;

    const getHeaderTop = (name: string) => {
      const header = document.querySelector(`[data-section-header="${name}"]`) as HTMLElement | null;
      return getTargetTop(header ?? section, HEADER_EDGE_OFFSET);
    };

    const scrollToSkillsSequence = () => {
      const macAnchor = document.querySelector('[data-skills-anchor="mac"]') as HTMLElement | null;
      const titleAnchor = document.querySelector('[data-skills-anchor="title"]') as HTMLElement | null;

      const macTop = getTargetTop(macAnchor ?? section, -70);
      const titleTop = getTargetTop(titleAnchor ?? section, HEADER_EDGE_OFFSET);

      animateScrollTo(macTop, 700, () => {
        window.setTimeout(() => {
          animateScrollTo(titleTop, 850);
        }, 260);
      });
    };
    
    const isAtTop = window.scrollY < 100; // Check if user is at top
    
    if (isAtTop && sectionName !== 'home') {
      const quoteSection = document.querySelector('.quote-section') as HTMLElement | null;
      
      if (quoteSection) {
        const quoteSectionTop = quoteSection.offsetTop;
        const quoteSectionHeight = quoteSection.offsetHeight;
        const quoteReadStart = quoteSectionTop + (quoteSectionHeight * 0.16);
        const quoteReadTarget = quoteSectionTop + (quoteSectionHeight * 0.70);

        animateScrollTo(quoteReadStart, 420, () => {
          animateScrollTo(quoteReadTarget, 2900, () => {
            if (sectionName === 'skills') {
              scrollToSkillsSequence();
              return;
            }

            animateScrollTo(getHeaderTop(sectionName), 700);
          }, 'linear');
        });
        return;
      }
    }

    if (sectionName === 'skills') {
      scrollToSkillsSequence();
      return;
    }
    
    // Normal scroll behavior
    window.scrollTo({ top: getHeaderTop(sectionName), behavior: 'smooth' });
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
        className="flex cursor-pointer items-center gap-0 rounded-full border border-white/10 px-6 py-4 shadow-lg shadow-black/20 backdrop-blur-md transition-colors"
        style={{ backgroundColor: '#33333366' }}
        animate={{
          y: isOpen ? -2 : 0,
          scale: isOpen ? 1.015 : 1,
          boxShadow: isOpen
            ? '0 18px 45px rgba(0, 0, 0, 0.32)'
            : '0 10px 25px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          if (!isTouch && scrollY > 600) {
            setIsOpen(false);
          }
        }}
        onMouseMove={(event) => {
          mouseX.set(event.clientX);
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
        <motion.div className="flex items-end gap-0" layout>
          {menuItems.map((item) => (
            <FloatingMenuItem
              key={item.label}
              href={menuPathMap[item.label]}
              icon={item.icon}
              isOpen={isOpen}
              isSelected={selectedItem === item.label}
              label={item.label}
              mouseX={mouseX}
              onClick={(e) => {
                e.preventDefault();
                setSelectedItem(item.label);
                navigate(menuPathMap[item.label], { state: { skipRouteScroll: true } });
                if (item.label.toLowerCase() === 'home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  scrollToSection(item.label.toLowerCase());
                }
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
