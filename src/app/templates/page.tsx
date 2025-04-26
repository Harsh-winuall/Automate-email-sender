'use client';

import { useEmailTemplates } from '@/hooks/useEmailTemplates';
import Link from 'next/link';

export default function TemplatesPage() {
  const { data: templates, isLoading, error } = useEmailTemplates();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading templates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading templates: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Email Templates</h1>
            <p className="text-gray-500">Manage and edit your templates for faster email sending</p>
          </div>
          <Link
            href="/templates/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            + New Template
          </Link>
        </div>

        {templates?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">No templates found</h2>
            <p className="text-gray-500 mb-6">Start by creating your first email template!</p>
            <Link
              href="/templates/new"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Create Template
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden shadow rounded-2xl bg-white">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <TableHeading>Name</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Fields</TableHeading>
                  <th className="py-4 px-4 text-sm font-semibold text-right text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {templates.map((template) => (
                  <tr key={template._id} className="hover:bg-gray-50 transition">
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{template.category}</TableCell>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field) => (
                          <span
                            key={field}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/templates/${template._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function TableHeading({ children }: { children: React.ReactNode }) {
  return (
    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="py-4 px-6 text-sm text-gray-600">
      {children}
    </td>
  );
}
