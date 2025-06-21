import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailOpen from '@/models/EmailOpen';

export async function GET() {
  await dbConnect();

  try {
    const opens = await EmailOpen.find().sort({ openedAt: -1 }).lean();
    return NextResponse.json(opens);
  } catch (error) {
    console.error('Failed to fetch open events:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
