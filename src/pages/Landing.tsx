import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Upload, Search, Calendar, ArrowRight, Camera, FileText, Tags, Star, Clock, Shield, Smartphone, Quote, Check, Zap, Database, Sparkles, Menu, X, Volume2, Headphones, SlidersHorizontal, Mail, Globe, ChevronDown, File, Sparkles as SparklesIcon, Zap as ZapIcon, Clock as ClockIcon, Bot, Gauge, FileCheck, ArrowRight as ArrowRightIcon, Download, Monitor, Folder, Archive, DollarSign, Scale, Home, Briefcase, Tablet, Laptop } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LoginModal from "@/components/LoginModal";
import DemoModal from "@/components/DemoModal";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "@/components/Navbar";
import phoneImage from "@/assets/phone.png";
import pdfIcon from "@/assets/pdf (1).png";
import docIcon from "@/assets/google-docs.png";
import xlsIcon from "@/assets/xls.png";
import pngIcon from "@/assets/png.png";
import cardImage from "@/assets/dc8d2d44-140a-4df3-8738-bb84ad9c2c3f.jpg";
import cardImage2 from "@/assets/26dccfd9-0706-4e98-b512-ab6b854d3831.jpg";
import cardImage3 from "@/assets/560a2840-0e90-4e3d-9e4f-68290091bdb6.jpg";
import paperIcon from "@/assets/paper.png";
import blender3dImage from "@/assets/3dblender.png";
import earthImage from "@/assets/earth.png";
import flecsaLogo from "@/assets/flecsa_logo.png";
import whiteFlecsaLogo from "@/assets/white_flecsa.png";

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Facebook Icon Component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Language mapping by country code
const countryToLanguage: Record<string, string> = {
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es', 'VE': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es',
  'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en', 'ZA': 'en',
  'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'MC': 'fr',
  'DE': 'de', 'AT': 'de',
  'CH': 'de', // Switzerland defaults to German, but can be French/Italian
  'IT': 'it', 'SM': 'it', 'VA': 'it',
  'PT': 'pt', 'BR': 'pt', 'AO': 'pt', 'MZ': 'pt',
  'NL': 'nl',
  'PL': 'pl',
  'RU': 'ru', 'BY': 'ru', 'KZ': 'ru',
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
  'JP': 'ja',
  'KR': 'ko',
  'IN': 'hi',
  'SA': 'ar', 'EG': 'ar', 'AE': 'ar', 'IQ': 'ar', 'MA': 'ar',
  'TR': 'tr',
  'TH': 'th',
  'VI': 'vi',
  'ID': 'id',
  'PH': 'tl',
  'GR': 'el',
  'CZ': 'cs',
  'HU': 'hu',
  'RO': 'ro',
  'BG': 'bg',
  'HR': 'hr',
  'SK': 'sk',
  'SI': 'sl',
  'FI': 'fi',
  'SV': 'sv', 'SE': 'sv',
  'NO': 'no',
  'DA': 'da', 'DK': 'da',
  'HE': 'he', 'IL': 'he',
  'UK': 'uk', 'UA': 'uk',
};

