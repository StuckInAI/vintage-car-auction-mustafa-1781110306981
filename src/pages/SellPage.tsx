import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Gavel, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import type { CarListing, AuctionListing, AuthState } from '@/types';

type SellPageProps = {
  auth: AuthState;
  addListing: (data: Omit<CarListing, 'id' | 'createdAt'>) => CarListing;
  addAuction: (data: Omit<AuctionListing, 'id' | 'bids' | 'currentBid' | 'highestBidderId' | 'highestBidderUsername' | 'status'>) => AuctionListing;
};

const MAKES = [
  'Ford', 'Chevrolet', 'Dodge', 'Pontiac', 'Buick', 'Cadillac',
  'Oldsmobile', 'Plymouth', 'Mercury', 'Packard', 'Studebaker',
  'Hudson', 'Nash', 'Willys', 'DeSoto', 'Lincoln', 'Imperial', 'Chrysler',
];

const YEARS = Array.from({ length: 76 }, (_, i) => 1910 + i);

const FEATURE_POOL = [
  'Original Paint', 'Numbers Matching', 'Frame-Off Restoration', 'Power Steering',
  'Power Brakes', 'Air Conditioning', 'AM/FM Radio', '8-Track Player',
  'Chrome Wheels', 'Bucket Seats', 'Bench Seats', 'Leather Interior',
  'Vinyl Top', 'Side Exhaust', 'Dual Exhaust', 'Fuel Injection',
  'Positraction', 'Disc Brakes', '4-Speed Transmission', 'Factory Options',
];

type FormData = {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  condition: string;
  transmission: string;
  fuelType: string;
  bodyStyle: string;
  color: string;
  engineSize: string;
  horsepower: string;
  vin: string;
  description: string;
  location: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  features: string[];
  listingType: 'sale' | 'auction';
  startingBid: string;
  reservePrice: string;
  durationHours: string;
};

const empty: FormData = {
  make: '', model: '', year: '', price: '', mileage: '',
  condition: 'Good', transmission: 'Manual', fuelType: 'Petrol',
  bodyStyle: 'Sedan', color: '', engineSize: '', horsepower: '',
  vin: '', description: '', location: '', sellerName: '',
  sellerPhone: '', sellerEmail: '', features: [],
  listingType: 'sale', startingBid: '', reservePrice: '', durationHours: '24',
};

