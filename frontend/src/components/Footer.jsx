import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ShieldAlert, Heart, Lock, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Hire<span className="text-brand-400">Mitra</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Empowering ambitious freshers and experienced software engineers to bridge skill gaps, build production portfolios, ace technical rounds, and achieve high-impact career switches.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dedicated Career Support & Mentorship Platform</span>
            </div>
          </div>

          {/* Quick Links: Career Tracks */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Career Tracks
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollTo('freshers')} className="hover:text-white transition-colors text-left">
                  Freshers Acceleration
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experienced')} className="hover:text-white transition-colors text-left">
                  Experienced Switch (3-10+ Yrs)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('referrals')} className="hover:text-white transition-colors text-left flex items-center gap-1.5">
                  <span>Network Referrals</span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-brand-900 text-brand-300 rounded font-semibold">Available</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors text-left">
                  ATS Resume Engineering
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors text-left">
                  1-on-1 Mock Interviews
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Company & Platform */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors text-left">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors text-left">
                  Transparent Plans
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors text-left">
                  Contact Advisors
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('assessment')} className="text-brand-400 font-semibold hover:text-brand-300 transition-colors text-left">
                  Free Career Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Admin & Governance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/admin" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-brand-400 transition-colors font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Management Portal</span>
                </Link>
              </li>
              <li className="text-slate-300">
                Data Privacy & Encryption Active
              </li>
              <li className="text-slate-300">
                Recruitment Policy Compliant
              </li>
            </ul>

            <div className="mt-6">
              <button 
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Business & Legal Disclaimer Box */}
        <div className="pt-8 border-t border-slate-800/80 mb-8">
          <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block mb-0.5">
                Official Business & Ethical Notice:
              </span>
              HireMitra operates strictly as a career mentorship, interview preparation, and professional referral support platform. We strictly do NOT offer or claim "100% job guarantees", "guaranteed selection", or "guaranteed referrals". Referral assistance may be available based on role, eligibility, openings, and network availability. Referral assistance does not guarantee interview selection or employment. Final hiring decisions are made solely by the respective employer. All trademarks and company names belong to their respective holders and are used strictly for informational identification purposes without claim of official corporate partnership.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <p>© {new Date().getFullYear()} HireMitra. All rights reserved. Crafted for ambitious engineers.</p>
          <div className="flex items-center gap-6">
            <span>Career Support</span>
            <span>•</span>
            <span>Interview Preparation</span>
            <span>•</span>
            <span>Professional Network Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
