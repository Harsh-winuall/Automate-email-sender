import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import { SentEmail } from '@/models/SentEmail';
import { sendEmail } from '@/lib/email';
import dbConnect from '@/lib/db';

export async function POST(request: Request) {
  await dbConnect();
  const { templateId, recipient, variables } = await request.json();

  // Get the template
  const template = await EmailTemplate.findById(templateId);
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  // Replace placeholders in subject and body
  let subject = template.subject;
  let body = template.body;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    subject = subject.replace(new RegExp(placeholder, 'g'), value);
    body = body.replace(new RegExp(placeholder, 'g'), value);
  }

  // Send the email
  try {
    await sendEmail({
      to: recipient,
      subject,
      html: body,
    });

    // Save to sent emails
    const sentEmail = await SentEmail.create({
      templateId: template._id,
      recipient,
      subject,
      body,
      category: template.category,
      variables,
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