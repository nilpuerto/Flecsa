import { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';

interface CookiesBannerProps {
  onAccept: () => void;
  onDeny: () => void;
  onSettings: () => void;
}

const CookiesBanner = ({ onAccept, onDeny, onSettings }: CookiesBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('flecsa-cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('flecsa-cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDeny = () => {
    localStorage.setItem('flecsa-cookie-consent', 'denied');
    setIsVisible(false);
    onDeny();
  };

  const handleSettings = () => {
    setIsVisible(false);
    onSettings();
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 z-50 max-w-sm bg-white rounded-t-2xl shadow-2xl border border-slate-200 animate-slide-up"
      style={{
        animation: 'slideUp 0.4s ease-out forwards'
      }}
    >
      <div className="p-4">
        {/* Close button */}
        <button
          onClick={handleDeny}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        {/* Text */}
        <p className="text-slate-900 text-sm font-['Montserrat'] mb-4 pr-6">
          This site uses tracking technologies. You may opt in or opt out of the use of these technologies.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDeny}
            className="flex-1 min-w-[80px] px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors font-['Montserrat']"
          >
            Deny
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 min-w-[80px] px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors font-['Montserrat']"
          >
            Accept all
          </button>
          <button
            onClick={handleSettings}
            className="flex-1 min-w-[100px] px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors font-['Montserrat'] flex items-center justify-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            Consent Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;


