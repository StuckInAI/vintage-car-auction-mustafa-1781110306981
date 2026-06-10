import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useListings } from '@/hooks/useListings';
import { useAuctions } from '@/hooks/useAuctions';
import { useEffect } from 'react';
import { seedData } from '@/lib/seedData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ListingsPage from '@/pages/ListingsPage';
import ListingDetailPage from '@/pages/ListingDetailPage';
import AuctionsPage from '@/pages/AuctionsPage';
import SellPage from '@/pages/SellPage';

export default function App() {
  const { auth, login, register, logout } = useAuth();
  const { listings, addListing, refreshListings } = useListings();
  const { auctions, addAuction, placeBid, refreshAuctions } = useAuctions();

  useEffect(() => {
    seedData();
    refreshListings();
    refreshAuctions();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-vccp-cream">
        <Navbar auth={auth} onLogout={logout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage listings={listings} auctions={auctions} />} />
            <Route path="/listings" element={<ListingsPage listings={listings} />} />
            <Route path="/listings/:id" element={<ListingDetailPage listings={listings} />} />
            <Route path="/auctions" element={<AuctionsPage auctions={auctions} />} />
            <Route path="/sell" element={<SellPage auth={auth} addListing={addListing} addAuction={addAuction} />} />
            <Route path="*" element={
              <div className="text-center py-24">
                <p className="text-6xl mb-4">404</p>
                <p className="text-xl font-bold">Page Not Found</p>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
