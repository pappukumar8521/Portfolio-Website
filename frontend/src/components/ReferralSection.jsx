import React from 'react';
import { 
  Network, 
  ShieldAlert, 
  CheckCircle, 
  ExternalLink, 
  Info, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function ReferralSection({ onRequestReferral }) {
  // Specified target companies
  const targetCompanies = [
    {
      name: "Capgemini",
      tagline: "Global Leader in Consulting & Technology Services",
      color: "from-blue-600 to-cyan-700",
      roles: "Software Engineer, Full Stack, Cloud",
      initials: "CAP"
    },
    {
      name: "Accenture",
      tagline: "Strategy, Consulting & Digital Innovation",
      color: "from-purple-600 to-indigo-700",
      roles: "Application Lead, Senior Analyst, Architect",
      initials: "ACC"
    },
    {
      name: "Deloitte",
      tagline: "Global Tech Advisory & Enterprise Solutions",
      color: "from-emerald-600 to-teal-700",
      roles: "Consultant, Solutions Architect, Backend",
      initials: "DEL"
    },
    {
      name: "Tech Mahindra",
      tagline: "Connected World & Digital Transformation",
      color: "from-red-600 to-rose-700",
      roles: "Associate Engineer, Java Developer, QA",
      initials: "TM"
    },
    {
      name: "TCS",
      tagline: "Tata Consultancy Services - IT Services Leader",
      color: "from-blue-700 to-indigo-800",
      roles: "Systems Engineer, IT Analyst, Project Manager",
      initials: "TCS"
    },
    {
      name: "Infosys",
      tagline: "Next-Gen Digital Services & Cloud Consulting",
      color: "from-sky-600 to-blue-700",
      roles: "Specialist Programmer, Tech Lead, DevOps",
      initials: "INF"
    },
    {
      name: "Wipro",
      tagline: "Pioneering IT Consulting & Business Process",
      color: "from-violet-600 to-indigo-800",
      roles: "Project Engineer, Senior Developer, Data",
      initials: "WIP"
    },
    {
      name: "Cognizant",
      tagline: "Modernizing Technology & Business Operations",
      color: "from-cyan-600 to-blue-800",
      roles: "Programmer Analyst, Associate, Full Stack",
      initials: "COG"
    }
  ];

  return (
    <section id="referrals" className="py-20 md:py-28 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Network className="w-3.5 h-3.5 text-brand-600" />
            Alumni & Industry Connections
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Referral Assistance Through Professional Network
          </h2>

          {/* Prompt Mandatory Text */}
          <p className="text-base sm:text-lg font-medium text-brand-700 bg-brand-50/70 p-4 rounded-xl border border-brand-100 max-w-2xl mx-auto mb-6">
            "Referral assistance may be available based on role, eligibility, openings and network availability."
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Skip the generic applicant tracking queue. When relevant vacancies open up, our network of verified alumni and working professionals can route eligible candidate profiles internally.
          </p>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {targetCompanies.map((comp, idx) => (
            <div 
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-300 shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${comp.color} text-white font-extrabold text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                    {comp.initials}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200">
                    Network Circle
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
                  {comp.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                  {comp.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-600 flex items-center justify-between">
                <span className="truncate text-slate-500">Popular: {comp.roles.split(',')[0]}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Business Disclaimer Banner */}
        <div className="max-w-4xl mx-auto bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 sm:p-6 mb-10 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold block mb-1">Important Ethical & Compliance Disclaimer:</span>
            "Referral assistance does not guarantee interview selection or employment. Final hiring decisions are made by the respective company."
            <br />
            HireMitra provides profile preparation and professional network matchmaking. We do not charge companies for referrals nor do we claim official corporate affiliation or endorsement by any named organizations.
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => onRequestReferral ? onRequestReferral() : null}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Check My Referral Eligibility</span>
          </button>
        </div>

      </div>
    </section>
  );
}
