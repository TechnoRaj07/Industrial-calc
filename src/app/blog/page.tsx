'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog/data';
import GlassCard from '@/components/ui/GlassCard';
import { Newspaper, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Food & Dairy', 'Production & AI', 'Chemical Eng', 'AI in Manufacturing', 'Biotechnology'];

  const filtered = BLOG_POSTS.filter(
    (post) => selectedCat === 'All' || post.category === selectedCat
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#00FF99]/40 text-emerald-600 dark:text-[#00FF99] text-xs font-bold uppercase tracking-wider">
          <Newspaper className="w-4 h-4 text-[#00FF99]" /> Industrial Knowledge Hub
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Industry News & Process Tech Articles
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Researched articles on pasteurization, OEE, fluid dynamics, membrane separation, and AI in food manufacturing.
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCat === cat
                ? 'bg-[#00FF99] text-black'
                : 'glass-panel text-slate-700 dark:text-slate-300 hover:text-emerald-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <GlassCard className="h-full flex flex-col justify-between group p-0 overflow-hidden">
              <div
                className="h-48 bg-cover bg-center flex items-end p-4 relative"
                style={{ backgroundImage: `url(${post.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00FF99] text-black">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00FF99] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/30 dark:border-emerald-950/40 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-[#00FF99]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
