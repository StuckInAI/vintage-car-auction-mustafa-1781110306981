import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Car, Gavel, Plus, Search } from 'lucide-react';
import Logo from '@/components/Logo';
import type { AuthState } from '@/types';
import clsx from 'clsx';

type NavbarProps = {
  auth: AuthState;
  onLogout: () => void;
};

export default function Navbar({ auth, onLogout }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-vccp-dark/95 backdrop-blur-md shadow-2xl border-b border-vccp-orange/20'
          : 'bg-vccp-dark border-b-2 border-vccp-orange/60'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-18 py-3">
        <Logo size="sm" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { to: '/', label: 'Browse', icon: Search },
            { to: '/listings', label: 'For Sale', icon: Car },
            { to: '/auctions', label: 'Auctions', icon: Gavel },
            { to: '/sell', label: 'Sell', icon: Plus },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive(to)
                  ? 'bg-vccp-orange/20 text-vccp-orange'
                  : 'text-gray-300 hover:text-vccp-orange hover:bg-white/5'
              )}
            >
              <Icon size={14} />
              {label}
              {to === '/auctions' && (
                <span className="ml-0.5 w-2 h-2 rounded-full bg-vccp-orange animate-pulse inline-block" />
              )}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {auth.isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-xl px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-vccp-orange flex items-center justify-center">
                  <User size={12} className="text-white" />
                </div>
                <span className="text-white text-sm font-semibold">{auth.user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 text-sm transition-colors px-2 py-1.5 rounded-lg hover:bg-red-500/10"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/8"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="vccp-btn-primary text-sm py-2"
              >
                Join VCCP
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-vccp-charcoal/98 backdrop-blur-md border-t border-white/10 px-4 pb-5 pt-3 flex flex-col gap-1 animate-fade-in">
          {[
            { to: '/', label: 'Browse', icon: Search },
            { to: '/listings', label: 'For Sale', icon: Car },
            { to: '/auctions', label: 'Auctions', icon: Gavel },
            { to: '/sell', label: 'Sell a Car', icon: Plus },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive(to) ? 'bg-vccp-orange/20 text-vccp-orange' : 'text-gray-300 hover:text-white hover:bg-white/8'
              )}
              onClick={() => setOpen(false)}
            >
              <Icon size={16} />{label}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-2 pt-3">
            {auth.isLoggedIn ? (
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="w-full text-left text-red-400 px-3 py-2 text-sm rounded-xl hover:bg-red-500/10 transition-colors"
              >
                Logout ({auth.user?.username})
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/auth/login" className="flex-1 text-center py-2 text-sm text-gray-300 border border-white/20 rounded-xl hover:border-vccp-orange transition-colors" onClick={() => setOpen(false)}>Sign In</Link>
                <Link to="/auth/register" className="flex-1 text-center py-2 text-sm vccp-btn-primary" onClick={() => setOpen(false)}>Join VCCP</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
