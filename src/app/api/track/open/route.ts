import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailOpen from '@/models/EmailOpen';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';
import { SentEmail } from '@/models/SentEmail';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  await dbConnect();
  if (!id) {
    return new NextResponse('Missing email ID', { status: 400 });
  }

  // const ip = request.headers.get('x-forwarded-for') || 'unknown';
  // console.log(ip, id);

  if (id) {
    await SentEmail.findByIdAndUpdate(id, {
      $set: { isOpened: true },
    });
  }

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