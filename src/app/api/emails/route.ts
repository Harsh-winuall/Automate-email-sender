import { NextResponse } from 'next/server';
import { SentEmail } from '@/models/SentEmail';
import dbConnect from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const userId = new mongoose.Types.ObjectId(session.user.id);
  
  const query: any = { userId }; // base query scoped to user

  if (category) {
    query.category = category; // add category filter if present
  }

  const emails = await SentEmail.find(query).sort({ sentAt: -1 });
  console.log(emails)
  return NextResponse.json(emails);
}