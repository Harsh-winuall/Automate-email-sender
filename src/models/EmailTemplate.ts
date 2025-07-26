import mongoose, { Schema, model, models } from 'mongoose';

export interface IEmailTemplate {
  _id: string;
  name: string;
  category: 'job-application' | 'referral-request' | 'other';
  subject: string;
  body: string;
  fields: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Schema.Types.ObjectId; 
}

const emailTemplateSchema = new Schema<IEmailTemplate>(
  {
    name: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['job-application', 'referral-request', 'other'] 
    },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    fields: { type: [String], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const EmailTemplate = models.EmailTemplate || model<IEmailTemplate>('EmailTemplate', emailTemplateSchema);