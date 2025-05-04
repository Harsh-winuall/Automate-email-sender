import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import dbConnect from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const template = await EmailTemplate.findById(params.id);
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }
  return NextResponse.json(template);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await request.json();
  
  try {
    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    
    if (!updatedTemplate) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedTemplate);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}