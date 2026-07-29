import GlassCard from '@/components/ui/GlassCard';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Engineering Disclaimer</h1>
      <GlassCard hoverEffect={false} className="p-8 space-y-4 text-sm text-slate-300">
        <p>
          The calculation algorithms provided by IndustrialCalc are intended for technical reference and estimations. Users accept full responsibility for verifying plant safety parameters prior to physical equipment operation or commercial batch processing.
        </p>
      </GlassCard>
    </div>
  );
}
