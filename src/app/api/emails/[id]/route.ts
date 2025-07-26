import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { SentEmail } from '@/models/SentEmail';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {id} = await params;
  await dbConnect();
  const userId = new mongoose.Types.ObjectId(session.user.id);
  const email = await SentEmail.findOne({ _id: id, userId });
  if (!email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }
  return NextResponse.json(email);
}