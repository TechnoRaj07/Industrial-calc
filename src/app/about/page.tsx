import GlassCard from '@/components/ui/GlassCard';
import { Cpu, ShieldCheck, Zap, Layers, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#00FF99]/40 text-emerald-600 dark:text-[#00FF99] text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-[#00FF99]" /> Industrial Engineering Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About IndustrialCalc
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Empowering chemical engineers, food technologists, quality directors, and researchers with ISO-compliant digital calculation engines.
        </p>
      </div>

      <GlassCard hoverEffect={false} className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          IndustrialCalc was engineered to replace error-prone manual spreadsheet calculations with authenticated, high-performance web tools. From simple molarity and dilution metrics to complex pasteurization lethality (F0), OEE line productivity, and industrial carbon footprint estimations, our tools deliver instantaneous mathematical precision.
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverEffect={false}>
          <ShieldCheck className="w-8 h-8 text-[#00FF99] mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verified QR Stamping</h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Every exported report includes a unique QR code allowing quality auditors to verify calculation authenticity online.
          </p>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <Layers className="w-8 h-8 text-[#00E5FF] mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spatial Computing Design</h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Built with VisionOS and Windows 11 Acrylic glassmorphic interface principles for maximum clarity and ergonomics.
          </p>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <Globe className="w-8 h-8 text-[#FF007A] mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Global Compliance</h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Formulas adhere strictly to ISO, USP, FDA, Codex Alimentarius, and Chemical Engineering standards.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
