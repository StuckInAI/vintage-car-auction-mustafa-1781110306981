import { Link } from 'react-router-dom';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { outer: 'w-8 h-8', text: 'text-sm', title: 'text-lg', sub: 'text-xs' },
    md: { outer: 'w-12 h-12', text: 'text-xl', title: 'text-2xl', sub: 'text-xs' },
    lg: { outer: 'w-16 h-16', text: 'text-3xl', title: 'text-3xl', sub: 'text-sm' },
  };
  const s = sizes[size];
  return (
    <Link to="/" className="flex items-center gap-3 no-underline">
      <div className={`${s.outer} rounded-lg flex items-center justify-center shadow-lg overflow-hidden`}>
        <svg viewBox="0 0 48 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E85D04" />
              <stop offset="100%" stopColor="#C44D00" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#logoGrad)" />
          {/* Steering wheel */}
          <circle cx="24" cy="22" r="10" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="24" cy="22" r="3" fill="white" />
          <line x1="24" y1="12" x2="24" y2="19" stroke="white" strokeWidth="2" />
          <line x1="14" y1="22" x2="21" y2="22" stroke="white" strokeWidth="2" />
          <line x1="27" y1="22" x2="34" y2="22" stroke="white" strokeWidth="2" />
          {/* Road / base line */}
          <rect x="6" y="36" width="36" height="2.5" rx="1.25" fill="white" opacity="0.9" />
          {/* Wheels */}
          <circle cx="14" cy="42" r="3" fill="white" opacity="0.9" />
          <circle cx="34" cy="42" r="3" fill="white" opacity="0.9" />
          {/* Car silhouette */}
          <path d="M8 36 Q10 30 16 28 L22 26 L26 26 L32 28 Q38 30 40 36Z" fill="white" opacity="0.25" />
        </svg>
      </div>
      <div>
        <div className={`${s.title} font-bold text-vccp-orange font-serif leading-tight tracking-widest`}>VCCP</div>
        <div className={`${s.sub} text-gray-400 tracking-wider uppercase leading-tight`}>Vintage Car Collector Portal</div>
      </div>
    </Link>
  );
}
