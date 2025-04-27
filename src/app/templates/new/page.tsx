// app/templates/new/page.tsx
import { FiArrowLeft, FiFileText } from 'react-icons/fi';
import Link from 'next/link';
import EmailTemplateForm from "@/app/_components/email-template-form";

export default function NewTemplatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/templates" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            Back to Templates
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <FiFileText className="text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Template</h1>
                <p className="text-gray-600">Build reusable email templates for your outreach campaigns</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <EmailTemplateForm />
          </div>
        </div>
      </div>
    </div>
  );
}