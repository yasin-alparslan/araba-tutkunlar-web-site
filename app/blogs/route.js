import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); // En yeni yazıları önce getir
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Bloglar yüklenemedi" }, { status: 500 });
  }
}
