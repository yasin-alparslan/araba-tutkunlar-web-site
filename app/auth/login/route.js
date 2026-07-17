import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    const user = await User.findOne({ email });

    if (user && user.password === password) { // Not: Gerçek projede bcrypt ile kontrol edilmelidir
      return NextResponse.json({ message: "Başarılı" });
    } else {
      return NextResponse.json({ message: "Hatalı bilgiler" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
