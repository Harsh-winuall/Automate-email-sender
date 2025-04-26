import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import dbConnect from '@/lib/db';

export async function GET() {
  await dbConnect();
  const templates = await EmailTemplate.find().sort({ createdAt: -1 });
  return NextResponse.json(templates);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const template = await EmailTemplate.create(body);
  return NextResponse.json(template, { status: 201 });
}