// lib/agendaJobs/sendFollowUp.ts

import { SentEmail } from '@/models/SentEmail';
import { sendEmail } from '@/lib/email';
import { EmailCredential } from '@/models/EmailCredential';
import { decrypt } from '@/lib/encryption';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

export const sendFollowUp = async (job: any) => {
  await dbConnect();
  const cutoffDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago

  const emails = await SentEmail.find({
    isOpened: false,
    sendFollowUp: true,
    followUpSent: false,
    createdAt: { $lte: cutoffDate },
  });

  for (const email of emails) {
    const creds = await EmailCredential.findOne({
      userId: new mongoose.Types.ObjectId(email.userId),
    });

    if (!creds) continue;

    const decryptedPassword = decrypt(creds.encryptedPassword);
    console.log(decryptedPassword)

    await sendEmail({
      to: email.recipient,
      subject: `Follow-up: ${email.subject}`,
      html: `<div style="font-family: Arial, sans-serif;">Hi again,<br><br>Just checking in on my earlier message:<br><br>${email.body}<br><br>Let me know if you have any questions.<br><br>Thanks!</div>`,
      appPassword: decryptedPassword,
      from: creds.email,
    });

    email.followUpSent = true;
    await email.save();
  }
};
