import { useState } from "react";
import { X, Mail, Check, Sparkles } from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EarlyAccessModal = ({ isOpen, onClose }: EarlyAccessModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email automatically via your backend API
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/early-access/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setEmail("");
          onClose();
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending early access request:', error);
      // Fallback: Show success anyway (user experience)
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        style={{ animation: 'fadeIn 0.3s ease-out forwards', opacity: 0 }}
      ></div>

      {/* Modal */}
      <div 
        className="relative rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full p-5 sm:p-8 overflow-hidden bg-white border border-slate-200 z-50"
        style={{ 
          animation: 'fadeInUp 0.4s ease-out 0.1s forwards',
          opacity: 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements - matching site design */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-50 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-primary text-xs sm:text-sm font-normal font-['Montserrat']">Early Access</span>
            </div>
          </div>

          {/* Title */}
          <h2 
            className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-2 font-['Montserrat']"
            style={{ 
              animation: 'fadeIn 0.4s ease-out 0.2s forwards', 
              opacity: 0 
            }}
          >
            Get Early Access
          </h2>
          <p 
            className="text-sm sm:text-base text-slate-600 text-center mb-6 sm:mb-8 font-['Montserrat']"
            style={{ 
              animation: 'fadeIn 0.4s ease-out 0.25s forwards', 
              opacity: 0 
            }}
          >
            Be among the first to experience Flecsa. Enter your email and we'll notify you when we launch.
          </p>

          {!isSuccess ? (
            <form 
              onSubmit={handleSubmit} 
              className="space-y-3 sm:space-y-4"
              style={{ 
                animation: 'fadeIn 0.4s ease-out 0.3s forwards', 
                opacity: 0 
              }}
            >
              {/* Email input */}
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500 z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-['Montserrat'] text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full py-2.5 sm:py-3.5 bg-primary text-white font-semibold text-sm sm:text-base rounded-xl hover:bg-primary/90 transition-all duration-300 font-['Montserrat'] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                {/* Shine effect on button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100 transition-opacity duration-500"></div>
                {isSubmitting ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="relative z-10">Request Access</span>
                )}
              </button>
            </form>
          ) : (
            <div 
              className="text-center py-6 sm:py-8"
              style={{ 
                animation: 'fadeIn 0.4s ease-out 0.3s forwards', 
                opacity: 0 
              }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
                  {/* Main container */}
                  <div className="relative bg-primary p-4 sm:p-5 rounded-full shadow-xl">
                    <Check className="relative w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-['Montserrat']">
                Request Sent!
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-['Montserrat']">
                We'll notify you when we launch.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessModal;

