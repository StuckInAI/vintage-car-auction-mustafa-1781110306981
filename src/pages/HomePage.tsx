import { Link } from 'react-router-dom';
import { Car, Gavel, Star, Shield, Clock, TrendingUp } from 'lucide-react';
import CarCard from '@/components/CarCard';
import AuctionCard from '@/components/AuctionCard';
import MakeLogo from '@/components/MakeLogo';
import type { CarListing, AuctionListing } from '@/types';
import Logo from '@/components/Logo';

type HomePageProps = {
  listings: CarListing[];
  auctions: AuctionListing[];
};

const MAKES_FEATURED = [
  { name: 'Ford', years: '1928–1985' },
  { name: 'Chevrolet', years: '1930–1985' },
  { name: 'Dodge', years: '1935–1985' },
  { name: 'Pontiac', years: '1935–1985' },
  { name: 'Cadillac', years: '1930–1985' },
  { name: 'Buick', years: '1930–1985' },
  { name: 'Oldsmobile', years: '1935–1985' },
  { name: 'Plymouth', years: '1935–1985' },
  { name: 'Mercury', years: '1938–1985' },
  { name: 'Lincoln', years: '1930–1985' },
  { name: 'Chrysler', years: '1930–1985' },
  { name: 'Packard', years: '1899–1958' },
];

export default function HomePage({ listings, auctions }: HomePageProps) {
  const featured = listings.slice(0, 6);
  const liveAuctions = auctions.filter((a) => a.status === 'live' && a.endTime > Date.now()).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-vccp-dark via-gray-900 to-vccp-charcoal text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-vccp-orange mt-4 mb-3 tracking-wide">
            Vintage Car Collector Portal
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover, buy, sell, and auction the world's finest vintage and classic automobiles.
            Where passion meets horsepower.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings" className="vccp-btn-primary text-base px-8 py-3 inline-block">
              Browse Vehicles
            </Link>
            <Link to="/auctions" className="vccp-btn-secondary text-base px-8 py-3 inline-block">
              Live Auctions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-vccp-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-vccp-orange text-2xl font-bold">{listings.length}+</p>
            <p className="text-gray-400 text-sm">Vehicles Listed</p>
          </div>
          <div>
            <p className="text-vccp-orange text-2xl font-bold">{auctions.length}+</p>
            <p className="text-gray-400 text-sm">Auctions Held</p>
          </div>
          <div>
            <p className="text-vccp-orange text-2xl font-bold">75+</p>
            <p className="text-gray-400 text-sm">Years Coverage</p>
          </div>
          <div>
            <p className="text-vccp-orange text-2xl font-bold">18+</p>
            <p className="text-gray-400 text-sm">Iconic Makes</p>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      {liveAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Gavel className="text-vccp-orange" size={22} />
              <h2 className="text-2xl font-bold font-serif text-vccp-dark">Live Auctions</h2>
              <span className="bg-vccp-orange text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse ml-1">LIVE</span>
            </div>
            <Link to="/auctions" className="text-vccp-orange hover:underline text-sm font-semibold">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAuctions.map((a) => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {/* Browse by Make */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Car className="text-vccp-orange" size={22} />
            <h2 className="text-2xl font-bold font-serif text-vccp-dark">Browse by Make</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MAKES_FEATURED.map((make) => (
              <Link
                key={make.name}
                to={`/listings?make=${make.name}`}
                className="bg-white border-2 border-orange-100 rounded-xl p-4 text-center hover:border-vccp-orange hover:shadow-md transition-all group flex flex-col items-center gap-2"
              >
                <MakeLogo make={make.name} className="w-14 h-14" />
                <div>
                  <p className="font-bold text-sm text-vccp-dark group-hover:text-vccp-orange transition-colors">{make.name}</p>
                  <p className="text-xs text-gray-400">{make.years}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Star className="text-vccp-orange" size={22} />
            <h2 className="text-2xl font-bold font-serif text-vccp-dark">Featured Listings</h2>
          </div>
          <Link to="/listings" className="text-vccp-orange hover:underline text-sm font-semibold">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* Why VCCP */}
      <section className="bg-vccp-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-serif text-vccp-orange text-center mb-8">Why Choose VCCP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="text-vccp-orange mx-auto mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Trusted Platform</h3>
              <p className="text-gray-400 text-sm">Verified listings and authenticated sellers ensure you're dealing with genuine classic car enthusiasts.</p>
            </div>
            <div className="text-center">
              <Gavel className="text-vccp-orange mx-auto mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Live Auctions</h3>
              <p className="text-gray-400 text-sm">Real-time bidding with countdown timers and reserve prices for a transparent auction experience.</p>
            </div>
            <div className="text-center">
              <TrendingUp className="text-vccp-orange mx-auto mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Market Insight</h3>
              <p className="text-gray-400 text-sm">Track auction results and listing prices to understand the true market value of collector vehicles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-gradient-to-r from-vccp-orange to-vccp-orange-light rounded-2xl p-10">
          <Clock className="text-white mx-auto mb-3" size={40} />
          <h2 className="text-3xl font-bold font-serif text-white mb-3">Ready to Sell Your Classic?</h2>
          <p className="text-orange-100 mb-6 text-base">List your vintage car for sale or run a live auction — it's free to get started.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/sell" className="bg-vccp-dark text-white font-bold px-8 py-3 rounded hover:bg-gray-800 transition-colors">
              List For Sale
            </Link>
            <Link to="/auctions/create" className="bg-white text-vccp-orange font-bold px-8 py-3 rounded hover:bg-orange-50 transition-colors">
              Create Auction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
