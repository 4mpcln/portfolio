'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = ['Home', 'AboutMe', 'Stack&Tools', 'Experience'];

const containerVariants = {
  closed: { backgroundColor: 'rgba(51, 51, 51, 0.4)' },
  open: { 
    backgroundColor: 'rgba(51, 51, 51, 0.7)'
  }
};

const menuTextVariants = {
  open: { 
    opacity: 0, 
    width: 0,
    marginRight: 0
  },
  closed: { 
    opacity: 1, 
    width: 'auto',
    marginRight: 8
  }
};

const itemVariants = {
  open: (custom: number) => ({
    opacity: 1,
    width: 'auto',
    paddingLeft: 12,
    paddingRight: 12,
    transition: {
      duration: 0.4,
      delay: custom * 0.05
    }
  }),
  closed: (custom: number) => ({
    opacity: 0,
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
    transition: {
      duration: 0.35,
      delay: (menuItems.length - custom - 1) * 0.03
    }
  })
};

const itemHoverVariants = {
  hover: {
    color: '#a0a0a0'
  },
  normal: {
    color: '#ffffff'
  }
};

export default function HeroMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={false}
    >
      <motion.div
        className="flex items-center gap-0 rounded-full px-6 py-4 cursor-pointer"
        variants={containerVariants}
        animate={isOpen ? 'open' : 'closed'}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        layout="position"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Menu Text */}
        <motion.span
          className="text-white font-bold text-sm whitespace-nowrap overflow-hidden"
          variants={menuTextVariants}
          animate={isOpen ? 'open' : 'closed'}
        >
          menu
        </motion.span>

        {/* Menu Items */}
        <motion.div className="flex items-center gap-0 overflow-hidden" layout="position">
          {menuItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              custom={index}
              variants={itemVariants}
              animate={isOpen ? 'open' : 'closed'}
              whileHover="hover"
              initial="closed"
              className="text-white font-bold text-sm whitespace-nowrap cursor-pointer inline-flex overflow-hidden"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                if (item.toLowerCase() === 'home') {
                  // Scroll to top for Home button
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  const section = document.querySelector(`[data-section="${item.toLowerCase()}"]`);
                  section?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <motion.span variants={itemHoverVariants} initial="normal">
                {item}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
