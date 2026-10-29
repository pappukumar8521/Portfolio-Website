import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  GraduationCap, 
  Sparkles, 
  Network, 
  Mail, 
  Search, 
  Filter, 
  Download, 
  LogOut, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  Eye, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  getAdminStats, 
  getCandidates, 
  updateCandidate, 
  getReferrals, 
  updateReferral,
  getContacts, 
  updateContact 
} from '../services/api';
import CandidateDetailModal from './CandidateDetailModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('candidates'); // 'candidates' | 'referrals' | 'contacts'
  
  // Dashboard stats
  const [stats, setStats] = useState({
    totalCandidates: 0,
    freshersCount: 0,
    experiencedCount: 0,
    newRequestsCount: 0,
    referralRequestsCount: 0,
    contactRequestsCount: 0
  });

  // Candidate pipeline state
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Referral inquiries state
  const [referrals, setReferrals] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(false);

  // Contact requests state
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Current admin user info
  const [adminUser, setAdminUser] = useState(null);

  const statusColors = {
    NEW: 'bg-blue-100 text-blue-800 border-blue-200',
    UNDER_REVIEW: 'bg-purple-100 text-purple-800 border-purple-200',
    CONTACTED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    PREPARATION: 'bg-amber-100 text-amber-800 border-amber-200',
    REFERRAL_REQUESTED: 'bg-pink-100 text-pink-800 border-pink-200',
    REFERRAL_ASSISTED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    COMPLETED: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  const statusLabels = {
    NEW: 'New',
    UNDER_REVIEW: 'Under Review',
    CONTACTED: 'Contacted',
    PREPARATION: 'Preparation',
    REFERRAL_REQUESTED: 'Referral Requested',
    REFERRAL_ASSISTED: 'Referral Assisted',
    COMPLETED: 'Completed'
  };

  useEffect(() => {
    const token = localStorage.getItem('hiremitra_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const userStored = localStorage.getItem('hiremitra_admin_user');
    if (userStored) {
      setAdminUser(JSON.parse(userStored));
    }
    fetchStats();
    fetchCandidates();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const res = await getAdminStats();
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchCandidates = async () => {
    try {
      setLoadingCandidates(true);
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedType !== 'ALL') params.candidateType = selectedType;
      if (selectedStatus !== 'ALL') params.status = selectedStatus;

      const res = await getCandidates(params);
      if (res.data.success) {
        setCandidates(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch candidates:', err);
    } finally {
      setLoadingCandidates(false);
    }
  };

  const fetchReferrals = async () => {
    try {
      setLoadingReferrals(true);
      const res = await getReferrals();
      if (res.data.success) {
        setReferrals(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch referrals:', err);
    } finally {
      setLoadingReferrals(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true);
      const res = await getContacts();
      if (res.data.success) {
        setContacts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'referrals') fetchReferrals();
    if (activeTab === 'contacts') fetchContacts();
    if (activeTab === 'candidates') fetchCandidates();
  }, [activeTab]);

  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await updateCandidate(candidateId, { status: newStatus });
      setCandidates(prev => 
        prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
      );
      fetchStats();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update candidate status.');
    }
  };

  const handleReferralStatusChange = async (referralId, newStatus) => {
    try {
      await updateReferral(referralId, { status: newStatus });
      setReferrals(prev =>
        prev.map(r => r.id === referralId ? { ...r, status: newStatus } : r)
      );
      fetchStats();
    } catch (err) {
      console.error('Failed to update referral status:', err);
    }
  };

  const handleContactStatusChange = async (contactId, newStatus) => {
    try {
      await updateContact(contactId, { status: newStatus });
      setContacts(prev =>
        prev.map(c => c.id === contactId ? { ...c, status: newStatus } : c)
      );
      fetchStats();
    } catch (err) {
      console.error('Failed to update contact status:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hiremitra_admin_token');
    localStorage.removeItem('hiremitra_admin_user');
    navigate('/admin/login');
  };

  const handleExportCSV = () => {
    if (!candidates.length) return;
    const headers = [
      'ID', 'Name', 'Email', 'Phone', 'Type', 'Experience', 'Current Role', 
      'Target Role', 'Primary Skills', 'Current CTC', 'Expected CTC', 
      'Notice Period', 'Current Location', 'Preferred Location', 
      'Required Service', 'Status', 'Submitted At'
    ];
    
    const rows = candidates.map(c => [
      c.id,
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      c.candidateType,
      c.yearsOfExperience,
      `"${c.currentRole || ''}"`,
      `"${c.targetRole || ''}"`,
      `"${(c.primarySkills || '').replace(/"/g, '""')}"`,
      `"${c.currentCtc || ''}"`,
      `"${c.expectedCtc || ''}"`,
      `"${c.noticePeriod || ''}"`,
      `"${c.currentLocation || ''}"`,
      `"${c.preferredLocation || ''}"`,
      `"${c.requiredService || ''}"`,
      c.status,
      `"${new Date(c.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HireMitra_Candidates_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Hire<span className="text-brand-600">Mitra</span>
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Admin Panel
                  </span>
                </span>
              </Link>

              <Link to="/" className="hidden sm:inline-flex text-xs font-medium text-slate-500 hover:text-brand-600">
                ← View Live Site
              </Link>
            </div>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800">{adminUser?.name || 'Administrator'}</span>
                <span className="text-[11px] text-slate-500">{adminUser?.email || 'admin@hiremitra.com'}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Statistics Header Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Candidates</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-900">{stats.totalCandidates}</span>
              <Users className="w-4 h-4 text-brand-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Freshers</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-sky-600">{stats.freshersCount}</span>
              <GraduationCap className="w-4 h-4 text-sky-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Experienced</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-purple-600">{stats.experiencedCount}</span>
              <Briefcase className="w-4 h-4 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">New Requests</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-amber-600">{stats.newRequestsCount}</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Referrals</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-brand-600">{stats.referralRequestsCount}</span>
              <Network className="w-4 h-4 text-brand-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contacts</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-emerald-600">{stats.contactRequestsCount}</span>
              <Mail className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'candidates'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidate Assessment Pipeline</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {stats.totalCandidates}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'referrals'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Referral Inquiries</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {stats.referralRequestsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {stats.contactRequestsCount}
            </span>
          </button>
        </div>

        {/* TAB 1: CANDIDATES PIPELINE */}
        {activeTab === 'candidates' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            
            {/* Filter and Search Bar */}
            <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/50">
              
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search candidate name, email, skills, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchCandidates()}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ALL">All Types</option>
                  <option value="FRESHER">Freshers</option>
                  <option value="EXPERIENCED">Experienced</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="PREPARATION">Preparation</option>
                  <option value="REFERRAL_REQUESTED">Referral Requested</option>
                  <option value="REFERRAL_ASSISTED">Referral Assisted</option>
                  <option value="COMPLETED">Completed</option>
                </select>

                {/* Filter Trigger button */}
                <button
                  onClick={fetchCandidates}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>

                {/* Export CSV button */}
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Type / Exp</th>
                    <th className="py-3.5 px-4">Role & Skills</th>
                    <th className="py-3.5 px-4">CTC (Cur / Exp)</th>
                    <th className="py-3.5 px-4">Notice</th>
                    <th className="py-3.5 px-4">Requirement</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Resume</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loadingCandidates ? (
                    <tr>
                      <td colSpan="10" className="py-12 text-center text-slate-500">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                          <span>Loading candidates pipeline...</span>
                        </div>
                      </td>
                    </tr>
                  ) : candidates.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-12 text-center text-slate-500">
                        No candidates found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    candidates.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        {/* Name & Contact */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.email}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{c.phone}</div>
                        </td>

                        {/* Experience */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            c.candidateType === 'FRESHER' ? 'bg-sky-100 text-sky-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {c.candidateType}
                          </span>
                          <div className="text-[11px] font-semibold text-slate-800 mt-1">
                            {c.yearsOfExperience} Yrs Exp
                          </div>
                        </td>

                        {/* Role & Skills */}
                        <td className="py-3.5 px-4 max-w-[200px]">
                          <div className="font-semibold text-slate-900 truncate" title={c.targetRole}>
                            {c.targetRole}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate" title={c.primarySkills}>
                            {c.primarySkills}
                          </div>
                        </td>

                        {/* CTC */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-[11px]">Cur: <span className="font-semibold">{c.currentCtc || 'N/A'}</span></div>
                          <div className="text-[11px] text-emerald-600 font-semibold">Exp: {c.expectedCtc || 'Negotiable'}</div>
                        </td>

                        {/* Notice */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-medium text-[11px]">{c.noticePeriod || 'Immediate'}</span>
                        </td>

                        {/* Requirement */}
                        <td className="py-3.5 px-4 max-w-[140px] truncate" title={c.requiredService}>
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-[11px] text-slate-700">
                            {c.requiredService}
                          </span>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={c.status}
                            onChange={(e) => handleStatusChange(c.id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${statusColors[c.status] || 'bg-slate-100'}`}
                          >
                            {Object.entries(statusLabels).map(([val, label]) => (
                              <option key={val} value={val}>{label}</option>
                            ))}
                          </select>
                        </td>

                        {/* Resume */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {c.resumeUrl ? (
                            <a
                              href={c.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-brand-600 hover:text-brand-800 font-bold inline-flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View CV</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">No file</span>
                          )}
                        </td>

                        {/* Created Date */}
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedCandidate(c)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
              <span>Showing {candidates.length} candidates</span>
              <span>Updated in real-time</span>
            </div>

          </div>
        )}

        {/* TAB 2: REFERRAL REQUESTS */}
        {activeTab === 'referrals' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Direct Referral Network Inquiries</h3>
                <p className="text-xs text-slate-500">Candidates who requested eligibility screening for target MNC openings</p>
              </div>
              <button
                onClick={fetchReferrals}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Target Company</th>
                    <th className="py-3.5 px-4">Role Title</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">LinkedIn / CV</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Notes</th>
                    <th className="py-3.5 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loadingReferrals ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-slate-500">Loading referrals...</td>
                    </tr>
                  ) : referrals.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-slate-500">No referral requests found yet.</td>
                    </tr>
                  ) : (
                    referrals.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div>{r.candidateName}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{r.candidateEmail}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{r.candidatePhone}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-brand-700">
                          {r.targetCompany}
                        </td>
                        <td className="py-3.5 px-4 font-medium">
                          {r.roleTitle}
                        </td>
                        <td className="py-3.5 px-4">
                          {r.experienceYears} Years
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          {r.linkedInUrl && (
                            <a href={r.linkedInUrl} target="_blank" rel="noreferrer" className="text-brand-600 block hover:underline">
                              LinkedIn ↗
                            </a>
                          )}
                          {r.resumeUrl && (
                            <a href={r.resumeUrl} target="_blank" rel="noreferrer" className="text-slate-800 block hover:underline font-semibold">
                              Resume ↗
                            </a>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={r.status}
                            onChange={(e) => handleReferralStatusChange(r.id, e.target.value)}
                            className="px-2 py-1 rounded-lg text-xs font-bold border bg-white focus:outline-none"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="UNDER_REVIEW">Under Review</option>
                            <option value="REFERRED">Referred</option>
                            <option value="NOT_ELIGIBLE">Not Eligible</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-[11px] text-slate-500" title={r.notes}>
                          {r.notes || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT INQUIRIES */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">General Mentorship Inquiries</h3>
                <p className="text-xs text-slate-500">Messages sent via the website contact form</p>
              </div>
              <button
                onClick={fetchContacts}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Sender</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Message</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {loadingContacts ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-500">Loading messages...</td>
                    </tr>
                  ) : contacts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-500">No contact inquiries yet.</td>
                    </tr>
                  ) : (
                    contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div>{c.name}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{c.email}</div>
                          {c.phone && <div className="text-[11px] text-slate-500 font-mono">{c.phone}</div>}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {c.subject || 'General Inquiry'}
                        </td>
                        <td className="py-3.5 px-4 max-w-md text-slate-600 leading-relaxed text-xs">
                          {c.message}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={c.status}
                            onChange={(e) => handleContactStatusChange(c.id, e.target.value)}
                            className="px-2 py-1 rounded-lg text-xs font-bold border bg-white focus:outline-none"
                          >
                            <option value="UNREAD">Unread</option>
                            <option value="READ">Read</option>
                            <option value="RESPONDED">Responded</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdated={() => {
            fetchCandidates();
            fetchStats();
          }}
        />
      )}

    </div>
  );
}

