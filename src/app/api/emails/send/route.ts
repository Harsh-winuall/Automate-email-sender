import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import { SentEmail } from '@/models/SentEmail';
import { sendEmail } from '@/lib/email';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { EmailCredential } from '@/models/EmailCredential';
import { decrypt } from '@/lib/encryption';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = new mongoose.Types.ObjectId(session.user.id);
  await dbConnect();
  const { templateId, sendFollowUp, recipient, variables = {} } = await request.json();

  // Get the template
  const template = await EmailTemplate.findById(templateId);
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  // Replace placeholders in subject and body
  let subject = template.subject;
  let body = template.body;

  // Safely handle variables
  if (variables && typeof variables === 'object') {
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      const safeValue = String(value).replace(/\$/g, '$$$$'); // Ensure value is string
      subject = subject.replace(new RegExp(placeholder, 'g'), safeValue);
      body = body.replace(new RegExp(placeholder, 'g'), safeValue);
    }
  }

  // Create unique email ID for tracking
  const emailId = new mongoose.Types.ObjectId().toString();
  console.log('Generated email ID:', emailId);
  const baseUrl = 'http://localhost:3000';
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

   // Add tracking pixel
   body += `<img src="${baseUrl}/api/track/open?id=${emailId}" width="1" height="1" />`;


  // Format body
  const formattedBody = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">${body.replace(/\n/g, '<br>')}</div>`;

  const creds = await EmailCredential.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!creds) {
    throw new Error("Email credentials not set for this user.");
  }

  const decryptedPassword = decrypt(creds.encryptedPassword);

  try {
    await sendEmail({
      to: recipient,
      subject,
      html: formattedBody,
      appPassword: decryptedPassword, // Use decrypted password
      from: creds.email, // Use the email from credentials
    });

    const sentEmail = await SentEmail.create({
      _id: emailId,
      templateId: template._id,
      recipient,
      subject,
      body,
      category: template.category,
      variables,
      userId,
      sendFollowUp
    });

    return NextResponse.json(sentEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}