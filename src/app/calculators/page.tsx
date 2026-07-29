'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators/data';
import { CalculatorCategory } from '@/types';
import GlassCard from '@/components/ui/GlassCard';
import { Search, FlaskConical, ArrowRight, Filter } from 'lucide-react';

const CATEGORIES: ('All' | CalculatorCategory)[] = [
  'All',
  'General Chemistry',
  'Industrial Processes',
  'Food & Dairy',
  'Biotechnology',
  'Chemical Engineering',
  'Water & Environmental',
  'Quality Control',
  'Utilities & Automation',
  'Packaging & Modern Tech',
];

export default function CalculatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | CalculatorCategory>('All');
  const [search, setSearch] = useState('');

  const filtered = CALCULATORS.filter((calc) => {
    const matchesCategory = selectedCategory === 'All' || calc.category === selectedCategory;
    const matchesSearch =
      calc.title.toLowerCase().includes(search.toLowerCase()) ||
      calc.description.toLowerCase().includes(search.toLowerCase()) ||
      calc.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#00FF99]/40 text-emerald-600 dark:text-[#00FF99] text-xs font-bold uppercase tracking-wider">
          <FlaskConical className="w-4 h-4 text-[#00FF99]" /> Comprehensive Industrial Suite
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          50 Specialized Industrial Calculators
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Search or filter by domain to select calculation engines for process validation, chemical stoichiometry, or plant utility metrics.
        </p>

        {/* SEARCH BAR */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="glass-panel p-2 rounded-2xl border-white/40 dark:border-[#00FF99]/30 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 dark:text-[#00FF99] ml-3" />
            <input
              type="text"
              placeholder="Search by calculator name or formula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-5xl mx-auto py-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#00FF99] text-black shadow-lg shadow-[#00FF99]/20 scale-105'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CALCULATOR GRID */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Showing {filtered.length} of {CALCULATORS.length} Calculators
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl">
            <Filter className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No calculators found matching search.</p>
            <p className="text-xs text-slate-500 mt-1">Try switching categories or clearing search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.slug}`}>
                <GlassCard className="h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-[#00FF99]">
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
                    <span>Open Calculator</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
