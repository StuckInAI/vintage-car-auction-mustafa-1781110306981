import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters, { type Filters } from '@/components/SearchFilters';
import CarCard from '@/components/CarCard';
import MakeLogo from '@/components/MakeLogo';
import type { CarListing } from '@/types';
import { Grid, List, SortAsc, Search } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-vccp-orange text-xs font-semibold uppercase tracking-widest mb-2">
          <Search size={12} /> Browse Vehicles
        </div>
        <h1
          className="text-4xl font-black text-vccp-dark"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Cars For Sale
        </h1>
        <p className="text-gray-500 mt-1">
          <span className="font-semibold text-vccp-orange">{filtered.length}</span> vehicles found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 sticky top-20">
            <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest">Browse by Make</h3>
            <ul className="space-y-1">
              <li>
                <button
                  className={clsx(
                    'w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all',
                    !filters.make
                      ? 'bg-vccp-orange text-white shadow-md'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-vccp-orange'
                  )}
                  onClick={() => setFilters((f) => ({ ...f, make: '' }))}
                >
                  All Makes
                </button>
              </li>
              {byMake.map(([make, count]) => (
                <li key={make}>
                  <button
                    className={clsx(
                      'w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between gap-2 text-sm',
                      filters.make === make
                        ? 'bg-vccp-orange text-white shadow-md'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-vccp-orange'
                    )}
                    onClick={() => setFilters((f) => ({ ...f, make }))}
                  >
                    <span className="flex items-center gap-2">
                      <span className={clsx('w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center', filters.make === make ? 'bg-white/20' : 'bg-gray-50')}>
                        <MakeLogo make={make} className="w-7 h-7" />
                      </span>
                      <span>{make}</span>
                    </span>
                    <span className={clsx(
                      'text-[10px] rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center',
                      filters.make === make ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                    )}>{count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <SearchFilters onFilter={setFilters} initialFilters={{ make: initMake }} />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SortAsc size={15} className="text-gray-400" />
              <select
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-vccp-orange bg-white shadow-sm"
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
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setView('grid')}
                className={clsx('p-2 rounded-lg transition-all', view === 'grid' ? 'bg-white shadow-sm text-vccp-orange' : 'text-gray-400 hover:text-gray-600')}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={clsx('p-2 rounded-lg transition-all', view === 'list' ? 'bg-white shadow-sm text-vccp-orange' : 'text-gray-400 hover:text-gray-600')}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🚗</span>
              </div>
              <p className="text-xl font-bold text-gray-700 mb-2">No vehicles found</p>
              <p className="text-sm">Try adjusting your search criteria.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((car) => <ListRow key={car.id} car={car} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListRow({ car }: { car: CarListing }) {
  return (
    <a
      href={`/listings/${car.id}`}
      className="bg-white rounded-2xl border border-gray-100 flex gap-4 p-4 hover:shadow-card-hover transition-all hover:border-vccp-orange/40 group"
    >
      <div className="w-28 h-22 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
        {car.images.length > 0 ? (
          <img src={car.images[0]} alt="car" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="text-3xl">🚗</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 group-hover:text-vccp-orange transition-colors">{car.year} {car.make} {car.model}</p>
        <p className="text-vccp-orange font-black text-xl mt-0.5">${car.price.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-1">{car.mileage.toLocaleString()} mi · {car.transmission} · {car.condition} · {car.location}</p>
        <div className="flex gap-1.5 mt-2">
          <span className="text-[11px] bg-orange-50 text-vccp-orange px-2 py-0.5 rounded-full border border-orange-200/60">{car.bodyStyle}</span>
          <span className="text-[11px] bg-orange-50 text-vccp-orange px-2 py-0.5 rounded-full border border-orange-200/60">{car.color}</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center">
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">{car.condition}</span>
      </div>
    </a>
  );
}
