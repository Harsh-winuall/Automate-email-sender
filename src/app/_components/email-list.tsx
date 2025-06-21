'use client';

import { useSentEmails } from '@/hooks/useSentEmails'; // Assuming this path is correct
import Link from 'next/link';
import React from 'react'; // Import React for JSX
import PageLoader from './page-loader'; // Assuming this path is correct
import { MdKeyboardArrowRight } from 'react-icons/md'; // Import MdKeyboardArrowRight from react-icons/md

// Define the structure of an email item
interface EmailItem {
  _id: string;
  recipient: string;
  subject: string;
  category: string;
  sentAt: string; // ISO 8601 string
}

// Props for the EmailList component
interface EmailListProps {
  category?: string;
}

// EmailCard Component: Renders a single email item as a modern card
interface EmailCardProps {
  email: EmailItem;
}

const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  // Format the sent date for better readability
  const formattedSentDate = new Date(email.sentAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out overflow-hidden border border-gray-200 dark:border-gray-700">
      <Link href={`/sent/${email._id}`} className="block p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Email Details */}
          <div className="flex-1 min-w-0">
            {/* Recipient */}
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate mb-1">
              To: <span className="font-semibold text-gray-800 dark:text-gray-200">{email.recipient}</span>
            </p>
            {/* Subject */}
            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 truncate mb-2">
              {email.subject}
            </h3>
            {/* Category and Sent Date */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-800 dark:text-blue-100">
                {email.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Sent: {formattedSentDate}
              </span>
            </div>
          </div>

          {/* View Details Link/Button */}
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors duration-200">
              View Details
              <MdKeyboardArrowRight className="h-5 w-5" /> {/* Replaced ChevronRight with MdKeyboardArrowRight */}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

// EmailList Component: Fetches and displays the list of emails
export default function EmailList({ category }: EmailListProps) {
  const { data: emails, isLoading, error } = useSentEmails(category);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <PageLoader isLoading={isLoading} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-10">
        <p className="text-lg font-medium">Error loading emails:</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  // Empty state
  if (!emails || emails.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        <p className="text-lg font-medium mb-2">No emails found in this category.</p>
        <p className="text-sm">Try selecting a different category or check back later.</p>
      </div>
    );
  }

  // Display emails
  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-1 gap-4"> {/* Using grid for better spacing */}
        {emails.map((email) => (
          <EmailCard key={email._id} email={email} />
        ))}
      </ul>
    </div>
  );
}
