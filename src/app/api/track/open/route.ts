import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailOpen from '@/models/EmailOpen';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing email ID', { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  console.log(ip, id);
  const userId = new mongoose.Types.ObjectId(session.user.id);

  await EmailOpen.create({ emailId: id, ip, userId });

  return new NextResponse(
    Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", 'base64'),
    {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
      },
    }
  );
}