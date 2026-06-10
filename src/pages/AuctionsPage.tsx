import { useState } from 'react';
import AuctionCard from '@/components/AuctionCard';
import type { AuctionListing } from '@/types';
import { Gavel, Clock, CheckCircle } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-vccp-dark flex items-center gap-2">
            <Gavel className="text-vccp-gold" size={28} /> Auctions
          </h1>
          <p className="text-gray-500 text-sm mt-1">{liveCount} live auction{liveCount !== 1 ? 's' : ''} in progress</p>
        </div>
        <Link to="/auctions/create" className="vccp-btn-primary flex items-center gap-2">
          <Gavel size={16} /> Create Auction
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(['all', 'live', 'ended'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'px-4 py-1.5 rounded-md text-sm font-semibold transition-colors capitalize flex items-center gap-1',
              tab === t ? 'bg-white text-vccp-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t === 'live' && <Clock size={13} className="text-red-500" />}
            {t === 'ended' && <CheckCircle size={13} className="text-gray-400" />}
            {t === 'all' && <Gavel size={13} />}
            {t === 'live' ? `Live (${liveCount})` : t === 'ended' ? 'Ended' : 'All'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">{tab === 'live' ? '🔨' : '📋'}</p>
          <p className="text-lg font-semibold">No {tab === 'live' ? 'live' : tab === 'ended' ? 'ended' : ''} auctions found.</p>
          {tab === 'live' && (
            <p className="text-sm mt-2">
              <Link to="/auctions/create" className="text-vccp-gold hover:underline">Create the first auction →</Link>
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
