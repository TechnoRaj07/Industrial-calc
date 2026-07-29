'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  // Dynamic Contact & Map Config from Admin Panel
  const [contactInfo, setContactInfo] = useState({
    supportEmail: 'support@industrialcalc.app',
    supportPhone: '+1 (800) 555-CALC',
    headquartersAddress: 'Industrial Technology Park, Suite 400',
    mapLocationText: 'San Francisco, CA • Zurich, Switzerland',
  });

  useEffect(() => {
    const saved = localStorage.getItem('industrialcalc_siteConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContactInfo({
          supportEmail: parsed.supportEmail || 'support@industrialcalc.app',
          supportPhone: parsed.supportPhone || '+1 (800) 555-CALC',
          headquartersAddress: parsed.headquartersAddress || 'Industrial Technology Park, Suite 400',
          mapLocationText: parsed.mapLocationText || 'San Francisco, CA • Zurich, Switzerland',
        });
      } catch (e) {
        console.warn('Error reading contact config', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Contact IndustrialCalc Engineering</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Have questions regarding custom formula integration or enterprise licensing? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-7">
          <GlassCard hoverEffect={false}>
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00FF99] mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-400">Our engineering team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF99]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF99]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 555 0199"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF99]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your calculation query..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF99]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-[#00FF99] hover:text-black font-bold text-white transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Dynamic Info & Map Cards */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard hoverEffect={false} className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00FF99]" />
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Support Email</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{contactInfo.supportEmail}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#00E5FF]" />
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Engineering Hotline</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{contactInfo.supportPhone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#FF007A]" />
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Global Headquarters</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{contactInfo.headquartersAddress}</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="h-48 flex items-center justify-center text-center p-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4">
              <MapPin className="w-8 h-8 text-[#00FF99] mb-2 animate-bounce" />
              <span className="text-xs font-bold text-white">Interactive Global Map Center</span>
              <span className="text-[10px] text-slate-400 mt-1">{contactInfo.mapLocationText}</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
