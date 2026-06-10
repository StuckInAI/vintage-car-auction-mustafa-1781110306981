import { useState, useCallback } from 'react';
import type { CarListing } from '@/types';
import { getListings, saveListings, generateId } from '@/lib/storage';

export function useListings(): {
  listings: CarListing[];
  addListing: (data: Omit<CarListing, 'id' | 'createdAt'>) => CarListing;
  refreshListings: () => void;
} {
  const [listings, setListings] = useState<CarListing[]>(getListings);

  const refreshListings = useCallback(() => {
    setListings(getListings());
  }, []);

  const addListing = useCallback((data: Omit<CarListing, 'id' | 'createdAt'>): CarListing => {
    const newListing: CarListing = {
      ...data,
      id: generateId(),
      createdAt: Date.now(),
    };
    const updated = [newListing, ...getListings()];
    saveListings(updated);
    setListings(updated);
    return newListing;
  }, []);

  return { listings, addListing, refreshListings };
}
