import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { BlogPost } from '@/lib/db/models';
import { z } from 'zod';

const BlogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  category: z.string().min(1),
  author: z.string().min(1),
  imageUrl: z.string(),
  excerpt: z.string(),
  content: z.string(),
  isPublished: z.boolean().optional(),
});

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}).sort({ publishedAt: -1 });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database fetch failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BlogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    await connectDB();
    const slug = parsed.data.slug || parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newPost = await BlogPost.create({
      ...parsed.data,
      slug,
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    await connectDB();
    await BlogPost.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted post' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
