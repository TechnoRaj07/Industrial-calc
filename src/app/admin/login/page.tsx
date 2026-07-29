'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import { ShieldCheck, Mail, ArrowRight, Key, Info } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@industrialcalc.app');
  const [password, setPassword] = useState('Admin@2026');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      cleanEmail === 'admin@industrialcalc.app' ||
      cleanEmail === 'admin' ||
      cleanPassword === 'Admin@2026' ||
      cleanPassword === 'admin' ||
      cleanPassword === 'admin123'
    ) {
      localStorage.setItem('adminAuthenticated', 'true');
      document.cookie = 'adminAuth=true; path=/';
      window.location.href = '/admin';
    } else {
      setError('Invalid credentials. Use admin@industrialcalc.app and Admin@2026');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-[#00FF99] mx-auto flex items-center justify-center text-[#00FF99]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Authentication</h1>
          <p className="text-xs text-slate-400">Access IndustrialCalc Control Console</p>
        </div>

        <GlassCard hoverEffect={false}>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-white text-sm focus:outline-none focus:border-[#00FF99]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-white text-sm focus:outline-none focus:border-[#00FF99]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00FF99] text-black font-extrabold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Sign In to Admin Console <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* CREDENTIALS BADGE */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#00FF99] font-bold">
              <Info className="w-4 h-4" /> Default Admin Login Credentials:
            </div>
            <div className="font-mono bg-slate-950 p-3 rounded-xl border border-emerald-950 text-slate-300 space-y-1">
              <div><span className="text-slate-500">Email:</span> admin@industrialcalc.app (or admin)</div>
              <div><span className="text-slate-500">Password:</span> Admin@2026 (or admin)</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
