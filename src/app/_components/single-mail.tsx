'use client'
import { useEmail } from '@/hooks/useSentEmails';
import { format } from 'date-fns';
import { FiArrowLeft, FiCalendar, FiMail, FiTag } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import PageLoader from './page-loader';

const MailDetail = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: email, isError, isLoading } = useEmail(id);

  if (isLoading) {
    return (
      <PageLoader isLoading={isLoading}/>
    );
  }

  if (isError || !email) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Failed to load email details. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <FiArrowLeft className="mr-2" />
          Back to Sent Emails
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">{email.subject}</h1>
          </div>
        </div>

        {/* Meta Information */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <FiMail className="mr-2 text-gray-400" />
              <span>
                To: <span className="font-medium">{email.recipient}</span>
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiCalendar className="mr-2 text-gray-400" />
              <span>
                Sent: <span className="font-medium">
                  {format(new Date(email.sentAt), 'MMM d, yyyy h:mm a')}
                </span>
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiTag className="mr-2 text-gray-400" />
              <span>
                Category: <span className="font-medium capitalize">{email.category}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="px-6 py-6">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: email.body.replace(/\n/g, '<br>') }}
          />
        </div>

        {/* Variables Used */}
        {email.variables && Object.keys(email.variables).length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Variables Used</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(email.variables).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-gray-600">{key}:</span>{' '}
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailDetail;