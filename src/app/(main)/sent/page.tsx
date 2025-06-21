import Link from 'next/link';
import EmailList from '../../_components/email-list';

interface SentEmailsPageProps {
  searchParams: {
    category?: 'job-application' | 'referral-request' | string;
  };
}

export default async function SentEmailsPage({ searchParams }: SentEmailsPageProps) {
  // Destructure category from searchParams.
  // Note: In Next.js App Router, searchParams are plain objects, no need for `await`.
  const {category} = await searchParams;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          {/* Section Title */}
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Sent Emails
          </h1>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sent?category=job-application"
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                shadow-sm hover:shadow-md
                ${
                  category === 'job-application'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              Job Applications
            </Link>
            <Link
              href="/sent?category=referral-request"
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                shadow-sm hover:shadow-md
                ${
                  category === 'referral-request'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              Referral Requests
            </Link>
            <Link
              href="/sent"
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                shadow-sm hover:shadow-md
                ${
                  !category
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              All Emails
            </Link>
          </div>
        </div>

        {/* Email List Component */}
        <EmailList category={category} />
      </div>
    </>
  );
}
