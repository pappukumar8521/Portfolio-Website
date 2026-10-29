import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreshersSection from './components/FreshersSection';
import ExperiencedSection from './components/ExperiencedSection';
import ReferralSection from './components/ReferralSection';
import ServicesSection from './components/ServicesSection';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import AssessmentForm from './components/AssessmentForm';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ReferralModal from './components/ReferralModal';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function MainWebsite() {
  const [assessmentType, setAssessmentType] = useState('FRESHER');
  const [assessmentService, setAssessmentService] = useState('Fresher Job-Ready Accelerator');
  const [referralModalOpen, setReferralModalOpen] = useState(false);

  const handleOpenAssessment = (serviceName, type = 'FRESHER') => {
    if (serviceName) setAssessmentService(serviceName);
    if (type) setAssessmentType(type);
    const el = document.getElementById('assessment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFresher = () => {
    setAssessmentType('FRESHER');
    setAssessmentService('Fresher Job-Ready Accelerator');
    const el = document.getElementById('assessment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectExperienced = () => {
    setAssessmentType('EXPERIENCED');
    setAssessmentService('Experienced Switch Sprint (3-10+ Yrs)');
    const el = document.getElementById('assessment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 flex flex-col">
      <Navbar onOpenAssessment={() => handleOpenAssessment()} />

      <main className="flex-grow">
        <Hero 
          onOpenAssessment={() => handleOpenAssessment()} 
          onGetStarted={handleGetStarted} 
        />
        
        <FreshersSection 
          onSelectFresher={handleSelectFresher} 
        />
        
        <ExperiencedSection 
          onSelectExperienced={handleSelectExperienced} 
        />
        
        <ReferralSection 
          onRequestReferral={() => setReferralModalOpen(true)} 
        />
        
        <ServicesSection 
          onOpenAssessment={(svc) => handleOpenAssessment(svc)} 
        />
        
        <HowItWorks 
          onOpenAssessment={() => handleOpenAssessment()} 
        />
        
        <PricingSection 
          onOpenAssessment={(svc) => handleOpenAssessment(svc)} 
        />
        
        <TestimonialsSection />
        
        <FAQSection />
        
        <AssessmentForm 
          defaultType={assessmentType} 
          defaultService={assessmentService} 
        />
        
        <ContactSection />
      </main>

      <Footer />

      {/* Referral Assessment Request Modal */}
      <ReferralModal
        isOpen={referralModalOpen}
        onClose={() => setReferralModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainWebsite />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<MainWebsite />} />
    </Routes>
  );
}
