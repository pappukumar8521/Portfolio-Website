import React from 'react';
import { 
  FileText, 
  Code2, 
  Github, 
  Layers, 
  MessageSquare, 
  Video, 
  UserCheck, 
  Send, 
  Share2, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function FreshersSection({ onSelectFresher }) {
  const fresherOfferings = [
    {
      icon: FileText,
      title: "ATS-Friendly Resume",
      description: "Custom-crafted resume built with modern formatting and keyword weights to guarantee high parsing scores on Workday and Taleo."
    },
    {
      icon: Code2,
      title: "Project Development Assistance",
      description: "Hands-on architectural guidance to build production-grade, end-to-end full stack projects rather than cloned tutorial apps."
    },
    {
      icon: Github,
      title: "GitHub & Portfolio Guidance",
      description: "Professional repository setup with clean git commits, robust README documentations, system diagrams, and live cloud demos."
    },
    {
      icon: Layers,
      title: "Java, Spring, React, SQL & Core Tech",
      description: "Targeted interview drills on Core Java, Spring Boot, React hooks, SQL optimizations, data structures, and OOPs concepts."
    },
    {
      icon: MessageSquare,
      title: "Communication Improvement",
      description: "Constructive verbal articulation coaching to explain technical concepts crisply without rambling or anxiety."
    },
    {
      icon: Video,
      title: "1-on-1 Mock Interviews",
      description: "Live, simulated technical interview rounds with detailed line-by-line feedback on code quality, speed, and approach."
    },
    {
      icon: UserCheck,
      title: "HR & Behavioral Preparation",
      description: "Structured STAR framework training for questions like 'Tell me about yourself', strengths/weaknesses, and situational conflicts."
    },
    {
      icon: Send,
      title: "Job Application Strategy",
      description: "Proven outbound search tactics across LinkedIn, Naukri, and angel platforms to reach hiring managers directly."
    },
    {
      icon: Share2,
      title: "Referral Assistance Where Available",
      description: "Direct connection with verified internal employees at MNCs and tech startups when relevant entry-level openings arise."
    }
  ];

  return (
    <section id="freshers" className="py-20 md:py-28 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Launchpad for 2023, 2024 & 2025 Graduates
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Freshers: From College Graduate to <span className="gradient-text">Job-Ready Engineer</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stop sending hundreds of generic resumes into black holes. We prepare you with real skills, production portfolio projects, and structured interview coaching to stand out immediately.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {fresherOfferings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/80 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 hover:border-brand-300 shadow-sm hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-brand-50 border border-slate-200/80 group-hover:border-brand-200 flex items-center justify-center text-brand-600 shadow-xs mb-5 transition-colors">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-200/40 flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Included in Fresher Track</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fresher Track CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Ready to break into the tech industry with confidence?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book a personal assessment with an industry mentor. We review your current profile, find gap areas in your resume and code, and chart your clear roadmap.
            </p>
          </div>

          <button
            onClick={() => onSelectFresher ? onSelectFresher() : null}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
          >
            <span>Start My Fresher Journey</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
