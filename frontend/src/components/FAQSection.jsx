import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does the ATS Resume Engineering process work?",
      a: "Applicant Tracking Systems (like Workday, Taleo, Greenhouse, and Lever) parse resumes for specific role-relevant keywords, structural headings, and impact metrics. We analyze your target job descriptions, rebuild your resume layout to ensure 100% parse accuracy, and reframe your achievements using the XYZ metric formula ('Accomplished [X], as measured by [Y], by doing [Z]')."
    },
    {
      q: "Does HireMitra provide guaranteed jobs or guaranteed selections?",
      a: "No. We strictly do NOT make false promises such as '100% job guarantee' or 'guaranteed selection'. Hiring decisions are made strictly and solely by the recruiting companies based on candidate performance. What we guarantee is rigorous, top-quality interview preparation, production portfolio mentorship, and referral assistance where openings and eligibility align."
    },
    {
      q: "How does Referral Assistance through the professional network work?",
      a: "Referral assistance connects eligible, thoroughly vetted candidate profiles with our network of working alumni and senior professionals across companies like Capgemini, Accenture, Deloitte, Tech Mahindra, TCS, Infosys, Wipro, Cognizant, and product startups. An internal referral gives your resume direct visibility with the hiring manager or internal recruiter, bypassing the public queue. As always, referral assistance may be available based on role, eligibility, openings, and network availability."
    },
    {
      q: "I have 4-8 years of experience. How will this help my lateral job switch?",
      a: "For experienced candidates, the evaluation shifts from basic coding to architectural design, production trade-offs, and managerial maturity. We focus heavily on Low-Level (LLD) and High-Level System Design (HLD), microservices migration narratives, conflict resolution in engineering teams, and strategic multi-offer salary negotiation."
    },
    {
      q: "What tech stacks and roles do you provide interview preparation for?",
      a: "We cover Full Stack Web Development (React, Node.js, Express), Java & Spring Boot microservices, Python / Django, SQL & NoSQL database performance optimization, Cloud & DevOps fundamentals (Docker, AWS), and Core Computer Science fundamentals (DSA, OOPs, OS, DBMS, System Design)."
    },
    {
      q: "How are the 1-on-1 mock interviews conducted?",
      a: "Each mock interview is conducted over a 60-minute live video session with an experienced software engineer. The session includes live coding/architecture on an interactive IDE/canvas, technical grilling, and behavioral evaluation, followed by an immediate verbal debrief and an actionable evaluation report card."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50/50 relative border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about our preparation tracks, network referrals, and mentorship.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg focus:outline-none hover:text-brand-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

