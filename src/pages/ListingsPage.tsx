import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters, { type Filters } from '@/components/SearchFilters';
import CarCard from '@/components/CarCard';
import MakeLogo from '@/components/MakeLogo';
import type { CarListing } from '@/types';
import { Grid, List, SortAsc } from 'lucide-react';
import clsx from 'clsx';

type ListingsPageProps = { listings: CarListing[] };

type SortKey = 'price_asc' | 'price_desc' | 'year_asc' | 'year_desc' | 'mileage_asc' | 'newest';

export default function ListingsPage({ listings }: ListingsPageProps) {
  const [searchParams] = useSearchParams();
  const initMake = searchParams.get('make') || '';

  const [filters, setFilters] = useState<Filters>({
    query: '', make: initMake, yearFrom: '', yearTo: '',
    priceMin: '', priceMax: '', condition: '',
    transmission: '', bodyStyle: '', fuelType: '', color: '', mileageMax: '',
  });
  const [sort, setSort] = useState<SortKey>('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const make = searchParams.get('make') || '';
    if (make) setFilters((f) => ({ ...f, make }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...listings];
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          String(c.year).includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    if (filters.make) result = result.filter((c) => c.make === filters.make);
    if (filters.yearFrom) result = result.filter((c) => c.year >= parseInt(filters.yearFrom));
    if (filters.yearTo) result = result.filter((c) => c.year <= parseInt(filters.yearTo));
    if (filters.priceMin) result = result.filter((c) => c.price >= parseInt(filters.priceMin));
    if (filters.priceMax) result = result.filter((c) => c.price <= parseInt(filters.priceMax));
    if (filters.condition) result = result.filter((c) => c.condition === filters.condition);
    if (filters.transmission) result = result.filter((c) => c.transmission === filters.transmission);
    if (filters.bodyStyle) result = result.filter((c) => c.bodyStyle === filters.bodyStyle);
    if (filters.fuelType) result = result.filter((c) => c.fuelType === filters.fuelType);
    if (filters.color) result = result.filter((c) => c.color.toLowerCase().includes(filters.color.toLowerCase()));
    if (filters.mileageMax) result = result.filter((c) => c.mileage <= parseInt(filters.mileageMax));

    switch (sort) {
      case 'price_asc': return result.sort((a, b) => a.price - b.price);
      case 'price_desc': return result.sort((a, b) => b.price - a.price);
      case 'year_asc': return result.sort((a, b) => a.year - b.year);
      case 'year_desc': return result.sort((a, b) => b.year - a.year);
      case 'mileage_asc': return result.sort((a, b) => a.mileage - b.mileage);
      case 'newest': return result.sort((a, b) => b.createdAt - a.createdAt);
      default: return result;
    }
  }, [listings, filters, sort]);

  const byMake = useMemo(() => {
    const map: Record<string, number> = {};
    listings.forEach((c) => { map[c.make] = (map[c.make] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [listings]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-serif text-vccp-dark mb-2">Cars For Sale</h1>
      <p className="text-gray-500 text-sm mb-6">{filtered.length} vehicles found</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-60 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-20">
            <h3 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">Browse by Make</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  className={clsx('w-full text-left px-2 py-1 rounded transition-colors', !filters.make ? 'bg-vccp-orange text-white font-semibold' : 'text-gray-600 hover:bg-gray-50')}
                  onClick={() => setFilters((f) => ({ ...f, make: '' }))}
                >
                  All Makes
                </button>
              </li>
              {byMake.map(([make, count]) => (
                <li key={make}>
                  <button
                    className={clsx('w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between gap-2', filters.make === make ? 'bg-vccp-orange text-white font-semibold' : 'text-gray-600 hover:bg-orange-50')}
                    onClick={() => setFilters((f) => ({ ...f, make }))}
                  >
                    <span className="flex items-center gap-2">
                      <MakeLogo make={make} className="w-6 h-6 flex-shrink-0" />
                      <span>{make}</span>
                    </span>
                    <span className={clsx('text-xs rounded-full px-1.5 py-0.5', filters.make === make ? 'bg-white text-vccp-orange' : 'bg-gray-100 text-gray-500')}>{count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <SearchFilters onFilter={setFilters} initialFilters={{ make: initMake }} />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SortAsc size={16} className="text-gray-400" />
              <select
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-vccp-orange"
                value={sort}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortKey)}
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_asc">Year: Oldest First</option>
                <option value="year_desc">Year: Newest First</option>
                <option value="mileage_asc">Lowest Mileage</option>
              </select>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setView('grid')} className={clsx('p-1.5 rounded', view === 'grid' ? 'bg-vccp-orange text-white' : 'text-gray-400 hover:bg-gray-100')}><Grid size={16} /></button>
              <button onClick={() => setView('list')} className={clsx('p-1.5 rounded', view === 'list' ? 'bg-vccp-orange text-white' : 'text-gray-400 hover:bg-gray-100')}><List size={16} /></button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">🚗</p>
              <p className="text-lg font-semibold">No vehicles match your filters.</p>
              <p className="text-sm">Try adjusting your search criteria.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((car) => (
                <ListRow key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListRow({ car }: { car: CarListing }) {
  return (
    <a href={`/listings/${car.id}`} className="bg-white rounded-xl border border-gray-200 flex gap-4 p-4 hover:shadow-md transition-shadow hover:border-vccp-orange">
      <div className="w-24 h-20 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg flex-shrink-0 flex items-center justify-center">
        {car.images.length > 0 ? (
          <img src={car.images[0]} alt="car" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-2xl">🚗</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900">{car.year} {car.make} {car.model}</p>
        <p className="text-vccp-orange font-bold text-lg">${car.price.toLocaleString()}</p>
        <p className="text-xs text-gray-500">{car.mileage.toLocaleString()} mi · {car.transmission} · {car.condition} · {car.location}</p>
      </div>
    </a>
  );
}
