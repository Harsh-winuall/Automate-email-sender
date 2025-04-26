'use client';

import { useCreateEmailTemplate } from '@/hooks/useEmailTemplates';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EmailTemplateForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'job-application' | 'referral-request' | 'other'>('job-application');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [newField, setNewField] = useState('');

  const { mutate: createTemplate, isPending } = useCreateEmailTemplate();
  const router = useRouter();

  const handleAddField = () => {
    if (newField && !fields.includes(newField)) {
      setFields([...fields, newField]);
      setNewField('');
    }
  };

  const handleRemoveField = (fieldToRemove: string) => {
    setFields(fields.filter(field => field !== fieldToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTemplate(
      { name, category, subject, body, fields },
      { onSuccess: () => router.push('/templates') }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
      {/* Template Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="Enter template name"
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="job-application">Job Application</option>
          <option value="referral-request">Referral Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="Enter subject"
          required
        />
      </div>

      {/* Body */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="Enter email body content"
          required
        />
        <p className="text-xs text-gray-500">
          Use <code>{'{{fieldName}}'}</code> for dynamic placeholders.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Fields</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="Add a new field"
          />
          <button
            type="button"
            onClick={handleAddField}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>

        {/* Display fields */}
        {fields.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {fields.map((field) => (
              <span key={field} className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full px-3 py-1">
                {field}
                <button
                  type="button"
                  onClick={() => handleRemoveField(field)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Template'}
        </button>
      </div>
    </form>
  );
}
