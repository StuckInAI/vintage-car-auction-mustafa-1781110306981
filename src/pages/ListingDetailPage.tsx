import { useParams, Link } from 'react-router-dom';
import { MapPin, Gauge, Settings, Fuel, Palette, Star, Phone, Mail, CheckCircle, ChevronLeft } from 'lucide-react';
import type { CarListing } from '@/types';

type Props = { listings: CarListing[] };

export default function ListingDetailPage({ listings }: Props) {
  const { id } = useParams<{ id: string }>();
  const car = listings.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold mb-2">Listing Not Found</h2>
        <Link to="/listings" className="text-vccp-gold hover:underline">← Back to listings</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Make', value: car.make },
    { label: 'Model', value: car.model },
    { label: 'Year', value: car.year },
    { label: 'Body Style', value: car.bodyStyle },
    { label: 'Condition', value: car.condition },
    { label: 'Mileage', value: `${car.mileage.toLocaleString()} miles` },
    { label: 'Transmission', value: car.transmission },
    { label: 'Fuel Type', value: car.fuelType },
    { label: 'Engine', value: car.engineSize },
    { label: 'Horsepower', value: car.horsepower },
    { label: 'Color', value: car.color },
    { label: 'VIN', value: car.vin },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/listings" className="flex items-center gap-1 text-gray-500 hover:text-vccp-gold text-sm mb-6 transition-colors">
        <ChevronLeft size={16} /> Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-600 h-80 flex items-center justify-center mb-3">
            {car.images.length > 0 ? (
              <img src={car.images[0]} alt="car" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <svg viewBox="0 0 200 100" className="w-64 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 70 L35 30 L70 22 L130 22 L165 30 L185 70 L15 70Z" fill="#C9A84C" opacity="0.3" stroke="#C9A84C" strokeWidth="3" />
                  <circle cx="50" cy="75" r="14" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="3" />
                  <circle cx="50" cy="75" r="7" fill="#C9A84C" />
                  <circle cx="150" cy="75" r="14" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="3" />
                  <circle cx="150" cy="75" r="7" fill="#C9A84C" />
                  <rect x="60" y="28" width="80" height="35" rx="4" fill="#C9A84C" opacity="0.4" />
                </svg>
                <p className="text-gray-300 mt-2">No photos uploaded</p>
              </div>
            )}
          </div>

          {/* Title & price */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold font-serif text-vccp-dark">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Gauge size={13} />{car.mileage.toLocaleString()} miles</span>
                  <span className="flex items-center gap-1"><Settings size={13} />{car.transmission}</span>
                  <span className="flex items-center gap-1"><Fuel size={13} />{car.fuelType}</span>
                  <span className="flex items-center gap-1"><Palette size={13} />{car.color}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} />{car.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-vccp-gold">${car.price.toLocaleString()}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-semibold">{car.condition}</span>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-bold text-vccp-dark mb-4 font-serif">Vehicle Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.label} className="bg-vccp-cream rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
                  <p className="font-semibold text-sm text-vccp-dark mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {car.features.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h2 className="text-lg font-bold text-vccp-dark mb-4 font-serif">Features & Options</h2>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-vccp-dark mb-3 font-serif">Description</h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
          </div>
        </div>

        {/* Right column — seller info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-vccp-gold" size={18} />
              <h3 className="font-bold text-vccp-dark">Seller Information</h3>
            </div>
            <p className="font-semibold text-gray-900 mb-1">{car.sellerName}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mb-1"><MapPin size={12} />{car.location}</p>
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${car.sellerPhone}`}
                className="flex items-center gap-2 bg-vccp-gold text-vccp-dark font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-yellow-500 transition-colors w-full justify-center"
              >
                <Phone size={14} /> {car.sellerPhone}
              </a>
              <a
                href={`mailto:${car.sellerEmail}`}
                className="flex items-center gap-2 bg-vccp-charcoal text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors w-full justify-center"
              >
                <Mail size={14} /> Email Seller
              </a>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">Listed on {new Date(car.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-400 mt-0.5">VIN: {car.vin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
