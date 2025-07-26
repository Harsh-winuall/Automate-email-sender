// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/userService';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const userId = await createUser({ name, email, hashedPassword });

  return NextResponse.json({ message: 'User created', userId });
}
