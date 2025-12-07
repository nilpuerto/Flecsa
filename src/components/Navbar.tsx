import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: "/solution", label: "Solution" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/community", label: "Community" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-white"
      }`}
    >
      <div className="w-full px-2 md:container md:mx-auto md:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-10 sm:h-12 w-full max-w-full">
          {/* Logo - Left */}
          <Link 
            to="/" 
            className="text-base font-medium text-slate-900 hover:text-slate-700 transition-colors tracking-wide antialiased subpixel-antialiased"
          >
            Flecsa
          </Link>

          {/* Desktop Navigation Links and User Icon - Right */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-medium tracking-wide transition-colors antialiased subpixel-antialiased ${
                  location.pathname === link.path
                    ? "text-slate-900"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/app"
              className="text-slate-700 hover:text-slate-900 transition-colors flex-shrink-0"
              aria-label="User profile"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </Link>
          </div>

          {/* Mobile Menu Button and User Icon */}
          <div className="flex md:hidden items-center gap-1">
            <Link
              to="/app"
              className="text-slate-700 hover:text-slate-900 transition-colors flex-shrink-0"
              aria-label="User profile"
            >
              <User className="w-4 h-4 stroke-[1.5]" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-slate-900 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop - Rendered via portal */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="md:hidden fixed top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            animation: 'fadeIn 0.3s ease-out forwards',
            zIndex: 60,
            opacity: 1
          }}
        />,
        document.body
      )}

      {/* Mobile Menu - Rendered via portal */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="md:hidden fixed top-10 left-0 right-0 bottom-0 bg-white overflow-y-auto"
          style={{
            animation: 'slideDown 0.4s ease-out forwards',
            zIndex: 70,
            opacity: 1
          }}
        >
          {/* Decorative gradient at top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col min-h-full">
            {/* Header section */}
            <div className="px-4 pt-6 pb-4 border-b border-slate-200/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900">Flecsa</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
              <p className="text-xs text-slate-600 font-['Montserrat']">Organize your documents with AI</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col py-4 px-4 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-slate-700 hover:text-primary hover:bg-slate-50"
                  }`}
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Montserrat']">{link.label}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      location.pathname === link.path ? 'text-primary' : 'text-slate-400 group-hover:text-primary group-hover:translate-x-1'
                    }`} />
                  </div>
                  {location.pathname === link.path && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Footer section */}
            <div className="mt-auto px-4 py-6 border-t border-slate-200/40">
              <button
                onClick={() => {
                  setShowComingSoon(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-900 font-['Montserrat']">My Account</div>
                  <div className="text-xs text-slate-500 font-['Montserrat']">Access your workspace</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowComingSoon(false)}
            style={{ animation: 'fadeIn 0.3s ease-out forwards', opacity: 0 }}
          ></div>
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-xs sm:max-w-sm w-full p-4 sm:p-6 border border-slate-200"
            style={{ 
              animation: 'blur-in-left 0.4s ease-out 0.1s forwards',
              opacity: 0
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            </button>
            <div className="text-center relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 font-['Montserrat']">Coming Soon</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-['Montserrat'] mb-4 sm:mb-5 px-2">
                My Account feature is currently under development.
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-primary text-white text-sm sm:text-base rounded-full font-semibold font-['Montserrat'] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

