"use client";

import { useEmailTemplates } from "@/hooks/useEmailTemplates";
import { useSendEmail } from "@/hooks/useSendEmail";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { useScheduleEmail } from "@/hooks/useScheduleEmail";

export default function SendEmailForm() {
  const { data: templates, isLoading: templatesLoading } = useEmailTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendAt, setSendAt] = useState("");
  const selectedTemplate = templates?.find((t) => t._id === selectedTemplateId);
  const [sendFollowUp, setSendFollowUp] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendFollowUp(event.target.checked);
  };
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    // Initialize with empty strings for all fields if template is selected
    if (selectedTemplate) {
      return selectedTemplate.fields.reduce((acc, field) => {
        acc[field] = "";
        return acc;
      }, {} as Record<string, string>);
    }
    return {};
  });

  useEffect(() => {
    if (selectedTemplate) {
      setVariables(
        selectedTemplate.fields.reduce((acc, field) => {
          acc[field] = variables[field] || "";
          return acc;
        }, {} as Record<string, string>)
      );
    }
  }, [selectedTemplateId]);

  const { mutate: sendEmail, isPending: sendEmailPending } = useSendEmail();
  const { mutate: scheduleEmail, isPending: scheduleEmailPending } =
    useScheduleEmail();

  const router = useRouter();

  const handleVariableChange = (field: string, value: string) => {
    setVariables((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplateId || !recipient) {
      toast.error("Please select a template and enter recipient email");
      return;
    }

    // Check all required fields are filled
    const missingFields = selectedTemplate.fields.filter(
      (field) => !variables[field]?.trim()
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    if (sendAt) {
      // Schedule the email
      scheduleEmail(
        {
          templateId: selectedTemplateId,
          recipient,
          variables,
          subject: selectedTemplate.subject,
          body: selectedTemplate.body,
          category: selectedTemplate.category,
          scheduleTime: new Date(sendAt).toISOString(),
        },
        {
          onSuccess: () => {
            router.push("/scheduled-emails");
          },
        }
      );
      return;
    } else {
      sendEmail(
        {
          templateId: selectedTemplateId,
          recipient,
          variables,
          sendFollowUp,
        },
        {
          onSuccess: () => router.push("/sent"),
        }
      );
    }
  };

  if (templatesLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-6 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Template
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="appearance-none block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          >
            <option value="">Select a template</option>
            {templates?.map((template) => (
              <option key={template._id} value={template._id}>
                {template.name} ({template.category})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <FiChevronDown />
          </div>
        </div>
      </div>

      {selectedTemplate && (
        <>
          {/* Recipient Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Recipient Email
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="recipient@example.com"
              required
            />
          </div>

          {/* Schedule Date & Time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Schedule Email (optional)
            </label>
            <input
              type="datetime-local"
              value={sendAt}
              onChange={(e) => setSendAt(e.target.value)}
              className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Template Variables */}
          <div className="space-y-6 pt-4">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personalize Your Message
              </h3>
              <div className="space-y-4">
                {selectedTemplate.fields.map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={variables[field] || ""}
                      onChange={(e) =>
                        handleVariableChange(field, e.target.value)
                      }
                      className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700">
                Email Preview
              </h4>
            </div>
            <div className="p-4 bg-white">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Subject:{" "}
                {selectedTemplate.subject
                  .split("{{")
                  .map((part, i) => {
                    const [field] = part.split("}}");
                    return i === 0
                      ? part
                      : (variables[field] || `{{${field}}}`) +
                          part.slice(field.length + 2);
                  })
                  .join("")}
              </div>
              <div className="text-sm text-gray-600 whitespace-pre-line border-t border-gray-200 pt-2 mt-2">
                {selectedTemplate.body
                  .split("{{")
                  .map((part, i) => {
                    const [field] = part.split("}}");
                    return i === 0
                      ? part
                      : (variables[field] || `{{${field}}}`) +
                          part.slice(field.length + 2);
                  })
                  .join("")}
              </div>
            </div>
          </div>

          <div className="flex items-center group gap-2">
            <input
              type="checkbox"
              name="sendFollowUp"
              checked={sendFollowUp}
              onChange={handleCheckboxChange}
            />
            <span>Would you like to send a Follow-up?</span>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sendEmailPending || scheduleEmailPending}
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {sendEmailPending || scheduleEmailPending ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  {sendAt ? "Scheduling..." : "Sending..."}
                </>
              ) : (
                `${sendAt ? "Schedule" : "Send"} Email`
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
