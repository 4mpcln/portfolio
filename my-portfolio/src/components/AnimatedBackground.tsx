export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px),
            linear-gradient(rgba(68, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 18px 18px, 18px 18px',
        }}
      />

      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse at 18% 24%, rgba(255,255,255,0.18), transparent 34%),
            radial-gradient(ellipse at 83% 30%, rgba(255,255,255,0.10), transparent 32%),
            radial-gradient(ellipse at 50% 86%, rgba(255,255,255,0.09), transparent 38%),
            radial-gradient(circle at 10% 72%, rgba(255,255,255,0.13), transparent 18%),
            radial-gradient(circle at 35% 45%, rgba(255,255,255,0.08), transparent 16%),
            radial-gradient(circle at 68% 64%, rgba(255,255,255,0.10), transparent 18%),
            radial-gradient(circle at 92% 82%, rgba(255,255,255,0.11), transparent 20%),
            linear-gradient(90deg, rgba(255,255,255,0.08), transparent 28%, transparent 72%, rgba(255,255,255,0.08))
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0 1px, transparent 1px 5px),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 4px)
          `,
          mixBlendMode: 'screen',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.78) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.28), transparent 24%, transparent 72%, rgba(0,0,0,0.34))
          `,
        }}
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
