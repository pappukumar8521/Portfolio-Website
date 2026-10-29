import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileCheck2, 
  Target, 
  TrendingUp, 
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';

export default function Hero({ onOpenAssessment, onGetStarted }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-400/15 via-indigo-400/20 to-purple-400/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Banner Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-sm shadow-brand-500/5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-800">
              Honest, Transparent & Real Career Guidance
            </span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-flex items-center text-xs font-medium text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600 mr-1" />
              100% Zero Fake Guarantees
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Build Your Profile.{' '}
            <span className="gradient-text">Crack Your Interview.</span>{' '}
            <br className="hidden sm:inline" />
            Make Your Next Career Move.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            Practical career support for freshers and experienced professionals — from ATS-ready resumes and projects to interview preparation and referral assistance.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => onGetStarted ? onGetStarted() : scrollTo('freshers')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 text-indigo-200" />
            </button>

            <button
              onClick={() => onOpenAssessment ? onOpenAssessment() : scrollTo('assessment')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-5 h-5 text-brand-600" />
              <span>Get Career Assessment</span>
            </button>
          </div>

          {/* Key Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200/60">
            <div className="flex flex-col items-center p-3 text-center">
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">500+</div>
              <div className="text-xs font-medium text-slate-600 mt-1">Candidates Mentored</div>
            </div>
            
            <div className="flex flex-col items-center p-3 text-center">
              <div className="text-2xl lg:text-3xl font-extrabold text-brand-600">94%</div>
              <div className="text-xs font-medium text-slate-600 mt-1">ATS Shortlist Rate</div>
            </div>

            <div className="flex flex-col items-center p-3 text-center">
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">3–10+ Yrs</div>
              <div className="text-xs font-medium text-slate-600 mt-1">Switch Guidance</div>
            </div>

            <div className="flex flex-col items-center p-3 text-center">
              <div className="text-2xl lg:text-3xl font-extrabold text-emerald-600">Ethical</div>
              <div className="text-xs font-medium text-slate-600 mt-1">Network Referrals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
