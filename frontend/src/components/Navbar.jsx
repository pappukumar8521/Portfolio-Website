import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  Menu, 
  X, 
  GraduationCap, 
  Users, 
  FileCheck, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenAssessment }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-purple flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                Hire<span className="text-brand-600">Mitra</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">
                Career Acceleration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button 
              onClick={() => scrollToSection('freshers')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Freshers
            </button>
            <button 
              onClick={() => scrollToSection('experienced')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Experienced Pros
            </button>
            <button 
              onClick={() => scrollToSection('referrals')} 
              className="hover:text-brand-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Referral Network
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-50 text-brand-700 rounded-full border border-brand-200">
                Network
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Plans
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-brand-600 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              to="/admin" 
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Admin Portal
            </Link>
            
            <button
              onClick={() => onOpenAssessment ? onOpenAssessment() : scrollToSection('assessment')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-200 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Career Assessment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenAssessment ? onOpenAssessment() : scrollToSection('assessment')}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-brand-600 rounded-lg shadow-sm"
            >
              Assessment
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            <button
              onClick={() => scrollToSection('freshers')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Freshers Acceleration</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('experienced')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Experienced Professionals (3-10+ Yrs)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('referrals')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Referral Network Support</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>All Services</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Pricing & Plans</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Frequently Asked Questions</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Contact Mentors</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssessment ? onOpenAssessment() : scrollToSection('assessment');
                }}
                className="w-full py-3 rounded-xl font-bold text-center text-white bg-brand-600 hover:bg-brand-700 shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Get Free Career Assessment</span>
              </button>
              
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

