'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function TermsPage() {
  const [pageData, setPageData] = useState({
    title: 'Terms of Service',
    content: `<h2>1. Acceptance of Terms</h2><p>By accessing IndustrialCalc, you agree to comply with our terms of service for engineering calculations.</p><h2>2. Disclaimer of Warranty</h2><p>Calculations are provided for process guidance and verification purposes. Final engineering designs should be audited by certified plant engineers.</p>`,
  });

  useEffect(() => {
    const saved = localStorage.getItem('industrialcalc_pagesConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.terms) {
          setPageData(parsed.terms);
        }
      } catch (e) {
        console.warn('Error loading terms page data', e);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">{pageData.title}</h1>

      <GlassCard hoverEffect={false} className="prose dark:prose-invert max-w-none space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      </GlassCard>
    </div>
  );
}
