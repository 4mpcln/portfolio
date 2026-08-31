import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

const SCROLL_KEY = 'portfolio_home_scroll';
const HOME_PATHS = [
  '/',
  '/home',
  '/about',
  '/skill',
  '/experience',
  '/experience/internship',
  '/experience/project',
  '/experience/design',
  '/skills',
  '/internship',
  '/project',
  '/design',
];
const SECTION_PATHS: Record<string, string> = {
  '/about': 'about',
  '/skill': 'skills',
  '/experience': 'experience',
  '/experience/internship': 'experience',
  '/experience/project': 'experience',
  '/experience/design': 'experience',
  '/skills': 'skills',
  '/internship': 'experience',
  '/project': 'experience',
  '/design': 'experience',
};
const SCROLL_SECTION_PATHS: Record<string, string> = {
  home: '/home',
  about: '/about',
  skills: '/skill',
};

const isProjectDetailPath = (pathname: string) =>
  pathname.startsWith('/projects/') ||
  pathname.startsWith('/experience/project/') ||
  pathname.startsWith('/experience/design/');

const getExperiencePathForCurrentRoute = (pathname: string) => {
  if (pathname === '/experience/project' || pathname === '/project') return '/experience/project';
  if (pathname === '/experience/design' || pathname === '/design') return '/experience/design';
  return '/experience/internship';
};

const getPathForScrollSection = (sectionName: string, currentPath: string) => {
  if (sectionName === 'experience') return getExperiencePathForCurrentRoute(currentPath);
  return SCROLL_SECTION_PATHS[sectionName] ?? '/home';
};
const HEADER_EDGE_OFFSET = 5;

const scrollToSectionHeader = (sectionName: string) => {
  const header = document.querySelector(`[data-section-header="${sectionName}"]`);
  const section = document.querySelector(`[data-section="${sectionName}"]`);
  const target = header ?? section;

  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY + HEADER_EDGE_OFFSET;
  window.scrollTo(0, targetY);
};

