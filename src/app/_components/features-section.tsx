import React from 'react'
import { FiBarChart2, FiFileText, FiZap } from 'react-icons/fi';

const FeatureSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to streamline your email outreach and get better results
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FiZap className="text-indigo-600 text-2xl" />}
            title="Smart Automation"
            description="Set up sequences that send automatically based on triggers and schedules."
          />
          <FeatureCard
            icon={<FiFileText className="text-indigo-600 text-2xl" />}
            title="Template Library"
            description="Access hundreds of proven templates or create your own custom ones."
          />
          <FeatureCard
            icon={<FiBarChart2 className="text-indigo-600 text-2xl" />}
            title="Analytics Dashboard"
            description="Track opens, clicks, and replies to optimize your outreach strategy."
          />
        </div>
      </section>
  )
}

export default FeatureSection

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  