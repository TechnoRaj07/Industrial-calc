import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';
import { connectDB } from '@/lib/db/connect';
import { SiteSetting } from '@/lib/db/models';

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'site_config')
        .single();
      if (!error && data) {
        return NextResponse.json({ success: true, provider: 'Supabase', config: data.value });
      }
    }

    await connectDB();
    const setting = await SiteSetting.findOne({ key: 'site_config' });
    return NextResponse.json({ success: true, provider: 'MongoDB', config: setting?.value || null });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database fetch failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key: 'site_config', value: body, updated_at: new Date().toISOString() })
        .select();

      if (!error && data) {
        return NextResponse.json({ success: true, provider: 'Supabase', config: data[0].value });
      }
    }

    await connectDB();
    const setting = await SiteSetting.findOneAndUpdate(
      { key: 'site_config' },
      { value: body, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, provider: 'MongoDB', config: setting.value });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
