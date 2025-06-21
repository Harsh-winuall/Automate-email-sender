// app/send/page.tsx
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import Link from 'next/link';
import SendEmailForm from "../../_components/send-email-form";

export default function SendEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors text-sm"
          >
            <FiArrowLeft className="text-base" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <FiSend className="text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Send Email</h1>
                <p className="text-gray-600">Select a template and personalize your message</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <SendEmailForm />
          </div>
        </div>
      </div>
    </div>
  );
}