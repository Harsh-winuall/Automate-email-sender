import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import dbConnect from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import mongoose from 'mongoose';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(session.user.id);
  await dbConnect();
  const userObjectId = new mongoose.Types.ObjectId(session.user.id);
  const templates = await EmailTemplate.find({userId : userObjectId}).sort({ createdAt: -1 });
  return NextResponse.json(templates);
}

export async function POST(request: Request) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const body = await request.json();
  const userObjectId = new mongoose.Types.ObjectId(session.user.id);
  const template = await EmailTemplate.create({...body, userId: userObjectId});
  return NextResponse.json(template, { status: 201 });
}


export async function DELETE(request: Request) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await request.json();
  const { tempID } = body;

  if (!tempID) {
    return NextResponse.json({ message: 'Template ID (tempID) is required' }, { status: 400 });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(session.user.id);
    const template = await EmailTemplate.findOne({
      _id: tempID,
      userId: userObjectId, // 🔐 Prevent deletion by others
    });

    if (!template) {
      return NextResponse.json({ message: 'Template not found or unauthorized' }, { status: 404 });
    }

    await template.deleteOne();

    return NextResponse.json({ message: 'Template deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting template', error }, { status: 500 });
  }
}