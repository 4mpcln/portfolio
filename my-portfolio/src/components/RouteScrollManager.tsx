import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const HOME_SCROLL_KEY = 'homeScrollPosition';

export default function RouteScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const original = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = original;
      };
    }
    return undefined;
  }, []);

  useLayoutEffect(() => {
    const currentPath = location.pathname;
    const isHome = currentPath === '/';
    const isProject = currentPath.startsWith('/projects');

    const restoreScroll = (y: number) => {
      const safeY = Number.isFinite(y) ? y : 0;
      window.scrollTo({ top: safeY, behavior: 'auto' });
      requestAnimationFrame(() => window.scrollTo({ top: safeY, behavior: 'auto' }));
      setTimeout(() => window.scrollTo({ top: safeY, behavior: 'auto' }), 80);
      setTimeout(() => window.scrollTo({ top: safeY, behavior: 'auto' }), 220);
    };

    if (isHome) {
      const storedPosition = sessionStorage.getItem(HOME_SCROLL_KEY);
      const y = storedPosition ? Number(storedPosition) : 0;
      if (navigationType === 'POP') {
        restoreScroll(y);
      } else {
        restoreScroll(0);
      }
    } else if (isProject) {
      restoreScroll(0);
    }
  }, [location.pathname, navigationType]);

  useEffect(() => {
    if (location.pathname !== '/') return;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return null;
}