const languages: Record<string, { name: string; nativeName: string; flag: string }> = {
  'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  'en': { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  'de': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  'it': { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  'pt': { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  'nl': { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  'pl': { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  'ru': { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  'zh': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  'ko': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  'hi': { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  'tr': { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  'th': { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  'id': { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  'tl': { name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
  'el': { name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  'cs': { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  'hu': { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  'ro': { name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  'bg': { name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
  'hr': { name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  'sk': { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  'sl': { name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
  'fi': { name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  'sv': { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  'no': { name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  'da': { name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  'he': { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  'uk': { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
};

const translations: Record<string, Record<string, string>> = {
  es: {
    // Navigation
    navFeatures: 'Características',
    navPricing: 'Precios',
    navAbout: 'Sobre nosotros',
    navLogin: 'Iniciar sesión',
    // Hero
    heroBadge: 'Organización inteligente',
    heroTitle: 'Organiza documentos con',
    heroTitleHighlight: 'inteligencia artificial',
    heroDescription: 'Transforma fotos y PDFs en un buzón inteligente. La IA organiza, etiqueta y responde tus preguntas.',
    heroButton1: 'Probar ahora',
    heroButton2: 'Ver demo',
    heroStat1: 'Clientes satisfechos',
    heroStat2: 'Documentos procesados',
    heroStat3: 'reseñas',
    // Three Steps
    stepsTitle: 'Tres',
    stepsTitleHighlight: 'pasos simples',
    stepsDescription: 'Organiza tus documentos sin esfuerzo con inteligencia artificial. Un proceso simple y directo para transformar la forma en que trabajas.',
    step1Title: 'Sube todo en segundos',
    step1Desc: 'Arrastra PDFs, toma una foto de un recibo o reenvía emails. Zerlo captura texto y datos automáticamente.',
    step1Highlight: 'Captura multiplataforma',
    step2Title: 'La IA organiza por ti',
    step2Desc: 'Detectamos el tipo de documento, sugerimos etiquetas y lo guardamos en el espacio correcto sin reglas manuales.',
    step2Highlight: 'Etiquetas inteligentes',
    step3Title: 'Pregunta o escucha',
    step3Desc: 'Usa lenguaje natural para encontrar contratos o activa "leer en voz alta" para revisarlos sin mirar la pantalla.',
    step3Highlight: 'Búsqueda + voz',
    // Visual Impact
    visualBadge: 'Inteligencia artificial avanzada',
    visualTitle1: 'Menos caos.',
    visualTitle2: 'Más claridad.',
    visualTitle3: 'Tu tiempo es',
    visualTitleHighlight: 'valioso',
    visualTitle4: 'Zerlo lo respeta.',
    visualDescription: 'Mientras otros sistemas desperdician tu tiempo buscando, Zerlo entiende tus documentos y te da respuestas instantáneas. Pregunta en cualquier idioma y encuentra exactamente lo que necesitas.',
    feature1Title: 'Búsqueda en lenguaje natural',
    feature1Desc: 'Pregunta como hablarías normalmente',
    feature2Title: 'Organización automática',
    feature2Desc: 'Organiza en carpetas y etiquetas automáticamente',
    feature3Title: 'Privacidad total',
    feature3Desc: 'Tus documentos están seguros y privados',
    searchDemoTitle: 'Búsqueda inteligente',
    searchDemoQuestion: 'Pregunta',
    searchDemoQuery: '¿Cuánto gasté en combustible este mes?',
    // Pricing
    pricingTitle: 'Precios',
    pricingSubtitle: 'Planes limpios y directos adaptados a tus necesidades',
    // Testimonials
    testimonialsTitle: 'Lo que dicen nuestros usuarios',
    testimonialsSubtitle: 'Miles de usuarios confían en Zerlo para organizar sus documentos',
    // Footer
    footerProduct: 'Producto',
    footerCompany: 'Empresa',
    footerBlog: 'Blog',
    footerContact: 'Contacto',
    footerAbout: 'Sobre Flecsa',
    footerPrivacy: 'Privacidad',
    footerTerms: 'Términos',
    footerRights: 'Todos los derechos reservados.',
  },
  en: {
    // Navigation
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navAbout: 'About us',
    navLogin: 'Sign in',
    // Hero
    heroBadge: 'Smart organization',
    heroTitle: 'Organize documents with',
    heroTitleHighlight: 'artificial intelligence',
    heroDescription: 'Transform photos and PDFs into an intelligent inbox. AI organizes, tags and answers your questions.',
    heroButton1: 'Try now',
    heroButton2: 'View demo',
    heroStat1: 'Satisfied customers',
    heroStat2: 'Documents processed',
    heroStat3: 'reviews',
    // Three Steps
    stepsTitle: 'Three',
    stepsTitleHighlight: 'simple steps',
    stepsDescription: 'Organize your documents effortlessly with artificial intelligence. A simple and straightforward process to transform the way you work.',
    step1Title: 'Upload everything in seconds',
    step1Desc: 'Drag PDFs, take a photo of a receipt or forward emails. Zerlo captures text and data automatically.',
    step1Highlight: 'Multi-platform capture',
    step2Title: 'AI organizes for you',
    step2Desc: 'We detect the document type, suggest tags and save it in the right space without manual rules.',
    step2Highlight: 'Smart tags',
    step3Title: 'Ask or listen',
    step3Desc: 'Use natural language to find contracts or activate "read aloud" to review them without looking at the screen.',
    step3Highlight: 'Search + voice',
    // Visual Impact
    visualBadge: 'Advanced artificial intelligence',
    visualTitle1: 'Less chaos.',
    visualTitle2: 'More clarity.',
    visualTitle3: 'Your time is',
    visualTitleHighlight: 'valuable',
    visualTitle4: 'Zerlo respects it.',
    visualDescription: 'While other systems waste your time searching, Zerlo understands your documents and gives you instant answers. Ask in any language and find exactly what you need.',
    feature1Title: 'Natural language search',
    feature1Desc: 'Ask as you would normally speak',
    feature2Title: 'Automatic organization',
    feature2Desc: 'Organizes into folders and tags automatically',
    feature3Title: 'Total privacy',
    feature3Desc: 'Your documents are safe and private',
    searchDemoTitle: 'Smart search',
    searchDemoQuestion: 'Question',
    searchDemoQuery: 'How much did I spend on fuel this month?',
    // Pricing
    pricingTitle: 'Pricing',
    pricingSubtitle: 'Clean and straightforward plans tailored to your needs',
    // Testimonials
    testimonialsTitle: 'What our users say',
    testimonialsSubtitle: 'Thousands of users trust Zerlo to organize their documents',
    // Footer
    footerProduct: 'Product',
    footerCompany: 'Company',
    footerBlog: 'Blog',
    footerContact: 'Contact',
    footerAbout: 'About Flecsa',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerRights: 'All rights reserved.',
  },
};

// Comparison Slider Component
const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Traditional inbox - many small folders and files in disorder
  const traditionalItems = [
    { name: 'Documents', type: 'folder', subItems: 23 },
    { name: 'contract_2023.pdf', type: 'file' },
    { name: 'Downloads', type: 'folder', subItems: 45 },
    { name: 'old_backup', type: 'folder', subItems: 12 },
    { name: 'invoice_march.xlsx', type: 'file' },
    { name: 'Desktop', type: 'folder', subItems: 67 },
    { name: 'Projects', type: 'folder', subItems: 34 },
    { name: 'random_file.txt', type: 'file' },
    { name: 'Archive', type: 'folder', subItems: 156 },
    { name: 'receipt_photo.jpg', type: 'file' },
    { name: 'Old Files', type: 'folder', subItems: 89 },
    { name: 'Misc', type: 'folder', subItems: 43 },
    { name: 'Backup', type: 'folder', subItems: 234 },
    { name: 'untitled_folder', type: 'folder', subItems: 5 },
    { name: 'document_copy.pdf', type: 'file' },
    { name: 'New Folder', type: 'folder', subItems: 2 },
    { name: 'temp_files', type: 'folder', subItems: 78 },
    { name: 'important.docx', type: 'file' },
    { name: 'Photos', type: 'folder', subItems: 234 },
    { name: 'Videos', type: 'folder', subItems: 45 },
    { name: 'Music', type: 'folder', subItems: 123 },
    { name: 'old_project_backup', type: 'folder', subItems: 67 },
    { name: 'contract_final_v2.pdf', type: 'file' },
    { name: 'Documents_old', type: 'folder', subItems: 45 },
    { name: 'Desktop_files', type: 'folder', subItems: 23 },
    { name: 'random_data.csv', type: 'file' },
  ];

  // AI organized structure with different colors
  const aiFolders = [
    { name: 'Finance', count: 12, icon: DollarSign, subFolders: ['Invoices', 'Receipts', 'Taxes'], color: 'emerald' },
    { name: 'Legal', count: 8, icon: Scale, subFolders: ['Contracts', 'Agreements'], color: 'purple' },
    { name: 'Home', count: 15, icon: Home, subFolders: ['Bills', 'Warranties'], color: 'amber' },
    { name: 'Work', count: 5, icon: Briefcase, subFolders: ['Projects', 'Reports'], color: 'orange' },
  ];

  // Color mapping for folders
  const folderColors: Record<string, { bg: string; border: string; iconBg: string; icon: string }> = {
    emerald: {
      bg: 'from-emerald-50 to-emerald-100/50',
      border: 'border-emerald-200 hover:border-emerald-300',
      iconBg: 'bg-emerald-100 group-hover:bg-emerald-200',
      icon: 'text-emerald-600'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100/50',
      border: 'border-purple-200 hover:border-purple-300',
      iconBg: 'bg-purple-100 group-hover:bg-purple-200',
      icon: 'text-purple-600'
    },
    amber: {
      bg: 'from-amber-50 to-amber-100/50',
      border: 'border-amber-200 hover:border-amber-300',
      iconBg: 'bg-amber-100 group-hover:bg-amber-200',
      icon: 'text-amber-600'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100/50',
      border: 'border-orange-200 hover:border-orange-300',
      iconBg: 'bg-orange-100 group-hover:bg-orange-200',
      icon: 'text-orange-600'
    },
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] cursor-col-resize bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl select-none touch-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ userSelect: 'none', touchAction: 'none' }}
    >
      {/* Traditional Inbox - Left Side */}
      <div 
        className="absolute inset-0 bg-slate-50 overflow-hidden select-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, userSelect: 'none' }}
      >
        <div className="p-2 sm:p-4 md:p-6 h-full overflow-y-auto select-none" style={{ userSelect: 'none' }}>
          {/* Header */}
          <div className="mb-2 sm:mb-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-slate-900 text-sm sm:text-lg md:text-xl font-normal font-['Montserrat'] select-none">Traditional Inbox</h3>
              <div className="text-slate-500 text-[10px] sm:text-xs md:text-sm font-['Montserrat'] select-none">1,126 files</div>
            </div>
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search files..."
                className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-[10px] sm:text-xs md:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 font-['Montserrat'] font-normal select-none"
                disabled
                onSelect={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Long list of small folders and files - disordered */}
          <div className="space-y-1 sm:space-y-1.5 select-none" style={{ userSelect: 'none' }}>
            {traditionalItems.map((item, index) => {
              const IconComponent = item.type === 'folder' ? Folder : FileText;
              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded hover:bg-slate-100 transition-colors cursor-pointer group"
                  style={{ userSelect: 'none' }}
                >
                  <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${item.type === 'folder' ? 'text-slate-600' : 'text-slate-400'} flex-shrink-0`} />
                  <span className="text-slate-700 text-[10px] sm:text-xs font-['Montserrat'] font-normal truncate select-none">
                    {item.name}
                  </span>
                  {item.type === 'folder' && item.subItems && (
                    <span className="text-slate-400 text-[10px] sm:text-xs font-['Montserrat'] ml-auto select-none">
                      {item.subItems}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flecsa AI Inbox - Right Side */}
      <div 
        className="absolute inset-0 bg-white overflow-hidden select-none"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)`, userSelect: 'none' }}
      >
        <div className="p-2 sm:p-4 md:p-6 h-full flex flex-col select-none" style={{ userSelect: 'none' }}>
          {/* Header */}
          <div className="mb-2 sm:mb-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img 
                  src={flecsaLogo} 
                  alt="Flecsa" 
                  className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto select-none"
                />
                <div className="bg-primary/10 text-primary px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-normal font-['Montserrat'] border border-primary/20 select-none">AI</div>
              </div>
              <div className="text-slate-600 text-[10px] sm:text-xs md:text-sm font-['Montserrat'] select-none">40 files</div>
            </div>
            
            {/* Search Input */}
            <div className="relative mb-2 sm:mb-3">
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <input
                type="text"
                placeholder="Ask AI: Find my contract..."
                className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 bg-white border-2 border-primary/30 rounded-lg text-slate-900 text-[10px] sm:text-xs md:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-['Montserrat'] font-normal select-none"
                onSelect={(e) => e.preventDefault()}
              />
            </div>

            {/* Auto-organized Label */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
              <span className="text-primary text-[10px] sm:text-xs font-normal font-['Montserrat'] select-none">
                Today, 40 files organized automatically
              </span>
            </div>
          </div>

          {/* Organized Folders - Modern Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-4 flex-shrink-0">
            {aiFolders.map((folder, index) => {
              const IconComponent = folder.icon;
              const colors = folderColors[folder.color] || folderColors.emerald;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${colors.bg} rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 ${colors.border} transition-all hover:shadow-md group`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.iconBg} rounded-lg mb-1.5 sm:mb-2 flex items-center justify-center transition-colors`}>
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.icon}`} />
                  </div>
                  <div className="text-slate-900 font-normal text-[10px] sm:text-xs md:text-sm font-['Montserrat'] select-none">{folder.name}</div>
                  <div className="text-slate-500 text-[9px] sm:text-xs font-['Montserrat'] select-none">{folder.count} files</div>
                </div>
              );
            })}
          </div>

          {/* AI Features */}
          <div className="mb-2 sm:mb-4 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1">
                <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                <span className="text-primary text-[9px] sm:text-xs font-['Montserrat'] select-none">Auto-tagged</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                <span className="text-primary text-[9px] sm:text-xs font-['Montserrat'] select-none">Smart search</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-primary/5 border border-primary/20 rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                <span className="text-primary text-[9px] sm:text-xs font-['Montserrat'] select-none">Verified</span>
              </div>
            </div>
          </div>

          {/* Folder Hierarchy Tree - Bottom */}
          <div className="mt-auto pt-2 sm:pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <div className="text-[9px] sm:text-xs text-slate-500 font-['Montserrat'] select-none">AI-Generated Structure</div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                <span className="text-primary text-[9px] sm:text-xs font-['Montserrat'] select-none">Organized</span>
              </div>
            </div>
            <div className="space-y-0.5 sm:space-y-1 text-[9px] sm:text-xs font-['Montserrat'] font-normal select-none" style={{ userSelect: 'none' }}>
              {aiFolders.map((folder, index) => (
                <div key={index} className="text-slate-700 select-none">
                  <div className="flex items-center gap-1">
                    <Folder className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    <span>{folder.name}</span>
                  </div>
                  {folder.subFolders && folder.subFolders.map((sub, subIndex) => (
                    <div key={subIndex} className="ml-3 sm:ml-4 text-slate-500 flex items-center gap-1">
                      <span>└─</span>
                      <FileText className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider Handle with Glow */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-col-resize z-20 touch-none"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          boxShadow: '0 0 10px rgba(10, 115, 255, 0.5), 0 0 20px rgba(10, 115, 255, 0.3)',
          touchAction: 'none'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform touch-none"
          style={{
            boxShadow: '0 0 15px rgba(10, 115, 255, 0.6), 0 0 30px rgba(10, 115, 255, 0.4)',
            touchAction: 'none'
          }}
        >
          <div className="flex gap-0.5 sm:gap-1">
            <div className="w-0.5 h-3 sm:h-4 bg-white rounded-full"></div>
            <div className="w-0.5 h-3 sm:h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 shadow-md select-none">
        <span className="text-slate-600 text-[9px] sm:text-xs font-['Montserrat'] font-normal">← Drag to compare →</span>
      </div>
    </div>
  );
};

const Landing = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [workImageUrl, setWorkImageUrl] = useState<string>('');
  const [workSectionRef, setWorkSectionRef] = useState<HTMLDivElement | null>(null);
  const [isWorkSectionVisible, setIsWorkSectionVisible] = useState(false);
  const [comparisonSectionRef, setComparisonSectionRef] = useState<HTMLDivElement | null>(null);
  const [isComparisonSectionVisible, setIsComparisonSectionVisible] = useState(false);
  const faqSectionRef = useRef<HTMLDivElement>(null);
  const [isFaqSectionVisible, setIsFaqSectionVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('es');
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSection, setVisibleSection] = useState<string>('');
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const [contactForm, setContactForm] = useState({ email: '', message: '' });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Get language from localStorage or browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && languages[savedLanguage]) {
      setSelectedLanguage(savedLanguage);
    } else {
      // Try to detect from browser
    const browserLang = navigator.language.split('-')[0];
      if (languages[browserLang]) {
      setSelectedLanguage(browserLang);
      }
    }
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load work image from Unsplash
  useEffect(() => {
    const loadWorkImage = async () => {
      try {
        // Using Unsplash Source API for a man working on computer
        const imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80';
        setWorkImageUrl(imageUrl);
      } catch (error) {
        console.error('Error loading work image:', error);
      }
    };
    loadWorkImage();
  }, []);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === workSectionRef) {
              setIsWorkSectionVisible(true);
            }
            if (entry.target === comparisonSectionRef) {
              setIsComparisonSectionVisible(true);
            }
            if (entry.target === faqSectionRef.current) {
              setIsFaqSectionVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (workSectionRef) {
      observer.observe(workSectionRef);
    }
    if (comparisonSectionRef) {
      observer.observe(comparisonSectionRef);
    }
    if (faqSectionRef.current) {
      observer.observe(faqSectionRef.current);
    }

    return () => {
      if (workSectionRef) {
        observer.unobserve(workSectionRef);
      }
      if (comparisonSectionRef) {
        observer.unobserve(comparisonSectionRef);
      }
      if (faqSectionRef.current) {
        observer.unobserve(faqSectionRef.current);
      }
    };
  }, [workSectionRef, comparisonSectionRef]);

  const tSync = (key: string): string => {
    return translations[selectedLanguage]?.[key] || translations['es'][key] || key;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen scroll-smooth bg-slate-50 text-slate-900 flex flex-col overflow-x-hidden w-full max-w-full">
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-visible bg-slate-50 pt-12 sm:pt-18 md:pt-20 lg:pt-22 flex-1">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 relative z-10 overflow-visible">
          <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-2 sm:mt-8 md:mt-12 lg:mt-16">
            {/* Left Side - Title, Description and Button */}
            <div className="flex flex-col w-full lg:w-auto lg:flex-1 mt-2 sm:mt-4 md:mt-8 lg:mt-12">
              {/* Badge */}
              <div className="mb-4" style={{ 
                animation: 'fadeInUp 1.2s ease-out 0s forwards',
                opacity: 0,
                willChange: 'opacity, transform'
              }}>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 border border-primary/20 rounded-full px-2.5 sm:px-4 py-1 sm:py-1.5">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-primary text-xs sm:text-sm font-normal font-['Montserrat']">Smart File Organization</span>
                        </div>
            </div>
            
              {/* Title - Never search for a file again */}
              <div className="flex flex-col" style={{ 
                animation: 'fadeInRight 1.2s ease-out 0.2s forwards',
                opacity: 0,
                willChange: 'opacity, transform'
              }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal text-slate-900 leading-tight sm:leading-relaxed font-['Montserrat']">
                  <span className="block sm:inline">Never search</span>
                  <span className="block sm:inline"> for a <span className="font-bold text-primary">FILE</span> again</span>
                </h1>
        </div>

              {/* Description and Button - Just below title */}
              <div className="flex flex-col items-start mt-3 sm:mt-4" style={{ 
                animation: 'fadeInRight 1.2s ease-out 0.4s forwards',
                opacity: 0,
                willChange: 'opacity, transform'
              }}>
                <p className="text-sm sm:text-base md:text-base lg:text-lg text-slate-600 leading-relaxed font-['Montserrat'] text-left max-w-md w-full">
                  Stop hunting for files. Flecsa organizes them all and finds anything you need instantly.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                  <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                    <span className="text-slate-600 text-xs sm:text-sm font-['Montserrat']">Instant Search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-slate-600 text-xs sm:text-sm font-['Montserrat']">Real-time Sync</span>
                </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-slate-600 text-xs sm:text-sm font-['Montserrat']">Secure & Private</span>
          </div>
        </div>

                {/* Button below description */}
              <button 
                onClick={() => setIsEarlyAccessModalOpen(true)}
                className="relative mt-4 sm:mt-5 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-full overflow-hidden group transition-all duration-300 font-['Montserrat'] self-start shadow-xl shadow-primary/40 hover:scale-[1.02]"
              >
                  {/* Subtle continuous shine effect - optimized for mobile */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine-simple"></div>
                  {/* Button text */}
                  <span className="relative z-10">Get early access</span>
              </button>
            </div>
          </div>
            
            {/* Right Side - Phone with floating labels */}
            <div className="relative w-full lg:w-auto lg:flex-1 overflow-visible mt-8 sm:mt-0">
              {/* White Box */}
              <div className="relative h-[300px] sm:h-[350px] md:h-[300px] lg:h-[400px] rounded-3xl overflow-hidden z-10">
                {/* Main White Background */}
                <div className="absolute inset-0 bg-slate-50 rounded-3xl"></div>
        </div>
        
              {/* Mask layer that aligns with the box bottom - responsive */}
              <div className="absolute bottom-0 left-0 right-0 h-[300px] sm:h-[350px] md:h-[300px] lg:h-[400px] bg-slate-50 rounded-3xl z-20 pointer-events-none"></div>
              
              {/* iPhone Mockup - Centered, slightly to the right, top part outside (3D effect) */}
              <div 
                id="phone-mobile-container"
                className="absolute z-30"
                style={{ 
                  animation: 'blur-in-right 0.6s ease-out 0.3s forwards',
                  opacity: 0,
                  willChange: 'opacity, transform' as any,
                  left: '-2%',
                  top: '-35%',
                  position: 'absolute',
                } as React.CSSProperties}
              >
                <img 
                  src={phoneImage} 
                  alt="Flecsa app on iPhone" 
                  className="h-auto"
                  style={{ 
                    transformOrigin: 'center',
                    width: '390px',
                  } as React.CSSProperties}
                />
            </div>
              <style>{`
                #phone-mobile-container {
                  top: -35% !important;
                  left: -2% !important;
                  position: absolute !important;
                }
                @media (max-width: 639px) {
                  #phone-mobile-container {
                    top: -30% !important;
                    left: -3% !important;
                    position: absolute !important;
                  }
                  #phone-mobile-container img {
                    width: 420px !important;
                    min-width: 420px !important;
                    max-width: 420px !important;
                  }
                }
                @media (min-width: 640px) and (max-width: 767px) {
                  #phone-mobile-container {
                    top: -35% !important;
                    left: -4% !important;
                    position: absolute !important;
                  }
                  #phone-mobile-container img {
                    width: 550px !important;
                    min-width: 550px !important;
                    max-width: 550px !important;
                  }
                }
                @media (min-width: 768px) and (max-width: 1023px) {
                  #phone-mobile-container {
                    top: -45% !important;
                    left: 42% !important;
                    transform: translateX(-48%) !important;
                    position: absolute !important;
                  }
                  #phone-mobile-container img {
                    width: 650px !important;
                    min-width: 650px !important;
                    max-width: 650px !important;
                  }
                }
                @media (min-width: 1024px) {
                  #phone-mobile-container {
                    left: 0% !important;
                    top: -35% !important;
                    transform: none !important;
                    position: absolute !important;
                  }
                  #phone-mobile-container img {
                    width: 560px !important;
                    min-width: 560px !important;
                    max-width: 560px !important;
                  }
                }
                @media (min-width: 1280px) {
                  #phone-mobile-container {
                    left: 0% !important;
                    top: -35% !important;
                    position: absolute !important;
                  }
                  #phone-mobile-container img {
                    width: 610px !important;
                    min-width: 610px !important;
                    max-width: 610px !important;
                  }
                }
              `}</style>
              <style>{`
                @media (max-width: 639px) {
                  #contract-label {
                    top: 70% !important;
                    left: -20% !important;
                    right: auto !important;
                    position: absolute !important;
                    transform: none !important;
                    margin-left: 0 !important;
                    padding-left: 0 !important;
                  }
                  #contract-label > div {
                    transform: scale(0.9) translateX(-30px) !important;
                  }
                  #insights-label {
                    top: 30% !important;
                    left: -2% !important;
                  }
                  #products-label {
                    right: -45% !important;
                    left: auto !important;
                    top: 30% !important;
                    position: absolute !important;
                    transform: none !important;
                    margin-right: 0 !important;
                  }
                  #products-label > div {
                    transform: translateX(50px) scale(0.9) !important;
                  }
                  #summer-label {
                    top: 63% !important;
                    right: -3% !important;
                  }
                }
                #contract-label {
                  top: 65% !important;
                  left: 16% !important;
                }
                #insights-label {
                  top: 25% !important;
                  left: -2% !important;
                }
                #products-label {
                  right: 14% !important;
                }
                @media (min-width: 640px) {
                  #contract-label {
                    left: 18% !important;
                    top: 66% !important;
                  }
                  #insights-label {
                    left: 8% !important;
                    top: 26% !important;
                  }
                  #products-label {
                    right: 10% !important;
                  }
                }
                @media (min-width: 768px) and (max-width: 1023px) {
                  #phone-mobile-container {
                    left: 50% !important;
                    top: -20% !important;
                    transform: translateX(-43%) !important;
                  }
                  #phone-mobile-container img {
                    width: 380px !important;
                    max-width: 380px !important;
                  }
                  #contract-label {
                    left: 31% !important;
                    top: 62% !important;
                  }
                  #contract-label > div {
                    transform: scale(0.85) !important;
                  }
                  #insights-label {
                    left: 25% !important;
                    top: 22% !important;
                  }
                  #insights-label > div {
                    transform: scale(0.85) !important;
                  }
                  #products-label {
                    right: 18% !important;
                    top: 12% !important;
                  }
                  #products-label > div {
                    transform: scale(0.85) !important;
                  }
                  #summer-label {
                    right: 15% !important;
                    bottom: 20% !important;
                  }
                  #summer-label > div {
                    transform: scale(0.85) !important;
                  }
                }
                @media (min-width: 1024px) {
                  #summer-label {
                    right: 4% !important;
                    bottom: 23% !important;
                  }
                  #contract-label {
                    left: 14% !important;
                    top: 67% !important;
                  }
                  #insights-label {
                    left: 6% !important;
                    top: 27% !important;
                  }
                  #products-label {
                    right: 18% !important;
                    left: auto !important;
                  }
                }
              `}</style>
            
              {/* Floating Document Labels */}
              {/* PDF - Top Left, very very much lower */}
              <div id="contract-label" className="absolute z-40" style={{ 
                animation: 'fadeInLeft 1.2s ease-out 0.7s forwards, float 6s ease-in-out 0s infinite',
                opacity: 0,
                willChange: 'opacity, transform' as any,
                top: '65%',
                left: '16%',
              } as React.CSSProperties}>
                <div className="relative bg-blue-600/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2.5 lg:px-4 lg:py-2.5 shadow-lg border border-blue-500/50 flex items-center gap-1.5 sm:gap-2 md:gap-2 hover:bg-blue-600/80 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden scale-90 sm:scale-100" style={{ filter: 'drop-shadow(0 0 12px rgba(37, 99, 235, 0.6))' }}>
                  {/* Shine/Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                  <img src={pdfIcon} alt="PDF" className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 relative z-10" />
                  <div className="flex flex-col relative z-10">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-white">Contract.pdf</span>
                  <span className="text-[9px] sm:text-[11px] md:text-[10px] lg:text-[10px] text-blue-50">12MB</span>
                </div>
                </div>
                        </div>
                
              {/* DOC - Mid Left, more to the right */}
              <div id="insights-label" className="absolute z-30" style={{ 
                animation: 'fadeInLeft 1.2s ease-out 0.8s forwards, float 6s ease-in-out 1s infinite',
                opacity: 0,
                willChange: 'opacity, transform' as any,
                top: '25%',
                left: '4%',
              } as React.CSSProperties}>
                <div className="relative bg-blue-600/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2.5 lg:px-4 lg:py-2.5 shadow-lg border border-blue-500/50 flex items-center gap-1.5 sm:gap-2 md:gap-2 hover:bg-blue-600/80 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden scale-90 sm:scale-100" style={{ filter: 'drop-shadow(0 0 12px rgba(37, 99, 235, 0.6))' }}>
                  {/* Shine/Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                  <img src={docIcon} alt="DOC" className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 relative z-10" />
                  <div className="flex flex-col relative z-10">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-white">Insights.doc</span>
                  <span className="text-[9px] sm:text-[11px] md:text-[10px] lg:text-[10px] text-blue-50">19MB</span>
                      </div>
                    </div>
        </div>

              {/* XLSX - Top Right, more to the right, a bit lower */}
              <div id="products-label" className="absolute top-[14%] z-30" style={{ 
                animation: 'fadeInRight 1.2s ease-out 0.9s forwards, float 6s ease-in-out 2s infinite',
                opacity: 0,
                willChange: 'opacity, transform' as any,
                right: '12%',
                left: 'auto'
              } as React.CSSProperties}>
                <div className="relative bg-blue-600/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2.5 lg:px-4 lg:py-2.5 shadow-lg border border-blue-500/50 flex items-center gap-1.5 sm:gap-2 md:gap-2 hover:bg-blue-600/80 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden scale-90 sm:scale-100" style={{ filter: 'drop-shadow(0 0 12px rgba(37, 99, 235, 0.6))' }}>
                  {/* Shine/Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                  <img src={xlsIcon} alt="XLSX" className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 relative z-10" />
                  <div className="flex flex-col relative z-10">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-white">Products.xlsx</span>
                  <span className="text-[9px] sm:text-[11px] md:text-[10px] lg:text-[10px] text-blue-50">1GB</span>
          </div>
        </div>
              </div>

              {/* PNG - Bottom Right, more to the right */}
              <div id="summer-label" className="absolute bottom-[23%] right-[3%] sm:right-[2%] md:right-[1%] z-30" style={{ 
                animation: 'fadeInRight 1.2s ease-out 1s forwards, float 6s ease-in-out 3s infinite',
                opacity: 0,
                willChange: 'opacity, transform' as any
              } as React.CSSProperties}>
                <div className="relative bg-blue-600/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2.5 lg:px-4 lg:py-2.5 shadow-lg border border-blue-500/50 flex items-center gap-1.5 sm:gap-2 md:gap-2 hover:bg-blue-600/80 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden scale-90 sm:scale-100" style={{ filter: 'drop-shadow(0 0 12px rgba(37, 99, 235, 0.6))' }}>
                  {/* Shine/Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                  <img src={pngIcon} alt="PNG" className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 relative z-10" />
                  <div className="flex flex-col relative z-10">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-white">Summer.png</span>
                  <span className="text-[9px] sm:text-[11px] md:text-[10px] lg:text-[10px] text-blue-50">10MB</span>
              </div>
          </div>
                  </div>
                  </div>
              </div>

          {/* Section Header for Cards */}
          <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-36 mb-6 sm:mb-8" style={{ 
            animation: 'fadeInUp 1.2s ease-out 0.3s forwards',
            opacity: 0,
            willChange: 'opacity, transform' as any
          }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 font-['Montserrat'] mb-2">
                  Why choose <span className="font-bold text-primary">Flecsa</span>?
                  </h2>
                <p className="text-slate-600 text-sm sm:text-base font-['Montserrat']">
                  Everything you need for intelligent document management
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
                  <Gauge className="w-4 h-4 text-primary" />
                  <span className="text-primary text-xs sm:text-sm font-['Montserrat']">Lightning Fast</span>
            </div>
                <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">
                  <Check className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-700 text-xs sm:text-sm font-['Montserrat']">99.9% Uptime</span>
                  </div>
            </div>
          </div>
        </div>
                    
          {/* Professional Cards Design - Below the box, in line */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full">
            {/* Card 1: No manual work needed */}
            <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 lg:px-6 lg:py-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 group overflow-hidden flex-1 border border-slate-200/50 cursor-pointer" style={{ 
              animation: 'fadeInLeft 1.2s ease-out 0.5s forwards',
              opacity: 0,
              willChange: 'opacity, transform' as any
            }}>
              {/* Abstract background shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/30 rounded-full blur-3xl group-hover:bg-slate-300/40 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-200/20 rounded-full blur-2xl group-hover:bg-slate-300/30 transition-all duration-500"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>
              
              {/* Background image with very low opacity */}
              <div className="absolute inset-0 z-0 opacity-[0.06] overflow-hidden rounded-2xl sm:rounded-3xl">
                <img src={cardImage} alt="" className="w-full h-full object-cover rounded-2xl sm:rounded-3xl scale-[2.5] group-hover:scale-[2.6] transition-transform duration-500" />
                  </div>
                
              <div className="relative z-10 flex flex-col gap-2 sm:gap-3 lg:gap-2 h-full">
                {/* Icon */}
                <div className="w-10 h-10 lg:w-8 lg:h-8 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Bot className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                    </div>
                {/* Title */}
                <h3 className="text-slate-900 text-xl sm:text-2xl lg:text-xl font-bold font-['Montserrat'] tracking-tight group-hover:text-slate-800 transition-colors">No manual work needed</h3>
                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base lg:text-base font-['Montserrat'] leading-relaxed">Everything is controlled by AI. No manual work required — fully automated document management.</p>
                {/* CTA Button - aligned at bottom */}
                <div className="flex items-center gap-2 mt-auto">
                  <button className="bg-slate-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-3 lg:py-1.5 rounded-xl font-semibold text-xs sm:text-sm lg:text-xs hover:bg-slate-800 hover:scale-105 transition-all duration-300 font-['Montserrat']">
                    Effortless Automation
                  </button>
                    </div>
                </div>
              </div>
              
            {/* Card 2: Organized in real time */}
            <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 lg:px-6 lg:py-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 group overflow-hidden flex-1 border border-slate-200/50 cursor-pointer" style={{ 
              animation: 'fadeInUp 1.2s ease-out 0.6s forwards',
              opacity: 0,
              willChange: 'opacity, transform' as any
            }}>
              {/* Abstract background shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-slate-200/30 rounded-full blur-3xl group-hover:bg-slate-300/40 group-hover:scale-110 transition-all duration-500"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>
              
              {/* Background image with very low opacity */}
              <div className="absolute inset-0 z-0 opacity-[0.06] overflow-hidden rounded-2xl sm:rounded-3xl">
                <img src={cardImage2} alt="" className="w-full h-full object-cover rounded-2xl sm:rounded-3xl scale-[2.5] group-hover:scale-[2.6] transition-transform duration-500" />
                    </div>
                    
              <div className="relative z-10 flex flex-col gap-2 sm:gap-3 lg:gap-2 h-full">
                {/* Icon */}
                <div className="w-10 h-10 lg:w-8 lg:h-8 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                        </div>
                {/* Title */}
                <h3 className="text-slate-900 text-xl sm:text-2xl lg:text-xl font-bold font-['Montserrat'] tracking-tight group-hover:text-slate-800 transition-colors">Organized in real time</h3>
                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base lg:text-base font-['Montserrat'] leading-relaxed">Everything happens in real-time. Watch as your documents organize themselves instantly.</p>
                {/* CTA Button - aligned at bottom */}
                <div className="flex items-center gap-2 mt-auto">
                  <button className="bg-slate-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-3 lg:py-1.5 rounded-xl font-semibold text-xs sm:text-sm lg:text-xs hover:bg-slate-800 hover:scale-105 transition-all duration-300 font-['Montserrat']">
                    Real-Time Sync
                  </button>
                      </div>
                        </div>
                      </div>

            {/* Card 3: Search documents with AI */}
            <div className="relative bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 lg:px-6 lg:py-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 group overflow-hidden flex-1 border border-slate-200/50 cursor-pointer" style={{
              animation: 'fadeInRight 1.2s ease-out 0.7s forwards',
              opacity: 0,
              willChange: 'opacity, transform' as any
            }}>
              {/* Abstract background shapes */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-slate-200/20 rounded-full blur-3xl group-hover:bg-slate-300/30 group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-slate-200/30 rounded-full blur-3xl group-hover:bg-slate-300/40 group-hover:scale-110 transition-all duration-500"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/5 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>
              
              {/* Background image with very low opacity */}
              <div className="absolute inset-0 z-0 opacity-[0.06] overflow-hidden rounded-2xl sm:rounded-3xl">
                <img src={cardImage3} alt="" className="w-full h-full object-cover rounded-2xl sm:rounded-3xl scale-[2.5] group-hover:scale-[2.6] transition-transform duration-500" />
                </div>
                
              <div className="relative z-10 flex flex-col gap-2 sm:gap-3 lg:gap-2 h-full">
                {/* Icon */}
                <div className="w-10 h-10 lg:w-8 lg:h-8 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Search className="w-5 h-5 lg:w-4 lg:h-4 text-primary" />
                </div>
                {/* Title */}
                <h3 className="text-slate-900 text-xl sm:text-2xl lg:text-xl font-bold font-['Montserrat'] tracking-tight group-hover:text-slate-800 transition-colors">Search documents with AI</h3>
                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base lg:text-base font-['Montserrat'] leading-relaxed">Find any document instantly. Search by content, keywords, or ask the AI to find what you need.</p>
                {/* CTA Button - aligned at bottom */}
                <div className="flex items-center gap-2 mt-auto">
                  <button className="bg-slate-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-3 lg:py-1.5 rounded-xl font-semibold text-xs sm:text-sm lg:text-xs hover:bg-slate-800 hover:scale-105 transition-all duration-300 font-['Montserrat']">
                    AI Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section
        ref={(el) => setComparisonSectionRef(el as HTMLDivElement)}
        className="relative bg-slate-50 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      >
        
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10"
          style={{
            animation: isComparisonSectionVisible ? 'fadeInUp 1.2s ease-out 0.2s forwards' : 'none',
            opacity: isComparisonSectionVisible ? 1 : 0,
            willChange: 'opacity, transform' as any
          }}
        >
          {/* Badge */}
          <div className="flex justify-start mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-normal font-['Montserrat']">AI-Powered Organization</span>
            </div>
          </div>
          
          {/* Title and Subtitle with more visual interest */}
          <div className="text-left mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 leading-tight font-['Montserrat'] mb-4 max-w-2xl">
              <span className="block">Traditional inbox vs</span>
              <span className="block"><span className="font-bold text-primary">AI-powered</span> inbox</span>
            </h2>
            <p className="text-base sm:text-lg md:text-lg text-slate-600 font-['Montserrat'] max-w-xl mb-6">
              See the difference between managing files the old way and the Flecsa way. Experience how AI transforms document organization from chaos to clarity.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-slate-600 text-sm font-['Montserrat']">40 files organized today</span>
                  </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-slate-600 text-sm font-['Montserrat']">100% automated</span>
                  </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-slate-600 text-sm font-['Montserrat']">Zero manual work</span>
              </div>
            </div>
                    </div>

          {/* Comparison Container with hover effect */}
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow duration-300 group">
            {/* Comparison Slider */}
            <ComparisonSlider />
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section
        ref={(el) => setWorkSectionRef(el as HTMLDivElement)}
        className="relative bg-slate-50 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
              {/* Section Header */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 font-['Montserrat']"
              style={{ 
                animation: isWorkSectionVisible ? 'fadeInUp 1.2s ease-out 0.1s forwards' : 'none',
                opacity: 0,
                willChange: 'opacity, transform' as any
              }}
            >
              <span className="block">Work seamlessly across</span>
              <span className="block"><span className="font-bold text-primary">all platforms</span></span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Devices */}
            <div 
              className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500 group"
              style={{
                animation: isWorkSectionVisible ? 'fadeInLeft 1.2s ease-out 0.3s forwards' : 'none',
                opacity: isWorkSectionVisible ? 1 : 0,
                willChange: 'opacity, transform' as any
              }}
            >
              {/* Visual Content - 3D Blender image */}
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={blender3dImage} 
                  alt="3D Devices" 
                  className="w-full h-full object-contain p-4"
                />
                        </div>
              
              {/* Content below visual */}
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 font-['Montserrat']">
                  Access from any device
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6 font-['Montserrat'] leading-relaxed">
                  Your documents are always in sync across all your devices. Work seamlessly on mobile, tablet, or desktop.
                </p>
                
                {/* Device labels - 3 mini labels */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-2 group hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <Smartphone className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                    <span className="text-slate-600 text-xs font-['Montserrat']">Mobile</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-2 group hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <Laptop className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                    <span className="text-slate-600 text-xs font-['Montserrat']">Desktop</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-2 group hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <Monitor className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                    <span className="text-slate-600 text-xs font-['Montserrat']">Tablet</span>
            </div>
          </div>
            </div>
          </div>

            {/* Card 2: Multi-language */}
            <div 
              className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500 group"
              style={{
                animation: isWorkSectionVisible ? 'fadeInRight 1.2s ease-out 0.5s forwards' : 'none',
                opacity: isWorkSectionVisible ? 1 : 0,
                willChange: 'opacity, transform' as any
              }}
            >
              {/* Visual Content - Earth image */}
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center overflow-hidden">
                <img 
                  src={earthImage} 
                  alt="Multi-language support" 
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Content below visual */}
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 font-['Montserrat']">
                  Works in your language
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6 font-['Montserrat'] leading-relaxed">
                  Flecsa understands and works in over 20 languages. Search and organize documents in any language you prefer.
                </p>
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors font-['Montserrat'] group"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={faqSectionRef}
        className="relative bg-slate-50 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-16 sm:pb-20 md:pb-24 lg:pb-28"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-0 sm:pt-2"
          style={{
            opacity: isFaqSectionVisible ? 1 : 0,
            willChange: 'opacity' as any
          }}
        >
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4 sm:mb-6 font-['Montserrat']"
            style={{
              animation: isFaqSectionVisible ? 'fadeInUp 1.2s ease-out 0.1s forwards' : 'none',
              opacity: 0,
              willChange: 'opacity, transform' as any
            }}
          >
            Questions & answers
          </h2>
          
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
          >
            <AccordionItem 
              value="item-1" 
              className="border-b border-slate-200"
              style={{
                animation: isFaqSectionVisible ? 'fadeInUp 1.2s ease-out 0.3s forwards' : 'none',
                opacity: 0,
                willChange: 'opacity, transform' as any
              }}
            >
              <AccordionTrigger className="text-left font-['Montserrat'] text-slate-900 font-normal py-3 sm:py-4 text-base sm:text-lg md:text-lg lg:text-base xl:text-lg hover:no-underline">
                How does Flecsa work?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 font-['Montserrat'] text-sm sm:text-base md:text-base lg:text-sm xl:text-base pb-3 sm:pb-4">
                Flecsa uses AI to automatically organize your files. Just upload your documents or photos, and Flecsa analyzes, tags, and categorizes everything. Then you can find any file instantly using natural-language search.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-2" 
              className="border-b border-slate-200"
              style={{
                animation: isFaqSectionVisible ? 'fadeInUp 1.2s ease-out 0.5s forwards' : 'none',
                opacity: 0,
                willChange: 'opacity, transform' as any
              }}
            >
              <AccordionTrigger className="text-left font-['Montserrat'] text-slate-900 font-normal py-3 sm:py-4 text-base sm:text-lg md:text-lg lg:text-base xl:text-lg hover:no-underline">
                How does Flecsa protect my privacy?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 font-['Montserrat'] text-sm sm:text-base md:text-base lg:text-sm xl:text-base pb-3 sm:pb-4">
                Your data is fully encrypted. Files are never used to train AI models, and we don't sell or share your information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-3" 
              className="border-b border-slate-200"
              style={{
                animation: isFaqSectionVisible ? 'fadeInUp 1.2s ease-out 0.7s forwards' : 'none',
                opacity: 0,
                willChange: 'opacity, transform' as any
              }}
            >
              <AccordionTrigger className="text-left font-['Montserrat'] text-slate-900 font-normal py-3 sm:py-4 text-base sm:text-lg md:text-lg lg:text-base xl:text-lg hover:no-underline">
                Do I need to install anything?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 font-['Montserrat'] text-sm sm:text-base md:text-base lg:text-sm xl:text-base pb-3 sm:pb-4">
                No — Flecsa works directly in your browser. Just sign in and start uploading.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-4" 
              className="border-b border-slate-200"
              style={{
                animation: isFaqSectionVisible ? 'fadeInUp 1.2s ease-out 0.9s forwards' : 'none',
                opacity: 0,
                willChange: 'opacity, transform' as any
              }}
            >
              <AccordionTrigger className="text-left font-['Montserrat'] text-slate-900 font-normal py-3 sm:py-4 text-base sm:text-lg md:text-lg lg:text-base xl:text-lg hover:no-underline">
                What happens when I run out of credits?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 font-['Montserrat'] text-sm sm:text-base md:text-base lg:text-sm xl:text-base pb-3 sm:pb-4">
                You can still upload files normally. Automatic organization and AI search will pause until your credits renew next month.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
              </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-4 -ml-2">
                <img 
                  src={whiteFlecsaLogo} 
                  alt="Flecsa" 
                  className="h-16 sm:h-18 md:h-20 lg:h-24 w-auto"
                />
                </div>
              <p className="text-slate-300 text-sm font-['Montserrat'] mb-6 max-w-sm">
                Organize your documents with AI-powered intelligence. Never search for a file again.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-['Montserrat']">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@flecsa.com" className="hover:text-primary transition-colors">support@flecsa.com</a>
              </div>
              </div>

            {/* Links Columns */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-4 font-['Montserrat']">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/solution" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Solution
                  </Link>
                </li>
              </ul>
              </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-4 font-['Montserrat']">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/community" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-4 font-['Montserrat']">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-sm font-['Montserrat']">
                    Cookie Policy
                  </a>
                </li>
              </ul>
          </div>

            {/* Contact Support Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
            </div>
                <h4 className="font-semibold text-white font-['Montserrat']">Get Support</h4>
          </div>

              {!contactSuccess ? (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsContactSubmitting(true);
                    try {
                      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                      const response = await fetch(`${apiUrl}/api/contact/support`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email: contactForm.email,
                          message: contactForm.message
                        })
                      });
                      if (response.ok) {
                        setContactSuccess(true);
                        setContactForm({ email: '', message: '' });
                        setTimeout(() => setContactSuccess(false), 3000);
                      }
                    } catch (error) {
                      console.error('Error sending contact form:', error);
                      // Show success anyway for better UX
                      setContactSuccess(true);
                      setContactForm({ email: '', message: '' });
                      setTimeout(() => setContactSuccess(false), 3000);
                    } finally {
                      setIsContactSubmitting(false);
                    }
                  }}
                  className="space-y-2.5"
                >
                  <div className="relative">
                <input
                  type="email"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-['Montserrat']"
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none font-['Montserrat']"
                    />
                  </div>
            <button 
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full px-3 py-2 bg-primary text-white rounded-lg font-semibold text-xs hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-['Montserrat'] shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  >
                    {isContactSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        Send Message
                      </span>
                    )}
            </button>
              </form>
              ) : (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-primary" />
                    <p className="text-xs text-primary font-semibold font-['Montserrat']">Sent!</p>
                  </div>
                  <p className="text-xs text-slate-400 font-['Montserrat']">We'll respond soon</p>
              </div>
              )}
              </div>
            </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-xs sm:text-sm font-['Montserrat']">
                &copy; 2025 Flecsa. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.open('https://twitter.com/flecsa', '_blank')}
                  className="text-slate-400 hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com/company/flecsa', '_blank')}
                  className="text-slate-400 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => window.open('https://github.com/flecsa', '_blank')}
                  className="text-slate-400 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
            </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isEarlyAccessModalOpen} 
        onClose={() => setIsEarlyAccessModalOpen(false)} 
      />
    </div>
    </div>
  );
};

export default Landing;
