import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <section className="bg-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Email Outreach?</h2>
          <p className="text-indigo-100 text-xl mb-10">
            Join thousands of professionals who save hours every week and get better results with MailFlow
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-colors shadow-lg font-medium text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg font-medium text-lg border border-white"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>
  )
}

export default CTA