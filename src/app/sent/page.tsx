// import EmailList from '@/components/EmailList';
import Link from 'next/link';
import EmailList from '../_components/email-list';

export default function SentEmailsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sent Emails</h1>
        <div className="flex space-x-2">
          <Link
            href="/sent?category=job-application"
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200"
          >
            Job Applications
          </Link>
          <Link
            href="/sent?category=referral-request"
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200"
          >
            Referral Requests
          </Link>
          <Link
            href="/sent"
            className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
          >
            All
          </Link>
        </div>
      </div>
      <EmailList />
    </div>
  );
}