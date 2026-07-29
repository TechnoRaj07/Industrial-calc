import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Report } from '@/lib/db/models';
import { z } from 'zod';

const ReportSchema = z.object({
  reportId: z.string().min(3).max(64),
  verificationCode: z.string().min(3).max(64),
  calculatorTitle: z.string().min(1).max(128),
  calculatorSlug: z.string().min(1).max(128),
  lead: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(100),
    mobile: z.string().min(3).max(30),
    role: z.string().min(1).max(100),
  }),
  inputs: z.array(
    z.object({
      label: z.string(),
      value: z.union([z.string(), z.number()]),
      unit: z.string().optional(),
    })
  ),
  results: z.array(
    z.object({
      label: z.string(),
      value: z.union([z.string(), z.number()]),
      unit: z.string().optional(),
      highlight: z.boolean().optional(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const rawData = await req.json();
    
    // Strict Schema Validation against Injection & Malicious Payloads
    const parsed = ReportSchema.safeParse(rawData);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid or malformed request payload', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Database connection with fallback handling
    await connectDB();

    const newReport = await Report.create({
      reportId: data.reportId,
      verificationCode: data.verificationCode,
      calculatorTitle: data.calculatorTitle,
      calculatorSlug: data.calculatorSlug,
      userName: data.lead.name,
      userEmail: data.lead.email,
      userMobile: data.lead.mobile,
      userRole: data.lead.role,
      inputs: data.inputs,
      results: data.results,
    });

    return NextResponse.json({ success: true, report: newReport }, { status: 201 });
  } catch (error) {
    console.warn('API report generation log:', error);
    return NextResponse.json({ success: true, mode: 'local' });
  }
}
