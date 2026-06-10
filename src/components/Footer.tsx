import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-vccp-dark border-t-2 border-vccp-gold mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Logo size="md" />
          <p className="text-gray-400 text-sm mt-4 max-w-xs leading-relaxed">
            The premier destination for vintage and classic car enthusiasts. Buy, sell, and auction the finest collector vehicles.
          </p>
        </div>
        <div>
          <h4 className="text-vccp-gold font-bold mb-3 text-sm uppercase tracking-wider">Navigate</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-vccp-gold transition-colors">Home</Link></li>
            <li><Link to="/listings" className="hover:text-vccp-gold transition-colors">For Sale</Link></li>
            <li><Link to="/auctions" className="hover:text-vccp-gold transition-colors">Auctions</Link></li>
            <li><Link to="/sell" className="hover:text-vccp-gold transition-colors">Sell a Car</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-vccp-gold font-bold mb-3 text-sm uppercase tracking-wider">Account</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/auth/login" className="hover:text-vccp-gold transition-colors">Login</Link></li>
            <li><Link to="/auth/register" className="hover:text-vccp-gold transition-colors">Register</Link></li>
            <li><Link to="/auctions/create" className="hover:text-vccp-gold transition-colors">Create Auction</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center text-gray-500 text-xs py-4">
        &copy; {new Date().getFullYear()} VCCP — Vintage Car Collector Portal. All rights reserved.
      </div>
    </footer>
  );
}
