'use client';

import { useSentEmails } from '@/hooks/useSentEmails';
import Link from 'next/link';

interface EmailListProps {
  category?: string;
}

export default function EmailList({ category }: EmailListProps) {
  const { data: emails, isLoading, error } = useSentEmails(category);

  if (isLoading) return <div>Loading emails...</div>;
  if (error) return <div>Error loading emails: {error.message}</div>;

  return (
    <div className="space-y-4">
      {emails?.length === 0 ? (
        <p>No emails found</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {emails?.map(email => (
            <li key={email._id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">
                    To: {email.recipient}
                  </p>
                  <p className="text-sm text-gray-500">
                    Subject: {email.subject}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {email.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Sent: {new Date(email.sentAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  href={`/sent/${email._id}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}