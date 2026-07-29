import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AuroraBackground from '@/components/ui/AuroraBackground';
import CursorGlow from '@/components/ui/CursorGlow';

export const metadata: Metadata = {
  title: 'IndustrialCalc - 50 Process Engineering & Industrial Calculators',
  description: 'Ultra-fast VisionOS-inspired industrial calculators for Food Processing, Dairy Technology, Biotechnology, Chemical Engineering, Water Analysis, and Quality Control.',
  keywords: [
    'industrial calculator',
    'molarity calculator',
    'brix calculator',
    'pasteurization time',
    'OEE calculator',
    'reynolds number',
    'heat exchanger efficiency',
    'food technology calculators',
    'dairy process calculator',
  ],
  authors: [{ name: 'IndustrialCalc Team' }],
  openGraph: {
    title: 'IndustrialCalc - Process Engineering Calculator Suite',
    description: 'Precision calculation engines with instant PDF, DOCX, and PNG verified reports.',
    type: 'website',
    url: 'https://industrialcalc.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased selection:bg-[#00FF99] selection:text-black">
        <AuroraBackground />
        <CursorGlow />
        <Navbar />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
