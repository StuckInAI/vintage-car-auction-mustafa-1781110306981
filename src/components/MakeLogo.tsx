import React from 'react';

type MakeLogoProps = {
  make: string;
  className?: string;
};

// SVG logos for major vintage American car manufacturers
export default function MakeLogo({ make, className = 'w-10 h-10' }: MakeLogoProps) {
  const m = make.toLowerCase();

  if (m === 'ford') {
    return (
      <svg viewBox="0 0 80 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="20" rx="38" ry="18" fill="#003087" />
        <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke="#C0C0C0" strokeWidth="1.5" />
        <text x="40" y="26" textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold" fontSize="18">Ford</text>
      </svg>
    );
  }

  if (m === 'chevrolet') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="transparent" />
        {/* Chevy Bowtie */}
        <path d="M5 22 L23 22 L23 17 L55 17 L55 27 L37 27 L37 32 L5 32 Z" fill="#C9A800" />
        <path d="M5 22 L23 22 L23 27 L5 27 Z" fill="#B08800" />
        <path d="M37 27 L55 27 L55 32 L37 32 Z" fill="#B08800" />
        {/* Inner cuts */}
        <path d="M23 22 L37 22 L37 27 L23 27 Z" fill="#1A1A1A" />
      </svg>
    );
  }

  if (m === 'dodge') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="transparent" />
        {/* Dodge RAM head simplified */}
        <polygon points="10,45 30,10 50,45" fill="#CC0000" stroke="white" strokeWidth="2" />
        <polygon points="20,45 30,25 40,45" fill="#1A1A1A" />
        <text x="30" y="56" textAnchor="middle" fill="#CC0000" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="9" letterSpacing="2">DODGE</text>
      </svg>
    );
  }

  if (m === 'pontiac') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="28" r="22" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="2" />
        {/* Pontiac arrow */}
        <polygon points="30,8 38,28 30,24 22,28" fill="#CC0000" />
        <polygon points="30,24 38,28 30,48 22,28" fill="#AA0000" />
        <circle cx="30" cy="28" r="4" fill="white" />
      </svg>
    );
  }

  if (m === 'buick') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="transparent" />
        {/* Three shields */}
        <path d="M12 15 Q12 8 19 8 Q26 8 26 15 L26 35 Q19 42 19 42 Q12 35 12 35 Z" fill="#CC0000" />
        <path d="M23 15 Q23 8 30 8 Q37 8 37 15 L37 35 Q30 42 30 42 Q23 35 23 35 Z" fill="white" stroke="#C0C0C0" strokeWidth="0.5" />
        <path d="M34 15 Q34 8 41 8 Q48 8 48 15 L48 35 Q41 42 41 42 Q34 35 34 35 Z" fill="#1A1A1A" />
        <text x="30" y="54" textAnchor="middle" fill="#555" fontFamily="Georgia,serif" fontSize="8" letterSpacing="1">BUICK</text>
      </svg>
    );
  }

  if (m === 'cadillac') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Cadillac crest */}
        <rect x="10" y="10" width="40" height="40" rx="4" fill="#1A1A1A" stroke="#C9A800" strokeWidth="2" />
        <rect x="14" y="14" width="32" height="32" rx="2" fill="none" stroke="#C9A800" strokeWidth="1" />
        <rect x="18" y="18" width="10" height="10" fill="#CC0000" />
        <rect x="32" y="18" width="10" height="10" fill="white" />
        <rect x="18" y="32" width="10" height="10" fill="white" />
        <rect x="32" y="32" width="10" height="10" fill="#CC0000" />
        <line x1="10" y1="30" x2="50" y2="30" stroke="#C9A800" strokeWidth="1.5" />
        <line x1="30" y1="10" x2="30" y2="50" stroke="#C9A800" strokeWidth="1.5" />
      </svg>
    );
  }

  if (m === 'oldsmobile') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="#003087" stroke="#C0C0C0" strokeWidth="2" />
        <circle cx="30" cy="30" r="14" fill="none" stroke="white" strokeWidth="3" />
        <circle cx="30" cy="30" r="5" fill="white" />
        <line x1="30" y1="6" x2="30" y2="16" stroke="white" strokeWidth="3" />
        <line x1="30" y1="44" x2="30" y2="54" stroke="white" strokeWidth="3" />
        <line x1="6" y1="30" x2="16" y2="30" stroke="white" strokeWidth="3" />
        <line x1="44" y1="30" x2="54" y2="30" stroke="white" strokeWidth="3" />
      </svg>
    );
  }

  if (m === 'plymouth') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="transparent" />
        {/* Mayflower ship simplified */}
        <polygon points="30,5 55,40 5,40" fill="#003087" stroke="#C0C0C0" strokeWidth="1.5" />
        <rect x="28" y="40" width="4" height="12" fill="#003087" />
        <rect x="10" y="52" width="40" height="4" rx="2" fill="#003087" />
        <text x="30" y="30" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="8">PLY</text>
      </svg>
    );
  }

  if (m === 'mercury') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="transparent" />
        {/* Mercury winged helmet */}
        <ellipse cx="30" cy="32" rx="14" ry="14" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="2" />
        <path d="M10 26 Q30 14 50 26" fill="#C0C0C0" opacity="0.8" />
        <path d="M14 26 Q30 18 46 26" fill="#1A1A1A" />
        {/* Wings */}
        <path d="M5 28 Q10 20 16 28" fill="#C0C0C0" />
        <path d="M55 28 Q50 20 44 28" fill="#C0C0C0" />
        <text x="30" y="37" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="9">M</text>
      </svg>
    );
  }

  if (m === 'lincoln') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="transparent" />
        {/* Lincoln star */}
        <polygon points="30,5 34,22 52,22 38,33 43,50 30,40 17,50 22,33 8,22 26,22" fill="#1A1A1A" stroke="#C0C0C0" strokeWidth="1.5" />
        <polygon points="30,12 33,22 43,22 35,28 38,38 30,32 22,38 25,28 17,22 27,22" fill="#C0C0C0" />
      </svg>
    );
  }

  if (m === 'chrysler') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Chrysler pentastar */}
        <polygon points="30,5 36,20 52,20 40,30 45,46 30,36 15,46 20,30 8,20 24,20" fill="#003087" stroke="#C0C0C0" strokeWidth="1" />
        <polygon points="30,12 34,22 44,22 36,28 39,38 30,32 21,38 24,28 16,22 26,22" fill="white" opacity="0.3" />
        <text x="30" y="56" textAnchor="middle" fill="#003087" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="7" letterSpacing="0.5">CHRYSLER</text>
      </svg>
    );
  }

  if (m === 'packard') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="50" height="40" rx="6" fill="#4A0404" stroke="#C9A800" strokeWidth="2" />
        <text x="30" y="35" textAnchor="middle" fill="#C9A800" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold" fontSize="13">P</text>
        <rect x="10" y="14" width="40" height="32" rx="4" fill="none" stroke="#C9A800" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }

  if (m === 'studebaker') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" fill="#1A3A1A" stroke="#C0C0C0" strokeWidth="2" />
        <text x="30" y="27" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="8">STUDE</text>
        <text x="30" y="38" textAnchor="middle" fill="#AAFFAA" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="8">BAKER</text>
      </svg>
    );
  }

  if (m === 'hudson') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="12" width="50" height="36" rx="18" fill="#003366" stroke="#C0C0C0" strokeWidth="2" />
        <text x="30" y="34" textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold" fontSize="13">H</text>
      </svg>
    );
  }

  if (m === 'nash') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,5 55,50 5,50" fill="#2E4A1E" stroke="#C0C0C0" strokeWidth="2" />
        <text x="30" y="40" textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontWeight="bold" fontSize="13">N</text>
      </svg>
    );
  }

  if (m === 'willys') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="50" height="40" rx="5" fill="#4A3000" stroke="#C9A800" strokeWidth="2" />
        <text x="30" y="34" textAnchor="middle" fill="#C9A800" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="10" letterSpacing="1">WILLYS</text>
      </svg>
    );
  }

  if (m === 'desoto') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="30" rx="26" ry="22" fill="#1A0033" stroke="#C0C0C0" strokeWidth="2" />
        <text x="30" y="27" textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold" fontSize="10">De</text>
        <text x="30" y="40" textAnchor="middle" fill="#C0A0FF" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold" fontSize="10">Soto</text>
      </svg>
    );
  }

  if (m === 'imperial') {
    return (
      <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Crown */}
        <polygon points="10,40 10,22 20,30 30,15 40,30 50,22 50,40" fill="#800020" stroke="#C9A800" strokeWidth="2" />
        <rect x="10" y="40" width="40" height="6" rx="2" fill="#800020" stroke="#C9A800" strokeWidth="1.5" />
        <circle cx="20" cy="26" r="3" fill="#C9A800" />
        <circle cx="30" cy="18" r="3" fill="#C9A800" />
        <circle cx="40" cy="26" r="3" fill="#C9A800" />
      </svg>
    );
  }

  // Generic fallback
  return (
    <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="26" fill="#E85D04" stroke="white" strokeWidth="2" />
      <text x="30" y="35" textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontWeight="bold" fontSize="16">
        {make.charAt(0).toUpperCase()}
      </text>
    </svg>
  );
}
