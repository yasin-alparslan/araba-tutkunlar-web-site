import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'E-posta veya şifre hatalı.' }, { status: 401 });
    }

    const token = await createToken(user);
    const res = NextResponse.json({
      message: 'Giriş başarılı.',
      user: { username: user.username, email: user.email, role: user.role },
    });

    res.cookies.set('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    const isConnectionError =
      error?.name === 'MongooseServerSelectionError' ||
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('querySrv') ||
      error?.message?.includes('Server selection timed out');

    return NextResponse.json(
      {
        message: isConnectionError
          ? 'MongoDB bağlantısı kurulamadı. .env.local içindeki MONGODB_URI adresini kontrol edin.'
          : 'Giriş sırasında hata oluştu.',
      },
      { status: 500 }
    );
  }
}
