// lib/encryption.ts
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // Must be 32 bytes


const IV = crypto.randomBytes(16); // Initialization vector, must be 16 bytes for AES


export function encrypt(text: string) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${IV.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(data: string): string {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf-8");
}


export function nameFromEmail(email: string): string {
  const namePart = email.split("@")[0]; // 'harsh.tripathi'
  const words = namePart.split(/[\._\-]/); // split on '.', '_', '-'
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize
    .join(" "); // join with space
}