export default function SellPage({ auth, addListing, addAuction }: SellPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [newId, setNewId] = useState('');

  function set(key: keyof FormData, value: string | string[]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleFeature(f: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));
  }

  function handleSubmit() {
    const carData: Omit<CarListing, 'id' | 'createdAt'> = {
      make: form.make,
      model: form.model,
      year: parseInt(form.year) || 1970,
      price: form.listingType === 'sale' ? (parseInt(form.price) || 0) : 0,
      mileage: parseInt(form.mileage) || 0,
      condition: form.condition as CarListing['condition'],
      transmission: form.transmission as CarListing['transmission'],
      fuelType: form.fuelType as CarListing['fuelType'],
      bodyStyle: form.bodyStyle as CarListing['bodyStyle'],
      color: form.color,
      engineSize: form.engineSize,
      horsepower: form.horsepower,
      vin: form.vin,
      description: form.description,
      location: form.location,
      sellerName: form.sellerName || auth.user?.username || 'Anonymous',
      sellerPhone: form.sellerPhone,
      sellerEmail: form.sellerEmail || auth.user?.email || '',
      images: [],
      features: form.features,
      isAuction: form.listingType === 'auction',
    };

    if (form.listingType === 'sale') {
      const listing = addListing(carData);
      setNewId(listing.id);
    } else {
      const now = Date.now();
      const duration = parseInt(form.durationHours) || 24;
      const auctionData: Omit<AuctionListing, 'id' | 'bids' | 'currentBid' | 'highestBidderId' | 'highestBidderUsername' | 'status'> = {
        carId: '',
        car: { ...carData, id: '', createdAt: now },
        sellerId: auth.user?.id || 'anonymous',
        sellerUsername: auth.user?.username || 'Anonymous',
        reservePrice: parseInt(form.reservePrice) || 0,
        startingBid: parseInt(form.startingBid) || 1000,
        durationHours: duration,
        startTime: now,
        endTime: now + duration * 3600000,
      };
      const auction = addAuction(auctionData);
      setNewId(auction.id);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={60} />
        <h2 className="text-2xl font-bold font-serif text-vccp-dark mb-2">
          {form.listingType === 'sale' ? 'Listing Created!' : 'Auction Created!'}
        </h2>
        <p className="text-gray-500 mb-6">
          Your {form.listingType === 'sale' ? 'listing' : 'auction'} has been submitted successfully.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(form.listingType === 'sale' ? `/listings/${newId}` : `/auctions`)}
            className="vccp-btn-primary"
          >
            View {form.listingType === 'sale' ? 'Listing' : 'Auction'}
          </button>
          <button onClick={() => { setSubmitted(false); setForm(empty); setStep(1); }} className="vccp-btn-secondary">
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold font-serif text-vccp-dark mb-2">Sell Your Classic Car</h1>
      <p className="text-gray-500 text-sm mb-8">Fill in the details to list your vehicle for sale or auction.</p>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s ? 'bg-vccp-gold text-vccp-dark' : 'bg-gray-200 text-gray-400'
            }`}>{s}</div>
            {s < 4 && <div className={`h-1 w-12 sm:w-20 ${ step > s ? 'bg-vccp-gold' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <div className="ml-4 text-sm text-gray-500">
          {step === 1 && 'Listing Type'}
          {step === 2 && 'Vehicle Details'}
          {step === 3 && 'Features & Description'}
          {step === 4 && 'Contact & Review'}
        </div>
      </div>

      {/* Step 1: listing type */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-vccp-dark">How would you like to sell?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => { set('listingType', 'sale'); setStep(2); }}
              className={`border-2 rounded-xl p-6 text-left transition-all ${
                form.listingType === 'sale' ? 'border-vccp-gold bg-vccp-cream' : 'border-gray-200 hover:border-vccp-gold'
              }`}
            >
              <Car size={32} className="text-vccp-gold mb-2" />
              <h3 className="font-bold text-lg">Fixed Price Sale</h3>
              <p className="text-sm text-gray-500 mt-1">Set a price and sell directly to interested buyers.</p>
            </button>
            <button
              onClick={() => { set('listingType', 'auction'); setStep(2); }}
              className={`border-2 rounded-xl p-6 text-left transition-all ${
                form.listingType === 'auction' ? 'border-vccp-gold bg-vccp-cream' : 'border-gray-200 hover:border-vccp-gold'
              }`}
            >
              <Gavel size={32} className="text-vccp-gold mb-2" />
              <h3 className="font-bold text-lg">Live Auction</h3>
              <p className="text-sm text-gray-500 mt-1">Let buyers compete in a timed bidding auction.</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: vehicle details */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-vccp-dark">Vehicle Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="vccp-label">Make *</label>
              <select className="vccp-input" value={form.make} onChange={(e) => set('make', e.target.value)}>
                <option value="">Select Make</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Model *</label>
              <input className="vccp-input" placeholder="e.g. Mustang" value={form.model} onChange={(e) => set('model', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Year *</label>
              <select className="vccp-input" value={form.year} onChange={(e) => set('year', e.target.value)}>
                <option value="">Select Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Color</label>
              <input className="vccp-input" placeholder="e.g. Cherry Red" value={form.color} onChange={(e) => set('color', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Mileage</label>
              <input type="number" className="vccp-input" placeholder="Miles" value={form.mileage} onChange={(e) => set('mileage', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Condition</label>
              <select className="vccp-input" value={form.condition} onChange={(e) => set('condition', e.target.value)}>
                {['Excellent','Good','Fair','Poor','Parts Only'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Transmission</label>
              <select className="vccp-input" value={form.transmission} onChange={(e) => set('transmission', e.target.value)}>
                {['Manual','Automatic','Semi-Automatic'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Body Style</label>
              <select className="vccp-input" value={form.bodyStyle} onChange={(e) => set('bodyStyle', e.target.value)}>
                {['Sedan','Coupe','Convertible','Roadster','Station Wagon','Pickup Truck','SUV','Van','Hatchback','Other'].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Fuel Type</label>
              <select className="vccp-input" value={form.fuelType} onChange={(e) => set('fuelType', e.target.value)}>
                {['Petrol','Diesel','Electric','Hybrid','Other'].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="vccp-label">Engine Size</label>
              <input className="vccp-input" placeholder="e.g. 5.7L" value={form.engineSize} onChange={(e) => set('engineSize', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Horsepower</label>
              <input className="vccp-input" placeholder="e.g. 300 hp" value={form.horsepower} onChange={(e) => set('horsepower', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">VIN</label>
              <input className="vccp-input" placeholder="Vehicle Identification Number" value={form.vin} onChange={(e) => set('vin', e.target.value)} />
            </div>
          </div>

          {form.listingType === 'sale' && (
            <div>
              <label className="vccp-label">Asking Price ($) *</label>
              <input type="number" className="vccp-input" placeholder="e.g. 25000" value={form.price} onChange={(e) => set('price', e.target.value)} />
            </div>
          )}
          {form.listingType === 'auction' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="vccp-label">Starting Bid ($) *</label>
                <input type="number" className="vccp-input" placeholder="e.g. 5000" value={form.startingBid} onChange={(e) => set('startingBid', e.target.value)} />
              </div>
              <div>
                <label className="vccp-label">Reserve Price ($)</label>
                <input type="number" className="vccp-input" placeholder="Minimum acceptable" value={form.reservePrice} onChange={(e) => set('reservePrice', e.target.value)} />
              </div>
              <div>
                <label className="vccp-label">Duration (hours)</label>
                <select className="vccp-input" value={form.durationHours} onChange={(e) => set('durationHours', e.target.value)}>
                  {['1','2','6','12','24','48','72'].map((h) => <option key={h} value={h}>{h}h</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: features & description */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-vccp-dark">Features & Description</h2>
          <div>
            <label className="vccp-label">Features & Options</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
              {FEATURE_POOL.map((feat) => (
                <label key={feat} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.features.includes(feat)}
                    onChange={() => toggleFeature(feat)}
                    className="accent-vccp-gold"
                  />
                  {feat}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="vccp-label">Description</label>
            <textarea
              className="vccp-input h-36 resize-none"
              placeholder="Describe your vehicle's history, condition, and any notable features..."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>
          <div>
            <label className="vccp-label">Location</label>
            <input className="vccp-input" placeholder="City, State" value={form.location} onChange={(e) => set('location', e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 4: contact & review */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-vccp-dark">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="vccp-label">Your Name</label>
              <input className="vccp-input" placeholder="Full name" value={form.sellerName} onChange={(e) => set('sellerName', e.target.value)} />
            </div>
            <div>
              <label className="vccp-label">Phone</label>
              <input className="vccp-input" placeholder="(555) 000-0000" value={form.sellerPhone} onChange={(e) => set('sellerPhone', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="vccp-label">Email</label>
              <input type="email" className="vccp-input" placeholder="your@email.com" value={form.sellerEmail} onChange={(e) => set('sellerEmail', e.target.value)} />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-vccp-cream border border-vccp-gold rounded-xl p-4 mt-4">
            <h3 className="font-bold text-vccp-dark mb-3">Listing Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-500">Vehicle:</span> <span className="font-semibold">{form.year} {form.make} {form.model}</span></div>
              <div><span className="text-gray-500">Type:</span> <span className="font-semibold capitalize">{form.listingType}</span></div>
              {form.listingType === 'sale' && <div><span className="text-gray-500">Price:</span> <span className="font-semibold">${parseInt(form.price || '0').toLocaleString()}</span></div>}
              {form.listingType === 'auction' && <div><span className="text-gray-500">Starting Bid:</span> <span className="font-semibold">${parseInt(form.startingBid || '0').toLocaleString()}</span></div>}
              <div><span className="text-gray-500">Condition:</span> <span className="font-semibold">{form.condition}</span></div>
              <div><span className="text-gray-500">Location:</span> <span className="font-semibold">{form.location || '—'}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="vccp-btn-secondary flex items-center gap-1">
            <ChevronLeft size={16} /> Back
          </button>
        ) : <div />}
        {step < 4 ? (
          <button onClick={() => setStep(step + 1)} className="vccp-btn-primary flex items-center gap-1">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} className="vccp-btn-primary flex items-center gap-1">
            <CheckCircle size={16} /> Submit Listing
          </button>
        )}
      </div>
    </div>
  );
}
