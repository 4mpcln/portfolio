export default function Footer() {
  return (
  <footer className="w-full border-y border-white/10 py-10 mt-24 relative z-30 pt-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6 text-white/80">
          <a href="krit.in@kkumail.com" aria-label="Email" className="hover:text-white transition-colors" target="_blank" rel="noreferrer noopener">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </a>
          <a href="https://www.facebook.com/pee.kung.528/" aria-label="Facebook" className="hover:text-white transition-colors" target="_blank" rel="noreferrer noopener">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.78 3.45 8.75 7.96 9.62v-6.8H7.56v-2.82h2.26V9.41c0-2.23 1.33-3.46 3.36-3.46.97 0 1.98.17 1.98.17v2.18h-1.12c-1.1 0-1.45.69-1.45 1.39v1.67h2.47l-.39 2.82h-2.08v6.8c4.51-.87 7.96-4.84 7.96-9.62z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/kkrxtt__/" aria-label="Instagram" className="hover:text-white transition-colors" target="_blank" rel="noreferrer noopener">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://github.com" aria-label="GitHub" className="hover:text-white transition-colors" target="_blank" rel="noreferrer noopener">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.1.8-.25.8-.57v-2.01c-3.2.7-3.88-1.38-3.88-1.38-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.3-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.13 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.21-1.49 3.2-1.18 3.2-1.18.64 1.63.24 2.83.12 3.13.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.08.78 2.18v3.24c0 .32.21.68.81.56 4.56-1.53 7.85-5.86 7.85-10.97C23.5 5.74 18.27.5 12 .5z" />
            </svg>
          </a>
        </div>
        <p className="text-[13px] text-white/60">© 2026 Krit — Small steps , Big dreams</p>
      </div>
    </footer>
  );
}
