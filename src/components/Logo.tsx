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
      <div
        className={`${s.outer} bg-vccp-dark rounded-lg flex items-center justify-center border-2 border-vccp-gold shadow-lg`}
      >
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="6" fill="#1A1A1A" />
          <text x="24" y="32" fontSize="24" textAnchor="middle" fill="#C9A84C" fontFamily="Georgia,serif" fontWeight="bold">V</text>
          <rect x="4" y="36" width="40" height="2" fill="#C9A84C" rx="1" />
          <circle cx="11" cy="42" r="2.5" fill="#C9A84C" />
          <circle cx="37" cy="42" r="2.5" fill="#C9A84C" />
          <path d="M8 36 Q14 30 24 30 Q34 30 40 36" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div>
        <div className={`${s.title} font-bold text-vccp-gold font-serif leading-tight tracking-widest`}>VCCP</div>
        <div className={`${s.sub} text-gray-400 tracking-wider uppercase leading-tight`}>Vintage Car Collector Portal</div>
      </div>
    </Link>
  );
}
