// lib/agenda.ts
import { Agenda } from 'agenda';
import dbConnect from './db';
import { sendEmail } from './email';
import { EmailTemplate } from '@/models/EmailTemplate';
import { SentEmail } from '@/models/SentEmail';

let agenda: Agenda | null = null;

export async function getAgendaInstance() {
  if (agenda) return agenda;

  await dbConnect();

  agenda = new Agenda({
    db: { address: process.env.MONGODB_URI as string, collection: 'agendaJobs' },
  });

  // Define job: send scheduled email
  agenda.define('send scheduled email', async (job: any) => {
    const { templateId, recipient, variables = {} } = job.attrs.data;

    const template = await EmailTemplate.findById(templateId);
    if (!template) throw new Error('Template not found');

    let subject = template.subject;
    let body = template.body;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      const safeValue = String(value).replace(/\$/g, '$$$$');
      subject = subject.replace(new RegExp(placeholder, 'g'), safeValue);
      body = body.replace(new RegExp(placeholder, 'g'), safeValue);
    }

    const formattedBody = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">${body.replace(/\n/g, '<br>')}</div>`;

    await sendEmail({ to: recipient, subject, html: formattedBody });

    await SentEmail.create({
      templateId,
      recipient,
      subject,
      body,
      category: template.category,
      variables,
    });

    console.log(`Scheduled email sent to ${recipient}`);
  });

  await agenda.start();
  console.log('✅ Agenda started');
  return agenda;
}
