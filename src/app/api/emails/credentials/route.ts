// app/api/email/credentials/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';
import { EmailCredential } from '@/models/EmailCredential'; // create this model
import { decrypt, encrypt } from '@/lib/encryption';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await dbConnect();

  const creds = await EmailCredential.findOne({ userId: session.user.id });
  if (!creds) return NextResponse.json({ error: 'No credentials found' }, { status: 404 });

  return NextResponse.json({
    email: creds.email,
    appPassword: decrypt(creds.encryptedPassword),
  });
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { appPassword } = await req.json();
  if (!appPassword) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  await dbConnect();

  const encryptedPassword = encrypt(appPassword);

  await EmailCredential.findOneAndUpdate(
    { userId: session.user.id },
    { userId: session.user.id, email:session.user.email, encryptedPassword },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}
