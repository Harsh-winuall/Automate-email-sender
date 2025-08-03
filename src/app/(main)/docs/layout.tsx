// app/docs/layout.tsx

import Link from "next/link";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-background w-full">
      {/* Main Content */}
      <div className="overflow-y-auto w-3/4 scroll-smooth no-scrollbar px-6">
        {children}
      </div>

      {/* Sidebar Table of Contents */}
      <div className="border-l border-gray-200 h-full w-1/4 px-4 py-8 overflow-y-auto sticky top-[64px]">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          On This Page
        </h3>
        <ul className="space-y-3 text-sm">
          <li>
            <a href="#step-1" className="text-blue-600 hover:underline">
              1. Google Account Security
            </a>
          </li>
          <li>
            <a href="#step-2" className="text-blue-600 hover:underline">
              2. Enable 2FA
            </a>
          </li>
          <li>
            <a href="#step-3" className="text-blue-600 hover:underline">
              3. App Passwords
            </a>
          </li>
          <li>
            <a href="#step-4" className="text-blue-600 hover:underline">
              4. Select App & Device
            </a>
          </li>
          <li>
            <a href="#step-5" className="text-blue-600 hover:underline">
              5. Create App Password
            </a>
          </li>
          <li>
            <a href="#step-6" className="text-blue-600 hover:underline">
              6. Paste & Save
            </a>
          </li>
          <li>
            <a href="#why-needed" className="text-blue-600 hover:underline">
              Why Do We Need This?
            </a>
          </li>
        </ul>

        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Related
          </h4>
          <Link
            href="/connect-email"
            className="block text-blue-500 hover:underline"
          >
            🔗 Connect Email Form
          </Link>
        </div>
      </div>
    </div>
  );
}