export default function RouteScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const locationState = location.state as {
    skipRouteScroll?: boolean;
    restoreScrollY?: number;
    skipPathSyncUntil?: number;
  } | null;
  const skipPathSyncUntilRef = useRef(0);

  // 🔒 Step 1: ปิด native browser scroll restoration อย่างถาวร
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // 💾 Step 2: บันทึกตำแหน่ง scroll เฉพาะหน้า Home เท่านั้น
  useEffect(() => {
    // ถ้าไม่ใช่หน้า Home ไม่ต้องทำอะไร
    if (!HOME_PATHS.includes(location.pathname)) return;

    let rafId = 0;
    let isActive = true; // ตัวแปรควบคุมว่า effect นี้ยังใช้งานอยู่หรือไม่
    
    const saveScrollPosition = () => {
      if (!isActive) return; // ❌ หยุดทำงานถ้า effect ถูก cleanup แล้ว
      if (rafId) return; // ป้องกันการเรียกซ้ำ
      
      rafId = requestAnimationFrame(() => {
        if (!isActive) return; // ❌ เช็คอีกครั้งก่อนบันทึก
        
        const currentScroll = window.scrollY;
        
        // ✅ บันทึกเฉพาะเมื่อมีค่า scroll จริงๆ (ไม่ใช่ 0 ตอนเพิ่งเปิดหน้า)
        if (currentScroll > 0) {
          sessionStorage.setItem(SCROLL_KEY, String(currentScroll));
          console.log('💾 [SAVE] Scroll position:', currentScroll);
        }
        rafId = 0;
      });
    };

    // ฟังการ scroll แบบ real-time
    window.addEventListener('scroll', saveScrollPosition, { passive: true });

    // Cleanup เมื่อเปลี่ยนหน้า
    return () => {
      isActive = false; // ❌ ปิดการทำงานทันที
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', saveScrollPosition);
      
      // ⚠️ CRITICAL: บันทึกตำแหน่งสุดท้าย แต่เฉพาะเมื่อมีค่า > 0
      const finalScroll = window.scrollY;
      if (finalScroll > 0) {
        sessionStorage.setItem(SCROLL_KEY, String(finalScroll));
        console.log('💾 [SAVE ON LEAVE] Final scroll position:', finalScroll);
      } else {
        console.log('⚠️ [SKIP SAVE] Scroll is 0, not overwriting saved position');
      }
    };
  }, [location.pathname]);

  // 📍 Step 3: จัดการ scroll ตามสถานการณ์
  useLayoutEffect(() => {
    console.log('🔄 [ROUTE CHANGE]', {
      path: location.pathname,
      type: navigationType,
    });

    if (typeof locationState?.restoreScrollY === 'number' && HOME_PATHS.includes(location.pathname)) {
      const targetY = locationState.restoreScrollY;
      skipPathSyncUntilRef.current = locationState.skipPathSyncUntil ?? Date.now() + 1200;
      window.scrollTo(0, targetY);
      requestAnimationFrame(() => window.scrollTo(0, targetY));
      window.setTimeout(() => window.scrollTo(0, targetY), 0);
      window.setTimeout(() => window.scrollTo(0, targetY), 50);
      window.setTimeout(() => window.scrollTo(0, targetY), 150);
      window.setTimeout(() => window.scrollTo(0, targetY), 300);
      window.setTimeout(() => window.scrollTo(0, targetY), 600);
      return;
    }

    if (locationState?.skipRouteScroll) {
      return;
    }

    // 📌 กรณีที่ 1: เข้าหน้า Project Detail → เริ่มที่บนสุดเสมอ
    if (isProjectDetailPath(location.pathname)) {
      console.log('📄 [PROJECT PAGE] Scrolling to top');
      window.scrollTo(0, 0);
      return;
    }

    // 📌 กรณีที่ 2: อยู่ที่หน้า Home และเป็น route ของ section
    const sectionName = SECTION_PATHS[location.pathname];
    if (sectionName) {
      scrollToSectionHeader(sectionName);
      requestAnimationFrame(() => scrollToSectionHeader(sectionName));
      window.setTimeout(() => scrollToSectionHeader(sectionName), 50);
      return;
    }

    if (location.pathname === '/' || location.pathname === '/home') {
      
      // 🔙 กรณี 2.1: กด Back กลับมาหน้า Home
      if (navigationType === 'POP') {
        const savedScroll = sessionStorage.getItem(SCROLL_KEY);
        const targetY = savedScroll ? parseInt(savedScroll, 10) : 0;
        
        console.log('🔙 [BACK TO HOME] Restoring scroll to:', targetY);
        
        // Restore ทันที
        window.scrollTo(0, targetY);
        
        // Retry mechanism: ลองอีก 3 ครั้ง เพื่อรอให้หน้าเว็บ render เสร็จ
        setTimeout(() => window.scrollTo(0, targetY), 0);
        setTimeout(() => window.scrollTo(0, targetY), 50);
        setTimeout(() => window.scrollTo(0, targetY), 100);
        
        return;
      }
      
      // ➡️ กรณี 2.2: เข้าหน้า Home ใหม่ (กดโลโก้, refresh, เข้าครั้งแรก)
      console.log('🏠 [NEW HOME VISIT] Scrolling to top');
      window.scrollTo(0, 0);
      sessionStorage.removeItem(SCROLL_KEY); // ล้างค่าเก่าทิ้ง
    }
  }, [
    location.pathname,
    locationState?.restoreScrollY,
    locationState?.skipPathSyncUntil,
    locationState?.skipRouteScroll,
    navigationType,
  ]);

  useEffect(() => {
    if (!HOME_PATHS.includes(location.pathname)) return;

    let rafId = 0;

    const updatePathFromScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (Date.now() < skipPathSyncUntilRef.current) return;

        const sections = Array.from(document.querySelectorAll('[data-section]')) as HTMLElement[];
        const viewportMarker = window.scrollY + window.innerHeight * 0.45;
        let currentSection = window.scrollY < 100 ? 'home' : 'home';

        sections.forEach((section) => {
          if (section.offsetTop <= viewportMarker) {
            currentSection = section.getAttribute('data-section') || currentSection;
          }
        });

        const nextPath = getPathForScrollSection(currentSection, location.pathname);
        if (nextPath !== location.pathname) {
          navigate(nextPath, { replace: true, state: { skipRouteScroll: true } });
        }
      });
    };

    window.addEventListener('scroll', updatePathFromScroll, { passive: true });
    window.addEventListener('resize', updatePathFromScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updatePathFromScroll);
      window.removeEventListener('resize', updatePathFromScroll);
    };
  }, [location.pathname, navigate]);

  return null;
}
