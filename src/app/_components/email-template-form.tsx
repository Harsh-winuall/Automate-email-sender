// EmailTemplateForm component
"use client";

import {
  useCreateEmailTemplate,
  useTemplate,
  useUpdateTemplate,
} from "@/hooks/useEmailTemplates";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiX, FiHelpCircle } from "react-icons/fi";

export default function EmailTemplateForm({ id }: { id?: string }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<
    "job-application" | "referral-request" | "other"
  >("job-application");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [newField, setNewField] = useState("");
  const router = useRouter();
  const { mutate: updateTemplate, isPending: isUpdating } = useUpdateTemplate();

  if (id) {
    const { data: existingTemplate } = useTemplate(id);

    useEffect(() => {
      if (existingTemplate) {
        setName(existingTemplate?.name);
        setCategory(existingTemplate?.category);
        setSubject(existingTemplate.subject);
        setBody(existingTemplate?.body);
        setFields(existingTemplate?.fields);
      }
    }, [existingTemplate]);
  }

  const { mutate: createTemplate, isPending } = useCreateEmailTemplate();

  const handleAddField = () => {
    if (newField && !fields.includes(newField)) {
      setFields([...fields, newField]);
      setNewField("");
    }
  };

  const handleRemoveField = (fieldToRemove: string) => {
    setFields(fields.filter((field) => field !== fieldToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const templateData = { name, category, subject, body, fields };
    if (id) {
      // Update existing template
      updateTemplate(
        { id, templateData },
        { onSuccess: () => router.push("/templates") }
      );
    } else {
      // Create new template
      createTemplate(templateData, {
        onSuccess: () => router.push("/templates"),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Template Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Template Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3"
            placeholder="e.g. Software Engineer Application"
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="block w-full rounded-lg p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="job-application">Job Application</option>
            <option value="referral-request">Referral Request</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email Subject
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="block w-full rounded-lg p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          placeholder="e.g. Application for Software Engineer Position"
          required
        />
      </div>

      {/* Body */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Email Body
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex items-center text-xs text-gray-500">
            <FiHelpCircle className="mr-1" />
            Use {"{{fieldName}}"} for placeholders
          </div>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="block p-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-mono"
          placeholder={`Dear Hiring Manager,\n\nI'm excited to apply for the {{position}} role at {{company}}...`}
          required
        />
      </div>

      {/* Fields */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Custom Fields
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddField()}
            className="block p-3 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            placeholder="e.g. position, company, hiringManager"
          />
          <button
            type="button"
            onClick={handleAddField}
            className="inline-flex items-center gap-1 px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FiPlus className="text-sm" /> Add
          </button>
        </div>

        {/* Display fields */}
        {fields.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {fields.map((field) => (
              <span
                key={field}
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700"
              >
                {field}
                <button
                  type="button"
                  onClick={() => handleRemoveField(field)}
                  className="text-indigo-400 hover:text-indigo-600"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.push("/templates")}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending || isUpdating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Template"
          )}
        </button>
      </div>
    </form>
  );
}
