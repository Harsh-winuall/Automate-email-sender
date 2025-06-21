import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { SentEmail } from '@/models/SentEmail';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const {id} = await params;
  await dbConnect();
  const email = await SentEmail.findById(id);
  if (!email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }
  return NextResponse.json(email);
}