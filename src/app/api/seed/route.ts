import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { User, Report, BlogPost, Media, SiteSetting } from '@/lib/db/models';

export async function POST() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Could not connect to MongoDB server.' },
        { status: 500 }
      );
    }

    // 1. Seed Initial Users if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        { name: 'Dr. Sarah Jenkins', email: 'sarah@dairytech.com', role: 'Dairy Technologist', isBlocked: false, twoFactorEnabled: true },
        { name: 'Marco Silva', email: 'marco@bioprocess.io', role: 'Process Engineer', isBlocked: false, twoFactorEnabled: false },
        { name: 'Ananya Gupta', email: 'ananya@qc-labs.in', role: 'QA Executive', isBlocked: true, twoFactorEnabled: false },
        { name: 'Jean Dupont', email: 'jean@agri.fr', role: 'Factory Manager', isBlocked: false, twoFactorEnabled: true },
      ]);
    }

    // 2. Seed Initial Reports if empty
    const reportCount = await Report.countDocuments();
    if (reportCount === 0) {
      await Report.create([
        {
          reportId: 'IC-849201',
          verificationCode: 'VER-9A8F1',
          calculatorTitle: 'Molarity Calculator',
          calculatorSlug: 'molarity-calculator',
          userName: 'Dr. Sarah Jenkins',
          userEmail: 'sarah@dairytech.com',
          userMobile: '+1 555-0199',
          userRole: 'Dairy Technologist',
          inputs: [{ label: 'Mass (g)', value: 58.44, unit: 'g' }],
          results: [{ label: 'Molarity (M)', value: 1.0, unit: 'M' }],
        },
        {
          reportId: 'IC-910482',
          verificationCode: 'VER-7B2M9',
          calculatorTitle: 'Pasteurization Holding Time',
          calculatorSlug: 'pasteurization-holding-time',
          userName: 'Marco Silva',
          userEmail: 'marco@bioprocess.io',
          userMobile: '+49 151 2345678',
          userRole: 'Process Engineer',
          inputs: [{ label: 'Holding Tube Length', value: 15.2, unit: 'm' }],
          results: [{ label: 'Holding Time', value: 15.4, unit: 'sec' }],
        },
      ]);
    }

    // 3. Seed Initial Blog Posts if empty
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.create([
        {
          title: 'Optimizing Holding Tube Lethality (F0) in HTST Systems',
          slug: 'optimizing-holding-tube-lethality-f0-htst',
          category: 'Food & Dairy',
          author: 'Dr. Robert Sterling',
          imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5',
          excerpt: 'Deep-dive into fluid velocity, holding tube volume scaling, and thermal lethal value calculations.',
          content: '<h2>Holding Tube Dynamics</h2><p>HTST pasteurization relies on maintaining fluid velocity above critical Reynolds number thresholds...</p>',
          tags: ['HTST', 'Pasteurization', 'F0 Lethality'],
          isPublished: true,
        },
        {
          title: 'Eliminating the 6 Big Losses: Achieving 85%+ OEE',
          slug: 'eliminating-the-6-big-losses-achieving-85-oee',
          category: 'Production & AI',
          author: 'Elena Rostova',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          excerpt: 'Comprehensive operational framework to audit Availability, Performance, and Quality metrics.',
          content: '<h2>OEE Framework</h2><p>Overall Equipment Effectiveness measures real operational output against design capacity...</p>',
          tags: ['OEE', 'Lean Manufacturing', 'Six Sigma'],
          isPublished: true,
        },
      ]);
    }

    // 4. Seed Initial Media if empty
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      await Media.create([
        { filename: 'brand-logo-neon.png', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5', mimeType: 'image/png', size: '240 KB' },
        { filename: 'hero-background-video.mp4', url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-background-31742-large.mp4', mimeType: 'video/mp4', size: '14.2 MB' },
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB Database Seeded Successfully with Initial Demo Data!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed MongoDB' },
      { status: 500 }
    );
  }
}
