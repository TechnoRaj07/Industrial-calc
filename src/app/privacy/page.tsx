import GlassCard from '@/components/ui/GlassCard';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
      <GlassCard hoverEffect={false} className="prose dark:prose-invert max-w-none p-8 space-y-4 text-sm text-slate-300">
        <p>Last updated: July 2026</p>
        <h3 className="text-lg font-bold text-white">1. Data Collection</h3>
        <p>IndustrialCalc collects lead information (Name, Email, Mobile, Role) submitted during report exports solely for verification and process record keeping.</p>
        <h3 className="text-lg font-bold text-white">2. Data Security</h3>
        <p>All transmitted calculations and lead details are encrypted in transit via SSL/TLS 256-bit encryption protocols.</p>
        <h3 className="text-lg font-bold text-white">3. Third-Party Sharing</h3>
        <p>We do not sell or lease user data to third-party advertisers. Data is used strictly for internal analytical and reporting purposes.</p>
      </GlassCard>
    </div>
  );
}
