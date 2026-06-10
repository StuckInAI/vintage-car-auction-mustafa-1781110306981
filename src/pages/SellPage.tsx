import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Upload } from 'lucide-react';
import type { CarListing, AuthState } from '@/types';

type SellPageProps = {
  auth: AuthState;
  onAddListing: (data: Omit<CarListing, 'id' | 'createdAt'>) => CarListing;
};

const FEATURE_OPTIONS = [
  'Original Paint', 'Numbers Matching', 'Frame-Off Restoration', 'Power Steering',
  'Power Brakes', 'Air Conditioning', 'AM/FM Radio', '8-Track Player',
  'Chrome Wheels', 'Bucket Seats', 'Bench Seats', 'Leather Interior',
  'Vinyl Top', 'Side Exhaust', 'Dual Exhaust', 'Fuel Injection',
  'Positraction', 'Disc Brakes', '4-Speed Transmission', 'Factory Options',
  'Original Engine', 'Rebuilt Engine', 'New Paint', 'New Interior',
  'New Tires', 'Frame-On Restoration', 'Power Windows', 'Power Locks',
];

const MAKES = [
  'Ford', 'Chevrolet', 'Dodge', 'Pontiac', 'Buick', 'Cadillac',
  'Oldsmobile', 'Plymouth', 'Mercury', 'Packard', 'Studebaker',
  'Hudson', 'Nash', 'Willys', 'DeSoto', 'Lincoln', 'Imperial', 'Chrysler',
  'American Motors', 'Crosley', 'Kaiser', 'Frazer', 'Tucker', 'Other',
];

const YEARS = Array.from({ length: 76 }, (_, i) => 1910 + i);

type FormData = {
  make: string; model: string; year: string; price: string;
  mileage: string; condition: string; transmission: string;
  fuelType: string; bodyStyle: string; color: string;
  engineSize: string; horsepower: string; vin: string;
  description: string; location: string; sellerName: string;
  sellerPhone: string; sellerEmail: string;
  driveType: string; doors: string; cylinders: string;
  interiorColor: string; roofType: string;
};

const defaultForm: FormData = {
  make: '', model: '', year: '', price: '', mileage: '',
  condition: '', transmission: '', fuelType: '', bodyStyle: '',
  color: '', engineSize: '', horsepower: '', vin: '',
  description: '', location: '', sellerName: '', sellerPhone: '', sellerEmail: '',
  driveType: '', doors: '', cylinders: '', interiorColor: '', roofType: '',
};

