import React from 'react';
import { 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Video, 
  GitBranch, 
  DollarSign, 
  Network, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ServicesSection({ onOpenAssessment }) {
  const servicesList = [
    {
      icon: FileText,
      tag: "High Impact",
      title: "ATS-Optimized Resume Engineering",
      desc: "Transform your CV into a metric-driven document optimized for Applicant Tracking Systems with tailored keywords, quantifiable achievements, and modern typography.",
      features: [
        "90%+ ATS parse rate compatibility",
        "Role-targeted keywords (Taleo, Workday)",
        "Accomplishment metrics (XYZ formula)",
        "LinkedIn profile sync & summary upgrade"
      ]
    },
    {
      icon: GraduationCap,
      tag: "Freshers",
      title: "Fresher Job-Ready Accelerator",
      desc: "Designed specifically for engineering and MCA graduates looking to bridge the college-to-corporate gap with real-world technical skills and portfolio projects.",
      features: [
        "Java, Spring Boot, React & SQL foundational drills",
        "Live GitHub project mentorship",
        "Communication & HR behavioral coaching",
        "Referral assistance where available"
      ]
    },
    {
      icon: Briefcase,
      tag: "Experienced",
      title: "Experienced Switch Sprint (3-10+ Yrs)",
      desc: "Fast-track your lateral move to higher compensation brackets, tier-1 tech firms, or engineering leadership roles with specialized coaching.",
      features: [
        "Low-Level & High-Level System Design (LLD/HLD)",
        "Architectural narrative & trade-off framing",
        "Director & VP managerial round readiness",
        "Multiple offer leveraging strategy"
      ]
    },
    {
      icon: Video,
      tag: "Practice",
      title: "1-on-1 Technical & HR Mock Interviews",
      desc: "Simulate rigorous live interviews with seasoned industry engineers who evaluate your logic, coding standards, system design, and communication.",
      features: [
        "60-minute recorded video mock sessions",
        "Live shared coding & architecture whiteboard",
        "Detailed rubric scoring across 6 key areas",
        "Personalized weak-spot remediation plan"
      ]
    },
    {
      icon: GitBranch,
      tag: "Practical",
      title: "Production Project Mentorship",
      desc: "Move beyond boilerplate clones. Build scalable microservices, secure authentication, database indexes, and deploy to AWS/Vercel.",
      features: [
        "Real-world microservices architecture",
        "Clean commit history & professional READMEs",
        "Containerization with Docker",
        "Live deployed demo links for recruiters"
      ]
    },
    {
      icon: DollarSign,
      tag: "Compensation",
      title: "Salary Negotiation & Offer Strategy",
      desc: "Never leave money on the table. Learn proven compensation negotiation scripts to maximize fixed pay, sign-on bonuses, and stock grants.",
      features: [
        "Market benchmark data across 50+ companies",
        "Notice period management playbooks",
        "Competing offer leverage strategies",
        "Effective email templates for HR conversations"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50/50 relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            End-To-End Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Comprehensive Career Services Built for <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every step of your career transformation is covered with structured, hands-on, and personalized mentorship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesList.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-600 group-hover:text-white border border-brand-100 flex items-center justify-center text-brand-600 transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {svc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenAssessment ? onOpenAssessment(svc.title) : null}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-brand-600 hover:text-white hover:bg-brand-600 bg-brand-50/70 border border-brand-200/60 transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

