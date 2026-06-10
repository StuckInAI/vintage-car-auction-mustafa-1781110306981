import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import clsx from 'clsx';

const MAKES = [
  'Ford', 'Chevrolet', 'Dodge', 'Pontiac', 'Buick', 'Cadillac',
  'Oldsmobile', 'Plymouth', 'Mercury', 'Packard', 'Studebaker',
  'Hudson', 'Nash', 'Willys', 'DeSoto', 'Lincoln', 'Imperial', 'Chrysler',
];

const YEARS = Array.from({ length: 76 }, (_, i) => 1910 + i);

export type Filters = {
  query: string;
  make: string;
  yearFrom: string;
  yearTo: string;
  priceMin: string;
  priceMax: string;
  condition: string;
  transmission: string;
  bodyStyle: string;
  fuelType: string;
  color: string;
  mileageMax: string;
};

const defaultFilters: Filters = {
  query: '', make: '', yearFrom: '', yearTo: '',
  priceMin: '', priceMax: '', condition: '',
  transmission: '', bodyStyle: '', fuelType: '', color: '', mileageMax: '',
};

type SearchFiltersProps = {
  onFilter: (f: Filters) => void;
  initialFilters?: Partial<Filters>;
};

export default function SearchFilters({ onFilter, initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, ...initialFilters });
  const [expanded, setExpanded] = useState(false);

  function update(key: keyof Filters, value: string) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilter(next);
  }

  function reset() {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search make, model, year..."
            className="vccp-input pl-9"
            value={filters.query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('query', e.target.value)}
          />
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={clsx('flex items-center gap-1 px-3 py-2 rounded border text-sm font-medium transition-colors',
            expanded ? 'bg-vccp-gold text-vccp-dark border-vccp-gold' : 'border-gray-300 text-gray-600 hover:border-vccp-gold'
          )}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <button onClick={reset} className="text-gray-400 hover:text-red-500 transition-colors px-2">
          <X size={16} />
        </button>
      </div>

      {expanded && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
          <div>
            <label className="vccp-label">Make</label>
            <select className="vccp-input" value={filters.make} onChange={(e: any) => update('make', e.target.value)}>
              <option value="">All Makes</option>
              {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Year From</label>
            <select className="vccp-input" value={filters.yearFrom} onChange={(e: any) => update('yearFrom', e.target.value)}>
              <option value="">Any</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Year To</label>
            <select className="vccp-input" value={filters.yearTo} onChange={(e: any) => update('yearTo', e.target.value)}>
              <option value="">Any</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Min Price ($)</label>
            <input type="number" className="vccp-input" placeholder="0" value={filters.priceMin} onChange={(e: any) => update('priceMin', e.target.value)} />
          </div>
          <div>
            <label className="vccp-label">Max Price ($)</label>
            <input type="number" className="vccp-input" placeholder="Any" value={filters.priceMax} onChange={(e: any) => update('priceMax', e.target.value)} />
          </div>
          <div>
            <label className="vccp-label">Condition</label>
            <select className="vccp-input" value={filters.condition} onChange={(e: any) => update('condition', e.target.value)}>
              <option value="">Any</option>
              {['Excellent','Good','Fair','Poor','Parts Only'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Transmission</label>
            <select className="vccp-input" value={filters.transmission} onChange={(e: any) => update('transmission', e.target.value)}>
              <option value="">Any</option>
              {['Manual','Automatic','Semi-Automatic'].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Body Style</label>
            <select className="vccp-input" value={filters.bodyStyle} onChange={(e: any) => update('bodyStyle', e.target.value)}>
              <option value="">Any</option>
              {['Sedan','Coupe','Convertible','Roadster','Station Wagon','Pickup Truck','SUV','Van','Hatchback','Other'].map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Fuel Type</label>
            <select className="vccp-input" value={filters.fuelType} onChange={(e: any) => update('fuelType', e.target.value)}>
              <option value="">Any</option>
              {['Petrol','Diesel','Electric','Hybrid','Other'].map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="vccp-label">Color</label>
            <input type="text" className="vccp-input" placeholder="Any color" value={filters.color} onChange={(e: any) => update('color', e.target.value)} />
          </div>
          <div>
            <label className="vccp-label">Max Mileage</label>
            <input type="number" className="vccp-input" placeholder="Any" value={filters.mileageMax} onChange={(e: any) => update('mileageMax', e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}
