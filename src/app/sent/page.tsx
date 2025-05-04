
import Link from 'next/link';
import EmailList from '../_components/email-list';

interface SentEmailsPageProps {
  searchParams: {
    category?: 'job-application' | 'referral-request' | string;
  };
}

export default async function SentEmailsPage({ searchParams }: SentEmailsPageProps) {
  const { category } = await searchParams;
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sent Emails</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/sent?category=job-application"
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              category === 'job-application'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            Job Applications
          </Link>
          <Link
            href="/sent?category=referral-request"
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              category === 'referral-request'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            Referral Requests
          </Link>
          <Link
            href="/sent"
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              !category
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            All Emails
          </Link>
        </div>
      </div>
      <EmailList category={category} />
    </div>
  );
}