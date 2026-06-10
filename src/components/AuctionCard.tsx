import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Gavel, Clock, TrendingUp, Flame } from 'lucide-react';
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
  const endingSoon = isLive && time.h === 0 && time.m < 10;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Link to={`/auctions/${auction.id}`} className="block group">
      <div
        className={clsx(
          'vccp-card',
          isLive && 'ring-2 ring-vccp-orange/60 ring-offset-1',
          endingSoon && 'ring-red-500/70'
        )}
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
          {auction.car.images.length > 0 ? (
            <img
              src={auction.car.images[0]}
              alt={`${auction.car.year} ${auction.car.make}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-hero-pattern opacity-20" />
              <svg viewBox="0 0 120 60" className="w-32 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 42 L18 20 L36 14 L84 14 L102 20 L112 42 Z" fill="#E85D04" opacity="0.3" stroke="#E85D04" strokeWidth="1.5" />
                <circle cx="28" cy="46" r="9" fill="#111" stroke="#E85D04" strokeWidth="2" />
                <circle cx="28" cy="46" r="4" fill="#E85D04" />
                <circle cx="92" cy="46" r="9" fill="#111" stroke="#E85D04" strokeWidth="2" />
                <circle cx="92" cy="46" r="4" fill="#E85D04" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            {isLive ? (
              <span className="flex items-center gap-1 bg-vccp-orange text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="bg-gray-600/80 backdrop-blur-sm text-gray-200 text-xs font-bold px-2.5 py-1 rounded-full">
                ENDED
              </span>
            )}
          </div>

          {/* Bids count */}
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              <Gavel size={10} /> {auction.bids.length} bids
            </span>
          </div>

          {/* Timer overlay at bottom */}
          {isLive && (
            <div className="absolute bottom-3 right-3">
              <span className={clsx(
                'flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-sm',
                endingSoon
                  ? 'bg-red-500/90 text-white'
                  : 'bg-black/60 text-vccp-orange'
              )}>
                <Clock size={10} />
                {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-vccp-orange transition-colors">
            {auction.car.year} {auction.car.make} {auction.car.model}
          </h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                <TrendingUp size={9} /> Highest Bid
              </p>
              <p className="text-vccp-orange font-black text-2xl leading-none">
                ${auction.currentBid.toLocaleString()}
              </p>
            </div>
            {endingSoon && (
              <div className="flex items-center gap-1 text-red-500 text-xs font-bold animate-pulse">
                <Flame size={13} /> Ending Soon!
              </div>
            )}
            {!isLive && (
              <span className="text-gray-400 text-xs font-medium bg-gray-100 px-2.5 py-1 rounded-full">Ended</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
