// import SendEmailForm from '@/components/SendEmailForm';

import SendEmailForm from "../_components/send-email-form";

export default function SendEmailPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Send Email</h1>
      <SendEmailForm />
    </div>
  );
}