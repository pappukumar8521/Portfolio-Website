import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aakash Sharma",
      role: "Associate Software Engineer",
      company: "Capgemini",
      tag: "Fresher Track",
      quote: "As a tier-3 college graduate, I had zero interview calls despite sending 200+ applications. HireMitra revamped my resume for ATS, helped me build a real microservices project, and coached me on Java/Spring questions. Got placed within 45 days!",
      rating: 5,
      metrics: "0 to 3 interview calls in 3 weeks"
    },
    {
      name: "Priyanka Nambiar",
      role: "Senior Java Developer",
      company: "Deloitte",
      tag: "Experienced Switch (5 Yrs)",
      quote: "Having 5 years of experience, my main struggle was clearing high-level system design and explaining legacy migration. The mock interviews were rigorous and pinpointed exactly where I was rambling. Switched with a 65% hike.",
      rating: 5,
      metrics: "65% compensation increase"
    },
    {
      name: "Rohan Gupta",
      role: "Frontend Engineer",
      company: "Tech Mahindra",
      tag: "Fresher Track",
      quote: "The practical feedback on my React portfolio and the honesty of the mentors stood out. No fake promises, just rock-solid preparation and referral support through an alumnus who works there.",
      rating: 5,
      metrics: "Landed role in 1st round referral"
    },
    {
      name: "Deepak Varma",
      role: "Lead Full Stack Architect",
      company: "Cognizant",
      tag: "Experienced Switch (7 Yrs)",
      quote: "The managerial round coaching and salary negotiation strategy alone were worth 10x the effort. They taught me how to present trade-offs like a principal engineer and negotiate across 2 competing offers.",
      rating: 5,
      metrics: "Doubled variable bonus + base"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            Candidate Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Real Stories. Real Preparation. <span className="gradient-text">Real Placements.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Read how engineering graduates and seasoned developers elevated their career trajectories with HireMitra.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 hover:border-brand-200 hover:bg-white shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    {t.tag}
                  </span>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-brand-200/80 absolute -top-3 -left-2 -z-0 opacity-40" />
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed relative z-10 italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.role} @ <span className="text-slate-800 font-semibold">{t.company}</span></p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.metrics}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
