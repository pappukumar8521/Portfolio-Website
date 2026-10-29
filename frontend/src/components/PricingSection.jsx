import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function PricingSection({ onOpenAssessment }) {
  const plans = [
    {
      name: "ATS Resume & Profile Overhaul",
      popular: false,
      tagline: "Ideal for quick shortlist improvements",
      price: "₹999",
      period: "one-time",
      features: [
        "Single & two-page ATS optimized formats",
        "Role-tailored keyword engineering",
        "Quantified impact metric bullet points",
        "LinkedIn headline & summary rewrite",
        "2 rounds of revisions within 14 days",
        "Email support from lead resume analyst"
      ],
      serviceName: "ATS Resume Engineering",
      buttonText: "Revamp My Resume"
    },
    {
      name: "Fresher Job-Ready Accelerator",
      popular: true,
      tagline: "Complete hand-holding from college to offer",
      price: "Custom",
      period: "mentorship plan",
      features: [
        "Everything in ATS Resume Overhaul",
        "Production-grade full stack project mentorship",
        "GitHub repository and live deployment setup",
        "Java / React / SQL technical interview drills",
        "3 full-length 1-on-1 mock interviews (recorded)",
        "HR behavioral & communication training",
        "Referral assistance through network where available"
      ],
      serviceName: "Fresher Job-Ready Accelerator",
      buttonText: "Start Fresher Track"
    },
    {
      name: "Experienced Switch Sprint",
      popular: false,
      tagline: "For mid & senior engineers (3-10+ Yrs)",
      price: "Custom",
      period: "switch track",
      features: [
        "Executive & Senior ATS profile positioning",
        "Low-Level & High-Level System Design (LLD/HLD)",
        "Architecture trade-offs & technical storytelling",
        "Director / VP managerial round coaching",
        "Salary negotiation & counter-offer playbooks",
        "Notice period management strategy",
        "Referral routing across tier-1 MNCs & product firms"
      ],
      serviceName: "Experienced Switch Sprint (3-10+ Yrs)",
      buttonText: "Plan My Switch"
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50/60 relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            Transparent & Honest
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Affordable, High-ROI Career Investment Plans
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            No predatory loans. No fake guarantee traps. Only honest, personalized mentorship crafted to generate real interview callbacks.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? 'bg-white border-2 border-brand-600 shadow-xl shadow-brand-500/10 lg:-translate-y-2'
                  : 'bg-white border border-slate-200/80 shadow-xs hover:shadow-card-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
                  Most Popular For Graduates
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-500">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/ {plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    What's Included:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenAssessment ? onOpenAssessment(plan.serviceName) : null}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                    plan.popular
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="text-center max-w-2xl mx-auto text-xs text-slate-600 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
          <span>Fair pricing policy: Every candidate receives a free initial profile review before any engagement starts.</span>
        </div>

      </div>
    </section>
  );
}
