import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Gavel, Clock, TrendingUp } from 'lucide-react';
import type { AuctionListing } from '@/types';
import clsx from 'clsx';

type AuctionCardProps = { auction: AuctionListing };

function useCountdown(endTime: number) {
  const calc = () => {
    const diff = endTime - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true };
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { h, m, s, expired: false };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  return time;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const time = useCountdown(auction.endTime);
  const isLive = auction.status === 'live' && !time.expired;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Link to={`/auctions/${auction.id}`} className="block">
      <div className={clsx('vccp-card', isLive && 'border-2 border-vccp-orange')}>
        <div className="h-44 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">
          {auction.car.images.length > 0 ? (
            <img src={auction.car.images[0]} alt={`${auction.car.year} ${auction.car.make}`} className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 120 60" className="w-28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 40 L20 20 L40 15 L80 15 L100 20 L110 40 L10 40Z" fill="#E85D04" opacity="0.4" stroke="#E85D04" strokeWidth="2" />
              <circle cx="30" cy="42" r="8" fill="#1A1A1A" stroke="#E85D04" strokeWidth="2" />
              <circle cx="30" cy="42" r="4" fill="#E85D04" />
              <circle cx="90" cy="42" r="8" fill="#1A1A1A" stroke="#E85D04" strokeWidth="2" />
              <circle cx="90" cy="42" r="4" fill="#E85D04" />
            </svg>
          )}
          <div className="absolute top-2 left-2">
            <span className={clsx('text-xs font-bold px-2 py-1 rounded-full', isLive ? 'bg-vccp-orange text-white animate-pulse' : 'bg-gray-500 text-white')}>
              {isLive ? '● LIVE' : 'ENDED'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-1">
            {auction.car.year} {auction.car.make} {auction.car.model}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><TrendingUp size={11} /> Highest Bid</p>
              <p className="text-vccp-orange font-bold text-xl">${auction.currentBid.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 flex items-center gap-1 justify-end"><Gavel size={11} /> {auction.bids.length} bids</p>
              {isLive ? (
                <div className="flex items-center gap-1 text-vccp-orange font-mono font-bold text-sm">
                  <Clock size={12} />
                  {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
                </div>
              ) : (
                <span className="text-gray-400 text-xs">Auction Ended</span>
              )}
            </div>
          </div>
          {isLive && time.h === 0 && time.m < 10 && (
            <p className="text-xs text-vccp-orange font-semibold">⚡ Ending soon!</p>
          )}
        </div>
      </div>
    </Link>
  );
}
