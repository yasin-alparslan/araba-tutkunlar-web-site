import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Veritabanına bağlan
    await dbConnect();

    // 2. İstekten gelen bilgileri al (Kullanıcı adı, e-posta, şifre)
    const { username, email, password } = await request.json();

    // 3. Bu e-posta ile daha önce kayıt olunmuş mu kontrol et
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kayıtlı.' },
        { status: 400 }
      );
    }

    // 4. Yeni kullanıcıyı veritabanına kaydet
    // (Şifreleme işlemi models/User.js dosyasındaki kod sayesinde otomatik yapılacaktır)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 5. Başarılı yanıtı dön
    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu', userId: user._id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu: " + error.message },
      { status: 500 }
    );
  }
}
