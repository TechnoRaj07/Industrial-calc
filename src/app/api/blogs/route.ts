import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';
import { connectDB } from '@/lib/db/connect';
import { BlogPost } from '@/lib/db/models';

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const posts = data.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          category: p.category,
          author: p.author,
          imageUrl: p.image_url || p.imageUrl,
          excerpt: p.excerpt,
          content: p.content,
          date: p.created_at ? p.created_at.split('T')[0] : '2026-07-29',
        }));
        return NextResponse.json({ success: true, provider: 'Supabase', posts });
      }
    }

    // Fallback MongoDB / Memory
    await connectDB();
    const posts = await BlogPost.find({}).sort({ publishedAt: -1 });
    return NextResponse.json({ success: true, provider: 'MongoDB', posts });
  } catch (error) {
    return NextResponse.json({ success: true, provider: 'Local Fallback', posts: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('blog_posts').insert([
        {
          title: body.title,
          slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: body.category,
          author: body.author,
          image_url: body.imageUrl,
          excerpt: body.excerpt,
          content: body.content,
          is_published: true,
        },
      ]).select();

      if (error) throw error;
      return NextResponse.json({ success: true, provider: 'Supabase', post: data[0] }, { status: 201 });
    }

    await connectDB();
    const newPost = await BlogPost.create(body);
    return NextResponse.json({ success: true, provider: 'MongoDB', post: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    if (isSupabaseConfigured()) {
      await supabase.from('blog_posts').delete().eq('id', id);
      return NextResponse.json({ success: true, provider: 'Supabase', message: 'Deleted post' });
    }

    await connectDB();
    await BlogPost.findByIdAndDelete(id);
    return NextResponse.json({ success: true, provider: 'MongoDB', message: 'Deleted post' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
