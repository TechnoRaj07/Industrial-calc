import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { Report } from '@/lib/db/models';

export async function POST(req: Request) {
  try {
    const data = await req.json();
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
