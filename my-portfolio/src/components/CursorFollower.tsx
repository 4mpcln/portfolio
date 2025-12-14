'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (followerRef.current) {
        followerRef.current.style.left = e.clientX + 'px';
        followerRef.current.style.top = e.clientY + 'px';
      }

      // Add trail particle
      const id = trailIdRef.current++;
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id }];
        // Keep only last 15 trail particles for performance
        return newTrail.slice(-15);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((particle, index) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: particle.x + 'px',
            top: particle.y + 'px',
            width: `${8 * (index / trail.length)}px`,
            height: `${8 * (index / trail.length)}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${0.6 * (index / trail.length)}) 0%, rgba(255, 255, 255, 0) 100%)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(2px)',
          }}
        ></div>
      ))}

      {/* Main cursor circle */}
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-40"
        style={{
          width: '15px',
          height: '15px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) 100%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(3px)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
        }}
      ></div>
    </>
  );
}
