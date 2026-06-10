import { useState, useCallback } from 'react';
import type { AuctionListing, Bid } from '@/types';
import { getAuctions, saveAuctions, generateId } from '@/lib/storage';

export function useAuctions(): {
  auctions: AuctionListing[];
  addAuction: (data: Omit<AuctionListing, 'id' | 'bids' | 'currentBid' | 'highestBidderId' | 'highestBidderUsername' | 'status'>) => AuctionListing;
  placeBid: (auctionId: string, bidderId: string, bidderUsername: string, amount: number) => { success: boolean; error?: string };
  refreshAuctions: () => void;
} {
  const [auctions, setAuctions] = useState<AuctionListing[]>(getAuctions);

  const refreshAuctions = useCallback(() => {
    setAuctions(getAuctions());
  }, []);

  const addAuction = useCallback(
    (data: Omit<AuctionListing, 'id' | 'bids' | 'currentBid' | 'highestBidderId' | 'highestBidderUsername' | 'status'>): AuctionListing => {
      const newAuction: AuctionListing = {
        ...data,
        id: generateId(),
        currentBid: data.startingBid,
        highestBidderId: '',
        highestBidderUsername: '',
        status: 'live',
        bids: [],
      };
      const updated = [newAuction, ...getAuctions()];
      saveAuctions(updated);
      setAuctions(updated);
      return newAuction;
    },
    []
  );

  const placeBid = useCallback(
    (auctionId: string, bidderId: string, bidderUsername: string, amount: number): { success: boolean; error?: string } => {
      const all = getAuctions();
      const idx = all.findIndex((a) => a.id === auctionId);
      if (idx === -1) return { success: false, error: 'Auction not found.' };
      const auction = all[idx];
      if (auction.status !== 'live') return { success: false, error: 'Auction is not active.' };
      if (Date.now() > auction.endTime) return { success: false, error: 'Auction has ended.' };
      if (amount <= auction.currentBid) {
        return { success: false, error: `Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}.` };
      }
      const bid: Bid = {
        id: generateId(),
        auctionId,
        bidderId,
        bidderUsername,
        amount,
        timestamp: Date.now(),
      };
      const updated: AuctionListing = {
        ...auction,
        currentBid: amount,
        highestBidderId: bidderId,
        highestBidderUsername: bidderUsername,
        bids: [bid, ...auction.bids],
      };
      all[idx] = updated;
      saveAuctions(all);
      setAuctions([...all]);
      return { success: true };
    },
    []
  );

  return { auctions, addAuction, placeBid, refreshAuctions };
}
