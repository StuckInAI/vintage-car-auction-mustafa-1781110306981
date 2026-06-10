import { Link } from 'react-router-dom';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { outer: 'w-9 h-9', title: 'text-xl', sub: 'text-[9px]' },
    md: { outer: 'w-14 h-14', title: 'text-3xl', sub: 'text-[10px]' },
    lg: { outer: 'w-20 h-20', title: 'text-4xl', sub: 'text-xs' },
  };
  const s = sizes[size];
  return (
    <Link to="/" className="flex items-center gap-3 no-underline group">
      <div className={`${s.outer} rounded-2xl flex items-center justify-center shadow-xl overflow-hidden flex-shrink-0`} style={{ boxShadow: '0 4px 20px rgba(232,93,4,0.4)' }}>
        <svg viewBox="0 0 56 56" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradMain" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7A2F" />
              <stop offset="60%" stopColor="#E85D04" />
              <stop offset="100%" stopColor="#C44D00" />
            </linearGradient>
            <linearGradient id="logoGradShine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)" />
            </filter>
          </defs>
          {/* Base */}
          <rect width="56" height="56" rx="12" fill="url(#logoGradMain)" />
          <rect width="56" height="28" rx="12" fill="url(#logoGradShine)" />
          {/* Car silhouette */}
          <g filter="url(#logoShadow)">
            {/* Body */}
            <path d="M6 36 Q8 28 14 26 L18 18 Q20 14 26 13 L30 13 Q36 13 38 18 L42 26 Q48 28 50 36 Z" fill="white" opacity="0.95" />
            {/* Windows */}
            <path d="M20 25 L22 18 Q23 15 26 14.5 L30 14.5 Q33 15 34 18 L36 25 Z" fill="#E85D04" opacity="0.7" />
            {/* Divider */}
            <line x1="28" y1="14.5" x2="28" y2="25" stroke="#C44D00" strokeWidth="1" opacity="0.8" />
            {/* Wheels */}
            <circle cx="16" cy="38" r="5.5" fill="#1A1A1A" stroke="white" strokeWidth="1.5" />
            <circle cx="16" cy="38" r="2.5" fill="white" opacity="0.6" />
            <circle cx="40" cy="38" r="5.5" fill="#1A1A1A" stroke="white" strokeWidth="1.5" />
            <circle cx="40" cy="38" r="2.5" fill="white" opacity="0.6" />
            {/* Underline / road */}
            <rect x="7" y="42" width="42" height="2" rx="1" fill="white" opacity="0.4" />
            {/* Headlight */}
            <ellipse cx="49" cy="33" rx="2" ry="1.5" fill="#FFD580" opacity="0.9" />
            {/* Taillight */}
            <ellipse cx="7" cy="33" rx="2" ry="1.5" fill="#FF4444" opacity="0.8" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`${s.title} font-black leading-none tracking-widest text-vccp-orange`}
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.15em', textShadow: '0 1px 8px rgba(232,93,4,0.3)' }}
        >
          VCCP
        </span>
        <span
          className={`${s.sub} text-gray-400 tracking-[0.22em] uppercase leading-tight font-medium mt-0.5`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Vintage Car Collector Portal
        </span>
      </div>
    </Link>
  );
}
