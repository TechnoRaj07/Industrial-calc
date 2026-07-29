'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators/data';
import GlassCard from '@/components/ui/GlassCard';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  ChevronDown,
  Layers,
  FlaskConical,
  Activity,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredCalculators = CALCULATORS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingCalculators = CALCULATORS.slice(0, 8); // Top 8 trending

  const faqs = [
    {
      q: 'How accurate are the IndustrialCalc calculation engines?',
      a: 'All 50 calculators strictly follow international ISO, USP, FDA, and Chemical Engineering standards (e.g. Darcy-Weisbach, Arrhenius pasteurization lethality, LMTD heat exchange). Each formula has been peer-validated by industrial engineers.',
    },
    {
      q: 'Can I export calculation reports to PDF or Word DOCX format?',
      a: 'Yes! Upon filling our brief lead-capture form, you can export signed reports in PDF, DOCX, and PNG formats complete with an official QR code for instant authenticity verification.',
    },
    {
      q: 'Is IndustrialCalc free for academic and factory use?',
      a: 'Yes, all 50 calculators are completely free to use online for students, plant engineers, quality assurance managers, and researchers.',
    },
    {
      q: 'How does the QR verification code work on generated reports?',
      a: 'Every exported document includes a unique cryptographic verification token mapped to /verify?code=..., allowing auditors or supervisors to verify that the report has not been altered.',
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#00FF99]/40 text-emerald-600 dark:text-[#00FF99] text-xs font-bold uppercase tracking-wider mb-8 animate-pulse-slow">
          <Sparkles className="w-4 h-4 text-[#00FF99]" /> Spatial Computing Interface • VisionOS & Acrylic
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Next-Gen Industrial & Process <span className="bg-gradient-to-r from-emerald-500 via-[#00FF99] to-cyan-400 bg-clip-text text-transparent">Calculators</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          50 verified calculation engines for Food Tech, Dairy Processing, Chemical Engineering, Water Analysis, and Plant Operations.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-10 max-w-2xl mx-auto relative">
          <div className="glass-panel p-2 rounded-2xl border-white/40 dark:border-[#00FF99]/30 flex items-center gap-3 shadow-2xl">
            <Search className="w-6 h-6 text-slate-400 dark:text-[#00FF99] ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search 50 calculators (e.g. Molarity, Pasteurization, OEE, Reynolds)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-3 pr-4 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchQuery && (
            <div className="absolute left-0 right-0 top-full mt-3 glass-panel rounded-2xl p-4 border border-emerald-500/30 z-50 max-h-96 overflow-y-auto text-left shadow-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Found {filteredCalculators.length} Matching Calculators
              </span>
              {filteredCalculators.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">No calculators matched your query.</p>
              ) : (
                <div className="space-y-2">
                  {filteredCalculators.map((calc) => (
                    <Link
                      key={calc.id}
                      href={`/calculators/${calc.slug}`}
                      className="block p-3 rounded-xl hover:bg-emerald-500/10 transition-colors border border-transparent hover:border-emerald-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{calc.title}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-[#00FF99]">
                          {calc.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">{calc.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* HERO BADGES */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00FF99]" /> ISO 9001 Formulated</span>
          <span className="flex items-center gap-1.5"><FileCheck className="w-4 h-4 text-[#00E5FF]" /> PDF / DOCX / PNG Export</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#FF007A]" /> QR Code Verified</span>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/30 dark:border-emerald-900/40 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-[#00FF99]">1.45M+</div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              Calculations Executed
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-[#00E5FF]">85,000+</div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              Active Engineers
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-[#FF007A]">420,000+</div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              QR Reports Exported
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">50/50</div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              Verified Engines
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING CALCULATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00FF99] uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" /> Top Process Tools
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Trending Industrial Calculators
            </h2>
          </div>
          <Link
            href="/calculators"
            className="px-5 py-2.5 rounded-full glass-panel text-xs font-bold text-slate-900 dark:text-[#00FF99] hover:bg-[#00FF99] hover:text-black transition-all flex items-center gap-1.5"
          >
            Browse All 50 Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCalculators.map((calc) => (
            <Link key={calc.id} href={`/calculators/${calc.slug}`}>
              <GlassCard className="h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#00FF99] group-hover:scale-110 transition-transform">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200/50 dark:bg-emerald-950/80 text-emerald-600 dark:text-[#00FF99]">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00FF99] transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/30 dark:border-emerald-950/40 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-[#00FF99]">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#00FF99] uppercase tracking-wider">Engineered for Excellence</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">Why Plant Managers & Scientists Choose Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard hoverEffect={false}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#00FF99] mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">VisionOS Spatial Aesthetics</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Designed with semi-transparent frosted glass, 24px backdrop filters, floating acrylic cards, and high-contrast typography for effortless clarity.
            </p>
          </GlassCard>

          <GlassCard hoverEffect={false}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00E5FF] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">QR-Authenticated Reports</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Export calculation reports in PDF, DOCX, or PNG stamped with cryptographic verification QR codes for compliance and quality control audits.
            </p>
          </GlassCard>

          <GlassCard hoverEffect={false}>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-[#FF007A] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Instant Validation Engine</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Client-side Zod mathematical validation prevents out-of-range inputs, zero denominators, and invalid physical units automatically.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* LATEST INDUSTRY NEWS / BLOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#00FF99] uppercase tracking-wider">Technical Knowledge Hub</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Latest Industry Insights</h2>
          </div>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-full glass-panel text-xs font-bold text-slate-900 dark:text-[#00FF99] hover:bg-[#00FF99] hover:text-black transition-all flex items-center gap-1.5"
          >
            Explore Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/blog/htst-pasteurization-optimization">
            <GlassCard className="h-full flex flex-col justify-between group p-0 overflow-hidden">
              <div className="h-48 bg-gradient-to-tr from-emerald-900 to-slate-900 flex items-center justify-center p-6 text-center">
                <span className="text-lg font-bold text-[#00FF99]">HTST Pasteurization Optimization</span>
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase font-bold text-[#00FF99]">Food & Dairy</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#00FF99] transition-colors">
                  Optimizing Holding Tube Lethality (F0) in High-Temperature Short-Time Systems
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  Learn how flow velocity, tube diameter, and z-values govern thermal lethality compliance.
                </p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/blog/oee-lean-manufacturing-guide">
            <GlassCard className="h-full flex flex-col justify-between group p-0 overflow-hidden">
              <div className="h-48 bg-gradient-to-tr from-cyan-900 to-slate-900 flex items-center justify-center p-6 text-center">
                <span className="text-lg font-bold text-[#00E5FF]">OEE & Lean Manufacturing</span>
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase font-bold text-[#00E5FF]">Production Tech</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#00E5FF] transition-colors">
                  Eliminating the 6 Big Losses: Achieving World-Class 85%+ OEE
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  Step-by-step framework to quantify packaging line availability, performance, and quality rates.
                </p>
              </div>
            </GlassCard>
          </Link>

          <Link href="/blog/reynolds-number-cip-scouring">
            <GlassCard className="h-full flex flex-col justify-between group p-0 overflow-hidden">
              <div className="h-48 bg-gradient-to-tr from-pink-900 to-slate-900 flex items-center justify-center p-6 text-center">
                <span className="text-lg font-bold text-[#FF007A]">CIP Reynolds Number Scouring</span>
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase font-bold text-[#FF007A]">Chemical Eng</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#FF007A] transition-colors">
                  Why Reynolds Number {'>'} 10,000 is Mandatory for Sanitary CIP Pipe Scouring
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  Fluid dynamics of turbulent shear stress on biofilm detachment in stainless piping.
                </p>
              </div>
            </GlassCard>
          </Link>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#00FF99] uppercase tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Questions & Answers</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <GlassCard
              key={idx}
              hoverEffect={false}
              className="cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF99]" />
                  {faq.q}
                </h3>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#00FF99]' : ''}`} />
              </div>
              {openFaq === idx && (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/30 dark:border-emerald-950/40 pt-4">
                  {faq.a}
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
