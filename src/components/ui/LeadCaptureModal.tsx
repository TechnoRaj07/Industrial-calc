'use client';

import { useState } from 'react';
import { UserRole, LeadInfo, GeneratedReport, CalculatorResultItem } from '@/types';
import GlassModal from './GlassModal';
import { Download, FileText, Image as ImageIcon, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import { createPDFReport, createDOCXReport, generateQRCodeDataURL } from '@/lib/reports';

const ROLES: UserRole[] = [
  'Student',
  'Teacher',
  'Research Scholar',
  'Dairy Technologist',
  'Food Technologist',
  'Biotechnologist',
  'Microbiologist',
  'Quality Assurance Executive',
  'Quality Control Analyst',
  'Production Executive',
  'Production Manager',
  'Process Engineer',
  'Plant Engineer',
  'Maintenance Engineer',
  'Laboratory Technician',
  'R&D Scientist',
  'Regulatory Affairs Officer',
  'Packaging Engineer',
  'Safety Officer',
  'Factory Manager',
  'Consultant',
  'Entrepreneur',
  'Government Officer',
  'Other',
];

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorTitle: string;
  calculatorSlug: string;
  inputs: { label: string; value: string | number; unit?: string }[];
  results: CalculatorResultItem[];
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  calculatorTitle,
  calculatorSlug,
  inputs,
  results,
}: LeadCaptureModalProps) {
  const [step, setStep] = useState<'form' | 'download'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState<UserRole>('Process Engineer');
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile) return;

    setLoading(true);
    const reportId = `IC-${Math.floor(100000 + Math.random() * 900000)}`;
    const verificationCode = `VER-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const timestamp = new Date().toLocaleString();
    const qrCodeUrl = await generateQRCodeDataURL(`https://industrialcalc.app/verify?code=${verificationCode}`);

    const report: GeneratedReport = {
      reportId,
      verificationCode,
      timestamp,
      calculatorTitle,
      calculatorSlug,
      lead: { name, email, mobile, role },
      inputs,
      results,
      qrCodeUrl,
    };

    // Save lead to server API background silently
    try {
      await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
    } catch (err) {
      console.warn('Silent local report log', err);
    }

    setGeneratedReport(report);
    setLoading(false);
    setStep('download');
  };

  const handleDownloadPDF = async () => {
    if (!generatedReport) return;
    const pdfBytes = await createPDFReport(generatedReport);
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IndustrialCalc_${calculatorSlug}_${generatedReport.reportId}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDOCX = async () => {
    if (!generatedReport) return;
    const docxBlob = await createDOCXReport(generatedReport);
    const url = URL.createObjectURL(docxBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IndustrialCalc_${calculatorSlug}_${generatedReport.reportId}.docx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    if (!generatedReport) return;
    // Create quick canvas representation
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#081B10';
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = '#00FF99';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('INDUSTRIALCALC REPORT', 40, 50);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Tool: ${calculatorTitle}`, 40, 90);
      ctx.fillText(`Report ID: ${generatedReport.reportId}`, 40, 120);
      ctx.fillText(`User: ${generatedReport.lead.name} (${generatedReport.lead.role})`, 40, 150);

      ctx.fillStyle = '#00FF99';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('CALCULATED RESULTS:', 40, 210);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px sans-serif';
      let y = 240;
      results.forEach((res) => {
        ctx.fillText(`• ${res.label}: ${res.value} ${res.unit || ''}`, 50, y);
        y += 30;
      });

      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `IndustrialCalc_${calculatorSlug}_${generatedReport.reportId}.png`;
      link.click();
    }
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title={step === 'form' ? 'Export Verified Report' : 'Report Unlocked!'}>
      {step === 'form' ? (
        <form onSubmit={handleSubmitLead} className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Please enter your professional details to unlock your verified PDF, DOCX, and PNG calculations report with QR verification stamp.
          </p>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00FF99]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                placeholder="sarah@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00FF99]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 555-0199"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00FF99]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1">
              Professional Role *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-4 py-2.5 rounded-xl glass-panel text-slate-900 dark:text-white bg-slate-900 focus:outline-none focus:border-[#00FF99]"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-[#00FF99] hover:text-black font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Generating QR Stamp...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" /> Generate Verified Report
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-[#00FF99]">
            <CheckCircle className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-bold text-sm">Report Authenticated Successfully!</p>
              <p className="text-xs opacity-90">Report ID: {generatedReport?.reportId} | QR Code Embedded</p>
            </div>
          </div>

          {generatedReport?.qrCodeUrl && (
            <div className="flex items-center justify-center p-4 glass-panel rounded-2xl">
              <div className="text-center">
                <img src={generatedReport.qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto rounded-lg mb-2 shadow-md" />
                <span className="text-[11px] text-slate-400 font-mono">Scan to verify at /verify</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleDownloadPDF}
              className="py-3 px-4 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={handleDownloadDOCX}
              className="py-3 px-4 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <FileText className="w-4 h-4" /> Download DOCX
            </button>
            <button
              onClick={handleDownloadPNG}
              className="py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <ImageIcon className="w-4 h-4" /> Save PNG Card
            </button>
          </div>
        </div>
      )}
    </GlassModal>
  );
}
