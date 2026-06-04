import React from "react";
import { 
  Menu, 
  X, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Search, 
  ShieldCheck,
  Globe
} from "lucide-react";
import { motion } from "motion/react";

interface NavigationProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onOpenSeoOverlay: () => void;
}

export default function Navigation({ currentTab, onChangeTab, onOpenSeoOverlay }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: "hero", label: "Beranda" },
    { id: "resume", label: "Pengalaman & Keahlian" },
    { id: "portfolio", label: "Portofolio Projek" },
    { id: "blog", label: "Blog & Artikel" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md" id="main-header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo / Title Branding */}
          <div className="flex flex-col cursor-pointer" onClick={() => onChangeTab("hero")} id="nav-branding">
            <span className="font-mono text-xs font-bold tracking-widest text-indigo-600">FERLIN TURNIP</span>
            <span className="font-sans text-sm font-semibold text-slate-900 tracking-tight">IT Project Manager & EA</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1" id="desktop-navbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentTab === item.id 
                    ? "text-indigo-600 font-semibold" 
                    : "text-slate-600 hover:text-indigo-500 hover:bg-slate-50"
                }`}
                id={`btn-nav-${item.id}`}
              >
                {item.label}
                {currentTab === item.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Accessories (Technical SEO status & Contact Badge) */}
          <div className="hidden lg:flex items-center space-x-3" id="desktop-nav-accessories">
            <button
              onClick={onOpenSeoOverlay}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-emerald-100 bg-emerald-50/60 text-emerald-700 text-xs font-mono font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
              title="Periksa Kepatuhan Technical SEO & GEO"
              id="btn-seo-diagnostics"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              <span>SEO/GEO Active</span>
            </button>
            
            <a 
              href="https://www.linkedin.com/in/ferlin-firdaus-turnip/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              id="btn-nav-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center space-x-2" id="mobile-nav-toggle-block">
            <button
              onClick={onOpenSeoOverlay}
              className="p-1 px-2.5 rounded-full border border-emerald-100 bg-emerald-50/70 text-emerald-700 text-xs font-mono"
              id="btn-nav-mobile-seo"
            >
              SEO
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              id="btn-mobile-hamburger"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-slate-100 bg-white"
          id="mobile-menu-drawer"
        >
          <div className="space-y-1 px-2 pb-4 pt-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-colors ${
                  currentTab === item.id
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                id={`btn-nav-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-50 px-4 space-y-2" id="mobile-nav-footer">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>DKI Jakarta, ID</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Mail className="h-3.5 w-3.5" />
                <span>ferlinfturnip@gmail.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
