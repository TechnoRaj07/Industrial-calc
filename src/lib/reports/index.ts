import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import QRCode from 'qrcode';
import { GeneratedReport } from '@/types';

export async function generateQRCodeDataURL(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 180,
      color: {
        dark: '#083B25',
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('Error generating QR code', err);
    return '';
  }
}

export async function createPDFReport(report: GeneratedReport): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Background accent bars
  page.drawRectangle({
    x: 0,
    y: 810,
    width: 595.28,
    height: 31.89,
    color: rgb(0.03, 0.23, 0.15), // Deep emerald
  });

  page.drawRectangle({
    x: 0,
    y: 805,
    width: 595.28,
    height: 5,
    color: rgb(0.0, 1.0, 0.6), // Neon green accent
  });

  // Header Title
  page.drawText('INDUSTRIALCALC', {
    x: 30,
    y: 820,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText('VERIFIED TECHNICAL CALCULATION REPORT', {
    x: 340,
    y: 822,
    size: 9,
    font: fontRegular,
    color: rgb(0.8, 1, 0.9),
  });

  // Document Title & ID
  let currentY = 760;
  page.drawText(report.calculatorTitle.toUpperCase(), {
    x: 30,
    y: currentY,
    size: 18,
    font: fontBold,
    color: rgb(0.03, 0.23, 0.15),
  });

  currentY -= 20;
  page.drawText(`Report ID: ${report.reportId}   |   Generated: ${report.timestamp}`, {
    x: 30,
    y: currentY,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  currentY -= 30;
  // Section: User Details
  page.drawText('USER & PROFESSIONAL METADATA', {
    x: 30,
    y: currentY,
    size: 11,
    font: fontBold,
    color: rgb(0.03, 0.23, 0.15),
  });

  currentY -= 15;
  page.drawLine({
    start: { x: 30, y: currentY },
    end: { x: 565, y: currentY },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  currentY -= 20;
  const lead = report.lead;
  page.drawText(`Name: ${lead.name}`, { x: 30, y: currentY, size: 10, font: fontRegular });
  page.drawText(`Email: ${lead.email}`, { x: 220, y: currentY, size: 10, font: fontRegular });
  currentY -= 18;
  page.drawText(`Mobile: ${lead.mobile}`, { x: 30, y: currentY, size: 10, font: fontRegular });
  page.drawText(`Role / Category: ${lead.role}`, { x: 220, y: currentY, size: 10, font: fontRegular });

  currentY -= 35;
  // Section: Input Parameters
  page.drawText('INPUT PARAMETERS', {
    x: 30,
    y: currentY,
    size: 11,
    font: fontBold,
    color: rgb(0.03, 0.23, 0.15),
  });

  currentY -= 15;
  page.drawLine({
    start: { x: 30, y: currentY },
    end: { x: 565, y: currentY },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  currentY -= 20;
  report.inputs.forEach((input) => {
    const valText = `${input.value} ${input.unit || ''}`;
    page.drawText(`• ${input.label}:`, { x: 40, y: currentY, size: 10, font: fontBold });
    page.drawText(valText, { x: 220, y: currentY, size: 10, font: fontRegular });
    currentY -= 18;
  });

  currentY -= 20;
  // Section: Calculated Results
  page.drawText('CALCULATED OUTPUTS & METRICS', {
    x: 30,
    y: currentY,
    size: 11,
    font: fontBold,
    color: rgb(0.03, 0.23, 0.15),
  });

  currentY -= 15;
  page.drawLine({
    start: { x: 30, y: currentY },
    end: { x: 565, y: currentY },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  currentY -= 20;
  report.results.forEach((res) => {
    const isHighlight = res.highlight;
    const font = isHighlight ? fontBold : fontRegular;
    const valText = `${res.value} ${res.unit || ''}`;

    if (isHighlight) {
      page.drawRectangle({
        x: 35,
        y: currentY - 4,
        width: 525,
        height: 20,
        color: rgb(0.92, 0.98, 0.95),
      });
    }

    page.drawText(`${res.label}:`, { x: 40, y: currentY, size: 10, font, color: isHighlight ? rgb(0.03, 0.23, 0.15) : rgb(0, 0, 0) });
    page.drawText(valText, { x: 260, y: currentY, size: 11, font: fontBold, color: isHighlight ? rgb(0, 0.6, 0.3) : rgb(0, 0, 0) });
    currentY -= 24;
  });

  // Footer & Verification QR Code
  if (report.qrCodeUrl) {
    try {
      const qrImageBytes = Buffer.from(report.qrCodeUrl.split(',')[1], 'base64');
      const qrImage = await pdfDoc.embedPng(qrImageBytes);
      page.drawImage(qrImage, {
        x: 440,
        y: 60,
        width: 100,
        height: 100,
      });

      page.drawText('Scan to Verify Report Authenticity', {
        x: 410,
        y: 45,
        size: 7,
        font: fontRegular,
        color: rgb(0.4, 0.4, 0.4),
      });
    } catch (e) {
      console.error('Failed embedding QR code in PDF', e);
    }
  }

  // Legal footer
  page.drawText('Official IndustrialCalc Report | Confidential & Proprietary Process Metric', {
    x: 30,
    y: 30,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}

export async function createDOCXReport(report: GeneratedReport): Promise<Blob> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'INDUSTRIALCALC TECHNICAL REPORT',
                bold: true,
                size: 28,
                color: '083B25',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Calculator: ${report.calculatorTitle}`,
                bold: true,
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Report ID: ${report.reportId} | Date: ${report.timestamp}`,
                size: 18,
                color: '666666',
              }),
            ],
          }),
          new Paragraph({ children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'User Details', bold: true, size: 22 })],
          }),
          new Paragraph({ children: [new TextRun({ text: `Name: ${report.lead.name}` })] }),
          new Paragraph({ children: [new TextRun({ text: `Email: ${report.lead.email}` })] }),
          new Paragraph({ children: [new TextRun({ text: `Mobile: ${report.lead.mobile}` })] }),
          new Paragraph({ children: [new TextRun({ text: `Role: ${report.lead.role}` })] }),
          new Paragraph({ children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'Inputs', bold: true, size: 22 })],
          }),
          ...report.inputs.map(
            (inp) =>
              new Paragraph({
                children: [new TextRun({ text: `${inp.label}: ${inp.value} ${inp.unit || ''}` })],
              })
          ),
          new Paragraph({ children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'Calculated Results', bold: true, size: 22 })],
          }),
          ...report.results.map(
            (res) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${res.label}: ${res.value} ${res.unit || ''}`,
                    bold: res.highlight || false,
                    color: res.highlight ? '006633' : '000000',
                  }),
                ],
              })
          ),
          new Paragraph({ children: [] }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Verification Code: ${report.verificationCode}`,
                italics: true,
                size: 16,
                color: '888888',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
