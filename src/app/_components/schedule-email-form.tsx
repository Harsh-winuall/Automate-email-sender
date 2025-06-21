"use client";

import { useEmailTemplates } from "@/hooks/useEmailTemplates";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { useScheduleEmail } from "@/hooks/useScheduleEmail";

// Helper function for email validation
const isValidEmail = (email: string) => {
  // A simple regex for email validation (can be more robust if needed)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function ScheduleEmailForm({selectedDate}:{selectedDate: any}) {
  const { data: templates, isLoading: templatesLoading } = useEmailTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendAt, setSendAt] = useState("");
  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedTemplate = templates?.find((t) => t._id === selectedTemplateId);
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    if (selectedTemplate) {
      return selectedTemplate.fields.reduce((acc, field) => {
        acc[field] = "";
        return acc;
      }, {} as Record<string, string>);
    }
    return {};
  });

  useEffect(() => {
    // When template changes, reset variables and clear related errors
    if (selectedTemplate) {
      setVariables(
        selectedTemplate.fields.reduce((acc, field) => {
          acc[field] = variables[field] || "";
          return acc;
        }, {} as Record<string, string>)
      );
      // Clear variable-related errors when template changes
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        selectedTemplate.fields.forEach((field) => {
          delete newErrors[`variable-${field}`];
        });
        return newErrors;
      });
    } else {
      // If no template is selected, clear all variables
      setVariables({});
    }
    // Also clear template and recipient errors if template is selected
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedTemplateId: "",
      recipient: "",
    }));
  }, [selectedTemplateId, templates]); // Added templates to dependency array

  // Effect to validate sendAt when it changes
  useEffect(() => {

    if(selectedDate){
        setSendAt(selectedDate);
    }

    if (sendAt) {
      const selectedDateTime = new Date(sendAt);
      const currentDateTime = new Date();

      if (selectedDateTime <= currentDateTime) {
        setErrors((prev) => ({
          ...prev,
          sendAt: "Schedule time must be in the future.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, sendAt: "" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, sendAt: "Schedule time is required." }));
    }
  }, [sendAt, selectedDate]);

  const { mutate: scheduleEmail, isPending: scheduleEmailPending } =
    useScheduleEmail();

  const router = useRouter();

  const handleVariableChange = (field: string, value: string) => {
    setVariables((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this specific variable when user types
    setErrors((prev) => ({ ...prev, [`variable-${field}`]: "" }));
  };

  // Generic input change handler to clear errors on type
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    if (fieldName === "recipient") {
      setRecipient(value);
      // Clear error for recipient if it's no longer empty
      if (value.trim()) {
        setErrors((prev) => ({ ...prev, recipient: "" }));
      }
    } else if (fieldName === "selectedTemplateId") {
      setSelectedTemplateId(value);
      if (value.trim()) {
        setErrors((prev) => ({ ...prev, selectedTemplateId: "" }));
      }
    } else if (fieldName === "sendAt") {
      setSendAt(value);
      // sendAt has its own useEffect for validation
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedTemplateId) {
      newErrors.selectedTemplateId = "Please select an email template.";
    }

    if (!recipient.trim()) {
      newErrors.recipient = "Recipient email is required.";
    } else if (!isValidEmail(recipient)) {
      newErrors.recipient = "Please enter a valid email address.";
    }

    if (!sendAt) {
      newErrors.sendAt = "Schedule time is required.";
    } else {
      const selectedDateTime = new Date(sendAt);
      const currentDateTime = new Date();
      if (selectedDateTime <= currentDateTime) {
        newErrors.sendAt = "Schedule time must be in the future.";
      }
    }

    if (selectedTemplate) {
      selectedTemplate.fields.forEach((field) => {
        if (!variables[field]?.trim()) {
          newErrors[`variable-${field}`] = `${field} is required.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    // All validations passed, proceed with scheduling
    if (selectedTemplate) {
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
            toast.success("Email scheduled successfully!");
            router.push("/scheduled-emails");
          },
          onError: (error) => {
            toast.error(
              `Failed to schedule email: ${error.message || "Unknown error"}`
            );
          },
        }
      );
    } else {
      // This case should ideally not be reached if validateForm() passes,
      // but good for a fallback error.
      toast.error("An unexpected error occurred: Template not found.");
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
            onChange={(e) => handleInputChange(e, "selectedTemplateId")}
            className={`appearance-none block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
              errors.selectedTemplateId
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500"
            }`}
            required // HTML5 validation fallback
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
        {errors.selectedTemplateId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.selectedTemplateId}
          </p>
        )}
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
              type="email" // Use type="email" for browser-level validation hints
              value={recipient}
              onChange={(e) => handleInputChange(e, "recipient")}
              className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
                errors.recipient
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              }`}
              placeholder="recipient@example.com"
              required // HTML5 validation fallback
            />
            {errors.recipient && (
              <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>
            )}
          </div>

          {/* Schedule Date & Time */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Schedule Email Time
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="datetime-local"
              value={sendAt}
              onChange={(e) => handleInputChange(e, "sendAt")}
              // Set min attribute to current datetime to prevent past dates
              min={new Date().toISOString().slice(0, 16)}
              className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
                errors.sendAt
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              }`}
              required // HTML5 validation fallback
            />
            {errors.sendAt && (
              <p className="mt-1 text-sm text-red-600">{errors.sendAt}</p>
            )}
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
                      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {/* Capitalize field name for display */}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={variables[field] || ""}
                      onChange={(e) =>
                        handleVariableChange(field, e.target.value)
                      }
                      className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
                        errors[`variable-${field}`]
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-indigo-500"
                      }`}
                      required // HTML5 validation fallback
                    />
                    {errors[`variable-${field}`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`variable-${field}`]}
                      </p>
                    )}
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
              disabled={scheduleEmailPending} // Removed sendEmailPending as it's not used in handleSubmit
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {scheduleEmailPending ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Scheduling...
                </>
              ) : (
                `Schedule Email`
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
