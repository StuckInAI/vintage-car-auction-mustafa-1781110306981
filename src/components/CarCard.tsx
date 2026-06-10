import { Link } from 'react-router-dom';
import { MapPin, Gauge, Settings, Star } from 'lucide-react';
import type { CarListing } from '@/types';

type CarCardProps = { car: CarListing };

export default function CarCard({ car }: CarCardProps) {
  const conditionColor: Record<string, string> = {
    Excellent: 'bg-green-100 text-green-800',
    Good: 'bg-blue-100 text-blue-800',
    Fair: 'bg-yellow-100 text-yellow-800',
    Poor: 'bg-red-100 text-red-800',
    'Parts Only': 'bg-gray-100 text-gray-800',
  };

  return (
    <Link to={`/listings/${car.id}`} className="block">
      <div className="vccp-card">
        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center relative">
          {car.images.length > 0 ? (
            <img src={car.images[0]} alt={`${car.year} ${car.make} ${car.model}`} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <svg viewBox="0 0 120 60" className="w-32 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 40 L20 20 L40 15 L80 15 L100 20 L110 40 L10 40Z" fill="#C9A84C" opacity="0.3" stroke="#C9A84C" strokeWidth="2" />
                <circle cx="30" cy="42" r="8" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="2" />
                <circle cx="30" cy="42" r="4" fill="#C9A84C" />
                <circle cx="90" cy="42" r="8" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="2" />
                <circle cx="90" cy="42" r="4" fill="#C9A84C" />
                <rect x="35" y="20" width="50" height="18" rx="2" fill="#C9A84C" opacity="0.4" />
              </svg>
              <p className="text-gray-400 text-xs mt-2">No Photo</p>
            </div>
          )}
          <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${conditionColor[car.condition] || 'bg-gray-100 text-gray-800'}`}>
            {car.condition}
          </span>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 text-sm leading-tight">
              {car.year} {car.make} {car.model}
            </h3>
            <Star size={14} className="text-vccp-gold flex-shrink-0 mt-0.5" />
          </div>
          <p className="text-vccp-gold font-bold text-lg mb-2">${car.price.toLocaleString()}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Gauge size={12} />{car.mileage.toLocaleString()} mi</span>
            <span className="flex items-center gap-1"><Settings size={12} />{car.transmission}</span>
            <span className="flex items-center gap-1"><MapPin size={12} />{car.location}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-xs bg-vccp-cream text-vccp-dark px-2 py-0.5 rounded border border-gray-200">{car.bodyStyle}</span>
            <span className="text-xs bg-vccp-cream text-vccp-dark px-2 py-0.5 rounded border border-gray-200">{car.color}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
