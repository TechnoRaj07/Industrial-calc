'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';

import { sanitizeHTML } from '@/lib/security/sanitizer';

export default function PrivacyPage() {
  const [pageData, setPageData] = useState({
    title: 'Privacy Policy',
    content: `<h2>1. Data Collection Principles</h2><p>IndustrialCalc collects user lead information (name, work email, mobile number, professional role) exclusively when exporting calculation reports.</p><h2>2. Use of Information</h2><p>Your inputs and parameters remain private and are processed in client-side memory to compute engineering metrics.</p><h2>3. Compliance Standards</h2><p>We strictly adhere to ISO 27001 data security practices and GDPR compliance guidelines.</p>`,
  });

  useEffect(() => {
    const saved = localStorage.getItem('industrialcalc_pagesConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.privacy) {
          setPageData(parsed.privacy);
        }
      } catch (e) {
        console.warn('Error loading privacy page data', e);
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
