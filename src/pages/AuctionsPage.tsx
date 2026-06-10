import { useState } from 'react';
import AuctionCard from '@/components/AuctionCard';
import type { AuctionListing } from '@/types';
import { Gavel, Clock, CheckCircle, Plus } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

type AuctionsPageProps = { auctions: AuctionListing[] };

type Tab = 'all' | 'live' | 'ended';

export default function AuctionsPage({ auctions }: AuctionsPageProps) {
  const [tab, setTab] = useState<Tab>('live');

  const now = Date.now();
  const filtered = auctions.filter((a) => {
    if (tab === 'live') return a.status === 'live' && a.endTime > now;
    if (tab === 'ended') return a.status === 'ended' || a.endTime <= now;
    return true;
  });

  const liveCount = auctions.filter((a) => a.status === 'live' && a.endTime > now).length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-vccp-orange text-xs font-semibold uppercase tracking-widest mb-2">
            <Gavel size={12} /> Auction Platform
          </div>
          <h1
            className="text-4xl font-black text-vccp-dark flex items-center gap-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Live Auctions
            {liveCount > 0 && (
              <span className="text-sm bg-vccp-orange text-white px-3 py-1 rounded-full font-bold animate-pulse">
                {liveCount} LIVE
              </span>
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {liveCount} live auction{liveCount !== 1 ? 's' : ''} in progress
          </p>
        </div>
        <Link to="/auctions/create" className="vccp-btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={16} /> Create Auction
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {([
          { key: 'live', label: `Live (${liveCount})`, icon: Clock, color: 'text-red-500' },
          { key: 'all', label: 'All Auctions', icon: Gavel, color: 'text-gray-500' },
          { key: 'ended', label: 'Ended', icon: CheckCircle, color: 'text-gray-400' },
        ] as { key: Tab; label: string; icon: React.ElementType; color: string }[]).map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={clsx(
              'flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              tab === key
                ? 'bg-vccp-orange text-white shadow-md shadow-vccp-orange/30'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-vccp-orange/40 hover:text-vccp-orange'
            )}
          >
            <Icon size={13} className={tab === key ? 'text-white' : color} />
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">{tab === 'live' ? '🔨' : '📋'}</span>
          </div>
          <p className="text-xl font-bold text-gray-700 mb-2">
            No {tab === 'live' ? 'live' : tab === 'ended' ? 'ended' : ''} auctions found.
          </p>
          {tab === 'live' && (
            <p className="text-sm text-gray-500 mt-2">
              <Link to="/auctions/create" className="text-vccp-orange hover:underline font-semibold">Create the first auction →</Link>
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => <AuctionCard key={a.id} auction={a} />)}
        </div>
      )}
    </div>
  );
}
