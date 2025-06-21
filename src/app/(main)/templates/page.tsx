"use client";

import {
  useDeleteEmailTemplate,
  useEmailTemplates,
} from "@/hooks/useEmailTemplates";
import Link from "next/link";
import {
  FiPlus,
  FiEdit2,
  FiSearch,
  FiFolder,
  FiFileText,
} from "react-icons/fi";
import { useState } from "react";
import { IEmailTemplate } from "@/models/EmailTemplate";
import { ImBin } from "react-icons/im";
import { toast } from "sonner";
import PageLoader from "../../_components/page-loader";

export default function TemplatesPage() {
  const { data: templates, isLoading, error } = useEmailTemplates();
  const { mutate } = useDeleteEmailTemplate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingID, setDeletingId] = useState<string | null>(null);

  const filteredTemplates = templates?.filter(
    (template: IEmailTemplate) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (tempID: string) => {
    setDeletingId(tempID);
    mutate(tempID, {
      onSettled: () => {
        setDeletingId(null);
      },
    });
  };

  if (isLoading) {
    return <PageLoader isLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-red-50 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error loading templates
          </h2>
          <p className="text-red-500 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                <FiFileText className="mr-3 text-indigo-600" />
                Email Templates
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Manage your template library for faster email outreach. Create,
                edit, and organize your templates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link
                href="/templates/new"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm"
              >
                <FiPlus className="text-lg" />
                New Template
              </Link>
            </div>
          </div>

          {/* Empty State */}
          {filteredTemplates?.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-indigo-50 mb-6">
                <FiFolder className="text-indigo-600 text-3xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm ? "No matching templates" : "No templates yet"}
              </h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? "Try adjusting your search or create a new template"
                  : "Get started by creating your first email template"}
              </p>
              <Link
                href="/templates/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                <FiPlus />
                Create Template
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-5 md:col-span-4 lg:col-span-3 text-sm font-semibold text-gray-700">
                  Template Name
                </div>
                <div className="col-span-4 md:col-span-3 lg:col-span-2 text-sm font-semibold text-gray-700">
                  Category
                </div>
                <div className="hidden md:block md:col-span-3 lg:col-span-4 text-sm font-semibold text-gray-700">
                  Fields
                </div>
                <div className="col-span-3 md:col-span-2 lg:col-span-3 text-sm font-semibold text-gray-700 text-right">
                  Actions
                </div>
              </div>

              {/* Template List */}
              <div className="divide-y divide-gray-200">
                {filteredTemplates?.map((template: IEmailTemplate) => (
                  <div
                    key={template._id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition"
                  >
                    <div className="col-span-5 md:col-span-4 lg:col-span-3 flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mr-4">
                        <FiFileText className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {template.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Last updated:{" "}
                          {new Date(template.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-4 md:col-span-3 lg:col-span-2 flex items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {template.category}
                      </span>
                    </div>

                    <div className="hidden md:flex md:col-span-3 lg:col-span-4 items-center flex-wrap gap-2">
                      {template.fields.map((field) => (
                        <span
                          key={field}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {field}
                        </span>
                      ))}
                    </div>

                    <div className="col-span-3 md:col-span-2 lg:col-span-3 flex items-center justify-end">
                      <Link
                        href={`/templates/${template._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        <FiEdit2 className="text-sm" />
                        Edit
                      </Link>

                      <div
                        onClick={() => {
                          handleDelete(template._id);
                        }}
                        className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                      >
                        {deletingID === template._id ? (
                          "Deleting..."
                        ) : (
                          <>
                            <ImBin className="text-sm" />
                            Delete
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Footer */}
          {filteredTemplates && filteredTemplates.length > 0 && (
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <div>
                Showing{" "}
                <span className="font-medium">{filteredTemplates.length}</span>{" "}
                of <span className="font-medium">{templates?.length}</span>{" "}
                templates
              </div>
              <div className="flex gap-4">
                <button className="hover:text-indigo-600 transition">
                  Previous
                </button>
                <button className="hover:text-indigo-600 transition">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
