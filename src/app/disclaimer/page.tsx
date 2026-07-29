'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { sanitizeHTML } from '@/lib/security/sanitizer';

export default function DisclaimerPage() {
  const [pageData, setPageData] = useState({
    title: 'Engineering Disclaimer',
    content: `<h2>1. Professional Verification Required</h2><p>All calculations on IndustrialCalc are designed using validated mathematical models. However, users are advised to verify critical plant safety calculations with certified process engineers.</p>`,
  });

  useEffect(() => {
    const saved = localStorage.getItem('industrialcalc_pagesConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.disclaimer) {
          setPageData(parsed.disclaimer);
        }
      } catch (e) {
        console.warn('Error loading disclaimer page data', e);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">{pageData.title}</h1>

      <GlassCard hoverEffect={false} className="prose dark:prose-invert max-w-none space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(pageData.content) }} />
      </GlassCard>
    </div>
  );
}
