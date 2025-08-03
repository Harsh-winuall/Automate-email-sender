// models/EmailCredential.ts
import mongoose from 'mongoose';

const EmailCredentialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  email: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
}, { timestamps: true });

export const EmailCredential = mongoose.models.EmailCredential || mongoose.model('EmailCredential', EmailCredentialSchema);
