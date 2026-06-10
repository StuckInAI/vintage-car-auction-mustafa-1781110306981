import type { CarListing, AuctionListing, User } from '@/types';

const KEYS = {
  users: 'vccp_users',
  listings: 'vccp_listings',
  auctions: 'vccp_auctions',
  currentUser: 'vccp_current_user',
};

export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.users) || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(KEYS.currentUser);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(KEYS.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.currentUser);
  }
}

export function getListings(): CarListing[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.listings) || '[]');
  } catch {
    return [];
  }
}

export function saveListings(listings: CarListing[]): void {
  localStorage.setItem(KEYS.listings, JSON.stringify(listings));
}

export function getAuctions(): AuctionListing[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.auctions) || '[]');
  } catch {
    return [];
  }
}

export function saveAuctions(auctions: AuctionListing[]): void {
  localStorage.setItem(KEYS.auctions, JSON.stringify(auctions));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}
