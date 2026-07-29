'use client';

import Link from 'next/link';
import { Cpu, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full mt-24 border-t border-slate-200/40 dark:border-emerald-950/60 bg-white/30 dark:bg-[#030B07]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-[#00FF99] p-0.5">
                <div className="w-full h-full bg-[#051810] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#00FF99]" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Industrial<span className="text-[#00FF99]">Calc</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              VisionOS-inspired industrial engineering & chemical process calculator platform for Food, Dairy, Biotechnology, Chemical Engineering, and QC operations.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-[#00FF99]">
                ISO 9001 & Industrial Compliance Ready
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/calculators" className="hover:text-[#00FF99] transition-colors">General Chemistry</Link></li>
              <li><Link href="/calculators" className="hover:text-[#00FF99] transition-colors">Industrial Processes</Link></li>
              <li><Link href="/calculators" className="hover:text-[#00FF99] transition-colors">Food & Dairy Tech</Link></li>
              <li><Link href="/calculators" className="hover:text-[#00FF99] transition-colors">Biotechnology</Link></li>
              <li><Link href="/calculators" className="hover:text-[#00FF99] transition-colors">Water Analysis</Link></li>
              <li><Link href="/calculators" className="hover:text-[#00FF99] transition-colors">Quality Control</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-[#00FF99] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#00FF99] transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-[#00FF99] transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#00FF99] transition-colors">Disclaimer</Link></li>
              <li><Link href="/verify" className="hover:text-[#00FF99] transition-colors">QR Verification</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Subscribe for process engineering updates and industry insights.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-[#00FF99] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl glass-panel text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00FF99]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-[#00FF99] hover:text-black text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/30 dark:border-emerald-950/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} IndustrialCalc Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>VisionOS Acrylic Interface</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">Verified Calculation Engines</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
