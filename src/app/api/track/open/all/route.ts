import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailOpen from '@/models/EmailOpen';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const userId = new mongoose.Types.ObjectId(session.user.id);

  try {
    const opens = await EmailOpen.find({userId}).sort({ openedAt: -1 }).lean();
    return NextResponse.json(opens);
  } catch (error) {
    console.error('Failed to fetch open events:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
