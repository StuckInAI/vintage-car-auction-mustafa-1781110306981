import { Link } from 'react-router-dom';
import { MapPin, Gauge, Settings, Zap } from 'lucide-react';
import type { CarListing } from '@/types';

type CarCardProps = { car: CarListing };

const CONDITION_STYLES: Record<string, string> = {
  Excellent: 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30',
  Good: 'bg-sky-500/15 text-sky-700 border border-sky-500/30',
  Fair: 'bg-amber-500/15 text-amber-700 border border-amber-500/30',
  Poor: 'bg-red-500/15 text-red-700 border border-red-500/30',
  'Parts Only': 'bg-gray-500/15 text-gray-600 border border-gray-500/30',
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link to={`/listings/${car.id}`} className="block group">
      <div className="vccp-card">
        {/* Image area */}
        <div className="relative h-52 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
          {car.images.length > 0 ? (
            <img
              src={car.images[0]}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* Decorative bg */}
              <div className="absolute inset-0 bg-hero-pattern opacity-30" />
              <svg viewBox="0 0 160 80" className="w-40 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id={`cg-${car.id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF7A2F" />
                    <stop offset="100%" stopColor="#C44D00" />
                  </linearGradient>
                </defs>
                <path d="M12 58 L24 28 L50 20 L110 20 L136 28 L148 58 Z" fill={`url(#cg-${car.id})`} opacity="0.25" />
                <path d="M12 58 L24 28 L50 20 L110 20 L136 28 L148 58 Z" fill="none" stroke="#E85D04" strokeWidth="1.5" opacity="0.6" />
                <circle cx="40" cy="63" r="11" fill="#111" stroke="#E85D04" strokeWidth="2" />
                <circle cx="40" cy="63" r="5" fill="#E85D04" opacity="0.8" />
                <circle cx="120" cy="63" r="11" fill="#111" stroke="#E85D04" strokeWidth="2" />
                <circle cx="120" cy="63" r="5" fill="#E85D04" opacity="0.8" />
                <rect x="52" y="24" width="56" height="26" rx="3" fill="#E85D04" opacity="0.18" />
                <line x1="80" y1="22" x2="80" y2="50" stroke="#E85D04" strokeWidth="1" opacity="0.3" />
              </svg>
              <p className="text-gray-500 text-xs mt-3 relative z-10 tracking-wider uppercase">No Photo</p>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Condition badge */}
          <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${CONDITION_STYLES[car.condition] || CONDITION_STYLES['Fair']}`}>
            {car.condition}
          </span>
          {/* Year badge */}
          <span className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {car.year}
          </span>
          {/* Price overlay */}
          <span className="absolute bottom-3 right-3 text-white text-sm font-black bg-vccp-orange/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            ${car.price.toLocaleString()}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-2 group-hover:text-vccp-orange transition-colors">
            {car.year} {car.make} {car.model}
          </h3>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Gauge size={11} className="text-vccp-orange flex-shrink-0" />
              {car.mileage.toLocaleString()} mi
            </span>
            <span className="flex items-center gap-1.5">
              <Settings size={11} className="text-vccp-orange flex-shrink-0" />
              {car.transmission}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-vccp-orange flex-shrink-0" />
              {car.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={11} className="text-vccp-orange flex-shrink-0" />
              {car.fuelType}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[11px] bg-orange-50 text-vccp-orange-dark px-2.5 py-0.5 rounded-full border border-orange-200/60 font-medium">
              {car.bodyStyle}
            </span>
            <span className="text-[11px] bg-orange-50 text-vccp-orange-dark px-2.5 py-0.5 rounded-full border border-orange-200/60 font-medium">
              {car.color}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
