import type { CarListing, AuctionListing, User } from '@/types';
import { getListings, saveListings, getAuctions, saveAuctions, getUsers, saveUsers, generateId } from '@/lib/storage';

const VINTAGE_MAKES = [
  'Ford', 'Chevrolet', 'Dodge', 'Pontiac', 'Buick',
  'Cadillac', 'Oldsmobile', 'Plymouth', 'Mercury',
  'Packard', 'Studebaker', 'Hudson', 'Nash', 'Willys',
  'DeSoto', 'Lincoln', 'Imperial', 'Chrysler',
];

const CAR_MODELS: Record<string, string[]> = {
  Ford: ['Mustang', 'Thunderbird', 'Galaxie', 'Fairlane', 'Model A', 'Model T', 'Falcon', 'Ranchero'],
  Chevrolet: ['Corvette', 'Camaro', 'Bel Air', 'Impala', 'Nova', 'Chevelle', 'El Camino', 'Nomad'],
  Dodge: ['Charger', 'Challenger', 'Dart', 'Coronet', 'Super Bee', 'Viper', 'Polara'],
  Pontiac: ['GTO', 'Firebird', 'Trans Am', 'Bonneville', 'Grand Prix', 'Catalina'],
  Buick: ['Riviera', 'Skylark', 'LeSabre', 'Electra', 'Special', 'Century'],
  Cadillac: ['Eldorado', 'DeVille', 'Series 62', 'Fleetwood', 'Convertible'],
  Oldsmobile: ['442', 'Cutlass', 'Toronado', 'Starfire', 'Jetstar'],
  Plymouth: ['Barracuda', 'Road Runner', 'GTX', 'Fury', 'Belvedere'],
  Mercury: ['Cougar', 'Cyclone', 'Montego', 'Comet', 'Park Lane'],
  Packard: ['Caribbean', 'Clipper', 'Patrician', 'Four Hundred'],
  Studebaker: ['Avanti', 'Golden Hawk', 'Commander', 'Champion'],
  Hudson: ['Hornet', 'Wasp', 'Commodore', 'Pacemaker'],
  Nash: ['Ambassador', 'Rambler', 'Metropolitan', 'Statesman'],
  Willys: ['Jeepster', 'Aero', 'Knight'],
  DeSoto: ['Firedome', 'Fireflite', 'Adventurer', 'Diplomat'],
  Lincoln: ['Continental', 'Capri', 'Cosmopolitan', 'Premier'],
  Imperial: ['Crown', 'LeBaron', 'Custom', 'Southampton'],
  Chrysler: ['300', 'New Yorker', 'Newport', 'Saratoga', 'Windsor'],
};

const COLORS = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow', 'Silver', 'Burgundy', 'Cream', 'Turquoise'];
const LOCATIONS = ['Detroit, MI', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'Nashville, TN', 'Dallas, TX'];
const CONDITIONS: Array<CarListing['condition']> = ['Excellent', 'Good', 'Fair', 'Poor'];
const TRANSMISSIONS: Array<CarListing['transmission']> = ['Manual', 'Automatic', 'Semi-Automatic'];
const BODY_STYLES: Array<CarListing['bodyStyle']> = ['Sedan', 'Coupe', 'Convertible', 'Station Wagon', 'Pickup Truck'];

