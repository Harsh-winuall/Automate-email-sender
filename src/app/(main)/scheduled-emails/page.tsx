// components/ScheduledEmailList.tsx
'use client';
import { useScheduledEmails } from '@/hooks/useScheduledEmails';
import Link from 'next/link';
import { FiMail, FiClock, FiCalendar, FiTag, FiEye } from 'react-icons/fi'; // Importing icons
import PageLoader from '../../_components/page-loader';

export default function ScheduledEmailList() {
  const { data, isLoading, isError, error } = useScheduledEmails();

  if (isLoading) {
    return (
      <PageLoader isLoading={isLoading}/>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
        <p className="font-semibold">Error loading scheduled emails:</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Scheduled Emails</h2>
      {data?.scheduledEmails?.length === 0 ? (
        <div className="p-6 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg shadow-sm text-center">
          <p className="text-lg font-medium">No scheduled emails found.</p>
          <p className="text-sm mt-2">Start by scheduling your first email!</p>
          <Link
            href="/send-email"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Schedule an Email
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.scheduledEmails?.map((job: { id: any; recipient: any; subject: any; templateId: any; nextRunAt: any; category: any; }) => {
            const { id, recipient, subject, templateId, nextRunAt, category } = job;

            return (
              <div key={id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-5 space-y-3">
                  <p className="text-sm text-gray-500 flex items-center">
                    <FiMail className="mr-2 text-indigo-500" />
                    <span className="font-medium text-gray-700">To:</span> {recipient}
                  </p>
                  <p className="text-lg font-semibold text-gray-800 flex items-center">
                    <FiTag className="mr-2 text-green-500" />
                    {subject || '(No Subject)'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FiCalendar className="mr-2 text-purple-500" />
                    <span className="font-medium text-gray-700">Template:</span> {templateId} (Category: {category})
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FiClock className="mr-2 text-blue-500" />
                    <span className="font-medium text-gray-700">Scheduled For:</span>{' '}
                    {nextRunAt ? new Date(nextRunAt).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    }) : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
                  <Link
                    href={`/scheduled/${id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiEye className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}