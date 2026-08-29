import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const SCROLL_KEY = 'portfolio_home_scroll';
const HOME_PATHS = ['/', '/internship', '/project', '/design'];
const EXPERIENCE_PATHS = ['/internship', '/project', '/design'];

const isElementInCurrentView = (element: Element) => {
  const rect = element.getBoundingClientRect();
  const focusLine = window.innerHeight * 0.45;

  return rect.top <= focusLine && rect.bottom >= focusLine;
};

export default function RouteScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

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

    // 📌 กรณีที่ 1: เข้าหน้า Project Detail → เริ่มที่บนสุดเสมอ
    if (location.pathname.startsWith('/projects/')) {
      console.log('📄 [PROJECT PAGE] Scrolling to top');
      window.scrollTo(0, 0);
      return;
    }

    // 📌 กรณีที่ 2: อยู่ที่หน้า Home
    if (EXPERIENCE_PATHS.includes(location.pathname)) {
      const experienceSection = document.querySelector('[data-section="experience"]');
      if (!experienceSection) return;

      if (navigationType === 'POP') {
        const savedScroll = sessionStorage.getItem(SCROLL_KEY);
        if (savedScroll) {
          const targetY = parseInt(savedScroll, 10);
          window.scrollTo(0, targetY);
          setTimeout(() => window.scrollTo(0, targetY), 50);
          return;
        }
      }

      if (!isElementInCurrentView(experienceSection)) {
        experienceSection.scrollIntoView({ block: 'start' });
      }
      return;
    }

    if (location.pathname === '/') {
      
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
  }, [location.pathname, navigationType]);

  return null;
}
