'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog/data';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';

export default function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#00FF99] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
      </Link>

      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00FF99]/20 text-[#00FF99]">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-200/30 dark:border-emerald-950/40 pb-4">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#00FF99]" /> {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#00E5FF]" /> {post.readTime}</span>
        </div>
      </div>

      <div
        className="h-80 w-full rounded-3xl bg-cover bg-center border border-white/20 shadow-2xl"
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      />

      <GlassCard hoverEffect={false} className="prose dark:prose-invert max-w-none p-8 sm:p-12 leading-relaxed">
        <div className="whitespace-pre-line text-slate-800 dark:text-slate-200 space-y-6">
          {post.content}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/30 dark:border-emerald-950/40 flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-[#00FF99]" />
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full glass-panel text-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
