import React, { useState } from 'react';
import { X, Network, Send, CheckCircle2, AlertCircle, FileText, Upload } from 'lucide-react';
import { submitReferralRequest } from '../services/api';

export default function ReferralModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    currentCompany: '',
    targetCompany: 'Capgemini',
    roleTitle: '',
    experienceYears: '2',
    linkedInUrl: '',
    notes: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const companies = [
    'Capgemini',
    'Accenture',
    'Deloitte',
    'Tech Mahindra',
    'TCS',
    'Infosys',
    'Wipro',
    'Cognizant',
    'Other MNC / Product Startup'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.candidateName || !formData.candidateEmail || !formData.candidatePhone || !formData.roleTitle) {
      setErrorMsg('Please fill in Candidate Name, Email, Phone, and Role Title.');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('candidateName', formData.candidateName);
      data.append('candidateEmail', formData.candidateEmail);
      data.append('candidatePhone', formData.candidatePhone);
      data.append('currentCompany', formData.currentCompany || '');
      data.append('targetCompany', formData.targetCompany);
      data.append('roleTitle', formData.roleTitle);
      data.append('experienceYears', formData.experienceYears || '0');
      data.append('linkedInUrl', formData.linkedInUrl || '');
      data.append('notes', formData.notes || '');

      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      await submitReferralRequest(data);
      setSuccess(true);
    } catch (err) {
      console.error('Referral request error:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit referral inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-brand-200 mb-2">
              <Network className="w-3 h-3" />
              Network Verification
            </div>
            <h3 className="text-xl font-bold">Request Referral Eligibility Check</h3>
            <p className="text-xs text-slate-300 mt-1">
              Referral assistance may be available based on role, eligibility, openings and network availability.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Referral Request Received</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
                Our referral coordination team will evaluate your profile against active job codes at <span className="font-semibold text-slate-900">{formData.targetCompany}</span>.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    required
                    placeholder="e.g. Amit Kumar"
                    value={formData.candidateName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="candidateEmail"
                    required
                    placeholder="amit@example.com"
                    value={formData.candidateEmail}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="candidatePhone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.candidatePhone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="targetCompany"
                    value={formData.targetCompany}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900 bg-white"
                  >
                    {companies.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Role Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="roleTitle"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.roleTitle}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Years of Total Experience
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Company (if working)
                  </label>
                  <input
                    type="text"
                    name="currentCompany"
                    placeholder="e.g. Current Employer / Fresher"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedInUrl"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resume File (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Job Requisition ID or Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  placeholder="Paste Job ID or link if you already have a specific opening in mind..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Referral Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

