import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  MapPin, 
  FileText, 
  ExternalLink, 
  Save, 
  Calendar, 
  DollarSign, 
  Clock, 
  Sparkles,
  Download
} from 'lucide-react';
import { updateCandidate } from '../services/api';

export default function CandidateDetailModal({ candidate, onClose, onUpdated }) {
  if (!candidate) return null;

  const [status, setStatus] = useState(candidate.status || 'NEW');
  const [adminNotes, setAdminNotes] = useState(candidate.adminNotes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const statuses = [
    { value: 'NEW', label: 'New', color: 'bg-blue-100 text-blue-800' },
    { value: 'UNDER_REVIEW', label: 'Under Review', color: 'bg-purple-100 text-purple-800' },
    { value: 'CONTACTED', label: 'Contacted', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'PREPARATION', label: 'Preparation', color: 'bg-amber-100 text-amber-800' },
    { value: 'REFERRAL_REQUESTED', label: 'Referral Requested', color: 'bg-pink-100 text-pink-800' },
    { value: 'REFERRAL_ASSISTED', label: 'Referral Assisted', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-slate-100 text-slate-800' }
  ];

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateCandidate(candidate.id, {
        status,
        adminNotes
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Failed to update candidate:', err);
      alert('Failed to save candidate updates.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{candidate.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  candidate.candidateType === 'FRESHER' ? 'bg-sky-500/20 text-sky-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {candidate.candidateType}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Submitted on {new Date(candidate.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-sm">
          
          {/* Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-600" />
              <div className="truncate">
                <div className="text-[10px] text-slate-600 uppercase font-bold">Email</div>
                <a href={`mailto:${candidate.email}`} className="text-xs font-semibold text-slate-800 hover:underline">
                  {candidate.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-600" />
              <div>
                <div className="text-[10px] text-slate-600 uppercase font-bold">Phone</div>
                <a href={`tel:${candidate.phone}`} className="text-xs font-semibold text-slate-800 hover:underline">
                  {candidate.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-600" />
              <div>
                <div className="text-[10px] text-slate-600 uppercase font-bold">Location</div>
                <span className="text-xs font-semibold text-slate-800">
                  {candidate.currentLocation || 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Target Role</span>
                <span className="font-semibold text-slate-900 text-base">{candidate.targetRole}</span>
              </div>

              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Experience</span>
                <span className="font-semibold text-slate-900">{candidate.yearsOfExperience} Years</span>
                {candidate.currentRole && (
                  <span className="text-xs text-slate-500 block">Current: {candidate.currentRole}</span>
                )}
              </div>

              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Notice Period</span>
                <span className="font-semibold text-slate-900">{candidate.noticePeriod || 'Immediate'}</span>
              </div>

              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Preferred Location</span>
                <span className="font-semibold text-slate-900">{candidate.preferredLocation || 'Any'}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Required Service</span>
                <span className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 font-bold text-xs inline-block">
                  {candidate.requiredService}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Compensation (CTC)</span>
                <div className="text-xs text-slate-700">
                  Current: <span className="font-semibold">{candidate.currentCtc || 'N/A'}</span>
                  <br />
                  Expected: <span className="font-semibold text-emerald-600">{candidate.expectedCtc || 'Negotiable'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">LinkedIn Profile</span>
                {candidate.linkedInUrl ? (
                  <a 
                    href={candidate.linkedInUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-brand-600 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>View LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-600">None provided</span>
                )}
              </div>

              <div>
                <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Uploaded Resume</span>
                {candidate.resumeUrl ? (
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / View Resume</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-600 italic">No file uploaded</span>
                )}
              </div>
            </div>
          </div>

          {/* Primary Skills */}
          <div>
            <span className="text-xs text-slate-600 uppercase font-bold block mb-2">Primary Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {candidate.primarySkills.split(',').map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Candidate's Message */}
          {candidate.message && (
            <div>
              <span className="text-xs text-slate-600 uppercase font-bold block mb-1">Candidate Note / Goals</span>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                "{candidate.message}"
              </div>
            </div>
          )}

          {/* Admin Workflow & Notes Section */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Admin Workflow & Recruitment Notes
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Update Candidate Pipeline Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-800 bg-white focus:ring-2 focus:ring-brand-500"
                >
                  {statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Internal Notes (Visible only to mentors/admins)
                </label>
                <textarea
                  rows="3"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Cleared 1st mock. Recommended for Capgemini/Deloitte referral."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saveSuccess ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  ✓ Changes updated successfully!
                </span>
              ) : <div />}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Pipeline Changes'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
