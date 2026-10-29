import React from 'react';
import { 
  ClipboardList, 
  Search, 
  Code, 
  Rocket, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HowItWorks({ onOpenAssessment }) {
  const steps = [
    {
      step: "01",
      icon: ClipboardList,
      title: "Submit Profile & Goals",
      desc: "Fill our quick assessment form with your current experience, target roles, tech stack, and resume. No upfront commitment required."
    },
    {
      step: "02",
      icon: Search,
      title: "1-on-1 Gap Analysis",
      desc: "A senior mentor evaluates your resume against industry benchmarks, identifies missing technical competencies, and maps out your customized switch timeline."
    },
    {
      step: "03",
      icon: Code,
      title: "Preparation & Mock Drills",
      desc: "Work through ATS resume optimization, build portfolio-worthy projects, and undergo rigorous recorded 1-on-1 mock interviews with live scoring."
    },
    {
      step: "04",
      icon: Rocket,
      title: "Referrals & Interview Crack",
      desc: "Apply with confidence. Where openings exist, get routed through internal alumni and employee networks to get your profile noticed faster."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            Structured 4-Step Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How HireMitra Works for You
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A transparent, practical framework designed to get you from uncertain to interview-ready in weeks.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/60 rounded-3xl p-7 border border-slate-200/80 hover:border-brand-300 hover:bg-white shadow-xs hover:shadow-card-hover transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-brand-200 group-hover:text-brand-600 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-brand-50 border border-slate-200/80 group-hover:border-brand-200 flex items-center justify-center text-brand-600 shadow-xs transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center text-xs font-bold text-brand-600 gap-1">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => onOpenAssessment ? onOpenAssessment() : null}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 hover:shadow-lg transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Begin Step 1: Submit Free Assessment</span>
          </button>
        </div>

      </div>
    </section>
  );
}

