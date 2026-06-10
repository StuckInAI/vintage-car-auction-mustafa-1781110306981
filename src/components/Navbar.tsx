import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Car, Gavel, Plus, Search } from 'lucide-react';
import Logo from '@/components/Logo';
import type { AuthState } from '@/types';

type NavbarProps = {
  auth: AuthState;
  onLogout: () => void;
};

export default function Navbar({ auth, onLogout }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  return (
    <nav className="bg-vccp-dark border-b-4 border-vccp-orange sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Logo size="sm" />
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-gray-300 hover:text-vccp-orange transition-colors flex items-center gap-1">
            <Search size={14} /> Browse
          </Link>
          <Link to="/listings" className="text-gray-300 hover:text-vccp-orange transition-colors flex items-center gap-1">
            <Car size={14} /> For Sale
          </Link>
          <Link to="/auctions" className="text-gray-300 hover:text-vccp-orange transition-colors flex items-center gap-1">
            <Gavel size={14} /> Auctions
          </Link>
          <Link to="/sell" className="text-gray-300 hover:text-vccp-orange transition-colors flex items-center gap-1">
            <Plus size={14} /> Sell
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {auth.isLoggedIn ? (
            <>
              <span className="text-vccp-orange text-sm font-semibold flex items-center gap-1">
                <User size={14} /> {auth.user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 text-sm flex items-center gap-1 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="text-gray-300 hover:text-vccp-orange text-sm transition-colors">
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-vccp-orange text-white text-sm font-bold px-4 py-1.5 rounded hover:bg-vccp-orange-dark transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-vccp-charcoal px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link to="/" className="text-gray-300 hover:text-vccp-orange py-1" onClick={() => setOpen(false)}>Browse</Link>
          <Link to="/listings" className="text-gray-300 hover:text-vccp-orange py-1" onClick={() => setOpen(false)}>For Sale</Link>
          <Link to="/auctions" className="text-gray-300 hover:text-vccp-orange py-1" onClick={() => setOpen(false)}>Auctions</Link>
          <Link to="/sell" className="text-gray-300 hover:text-vccp-orange py-1" onClick={() => setOpen(false)}>Sell a Car</Link>
          {auth.isLoggedIn ? (
            <button onClick={() => { handleLogout(); setOpen(false); }} className="text-red-400 text-left py-1">
              Logout ({auth.user?.username})
            </button>
          ) : (
            <>
              <Link to="/auth/login" className="text-gray-300 hover:text-vccp-orange py-1" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/auth/register" className="text-vccp-orange py-1" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
