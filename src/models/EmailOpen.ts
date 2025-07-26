// models/EmailOpen.ts
import mongoose from 'mongoose';

const EmailOpenSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  openedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ip: String,
});

export default mongoose.models.EmailOpen || mongoose.model('EmailOpen', EmailOpenSchema);
