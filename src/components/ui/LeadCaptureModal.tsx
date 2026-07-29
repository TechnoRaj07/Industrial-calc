'use client';

import { useState } from 'react';
import { UserRole, GeneratedReport, CalculatorResultItem } from '@/types';
import GlassModal from './GlassModal';
import { Download, FileText, Image as ImageIcon, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';
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

export type ExportFormatOption = 'pdf' | 'docx' | 'png' | 'all';

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
  const [selectedFormat, setSelectedFormat] = useState<ExportFormatOption>('pdf');
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile) return;

    setLoading(true);
    const reportId = `IC-${Math.floor(100000 + Math.random() * 900000)}`;
    const verificationCode = `VER-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const timestamp = new Date().toLocaleString();

    let qrUrl = '';
    try {
      qrUrl = await generateQRCodeDataURL(`https://industrialcalc.app/verify?code=${verificationCode}`);
    } catch (qrErr) {
      console.warn('QR code generation warning', qrErr);
    }

    const report: GeneratedReport = {
      reportId,
      verificationCode,
      timestamp,
      calculatorTitle,
      calculatorSlug,
      lead: { name, email, mobile, role },
      inputs,
      results,
      qrCodeUrl: qrUrl,
    };

    setGeneratedReport(report);

    // Non-blocking background log to server API
    fetch('/api/reports/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    }).catch((err) => console.warn('Non-blocking API log', err));

    setLoading(false);
    setStep('download');

    // Auto-trigger initial selected format download
    if (selectedFormat === 'pdf' || selectedFormat === 'all') {
      handleDownloadPDF(report);
    }
    if (selectedFormat === 'docx' || selectedFormat === 'all') {
      handleDownloadDOCX(report);
    }
    if (selectedFormat === 'png' || selectedFormat === 'all') {
      handleDownloadPNG(report);
    }
  };

  const handleDownloadPDF = async (targetReport?: GeneratedReport) => {
    const report = targetReport || generatedReport;
    if (!report) return;

    try {
      const pdfBytes = await createPDFReport(report);
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `IndustrialCalc_${calculatorSlug}_${report.reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error('PDF export error', e);
    }
  };

  const handleDownloadDOCX = async (targetReport?: GeneratedReport) => {
    const report = targetReport || generatedReport;
    if (!report) return;

    try {
      const docxBlob = await createDOCXReport(report);
      const url = URL.createObjectURL(docxBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `IndustrialCalc_${calculatorSlug}_${report.reportId}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error('DOCX export error', e);
    }
  };

  const handleDownloadPNG = (targetReport?: GeneratedReport) => {
    const report = targetReport || generatedReport;
    if (!report) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 650;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Background
        ctx.fillStyle = '#051810';
        ctx.fillRect(0, 0, 800, 650);

        // Header Accent
        ctx.fillStyle = '#00FF99';
        ctx.fillRect(0, 0, 800, 8);

        // Branding
        ctx.fillStyle = '#00FF99';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText('INDUSTRIALCALC TECHNICAL REPORT', 40, 50);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '18px sans-serif';
        ctx.fillText(`Calculator: ${calculatorTitle}`, 40, 85);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '14px sans-serif';
        ctx.fillText(`Report ID: ${report.reportId}  |  Generated: ${report.timestamp}`, 40, 115);
        ctx.fillText(`User: ${report.lead.name} (${report.lead.role})`, 40, 135);

        ctx.strokeStyle = '#00FF99';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 155);
        ctx.lineTo(760, 155);
        ctx.stroke();

        // Input Values
        ctx.fillStyle = '#00FF99';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('INPUT PARAMETERS:', 40, 190);
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '14px sans-serif';
        let y = 215;
        inputs.slice(0, 4).forEach((inp) => {
          ctx.fillText(`• ${inp.label}: ${inp.value} ${inp.unit || ''}`, 50, y);
          y += 24;
        });

        // Results
        ctx.fillStyle = '#00FF99';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('CALCULATED RESULTS:', 40, y + 25);
        y += 50;

        results.forEach((res) => {
          if (res.highlight) {
            ctx.fillStyle = 'rgba(0, 255, 153, 0.15)';
            ctx.fillRect(40, y - 18, 720, 30);
            ctx.fillStyle = '#00FF99';
            ctx.font = 'bold 16px sans-serif';
          } else {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '14px sans-serif';
          }
          ctx.fillText(`▶ ${res.label}: ${res.value} ${res.unit || ''}`, 50, y);
          y += 32;
        });

        // Footer Verification
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px monospace';
        ctx.fillText(`Verification Code: ${report.verificationCode}  |  Verify online at /verify`, 40, 610);

        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `IndustrialCalc_${calculatorSlug}_${report.reportId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error('PNG export error', e);
    }
  };

  const handleResetModal = () => {
    setStep('form');
    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={handleResetModal} title={step === 'form' ? 'Export Verified Report' : 'Report Unlocked & Downloaded!'}>
      {step === 'form' ? (
        <form onSubmit={handleSubmitLead} className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Please enter your professional details and select your preferred download format to unlock your QR-verified calculation report.
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

          {/* SELECT DESIRED EXPORT FORMAT */}
          <div className="p-4 rounded-2xl glass-panel border border-[#00FF99]/30 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#00FF99] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" /> Select Preferred Download Format *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { id: 'pdf', label: 'PDF Document', icon: Download },
                { id: 'docx', label: 'Word (.docx)', icon: FileText },
                { id: 'png', label: 'PNG Image', icon: ImageIcon },
                { id: 'all', label: 'All Formats', icon: CheckCircle2 },
              ].map((fmt) => {
                const Icon = fmt.icon;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id as ExportFormatOption)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                      selectedFormat === fmt.id
                        ? 'bg-[#00FF99] text-black border-[#00FF99] shadow-lg shadow-[#00FF99]/20'
                        : 'glass-panel text-slate-300 border-slate-700 hover:border-emerald-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-[#00FF99] text-black font-extrabold hover:opacity-95 transition-all shadow-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              <ShieldCheck className="w-5 h-5" /> Generate & Download Verified Report ({selectedFormat.toUpperCase()})
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-[#00FF99]">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-bold text-sm">Report Authenticated & Generated!</p>
              <p className="text-xs opacity-90">Report ID: {generatedReport?.reportId} | QR Code Verification Embedded</p>
            </div>
          </div>

          {generatedReport?.qrCodeUrl && (
            <div className="flex items-center justify-center p-4 glass-panel rounded-2xl">
              <div className="text-center">
                <img src={generatedReport.qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto rounded-lg mb-2 shadow-md" />
                <span className="text-[11px] text-slate-400 font-mono">Scan to verify at /verify?code={generatedReport.verificationCode}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">Download Additional Report Formats</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleDownloadPDF()}
                className="py-3 px-4 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button
                onClick={() => handleDownloadDOCX()}
                className="py-3 px-4 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <FileText className="w-4 h-4" /> Download DOCX
              </button>
              <button
                onClick={() => handleDownloadPNG()}
                className="py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ImageIcon className="w-4 h-4" /> Save PNG Card
              </button>
            </div>
          </div>
        </div>
      )}
    </GlassModal>
  );
}
