import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/models/EmailTemplate';
import { SentEmail } from '@/models/SentEmail';
import { sendEmail } from '@/lib/email';
import dbConnect from '@/lib/db';

export async function POST(request: Request) {
  await dbConnect();
  const { templateId, recipient, variables = {} } = await request.json();

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

  // Format body
  const formattedBody = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">${body.replace(/\n/g, '<br>')}</div>`;

  try {
    await sendEmail({
      to: recipient,
      subject,
      html: formattedBody,
    });

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