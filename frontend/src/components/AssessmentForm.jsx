import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Send, 
  X,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { submitAssessment } from '../services/api';

export default function AssessmentForm({ defaultType = 'FRESHER', defaultService = '', onCloseModal }) {
  const [candidateType, setCandidateType] = useState(defaultType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    yearsOfExperience: defaultType === 'FRESHER' ? '0' : '3',
    currentRole: '',
    targetRole: '',
    primarySkills: '',
    currentCtc: '',
    expectedCtc: '',
    noticePeriod: 'Immediate',
    currentLocation: '',
    preferredLocation: '',
    requiredService: defaultService || 'Fresher Job-Ready Accelerator',
    linkedInUrl: '',
    message: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultType) {
      setCandidateType(defaultType);
      if (defaultType === 'FRESHER') {
        setFormData(prev => ({
          ...prev,
          yearsOfExperience: '0',
          currentCtc: 'Fresher (0 LPA)',
          requiredService: defaultService || 'Fresher Job-Ready Accelerator'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          yearsOfExperience: '3.5',
          requiredService: defaultService || 'Experienced Switch Sprint (3-10+ Yrs)'
        }));
      }
    }
  }, [defaultType, defaultService]);

  const handleTypeChange = (type) => {
    setCandidateType(type);
    if (type === 'FRESHER') {
      setFormData(prev => ({
        ...prev,
        yearsOfExperience: '0',
        currentCtc: 'Fresher (0 LPA)',
        requiredService: 'Fresher Job-Ready Accelerator'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        yearsOfExperience: '3.5',
        requiredService: 'Experienced Switch Sprint (3-10+ Yrs)'
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max 10MB
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size must be under 10MB.');
        return;
      }
      setResumeFile(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.targetRole || !formData.primarySkills || !formData.requiredService) {
      setErrorMsg('Please fill in all mandatory fields: Name, Email, Phone, Target Role, Primary Skills, and Required Service.');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('candidateType', candidateType);
      data.append('yearsOfExperience', formData.yearsOfExperience || '0');
      data.append('currentRole', formData.currentRole || '');
      data.append('targetRole', formData.targetRole);
      data.append('primarySkills', formData.primarySkills);
      data.append('currentCtc', formData.currentCtc || '');
      data.append('expectedCtc', formData.expectedCtc || '');
      data.append('noticePeriod', formData.noticePeriod || '');
      data.append('currentLocation', formData.currentLocation || '');
      data.append('preferredLocation', formData.preferredLocation || '');
      data.append('requiredService', formData.requiredService);
      data.append('linkedInUrl', formData.linkedInUrl || '');
      data.append('message', formData.message || '');

      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      await submitAssessment(data);
      setSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit assessment. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="assessment" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              100% Free Profile Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Career Assessment & Profile Review
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Tell us about your background, goals, and target companies. Our senior mentors will analyze your profile and contact you within 24 hours.
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 sm:p-10">
            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Profile Submitted Successfully!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your details and resume have been securely saved to our mentor review pipeline.
                </p>
                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100 max-w-md mx-auto text-left text-xs text-brand-900 space-y-1.5 mb-8">
                  <div className="font-bold flex items-center gap-1.5 text-brand-700">
                    <Spark1 className="w-4 h-4" />
                    What happens next:
                  </div>
                  <div>1. A mentor reviews your ATS compatibility and skill gaps.</div>
                  <div>2. You will receive an email / WhatsApp message with your personalized diagnostic report.</div>
                  <div>3. We schedule your 1-on-1 strategy call.</div>
                </div>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setResumeFile(null);
                    if (onCloseModal) onCloseModal();
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-brand-600 text-white hover:bg-brand-700 shadow-md transition-all"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Candidate Type Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Select Your Career Stage <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('FRESHER')}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3.5 ${
                        candidateType === 'FRESHER'
                          ? 'border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${candidateType === 'FRESHER' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Fresher / Graduate</div>
                        <div className="text-xs text-slate-500">0 - 1 years experience</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange('EXPERIENCED')}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3.5 ${
                        candidateType === 'EXPERIENCED'
                          ? 'border-purple-600 bg-purple-50/70 text-purple-900 ring-2 ring-purple-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${candidateType === 'EXPERIENCED' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Experienced Professional</div>
                        <div className="text-xs text-slate-500">3 - 10+ years experience</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Primary Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>
                </div>

                {/* Roles & Experience Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="30"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Current Role / Degree
                    </label>
                    <input
                      type="text"
                      name="currentRole"
                      placeholder={candidateType === 'FRESHER' ? 'B.Tech CSE (2024)' : 'Software Engineer'}
                      value={formData.currentRole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Target Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="targetRole"
                      required
                      placeholder="e.g. Java Full Stack Developer"
                      value={formData.targetRole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>
                </div>

                {/* Primary Skills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Tech Skills <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="primarySkills"
                    required
                    placeholder="e.g. Java, Spring Boot, React, MySQL, AWS, Docker"
                    value={formData.primarySkills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Separate multiple technologies with commas</span>
                </div>

                {/* CTC and Notice Period */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Current CTC
                    </label>
                    <input
                      type="text"
                      name="currentCtc"
                      placeholder={candidateType === 'FRESHER' ? 'Fresher (0 LPA)' : 'e.g. 10 LPA'}
                      value={formData.currentCtc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Expected CTC
                    </label>
                    <input
                      type="text"
                      name="expectedCtc"
                      placeholder="e.g. 18-20 LPA"
                      value={formData.expectedCtc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Notice Period
                    </label>
                    <select
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900 bg-white"
                    >
                      <option value="Immediate">Immediate / 0-15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                      <option value="Currently Serving">Currently Serving Notice</option>
                    </select>
                  </div>
                </div>

                {/* Locations and Service Required */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Current Location
                    </label>
                    <input
                      type="text"
                      name="currentLocation"
                      placeholder="e.g. Bangalore, India"
                      value={formData.currentLocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      name="preferredLocation"
                      placeholder="e.g. Remote / Bangalore / Pune"
                      value={formData.preferredLocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Required Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="requiredService"
                      required
                      value={formData.requiredService}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900 bg-white"
                    >
                      <option value="Fresher Job-Ready Accelerator">Fresher Job-Ready Accelerator</option>
                      <option value="Experienced Switch Sprint (3-10+ Yrs)">Experienced Switch Sprint (3-10+ Yrs)</option>
                      <option value="ATS Resume Engineering">ATS Resume Engineering</option>
                      <option value="1-on-1 Mock Interviews & Feedback">1-on-1 Mock Interviews & Feedback</option>
                      <option value="Referral Assistance Through Network">Referral Assistance Through Network</option>
                      <option value="Complete Mentorship Bundle">Complete Mentorship Bundle</option>
                    </select>
                  </div>
                </div>

                {/* LinkedIn and Resume Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedInUrl"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedInUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Resume Upload (PDF / DOC / DOCX - Max 10MB)
                    </label>
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-xl p-3 text-center transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                        {resumeFile ? (
                          <>
                            <FileText className="w-4 h-4 text-brand-600" />
                            <span className="font-semibold text-brand-700 truncate max-w-[200px]">
                              {resumeFile.name}
                            </span>
                            <span className="text-[10px] text-slate-600">({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-slate-400" />
                            <span>Click or drag your resume file here</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message / Specific Career Questions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message / Current Challenges
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us about specific challenges you are currently facing (e.g., getting rejected in system design, no calls from Naukri, need help with Spring Boot projects)..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  />
                </div>

                {/* Error Message */}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-indigo-700 shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Your Profile...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Free Career Assessment</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-600 mt-3">
                    🔒 Your information is confidential and will never be shared without your explicit consent.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

function Spark1(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
