'use client';

import { useEmailTemplates } from '@/hooks/useEmailTemplates';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SendEmailForm() {
  const { data: templates, isLoading: templatesLoading } = useEmailTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  
  const { mutate: sendEmail, isPending } = useSendEmail();
  const router = useRouter();

  const selectedTemplate = templates?.find(t => t._id === selectedTemplateId);

  const handleVariableChange = (field: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplateId || !recipient) return;
    
    sendEmail(
      { templateId: selectedTemplateId, recipient, variables },
      { onSuccess: () => router.push('/sent') }
    );
  };

  if (templatesLoading) {
    return (
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4" />
        <div className="h-6 bg-gray-300 rounded mb-4" />
        <div className="h-6 bg-gray-300 rounded mb-4" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-md rounded-2xl max-w-2xl mx-auto space-y-6"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Select Template
        </label>
        <select
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select a template</option>
          {templates?.map((template) => (
            <option key={template._id} value={template._id}>
              {template.name} ({template.category})
            </option>
          ))}
        </select>
      </div>

      {selectedTemplate && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example@example.com"
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Fill Template Variables
            </h3>
            {selectedTemplate.fields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  value={variables[field] || ''}
                  onChange={(e) => handleVariableChange(field, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
