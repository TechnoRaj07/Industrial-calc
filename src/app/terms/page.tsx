import GlassCard from '@/components/ui/GlassCard';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
      <GlassCard hoverEffect={false} className="prose dark:prose-invert max-w-none p-8 space-y-4 text-sm text-slate-300">
        <p>By using IndustrialCalc, you agree to use our calculations responsibly in accordance with engineering practices.</p>
        <h3 className="text-lg font-bold text-white">1. Permitted Use</h3>
        <p>Our tools are provided for industrial process design, educational research, quality assurance, and academic verification.</p>
        <h3 className="text-lg font-bold text-white">2. Engineering Validation</h3>
        <p>While our formulas conform to international ISO standards, critical plant decisions should be independently cross-checked by certified professional engineers.</p>
      </GlassCard>
    </div>
  );
}
