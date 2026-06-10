export type CarCondition = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Parts Only';
export type TransmissionType = 'Manual' | 'Automatic' | 'Semi-Automatic';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
export type BodyStyle =
  | 'Sedan'
  | 'Coupe'
  | 'Convertible'
  | 'Roadster'
  | 'Station Wagon'
  | 'Pickup Truck'
  | 'SUV'
  | 'Van'
  | 'Hatchback'
  | 'Other';

export type CarListing = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: CarCondition;
  transmission: TransmissionType;
  fuelType: FuelType;
  bodyStyle: BodyStyle;
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
  status: 'upcoming' | 'live' | 'ended' | 'sold' | 'no_sale';
  bids: Bid[];
};

export type Bid = {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderUsername: string;
  amount: number;
  timestamp: number;
};

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
