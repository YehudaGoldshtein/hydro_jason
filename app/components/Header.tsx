import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = activeContent.header.navigation;
  const { global } = activeContent;
  const { header: headerMedia } = landingMedia;
  
  // Use actual cart count from loader, fallback to config (which is now 0)
  const displayCartCount = cartCount ?? global.cartCount ?? 0;

  return (
    <header className="bg-white shadow-sm" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Cart Icon - Left Side (in RTL) */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart className="h-6 w-6 text-text-primary" strokeWidth={2} />
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-main text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {displayCartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <Link to="/" className="flex items-center group">
              <div className="relative" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
                {/* Animated Glow effect behind logo */}
                <div 
                  className="absolute inset-0 blur-xl transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(224, 122, 99, 0.7) 0%, rgba(242, 160, 133, 0.4) 50%, transparent 70%)',
                    animation: 'glowPulse 3s ease-in-out infinite',
                    transform: 'translateZ(-50px)',
                  }}
                />
                {/* Logo with 3D effect and animated glow - Wide */}
                <img 
                  src={headerMedia.logo.src} 
                  alt={headerMedia.logo.alt}
                  className="h-14 w-auto md:h-16 md:w-auto max-w-[140px] md:max-w-[160px] relative z-10 transition-all duration-500 rounded-lg object-contain"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'perspective(1200px) rotateY(-8deg) rotateX(2deg) translateZ(20px)',
                    animation: 'logoGlow 3s ease-in-out infinite',
                    backfaceVisibility: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(2deg) translateZ(40px) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(2deg) translateZ(20px) scale(1)';
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Right Side - Menu Button (All Screens) */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-text-primary" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6 text-text-primary" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu (All Screens) */}
        {mobileMenuOpen && (
          <div className="border-t border-border-divider py-4">
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-primary hover:text-primary-main font-medium text-base py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
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





