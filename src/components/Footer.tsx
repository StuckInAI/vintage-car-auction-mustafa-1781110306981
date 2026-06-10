import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-vccp-dark text-white mt-20">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-vccp-orange via-vccp-gold to-vccp-orange-light" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="md:col-span-5">
          <Logo size="md" />
          <p className="text-gray-400 text-sm mt-5 max-w-sm leading-relaxed">
            The premier destination for vintage and classic car enthusiasts.
            Buy, sell, and auction the finest collector vehicles with confidence.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-2"><Mail size={13} className="text-vccp-orange" /> contact@vccp.com</span>
            <span className="flex items-center gap-2"><Phone size={13} className="text-vccp-orange" /> +1 (800) VCCP-CAR</span>
            <span className="flex items-center gap-2"><MapPin size={13} className="text-vccp-orange" /> Detroit, Michigan, USA</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden md:block md:col-span-1" />

        {/* Navigate */}
        <div className="md:col-span-3">
          <h4 className="text-vccp-orange font-bold mb-4 text-xs uppercase tracking-[0.2em]">Navigate</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/listings', label: 'For Sale' },
              { to: '/auctions', label: 'Live Auctions' },
              { to: '/sell', label: 'Sell a Car' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-400 hover:text-vccp-orange transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-vccp-orange transition-all duration-300" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div className="md:col-span-3">
          <h4 className="text-vccp-orange font-bold mb-4 text-xs uppercase tracking-[0.2em]">Account</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: '/auth/login', label: 'Sign In' },
              { to: '/auth/register', label: 'Register' },
              { to: '/auctions/create', label: 'Create Auction' },
              { to: '/sell', label: 'Post a Listing' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-400 hover:text-vccp-orange transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-vccp-orange transition-all duration-300" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-4 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} VCCP — Vintage Car Collector Portal. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs">Built with passion for classic automobiles.</p>
      </div>
    </footer>
  );
}
