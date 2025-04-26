import { Schema, model, models } from 'mongoose';

export interface ISentEmail {
  _id: string;
  templateId: string;
  recipient: string;
  subject: string;
  body: string;
  category: 'job-application' | 'referral-request' | 'other';
  variables: Record<string, string>;
  sentAt: Date;
}

const sentEmailSchema = new Schema<ISentEmail>(
  {
    templateId: { type: String, required: true },
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['job-application', 'referral-request', 'other'] 
    },
    variables: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: 'sentAt', updatedAt: false } }
);

export const SentEmail = models.SentEmail || model<ISentEmail>('SentEmail', sentEmailSchema);