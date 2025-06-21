// models/EmailOpen.ts
import mongoose from 'mongoose';

const EmailOpenSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  openedAt: { type: Date, default: Date.now },
  ip: String,
});

export default mongoose.models.EmailOpen || mongoose.model('EmailOpen', EmailOpenSchema);
