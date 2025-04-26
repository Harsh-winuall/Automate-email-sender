import { NextResponse } from 'next/server';
import { SentEmail } from '@/models/SentEmail';
import dbConnect from '@/lib/db';

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  const query: any = {};
  if (category) {
    query.category = category;
  }

  const emails = await SentEmail.find(query).sort({ sentAt: -1 });
  return NextResponse.json(emails);
}