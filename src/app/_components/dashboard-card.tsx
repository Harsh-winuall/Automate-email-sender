import Link from "next/link";

function DashboardCard({
    title,
    description,
    href,
    icon,
  }: {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        className="group p-8 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 hover:shadow-md transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 mb-3 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600">{description}</p>
      </Link>
    );
  }

  export default DashboardCard