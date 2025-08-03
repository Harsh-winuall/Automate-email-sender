import nodemailer from "nodemailer";
import { nameFromEmail } from "./encryption";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  appPassword?: string; // Optional app password for Gmail
  from?: string; // Optional sender email
}

export async function sendEmail({
  to,
  subject,
  html,
  appPassword,
  from,
}: SendEmailParams) {
  // For production, use a real email service like SendGrid
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: process.env.EMAIL_HOST,
    // port: Number(process.env.EMAIL_PORT),
    // secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: from,
      pass: appPassword,
    },
  });

  // For development, use Ethereal.email
  // if (process.env.NODE_ENV === 'development') {
  //   const testAccount = await nodemailer.createTestAccount();
  //   transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: testAccount.user,
  //       pass: testAccount.pass,
  //     },
  //   });
  // }

  const name = nameFromEmail(from || "no-reply@example.com");

  const info = await transporter.sendMail({
    from: `"${name}" <${from || "no-reply@example.com"}>`,
    to,
    subject,
    html,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  return info;
}