const FEATURE_POOL = [
  'Original Paint', 'Numbers Matching', 'Frame-Off Restoration', 'Power Steering',
  'Power Brakes', 'Air Conditioning', 'AM/FM Radio', '8-Track Player',
  'Chrome Wheels', 'Bucket Seats', 'Bench Seats', 'Leather Interior',
  'Vinyl Top', 'Side Exhaust', 'Dual Exhaust', 'Fuel Injection',
  'Positraction', 'Disc Brakes', '4-Speed Transmission', 'Factory Options',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomFeatures(): string[] {
  const count = Math.floor(Math.random() * 6) + 2;
  const shuffled = [...FEATURE_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function seedData(): void {
  const existingListings = getListings();
  const existingUsers = getUsers();

  if (existingUsers.length === 0) {
    const demoUsers: User[] = [
      {
        id: 'user_demo_seller1',
        username: 'VintageSeller',
        email: 'seller@vccp.com',
        password: 'password123',
        role: 'seller',
        createdAt: Date.now(),
      },
      {
        id: 'user_demo_buyer1',
        username: 'ClassicBidder',
        email: 'bidder@vccp.com',
        password: 'password123',
        role: 'buyer',
        createdAt: Date.now(),
      },
      {
        id: 'user_demo_both1',
        username: 'CarEnthusiast',
        email: 'enthusiast@vccp.com',
        password: 'password123',
        role: 'both',
        createdAt: Date.now(),
      },
    ];
    saveUsers(demoUsers);
  }

  if (existingListings.length === 0) {
    const listings: CarListing[] = [];
    for (let i = 0; i < 30; i++) {
      const make = pickRandom(VINTAGE_MAKES);
      const models = CAR_MODELS[make] || ['Classic'];
      const model = pickRandom(models);
      const year = Math.floor(Math.random() * 40) + 1930 + Math.floor(i / 2);
      const cappedYear = Math.min(year, 1985);
      const listing: CarListing = {
        id: generateId(),
        make,
        model,
        year: cappedYear,
        price: Math.floor(Math.random() * 150000) + 5000,
        mileage: Math.floor(Math.random() * 200000),
        condition: pickRandom(CONDITIONS),
        transmission: pickRandom(TRANSMISSIONS),
        fuelType: 'Petrol',
        bodyStyle: pickRandom(BODY_STYLES),
        color: pickRandom(COLORS),
        engineSize: `${(Math.random() * 5 + 1).toFixed(1)}L`,
        horsepower: `${Math.floor(Math.random() * 350) + 100} hp`,
        vin: `VCCP${Math.random().toString(36).toUpperCase().substr(2, 13)}`,
        description: `A stunning ${cappedYear} ${make} ${model} in ${pickRandom(CONDITIONS)} condition. This classic vehicle represents the golden era of American automotive excellence. Lovingly maintained and ready for its next owner.`,
        location: pickRandom(LOCATIONS),
        sellerName: `Seller ${i + 1}`,
        sellerPhone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        sellerEmail: `seller${i + 1}@vccp.com`,
        images: [],
        features: randomFeatures(),
        createdAt: Date.now() - Math.floor(Math.random() * 30) * 86400000,
        isAuction: false,
      };
      listings.push(listing);
    }
    saveListings(listings);

    const existingAuctions = getAuctions();
    if (existingAuctions.length === 0) {
      const auctions: AuctionListing[] = [];
      for (let i = 0; i < 6; i++) {
        const make = pickRandom(VINTAGE_MAKES);
        const models = CAR_MODELS[make] || ['Classic'];
        const model = pickRandom(models);
        const year = Math.floor(Math.random() * 40) + 1935;
        const cappedYear = Math.min(year, 1980);
        const car: CarListing = {
          id: generateId(),
          make,
          model,
          year: cappedYear,
          price: 0,
          mileage: Math.floor(Math.random() * 100000),
          condition: pickRandom(CONDITIONS),
          transmission: pickRandom(TRANSMISSIONS),
          fuelType: 'Petrol',
          bodyStyle: pickRandom(BODY_STYLES),
          color: pickRandom(COLORS),
          engineSize: `${(Math.random() * 4 + 2).toFixed(1)}L`,
          horsepower: `${Math.floor(Math.random() * 300) + 150} hp`,
          vin: `VCCP${Math.random().toString(36).toUpperCase().substr(2, 13)}`,
          description: `Rare ${cappedYear} ${make} ${model}. A collector's dream in exceptional condition.`,
          location: pickRandom(LOCATIONS),
          sellerName: 'VintageSeller',
          sellerPhone: '(555) 000-0001',
          sellerEmail: 'seller@vccp.com',
          images: [],
          features: randomFeatures(),
          createdAt: Date.now(),
          isAuction: true,
        };
        const hoursLeft = [2, 6, 12, 24, 48, 1];
        const duration = hoursLeft[i] || 4;
        const startTime = Date.now() - Math.floor(Math.random() * 3600000);
        const endTime = startTime + duration * 3600000;
        const isEnded = endTime < Date.now();
        const startingBid = Math.floor(Math.random() * 20000) + 5000;
        const currentBid = startingBid + Math.floor(Math.random() * 15000);
        const auction: AuctionListing = {
          id: generateId(),
          carId: car.id,
          car,
          sellerId: 'user_demo_seller1',
          sellerUsername: 'VintageSeller',
          reservePrice: currentBid + Math.floor(Math.random() * 10000) + 1000,
          startingBid,
          currentBid,
          highestBidderId: 'user_demo_buyer1',
          highestBidderUsername: 'ClassicBidder',
          durationHours: duration,
          startTime,
          endTime,
          status: isEnded ? 'ended' : 'live',
          bids: [
            {
              id: generateId(),
              auctionId: '',
              bidderId: 'user_demo_buyer1',
              bidderUsername: 'ClassicBidder',
              amount: currentBid,
              timestamp: startTime + 600000,
            },
          ],
        };
        auctions.push(auction);
      }
      saveAuctions(auctions);
    }
  }
}
