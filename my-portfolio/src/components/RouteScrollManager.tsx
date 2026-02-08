import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function RouteScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  // เก็บ scroll แยกตาม pathname
  const positionsRef = useRef<Record<string, number>>({});

  // ปิด browser native restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // save scroll ของหน้าปัจจุบัน
  useEffect(() => {
    let raf = 0;

    const save = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        positionsRef.current[location.pathname] = window.scrollY;
        raf = 0;
      });
    };

    window.addEventListener('scroll', save, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      positionsRef.current[location.pathname] = window.scrollY;
      window.removeEventListener('scroll', save);
    };
  }, [location.pathname]);

  // restore scroll ตอน back
  useLayoutEffect(() => {
    // หน้า detail → บังคับขึ้นบน
    if (location.pathname.startsWith('/projects/')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // ไม่ใช่ back / forward
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const saved = positionsRef.current[location.pathname] ?? 0;

    // restore แบบกัน layout shift
    window.scrollTo({ top: saved, behavior: 'auto' });
    requestAnimationFrame(() =>
      window.scrollTo({ top: saved, behavior: 'auto' })
    );
    requestAnimationFrame(() =>
      window.scrollTo({ top: saved, behavior: 'auto' })
    );
  }, [location.pathname, navigationType]);

  return null;
}
