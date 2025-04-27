import React from 'react'
import { FiCheckCircle } from 'react-icons/fi';

const TestimonialSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Professionals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who have transformed their email outreach
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="MailFlow helped me land 3 job offers in just 2 months of using it. The templates and automation saved me so much time."
            name="Sarah Johnson"
            role="Product Manager"
          />
          <TestimonialCard
            quote="I went from 10% response rate to over 40% by using MailFlow's analytics to optimize my outreach strategy."
            name="Michael Chen"
            role="Sales Executive"
          />
          <TestimonialCard
            quote="The best investment I've made in my job search. The automated follow-ups doubled my interview rate."
            name="David Rodriguez"
            role="Software Engineer"
          />
        </div>
      </section>
  )
}

export default TestimonialSection

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FiCheckCircle key={i} className="text-yellow-400 mr-1" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-6">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-4">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{name}</p>
            <p className="text-gray-600 text-sm">{role}</p>
          </div>
        </div>
      </div>
    );
  }