import GlassCard from '@/components/ui/GlassCard';

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Cookie Policy</h1>
      <GlassCard hoverEffect={false} className="p-8 space-y-4 text-sm text-slate-300">
        <p>IndustrialCalc uses essential session cookies to remember theme preferences (Light/Dark mode) and active calculation parameters.</p>
      </GlassCard>
    </div>
  );
}
