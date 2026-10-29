import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Key } from 'lucide-react';
import { adminLogin } from '../services/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@hiremitra.com');
  const [password, setPassword] = useState('Admin@HireMitra2025');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setLoading(true);
      const res = await adminLogin({ email, password });
      
      if (res.data.success && res.data.token) {
        localStorage.setItem('hiremitra_admin_token', res.data.token);
        localStorage.setItem('hiremitra_admin_user', JSON.stringify(res.data.user));
        if (onLoginSuccess) onLoginSuccess(res.data.user);
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.response?.data?.message || 'Invalid login credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@hiremitra.com');
    setPassword('Admin@HireMitra2025');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black tracking-tight text-white">
            Hire<span className="text-brand-400">Mitra</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Admin Management Portal
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Sign in to review candidate pipelines, referrals, and contact queries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/98 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-700/30">
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  placeholder="admin@hiremitra.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 p-3.5 rounded-2xl text-xs text-slate-600">
            <div className="flex items-center justify-between mb-1.5 font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-brand-600" />
                Pre-configured Admin Access
              </span>
              <button 
                type="button" 
                onClick={handleFillDemo} 
                className="text-[11px] font-bold text-brand-600 hover:underline"
              >
                Autofill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              User: <span className="text-slate-800">admin@hiremitra.com</span>
              <br />
              Pass: <span className="text-slate-800">Admin@HireMitra2025</span>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              ← Return to Main Website
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

