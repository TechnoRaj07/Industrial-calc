import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { SiteSetting } from '@/lib/db/models';

export async function GET() {
  try {
    await connectDB();
    const setting = await SiteSetting.findOne({ key: 'site_config' });
    return NextResponse.json({ success: true, config: setting?.value || null });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database fetch failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const setting = await SiteSetting.findOneAndUpdate(
      { key: 'site_config' },
      { value: body, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, config: setting.value });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
