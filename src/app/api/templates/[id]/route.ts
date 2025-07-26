import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import dbConnect from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const userObjectId = new mongoose.Types.ObjectId(session.user.id);

  const template = await EmailTemplate.findOne({
    _id: params.id,
    userId: userObjectId,
  });

  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }
  return NextResponse.json(template);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await request.json();
  const userObjectId = new mongoose.Types.ObjectId(session.user.id);
  
  try {
    const updatedTemplate = await EmailTemplate.findOneAndUpdate(
      { _id: params.id, userId: userObjectId },
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