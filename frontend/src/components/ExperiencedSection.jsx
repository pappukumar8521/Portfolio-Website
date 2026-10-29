import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Briefcase, 
  FileCheck, 
  Layers, 
  Cpu, 
  MessageSquareCode, 
  Users2, 
  DollarSign, 
  Network
} from 'lucide-react';

export default function ExperiencedSection({ onSelectExperienced }) {
  const commonProblems = [
    {
      title: "Resume Not Getting Shortlisted",
      desc: "Years of experience compressed into generic bullet points without metrics, failing automated recruiter screeners."
    },
    {
      title: "Technical Interview Rejection",
      desc: "Getting stuck on complex Low-Level (LLD) or High-Level System Design (HLD) architecture and trade-off questions."
    },
    {
      title: "Difficulty Explaining Complex Projects",
      desc: "Struggling to articulate multi-year architecture, microservices scaling, and distributed system trade-offs crisply."
    },
    {
      title: "Managerial Round Rejection",
      desc: "Failing behavioral, cultural, or conflict resolution rounds with engineering directors and VPs."
    },
    {
      title: "Difficulty Switching Companies",
      desc: "Being stuck at the same organization for 4+ years and feeling disconnected from current hiring standards."
    },
    {
      title: "Lack of Clear Interview Strategy",
      desc: "Applying randomly without structured company targeting, notice-period leveraging, or counter-offer gameplans."
    }
  ];

  const switchServices = [
    {
      icon: FileCheck,
      title: "Senior Profile & Resume Audit",
      desc: "Rewrite your experience focusing on business metrics, latency reduction, cost savings, and architectural leadership."
    },
    {
      icon: Layers,
      title: "Experience Positioning",
      desc: "Reframe day-to-day maintenance work into strategic system ownership, technical leadership, and engineering impact."
    },
    {
      icon: Cpu,
      title: "Technical & System Design Prep",
      desc: "Master HLD & LLD: caching strategies, database sharding, CAP theorem, message queues, and fault tolerance."
    },
    {
      icon: MessageSquareCode,
      title: "Scenario-Based Problem Solving",
      desc: "Crack open-ended architectural and debugging scenarios asked by Tier-1 product companies and global GCCs."
    },
    {
      icon: Users2,
      title: "Managerial Round Coaching",
      desc: "Craft convincing narratives for cross-functional leadership, mentoring juniors, handling deadlocks, and missed deadlines."
    },
    {
      icon: Briefcase,
      title: "Senior-Level Mock Interviews",
      desc: "1-on-1 mocks with Principal Architects and Engineering Managers with brutally honest, actionable feedback."
    },
    {
      icon: TrendingUp,
      title: "Strategic Job-Switch Blueprint",
      desc: "Notice period optimization, timing applications across multiple companies to build parallel hiring pipelines."
    },
    {
      icon: DollarSign,
      title: "Salary Negotiation Guidance",
      desc: "Tactics to negotiate fixed vs. variable pay, RSUs, sign-on bonuses, and counter-offers with corporate HRs."
    },
    {
      icon: Network,
      title: "Referral Assistance Where Available",
      desc: "Direct referrals routed through internal senior networks in leading tech corporations and product consultancies."
    }
  ];

  return (
    <section id="experienced" className="py-20 md:py-28 bg-slate-50/70 relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
            Mid & Senior Career Switch Track (3 to 10+ Years)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Level Up Your Next Move: <span className="gradient-text">Higher CTC & Senior Roles</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Switching companies after 3+ years requires a completely different playbook. We help you reposition your experience, dominate system design, and negotiate top-of-band packages.
          </p>
        </div>

        {/* Section 1: Common Bottlenecks Faced */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Common Problems Holding Experienced Engineers Back
            </h3>
            <p className="text-sm text-slate-600 mt-1">Sound familiar? These bottlenecks prevent 80% of candidates from landing top-bracket offers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {commonProblems.map((prob, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-amber-200/60 shadow-xs hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
              >
                <div className="w-2 h-full absolute left-0 top-0 bg-amber-400/80" />
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  {prob.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Experienced Services Grid */}
        <div className="mb-14">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
              How HireMitra Accelerates Your Job Switch
            </h3>
            <p className="text-sm text-slate-600 mt-1">End-to-end guidance designed specifically for mid, senior, and lead engineering roles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {switchServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-100 border border-purple-100 flex items-center justify-center text-purple-700 mb-5 transition-colors">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Experienced CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200 mb-3">
              Confidential & Discretion Assured
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Ready to break the ceiling on your compensation & title?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Share your current experience, target companies, and expected package. Get an expert review of your market value and tailored switch roadmap.
            </p>
          </div>

          <button
            onClick={() => onSelectExperienced ? onSelectExperienced() : null}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
          >
            <span>Plan My Job Switch</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
