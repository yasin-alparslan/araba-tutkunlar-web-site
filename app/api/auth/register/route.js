import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    await dbConnect();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Tüm alanlar zorunludur.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Şifre en az 6 karakter olmalıdır.' }, { status: 400 });
    }

    const cleanUsername = String(username).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanUsername }],
    });

    if (existingUser) {
      return NextResponse.json({ message: 'E-posta veya kullanıcı adı zaten kullanılıyor.' }, { status: 409 });
    }

    const role = (await User.countDocuments()) === 0 ? 'admin' : 'user';

    const user = await User.create({
      username: cleanUsername,
      email: cleanEmail,
      password: await bcrypt.hash(password, 12),
      role,
    });

    return NextResponse.json(
      {
        message: role === 'admin' ? 'İlk hesap admin olarak oluşturuldu. Şimdi giriş yapabilirsiniz.' : 'Kayıt başarılı. Şimdi giriş yapabilirsiniz.',
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
      },
      { status: 201 }
    );
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
          : 'Kayıt sırasında hata oluştu.',
      },
      { status: 500 }
    );
  }
}
