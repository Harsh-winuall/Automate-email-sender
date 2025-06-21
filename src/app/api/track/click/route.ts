// app/api/track/click/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailClick from '@/models/EmailClick';

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const url = searchParams.get('url');

  if (!id || !url) {
    return new NextResponse('Missing parameters', { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  await EmailClick.create({ emailId: id, clickedUrl: decodeURIComponent(url), ip });

  return NextResponse.redirect(decodeURIComponent(url));
}