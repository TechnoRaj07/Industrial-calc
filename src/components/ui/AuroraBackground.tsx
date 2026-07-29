'use client';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Light Mode Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/30 dark:bg-emerald-900/20 rounded-full filter blur-3xl animate-blob-float" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-200/30 dark:bg-teal-900/20 rounded-full filter blur-3xl animate-blob-float [animation-delay:3s]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-200/25 dark:bg-green-900/20 rounded-full filter blur-3xl animate-blob-float [animation-delay:6s]" />

      {/* Dark Mode Neon Accents */}
      <div className="hidden dark:block absolute top-10 left-1/4 w-72 h-72 bg-[#00FF99]/10 rounded-full filter blur-[120px] animate-pulse-slow" />
      <div className="hidden dark:block absolute bottom-20 right-1/4 w-80 h-80 bg-[#00E5FF]/10 rounded-full filter blur-[140px] animate-pulse-slow [animation-delay:2s]" />
    </div>
  );
}
