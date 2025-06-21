// models/EmailClick.ts
import mongoose from 'mongoose';

const EmailClickSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  clickedAt: { type: Date, default: Date.now },
  clickedUrl: { type: String, required: true },
  ip: String,
});

export default mongoose.models.EmailClick || mongoose.model('EmailClick', EmailClickSchema);
