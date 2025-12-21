import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@remix-run/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { label: 'שאלות נפוצות', href: '/faq' },
    { label: 'ביקורות', href: '/reviews' },
    { label: 'איך זה עובד?', href: '/how-it-works' },
    { label: 'המוצרים שלנו', href: '/products' }
  ];

  return (
    <header className="bg-white shadow-sm" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Cart Icon - Left Side (in RTL) */}
          <div className="flex items-center">
            <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart className="h-6 w-6 text-[#52423d]" strokeWidth={2} />
              <span className="absolute -top-1 -right-1 bg-[#e07a63] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-[#52423d] hover:text-[#e07a63] font-medium text-base transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo - Right Side (in RTL) */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-[#e07a63]">
                FeedEase
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#52423d]" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6 text-[#52423d]" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#f0e2dc] py-4">
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#52423d] hover:text-[#e07a63] font-medium text-base py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}





