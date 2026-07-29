'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { CALCULATORS } from '@/lib/calculators/data';
import GlassCard from '@/components/ui/GlassCard';
import ChartView from '@/components/ui/ChartView';
import LeadCaptureModal from '@/components/ui/LeadCaptureModal';
import { CalculatorResultItem } from '@/types';
import { Calculator, ArrowLeft, Download, RefreshCw, CheckCircle2, ChevronDown, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function SingleCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const calc = CALCULATORS.find((c) => c.slug === resolvedParams.slug);

  if (!calc) {
    notFound();
  }

  // Initialize input state
  const initialInputs: Record<string, any> = {};
  calc.inputs.forEach((inp) => {
    initialInputs[inp.name] = inp.defaultValue;
  });

  const [inputValues, setInputValues] = useState<Record<string, any>>(initialInputs);
  const [calculatedResults, setCalculatedResults] = useState<{
    results: CalculatorResultItem[];
    chartData?: { name: string; value: number; unit?: string }[];
  } | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Initial calculation trigger
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleInputChange = (name: string, val: any) => {
    setInputValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleCalculate = () => {
    try {
      const res = calc.calculate(inputValues);
      setCalculatedResults(res);
    } catch (e) {
      console.error('Calculation error', e);
    }
  };

  const handleReset = () => {
    setInputValues(initialInputs);
    setCalculatedResults(calc.calculate(initialInputs));
  };

  // Structured Data JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.title,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: calc.description,
    url: `https://industrialcalc.app/calculators/${calc.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumb */}
        <Link
          href="/calculators"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#00FF99] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Calculators
        </Link>

        {/* HEADER BLOCK */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-[#00FF99]">
              {calc.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {calc.title}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {calc.description}
          </p>
        </div>

        {/* MAIN CALCULATOR INTERFACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT FORM (Left Col) */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard hoverEffect={false}>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/30 dark:border-emerald-950/40">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#00FF99]" /> Required Input Parameters
                </h3>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-[#00FF99] flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="space-y-4">
                {calc.inputs.map((inp) => (
                  <div key={inp.name}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                        {inp.label}
                      </label>
                      {inp.unit && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-[#00FF99]">
                          {inp.unit}
                        </span>
                      )}
                    </div>
                    {inp.type === 'select' ? (
                      <select
                        value={inputValues[inp.name]}
                        onChange={(e) => handleInputChange(inp.name, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white bg-slate-900 focus:outline-none focus:border-[#00FF99]"
                      >
                        {inp.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        min={inp.min}
                        max={inp.max}
                        step={inp.step || 'any'}
                        value={inputValues[inp.name]}
                        onChange={(e) => handleInputChange(inp.name, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF99] font-mono text-base"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={handleCalculate}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-[#00FF99] hover:text-black font-bold text-white transition-all shadow-lg shadow-emerald-600/20 text-base"
                >
                  Calculate Now
                </button>
              </div>
            </GlassCard>
          </div>

          {/* RESULTS DISPLAY (Right Col) */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard hoverEffect={false} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/30 dark:border-emerald-950/40">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00FF99]" /> Calculated Output Results
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">Live Calculated</span>
                </div>

                <div className="space-y-4">
                  {calculatedResults?.results.map((res, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl transition-all ${
                        res.highlight
                          ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-950 dark:text-[#00FF99]'
                          : 'glass-panel'
                      }`}
                    >
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{res.label}</div>
                      <div className="text-2xl font-black mt-1 font-mono tracking-tight flex items-baseline gap-2">
                        <span>{res.value}</span>
                        {res.unit && <span className="text-sm font-normal text-slate-400">{res.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {calculatedResults?.chartData && (
                  <ChartView data={calculatedResults.chartData} />
                )}
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setLeadModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-[#00FF99] text-black font-extrabold hover:opacity-95 transition-all shadow-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                  <Download className="w-5 h-5" /> Export Verified Report (PDF / DOCX / PNG)
                </button>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* TECHNICAL FORMULA & EXPLANATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 space-y-6">
            <GlassCard hoverEffect={false}>
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-4">
                <BookOpen className="w-5 h-5 text-[#00FF99]" /> Mathematical Formula & Chemical Principles
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-[#00FF99] font-mono text-sm overflow-x-auto mb-4">
                {calc.formula}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {calc.longExplanation}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200/30 dark:border-emerald-950/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Industrial Use Cases & Applications
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {calc.useCases.map((uc, i) => (
                    <li key={i} className="flex items-center gap-2 p-3 rounded-xl glass-panel">
                      <span className="w-2 h-2 rounded-full bg-[#00FF99]" /> {uc}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* FAQ ACCORDION FOR THIS TOOL */}
        {calc.faqs && calc.faqs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tool Technical FAQs</h3>
            {calc.faqs.map((faq, idx) => (
              <GlassCard
                key={idx}
                hoverEffect={false}
                className="cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h4>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#00FF99]' : ''}`} />
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/20 pt-3">
                    {faq.answer}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* LEAD CAPTURE MODAL */}
      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        calculatorTitle={calc.title}
        calculatorSlug={calc.slug}
        inputs={calc.inputs.map((inp) => ({
          label: inp.label,
          value: inputValues[inp.name],
          unit: inp.unit,
        }))}
        results={calculatedResults?.results || []}
      />
    </>
  );
}
