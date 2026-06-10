import { Link } from 'react-router-dom';
import { Car, Gavel, Star, Shield, Clock, TrendingUp, ChevronRight, Award } from 'lucide-react';
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
    <div className="animate-fade-in">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-vccp-dark">
        {/* Layered background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-vccp-dark via-gray-900 to-[#1a0a00]" />
          <div className="absolute inset-0 bg-hero-pattern opacity-40" />
          {/* Radial glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(232,93,4,0.12) 0%, transparent 70%)' }}
          />
          {/* Orange bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vccp-orange/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-20 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-vccp-orange/15 border border-vccp-orange/30 text-vccp-orange text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
            <Award size={12} />
            America's Premier Vintage Car Platform
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            Own a Piece of
            <span
              className="block"
              style={{ color: '#E85D04', textShadow: '0 0 60px rgba(232,93,4,0.5)' }}
            >
              Automotive History
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover, buy, sell, and auction the world's finest vintage and classic automobiles.
            Where passion meets horsepower.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="vccp-btn-primary text-base px-10 py-4 inline-flex items-center gap-2 shadow-glow-orange"
            >
              <Car size={18} /> Browse Vehicles
            </Link>
            <Link
              to="/auctions"
              className="vccp-btn-secondary text-base px-10 py-4 inline-flex items-center gap-2"
            >
              <Gavel size={18} /> Live Auctions
              <span className="w-2 h-2 rounded-full bg-vccp-orange animate-pulse" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-gray-600">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-vccp-orange/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS ═══════════════════════════ */}
      <section className="bg-vccp-charcoal border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: `${listings.length}+`, label: 'Vehicles Listed', sub: 'and growing' },
            { value: `${auctions.length}+`, label: 'Auctions Held', sub: 'since launch' },
            { value: '75+', label: 'Years Coverage', sub: '1910 — 1985' },
            { value: '18+', label: 'Iconic Makes', sub: 'American classics' },
          ].map(({ value, label, sub }) => (
            <div key={label} className="text-center py-4 border-r border-white/5 last:border-0">
              <p
                className="text-3xl md:text-4xl font-black text-vccp-orange"
                style={{ textShadow: '0 0 20px rgba(232,93,4,0.4)' }}
              >
                {value}
              </p>
              <p className="text-white text-sm font-semibold mt-1">{label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ LIVE AUCTIONS ═══════════════════════════ */}
      {liveAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vccp-orange/15 flex items-center justify-center">
                <Gavel className="text-vccp-orange" size={20} />
              </div>
              <div>
                <h2 className="vccp-section-title">Live Auctions</h2>
                <p className="text-gray-500 text-sm">Bid now — auctions closing soon</p>
              </div>
              <span className="bg-vccp-orange text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                LIVE
              </span>
            </div>
            <Link
              to="/auctions"
              className="text-vccp-orange hover:text-vccp-orange-dark text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAuctions.map((a) => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {/* ═══════════════════════════ BROWSE BY MAKE ═══════════════════════════ */}
      <section className="py-16 bg-gradient-to-b from-white to-vccp-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-vccp-orange/15 flex items-center justify-center">
              <Car className="text-vccp-orange" size={20} />
            </div>
            <div>
              <h2 className="vccp-section-title">Browse by Make</h2>
              <p className="text-gray-500 text-sm">Explore legendary American manufacturers</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MAKES_FEATURED.map((make) => (
              <Link
                key={make.name}
                to={`/listings?make=${make.name}`}
                className="group bg-white border border-gray-100 rounded-2xl p-4 text-center hover:border-vccp-orange/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-orange-50 transition-colors overflow-hidden">
                  <MakeLogo make={make.name} className="w-14 h-14" />
                </div>
                <div>
                  <p className="font-bold text-sm text-vccp-dark group-hover:text-vccp-orange transition-colors">{make.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{make.years}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FEATURED LISTINGS ═══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vccp-orange/15 flex items-center justify-center">
              <Star className="text-vccp-orange" size={20} />
            </div>
            <div>
              <h2 className="vccp-section-title">Featured Listings</h2>
              <p className="text-gray-500 text-sm">Hand-picked collector vehicles</p>
            </div>
          </div>
          <Link
            to="/listings"
            className="text-vccp-orange hover:text-vccp-orange-dark text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* ═══════════════════════════ WHY VCCP ═══════════════════════════ */}
      <section className="bg-vccp-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(232,93,4,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-black text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose{' '}
              <span className="text-vccp-orange" style={{ textShadow: '0 0 30px rgba(232,93,4,0.4)' }}>VCCP?</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">The most trusted platform for serious classic car collectors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trusted Platform',
                desc: 'Verified listings and authenticated sellers ensure you\'re dealing with genuine classic car enthusiasts.',
              },
              {
                icon: Gavel,
                title: 'Live Auctions',
                desc: 'Real-time bidding with countdown timers and reserve prices for a transparent auction experience.',
              },
              {
                icon: TrendingUp,
                title: 'Market Insight',
                desc: 'Track auction results and listing prices to understand the true market value of collector vehicles.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/8 rounded-2xl p-8 text-center hover:bg-white/8 hover:border-vccp-orange/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-vccp-orange/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-vccp-orange/25 transition-colors">
                  <Icon className="text-vccp-orange" size={26} />
                </div>
                <h3 className="font-bold text-lg text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SELL CTA ═══════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #E85D04 0%, #FF7A2F 50%, #C44D00 100%)',
            boxShadow: '0 20px 60px rgba(232,93,4,0.35)',
          }}
        >
          {/* Inner pattern */}
          <div className="absolute inset-0 bg-hero-pattern opacity-20" />
          <div
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
          <div
            className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full"
            style={{ background: 'rgba(0,0,0,0.1)' }}
          />

          <div className="relative z-10 py-14 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <Clock className="text-orange-200" size={20} />
                <span className="text-orange-200 text-sm font-medium uppercase tracking-wider">List your classic today</span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
              >
                Ready to Sell Your Classic?
              </h2>
              <p className="text-orange-100 text-base max-w-lg">
                List your vintage car for sale or run a live auction — it's free to get started.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/sell"
                className="bg-vccp-dark text-white font-bold px-8 py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Car size={16} /> List For Sale
              </Link>
              <Link
                to="/auctions/create"
                className="bg-white text-vccp-orange font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Gavel size={16} /> Create Auction
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
