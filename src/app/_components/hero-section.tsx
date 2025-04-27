import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Supercharge Your <span className="text-indigo-600">Email Outreach</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Automate your job applications, referral requests, and cold outreach with our powerful email automation platform.
            Save hours every week while increasing your response rates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg font-medium text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white text-gray-800 rounded-xl hover:bg-gray-50 transition-colors shadow-lg font-medium text-lg border border-gray-200"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>
  )
}

export default Hero