export default function SellPage({ auth, onAddListing }: SellPageProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!auth.isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🔒</p>
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-6">You must be logged in to list a car for sale.</p>
        <a href="/auth/login" className="vccp-btn-primary">Login</a>
      </div>
    );
  }

  function set(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  }

  function toggleFeature(f: string) {
    setFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  }

  function addCustomFeature() {
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures((prev) => [...prev, customFeature.trim()]);
      setCustomFeature('');
    }
  }

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (!form.make) e.make = 'Required';
    if (!form.model) e.model = 'Required';
    if (!form.year) e.year = 'Required';
    if (!form.price) e.price = 'Required';
    if (!form.condition) e.condition = 'Required';
    if (!form.bodyStyle) e.bodyStyle = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (!form.sellerName) e.sellerName = 'Required';
    if (!form.sellerEmail) e.sellerEmail = 'Required';
    if (!form.location) e.location = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validateStep2()) return;
    const listing: Omit<CarListing, 'id' | 'createdAt'> = {
      make: form.make,
      model: form.model,
      year: parseInt(form.year) || 1960,
      price: parseInt(form.price) || 0,
      mileage: parseInt(form.mileage) || 0,
      condition: form.condition as CarListing['condition'] || 'Good',
      transmission: form.transmission as CarListing['transmission'] || 'Manual',
      fuelType: form.fuelType as CarListing['fuelType'] || 'Petrol',
      bodyStyle: form.bodyStyle as CarListing['bodyStyle'] || 'Sedan',
      color: form.color,
      engineSize: form.engineSize,
      horsepower: form.horsepower,
      vin: form.vin,
      description: form.description,
      location: form.location,
      sellerName: form.sellerName || auth.user?.username || '',
      sellerPhone: form.sellerPhone,
      sellerEmail: form.sellerEmail || auth.user?.email || '',
      images: [],
      features,
      isAuction: false,
    };
    const newListing = onAddListing(listing);
    setSubmitted(true);
    setTimeout(() => navigate(`/listings/${newListing.id}`), 1500);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Listing Created!</h2>
        <p className="text-gray-500">Redirecting to your listing...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-serif text-vccp-dark mb-2">List Your Car For Sale</h1>
      <p className="text-gray-500 text-sm mb-8">Fill in the details below to create your listing.</p>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s ? 'bg-vccp-gold text-vccp-dark' :
              step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>{step > s ? '✓' : s}</div>
            <span className={`text-sm hidden sm:block ${step === s ? 'text-vccp-dark font-semibold' : 'text-gray-400'}`}>
              {s === 1 ? 'Vehicle Info' : s === 2 ? 'Seller Info' : 'Features'}
            </span>
            {s < 3 && <div className="w-8 h-0.5 bg-gray-200" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-5 font-serif">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="vccp-label">Make *</label>
              <select className="vccp-input" value={form.make} onChange={(e: any) => set('make', e.target.value)}>
                <option value="">Select Make</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make}</p>}
            </div>
            <div>
              <label className="vccp-label">Model *</label>
              <input type="text" className="vccp-input" placeholder="e.g. Mustang" value={form.model} onChange={(e: any) => set('model', e.target.value)} />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>
            <div>
              <label className="vccp-label">Year *</label>
              <select className="vccp-input" value={form.year} onChange={(e: any) => set('year', e.target.value)}>
                <option value="">Select Year</option>
                {YEARS.slice().reverse().map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>
            <div>
              <label className="vccp-label">Asking Price ($) *</label>
              <input type="number" className="vccp-input" placeholder="e.g. 45000" value={form.price} onChange={(e: any) => set('price', e.target.value)} />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="vccp-label">Mileage</label>
              <input type="number" className="vccp-input" placeholder="e.g. 75000" value={form.mileage} onChange={(e: any) => set('mileage', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Condition *</label>
              <select className="vccp-input" value={form.condition} onChange={(e: any) => set('condition', e.target.value)}>
                <option value="">Select Condition</option>
                {['Excellent','Good','Fair','Poor','Parts Only'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
            </div>
            <div>
              <label className="vccp-label">Body Style *</label>
              <select className="vccp-input" value={form.bodyStyle} onChange={(e: any) => set('bodyStyle', e.target.value)}>
                <option value="">Select Body Style</option>
                {['Sedan','Coupe','Convertible','Roadster','Station Wagon','Pickup Truck','SUV','Van','Hatchback','Other'].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.bodyStyle && <p className="text-red-500 text-xs mt-1">{errors.bodyStyle}</p>}
            </div>
            <div>
              <label className="vccp-label">Transmission</label>
              <select className="vccp-input" value={form.transmission} onChange={(e: any) => set('transmission', e.target.value)}>
                <option value="">Select Transmission</option>
                {['Manual','Automatic','Semi-Automatic'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Fuel Type</label>
              <select className="vccp-input" value={form.fuelType} onChange={(e: any) => set('fuelType', e.target.value)}>
                <option value="">Select Fuel Type</option>
                {['Petrol','Diesel','Electric','Hybrid','Other'].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Exterior Color</label>
              <input type="text" className="vccp-input" placeholder="e.g. Candy Apple Red" value={form.color} onChange={(e: any) => set('color', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Interior Color</label>
              <input type="text" className="vccp-input" placeholder="e.g. Black Leather" value={form.interiorColor} onChange={(e: any) => set('interiorColor', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Engine Size</label>
              <input type="text" className="vccp-input" placeholder="e.g. 5.7L V8" value={form.engineSize} onChange={(e: any) => set('engineSize', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Horsepower</label>
              <input type="text" className="vccp-input" placeholder="e.g. 350 hp" value={form.horsepower} onChange={(e: any) => set('horsepower', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Cylinders</label>
              <select className="vccp-input" value={form.cylinders} onChange={(e: any) => set('cylinders', e.target.value)}>
                <option value="">Select</option>
                {['4','6','8','10','12','16'].map((c) => <option key={c} value={c}>{c} cylinders</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Drive Type</label>
              <select className="vccp-input" value={form.driveType} onChange={(e: any) => set('driveType', e.target.value)}>
                <option value="">Select</option>
                {['RWD','FWD','AWD','4WD'].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Doors</label>
              <select className="vccp-input" value={form.doors} onChange={(e: any) => set('doors', e.target.value)}>
                <option value="">Select</option>
                {['2','4','3 (Hatchback)','5 (Hatchback)'].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Roof Type</label>
              <select className="vccp-input" value={form.roofType} onChange={(e: any) => set('roofType', e.target.value)}>
                <option value="">Select</option>
                {['Hard Top','Soft Top','T-Top','Targa','Sunroof','Moonroof','None'].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">VIN</label>
              <input type="text" className="vccp-input" placeholder="Vehicle Identification Number" value={form.vin} onChange={(e: any) => set('vin', e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="vccp-label">Description</label>
            <textarea
              className="vccp-input"
              rows={4}
              placeholder="Describe your vehicle — history, restoration work, special features..."
              value={form.description}
              onChange={(e: any) => set('description', e.target.value)}
            />
          </div>
          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Upload className="text-gray-300 mx-auto mb-2" size={28} />
            <p className="text-sm text-gray-400">Photo upload available after listing creation</p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => { if (validateStep1()) setStep(2); }}
              className="vccp-btn-primary"
            >
              Next: Seller Info →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-5 font-serif">Seller Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="vccp-label">Your Name *</label>
              <input type="text" className="vccp-input" value={form.sellerName || auth.user?.username || ''} onChange={(e: any) => set('sellerName', e.target.value)} />
              {errors.sellerName && <p className="text-red-500 text-xs mt-1">{errors.sellerName}</p>}
            </div>
            <div>
              <label className="vccp-label">Phone Number</label>
              <input type="tel" className="vccp-input" placeholder="(555) 123-4567" value={form.sellerPhone} onChange={(e: any) => set('sellerPhone', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Email *</label>
              <input type="email" className="vccp-input" value={form.sellerEmail || auth.user?.email || ''} onChange={(e: any) => set('sellerEmail', e.target.value)} />
              {errors.sellerEmail && <p className="text-red-500 text-xs mt-1">{errors.sellerEmail}</p>}
            </div>
            <div>
              <label className="vccp-label">Location *</label>
              <input type="text" className="vccp-input" placeholder="City, State" value={form.location} onChange={(e: any) => set('location', e.target.value)} />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)} className="vccp-btn-secondary">← Back</button>
            <button onClick={() => { if (validateStep2()) setStep(3); }} className="vccp-btn-primary">Next: Features →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-5 font-serif">Features & Options</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {FEATURE_OPTIONS.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.includes(f)}
                  onChange={() => toggleFeature(f)}
                  className="rounded text-vccp-gold accent-yellow-500"
                />
                {f}
              </label>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="vccp-input"
              placeholder="Add custom feature..."
              value={customFeature}
              onChange={(e: any) => setCustomFeature(e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && addCustomFeature()}
            />
            <button onClick={addCustomFeature} className="vccp-btn-primary flex items-center gap-1">
              <Plus size={14} /> Add
            </button>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {features.map((f) => (
                <span key={f} className="bg-vccp-gold text-vccp-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  {f}
                  <button onClick={() => toggleFeature(f)}><X size={12} /></button>
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(2)} className="vccp-btn-secondary">← Back</button>
            <button onClick={handleSubmit} className="vccp-btn-primary">🚗 Submit Listing</button>
          </div>
        </div>
      )}
    </div>
  );
}
