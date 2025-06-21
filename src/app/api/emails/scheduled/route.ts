// api/emails/scheduled/route.ts
import { NextResponse } from 'next/server';
import { getAgendaInstance } from '@/lib/agenda';
import dbConnect from '@/lib/db';

export async function GET() {
  await dbConnect();
  const agenda = await getAgendaInstance();

  try {
    // Get scheduled email jobs (filter by name if needed)
    const jobs = await agenda.jobs({ name: 'send scheduled email', nextRunAt: { $gte: new Date() }, });

    // Format jobs for frontend
    const scheduledEmails = jobs.map(job => {
      const { templateId, recipient, variables, subject, body, category } = job.attrs.data || {};
      return {
        id: job.attrs._id,
        templateId,
        subject,
        body,
        category,
        recipient,
        variables,
        nextRunAt: job.attrs.nextRunAt,
        lastModifiedBy: job.attrs.lastModifiedBy,
        status: job.attrs.failedAt ? 'Failed' : 'Scheduled',
      };
    });

    return NextResponse.json({ scheduledEmails });
  } catch (error) {
    console.error('Error fetching scheduled emails:', error);
    return NextResponse.json({ error: 'Failed to fetch scheduled emails' }, { status: 500 });
  }
}
