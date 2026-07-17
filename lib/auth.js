import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me-in-env');
export async function createToken(user){
  return new SignJWT({ sub:String(user._id), email:user.email, username:user.username, role:user.role || 'user' })
    .setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret);
}
export async function getSession(){
  const store = await cookies();
  const token = store.get('auth_token')?.value;
  if(!token) return null;
  try { return (await jwtVerify(token, secret)).payload; } catch { return null; }
}
