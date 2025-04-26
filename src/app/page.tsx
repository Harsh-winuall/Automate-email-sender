import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Email Automation Dashboard
          </h1>
          <p className="text-gray-500 text-lg">
            Quickly send job applications, referral requests, and manage your templates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card
            title="Send Email"
            description="Send a new email using a template"
            href="/send"
            icon="✉️"
          />
          <Card
            title="Templates"
            description="Manage your email templates"
            href="/templates"
            icon="📄"
          />
          <Card
            title="Sent Emails"
            description="View your sent email history"
            href="/sent"
            icon="📬"
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
        {title}
      </h2>
      <p className="text-gray-500">{description}</p>
    </Link>
  );
}
