import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';
import { connectDB } from '@/lib/db/connect';
import { User, Report, BlogPost, Media } from '@/lib/db/models';

export async function POST() {
  try {
    const isSupa = isSupabaseConfigured();

    if (isSupa) {
      // 1. Seed Supabase Tables if configured
      const { data: existingBlogs } = await supabase.from('blog_posts').select('id').limit(1);
      if (!existingBlogs || existingBlogs.length === 0) {
        await supabase.from('blog_posts').insert([
          {
            title: 'Optimizing Holding Tube Lethality (F0) in HTST Systems',
            slug: 'optimizing-holding-tube-lethality-f0-htst',
            category: 'Food & Dairy',
            author: 'Dr. Robert Sterling',
            image_url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5',
            excerpt: 'Deep-dive into fluid velocity, holding tube volume scaling, and thermal lethal value calculations.',
            content: '<h2>Holding Tube Dynamics</h2><p>HTST pasteurization relies on maintaining fluid velocity...</p>',
            is_published: true,
          },
          {
            title: 'Eliminating the 6 Big Losses: Achieving 85%+ OEE',
            slug: 'eliminating-the-6-big-losses-achieving-85-oee',
            category: 'Production & AI',
            author: 'Elena Rostova',
            image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            excerpt: 'Comprehensive operational framework to audit Availability, Performance, and Quality metrics.',
            content: '<h2>OEE Framework</h2><p>Overall Equipment Effectiveness measures real operational output...</p>',
            is_published: true,
          },
        ]);
      }

      return NextResponse.json({
        success: true,
        provider: 'Supabase PostgreSQL',
        message: 'Supabase Free Cloud Database Seeded Successfully!',
      });
    }

    // Fallback: MongoDB connection attempt
    const conn = await connectDB();
    if (conn) {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        await User.create([
          { name: 'Dr. Sarah Jenkins', email: 'sarah@dairytech.com', role: 'Dairy Technologist', isBlocked: false, twoFactorEnabled: true },
          { name: 'Marco Silva', email: 'marco@bioprocess.io', role: 'Process Engineer', isBlocked: false, twoFactorEnabled: false },
        ]);
      }
    }

    return NextResponse.json({
      success: true,
      provider: 'Decoupled Memory / MongoDB Fallback',
      message: 'Database Ready!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Database initialization deferred' },
      { status: 500 }
    );
  }
}
