// app/templates/new/page.tsx

import EmailTemplateForm from "@/app/_components/email-template-form";

export default function NewTemplatePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Template</h1>
        <EmailTemplateForm />
      </div>
    </div>
  );
}
