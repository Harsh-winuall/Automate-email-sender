import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailOpen from '@/models/EmailOpen';

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing email ID', { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  console.log(ip, id);

  await EmailOpen.create({ emailId: id, ip });

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