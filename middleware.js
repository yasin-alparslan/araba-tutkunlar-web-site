import { NextResponse } from 'next/server';
export function middleware(req){
 const token=req.cookies.get('auth_token')?.value; const p=req.nextUrl.pathname;
 if((p.startsWith('/admin')||p.startsWith('/hesabim'))&&!token){const u=new URL('/login',req.url);u.searchParams.set('next',p);return NextResponse.redirect(u)}
 return NextResponse.next();
}
export const config={matcher:['/admin/:path*','/hesabim/:path*']};
