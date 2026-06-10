export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'both';
  createdAt: number;
};

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
};

export type CarListing = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Parts Only';
  transmission: 'Manual' | 'Automatic' | 'Semi-Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
  bodyStyle: 'Sedan' | 'Coupe' | 'Convertible' | 'Roadster' | 'Station Wagon' | 'Pickup Truck' | 'SUV' | 'Van' | 'Hatchback' | 'Other';
  color: string;
  engineSize: string;
  horsepower: string;
  vin: string;
  description: string;
  location: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  images: string[];
  features: string[];
  createdAt: number;
  isAuction: boolean;
};

export type Bid = {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderUsername: string;
  amount: number;
  timestamp: number;
};

export type AuctionListing = {
  id: string;
  carId: string;
  car: CarListing;
  sellerId: string;
  sellerUsername: string;
  reservePrice: number;
  startingBid: number;
  currentBid: number;
  highestBidderId: string;
  highestBidderUsername: string;
  durationHours: number;
  startTime: number;
  endTime: number;
  status: 'live' | 'ended' | 'cancelled';
  bids: Bid[];
};
