import { useParams, Link } from 'react-router-dom';
import { MapPin, Gauge, Settings, Fuel, Palette, Phone, Mail, CheckCircle, ChevronLeft, Calendar, Hash } from 'lucide-react';
import type { CarListing } from '@/types';

type Props = { listings: CarListing[] };

export default function ListingDetailPage({ listings }: Props) {
  const { id } = useParams<{ id: string }>();
  const car = listings.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🔍</span>
        </div>
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Listing Not Found</h2>
        <Link to="/listings" className="text-vccp-orange hover:underline font-medium">← Back to listings</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Make', value: car.make, icon: null },
    { label: 'Model', value: car.model, icon: null },
    { label: 'Year', value: String(car.year), icon: Calendar },
    { label: 'Body Style', value: car.bodyStyle, icon: null },
    { label: 'Condition', value: car.condition, icon: null },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} miles`, icon: Gauge },
    { label: 'Transmission', value: car.transmission, icon: Settings },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Engine', value: car.engineSize, icon: null },
    { label: 'Horsepower', value: car.horsepower, icon: null },
    { label: 'Color', value: car.color, icon: Palette },
    { label: 'VIN', value: car.vin, icon: Hash },
  ];

  const conditionColor: Record<string, string> = {
    Excellent: 'bg-emerald-100 text-emerald-800',
    Good: 'bg-sky-100 text-sky-800',
    Fair: 'bg-amber-100 text-amber-800',
    Poor: 'bg-red-100 text-red-800',
    'Parts Only': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Link
        to="/listings"
        className="inline-flex items-center gap-1.5 text-gray-500 hover:text-vccp-orange text-sm mb-8 transition-colors group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero image */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 h-96 flex items-center justify-center relative shadow-2xl">
            {car.images.length > 0 ? (
              <img src={car.images[0]} alt="car" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center relative z-10">
                <div className="absolute inset-0 -z-10 bg-hero-pattern opacity-20" />
                <svg viewBox="0 0 220 110" className="w-72 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 80 L30 35 L65 22 L155 22 L190 35 L206 80 Z" fill="#E85D04" opacity="0.18" stroke="#E85D04" strokeWidth="2" />
                  <circle cx="52" cy="87" r="18" fill="#111" stroke="#E85D04" strokeWidth="3" />
                  <circle cx="52" cy="87" r="9" fill="#E85D04" opacity="0.8" />
                  <circle cx="168" cy="87" r="18" fill="#111" stroke="#E85D04" strokeWidth="3" />
                  <circle cx="168" cy="87" r="9" fill="#E85D04" opacity="0.8" />
                  <rect x="68" y="28" width="84" height="44" rx="5" fill="#E85D04" opacity="0.15" />
                </svg>
                <p className="text-gray-400 mt-3 text-sm tracking-wider uppercase">No photos available</p>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Condition badge overlay */}
            <div className="absolute top-5 right-5">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${conditionColor[car.condition] || conditionColor['Fair']}`}>
                {car.condition}
              </span>
            </div>
          </div>

          {/* Title & quick stats */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <p className="text-vccp-orange text-xs font-semibold uppercase tracking-widest mb-1">{car.make}</p>
                <h1
                  className="text-3xl font-black text-vccp-dark"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {car.year} {car.model}
                </h1>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Gauge size={14} className="text-vccp-orange" />{car.mileage.toLocaleString()} miles</span>
                  <span className="flex items-center gap-1.5"><Settings size={14} className="text-vccp-orange" />{car.transmission}</span>
                  <span className="flex items-center gap-1.5"><Fuel size={14} className="text-vccp-orange" />{car.fuelType}</span>
                  <span className="flex items-center gap-1.5"><Palette size={14} className="text-vccp-orange" />{car.color}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-vccp-orange" />{car.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-4xl font-black text-vccp-orange"
                  style={{ textShadow: '0 0 20px rgba(232,93,4,0.3)' }}
                >
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-gray-400 text-xs mt-1">Asking Price</p>
              </div>
            </div>
          </div>

          {/* Specs grid */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <h2
              className="text-xl font-black text-vccp-dark mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specs.map((s) => (
                <div key={s.label} className="bg-vccp-cream border border-orange-100/60 rounded-xl p-3.5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{s.label}</p>
                  <p className="font-bold text-sm text-vccp-dark mt-1">{s.value || '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {car.features.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
              <h2
                className="text-xl font-black text-vccp-dark mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Features & Options
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700 bg-gray-50 rounded-xl px-3.5 py-2.5">
                    <CheckCircle size={14} className="text-vccp-orange flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <h2
              className="text-xl font-black text-vccp-dark mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Seller's Description
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
          </div>
        </div>

        {/* Right column — seller info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-24">
            {/* Price */}
            <div className="bg-gradient-to-br from-vccp-orange to-vccp-orange-light rounded-xl p-5 text-white mb-6 text-center">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Asking Price</p>
              <p className="text-4xl font-black" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                ${car.price.toLocaleString()}
              </p>
              <p className="text-xs opacity-80 mt-1">{car.condition} Condition</p>
            </div>

            {/* Seller */}
            <div className="mb-5">
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-3">Seller</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-vccp-orange/15 flex items-center justify-center">
                  <span className="text-vccp-orange font-bold text-lg">{car.sellerName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{car.sellerName}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{car.location}</p>
                </div>
              </div>
            </div>

            {/* Contact buttons */}
            <div className="space-y-3">
              <a
                href={`tel:${car.sellerPhone}`}
                className="flex items-center justify-center gap-2 bg-vccp-orange text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-vccp-orange-dark transition-all shadow-md hover:shadow-lg w-full"
              >
                <Phone size={15} /> {car.sellerPhone || 'Call Seller'}
              </a>
              <a
                href={`mailto:${car.sellerEmail}`}
                className="flex items-center justify-center gap-2 bg-vccp-dark text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-vccp-charcoal transition-all w-full"
              >
                <Mail size={15} /> Email Seller
              </a>
            </div>

            {/* Meta */}
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-1">
              <p className="text-xs text-gray-400">Listed: {new Date(car.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              {car.vin && <p className="text-xs text-gray-400 font-mono">VIN: {car.vin}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
