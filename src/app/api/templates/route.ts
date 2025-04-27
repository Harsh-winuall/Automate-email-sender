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


export async function DELETE(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { tempID } = body;

  if (!tempID) {
    return NextResponse.json({ message: 'Template ID (tempID) is required' }, { status: 400 });
  }

  try {
    await EmailTemplate.findByIdAndDelete(tempID);
    return NextResponse.json({ message: 'Template deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting template', error }, { status: 500 });
  }
}